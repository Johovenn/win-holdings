import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";
import {
    Building2,
    Factory,
    Landmark,
    Network,
    ShieldCheck,
    Store,
    Users,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionContainer from "@/app/components/ui/Container";

type OrgNode = {
    key:
        | "assistantCeo"
        | "manpowerSupply"
        | "tradingMaterial"
        | "construction"
        | "manufacturing"
        | "businessDevelopment";
    variant?: "primary" | "secondary" | "division";
};

type Director = {
    key: "chairman" | "ceo" | "assistantCeo" | "businessDevelopment";
};

type GovernanceCard = {
    key:
        | "manpowerSupply"
        | "tradingMaterial"
        | "construction"
        | "manufacturing"
        | "investmentBusinessDevelopment";
    icon: ReactNode;
};

type FrameworkItem = {
    key:
        | "strategicDirection"
        | "operationalCoordination"
        | "corporateGovernance";
    icon: ReactNode;
};

type FrameworkStat = {
    key: "governance" | "businessUnits" | "portfolio";
};

const directors: Director[] = [
    {
        key: "chairman",
    },
    {
        key: "ceo",
    },
    {
        key: "assistantCeo",
    },
    {
        key: "businessDevelopment",
    },
];

const frameworkStats: FrameworkStat[] = [
    {
        key: "governance",
    },
    {
        key: "businessUnits",
    },
    {
        key: "portfolio",
    },
];

const frameworkItems: FrameworkItem[] = [
    {
        key: "strategicDirection",
        icon: <Landmark className="h-6 w-6" />,
    },
    {
        key: "operationalCoordination",
        icon: <Network className="h-6 w-6" />,
    },
    {
        key: "corporateGovernance",
        icon: <ShieldCheck className="h-6 w-6" />,
    },
];

const governanceCards: GovernanceCard[] = [
    {
        key: "manpowerSupply",
        icon: <Users className="h-7 w-7" />,
    },
    {
        key: "tradingMaterial",
        icon: <Store className="h-7 w-7" />,
    },
    {
        key: "construction",
        icon: <Building2 className="h-7 w-7" />,
    },
    {
        key: "manufacturing",
        icon: <Factory className="h-7 w-7" />,
    },
    {
        key: "investmentBusinessDevelopment",
        icon: <Landmark className="h-7 w-7" />,
    },
];

const assistantCeoNode: OrgNode = {
    key: "assistantCeo",
    variant: "secondary",
};

const executiveNodes: OrgNode[] = [
    {
        key: "manpowerSupply",
        variant: "division",
    },
    {
        key: "tradingMaterial",
        variant: "division",
    },
    {
        key: "construction",
        variant: "division",
    },
    {
        key: "manufacturing",
        variant: "division",
    },
    {
        key: "businessDevelopment",
        variant: "division",
    },
];

export default function OrganizationStructurePage() {
    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <HeroSection />
            <FrameworkSection />
            <OrganizationChartSection />
            <BoardOfDirectorsSection />
            <BusinessUnitGovernanceSection />
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
    variant?: "orange" | "dark" | "outline-light";
    className?: string;
}) {
    const variants = {
        orange: "bg-orange-600 text-white shadow-lg hover:bg-orange-700",
        dark: "bg-neutral-950 text-white shadow-lg hover:bg-black",
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

function SectionHeading({
    label,
    title,
    description,
    align = "left",
}: {
    label?: string;
    title: string;
    description?: string;
    align?: "left" | "center";
}) {
    return (
        <div className={align === "center" ? "text-center" : "text-left"}>
            {label ? (
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                    {label}
                </p>
            ) : null}

            <h2 className="mt-3 text-3xl font-semibold leading-10 tracking-tight text-neutral-950 md:text-4xl">
                {title}
            </h2>

            {description ? (
                <p
                    className={`mt-4 text-base leading-7 text-neutral-600 ${
                        align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"
                    }`}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
}

function HeroSection() {
    const t = useTranslations("Organization.hero");

    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

            <SectionContainer className="relative grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <div className="mb-4 inline-flex rounded-full bg-orange-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
                        {t("eyebrow")}
                    </div>

                    <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                        {t("title")}
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-7 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="relative hidden lg:block">
                    <div className="relative h-105 overflow-hidden rounded-2xl border border-neutral-200 bg-stone-100 shadow-xl">
                        <Image
                            src="/images/hq-2.jpg"
                            alt={t("imageAlt")}
                            fill
                            preload
                            sizes="50vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function FrameworkSection() {
    const t = useTranslations("Organization.framework");

    return (
        <section className="relative overflow-hidden bg-stone-50 py-12">
            <Image
                src="/images/structure-1.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-50/75" />

            <SectionContainer className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <SectionHeading
                        title={t("title")}
                        description={t("description")}
                    />

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        {frameworkStats.map((stat) => (
                            <FrameworkStat
                                key={stat.key}
                                item={stat}
                            />
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                    <div className="grid gap-4">
                        {frameworkItems.map((item) => (
                            <FrameworkItem
                                key={item.key}
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function FrameworkItem({ item }: { item: FrameworkItem }) {
    const t = useTranslations("Organization.framework.items");

    return (
        <div className="flex items-center gap-4 rounded-xl bg-stone-100 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                {item.icon}
            </div>

            <div>
                <p className="font-semibold text-neutral-950">
                    {t(`${item.key}.title`)}
                </p>

                <p className="text-sm text-neutral-600">
                    {t(`${item.key}.description`)}
                </p>
            </div>
        </div>
    );
}

function FrameworkStat({ item }: { item: FrameworkStat }) {
    const t = useTranslations("Organization.framework.stats");

    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">
                {t(`${item.key}.label`)}
            </p>

            <p className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
                {t(`${item.key}.value`)}
            </p>
        </div>
    );
}

function OrganizationChartSection() {
    const t = useTranslations("Organization.chart");

    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <SectionHeading
                    align="center"
                    title={t("title")}
                    description={t("description")}
                />

                <div className="mt-14">
                    <MobileOrganizationChart />
                    <DesktopOrganizationChart />
                </div>
            </SectionContainer>
        </section>
    );
}

function MobileOrganizationChart() {
    const t = useTranslations("Organization.chart");

    return (
        <div className="space-y-6 lg:hidden">
            <div className="rounded-2xl border border-neutral-200 bg-stone-50 p-5 shadow-sm">
                <div className="flex justify-center">
                    <OrgCard title={t("holdingGroup")} variant="primary" />
                </div>

                <ConnectorLine className="mx-auto h-8" />

                <div className="flex justify-center">
                    <OrgCard title={t("chairman")} variant="secondary" />
                </div>

                <ConnectorLine className="mx-auto h-8" />

                <div className="flex justify-center">
                    <OrgCard title={t("ceo")} variant="secondary" />
                </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                    {t("executiveLeadership")}
                </p>

                <div className="mt-4 grid gap-3">
                    <MobileOrgNode node={assistantCeoNode} />

                    {executiveNodes.map((node) => (
                        <MobileOrgNode key={node.key} node={node} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DesktopOrganizationChart() {
    const t = useTranslations("Organization.chart");

    return (
        <div className="hidden overflow-x-auto rounded-2xl border border-neutral-200 bg-stone-50 p-6 shadow-sm lg:block">
            <div className="min-w-200">
                <div className="flex justify-center">
                    <OrgCard title={t("holdingGroup")} variant="primary" />
                </div>

                <ConnectorLine className="mx-auto h-10" />

                <div className="flex justify-center">
                    <OrgCard title={t("chairman")} variant="secondary" />
                </div>

                <ConnectorLine className="mx-auto h-10" />

                <div className="flex justify-center">
                    <OrgCard title={t("ceo")} variant="secondary" />
                </div>

                <div className="relative pt-16">
                    <div className="absolute left-1/2 top-0 h-10 w-px bg-neutral-300" />

                    <div className="absolute left-[8.333%] right-1/2 top-5 h-px bg-neutral-300" />
                    <div className="absolute left-[8.333%] top-5 h-11 w-px bg-neutral-300" />

                    <div className="absolute left-1/4 right-[8.333%] top-10 h-px bg-neutral-300" />

                    <div className="grid grid-cols-6 gap-4">
                        <div className="relative flex justify-center">
                            <OrgCard
                                title={t(`nodes.${assistantCeoNode.key}`)}
                                variant={assistantCeoNode.variant}
                            />
                        </div>

                        {executiveNodes.map((node) => (
                            <div
                                key={node.key}
                                className="relative flex justify-center"
                            >
                                <div className="absolute -top-6 h-6 w-px bg-neutral-300" />

                                <OrgCard
                                    title={t(`nodes.${node.key}`)}
                                    variant={node.variant}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function MobileOrgNode({ node }: { node: OrgNode }) {
    const t = useTranslations("Organization.chart.nodes");
    const isAssistant = node.key === "assistantCeo";

    return (
        <div
            className={
                isAssistant
                    ? "rounded-xl border border-neutral-200 bg-stone-50 px-4 py-3"
                    : "rounded-xl border border-orange-100 bg-orange-50/40 px-4 py-3"
            }
        >
            <p className="text-sm font-semibold leading-5 text-neutral-950">
                {t(node.key)}
            </p>
        </div>
    );
}

function OrgCard({ title, variant = "division" }: {
    title: string;
    variant?: "primary" | "secondary" | "division";
}) {
    const variants = {
        primary:
            "border-orange-600 bg-orange-600 text-white shadow-lg shadow-orange-600/20",
        secondary: "border-neutral-200 bg-white text-neutral-950 shadow-sm",
        division: "border-orange-100 bg-orange-50 text-neutral-950 shadow-sm",
    };

    return (
        <div
            className={`flex min-h-20 w-full min-w-44 max-w-60 items-center justify-center rounded-xl border p-4 text-center ${variants[variant]}`}
        >
            <p className="text-sm font-semibold leading-5">
                {title}
            </p>
        </div>
    );
}

function ConnectorLine({ className = "" }: { className?: string }) {
    return <div className={`w-px bg-neutral-300 ${className}`} />;
}

function BoardOfDirectorsSection() {
    const t = useTranslations("Organization.directors");

    return (
        <section className="relative overflow-hidden bg-stone-50 py-16">
            <Image
                src="/images/structure-4.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-50/85" />

            <SectionContainer className="relative z-10">
                <SectionHeading
                    align="center"
                    title={t("title")}
                    description={t("description")}
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {directors.map((director) => (
                        <article
                            key={director.key}
                            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white/90 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-lg"
                        >
                            <div className="h-56 bg-stone-300" />

                            <div className="p-6">
                                <p className="text-lg font-semibold tracking-tight text-neutral-950">
                                    {t(`items.${director.key}.name`)}
                                </p>

                                <p className="mt-1 text-sm font-medium text-orange-600">
                                    {t(`items.${director.key}.position`)}
                                </p>

                                <p className="mt-4 text-sm leading-6 text-neutral-600">
                                    {t(`items.${director.key}.description`)}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function BusinessUnitGovernanceSection() {
    const t = useTranslations("Organization.governance");

    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <SectionHeading
                    align="center"
                    title={t("title")}
                    description={t("description")}
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {governanceCards.map((item) => (
                        <article
                            key={item.key}
                            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                                {item.icon}
                            </div>

                            <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950">
                                {t(`items.${item.key}.category`)}
                            </h3>

                            <p className="mt-4 text-sm leading-6 text-neutral-600">
                                {t(`items.${item.key}.description`)}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function CTASection() {
    const t = useTranslations("Organization.cta");

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
