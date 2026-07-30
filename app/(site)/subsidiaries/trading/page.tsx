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

type TradingOrgNode = {
    title: string;
    variant?: "primary" | "secondary" | "division";
};

type TradingDepartmentNode = {
    title: string;
    children: string[];
};

const tradingDepartmentNodes: TradingDepartmentNode[] = [
    {
        title: "Project Manager",
        children: [
            "Vice Manager – Site Management",
            "Vice Manager – Back Office",
        ],
    },
    {
        title: "Head of Human Resources Department",
        children: [
            "Vice Department Head – Head Office HRD",
            "Vice Department Head – Industrial Relations",
            "Vice Department Head – Recruitment",
            "Vice Department Head – Project Attendance",
        ],
    },
    {
        title: "Head of Finance Department",
        children: [
            "Vice Department Head – Accounting",
            "Vice Department Head – Payroll",
        ],
    },
];

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
            <TradingOrganizationSection />
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
                                "linear-gradient(rgba(30,41,59,0.1), rgba(30,41,59,0.1)), url('/images/manpower-8.jpg')",
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
                src="/images/manpower-5.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-100/70" />

            <SectionContainer className="relative z-10 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-orange-600">
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

function TradingOrganizationSection() {
    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                        Organization Structure
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold leading-10 tracking-tight text-slate-800">
                        Trading Company Organization Structure
                    </h2>

                    <p className="mt-4 text-base leading-7 text-neutral-600">
                        A clear leadership hierarchy supports operational control,
                        project coordination, human resources management, and finance
                        accountability across the trading company.
                    </p>
                </div>

                <div className="mt-14">
                    <MobileTradingOrganizationChart />

                    <DesktopTradingOrganizationChart />
                </div>
            </SectionContainer>
        </section>
    );
}

function MobileTradingOrganizationChart() {
    return (
        <div className="space-y-6 lg:hidden">
            <div className="rounded-2xl border border-neutral-200 bg-stone-50 p-5 shadow-sm">
                <div className="flex justify-center">
                    <TradingOrgCard title="CEO" variant="primary" />
                </div>

                <TradingConnectorLine className="mx-auto h-8" />

                <div className="grid gap-3">
                    <TradingMobileOrgNode
                        node={{
                            title: "Assistant CEO",
                            variant: "secondary",
                        }}
                    />

                    <TradingMobileOrgNode
                        node={{
                            title: "Vice CEO",
                            variant: "secondary",
                        }}
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                    Departments Under Vice CEO
                </p>

                <div className="mt-4 grid gap-4">
                    {tradingDepartmentNodes.map((department) => (
                        <TradingMobileDepartmentCard
                            key={department.title}
                            department={department}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DesktopTradingOrganizationChart() {
    return (
        <div className="hidden overflow-x-auto rounded-2xl border border-neutral-200 bg-stone-50 p-6 shadow-sm lg:block">
            <div className="min-w-200">
                <div className="flex justify-center">
                    <TradingOrgCard title="CEO" variant="primary" />
                </div>

                <TradingConnectorLine className="mx-auto h-10" />

                <div className="relative">
                    <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-neutral-300" />

                    <div className="grid grid-cols-2 gap-6 pt-6">
                        <div className="relative flex justify-center">
                            <div className="absolute -top-6 h-6 w-px bg-neutral-300" />

                            <TradingOrgCard
                                title="Assistant CEO"
                                variant="secondary"
                            />
                        </div>

                        <div className="relative flex justify-center">
                            <div className="absolute -top-6 h-6 w-px bg-neutral-300" />

                            <TradingOrgCard
                                title="Vice CEO"
                                variant="secondary"
                            />
                        </div>
                    </div>
                </div>

                <div className="ml-auto mr-[25%] h-10 w-px bg-neutral-300" />

                <div className="relative">
                    <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-neutral-300" />

                    <div className="grid grid-cols-3 gap-6 pt-6">
                        {tradingDepartmentNodes.map((department) => (
                            <div
                                key={department.title}
                                className="relative"
                            >
                                <div className="absolute -top-6 left-1/2 h-6 w-px -translate-x-1/2 bg-neutral-300" />

                                <TradingDepartmentCard
                                    department={department}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function TradingDepartmentCard({
    department,
}: {
    department: TradingDepartmentNode;
}) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <TradingOrgCard title={department.title} variant="division" />

            <TradingConnectorLine className="mx-auto h-6" />

            <div className="grid gap-3">
                {department.children.map((child) => (
                    <div
                        key={child}
                        className="rounded-lg border border-neutral-200 bg-stone-50 px-3 py-3 text-center text-sm font-semibold leading-5 text-neutral-700"
                    >
                        {child}
                    </div>
                ))}
            </div>
        </article>
    );
}

function TradingMobileDepartmentCard({
    department,
}: {
    department: TradingDepartmentNode;
}) {
    return (
        <article className="rounded-xl border border-neutral-200 bg-stone-50 p-4">
            <h3 className="text-sm font-bold leading-5 text-slate-800">
                {department.title}
            </h3>

            <ul className="mt-4 space-y-3">
                {department.children.map((child) => (
                    <li
                        key={child}
                        className="rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm font-medium leading-5 text-neutral-700"
                    >
                        {child}
                    </li>
                ))}
            </ul>
        </article>
    );
}

function TradingMobileOrgNode({
    node,
}: {
    node: TradingOrgNode;
}) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <p className="text-sm font-semibold leading-5 text-neutral-950">
                {node.title}
            </p>
        </div>
    );
}

function TradingOrgCard({
    title,
    variant = "division",
}: TradingOrgNode) {
    const variants = {
        primary:
            "border-orange-600 bg-orange-600 text-white shadow-lg shadow-orange-600/20",
        secondary: "border-neutral-200 bg-white text-slate-800 shadow-sm",
        division: "border-orange-100 bg-orange-50 text-slate-800 shadow-sm",
    };

    return (
        <div
            className={`flex min-h-16 w-full min-w-44 max-w-72 items-center justify-center rounded-xl border px-5 py-4 text-center ${variants[variant]}`}
        >
            <p className="text-sm font-bold leading-5">
                {title}
            </p>
        </div>
    );
}

function TradingConnectorLine({
    className = "",
}: {
    className?: string;
}) {
    return <div className={`w-px bg-neutral-300 ${className}`} />;
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
                src="/images/manpower-7.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-50/80" />

            <SectionContainer className="relative z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-orange-600">
                        Our Core Services
                    </h2>

                    <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-black" />
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
        <section className="bg-[#a7a7a1] py-16">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-orange-600">
                        Our Strategic Clients
                    </h2>

                    <p className="mt-2 text-base leading-6 text-black">
                        Powering the largest industrial projects in Indonesia.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {clients.map((client) => (
                        <div
                            key={client}
                            className="flex h-24 items-center justify-center rounded-lg border border-neutral-300 bg-white p-4"
                        >
                            <p className="text-base font-bold text-black">
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