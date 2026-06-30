import Link from "next/link";
import type { ReactNode } from "react";
import {
    ArrowRight,
    CalendarDays,
    ChevronLeft,
    ChevronRight,
    FileText,
    Newspaper,
    Search,
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

type SearchParams = {
    q?: string;
    category?: string;
};

const fallbackNews: News[] = [
    {
        id: "fallback-1",
        title: "WIN Holdings Strengthens Business Portfolio Across Multiple Industries",
        slug: "win-holdings-strengthens-business-portfolio",
        excerpt:
            "WIN Holdings continues to strengthen its diversified business ecosystem across manufacturing, outsourcing, trading, and construction.",
        content:
            "WIN Holdings continues to develop its business portfolio through strategic direction, operational excellence, and sustainable business growth.",
        category: "Company Update",
        status: "published",
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: null,
    },
    {
        id: "fallback-2",
        title: "Business Coordination Meeting with Subsidiaries",
        slug: "business-coordination-meeting-with-subsidiaries",
        excerpt:
            "WIN Holdings held a coordination meeting to align strategic priorities across its subsidiaries.",
        content:
            "The coordination meeting brought together representatives from each subsidiary to discuss business direction, operational priorities, and future collaboration opportunities.",
        category: "Business Activities",
        status: "published",
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: null,
    },
    {
        id: "fallback-3",
        title: "3C Paint Supports Manufacturing Growth Initiatives",
        slug: "3c-paint-supports-manufacturing-growth-initiatives",
        excerpt:
            "3C Paint continues to improve production capabilities and support manufacturing growth initiatives.",
        content:
            "As part of the WIN Holdings business ecosystem, 3C Paint focuses on strengthening manufacturing operations, product development, and production quality.",
        category: "Subsidiary News",
        status: "published",
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: null,
    },
];

export const revalidate = 60;

export default async function NewsPage({
    searchParams,
}: {
    searchParams?: SearchParams | Promise<SearchParams>;
}) {
    const params = await Promise.resolve(searchParams ?? {});
    const news = await getNews();

    const filteredNews = filterNews(news, params);
    const featuredNews = filteredNews[0] ?? null;
    const regularNews = featuredNews ? filteredNews.slice(1) : filteredNews;
    const categories = getUniqueOptions(news.map((item) => item.category));

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <HeroSection />
            <NewsListSection
                featuredNews={featuredNews}
                news={regularNews}
                categories={categories}
                selectedCategory={params.category ?? ""}
                searchQuery={params.q ?? ""}
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
            "id, title, slug, excerpt, content, category, status, published_at, created_at, updated_at"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch news:", error.message);
        return fallbackNews;
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data as News[];
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

function getUniqueOptions(values: Array<string | null>) {
    return Array.from(
        new Set(values.filter((value): value is string => Boolean(value)))
    ).sort((a, b) => a.localeCompare(b));
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

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

            <SectionContainer className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600/10 text-orange-600">
                    <Newspaper className="h-8 w-8" />
                </div>

                <h1 className="mx-auto mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                    News & Info
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-neutral-600">
                    Stay informed with the latest updates, announcements, activities,
                    and insights from WIN Holdings and its business ecosystem.
                </p>
            </SectionContainer>
        </section>
    );
}

function NewsListSection({
    featuredNews,
    news,
    categories,
    selectedCategory,
    searchQuery,
}: {
    featuredNews: News | null;
    news: News[];
    categories: string[];
    selectedCategory: string;
    searchQuery: string;
}) {
    return (
        <section className="bg-stone-100 py-24 lg:py-32">
            <SectionContainer>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            Latest Updates
                        </h2>

                        <p className="mt-2 text-base leading-6 text-neutral-600">
                            Explore company announcements, subsidiary updates, and
                            corporate activities.
                        </p>
                    </div>

                    <NewsFilters
                        categories={categories}
                        selectedCategory={selectedCategory}
                        searchQuery={searchQuery}
                    />
                </div>

                {featuredNews ? (
                    <FeaturedNewsCard news={featuredNews} />
                ) : null}

                {news.length > 0 ? (
                    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {news.map((item) => (
                            <NewsCard key={item.id} news={item} />
                        ))}
                    </div>
                ) : featuredNews ? null : (
                    <EmptyNewsState />
                )}

                {(featuredNews || news.length > 0) ? <Pagination /> : null}
            </SectionContainer>
        </section>
    );
}

function NewsFilters({
    categories,
    selectedCategory,
    searchQuery,
}: {
    categories: string[];
    selectedCategory: string;
    searchQuery: string;
}) {
    return (
        <form className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:flex">
            <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                <input
                    type="search"
                    name="q"
                    defaultValue={searchQuery}
                    placeholder="Search news..."
                    className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-11 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-600 lg:w-64"
                />
            </label>

            <select
                name="category"
                defaultValue={selectedCategory}
                className="h-12 rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-orange-600"
            >
                <option value="">All Categories</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="h-12 rounded-lg bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-black sm:col-span-2 lg:hidden"
            >
                Filter
            </button>
        </form>
    );
}

function FeaturedNewsCard({ news }: { news: News }) {
    return (
        <article className="mt-12 overflow-hidden rounded-2xl border border-neutral-300 bg-white shadow-sm">
            <div className="grid lg:grid-cols-2">
                <div className="flex min-h-80 items-center justify-center bg-stone-300 text-neutral-500">
                    <FileText className="h-10 w-10" />
                </div>

                <div className="flex flex-col justify-center p-8 lg:p-10">
                    <div className="flex flex-wrap items-center gap-3">
                        <CategoryBadge category={news.category} />

                        <DateLabel date={news.published_at ?? news.created_at} />
                    </div>

                    <h3 className="mt-6 text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {news.title}
                    </h3>

                    <p className="mt-4 text-base leading-7 text-neutral-600">
                        {news.excerpt ?? truncateText(news.content, 180)}
                    </p>

                    <Link
                        href={`/news/${news.slug}`}
                        className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-orange-600 transition-colors hover:text-orange-700"
                    >
                        Read Full Article
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

function NewsCard({ news }: { news: News }) {
    return (
        <article className="flex min-h-96 flex-col overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="relative flex h-52 items-center justify-center bg-stone-300 text-neutral-500">
                <FileText className="h-8 w-8" />

                {news.category ? (
                    <span className="absolute left-4 top-4 rounded bg-orange-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                        {news.category}
                    </span>
                ) : null}
            </div>

            <div className="flex flex-1 flex-col p-6">
                <DateLabel date={news.published_at ?? news.created_at} />

                <h3 className="mt-3 text-2xl font-semibold leading-8 tracking-tight text-neutral-950">
                    {news.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-base leading-6 text-neutral-600">
                    {news.excerpt ?? truncateText(news.content, 140)}
                </p>

                <div className="mt-auto pt-6">
                    <Link
                        href={`/news/${news.slug}`}
                        className="inline-flex items-center gap-2 text-base font-semibold text-orange-600 transition-colors hover:text-orange-700"
                    >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </article>
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

function EmptyNewsState() {
    return (
        <div className="mt-12 rounded-2xl border border-neutral-300 bg-white p-10 text-center shadow-sm">
            <Newspaper className="mx-auto h-10 w-10 text-orange-600" />

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">
                No matching news found
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-neutral-600">
                There are currently no published news posts that match your search.
                Try changing the filters or reset the page.
            </p>

            <Link
                href="/news"
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
            >
                Reset Filters
            </Link>
        </div>
    );
}

function Pagination() {
    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            <button
                type="button"
                disabled
                className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 text-neutral-400 opacity-40"
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded bg-orange-600 text-base font-bold text-white"
            >
                1
            </button>

            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 bg-white text-base font-medium text-neutral-950"
            >
                2
            </button>

            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 bg-white text-neutral-950"
                aria-label="Next page"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}

function CTASection() {
    return (
        <section className="bg-neutral-950 py-24 text-white lg:py-32">
            <SectionContainer className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-orange-600/10 text-orange-500">
                    <Newspaper className="h-8 w-8" />
                </div>

                <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                    Stay Connected with WIN Holdings
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">
                    Follow our latest updates, business activities, and corporate
                    announcements as we continue building sustainable growth across
                    multiple industries.
                </p>

                <Link
                    href="/contact"
                    className="mt-10 inline-flex items-center justify-center rounded-lg bg-orange-600 px-10 py-4 text-base font-semibold text-white shadow-xl transition-colors hover:bg-orange-700"
                >
                    Contact Us
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