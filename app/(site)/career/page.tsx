import Link from "next/link";
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
    department?: string;
    location?: string;
    success?: string;
    error?: string;
};

type BenefitCard = {
    title: string;
    description: string;
    icon: ReactNode;
};

type HiringStep = {
    number: string;
    title: string;
    description: string;
};

const benefits: BenefitCard[] = [
    {
        title: "Professional Development",
        description:
            "Continuous learning and career advancement opportunities across diverse industries within our extensive network.",
        icon: <TrendingUp className="h-6 w-6" />,
    },
    {
        title: "Collaborative Culture",
        description:
            "A supportive environment where teamwork and shared vision lead to stronger outcomes and lasting professional relationships.",
        icon: <Users className="h-6 w-6" />,
    },
    {
        title: "Strategic Impact",
        description:
            "Contribute to the growth and governance of a leading diversified holding company making real impact across markets.",
        icon: <Target className="h-6 w-6" />,
    },
];

const hiringSteps: HiringStep[] = [
    {
        number: "1",
        title: "Application Review",
        description:
            "Our talent acquisition team carefully reviews every submission.",
    },
    {
        number: "2",
        title: "Initial Screening",
        description:
            "A brief conversation to align on expectations and basic qualifications.",
    },
    {
        number: "3",
        title: "Technical Interview",
        description:
            "Deep dive into your domain expertise and problem-solving skills.",
    },
    {
        number: "4",
        title: "Final Offer",
        description:
            "Welcoming you to the WIN Holdings family with a comprehensive plan.",
    },
];

const fallbackCareers: Career[] = [
    {
        id: "fallback-1",
        title: "Business Development Officer",
        slug: "business-development-officer",
        department: "Business Development",
        location: "Jakarta, Indonesia",
        employment_type: "Full-time",
        description:
            "Support business expansion, partnership development, and strategic initiatives across WIN Holdings and its subsidiaries.",
        requirements: null,
        status: "published",
        closing_date: null,
        created_at: new Date().toISOString(),
    },
    {
        id: "fallback-2",
        title: "Finance & Accounting Staff",
        slug: "finance-accounting-staff",
        department: "Finance",
        location: "Jakarta, Indonesia",
        employment_type: "Full-time",
        description:
            "Support financial reporting, documentation, budgeting, invoice management, and accounting operations within the company.",
        requirements: null,
        status: "published",
        closing_date: null,
        created_at: new Date().toISOString(),
    },
    {
        id: "fallback-3",
        title: "Human Resources Officer",
        slug: "human-resources-officer",
        department: "Human Resources",
        location: "Jakarta, Indonesia",
        employment_type: "Full-time",
        description:
            "Support recruitment, employee administration, HR documentation, and coordination with business units.",
        requirements: null,
        status: "published",
        closing_date: null,
        created_at: new Date().toISOString(),
    },
];

export default async function CareersPage({
    searchParams,
}: {
    searchParams?: SearchParams | Promise<SearchParams>;
}) {
    const params = await Promise.resolve(searchParams ?? {});
    const careers = await getCareers();

    const filteredCareers = filterCareers(careers, params);
    const departments = getUniqueOptions(careers.map((career) => career.department));
    const locations = getUniqueOptions(careers.map((career) => career.location));

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <WhyJoinUsSection />

            <ApplicationStatusMessage
                success={params.success}
                error={params.error}
            />

            <OpenOpportunitiesSection
                careers={filteredCareers}
                departments={departments}
                locations={locations}
                selectedDepartment={params.department ?? ""}
                selectedLocation={params.location ?? ""}
                searchQuery={params.q ?? ""}
            />
            <HiringProcessSection />
            <TalentPoolCTASection />
        </main>
    );
}

function ApplicationStatusMessage({
    success,
    error,
}: {
    success?: string;
    error?: string;
}) {
    const successMessage = getSuccessMessage(success);
    const errorMessage = getErrorMessage(error);

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

function getSuccessMessage(success?: string) {
    if (success === "application_submitted") {
        return "Your application has been submitted successfully.";
    }

    return null;
}

function getErrorMessage(error?: string) {
    if (error === "missing_application_fields") {
        return "Please fill in your full name and email address.";
    }

    if (error === "invalid_email") {
        return "Please enter a valid email address.";
    }

    if (error === "application_failed") {
        return "Failed to submit your application. Please try again.";
    }

    return null;
}

async function getCareers(): Promise<Career[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("careers")
        .select(
            "id, title, slug, department, location, employment_type, description, requirements, status, closing_date, created_at"
        )
        .eq("status", "published")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Failed to fetch careers:", error.message);
        return fallbackCareers;
    }

    if (!data || data.length === 0) {
        return [];
    }

    return data as Career[];
}

function filterCareers(careers: Career[], params: SearchParams) {
    const searchQuery = params.q?.trim().toLowerCase();
    const department = params.department?.trim();
    const location = params.location?.trim();

    return careers.filter((career) => {
        const matchesSearch = searchQuery
            ? [
                  career.title,
                  career.department,
                  career.location,
                  career.employment_type,
                  career.description,
              ]
                  .filter(Boolean)
                  .join(" ")
                  .toLowerCase()
                  .includes(searchQuery)
            : true;

        const matchesDepartment = department
            ? career.department === department
            : true;

        const matchesLocation = location ? career.location === location : true;

        return matchesSearch && matchesDepartment && matchesLocation;
    });
}

function getUniqueOptions(values: Array<string | null>) {
    return Array.from(
        new Set(values.filter((value): value is string => Boolean(value)))
    ).sort((a, b) => a.localeCompare(b));
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

function WhyJoinUsSection() {
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
                        Why Work at WIN Holdings?
                    </h1>

                    <p className="mx-auto mt-3 max-w-2xl text-base leading-6 text-neutral-600">
                        We provide the platform for you to excel, grow, and lead in a
                        dynamic global market.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {benefits.map((benefit) => (
                        <article
                            key={benefit.title}
                            className="rounded-xl border border-neutral-300 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600">
                                {benefit.icon}
                            </div>

                            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">
                                {benefit.title}
                            </h2>

                            <p className="mt-3 text-base leading-7 text-neutral-600">
                                {benefit.description}
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
    departments,
    locations,
    selectedDepartment,
    selectedLocation,
    searchQuery,
}: {
    careers: Career[];
    departments: string[];
    locations: string[];
    selectedDepartment: string;
    selectedLocation: string;
    searchQuery: string;
}) {
    return (
        <section className="bg-stone-100 py-24 lg:py-32">
            <SectionContainer>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            Open Opportunities
                        </h2>

                        <p className="mt-2 text-base leading-6 text-neutral-600">
                            Find the role that matches your expertise and ambition.
                        </p>
                    </div>

                    <CareerFilters
                        departments={departments}
                        locations={locations}
                        selectedDepartment={selectedDepartment}
                        selectedLocation={selectedLocation}
                        searchQuery={searchQuery}
                    />
                </div>

                {careers.length > 0 ? (
                    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {careers.map((career) => (
                            <CareerCard key={career.id} career={career} />
                        ))}
                    </div>
                ) : (
                    <EmptyCareersState />
                )}

                <Pagination />
            </SectionContainer>
        </section>
    );
}

function CareerFilters({
    departments,
    locations,
    selectedDepartment,
    selectedLocation,
    searchQuery,
}: {
    departments: string[];
    locations: string[];
    selectedDepartment: string;
    selectedLocation: string;
    searchQuery: string;
}) {
    return (
        <form className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] lg:flex">
            <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />

                <input
                    type="search"
                    name="q"
                    defaultValue={searchQuery}
                    placeholder="Search for roles..."
                    className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-11 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-600 lg:w-64"
                />
            </label>

            <select
                name="department"
                defaultValue={selectedDepartment}
                className="h-12 rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-orange-600"
            >
                <option value="">All Departments</option>
                {departments.map((department) => (
                    <option key={department} value={department}>
                        {department}
                    </option>
                ))}
            </select>

            <select
                name="location"
                defaultValue={selectedLocation}
                className="h-12 rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-orange-600"
            >
                <option value="">All Locations</option>
                {locations.map((location) => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                className="h-12 rounded-lg bg-neutral-950 px-5 text-sm font-medium text-white transition-colors hover:bg-black lg:hidden"
            >
                Filter
            </button>
        </form>
    );
}

function CareerCard({ career }: { career: Career }) {
    return (
        <article className="flex min-h-80 flex-col rounded-xl border border-neutral-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
                <span className="rounded bg-stone-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neutral-600">
                    {career.employment_type ?? "Full-time"}
                </span>

                <BriefcaseBusiness className="h-5 w-5 text-neutral-500" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold leading-8 tracking-tight text-neutral-950">
                {career.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm leading-5 text-neutral-600">
                <span>{career.department ?? "WIN Holdings"}</span>

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

function EmptyCareersState() {
    return (
        <div className="mt-12 rounded-2xl border border-neutral-300 bg-white p-10 text-center shadow-sm">
            <BriefcaseBusiness className="mx-auto h-10 w-10 text-orange-600" />

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-neutral-950">
                No matching positions found
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-neutral-600">
                There are currently no published career positions that match your
                search. Try changing the filters or submit a general application.
            </p>

            <Link
                href="/career"
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
            >
                Reset Filters
            </Link>
        </div>
    );
}

function Pagination() {
    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            <button
                type="button"
                disabled
                className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 text-neutral-400 opacity-40"
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </button>

            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded bg-orange-600 text-base font-bold text-white"
            >
                1
            </button>

            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 bg-white text-base font-medium text-neutral-950"
            >
                2
            </button>

            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 bg-white text-base font-medium text-neutral-950"
            >
                3
            </button>

            <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded border border-neutral-300 bg-white text-neutral-950"
                aria-label="Next page"
            >
                <ChevronRight className="h-4 w-4" />
            </button>
        </div>
    );
}

function HiringProcessSection() {
    return (
        <section className="bg-white py-24 lg:py-32">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        Our Hiring Process
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-base leading-6 text-neutral-600">
                        A transparent and rigorous journey to ensure we find the best
                        fit for our culture and excellence standards.
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
                                    {step.title}
                                </h3>

                                <p className="mt-2 max-w-xs text-sm leading-6 text-neutral-600">
                                    {step.description}
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
                    Don&apos;t See a Perfect Match?
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    We are always looking for exceptional talent to join our growing
                    ecosystem. Submit your CV to our talent pool for future
                    consideration.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <ButtonLink href="/contact" variant="orange">
                        Contact Us
                    </ButtonLink>
                </div>
            </SectionContainer>
        </section>
    );
}