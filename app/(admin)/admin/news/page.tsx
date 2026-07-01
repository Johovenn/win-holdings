import Link from "next/link";
import {
    ArrowLeft,
    CalendarDays,
    CheckCircle2,
    Edit3,
    FilePlus2,
    Newspaper,
    Plus,
    Trash2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
    createNewsAction,
    deleteNewsAction,
    updateNewsAction,
} from "./actions";

type SearchParams = {
    success?: string;
    error?: string;
};

type NewsStatus = "draft" | "published";

type NewsRow = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    category: string | null;
    status: NewsStatus;
    published_at: string | null;
    created_at: string;
    updated_at: string;
};

type NewsFormProps = {
    mode: "create" | "edit";
    action: (formData: FormData) => void | Promise<void>;
    news?: NewsRow;
};

export default async function AdminNewsPage({
    searchParams,
}: {
    searchParams?: SearchParams | Promise<SearchParams>;
}) {
    const params = await Promise.resolve(searchParams ?? {});
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("news")
        .select(
            "id, title, slug, excerpt, content, category, status, published_at, created_at, updated_at",
        )
        .order("created_at", { ascending: false });

    const newsItems = (data ?? []) as NewsRow[];

    const totalNews = newsItems.length;
    const publishedNews = newsItems.filter(
        (item) => item.status === "published",
    ).length;
    const draftNews = newsItems.filter((item) => item.status === "draft").length;

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <section className="border-b border-neutral-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-16">
                    <div>
                        <Link
                            href="/admin"
                            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-orange-600"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>

                        <div className="mt-4 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                                <Newspaper className="h-6 w-6" />
                            </div>

                            <div>
                                <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                                    Admin Content
                                </p>

                                <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950">
                                    News Management
                                </h1>
                            </div>
                        </div>
                    </div>

                    <a
                        href="#create-news"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
                    >
                        <Plus className="h-4 w-4" />
                        Add News
                    </a>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <StatusMessage
                        success={params.success}
                        error={params.error}
                    />

                    <div className="grid gap-5 md:grid-cols-3">
                        <StatCard title="Total News" value={totalNews} />
                        <StatCard title="Published" value={publishedNews} />
                        <StatCard title="Draft" value={draftNews} />
                    </div>

                    <div
                        id="create-news"
                        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                                <FilePlus2 className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                                    Create News Article
                                </h2>

                                <p className="mt-1 text-sm text-neutral-600">
                                    Add a new company update, announcement, or
                                    published article.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <NewsForm
                                mode="create"
                                action={createNewsAction}
                            />
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-neutral-200 bg-white shadow-sm">
                        <div className="border-b border-neutral-200 p-6">
                            <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                                Existing News
                            </h2>

                            <p className="mt-1 text-sm text-neutral-600">
                                Edit, publish, unpublish, or delete existing news
                                articles.
                            </p>
                        </div>

                        {error ? (
                            <div className="p-6">
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    Failed to load news data. Please check your
                                    Supabase table and policies.
                                </div>
                            </div>
                        ) : null}

                        {!error && newsItems.length === 0 ? (
                            <div className="p-6">
                                <div className="rounded-xl border border-neutral-200 bg-stone-50 px-4 py-10 text-center">
                                    <Newspaper className="mx-auto h-10 w-10 text-neutral-400" />

                                    <h3 className="mt-4 text-lg font-semibold text-neutral-950">
                                        No news yet
                                    </h3>

                                    <p className="mt-2 text-sm text-neutral-600">
                                        Create your first article using the form
                                        above.
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        {!error && newsItems.length > 0 ? (
                            <div className="divide-y divide-neutral-200">
                                {newsItems.map((news) => (
                                    <NewsItem key={news.id} news={news} />
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>
        </main>
    );
}

function NewsForm({ mode, action, news }: NewsFormProps) {
    const isEditMode = mode === "edit";

    return (
        <form action={action} className="grid gap-5">
            {isEditMode ? (
                <input type="hidden" name="id" value={news?.id} />
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Title
                    </span>

                    <input
                        name="title"
                        type="text"
                        required
                        defaultValue={news?.title ?? ""}
                        placeholder="Enter news title"
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Slug
                    </span>

                    <input
                        name="slug"
                        type="text"
                        defaultValue={news?.slug ?? ""}
                        placeholder="auto-generated-from-title"
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                    />
                </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Category
                    </span>

                    <input
                        name="category"
                        type="text"
                        defaultValue={news?.category ?? ""}
                        placeholder="Corporate News"
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Status
                    </span>

                    <select
                        name="status"
                        defaultValue={news?.status ?? "draft"}
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-orange-600"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                </label>
            </div>

            <label className="block">
                <span className="text-sm font-medium text-neutral-700">
                    Excerpt
                </span>

                <textarea
                    name="excerpt"
                    rows={3}
                    defaultValue={news?.excerpt ?? ""}
                    placeholder="Short summary shown on the news listing page"
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                />
            </label>

            <label className="block">
                <span className="text-sm font-medium text-neutral-700">
                    Content
                </span>

                <textarea
                    name="content"
                    rows={isEditMode ? 8 : 10}
                    required
                    defaultValue={news?.content ?? ""}
                    placeholder="Write the full news article content here"
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                />
            </label>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
                >
                    <CheckCircle2 className="h-4 w-4" />
                    {isEditMode ? "Save Changes" : "Create News"}
                </button>
            </div>
        </form>
    );
}

function NewsItem({ news }: { news: NewsRow }) {
    return (
        <article className="p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={news.status} />

                        {news.category ? (
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                                {news.category}
                            </span>
                        ) : null}

                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(news.created_at)}
                        </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-neutral-950">
                        {news.title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-500">
                        /news/{news.slug}
                    </p>

                    {news.excerpt ? (
                        <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600">
                            {news.excerpt}
                        </p>
                    ) : null}
                </div>

                <div className="flex shrink-0 gap-3">
                    <Link
                        href={`/news/${news.slug}`}
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-orange-600 hover:text-orange-600"
                    >
                        View
                    </Link>

                    <form action={deleteNewsAction}>
                        <input type="hidden" name="id" value={news.id} />

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-100"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                    </form>
                </div>
            </div>

            <details className="mt-5 rounded-xl border border-neutral-200 bg-stone-50">
                <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold text-neutral-800">
                    <Edit3 className="h-4 w-4 text-orange-600" />
                    Edit News
                </summary>

                <div className="border-t border-neutral-200 bg-white p-5">
                    <NewsForm
                        mode="edit"
                        action={updateNewsAction}
                        news={news}
                    />
                </div>
            </details>
        </article>
    );
}

function StatusBadge({ status }: { status: NewsStatus }) {
    if (status === "published") {
        return (
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Published
            </span>
        );
    }

    return (
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Draft
        </span>
    );
}

function StatCard({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">{title}</p>

            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-950">
                {value}
            </p>
        </div>
    );
}

function StatusMessage({
    success,
    error,
}: {
    success?: string;
    error?: string;
}) {
    const successMessage = getSuccessMessage(success);
    const errorMessage = getErrorMessage(error);

    if (!successMessage && !errorMessage) {
        return null;
    }

    return (
        <div className="mb-6">
            {successMessage ? (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    {successMessage}
                </div>
            ) : null}

            {errorMessage ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    {errorMessage}
                </div>
            ) : null}
        </div>
    );
}

function getSuccessMessage(success?: string) {
    if (success === "created") {
        return "News article created successfully.";
    }

    if (success === "updated") {
        return "News article updated successfully.";
    }

    if (success === "deleted") {
        return "News article deleted successfully.";
    }

    return null;
}

function getErrorMessage(error?: string) {
    if (error === "missing_fields") {
        return "Please fill in the required fields: title and content.";
    }

    if (error === "duplicate_slug") {
        return "The slug already exists. Please use a different slug.";
    }

    if (error === "not_found") {
        return "The selected news article could not be found.";
    }

    if (error === "delete_failed") {
        return "Failed to delete the news article. Please try again.";
    }

    if (error === "database_error") {
        return "A database error occurred. Please check your Supabase table and policies.";
    }

    return null;
}

function formatDate(value: string | null) {
    if (!value) {
        return "Not available";
    }

    return new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
}