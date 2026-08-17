"use server";

import { redirect } from "next/navigation";
import { query } from "@/lib/db";

export async function createCareerApplicationAction(formData: FormData) {
    const careerId = getText(formData, "career_id");
    const careerSlug = getText(formData, "career_slug");
    const careerTitle = getText(formData, "career_title");

    const fullName = getText(formData, "full_name");
    const email = getText(formData, "email");
    const phone = getText(formData, "phone");
    const linkedinUrl = getText(formData, "linkedin_url");
    const portfolioUrl = getText(formData, "portfolio_url");
    const message = getText(formData, "message");

    if (!careerSlug || !careerTitle || !fullName || !email) {
        redirect("/career?error=missing_application_fields");
    }

    if (!isValidEmail(email)) {
        redirect("/career?error=invalid_email");
    }

    try {
        await query(
            `INSERT INTO career_applications
             (career_id, career_slug, career_title, full_name, email, phone,
              linkedin_url, portfolio_url, message, status)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
            [careerId || null, careerSlug, careerTitle, fullName, email,
                phone || null, linkedinUrl || null, portfolioUrl || null,
                message || null, "new"],
        );
    } catch {
        redirect("/career?error=application_failed");
    }

    redirect("/career?success=application_submitted");
}

function getText(formData: FormData, key: string) {
    return String(formData.get(key) ?? "").trim();
}

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
