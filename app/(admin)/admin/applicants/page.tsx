import Link from "next/link";
import {
    ArrowLeft,
    BriefcaseBusiness,
    ExternalLink,
    Mail,
    Phone,
    User,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type Applicant = {
    id: string;
    career_title: string;
    career_slug: string;
    full_name: string;
    email: string;
    phone: string | null;
    linkedin_url: string | null;
    portfolio_url: string | null;
    message: string | null;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    created_at: string;
};

export default async function AdminApplicantsPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("career_applications")
        .select(
            "id, career_title, career_slug, full_name, email, phone, linkedin_url, portfolio_url, message, status, created_at",
        )
        .order("created_at", { ascending: false });

    const applicants = (data ?? []) as Applicant[];

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <section className="border-b border-neutral-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-6 lg:px-16">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-orange-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </Link>

                    <div className="mt-4 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                            <BriefcaseBusiness className="h-6 w-6" />
                        </div>

                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                                Recruitment
                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950">
                                Job Applicants
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    {error ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            Failed to load applicants. Please check your Supabase
                            policies.
                        </div>
                    ) : null}

                    {!error && applicants.length === 0 ? (
                        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-12 text-center shadow-sm">
                            <User className="mx-auto h-10 w-10 text-neutral-400" />

                            <h2 className="mt-4 text-xl font-semibold text-neutral-950">
                                No applicants yet
                            </h2>

                            <p className="mt-2 text-sm text-neutral-600">
                                Submitted job applications will appear here.
                            </p>
                        </div>
                    ) : null}

                    {!error && applicants.length > 0 ? (
                        <div className="grid gap-6">
                            {applicants.map((applicant) => (
                                <article
                                    key={applicant.id}
                                    className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase text-orange-700">
                                                    {applicant.status}
                                                </span>

                                                <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                                                    {formatDate(applicant.created_at)}
                                                </span>
                                            </div>

                                            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                                                {applicant.full_name}
                                            </h2>

                                            <p className="mt-1 text-sm font-medium text-orange-600">
                                                Applied for {applicant.career_title}
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-2 text-sm text-neutral-600">
                                            <a
                                                href={`mailto:${applicant.email}`}
                                                className="inline-flex items-center gap-2 transition-colors hover:text-orange-600"
                                            >
                                                <Mail className="h-4 w-4" />
                                                {applicant.email}
                                            </a>

                                            {applicant.phone ? (
                                                <a
                                                    href={`tel:${applicant.phone}`}
                                                    className="inline-flex items-center gap-2 transition-colors hover:text-orange-600"
                                                >
                                                    <Phone className="h-4 w-4" />
                                                    {applicant.phone}
                                                </a>
                                            ) : null}
                                        </div>
                                    </div>

                                    {applicant.message ? (
                                        <p className="mt-5 rounded-xl bg-stone-50 p-4 text-sm leading-6 text-neutral-600">
                                            {applicant.message}
                                        </p>
                                    ) : null}

                                    <div className="mt-5 flex flex-wrap gap-3">
                                        {applicant.linkedin_url ? (
                                            <LinkButton href={applicant.linkedin_url}>
                                                LinkedIn
                                            </LinkButton>
                                        ) : null}

                                        {applicant.portfolio_url ? (
                                            <LinkButton href={applicant.portfolio_url}>
                                                Portfolio / CV
                                            </LinkButton>
                                        ) : null}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : null}
                </div>
            </section>
        </main>
    );
}

function LinkButton({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-orange-600 hover:text-orange-600"
        >
            {children}
            <ExternalLink className="h-4 w-4" />
        </a>
    );
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
}