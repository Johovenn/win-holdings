"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

type CareerStatus = "draft" | "published" | "closed";

export async function createCareerAction(formData: FormData) {
    const { id: userId } = await requireAdmin();

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

    try {
        await query(
            `INSERT INTO careers (title, slug, department, location, employment_type,
             description, requirements, status, closing_date, created_by, created_at, updated_at)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
            [title, slug, department || null, location || null, employmentType || null,
                description, requirements || null, status, closingDate || null, userId, now, now],
        );
    } catch (error) {
        redirect(`/admin/careers?error=${getDatabaseErrorCode(error)}`);
    }

    revalidatePath("/admin/careers");
    revalidatePath("/career");

    redirect("/admin/careers?success=created");
}

export async function updateCareerAction(formData: FormData) {
    await requireAdmin();

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

    try {
        await query(
            `UPDATE careers SET title=$1, slug=$2, department=$3, location=$4,
             employment_type=$5, description=$6, requirements=$7, status=$8,
             closing_date=$9, updated_at=$10 WHERE id=$11`,
            [title, slug, department || null, location || null, employmentType || null,
                description, requirements || null, status, closingDate || null, now, id],
        );
    } catch (error) {
        redirect(`/admin/careers?error=${getDatabaseErrorCode(error)}`);
    }

    revalidatePath("/admin/careers");
    revalidatePath("/career");

    redirect("/admin/careers?success=updated");
}

export async function deleteCareerAction(formData: FormData) {
    await requireAdmin();

    const id = getText(formData, "id");

    if (!id) {
        redirect("/admin/careers?error=missing_fields");
    }

    try {
        await query("DELETE FROM careers WHERE id = $1", [id]);
    } catch {
        redirect("/admin/careers?error=delete_failed");
    }

    revalidatePath("/admin/careers");
    revalidatePath("/career");

    redirect("/admin/careers?success=deleted");
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

function getDatabaseErrorCode(error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
        return "duplicate_slug";
    }

    return "database_error";
}
