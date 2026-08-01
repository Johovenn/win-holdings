import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";
import {
    BriefcaseBusiness,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Search,
    Target,
    TrendingUp,
    Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import CareerApplicationButton from "@/app/components/career/CareerApplicationButton";

type Career = {
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

type SearchParams = {
    q?: string;
    page?: string;
    success?: string;
    error?: string;
};

type BenefitCard = {
    key: "professionalDevelopment" | "collaborativeCulture" | "strategicImpact";
    icon: ReactNode;
};

type HiringStep = {
    key:
        | "applicationReview"
        | "initialScreening"
        | "technicalInterview"
        | "finalOffer";
    number: string;
};

const CAREERS_PER_PAGE = 6;

const benefits: BenefitCard[] = [
    {
        key: "professionalDevelopment",
        icon: <TrendingUp className="h-6 w-6" />,
    },
    {
        key: "collaborativeCulture",
        icon: <Users className="h-6 w-6" />,
    },
    {
        key: "strategicImpact",
        icon: <Target className="h-6 w-6" />,
    },
];

const hiringSteps: HiringStep[] = [
    {
        number: "1",
        key: "applicationReview",
    },
    {
        number: "2",
        key: "initialScreening",
    },
    {
        number: "3",
        key: "technicalInterview",
    },
    {
        number: "4",
        key: "finalOffer",
    },
];

export default async function CareersPage({
    searchParams,
}: {
    searchParams?: SearchParams | Promise<SearchParams>;
}) {
    const params = await Promise.resolve(searchParams ?? {});
    const locale = await getLocale();
    const careers = await getCareers();

    const filteredCareers = filterCareers(careers, params);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredCareers.length / CAREERS_PER_PAGE),
    );

    const currentPage = getCurrentPage(params.page, totalPages);
    const startIndex = (currentPage - 1) * CAREERS_PER_PAGE;
    const paginatedCareers = filteredCareers.slice(
        startIndex,
        startIndex + CAREERS_PER_PAGE,
    );

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <WhyJoinUsSection />

            <ApplicationStatusMessage
                success={params.success}
                error={params.error}
            />

            <OpenOpportunitiesSection
                careers={paginatedCareers}
                searchQuery={params.q ?? ""}
                currentPage={currentPage}
                totalPages={totalPages}
                locale={locale}
            />

            <HiringProcessSection />
            <TalentPoolCTASection />
        </main>
    );
}

function getCurrentPage(page: string | undefined, totalPages: number) {
    const parsedPage = Number(page);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
        return 1;
    }

    if (parsedPage > totalPages) {
        return totalPages;
    }

    return parsedPage;
}

async function getCareers(): Promise<Career[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("careers")
        .select(
            "id, title, slug, department, location, employment_type, description, requirements, status, closing_date, created_at",
        )
        .eq("status", "published")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch careers:", error.message);
        return await getFallbackCareers();
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data as Career[];
}

async function getFallbackCareers(): Promise<Career[]> {
    const t = await getTranslations("Career.fallbackCareers");

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
            created_at: new Date().toISOString(),
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
            created_at: new Date().toISOString(),
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
            created_at: new Date().toISOString(),
        },
    ];
}

function filterCareers(careers: Career[], params: SearchParams) {
    const searchQuery = normalizeFilterValue(params.q);

    return careers.filter((career) => {
        const careerTitle = normalizeFilterValue(career.title);

        return searchQuery ? careerTitle.includes(searchQuery) : true;
    });
}

function normalizeFilterValue(value?: string | null) {
    return value?.trim().toLowerCase() ?? "";
}

function SectionContainer({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`mx-auto w-full max-w-7xl px-6 lg:px-16 ${className}`}>
            {children}
        </div>
    );
}

function ButtonLink({
    href,
    children,
    variant = "orange",
    className = "",
}: {
    href: string;
    children: ReactNode;
    variant?: "orange" | "outline-light";
    className?: string;
}) {
    const variants = {
        orange: "bg-orange-600 text-white shadow-xl hover:bg-orange-700",
        "outline-light":
            "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
    };

    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center rounded-lg px-8 py-4 text-base font-semibold transition-colors ${variants[variant]} ${className}`}
        >
            {children}
        </Link>
    );
}

function ApplicationStatusMessage({
    success,
    error,
}: {
    success?: string;
    error?: string;
}) {
    const t = useTranslations("Career.status");

    const successMessage = getSuccessMessage(success, t);
    const errorMessage = getErrorMessage(error, t);

    if (!successMessage && !errorMessage) {
        return null;
    }

    return (
        <section className="bg-white py-6">
            <SectionContainer>
                {successMessage ? (
                    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                        {successMessage}
                    </div>
                ) : null}

                {errorMessage ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {errorMessage}
                    </div>
                ) : null}
            </SectionContainer>
        </section>
    );
}

function getSuccessMessage(
    success: string | undefined,
    t: ReturnType<typeof useTranslations>,
) {
    if (success === "application_submitted") {
        return t("success.applicationSubmitted");
    }

    return null;
}

function getErrorMessage(
    error: string | undefined,
    t: ReturnType<typeof useTranslations>,
) {
    if (error === "missing_application_fields") {
        return t("errors.missingApplicationFields");
    }

    if (error === "invalid_email") {
        return t("errors.invalidEmail");
    }

    if (error === "application_failed") {
        return t("errors.applicationFailed");
    }

    return null;
}

function WhyJoinUsSection() {
    const t = useTranslations("Career.whyJoinUs");

    return (
        <section className="relative overflow-hidden bg-white py-24 lg:py-32">
            <Image
                src="/images/career-bg.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-white/70" />

            <SectionContainer className="relative z-10">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-base leading-6 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {benefits.map((benefit) => (
                        <article
                            key={benefit.key}
                            className="rounded-xl border border-neutral-300 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600">
                                {benefit.icon}
                            </div>

                            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">
                                {t(`benefits.${benefit.key}.title`)}
                            </h2>

                            <p className="mt-3 text-base leading-7 text-neutral-600">
                                {t(`benefits.${benefit.key}.description`)}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function OpenOpportunitiesSection({
    careers,
    searchQuery,
    currentPage,
    totalPages,
    locale,
}: {
    careers: Career[];
    searchQuery: string;
    currentPage: number;
    totalPages: number;
    locale: string;
}) {
    const t = useTranslations("Career.openOpportunities");

    return (
        <section className="bg-stone-100 py-24 lg:py-32">
            <SectionContainer>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            {t("title")}
                        </h2>

                        <p className="mt-2 text-base leading-6 text-neutral-600">
                            {t("description")}
                        </p>
                    </div>

                    <CareerFilters
                        searchQuery={searchQuery}
                        locale={locale}
                    />
                </div>

                {careers.length > 0 ? (
                    <>
                        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {careers.map((career) => (
                                <CareerCard key={career.id} career={career} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            searchQuery={searchQuery}
                        />
                    </>
                ) : (
                    <EmptyCareersState />
                )}
            </SectionContainer>
        </section>
    );
}

function CareerFilters({
    searchQuery,
    locale,
}: {
    searchQuery: string;
    locale: string;
}) {
    const t = useTranslations("Career.filters");

    return (
        <form
            action={`/${locale}/career`}
            method="GET"
            className="grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] lg:w-auto"
        >
            <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                <input
                    type="search"
                    name="q"
                    defaultValue={searchQuery}
                    placeholder={t("placeholder")}
                    className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-11 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-600 lg:w-72"
                />
            </label>

            <button
                type="submit"
                className="h-12 rounded-lg bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-black"
            >
                {t("search")}
            </button>

            <Link
                href="/career"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
            >
                {t("reset")}
            </Link>
        </form>
    );
}

function CareerCard({ career }: { career: Career }) {
    const t = useTranslations("Career.card");

    return (
        <article className="flex min-h-80 flex-col rounded-xl border border-neutral-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <span className="rounded bg-stone-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-600">
                    {getEmploymentTypeLabel(career.employment_type, t)}
                </span>

                <BriefcaseBusiness className="h-5 w-5 text-neutral-500" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold leading-8 tracking-tight text-neutral-950">
                {career.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm leading-5 text-neutral-600">
                <span>{career.department ?? t("departmentFallback")}</span>

                {career.location ? (
                    <>
                        <span className="h-1 w-1 rounded-full bg-neutral-300" />

                        <span className="inline-flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {career.location}
                        </span>
                    </>
                ) : null}
            </div>

            <p className="mt-5 line-clamp-3 text-base leading-6 text-neutral-600">
                {career.description}
            </p>

            <div className="mt-auto pt-6">
                <CareerApplicationButton
                    careerId={career.id}
                    careerSlug={career.slug}
                    careerTitle={career.title}
                />
            </div>
        </article>
    );
}

function getEmploymentTypeLabel(
    employmentType: string | null,
    t: ReturnType<typeof useTranslations>,
) {
    if (!employmentType) {
        return t("employmentTypes.fullTime");
    }

    const normalized = employmentType.trim().toLowerCase();

    if (normalized === "full-time" || normalized === "full time") {
        return t("employmentTypes.fullTime");
    }

    if (normalized === "part-time" || normalized === "part time") {
        return t("employmentTypes.partTime");
    }

    if (normalized === "contract") {
        return t("employmentTypes.contract");
    }

    if (normalized === "internship") {
        return t("employmentTypes.internship");
    }

    return employmentType;
}

function EmptyCareersState() {
    const t = useTranslations("Career.empty");

    return (
        <div className="mt-12 rounded-2xl border border-neutral-300 bg-white p-10 text-center shadow-sm">
            <BriefcaseBusiness className="mx-auto h-10 w-10 text-orange-600" />

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">
                {t("title")}
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-neutral-600">
                {t("description")}
            </p>

            <Link
                href="/career"
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
            >
                {t("reset")}
            </Link>
        </div>
    );
}

function Pagination({
    currentPage,
    totalPages,
    searchQuery,
}: {
    currentPage: number;
    totalPages: number;
    searchQuery: string;
}) {
    const t = useTranslations("Career.pagination");

    if (totalPages <= 1) {
        return null;
    }

    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    return (
        <div className="mt-12 flex items-center justify-center gap-4">
            {hasPreviousPage ? (
                <Link
                    href={buildCareerPageHref({
                        page: currentPage - 1,
                        searchQuery,
                    })}
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                >
                    <ChevronLeft className="h-4 w-4" />
                    {t("previous")}
                </Link>
            ) : (
                <button
                    type="button"
                    disabled
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-400 opacity-50"
                >
                    <ChevronLeft className="h-4 w-4" />
                    {t("previous")}
                </button>
            )}

            <span className="rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-700">
                {t("pageOf", {
                    currentPage,
                    totalPages,
                })}
            </span>

            {hasNextPage ? (
                <Link
                    href={buildCareerPageHref({
                        page: currentPage + 1,
                        searchQuery,
                    })}
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                >
                    {t("next")}
                    <ChevronRight className="h-4 w-4" />
                </Link>
            ) : (
                <button
                    type="button"
                    disabled
                    className="inline-flex h-11 items-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-400 opacity-50"
                >
                    {t("next")}
                    <ChevronRight className="h-4 w-4" />
                </button>
            )}
        </div>
    );
}

function buildCareerPageHref({
    page,
    searchQuery,
}: {
    page: number;
    searchQuery: string;
}) {
    const params = new URLSearchParams();

    if (searchQuery) {
        params.set("q", searchQuery);
    }

    if (page > 1) {
        params.set("page", String(page));
    }

    const queryString = params.toString();

    return queryString ? `/career?${queryString}` : "/career";
}

function HiringProcessSection() {
    const t = useTranslations("Career.hiringProcess");

    return (
        <section className="bg-white py-24 lg:py-32">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-base leading-6 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="relative mt-16">
                    <div className="absolute left-0 right-0 top-7 hidden h-px bg-neutral-300 md:block" />

                    <div className="grid gap-10 md:grid-cols-4">
                        {hiringSteps.map((step) => (
                            <article
                                key={step.number}
                                className="relative flex flex-col items-center text-center"
                            >
                                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white shadow-[0_0_0_8px_white]">
                                    {step.number}
                                </div>

                                <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950">
                                    {t(`steps.${step.key}.title`)}
                                </h3>

                                <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-600">
                                    {t(`steps.${step.key}.description`)}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function TalentPoolCTASection() {
    const t = useTranslations("Career.talentPool");

    return (
        <section className="relative overflow-hidden bg-neutral-800 py-12 text-stone-50">
            <Image
                src="/images/cta-bg.jpeg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-neutral-950/70" />

            <SectionContainer className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                    {t("title")}
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    {t("description")}
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <ButtonLink href="/contact" variant="orange">
                        {t("button")}
                    </ButtonLink>
                </div>
            </SectionContainer>
        </section>
    );
}