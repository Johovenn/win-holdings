import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock,
    Newspaper,
    Tag,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

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
    slug: string;
};

export const revalidate = 60;

export async function generateMetadata({
    params,
}: {
    params: PageParams | Promise<PageParams>;
}): Promise<Metadata> {
    const { slug } = await Promise.resolve(params);
    const news = await getNewsBySlug(slug);

    if (!news) {
        return {
            title: "News Not Found | WIN Holdings",
        };
    }

    return {
        title: `${news.title} | WIN Holdings`,
        description:
            news.excerpt ??
            truncateText(news.content, 150) ??
            "Read the latest update from WIN Holdings.",
    };
}

export default async function NewsSlugPage({
    params,
}: {
    params: PageParams | Promise<PageParams>;
}) {
    const { slug } = await Promise.resolve(params);
    const news = await getNewsBySlug(slug);

    if (!news) {
        notFound();
    }

    const recentNews = await getRecentNews(news.id);

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <ArticleHeroSection news={news} />

            <section className="bg-white py-16 lg:py-24">
                <SectionContainer>
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
                        <ArticleContent news={news} />
                        <ArticleSidebar recentNews={recentNews} />
                    </div>
                </SectionContainer>
            </section>

            <CTASection />
        </main>
    );
}

async function getNewsBySlug(slug: string): Promise<News | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("news")
        .select(
            "id, title, slug, excerpt, content, category, status, published_at, created_at, updated_at"
        )
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

    if (error) {
        console.error("Failed to fetch news article:", error.message);
        return null;
    }

    return data as News | null;
}

async function getRecentNews(currentNewsId: string): Promise<News[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("news")
        .select(
            "id, title, slug, excerpt, content, category, status, published_at, created_at, updated_at"
        )
        .eq("status", "published")
        .neq("id", currentNewsId)
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(3);

    if (error) {
        console.error("Failed to fetch recent news:", error.message);
        return [];
    }

    return (data ?? []) as News[];
}

function SectionContainer({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`mx-auto w-full max-w-7xl px-6 lg:px-16 ${className}`}>
            {children}
        </div>
    );
}

function ArticleHeroSection({ news }: { news: News }) {
    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

            <SectionContainer className="relative">
                <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-base font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to News
                </Link>

                <div className="mt-10 max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3">
                        <CategoryBadge category={news.category} />
                        <DateLabel date={news.published_at ?? news.created_at} />
                        <ReadingTime content={news.content} />
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
    const paragraphs = news.content
        .split(/\n+/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);

    return (
        <article className="min-w-0 rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
            <div className="space-y-6 text-lg leading-8 text-neutral-700">
                {paragraphs.length > 0 ? (
                    paragraphs.map((paragraph, index) => (
                        <p key={`${news.id}-paragraph-${index}`}>{paragraph}</p>
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
                    Back to News
                </Link>
            </div>
        </article>
    );
}

function ArticleSidebar({ recentNews }: { recentNews: News[] }) {
    return (
        <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-neutral-300 bg-stone-50 p-6">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600">
                        <Newspaper className="h-5 w-5" />
                    </div>

                    <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                        Recent News
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
                                    {item.category ?? "Company Update"}
                                </p>

                                <h3 className="mt-2 text-base font-semibold leading-6 text-neutral-950 transition-colors hover:text-orange-600">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-neutral-600">
                                    {formatDate(item.published_at ?? item.created_at)}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="mt-6 text-sm leading-6 text-neutral-600">
                        No other published news available yet.
                    </p>
                )}
            </div>
        </aside>
    );
}

function CategoryBadge({ category }: { category: string | null }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-600/10 px-3 py-1 text-sm font-semibold text-orange-700">
            <Tag className="h-4 w-4" />
            {category ?? "Company Update"}
        </span>
    );
}

function DateLabel({ date }: { date: string | null }) {
    return (
        <time className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600">
            <CalendarDays className="h-4 w-4" />
            {formatDate(date)}
        </time>
    );
}

function ReadingTime({ content }: { content: string }) {
    const minutes = Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

    return (
        <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600">
            <Clock className="h-4 w-4" />
            {minutes} min read
        </span>
    );
}

function CTASection() {
    return (
        <section className="bg-neutral-950 py-20 text-white lg:py-24">
            <SectionContainer className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-600/10 text-orange-500">
                    <Newspaper className="h-8 w-8" />
                </div>

                <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                    Explore More Updates
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                    Discover more announcements, business activities, and corporate
                    insights from WIN Holdings.
                </p>

                <Link
                    href="/news"
                    className="mt-10 inline-flex items-center justify-center rounded-lg bg-orange-600 px-10 py-4 text-base font-semibold text-white shadow-xl transition-colors hover:bg-orange-700"
                >
                    View All News
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </SectionContainer>
        </section>
    );
}

function formatDate(date: string | null) {
    if (!date) {
        return "No date";
    }

    return new Intl.DateTimeFormat("en", {
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