import "server-only";

import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";

export type NewsItem = {
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

export type LatestNewsItem = Omit<NewsItem, "content" | "updated_at">;

export async function getPublishedNews(): Promise<NewsItem[]> {
    const supabase = await createClient();
    const query = supabase
        .from("news")
        .select(
            "id, title, slug, excerpt, content, category, status, published_at, created_at, updated_at",
        )
        .eq("status", "published");
    const { data, error } = await query
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch news:", error.message);
        return getFallbackNews();
    }

    return (data ?? []) as NewsItem[];
}

export async function getLatestNews(limit = 6) {
    const supabase = await createClient();
    const query = supabase
        .from("news")
        .select("id, title, slug, excerpt, category, status, published_at, created_at")
        .eq("status", "published");
    const { data, error } = await query
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(limit);

    return {
        newsItems: (data ?? []) as LatestNewsItem[],
        hasError: Boolean(error),
    };
}

async function getFallbackNews(): Promise<NewsItem[]> {
    const t = await getTranslations("News.fallback");
    const now = new Date().toISOString();

    return ["portfolio", "coordination", "manufacturing"].map((key, index) => ({
        id: `fallback-${index + 1}`,
        title: t(`items.${key}.title`),
        slug: [
            "win-holdings-strengthens-business-portfolio",
            "business-coordination-meeting-with-subsidiaries",
            "manufacturing-growth-initiatives",
        ][index],
        excerpt: t(`items.${key}.excerpt`),
        content: t(`items.${key}.content`),
        category: t(`items.${key}.category`),
        status: "published" as const,
        published_at: now,
        created_at: now,
        updated_at: null,
    }));
}
