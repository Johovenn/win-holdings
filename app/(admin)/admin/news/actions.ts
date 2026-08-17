"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

type NewsStatus = "draft" | "published";

export async function createNewsAction(formData: FormData) {
    const { id: userId } = await requireAdmin();

    const title = getText(formData, "title");
    const slugInput = getText(formData, "slug");
    const excerpt = getText(formData, "excerpt");
    const content = getText(formData, "content");
    const category = getText(formData, "category");
    const status = getStatus(formData);

    const slug = slugify(slugInput || title);

    if (!title || !slug || !content) {
        redirect("/admin/news?error=missing_fields");
    }

    const now = new Date().toISOString();

    try {
        await query(
            `INSERT INTO news (title, slug, excerpt, content, category, status,
             published_at, created_by, created_at, updated_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [title, slug, excerpt || null, content, category || null, status,
                status === "published" ? now : null, userId, now, now],
        );
    } catch (error) {
        redirect(`/admin/news?error=${getDatabaseErrorCode(error)}`);
    }

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");

    redirect("/admin/news?success=created");
}

export async function updateNewsAction(formData: FormData) {
    await requireAdmin();

    const id = getText(formData, "id");
    const title = getText(formData, "title");
    const slugInput = getText(formData, "slug");
    const excerpt = getText(formData, "excerpt");
    const content = getText(formData, "content");
    const category = getText(formData, "category");
    const status = getStatus(formData);

    const slug = slugify(slugInput || title);

    if (!id || !title || !slug || !content) {
        redirect("/admin/news?error=missing_fields");
    }

    const existingResult = await query<{ published_at: string | null }>(
        "SELECT published_at FROM news WHERE id = $1 LIMIT 1", [id]);
    const existingNews = existingResult.rows[0];

    if (!existingNews) {
        redirect("/admin/news?error=not_found");
    }

    const now = new Date().toISOString();

    const nextPublishedAt =
        status === "published"
            ? existingNews.published_at ?? now
            : null;

    try {
        await query(
            `UPDATE news SET title=$1, slug=$2, excerpt=$3, content=$4,
             category=$5, status=$6, published_at=$7, updated_at=$8 WHERE id=$9`,
            [title, slug, excerpt || null, content, category || null, status,
                nextPublishedAt, now, id],
        );
    } catch (error) {
        redirect(`/admin/news?error=${getDatabaseErrorCode(error)}`);
    }

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");

    redirect("/admin/news?success=updated");
}

export async function deleteNewsAction(formData: FormData) {
    await requireAdmin();

    const id = getText(formData, "id");

    if (!id) {
        redirect("/admin/news?error=missing_fields");
    }

    try {
        await query("DELETE FROM news WHERE id = $1", [id]);
    } catch {
        redirect("/admin/news?error=delete_failed");
    }

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");

    redirect("/admin/news?success=deleted");
}

function getText(formData: FormData, key: string) {
    return String(formData.get(key) ?? "").trim();
}

function getStatus(formData: FormData): NewsStatus {
    const status = String(formData.get("status") ?? "draft");

    return status === "published" ? "published" : "draft";
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

function getDatabaseErrorCode(error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
        return "duplicate_slug";
    }

    return "database_error";
}
