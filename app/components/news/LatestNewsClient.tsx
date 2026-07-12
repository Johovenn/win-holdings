"use client";

import { useState } from "react";
import Link from "next/link";

export type NewsItem = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    category: string | null;
    status: "draft" | "published";
    published_at: string | null;
    created_at: string;
};

export default function LatestNewsClient({
    newsItems,
}: {
    newsItems: NewsItem[];
}) {
    const [visibleCount, setVisibleCount] = useState(3);

    const visibleNews = newsItems.slice(0, visibleCount);
    const canViewMore = visibleCount < newsItems.length;

    return (
        <>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
                {visibleNews.map((item) => (
                    <article
                        key={item.id}
                        className="flex min-h-72 flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-orange-600 hover:shadow-md"
                    >
                        <div className="flex flex-1 flex-col">
                            <span className="inline-flex w-fit rounded bg-orange-600 px-3 py-1 text-xs font-semibold uppercase leading-4 text-white">
                                {item.category ?? "News"}
                            </span>

                            <time className="mt-5 block text-sm font-medium tracking-wide text-neutral-600">
                                {formatNewsDate(
                                    item.published_at ?? item.created_at,
                                )}
                            </time>

                            <h3 className="mt-2 text-2xl font-semibold leading-8 tracking-tight text-neutral-950">
                                {item.title}
                            </h3>

                            <p className="mt-3 line-clamp-4 text-base leading-6 text-neutral-600">
                                {item.excerpt ??
                                    "Read the latest update from WIN Holdings."}
                            </p>

                            <div className="mt-auto pt-6">
                                <Link
                                    href={`/news/${item.slug}`}
                                    className="inline-flex text-base font-semibold text-orange-600 transition-colors hover:text-orange-700"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                {canViewMore ? (
                    <button
                        type="button"
                        onClick={() => setVisibleCount((count) => count + 3)}
                        className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                    >
                        View More
                    </button>
                ) : (
                    <Link
                        href="/news"
                        className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                    >
                        View All News
                    </Link>
                )}
            </div>
        </>
    );
}

function formatNewsDate(value: string) {
    return new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
}