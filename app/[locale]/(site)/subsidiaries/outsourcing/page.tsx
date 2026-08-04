import { Link } from "@/i18n/routing";
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
import { useTranslations } from "next-intl";

type OverviewItem = {
    key: "indonesiaWideOperations" | "foreignInvestedAlliance" | "regionalProjectFocus";
    icon: ReactNode;
};

type Service = {
    key:
        | "outsourcingEmployee"
        | "outsourcingExperts"
        | "outsourcingSdm"
        | "businessProcess"
        | "businessConsultation";
    icon: ReactNode;
};

type OutsourcingOrgNode = {
    title: string;
    variant?: "primary" | "secondary" | "division";
};

type OutsourcingDepartmentNode = {
    key: "projectManager" | "humanResources" | "finance";
    children: string[];
};

const outsourcingDepartmentNodes: OutsourcingDepartmentNode[] = [
    {
        key: "projectManager",
        children: ["siteManagement", "backOffice"],
    },
    {
        key: "humanResources",
        children: [
            "headOfficeHrd",
            "industrialRelations",
            "recruitment",
            "projectAttendance",
        ],
    },
    {
        key: "finance",
        children: ["accounting", "payroll"],
    },
];

const overviewItems: OverviewItem[] = [
    {
        key: "indonesiaWideOperations",
        icon: <Globe2 className="h-6 w-6" />,
    },
    {
        key: "foreignInvestedAlliance",
        icon: <Handshake className="h-6 w-6" />,
    },
    {
        key: "regionalProjectFocus",
        icon: <MapPin className="h-6 w-6" />,
    },
];

const missionKeys = [
    "professionalManpower",
    "trainedCertified",
    "clientRelationships",
    "employeeWelfare",
    "stakeholderValue",
] as const;

const services: Service[] = [
    {
        key: "outsourcingEmployee",
        icon: <ClipboardList className="h-5 w-5" />,
    },
    {
        key: "outsourcingExperts",
        icon: <Users className="h-5 w-5" />,
    },
    {
        key: "outsourcingSdm",
        icon: <BriefcaseBusiness className="h-5 w-5" />,
    },
    {
        key: "businessProcess",
        icon: <Target className="h-5 w-5" />,
    },
    {
        key: "businessConsultation",
        icon: <Handshake className="h-5 w-5" />,
    },
];

const clients = ["Huafei", "Huayue", "MIP", "MCC", "CCECC", "IWIP"];

export default function IndosinoPage() {
    return (
        <main className="min-h-screen bg-stone-50 text-slate-800">
            <HeroSection />
            <CompanyOverviewSection />
            <VisionMissionSection />
            <ServicesSection />
            <OutsourcingOrganizationSection />
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
    const t = useTranslations("Outsourcing.hero");

    return (
        <section className="bg-stone-50 py-16 lg:py-24">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                        {t("eyebrow")}
                    </p>

                    <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-800 md:text-5xl">
                        {t("title")}
                    </h1>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
                        {t("subtitle")}
                    </p>

                    <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600">
                        {t("description")}
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
                                        {t("badge")}
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
    const t = useTranslations("Outsourcing.companyOverview");

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
                        {t("title")}
                    </h2>

                    <div className="mt-5 space-y-5 text-base leading-7 text-neutral-800">
                        <p>{t("paragraph1")}</p>
                        <p>{t("paragraph2")}</p>
                    </div>
                </div>

                <div className="space-y-5 lg:col-span-5">
                    {overviewItems.map((item) => (
                        <OverviewCard key={item.key} item={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function OverviewCard({ item }: { item: OverviewItem }) {
    const t = useTranslations("Outsourcing.overviewItems");

    return (
        <article className="flex gap-4 rounded-lg border border-neutral-300 bg-white p-5 shadow-sm">
            <div className="shrink-0 text-orange-500">
                {item.icon}
            </div>

            <div>
                <h3 className="text-base font-bold leading-6 text-slate-800">
                    {t(`${item.key}.title`)}
                </h3>

                <p className="mt-1 text-sm font-medium leading-5 tracking-wide text-neutral-600">
                    {t(`${item.key}.description`)}
                </p>
            </div>
        </article>
    );
}

function VisionMissionSection() {
    const t = useTranslations("Outsourcing.visionMission");

    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer className="grid gap-6 lg:grid-cols-2">
                <article className="rounded-xl bg-slate-800 p-8 text-white shadow-sm lg:p-12">
                    <div className="text-orange-400">
                        <Target className="h-7 w-7" />
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                        {t("visionTitle")}
                    </h2>

                    <p className="mt-5 text-lg italic leading-8 text-white/90">
                        {t("visionText")}
                    </p>
                </article>

                <article className="rounded-xl border border-neutral-300 bg-white p-8 shadow-sm lg:p-12">
                    <div className="text-orange-500">
                        <CheckCircle2 className="h-7 w-7" />
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-800">
                        {t("missionTitle")}
                    </h2>

                    <ul className="mt-5 space-y-4">
                        {missionKeys.map((missionKey) => (
                            <li key={missionKey} className="flex gap-3">
                                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-orange-500" />

                                <span className="text-base leading-7 text-neutral-600">
                                    {t(`missions.${missionKey}`)}
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
    const t = useTranslations("Outsourcing.services");

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
                        {t("title")}
                    </h2>

                    <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-black" />
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {services.map((service) => (
                        <ServiceCard key={service.key} service={service} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function ServiceCard({ service }: { service: Service }) {
    const t = useTranslations("Outsourcing.services.items");

    return (
        <article className="rounded-xl border border-neutral-300 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
                {service.icon}
            </div>

            <h3 className="mt-5 text-base font-bold leading-6 text-slate-800">
                {t(`${service.key}.title`)}
            </h3>

            <p className="mt-2 text-sm font-medium leading-5 tracking-wide text-neutral-600">
                {t(`${service.key}.description`)}
            </p>
        </article>
    );
}

function OutsourcingOrganizationSection() {
    const t = useTranslations("Outsourcing.organization");

    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
                        {t("eyebrow")}
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold leading-10 tracking-tight text-slate-800">
                        {t("title")}
                    </h2>

                    <p className="mt-4 text-base leading-7 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-14">
                    <MobileOutsourcingOrganizationChart />
                    <DesktopOutsourcingOrganizationChart />
                </div>
            </SectionContainer>
        </section>
    );
}

function MobileOutsourcingOrganizationChart() {
    const t = useTranslations("Outsourcing.organization");

    return (
        <div className="space-y-6 lg:hidden">
            <div className="rounded-2xl border border-neutral-200 bg-stone-50 p-5 shadow-sm">
                <div className="flex justify-center">
                    <OutsourcingOrgCard title={t("ceo")} variant="primary" />
                </div>

                <OutsourcingConnectorLine className="mx-auto h-8" />

                <div className="grid gap-3">
                    <OutsourcingMobileOrgNode
                        node={{
                            title: t("assistantCeo"),
                            variant: "secondary",
                        }}
                    />

                    <OutsourcingMobileOrgNode
                        node={{
                            title: t("viceCeo"),
                            variant: "secondary",
                        }}
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                    {t("departmentsLabel")}
                </p>

                <div className="mt-4 grid gap-4">
                    {outsourcingDepartmentNodes.map((department) => (
                        <OutsourcingMobileDepartmentCard
                            key={department.key}
                            department={department}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DesktopOutsourcingOrganizationChart() {
    const t = useTranslations("Outsourcing.organization");

    return (
        <div className="hidden overflow-x-auto rounded-2xl border border-neutral-200 bg-stone-50 p-6 shadow-sm lg:block">
            <div className="min-w-200">
                <div className="flex justify-center">
                    <OutsourcingOrgCard title={t("ceo")} variant="primary" />
                </div>

                <OutsourcingConnectorLine className="mx-auto h-10" />

                <div className="relative">
                    <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-neutral-300" />

                    <div className="grid grid-cols-2 gap-6 pt-6">
                        <div className="relative flex justify-center">
                            <div className="absolute -top-6 h-6 w-px bg-neutral-300" />

                            <OutsourcingOrgCard
                                title={t("assistantCeo")}
                                variant="secondary"
                            />
                        </div>

                        <div className="relative flex justify-center">
                            <div className="absolute -top-6 h-6 w-px bg-neutral-300" />

                            <OutsourcingOrgCard
                                title={t("viceCeo")}
                                variant="secondary"
                            />
                        </div>
                    </div>
                </div>

                <div className="ml-auto mr-[25%] h-10 w-px bg-neutral-300" />

                <div className="relative">
                    <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-neutral-300" />

                    <div className="grid grid-cols-3 gap-6 pt-6">
                        {outsourcingDepartmentNodes.map((department) => (
                            <div key={department.key} className="relative">
                                <div className="absolute -top-6 left-1/2 h-6 w-px -translate-x-1/2 bg-neutral-300" />

                                <OutsourcingDepartmentCard
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

function OutsourcingDepartmentCard({
    department,
}: {
    department: OutsourcingDepartmentNode;
}) {
    const t = useTranslations("Outsourcing.organization.departments");

    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <OutsourcingOrgCard
                title={t(`${department.key}.title`)}
                variant="division"
            />

            <OutsourcingConnectorLine className="mx-auto h-6" />

            <div className="grid gap-3">
                {department.children.map((child) => (
                    <div
                        key={child}
                        className="rounded-lg border border-neutral-200 bg-stone-50 px-3 py-3 text-center text-sm font-semibold leading-5 text-neutral-700"
                    >
                        {t(`${department.key}.children.${child}`)}
                    </div>
                ))}
            </div>
        </article>
    );
}

function OutsourcingMobileDepartmentCard({
    department,
}: {
    department: OutsourcingDepartmentNode;
}) {
    const t = useTranslations("Outsourcing.organization.departments");

    return (
        <article className="rounded-xl border border-neutral-200 bg-stone-50 p-4">
            <h3 className="text-sm font-bold leading-5 text-slate-800">
                {t(`${department.key}.title`)}
            </h3>

            <ul className="mt-4 space-y-3">
                {department.children.map((child) => (
                    <li
                        key={child}
                        className="rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm font-medium leading-5 text-neutral-700"
                    >
                        {t(`${department.key}.children.${child}`)}
                    </li>
                ))}
            </ul>
        </article>
    );
}

function OutsourcingMobileOrgNode({
    node,
}: {
    node: OutsourcingOrgNode;
}) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3">
            <p className="text-sm font-semibold leading-5 text-neutral-950">
                {node.title}
            </p>
        </div>
    );
}

function OutsourcingOrgCard({
    title,
    variant = "division",
}: OutsourcingOrgNode) {
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

function OutsourcingConnectorLine({
    className = "",
}: {
    className?: string;
}) {
    return <div className={`w-px bg-neutral-300 ${className}`} />;
}

function ClientsSection() {
    const t = useTranslations("Outsourcing.clients");

    return (
        <section className="bg-[#a7a7a1] py-16">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-white">
                        {t("title")}
                    </h2>

                    <p className="mt-2 text-base leading-6 text-white">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    {clients.map((client) => (
                        <div
                            key={client}
                            className="flex h-24 items-center justify-center rounded-lg border border-neutral-300 bg-white p-4"
                        >
                            <p className="text-base font-bold text-orange-600">
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
    const t = useTranslations("Outsourcing.cta");

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