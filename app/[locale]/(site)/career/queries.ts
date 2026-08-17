import "server-only";

import { getTranslations } from "next-intl/server";
import { query } from "@/lib/db";

export type Career = {
    id: string;
    title: string;
    slug: string;
    department: string | null;
    location: string | null;
    employment_type: string | null;
    description: string;
    requirements: string | null;
    status: "draft" | "published" | "closed";
    closing_date: string | null;
    created_at: string;
};

export async function getCareers(): Promise<Career[]> {
    const result = await query<Career>(
        `SELECT id, title, slug, department, location, employment_type,
                description, requirements, status, closing_date, created_at
         FROM careers WHERE status = $1 ORDER BY created_at DESC`,
        ["published"],
    ).catch((error) => {
        console.error("Failed to fetch careers:", error.message);
        return null;
    });

    if (!result) {
        return getFallbackCareers();
    }

    return result.rows;
}

async function getFallbackCareers(): Promise<Career[]> {
    const t = await getTranslations("Career.fallbackCareers");
    const createdAt = new Date().toISOString();

    return [
        {
            id: "fallback-1",
            title: t("businessDevelopmentOfficer.title"),
            slug: "business-development-officer",
            department: t("businessDevelopmentOfficer.department"),
            location: t("businessDevelopmentOfficer.location"),
            employment_type: t("businessDevelopmentOfficer.employmentType"),
            description: t("businessDevelopmentOfficer.description"),
            requirements: null,
            status: "published",
            closing_date: null,
            created_at: createdAt,
        },
        {
            id: "fallback-2",
            title: t("financeAccountingStaff.title"),
            slug: "finance-accounting-staff",
            department: t("financeAccountingStaff.department"),
            location: t("financeAccountingStaff.location"),
            employment_type: t("financeAccountingStaff.employmentType"),
            description: t("financeAccountingStaff.description"),
            requirements: null,
            status: "published",
            closing_date: null,
            created_at: createdAt,
        },
        {
            id: "fallback-3",
            title: t("humanResourcesOfficer.title"),
            slug: "human-resources-officer",
            department: t("humanResourcesOfficer.department"),
            location: t("humanResourcesOfficer.location"),
            employment_type: t("humanResourcesOfficer.employmentType"),
            description: t("humanResourcesOfficer.description"),
            requirements: null,
            status: "published",
            closing_date: null,
            created_at: createdAt,
        },
    ];
}
