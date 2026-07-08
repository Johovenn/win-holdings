"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type NewsStatus = "draft" | "published";

export async function createNewsAction(formData: FormData) {
    const { supabase, userId } = await requireAdmin();

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

    const { error } = await supabase.from("news").insert({
        title,
        slug,
        excerpt: excerpt || null,
        content,
        category: category || null,
        status,
        published_at: status === "published" ? now : null,
        created_by: userId,
        created_at: now,
        updated_at: now,
    });

    if (error) {
        redirect(`/admin/news?error=${getDatabaseErrorCode(error.code)}`);
    }

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");

    redirect("/admin/news?success=created");
}

export async function updateNewsAction(formData: FormData) {
    const { supabase } = await requireAdmin();

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

    const { data: existingNews, error: existingError } = await supabase
        .from("news")
        .select("published_at")
        .eq("id", id)
        .maybeSingle();

    if (existingError || !existingNews) {
        redirect("/admin/news?error=not_found");
    }

    const now = new Date().toISOString();

    const nextPublishedAt =
        status === "published"
            ? existingNews.published_at ?? now
            : null;

    const { error } = await supabase
        .from("news")
        .update({
            title,
            slug,
            excerpt: excerpt || null,
            content,
            category: category || null,
            status,
            published_at: nextPublishedAt,
            updated_at: now,
        })
        .eq("id", id);

    if (error) {
        redirect(`/admin/news?error=${getDatabaseErrorCode(error.code)}`);
    }

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");

    redirect("/admin/news?success=updated");
}

export async function deleteNewsAction(formData: FormData) {
    const { supabase } = await requireAdmin();

    const id = getText(formData, "id");

    if (!id) {
        redirect("/admin/news?error=missing_fields");
    }

    const { error } = await supabase
        .from("news")
        .delete()
        .eq("id", id);

    if (error) {
        redirect("/admin/news?error=delete_failed");
    }

    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");

    redirect("/admin/news?success=deleted");
}

async function requireAdmin() {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/admin/login");
    }

    const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (adminError || !adminUser) {
        await supabase.auth.signOut();

        redirect("/admin/login?error=not_authorized");
    }

    return {
        supabase,
        userId: user.id,
    };
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

function getDatabaseErrorCode(code?: string) {
    if (code === "23505") {
        return "duplicate_slug";
    }

    return "database_error";
}