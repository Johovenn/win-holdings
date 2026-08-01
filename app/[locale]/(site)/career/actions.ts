"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createCareerApplicationAction(formData: FormData) {
    const supabase = await createClient();

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

    const { error } = await supabase.from("career_applications").insert({
        career_id: careerId || null,
        career_slug: careerSlug,
        career_title: careerTitle,
        full_name: fullName,
        email,
        phone: phone || null,
        linkedin_url: linkedinUrl || null,
        portfolio_url: portfolioUrl || null,
        message: message || null,
        status: "new",
    });

    if (error) {
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