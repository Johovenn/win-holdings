"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type CareerStatus = "draft" | "published" | "closed";

export async function createCareerAction(formData: FormData) {
    const { supabase, userId } = await requireAdmin();

    const title = getText(formData, "title");
    const slugInput = getText(formData, "slug");
    const department = getText(formData, "department");
    const location = getText(formData, "location");
    const employmentType = getText(formData, "employment_type");
    const description = getText(formData, "description");
    const requirements = getText(formData, "requirements");
    const status = getStatus(formData);
    const closingDate = getText(formData, "closing_date");

    const slug = slugify(slugInput || title);

    if (!title || !slug || !description) {
        redirect("/admin/careers?error=missing_fields");
    }

    const now = new Date().toISOString();

    const { error } = await supabase.from("careers").insert({
        title,
        slug,
        department: department || null,
        location: location || null,
        employment_type: employmentType || null,
        description,
        requirements: requirements || null,
        status,
        closing_date: closingDate || null,
        created_by: userId,
        created_at: now,
        updated_at: now,
    });

    if (error) {
        redirect(`/admin/careers?error=${getDatabaseErrorCode(error.code)}`);
    }

    revalidatePath("/admin/careers");
    revalidatePath("/career");

    redirect("/admin/careers?success=created");
}

export async function updateCareerAction(formData: FormData) {
    const { supabase } = await requireAdmin();

    const id = getText(formData, "id");
    const title = getText(formData, "title");
    const slugInput = getText(formData, "slug");
    const department = getText(formData, "department");
    const location = getText(formData, "location");
    const employmentType = getText(formData, "employment_type");
    const description = getText(formData, "description");
    const requirements = getText(formData, "requirements");
    const status = getStatus(formData);
    const closingDate = getText(formData, "closing_date");

    const slug = slugify(slugInput || title);

    if (!id || !title || !slug || !description) {
        redirect("/admin/careers?error=missing_fields");
    }

    const now = new Date().toISOString();

    const { error } = await supabase
        .from("careers")
        .update({
            title,
            slug,
            department: department || null,
            location: location || null,
            employment_type: employmentType || null,
            description,
            requirements: requirements || null,
            status,
            closing_date: closingDate || null,
            updated_at: now,
        })
        .eq("id", id);

    if (error) {
        redirect(`/admin/careers?error=${getDatabaseErrorCode(error.code)}`);
    }

    revalidatePath("/admin/careers");
    revalidatePath("/career");

    redirect("/admin/careers?success=updated");
}

export async function deleteCareerAction(formData: FormData) {
    const { supabase } = await requireAdmin();

    const id = getText(formData, "id");

    if (!id) {
        redirect("/admin/careers?error=missing_fields");
    }

    const { error } = await supabase
        .from("careers")
        .delete()
        .eq("id", id);

    if (error) {
        redirect("/admin/careers?error=delete_failed");
    }

    revalidatePath("/admin/careers");
    revalidatePath("/career");

    redirect("/admin/careers?success=deleted");
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

function getStatus(formData: FormData): CareerStatus {
    const status = String(formData.get("status") ?? "draft");

    if (status === "published") {
        return "published";
    }

    if (status === "closed") {
        return "closed";
    }

    return "draft";
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