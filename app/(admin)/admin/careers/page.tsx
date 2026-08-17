import Link from "next/link";
import {
    ArrowLeft,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    Edit3,
    FilePlus2,
    MapPin,
    Plus,
    Trash2,
} from "lucide-react";
import { query } from "@/lib/db";
import {
    createCareerAction,
    deleteCareerAction,
    updateCareerAction,
} from "./actions";

type SearchParams = {
    success?: string;
    error?: string;
};

type CareerStatus = "draft" | "published" | "closed";

type CareerRow = {
    id: string;
    title: string;
    slug: string;
    department: string | null;
    location: string | null;
    employment_type: string | null;
    description: string;
    requirements: string | null;
    status: CareerStatus;
    closing_date: string | null;
    created_at: string;
    updated_at: string;
};

type CareerFormProps = {
    mode: "create" | "edit";
    action: (formData: FormData) => void | Promise<void>;
    career?: CareerRow;
};

export default async function AdminCareersPage({
    searchParams,
}: {
    searchParams?: SearchParams | Promise<SearchParams>;
}) {
    const params = await Promise.resolve(searchParams ?? {});
    const result = await query<CareerRow>(
        `SELECT id, title, slug, department, location, employment_type,
                description, requirements, status, closing_date, created_at, updated_at
         FROM careers ORDER BY created_at DESC`,
    ).catch(() => null);
    const error = !result;
    const careerItems = result?.rows ?? [];

    const totalCareers = careerItems.length;
    const publishedCareers = careerItems.filter(
        (item) => item.status === "published",
    ).length;
    const draftCareers = careerItems.filter(
        (item) => item.status === "draft",
    ).length;
    const closedCareers = careerItems.filter(
        (item) => item.status === "closed",
    ).length;

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <section className="border-b border-neutral-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-16">
                    <div>
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
                                    Admin Content
                                </p>

                                <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-950">
                                    Career Management
                                </h1>
                            </div>
                        </div>
                    </div>

                    <a
                        href="#create-career"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
                    >
                        <Plus className="h-4 w-4" />
                        Add Career
                    </a>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <StatusMessage
                        success={params.success}
                        error={params.error}
                    />

                    <div className="grid gap-5 md:grid-cols-4">
                        <StatCard title="Total Careers" value={totalCareers} />
                        <StatCard title="Published" value={publishedCareers} />
                        <StatCard title="Draft" value={draftCareers} />
                        <StatCard title="Closed" value={closedCareers} />
                    </div>

                    <div
                        id="create-career"
                        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                                <FilePlus2 className="h-5 w-5" />
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                                    Create Career Position
                                </h2>

                                <p className="mt-1 text-sm text-neutral-600">
                                    Add a new job opening, internship, or recruitment
                                    announcement.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <CareerForm
                                mode="create"
                                action={createCareerAction}
                            />
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl border border-neutral-200 bg-white shadow-sm">
                        <div className="border-b border-neutral-200 p-6">
                            <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                                Existing Career Positions
                            </h2>

                            <p className="mt-1 text-sm text-neutral-600">
                                Edit, publish, close, or delete existing career
                                openings.
                            </p>
                        </div>

                        {error ? (
                            <div className="p-6">
                                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    Failed to load career data. Please check your
                                    Supabase table and policies.
                                </div>
                            </div>
                        ) : null}

                        {!error && careerItems.length === 0 ? (
                            <div className="p-6">
                                <div className="rounded-xl border border-neutral-200 bg-stone-50 px-4 py-10 text-center">
                                    <BriefcaseBusiness className="mx-auto h-10 w-10 text-neutral-400" />

                                    <h3 className="mt-4 text-lg font-semibold text-neutral-950">
                                        No career positions yet
                                    </h3>

                                    <p className="mt-2 text-sm text-neutral-600">
                                        Create your first career opening using the
                                        form above.
                                    </p>
                                </div>
                            </div>
                        ) : null}

                        {!error && careerItems.length > 0 ? (
                            <div className="divide-y divide-neutral-200">
                                {careerItems.map((career) => (
                                    <CareerItem
                                        key={career.id}
                                        career={career}
                                    />
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>
        </main>
    );
}

function CareerForm({ mode, action, career }: CareerFormProps) {
    const isEditMode = mode === "edit";

    return (
        <form action={action} className="grid gap-5">
            {isEditMode ? (
                <input type="hidden" name="id" value={career?.id} />
            ) : null}

            <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Job Title
                    </span>

                    <input
                        name="title"
                        type="text"
                        required
                        defaultValue={career?.title ?? ""}
                        placeholder="Finance & Accounting Staff"
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Slug
                    </span>

                    <input
                        name="slug"
                        type="text"
                        defaultValue={career?.slug ?? ""}
                        placeholder="finance-accounting-staff"
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                    />
                </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Department
                    </span>

                    <input
                        name="department"
                        type="text"
                        defaultValue={career?.department ?? ""}
                        placeholder="Finance"
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Location
                    </span>

                    <input
                        name="location"
                        type="text"
                        defaultValue={career?.location ?? ""}
                        placeholder="Jakarta, Indonesia"
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                    />
                </label>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Employment Type
                    </span>

                    <input
                        name="employment_type"
                        type="text"
                        defaultValue={career?.employment_type ?? ""}
                        placeholder="Full-time"
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Status
                    </span>

                    <select
                        name="status"
                        defaultValue={career?.status ?? "draft"}
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-orange-600"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="closed">Closed</option>
                    </select>
                </label>

                <label className="block">
                    <span className="text-sm font-medium text-neutral-700">
                        Closing Date
                    </span>

                    <input
                        name="closing_date"
                        type="date"
                        defaultValue={career?.closing_date ?? ""}
                        className="mt-2 h-11 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition-colors focus:border-orange-600"
                    />
                </label>
            </div>

            <label className="block">
                <span className="text-sm font-medium text-neutral-700">
                    Job Description
                </span>

                <textarea
                    name="description"
                    rows={isEditMode ? 7 : 9}
                    required
                    defaultValue={career?.description ?? ""}
                    placeholder="Describe the role, responsibilities, and position overview."
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                />
            </label>

            <label className="block">
                <span className="text-sm font-medium text-neutral-700">
                    Requirements
                </span>

                <textarea
                    name="requirements"
                    rows={isEditMode ? 6 : 8}
                    defaultValue={career?.requirements ?? ""}
                    placeholder="List qualifications, skills, education, and experience requirements."
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                />
            </label>

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
                >
                    <CheckCircle2 className="h-4 w-4" />
                    {isEditMode ? "Save Changes" : "Create Career"}
                </button>
            </div>
        </form>
    );
}

function CareerItem({ career }: { career: CareerRow }) {
    return (
        <article className="p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={career.status} />

                        {career.department ? (
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                                {career.department}
                            </span>
                        ) : null}

                        {career.employment_type ? (
                            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                                {career.employment_type}
                            </span>
                        ) : null}

                        {career.location ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                                <MapPin className="h-3.5 w-3.5" />
                                {career.location}
                            </span>
                        ) : null}

                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600">
                            <CalendarDays className="h-3.5 w-3.5" />
                            {formatDate(career.created_at)}
                        </span>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold tracking-tight text-neutral-950">
                        {career.title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-500">
                        /career #{career.slug}
                    </p>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600">
                        {career.description}
                    </p>

                    {career.closing_date ? (
                        <p className="mt-3 text-sm font-medium text-neutral-700">
                            Closing Date: {formatDate(career.closing_date)}
                        </p>
                    ) : null}
                </div>

                <div className="flex shrink-0 gap-3">
                    <Link
                        href="/career"
                        target="_blank"
                        className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-orange-600 hover:text-orange-600"
                    >
                        View
                    </Link>

                    <form action={deleteCareerAction}>
                        <input type="hidden" name="id" value={career.id} />

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:border-red-300 hover:bg-red-100"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete
                        </button>
                    </form>
                </div>
            </div>

            <details className="mt-5 rounded-xl border border-neutral-200 bg-stone-50">
                <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-semibold text-neutral-800">
                    <Edit3 className="h-4 w-4 text-orange-600" />
                    Edit Career
                </summary>

                <div className="border-t border-neutral-200 bg-white p-5">
                    <CareerForm
                        mode="edit"
                        action={updateCareerAction}
                        career={career}
                    />
                </div>
            </details>
        </article>
    );
}

function StatusBadge({ status }: { status: CareerStatus }) {
    if (status === "published") {
        return (
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Published
            </span>
        );
    }

    if (status === "closed") {
        return (
            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">
                Closed
            </span>
        );
    }

    return (
        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            Draft
        </span>
    );
}

function StatCard({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    return (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">{title}</p>

            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-950">
                {value}
            </p>
        </div>
    );
}

function StatusMessage({
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
        <div className="mb-6">
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
        </div>
    );
}

function getSuccessMessage(success?: string) {
    if (success === "created") {
        return "Career position created successfully.";
    }

    if (success === "updated") {
        return "Career position updated successfully.";
    }

    if (success === "deleted") {
        return "Career position deleted successfully.";
    }

    return null;
}

function getErrorMessage(error?: string) {
    if (error === "missing_fields") {
        return "Please fill in the required fields: job title and description.";
    }

    if (error === "duplicate_slug") {
        return "The slug already exists. Please use a different slug.";
    }

    if (error === "delete_failed") {
        return "Failed to delete the career position. Please try again.";
    }

    if (error === "database_error") {
        return "A database error occurred. Please check your Supabase table and policies.";
    }

    return null;
}

function formatDate(value: string | null) {
    if (!value) {
        return "Not available";
    }

    return new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
}
