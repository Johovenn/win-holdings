import { Link } from "@/i18n/routing";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock,
    Newspaper,
    Tag,
} from "lucide-react";
import { query } from "@/lib/db";
import { useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";

type News = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    category: string | null;
    status: "draft" | "published";
    published_at: string | null;
    created_at: string;
    updated_at: string | null;
};

type PageParams = {
    locale: string;
    slug: string;
};

export const revalidate = 60;

export async function generateMetadata({
    params,
}: {
    params: PageParams | Promise<PageParams>;
}): Promise<Metadata> {
    const { locale, slug } = await Promise.resolve(params);
    const t = await getTranslations({
        locale,
        namespace: "NewsArticle.metadata",
    });

    const news = await getNewsBySlug(slug);

    if (!news) {
        return {
            title: t("notFoundTitle"),
        };
    }

    return {
        title: `${news.title} | WIN Holdings`,
        description:
            news.excerpt ??
            truncateText(news.content, 150) ??
            t("defaultDescription"),
    };
}

export default async function NewsSlugPage({
    params,
}: {
    params: PageParams | Promise<PageParams>;
}) {
    const { slug } = await Promise.resolve(params);
    const locale = await getLocale();
    const news = await getNewsBySlug(slug);

    if (!news) {
        notFound();
    }

    const recentNews = await getRecentNews(news.id);

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <ArticleHeroSection news={news} locale={locale} />

            <section className="bg-white py-16 lg:py-24">
                <SectionContainer>
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
                        <ArticleContent news={news} />
                        <ArticleSidebar
                            recentNews={recentNews}
                            locale={locale}
                        />
                    </div>
                </SectionContainer>
            </section>

            <CTASection />
        </main>
    );
}

async function getNewsBySlug(slug: string): Promise<News | null> {
    const result = await query<News>(
        `SELECT id, title, slug, excerpt, content, category, status,
                published_at, created_at, updated_at
         FROM news WHERE slug = $1 AND status = $2 LIMIT 1`,
        [slug, "published"],
    ).catch((error) => {
        console.error("Failed to fetch news article:", error instanceof Error ? error.message : error);
        return null;
    });

    if (!result) {
        return null;
    }

    return result.rows[0] ?? null;
}

async function getRecentNews(currentNewsId: string): Promise<News[]> {
    const result = await query<News>(
        `SELECT id, title, slug, excerpt, content, category, status,
                published_at, created_at, updated_at
         FROM news WHERE status = $1 AND id <> $2
         ORDER BY published_at DESC NULLS LAST, created_at DESC LIMIT 3`,
        ["published", currentNewsId],
    ).catch((error) => {
        console.error("Failed to fetch recent news:", error instanceof Error ? error.message : error);
        return null;
    });

    if (!result) {
        return [];
    }

    return result.rows;
}

function SectionContainer({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`mx-auto w-full max-w-7xl px-6 lg:px-16 ${className}`}>
            {children}
        </div>
    );
}

function ArticleHeroSection({
    news,
    locale,
}: {
    news: News;
    locale: string;
}) {
    const t = useTranslations("NewsArticle.article");

    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

            <SectionContainer className="relative">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-base font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("backToNews")}
                </Link>

                <div className="mt-10 max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3">
                        <CategoryBadge category={news.category} />

                        <DateLabel
                            date={news.published_at ?? news.created_at}
                            locale={locale}
                        />

                        <ReadingTime
                            content={news.content}
                            locale={locale}
                        />
                    </div>

                    <h1 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                        {news.title}
                    </h1>

                    {news.excerpt ? (
                        <p className="mt-6 max-w-3xl text-xl leading-8 text-neutral-600">
                            {news.excerpt}
                        </p>
                    ) : null}
                </div>
            </SectionContainer>
        </section>
    );
}

function ArticleContent({ news }: { news: News }) {
    const t = useTranslations("NewsArticle.article");

    const paragraphs = news.content
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    return (
        <article className="min-w-0 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
            <div className="space-y-6 text-lg leading-8 text-neutral-700">
                {paragraphs.length > 0 ? (
                    paragraphs.map((paragraph, index) => (
                        <p key={`${news.id}-paragraph-${index}`}>
                            {paragraph}
                        </p>
                    ))
                ) : (
                    <p>{news.content}</p>
                )}
            </div>

            <div className="mt-12 border-t border-neutral-200 pt-8">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {t("backToNews")}
                </Link>
            </div>
        </article>
    );
}

function ArticleSidebar({
    recentNews,
    locale,
}: {
    recentNews: News[];
    locale: string;
}) {
    const t = useTranslations("NewsArticle.sidebar");

    return (
        <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-neutral-300 bg-stone-50 p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600">
                        <Newspaper className="h-5 w-5" />
                    </div>

                    <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>
                </div>

                {recentNews.length > 0 ? (
                    <div className="mt-6 space-y-6">
                        {recentNews.map((item) => (
                            <Link
                                key={item.id}
                                href={`/news/${item.slug}`}
                                className="block border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0"
                            >
                                <p className="text-sm font-medium text-orange-600">
                                    {item.category ?? t("defaultCategory")}
                                </p>

                                <h3 className="mt-2 text-base font-semibold leading-6 text-neutral-950 transition-colors hover:text-orange-600">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-neutral-600">
                                    {formatDate(
                                        item.published_at ?? item.created_at,
                                        locale,
                                        t("noDate"),
                                    )}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="mt-6 text-sm leading-6 text-neutral-600">
                        {t("empty")}
                    </p>
                )}
            </div>
        </aside>
    );
}

function CategoryBadge({ category }: { category: string | null }) {
    const t = useTranslations("NewsArticle.labels");

    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-600/10 px-3 py-1 text-sm font-semibold text-orange-700">
            <Tag className="h-4 w-4" />
            {category ?? t("defaultCategory")}
        </span>
    );
}

function DateLabel({
    date,
    locale,
}: {
    date: string | null;
    locale: string;
}) {
    const t = useTranslations("NewsArticle.labels");

    return (
        <time className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600">
            <CalendarDays className="h-4 w-4" />
            {formatDate(date, locale, t("noDate"))}
        </time>
    );
}

function ReadingTime({
    content,
}: {
    content: string;
    locale: string;
}) {
    const t = useTranslations("NewsArticle.labels");
    const minutes = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

    return (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600">
            <Clock className="h-4 w-4" />
            {t("readingTime", { minutes })}
        </span>
    );
}

function CTASection() {
    const t = useTranslations("NewsArticle.cta");

    return (
        <section className="bg-neutral-950 py-20 text-white lg:py-24">
            <SectionContainer className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-600/10 text-orange-500">
                    <Newspaper className="h-8 w-8" />
                </div>

                <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                    {t("title")}
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                    {t("description")}
                </p>

                <Link
                    href="/news"
                    className="mt-10 inline-flex items-center justify-center rounded-lg bg-orange-600 px-10 py-4 text-base font-semibold text-white shadow-xl transition-colors hover:bg-orange-700"
                >
                    {t("button")}
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </SectionContainer>
        </section>
    );
}

function formatDate(date: string | null, locale: string, fallback: string) {
    if (!date) {
        return fallback;
    }

    const dateLocale = locale === "zh" ? "zh-CN" : "en";

    return new Intl.DateTimeFormat(dateLocale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength).trim()}...`;
}
