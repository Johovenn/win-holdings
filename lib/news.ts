import "server-only";

import { getTranslations } from "next-intl/server";
import { query } from "@/lib/db";

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
    const result = await query<NewsItem>(
        `SELECT id, title, slug, excerpt, content, category, status,
                published_at, created_at, updated_at
         FROM news WHERE status = $1
         ORDER BY published_at DESC NULLS LAST, created_at DESC`,
        ["published"],
    ).catch((error) => {
        console.error("Failed to fetch news:", error.message);
        return null;
    });

    if (!result) return getFallbackNews();

    return result.rows;
}

export async function getLatestNews(limit = 6) {
    const result = await query<LatestNewsItem>(
        `SELECT id, title, slug, excerpt, category, status, published_at, created_at
         FROM news WHERE status = $1
         ORDER BY published_at DESC NULLS LAST, created_at DESC LIMIT $2`,
        ["published", limit],
    ).catch(() => null);

    return {
        newsItems: result?.rows ?? [],
        hasError: !result,
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
