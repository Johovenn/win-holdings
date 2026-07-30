import type { ReactNode } from "react";
import {
    HardHat,
    MapPin,
} from "lucide-react";
import Image from "next/image";
import ButtonLink from "@/app/components/ui/ButtonLink";

type Stat = {
    value: string;
    label: string;
};

type Qualification = {
    title: string;
    highlighted?: boolean;
};

type Project = {
    name: string;
    location: string;
    scope: string;
    status: "Completed" | "Active";
};

type Region = {
    name: string;
    description: string;
};

type GalleryItem = {
    title: string;
    image: string;
    className?: string;
};

const stats: Stat[] = [
    {
        value: "400+",
        label: "Chinese Staff",
    },
    {
        value: "3,000+",
        label: "Indonesian Workers",
    },
    {
        value: "30+",
        label: "Projects Completed",
    },
    {
        value: "B2",
        label: "Highest Grade",
    },
];

const specializedFields = [
    "Large-scale Metallurgical Projects",
    "Electromechanical Integration",
    "Municipal & Ecological Technology",
    "Industrial Production Lines",
    "Cement Production Lines",
    "Nickel-Iron Smelting",
];

const qualifications: Qualification[] = [
    {
        title: "B2 Qualification Grade",
        highlighted: true,
    },
    {
        title: "General Contracting",
    },
    {
        title: "Civil Construction",
    },
    {
        title: "Steel Structure",
    },
    {
        title: "Electromechanical Installation",
    },
    {
        title: "Smelting Engineering",
    },
    {
        title: "Environmental Engineering",
    },
    {
        title: "Jiangsu Zhongchen International",
    },
];

const projects: Project[] = [
    {
        name: "Tsingshan IWIP Industry Park",
        location: "Maluku",
        scope: "Metallurgical Facilities",
        status: "Completed",
    },
    {
        name: "Lanyan Guangqing Projects",
        location: "Sulawesi",
        scope: "Industrial Plant Construction",
        status: "Completed",
    },
    {
        name: "Indonesia Puqing Engineering",
        location: "Kalimantan",
        scope: "Mechanical & Electrical",
        status: "Completed",
    },
    {
        name: "Zhongqing New Energy Phase I",
        location: "Sulawesi",
        scope: "Production Line Integration",
        status: "Active",
    },
];

const galleryItems: GalleryItem[] = [
    {
        title: "Industrial Construction Project 4",
        image: "/images/construction-4.jpg",
    },
    {
        title: "Industrial Construction Project 5",
        image: "/images/construction-5.jpg",
        className: "md:col-span-2",
    },
    {
        title: "Industrial Construction Project 6",
        image: "/images/construction-6.jpg",
    },
    {
        title: "Industrial Construction Project 7",
        image: "/images/construction-7.jpg",
    },
    {
        title: "Industrial Construction Project 8",
        image: "/images/construction-8.jpg",
    },
    {
        title: "Industrial Construction Project 9",
        image: "/images/construction-9.jpg",
    },
    {
        title: "Industrial Construction Project 10",
        image: "/images/construction-10.jpg",
        className: "md:col-span-2",
    },
];

const regions: Region[] = [
    {
        name: "Kalimantan",
        description:
            "Active operations in industrial hubs, supporting power plant and mineral processing infrastructure.",
    },
    {
        name: "Maluku",
        description:
            "Primary construction partner for some of the largest metallurgical parks in Eastern Indonesia.",
    },
    {
        name: "Sulawesi",
        description:
            "Extensive track record in nickel-iron smelting and new energy production line development.",
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

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-stone-50 py-24 lg:py-32">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <div className="inline-flex rounded-full bg-orange-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
                        Subsidiary
                    </div>

                    <h1 className="mt-5 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
                        Construction Company
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
                        Industrial engineering and construction expertise for
                        large-scale infrastructure and production projects across the
                        Indonesian archipelago.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute -bottom-5 -left-5 h-24 w-24 rounded-2xl bg-orange-600/20" />

                    <div className="relative rotate-1 overflow-hidden rounded-2xl bg-stone-300 shadow-2xl">
                        <div
                            className="h-80 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(15,23,42,0.08), rgba(15,23,42,0.08)), url('/images/subsidiaries-construction.jpeg')",   
                            }}
                        />

                        <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600/10 text-orange-600">
                                    <HardHat className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-slate-950">
                                        Industrial Engineering
                                    </p>
                                    <p className="text-xs text-neutral-500">
                                        Large-scale project execution
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
                        A Leader in Industrial Construction
                    </h2>

                    <div className="mt-5 space-y-5 text-base leading-7 text-neutral-800">
                        <p>
                            We stand at the forefront of
                            Indonesia&apos;s industrial transformation. As a core
                            subsidiary of WIN Holdings and backed by international
                            expertise from Jiangsu Zhongchen, ICG delivers turnkey
                            solutions for complex engineering challenges.
                        </p>

                        <p>
                            The company integrates Chinese engineering standards with a
                            deep understanding of Indonesian requirements, creating a
                            strong bridge for industrial excellence and sustainable
                            infrastructure development.
                        </p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5">
                    {stats.map((stat) => (
                        <StatCard key={stat.label} stat={stat} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function StatCard({ stat }: { stat: Stat }) {
    return (
        <div className="rounded-xl border border-neutral-300 bg-stone-100 p-5">
            <p className="text-2xl font-semibold tracking-tight text-orange-600">
                {stat.value}
            </p>

            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-neutral-600">
                {stat.label}
            </p>
        </div>
    );
}

function SpecializedFieldsSection() {
    return (
        <section className="relative overflow-hidden bg-slate-950 py-16 text-white">
            <div className="absolute right-0 top-0 h-full w-1/3 bg-orange-600/10 blur-3xl" />

            <SectionContainer className="relative">
                <div>
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight">
                        Specialized Fields of Expertise
                    </h2>

                    <p className="mt-4 max-w-3xl text-base leading-7 text-white/70">
                        High-precision engineering and construction for highly
                        specialized industrial sectors.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {specializedFields.map((field, index) => (
                        <div
                            key={field}
                            className="group relative min-h-65 overflow-hidden rounded-xl border border-white/10"
                        >
                            <Image
                                src={`/images/fields-${index + 1}.png`}
                                alt={field}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-linear-to-t from-black via-black/35 to-black/5" />

                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <p className="text-lg font-semibold leading-6 text-white">
                                    {field}
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
    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <SectionHeader
                    align="center"
                    title="Qualifications & Certifications"
                />

                <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {qualifications.map((qualification) => (
                        <QualificationCard
                            key={qualification.title}
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
    if (qualification.highlighted) {
        return (
            <article className="rounded-xl border-2 border-orange-600 bg-orange-600/5 p-5 text-center">
                <p className="text-3xl font-bold tracking-tight text-orange-600">
                    B2
                </p>

                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-neutral-950">
                    Qualification Grade
                </p>
            </article>
        );
    }

    return (
        <article className="flex min-h-20 items-center justify-center rounded-xl border border-neutral-300 bg-white p-5 text-center">
            <p className="text-base leading-6 text-neutral-950">
                {qualification.title}
            </p>
        </article>
    );
}
function ProjectTrackRecordSection() {
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
                            Proven Project Track Record
                        </h2>

                        <p className="mt-2 text-base leading-6 text-neutral-600">
                            Delivering excellence across major industrial parks in
                            Indonesia.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <MetricBadge value="30+" label="Total Projects" />
                        <MetricBadge value="100%" label="Completion" />
                    </div>
                </div>

                <div className="mt-12 overflow-hidden rounded-xl bg-white/95 shadow-sm backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-4xl border-collapse">
                            <thead className="bg-stone-100">
                                <tr>
                                    <TableHead>Project Name</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Scope</TableHead>
                                    <TableHead>Status</TableHead>
                                </tr>
                            </thead>

                            <tbody>
                                {projects.map((project) => (
                                    <ProjectRow
                                        key={project.name}
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
    return (
        <tr className="border-b border-neutral-200 last:border-b-0">
            <td className="px-4 py-4 text-base font-bold text-neutral-950">
                {project.name}
            </td>

            <td className="px-4 py-4 text-base text-neutral-950">
                {project.location}
            </td>

            <td className="px-4 py-4 text-base text-neutral-600">
                {project.scope}
            </td>

            <td className="px-4 py-4">
                <StatusBadge status={project.status} />
            </td>
        </tr>
    );
}

function StatusBadge({ status }: { status: Project["status"] }) {
    const isCompleted = status === "Completed";

    return (
        <span
            className={
                isCompleted
                    ? "inline-flex rounded bg-green-100 px-2 py-1 text-xs font-bold uppercase text-green-700"
                    : "inline-flex rounded bg-blue-100 px-2 py-1 text-xs font-bold uppercase text-blue-700"
            }
        >
            {status}
        </span>
    );
}

function ProjectGallerySection() {
    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                    Project Gallery
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
    return (
        <article
            className={`group relative h-64 overflow-hidden rounded-xl bg-stone-300 shadow-sm transition-transform duration-500 hover:scale-105 hover:shadow-xl ${item.className ?? ""}`}
        >
            <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
            />
        </article>
    );
}

function RegionalPresenceSection() {
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
                    Strategic Regional Presence
                </h2>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {regions.map((region) => (
                        <RegionCard key={region.name} region={region} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function RegionCard({ region }: { region: Region }) {
    return (
        <article className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                <MapPin className="h-6 w-6" />
            </div>

            <h3 className="mt-6 text-2xl font-bold tracking-tight text-orange-600">
                {region.name}
            </h3>

            <p className="mt-3 text-base leading-7 text-neutral-600">
                {region.description}
            </p>
        </article>
    );
}

function CTASection() {
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
                    Build Large-Scale Industrial Projects with Us
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    Connecting global engineering standards with Indonesian
                    industrial potential for a sustainable future.
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