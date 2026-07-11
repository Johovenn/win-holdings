import type { ReactNode } from "react";
import {
    BriefcaseBusiness,
    CheckCircle2,
    ClipboardList,
    Globe2,
    Handshake,
    MapPin,
    ShieldCheck,
    Target,
    Users,
} from "lucide-react";
import Image from "next/image";
import ButtonLink from "@/app/components/ui/ButtonLink";

type OverviewItem = {
    title: string;
    description: string;
    icon: ReactNode;
};

type MissionItem = {
    text: string;
};

type Service = {
    title: string;
    description: string;
    icon: ReactNode;
};

const overviewItems: OverviewItem[] = [
    {
        title: "Indonesia-wide Operations",
        description: "Scalable workforce solutions from Sumatra to Papua.",
        icon: <Globe2 className="h-6 w-6" />,
    },
    {
        title: "Foreign-Invested Alliance",
        description: "Strategic partner for global industrial giants and SOEs.",
        icon: <Handshake className="h-6 w-6" />,
    },
    {
        title: "Regional Project Focus",
        description: "Active in Kalimantan, Sulawesi, and Maluku hubs.",
        icon: <MapPin className="h-6 w-6" />,
    },
];

const missionItems: MissionItem[] = [
    {
        text: "Providing professional manpower services through strict selection.",
    },
    {
        text: "Ensuring all professionals are trained and certified for specific tasks.",
    },
    {
        text: "Building long-term, mutually beneficial relationships with clients.",
    },
    {
        text: "Fostering continuous growth and welfare for our employees.",
    },
    {
        text: "Consistently enhancing company value for all stakeholders.",
    },
];

const services: Service[] = [
    {
        title: "Outsourcing Employee",
        description: "End-to-end management of administrative and general staff.",
        icon: <ClipboardList className="h-5 w-5" />,
    },
    {
        title: "Outsourcing Experts",
        description: "Highly skilled technical specialists for project-critical tasks.",
        icon: <Users className="h-5 w-5" />,
    },
    {
        title: "Outsourcing SDM",
        description: "Comprehensive human resource development and placement.",
        icon: <BriefcaseBusiness className="h-5 w-5" />,
    },
    {
        title: "Business Process",
        description: "Optimizing operational workflows through professional support.",
        icon: <Target className="h-5 w-5" />,
    },
    {
        title: "Business Consultation",
        description: "Advisory for manpower planning and labor compliance.",
        icon: <Handshake className="h-5 w-5" />,
    },
];

const clients = ["Huawei", "Huayue", "MIP", "MCC", "CCECC", "IWIP"];

export default function IndosinoPage() {
    return (
        <main className="min-h-screen bg-stone-50 text-slate-800">
            <HeroSection />
            <CompanyOverviewSection />
            <VisionMissionSection />
            <ServicesSection />
            <ClientsSection />
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
        <section className="bg-stone-50 py-16 lg:py-24">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                        Subsidiary
                    </p>

                    <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-800 md:text-5xl">
                        Trading Company
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
                        Human resource services and outsourcing solutions for
                        industrial and project-based operations.
                    </p>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
                        We provide comprehensive professional manpower and
                        outsourcing support across the Indonesian archipelago. The
                        company specializes in navigating large-scale industrial labor
                        needs and ensuring operational efficiency for global
                        enterprises.
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-xl bg-white shadow-sm">
                    <div
                        className="h-96 bg-cover bg-center lg:h-120"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(30,41,59,0.1), rgba(30,41,59,0.1)), url('/images/trading-1.jpg')",
                        }}
                    >
                        <div className="flex h-full items-end p-4">
                            <div className="rounded-lg border border-white/20 bg-white/90 p-4 shadow-sm backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/10 text-orange-600">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>

                                    <p className="text-sm font-bold tracking-wide text-slate-800">
                                        Licensed Professional HR Partner
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
        <section className="relative overflow-hidden bg-stone-100 py-16">
            <Image
                src="/images/trading-2.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-100/70" />

            <SectionContainer className="relative z-10 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-slate-800">
                        Specialized HR Outsourcing
                    </h2>

                    <div className="mt-5 space-y-5 text-base leading-7 text-neutral-800">
                        <p>
                            We have established ourself as a
                            premier partner for foreign-invested enterprises,
                            particularly Chinese state-owned enterprises. The company
                            understands the requirements of international projects and
                            bridges global standards with local expertise.
                        </p>

                        <p>
                            Its strategic alliances and deep knowledge of the Indonesian
                            labor market allow the company to deploy skilled and
                            semi-skilled manpower rapidly, including to remote project
                            sites.
                        </p>
                    </div>
                </div>

                <div className="space-y-5 lg:col-span-5">
                    {overviewItems.map((item) => (
                        <OverviewCard key={item.title} item={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function OverviewCard({ item }: { item: OverviewItem }) {
    return (
        <article className="flex gap-4 rounded-lg border border-neutral-300 bg-white p-5 shadow-sm">
            <div className="shrink-0 text-orange-500">
                {item.icon}
            </div>

            <div>
                <h3 className="text-base font-bold leading-6 text-slate-800">
                    {item.title}
                </h3>

                <p className="mt-1 text-sm font-medium leading-5 tracking-wide text-neutral-600">
                    {item.description}
                </p>
            </div>
        </article>
    );
}

function VisionMissionSection() {
    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer className="grid gap-6 lg:grid-cols-2">
                <article className="rounded-xl bg-slate-800 p-8 text-white shadow-sm lg:p-12">
                    <div className="text-orange-400">
                        <Target className="h-7 w-7" />
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                        Our Vision
                    </h2>

                    <p className="mt-5 text-lg italic leading-8 text-white/90">
                        “To become a leading outsourcing service provider in
                        Indonesia, recognized for our commitment to quality, integrity,
                        and the empowerment of our professional workforce.”
                    </p>
                </article>

                <article className="rounded-xl border border-neutral-300 bg-white p-8 shadow-sm lg:p-12">
                    <div className="text-orange-500">
                        <CheckCircle2 className="h-7 w-7" />
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-800">
                        Our Mission
                    </h2>

                    <ul className="mt-5 space-y-4">
                        {missionItems.map((item) => (
                            <li key={item.text} className="flex gap-3">
                                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-orange-500" />
                                <span className="text-base leading-7 text-neutral-600">
                                    {item.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </article>
            </SectionContainer>
        </section>
    );
}

function ServicesSection() {
    return (
        <section className="relative overflow-hidden bg-stone-50 py-16">
            <Image
                src="/images/trading-3.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-50/60" />

            <SectionContainer className="relative z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-slate-800">
                        Our Core Services
                    </h2>

                    <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-orange-500" />
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {services.map((service) => (
                        <ServiceCard key={service.title} service={service} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function ServiceCard({ service }: { service: Service }) {
    return (
        <article className="rounded-xl border border-neutral-300 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                {service.icon}
            </div>

            <h3 className="mt-5 text-base font-bold leading-6 text-slate-800">
                {service.title}
            </h3>

            <p className="mt-2 text-sm font-medium leading-5 tracking-wide text-neutral-600">
                {service.description}
            </p>
        </article>
    );
}

function ClientsSection() {
    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-slate-800">
                        Our Strategic Clients
                    </h2>

                    <p className="mt-2 text-base leading-6 text-neutral-600">
                        Powering the largest industrial projects in Indonesia.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {clients.map((client) => (
                        <div
                            key={client}
                            className="flex h-24 items-center justify-center rounded-lg border border-neutral-300 bg-white p-4"
                        >
                            <p className="text-base font-bold text-neutral-500 opacity-60">
                                {client}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionContainer>
        </section>
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
                    Reliable Trading Partner for Industrial Growth
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    Connecting businesses with trusted supply solutions across construction materials, industrial products, machinery, packaging, and operational needs.
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