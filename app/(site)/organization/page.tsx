import Link from "next/link";
import type { ReactNode } from "react";
import {
    ArrowRight,
    Building2,
    Factory,
    Landmark,
    Network,
    ShieldCheck,
    Store,
    Users,
} from "lucide-react";

type OrgNode = {
    title: string;
    subtitle?: string;
    variant?: "primary" | "secondary" | "division";
};

type Director = {
    name: string;
    position: string;
    description: string;
};

type GovernanceCard = {
    title: string;
    category: string;
    description: string;
    icon: ReactNode;
};

const directors: Director[] = [
    {
        name: "Director Name",
        position: "President Director",
        description:
            "Leads the company’s strategic direction, governance, and long-term business growth.",
    },
    {
        name: "Director Name",
        position: "Director of Operations",
        description:
            "Oversees operational performance, coordination, and execution across business units.",
    },
    {
        name: "Director Name",
        position: "Director of Finance",
        description:
            "Manages financial strategy, reporting, control, and corporate financial governance.",
    },
    {
        name: "Director Name",
        position: "Director of Business Development",
        description:
            "Develops strategic partnerships, portfolio expansion, and new business opportunities.",
    },
];

const governanceCards: GovernanceCard[] = [
    {
        title: "3C Paint",
        category: "Manufacture",
        description:
            "Managed under the manufacturing division to support production quality and operational efficiency.",
        icon: <Factory className="h-7 w-7" />,
    },
    {
        title: "WLS",
        category: "Outsourcing",
        description:
            "Managed under the outsourcing division to support workforce services and client operations.",
        icon: <Users className="h-7 w-7" />,
    },
    {
        title: "Indosino Sukses Bersama",
        category: "Trading",
        description:
            "Managed under the trading division to support commercial, supply, and distribution activities.",
        icon: <Store className="h-7 w-7" />,
    },
    {
        title: "ICG",
        category: "Construction",
        description:
            "Managed under the construction division to support project development and construction execution.",
        icon: <Building2 className="h-7 w-7" />,
    },
];

const directorNodes: OrgNode[] = [
    {
        title: "Director of Operations",
        variant: "secondary",
    },
    {
        title: "Director of Finance",
        variant: "secondary",
    },
    {
        title: "Director of Business Development",
        variant: "secondary",
    },
    {
        title: "Director of Human Resources",
        variant: "secondary",
    },
];

const divisionNodes: OrgNode[] = [
    {
        title: "Manufacturing Division",
        subtitle: "3C Paint",
        variant: "division",
    },
    {
        title: "Outsourcing Division",
        subtitle: "WLS",
        variant: "division",
    },
    {
        title: "Trading Division",
        subtitle: "Indosino Sukses Bersama",
        variant: "division",
    },
    {
        title: "Construction Division",
        subtitle: "ICG",
        variant: "division",
    },
    {
        title: "Corporate Support Division",
        subtitle: "Group-level support",
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
            <LeadershipCommitmentSection />
            <BusinessUnitGovernanceSection />
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
    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-28">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-orange-600/10 blur-3xl" />

            <SectionContainer className="relative grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <div className="mb-4 inline-flex rounded-full bg-orange-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
                        Organization Structure
                    </div>

                    <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                        Strong Governance for Sustainable Business Growth
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-7 text-neutral-600">
                        WIN Holdings is supported by a structured organization and
                        experienced leadership to ensure effective decision-making,
                        accountability, and strategic growth across all business units.
                    </p>
                </div>

                <div className="relative">
                    <div className="rounded-2xl border border-neutral-200 bg-stone-100 p-6 shadow-xl">
                        <div className="flex justify-center">
                            <OrgCard title="Board of Directors" variant="primary" />
                        </div>

                        <ConnectorLine className="mx-auto h-8" />

                        <div className="flex justify-center">
                            <OrgCard title="President Director" variant="secondary" />
                        </div>

                        <ConnectorLine className="mx-auto h-8" />

                        <div className="grid gap-4 sm:grid-cols-2">
                            <OrgCard title="Operations" />
                            <OrgCard title="Finance" />
                            <OrgCard title="Business Development" />
                            <OrgCard title="Human Resources" />
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function FrameworkSection() {
    return (
        <section className="bg-stone-50 py-12">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <SectionHeading
                        title="Our Organizational Framework"
                        description="WIN Holdings applies a clear organizational structure to support strategic direction, operational coordination, and business governance across its subsidiaries. This structure helps each business unit operate efficiently while remaining aligned with the company’s long-term vision."
                    />

                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <FrameworkStat label="Governance" value="Clear" />
                        <FrameworkStat label="Business Units" value="4+" />
                        <FrameworkStat label="Portfolio" value="Diversified" />
                    </div>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                    <div className="grid gap-4">
                        <FrameworkItem
                            icon={<Landmark className="h-6 w-6" />}
                            title="Strategic Direction"
                            description="Group-level business oversight"
                        />

                        <FrameworkItem
                            icon={<Network className="h-6 w-6" />}
                            title="Operational Coordination"
                            description="Integrated subsidiary management"
                        />

                        <FrameworkItem
                            icon={<ShieldCheck className="h-6 w-6" />}
                            title="Corporate Governance"
                            description="Accountability and ethical control"
                        />
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function FrameworkItem({
    icon,
    title,
    description,
}: {
    icon: ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-center gap-4 rounded-xl bg-stone-100 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                {icon}
            </div>

            <div>
                <p className="font-semibold text-neutral-950">{title}</p>
                <p className="text-sm text-neutral-600">{description}</p>
            </div>
        </div>
    );
}

function FrameworkStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-neutral-500">{label}</p>
            <p className="mt-1 text-xl font-semibold tracking-tight text-neutral-950">
                {value}
            </p>
        </div>
    );
}

function OrganizationChartSection() {
    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <SectionHeading
                    align="center"
                    title="WIN Holdings Organization Structure"
                    description="A clear hierarchy supports effective leadership, operational control, and business-unit accountability across the WIN Holdings ecosystem."
                />

                <div className="mt-14 overflow-x-auto rounded-2xl border border-neutral-200 bg-stone-50 p-6 shadow-sm">
                    <div className="min-w-5xl">
                        <div className="flex justify-center">
                            <OrgCard title="Board of Directors" variant="primary" />
                        </div>

                        <ConnectorLine className="mx-auto h-10" />

                        <div className="flex justify-center">
                            <OrgCard title="President Director" variant="secondary" />
                        </div>

                        <ConnectorLine className="mx-auto h-10" />

                        <div className="relative">
                            <div className="absolute left-1/2 top-0 hidden h-px w-3/4 -translate-x-1/2 bg-neutral-300 lg:block" />

                            <div className="grid gap-4 pt-6 lg:grid-cols-4">
                                {directorNodes.map((node) => (
                                    <div
                                        key={node.title}
                                        className="relative flex justify-center"
                                    >
                                        <div className="absolute -top-6 hidden h-6 w-px bg-neutral-300 lg:block" />

                                        <OrgCard
                                            title={node.title}
                                            variant={node.variant}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <ConnectorLine className="mx-auto h-10" />

                        <div className="relative">
                            <div className="absolute left-1/2 top-0 hidden h-px w-11/12 -translate-x-1/2 bg-neutral-300 lg:block" />

                            <div className="grid gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-5">
                                {divisionNodes.map((node) => (
                                    <div
                                        key={node.title}
                                        className="relative flex justify-center"
                                    >
                                        <div className="absolute -top-6 hidden h-6 w-px bg-neutral-300 lg:block" />

                                        <OrgCard
                                            title={node.title}
                                            subtitle={node.subtitle}
                                            variant={node.variant}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function OrgCard({ title, subtitle, variant = "division" }: OrgNode) {
    const variants = {
        primary:
            "border-orange-600 bg-orange-600 text-white shadow-lg shadow-orange-600/20",
        secondary: "border-neutral-200 bg-white text-neutral-950 shadow-sm",
        division: "border-neutral-200 bg-white text-neutral-950 shadow-sm",
    };

    return (
        <div
            className={`w-full min-w-40 max-w-56 rounded-xl border p-4 text-center ${variants[variant]}`}
        >
            <p className="text-sm font-semibold leading-5">{title}</p>

            {subtitle ? (
                <p
                    className={`mt-2 text-xs leading-5 ${
                        variant === "primary" ? "text-white/80" : "text-neutral-500"
                    }`}
                >
                    {subtitle}
                </p>
            ) : null}
        </div>
    );
}

function ConnectorLine({ className = "" }: { className?: string }) {
    return <div className={`w-px bg-neutral-300 ${className}`} />;
}

function BoardOfDirectorsSection() {
    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <SectionHeading
                    align="center"
                    title="Board of Directors"
                    description="WIN Holdings is led by experienced professionals who guide strategy, governance, and business performance across the group."
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {directors.map((director) => (
                        <article
                            key={director.position}
                            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-lg"
                        >
                            <div className="h-56 bg-stone-300" />

                            <div className="p-6">
                                <p className="text-lg font-semibold tracking-tight text-neutral-950">
                                    {director.name}
                                </p>

                                <p className="mt-1 text-sm font-medium text-orange-600">
                                    {director.position}
                                </p>

                                <p className="mt-4 text-sm leading-6 text-neutral-600">
                                    {director.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function LeadershipCommitmentSection() {
    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <div className="rounded-2xl bg-neutral-950 p-8 text-white md:p-12">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                                Leadership Commitment
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                                Responsible leadership for sustainable growth
                            </h2>
                        </div>

                        <div className="border-l-4 border-orange-600 pl-6">
                            <p className="text-xl leading-8 text-white/80">
                                Our leadership is committed to building a strong business
                                ecosystem through responsible governance, strategic
                                collaboration, and continuous improvement across all
                                subsidiaries.
                            </p>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function BusinessUnitGovernanceSection() {
    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <SectionHeading
                    align="center"
                    title="Business Unit Governance"
                    description="Each subsidiary operates under a defined division to maintain accountability, efficiency, and alignment with WIN Holdings’ strategic direction."
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {governanceCards.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                                {item.icon}
                            </div>

                            <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950">
                                {item.title}
                            </h3>

                            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-orange-600">
                                {item.category}
                            </p>

                            <p className="mt-4 text-sm leading-6 text-neutral-600">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function CTASection() {
    return (
        <section className="bg-neutral-800 py-12 text-stone-50">
            <SectionContainer className="flex flex-col items-center text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                    Governance & Structure
                </p>

                <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                    Driven by Structure, Led by Experience
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    Learn more about how WIN Holdings manages its business portfolio
                    through strong leadership, clear governance, and strategic direction.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <ButtonLink href="/subsidiaries">
                        Explore Our Subsidiaries
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </ButtonLink>

                    <ButtonLink href="/contact" variant="outline-light">
                        Contact Us
                    </ButtonLink>
                </div>
            </SectionContainer>
        </section>
    );
}