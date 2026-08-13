import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";
import {
    HardHat,
    MapPin,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionContainer from "@/app/components/ui/Container";

type Stat = {
    key: "chineseStaff" | "indonesianWorkers" | "projectsCompleted" | "highestGrade";
    value: string;
};

type Qualification = {
    key:
        | "b2QualificationGrade"
        | "generalContracting"
        | "civilConstruction"
        | "steelStructure"
        | "electromechanicalInstallation"
        | "smeltingEngineering"
        | "environmentalEngineering"
        | "jiangsuZhongchenInternational";
    highlighted?: boolean;
};

type Project = {
    key: "iwip" | "lanyan" | "puqing" | "zhongqing";
    status: "completed" | "active";
};

type Region = {
    key: "kalimantan" | "maluku" | "sulawesi";
};

type GalleryItem = {
    key: string;
    image: string;
    className?: string;
};

const stats: Stat[] = [
    {
        key: "chineseStaff",
        value: "400+",
    },
    {
        key: "indonesianWorkers",
        value: "3,000+",
    },
    {
        key: "projectsCompleted",
        value: "30+",
    },
    {
        key: "highestGrade",
        value: "B2",
    },
];

const specializedFieldKeys = [
    "metallurgicalProjects",
    "electromechanicalIntegration",
    "municipalEcologicalTechnology",
    "industrialProductionLines",
    "cementProductionLines",
    "nickelIronSmelting",
] as const;

const qualifications: Qualification[] = [
    {
        key: "b2QualificationGrade",
        highlighted: true,
    },
    {
        key: "generalContracting",
    },
    {
        key: "civilConstruction",
    },
    {
        key: "steelStructure",
    },
    {
        key: "electromechanicalInstallation",
    },
    {
        key: "smeltingEngineering",
    },
    {
        key: "environmentalEngineering",
    },
    {
        key: "jiangsuZhongchenInternational",
    },
];

const projects: Project[] = [
    {
        key: "iwip",
        status: "completed",
    },
    {
        key: "lanyan",
        status: "completed",
    },
    {
        key: "puqing",
        status: "completed",
    },
    {
        key: "zhongqing",
        status: "active",
    },
];

const galleryItems: GalleryItem[] = [
    {
        key: "project4",
        image: "/images/construction-4.jpg",
    },
    {
        key: "project5",
        image: "/images/construction-5.jpg",
        className: "md:col-span-2",
    },
    {
        key: "project6",
        image: "/images/construction-6.jpg",
    },
    {
        key: "project7",
        image: "/images/construction-7.jpg",
    },
    {
        key: "project8",
        image: "/images/construction-8.jpg",
    },
    {
        key: "project9",
        image: "/images/construction-9.jpg",
    },
    {
        key: "project10",
        image: "/images/construction-10.jpg",
        className: "md:col-span-2",
    },
];

const regions: Region[] = [
    {
        key: "kalimantan",
    },
    {
        key: "maluku",
    },
    {
        key: "sulawesi",
    },
];

export default function ICGPage() {
    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <HeroSection />
            <CompanyOverviewSection />
            <SpecializedFieldsSection />
            <QualificationsSection />
            <ProjectTrackRecordSection />
            <ProjectGallerySection />
            <RegionalPresenceSection />
            <CTASection />
        </main>
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
        orange: "bg-orange-600 text-white shadow-lg hover:bg-orange-700",
        "outline-light":
            "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
    };

    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center rounded-lg px-8 py-4 text-base transition-colors ${variants[variant]} ${className}`}
        >
            {children}
        </Link>
    );
}

function HeroSection() {
    const t = useTranslations("Construction.hero");

    return (
        <section className="relative overflow-hidden bg-stone-50 py-24 lg:py-32">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <div className="inline-flex rounded-full bg-orange-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
                        {t("eyebrow")}
                    </div>

                    <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
                        {t("title")}
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-2xl bg-orange-600/20" />

                    <div className="relative rotate-1 overflow-hidden rounded-2xl bg-stone-300 shadow-2xl">
                        <div className="relative h-80">
                            <Image
                                src="/images/subsidiaries-construction.jpeg"
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-slate-900/8" />
                        </div>

                        <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600">
                                    <HardHat className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-slate-950">
                                        {t("badgeTitle")}
                                    </p>

                                    <p className="text-xs text-neutral-500">
                                        {t("badgeDescription")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function CompanyOverviewSection() {
    const t = useTranslations("Construction.companyOverview");

    return (
        <section className="relative overflow-hidden bg-white py-16">
            <Image
                src="/images/construction-2.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-white/70" />

            <SectionContainer className="relative z-10 grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <div className="mt-5 space-y-5 text-base leading-7 text-neutral-800">
                        <p>{t("paragraph1")}</p>
                        <p>{t("paragraph2")}</p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
                    {stats.map((stat) => (
                        <StatCard key={stat.key} stat={stat} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function StatCard({ stat }: { stat: Stat }) {
    const t = useTranslations("Construction.stats");

    return (
        <div className="rounded-xl border border-neutral-300 bg-stone-100 p-5">
            <p className="text-2xl font-semibold tracking-tight text-orange-600">
                {stat.value}
            </p>

            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-neutral-600">
                {t(`${stat.key}.label`)}
            </p>
        </div>
    );
}

function SpecializedFieldsSection() {
    const t = useTranslations("Construction.specializedFields");

    return (
        <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-orange-600/10 blur-3xl" />

            <SectionContainer className="relative">
                <div>
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight">
                        {t("title")}
                    </h2>

                    <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {specializedFieldKeys.map((fieldKey, index) => (
                        <div
                            key={fieldKey}
                            className="group relative min-h-65 overflow-hidden rounded-xl border border-white/10"
                        >
                            <Image
                                src={`/images/fields-${index + 1}.png`}
                                alt={t(`items.${fieldKey}`)}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-black/5" />

                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <p className="text-lg font-semibold leading-6 text-white">
                                    {t(`items.${fieldKey}`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function QualificationsSection() {
    const t = useTranslations("Construction.qualifications");

    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <SectionHeader
                    align="center"
                    title={t("title")}
                />

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {qualifications.map((qualification) => (
                        <QualificationCard
                            key={qualification.key}
                            qualification={qualification}
                        />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function QualificationCard({
    qualification,
}: {
    qualification: Qualification;
}) {
    const t = useTranslations("Construction.qualifications.items");

    if (qualification.highlighted) {
        return (
            <article className="rounded-xl border-2 border-orange-600 bg-orange-600/5 p-5 text-center">
                <p className="text-3xl font-bold tracking-tight text-orange-600">
                    B2
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-950">
                    {t("b2QualificationGrade")}
                </p>
            </article>
        );
    }

    return (
        <article className="flex min-h-20 items-center justify-center rounded-xl border border-neutral-300 bg-white p-5 text-center">
            <p className="text-base leading-6 text-neutral-950">
                {t(qualification.key)}
            </p>
        </article>
    );
}

function ProjectTrackRecordSection() {
    const t = useTranslations("Construction.projects");

    return (
        <section
            id="track-record"
            className="relative overflow-hidden bg-stone-50 py-16"
        >
            <Image
                src="/images/construction-3.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-50/75" />

            <SectionContainer className="relative z-10">
                <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            {t("title")}
                        </h2>

                        <p className="mt-2 text-base leading-6 text-neutral-600">
                            {t("description")}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <MetricBadge value="30+" label={t("metrics.totalProjects")} />
                        <MetricBadge value="100%" label={t("metrics.completion")} />
                    </div>
                </div>

                <div className="mt-12 overflow-hidden rounded-xl bg-white/95 shadow-sm backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-4xl border-collapse">
                            <thead className="bg-stone-100">
                                <tr>
                                    <TableHead>{t("table.projectName")}</TableHead>
                                    <TableHead>{t("table.location")}</TableHead>
                                    <TableHead>{t("table.scope")}</TableHead>
                                    <TableHead>{t("table.status")}</TableHead>
                                </tr>
                            </thead>

                            <tbody>
                                {projects.map((project) => (
                                    <ProjectRow
                                        key={project.key}
                                        project={project}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function MetricBadge({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-xl border border-neutral-300 bg-white px-6 py-4 shadow-sm">
            <p className="text-2xl font-bold tracking-tight text-neutral-950">
                {value}
            </p>

            <p className="mt-1 text-xs uppercase tracking-wider text-neutral-600">
                {label}
            </p>
        </div>
    );
}

function TableHead({ children }: { children: ReactNode }) {
    return (
        <th className="border-b border-neutral-300 px-4 py-4 text-left text-base font-bold text-neutral-950">
            {children}
        </th>
    );
}

function ProjectRow({ project }: { project: Project }) {
    const t = useTranslations("Construction.projects.items");

    return (
        <tr className="border-b border-neutral-200 last:border-b-0">
            <td className="px-4 py-4 text-base font-bold text-neutral-950">
                {t(`${project.key}.name`)}
            </td>

            <td className="px-4 py-4 text-base text-neutral-950">
                {t(`${project.key}.location`)}
            </td>

            <td className="px-4 py-4 text-base text-neutral-600">
                {t(`${project.key}.scope`)}
            </td>

            <td className="px-4 py-4">
                <StatusBadge status={project.status} />
            </td>
        </tr>
    );
}

function StatusBadge({ status }: { status: Project["status"] }) {
    const t = useTranslations("Construction.projects.status");
    const isCompleted = status === "completed";

    return (
        <span
            className={
                isCompleted
                    ? "inline-flex rounded bg-green-100 px-2 py-1 text-xs font-bold uppercase text-green-700"
                    : "inline-flex rounded bg-blue-100 px-2 py-1 text-xs font-bold uppercase text-blue-700"
            }
        >
            {t(status)}
        </span>
    );
}

function ProjectGallerySection() {
    const t = useTranslations("Construction.gallery");

    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                    {t("title")}
                </h2>

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {galleryItems.map((item) => (
                        <GalleryCard key={item.image} item={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function GalleryCard({ item }: { item: GalleryItem }) {
    const t = useTranslations("Construction.gallery.items");

    return (
        <article
            className={`group relative h-64 overflow-hidden rounded-xl bg-stone-300 shadow-sm transition-transform duration-500 hover:scale-105 hover:shadow-xl ${item.className ?? ""}`}
        >
            <Image
                src={item.image}
                alt={t(item.key)}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
            />
        </article>
    );
}

function RegionalPresenceSection() {
    const t = useTranslations("Construction.regionalPresence");

    return (
        <section className="relative overflow-hidden bg-stone-50 py-16">
            <Image
                src="/images/construction-1.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-50/70" />

            <SectionContainer className="relative z-10">
                <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                    {t("title")}
                </h2>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {regions.map((region) => (
                        <RegionCard key={region.key} region={region} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function RegionCard({ region }: { region: Region }) {
    const t = useTranslations("Construction.regionalPresence.items");

    return (
        <article className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                <MapPin className="h-6 w-6" />
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-tight text-orange-600">
                {t(`${region.key}.name`)}
            </h3>

            <p className="mt-3 text-base leading-7 text-neutral-600">
                {t(`${region.key}.description`)}
            </p>
        </article>
    );
}

function CTASection() {
    const t = useTranslations("Construction.cta");

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

function SectionHeader({
    title,
    align = "left",
    withAccent = false,
}: {
    title: string;
    align?: "left" | "center";
    withAccent?: boolean;
}) {
    return (
        <div className={align === "center" ? "text-center" : "text-left"}>
            <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                {title}
            </h2>

            {withAccent ? (
                <div
                    className={
                        align === "center"
                            ? "mx-auto mt-3 h-1 w-16 bg-orange-600"
                            : "mt-3 h-1 w-16 bg-orange-600"
                    }
                />
            ) : null}
        </div>
    );
}
