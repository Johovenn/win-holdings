import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";
import {
    ArrowRight,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    Newspaper,
    Tag,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
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

type SearchParams = {
    q?: string;
    category?: string;
};

export const revalidate = 60;

export default async function NewsPage({
    searchParams,
}: {
    searchParams?: SearchParams | Promise<SearchParams>;
}) {
    const params = await Promise.resolve(searchParams ?? {});
    const locale = await getLocale();
    const news = await getNews();

    const filteredNews = filterNews(news, params);
    const featuredNews = filteredNews[0] ?? null;
    const regularNews = featuredNews ? filteredNews.slice(1) : filteredNews;

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <HeroSection />

            <NewsListSection
                featuredNews={featuredNews}
                news={regularNews}
                locale={locale}
            />

            <CTASection />
        </main>
    );
}

async function getNews(): Promise<News[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("news")
        .select(
            "id, title, slug, excerpt, content, category, status, published_at, created_at, updated_at",
        )
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch news:", error.message);
        return await getFallbackNews();
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data as News[];
}

async function getFallbackNews(): Promise<News[]> {
    const t = await getTranslations("News.fallback");

    return [
        {
            id: "fallback-1",
            title: t("items.portfolio.title"),
            slug: "win-holdings-strengthens-business-portfolio",
            excerpt: t("items.portfolio.excerpt"),
            content: t("items.portfolio.content"),
            category: t("items.portfolio.category"),
            status: "published",
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: null,
        },
        {
            id: "fallback-2",
            title: t("items.coordination.title"),
            slug: "business-coordination-meeting-with-subsidiaries",
            excerpt: t("items.coordination.excerpt"),
            content: t("items.coordination.content"),
            category: t("items.coordination.category"),
            status: "published",
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: null,
        },
        {
            id: "fallback-3",
            title: t("items.manufacturing.title"),
            slug: "manufacturing-growth-initiatives",
            excerpt: t("items.manufacturing.excerpt"),
            content: t("items.manufacturing.content"),
            category: t("items.manufacturing.category"),
            status: "published",
            published_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: null,
        },
    ];
}

function filterNews(news: News[], params: SearchParams) {
    const searchQuery = params.q?.trim().toLowerCase();
    const category = params.category?.trim();

    return news.filter((item) => {
        const matchesSearch = searchQuery
            ? [
                  item.title,
                  item.excerpt,
                  item.content,
                  item.category,
              ]
                  .filter(Boolean)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchQuery)
            : true;

        const matchesCategory = category ? item.category === category : true;

        return matchesSearch && matchesCategory;
    });
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

function ButtonLink({
    href,
    children,
    variant = "orange",
    className = "",
}: {
    href: string;
    children: ReactNode;
    variant?: "orange" | "dark" | "outline-light";
    className?: string;
}) {
    const variants = {
        orange: "bg-orange-600 text-white shadow-lg hover:bg-orange-700",
        dark: "bg-neutral-950 text-white shadow-lg hover:bg-black",
        "outline-light":
            "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
    };

    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center rounded-lg px-8 py-4 text-base transition-colors ${variants[variant]} ${className}`}
        >
            {children}
        </Link>
    );
}

function HeroSection() {
    const t = useTranslations("News.hero");

    return (
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
            <Image
                src="/images/news-bg.jpg"
                alt=""
                fill
                preload
                sizes="100vw"
                className="object-fill"
            />

            <div className="absolute inset-0 bg-white/70" />

            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

            <SectionContainer className="relative z-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600/10 text-orange-600">
                    <Newspaper className="h-8 w-8" />
                </div>

                <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                    {t("title")}
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-neutral-600">
                    {t("description")}
                </p>
            </SectionContainer>
        </section>
    );
}

function NewsListSection({
    featuredNews,
    news,
    locale,
    totalPages = 1,
    currentPage = 1,
}: {
    featuredNews: News | null;
    news: News[];
    locale: string;
    totalPages?: number;
    currentPage?: number;
}) {
    const t = useTranslations("News.list");

    return (
        <section className="bg-stone-100 py-24 lg:py-32">
            <SectionContainer>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            {t("title")}
                        </h2>

                        <p className="mt-2 text-base leading-6 text-neutral-600">
                            {t("description")}
                        </p>
                    </div>
                </div>

                {featuredNews ? (
                    <FeaturedNewsCard news={featuredNews} locale={locale} />
                ) : null}

                {news.length > 0 ? (
                    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {news.map((item) => (
                            <NewsCard
                                key={item.id}
                                news={item}
                                locale={locale}
                            />
                        ))}
                    </div>
                ) : featuredNews ? null : (
                    <EmptyNewsState />
                )}

                {(featuredNews || news.length > 0) && totalPages > 1 ? (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                    />
                ) : null}
            </SectionContainer>
        </section>
    );
}

function FeaturedNewsCard({
    news,
    locale,
}: {
    news: News;
    locale: string;
}) {
    const t = useTranslations("News.cards");

    return (
        <article className="mt-12 overflow-hidden rounded-2xl border border-neutral-300 bg-white p-8 shadow-sm lg:p-10">
            <div className="flex flex-wrap items-center gap-3">
                <CategoryBadge category={news.category} />

                <DateLabel
                    date={news.published_at ?? news.created_at}
                    locale={locale}
                />
            </div>

            <h3 className="mt-6 max-w-4xl text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                {news.title}
            </h3>

            <p className="mt-4 max-w-4xl text-base leading-7 text-neutral-600">
                {news.excerpt ?? truncateText(news.content, 220)}
            </p>

            <Link
                href={`/news/${news.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-orange-600 transition-colors hover:text-orange-700"
            >
                {t("readFullArticle")}
                <ArrowRight className="h-4 w-4" />
            </Link>
        </article>
    );
}

function NewsCard({
    news,
    locale,
}: {
    news: News;
    locale: string;
}) {
    const t = useTranslations("News.cards");

    return (
        <article className="flex min-h-80 flex-col rounded-xl border border-neutral-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex flex-wrap items-center gap-3">
                <CategoryBadge category={news.category} />

                <DateLabel
                    date={news.published_at ?? news.created_at}
                    locale={locale}
                />
            </div>

            <h3 className="mt-5 text-2xl font-semibold leading-8 tracking-tight text-neutral-950">
                {news.title}
            </h3>

            <p className="mt-3 line-clamp-4 text-base leading-6 text-neutral-600">
                {news.excerpt ?? truncateText(news.content, 160)}
            </p>

            <div className="mt-auto pt-6">
                <Link
                    href={`/news/${news.slug}`}
                    className="inline-flex items-center gap-2 text-base font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                    {t("readMore")}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </article>
    );
}

function CategoryBadge({ category }: { category: string | null }) {
    const t = useTranslations("News.labels");

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
    const t = useTranslations("News.labels");

    return (
        <time className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600">
            <CalendarDays className="h-4 w-4" />
            {formatDate(date, locale, t("noDate"))}
        </time>
    );
}

function EmptyNewsState() {
    const t = useTranslations("News.empty");

    return (
        <div className="mt-12 rounded-2xl border border-neutral-300 bg-white p-10 text-center shadow-sm">
            <Newspaper className="mx-auto h-10 w-10 text-orange-600" />

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">
                {t("title")}
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-neutral-600">
                {t("description")}
            </p>

            <Link
                href="/news"
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
            >
                {t("reset")}
            </Link>
        </div>
    );
}

function Pagination({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    const t = useTranslations("News.pagination");

    if (totalPages <= 1) {
        return null;
    }

    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            {hasPreviousPage ? (
                <Link
                    href={`/news?page=${currentPage - 1}`}
                    className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 bg-white text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                    aria-label={t("previous")}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Link>
            ) : (
                <button
                    type="button"
                    disabled
                    className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 text-neutral-400 opacity-40"
                    aria-label={t("previous")}
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
            )}

            {Array.from({ length: totalPages }).map((_, index) => {
                const page = index + 1;
                const isActive = page === currentPage;

                return (
                    <Link
                        key={page}
                        href={`/news?page=${page}`}
                        className={
                            isActive
                                ? "flex h-10 w-10 items-center justify-center rounded bg-orange-600 text-base font-bold text-white"
                                : "flex h-10 w-10 items-center justify-center rounded border border-neutral-300 bg-white text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                        }
                    >
                        {page}
                    </Link>
                );
            })}

            {hasNextPage ? (
                <Link
                    href={`/news?page=${currentPage + 1}`}
                    className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 bg-white text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                    aria-label={t("next")}
                >
                    <ChevronRight className="h-4 w-4" />
                </Link>
            ) : (
                <button
                    type="button"
                    disabled
                    className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 text-neutral-400 opacity-40"
                    aria-label={t("next")}
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}

function CTASection() {
    const t = useTranslations("News.cta");

    return (
        <section className="relative overflow-hidden bg-neutral-800 py-12 text-stone-50">
            <Image
                src="/images/cta-bg.jpeg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-neutral-950/70" />

            <SectionContainer className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                    {t("title")}
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    {t("description")}
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <ButtonLink href="/contact" variant="orange">
                        {t("button")}
                    </ButtonLink>
                </div>
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
