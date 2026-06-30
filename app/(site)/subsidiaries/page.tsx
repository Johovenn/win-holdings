import Link from "next/link";
import type { ReactNode } from "react";
import {
    ArrowUpRight,
    Factory,
    Hammer,
    Handshake,
    ImageIcon,
    Network,
    Target,
    TrendingUp,
    Truck,
    Users,
} from "lucide-react";

type Subsidiary = {
    name: string;
    industry: string;
    shortDescription: string;
    description: string;
    websiteLabel: string;
    websiteUrl: string;
    icon: ReactNode;
    imageSide: "left" | "right";
};

type SynergyCard = {
    title: string;
    description: string;
    icon: ReactNode;
};

const subsidiaries: Subsidiary[] = [
    {
        name: "3C Paint",
        industry: "Manufacture",
        shortDescription: "High-performance industrial and commercial coating solutions.",
        description:
            "Specializing in the manufacturing of premium architectural and industrial paint products. Our facilities utilize state-of-the-art chemical engineering to deliver durability, aesthetic excellence, and environmental compliance across diverse markets.",
        websiteLabel: "Visit 3C Paint Website",
        websiteUrl: "#",
        icon: <Factory className="h-6 w-6" />,
        imageSide: "right",
    },
    {
        name: "WLS",
        industry: "Outsourcing",
        shortDescription: "Comprehensive workforce and operational support services.",
        description:
            "WLS provides essential workforce solutions and operational support services, enabling businesses to scale efficiently. From talent management to business process optimization, we provide the human capital and logistics required for success.",
        websiteLabel: "Visit WLS Website",
        websiteUrl: "#",
        icon: <Users className="h-6 w-6" />,
        imageSide: "left",
    },
    {
        name: "Indosino Sukses Bersama",
        industry: "Trading",
        shortDescription: "Global supply chain and distribution network management.",
        description:
            "Our trading arm manages critical supply chains, distribution networks, and commercial activities globally. We connect producers with key markets through a resilient logistics framework and strategic international partnerships.",
        websiteLabel: "Visit Indosino Sukses Bersama Website",
        websiteUrl: "#",
        icon: <Truck className="h-6 w-6" />,
        imageSide: "right",
    },
    {
        name: "ICG",
        industry: "Construction",
        shortDescription: "Infrastructure development and building excellence.",
        description:
            "ICG is dedicated to building the future through innovative construction and infrastructure projects. We specialize in high-quality building development, commercial spaces, and urban planning projects that stand the test of time.",
        websiteLabel: "Visit ICG Website",
        websiteUrl: "#",
        icon: <Hammer className="h-6 w-6" />,
        imageSide: "left",
    },
];

const synergyCards: SynergyCard[] = [
    {
        title: "Strategic Direction",
        description:
            "WIN Holdings provides strategic oversight to keep each subsidiary aligned with the group’s long-term business direction.",
        icon: <Target className="h-6 w-6" />,
    },
    {
        title: "Operational Coordination",
        description:
            "Cross-business coordination helps each company improve execution, efficiency, and accountability.",
        icon: <Network className="h-6 w-6" />,
    },
    {
        title: "Sustainable Growth",
        description:
            "The group focuses on long-term value creation through responsible growth and stable business development.",
        icon: <TrendingUp className="h-6 w-6" />,
    },
];

export default function SubsidiariesPage() {
    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <PortfolioOverviewSection />
            <SubsidiarySections />
            <GroupSynergySection />
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
    variant?: "orange" | "outline";
    className?: string;
}) {
    const variants = {
        orange: "bg-orange-600 text-white shadow-lg hover:bg-orange-700",
        outline:
            "border border-neutral-300 bg-white text-neutral-950 hover:border-orange-600 hover:text-orange-600",
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

function PortfolioOverviewSection() {
    return (
        <section className="bg-stone-100 py-12">
            <SectionContainer>
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        Our Business Portfolio
                    </h1>

                    <p className="mt-4 text-base leading-6 text-neutral-600">
                        Each subsidiary under WIN Holdings plays a strategic role in
                        supporting the group’s diversified business ecosystem, leveraging
                        cross-industry expertise to drive sustainable value.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {subsidiaries.map((item) => (
                        <PortfolioCard key={item.name} subsidiary={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function PortfolioCard({ subsidiary }: { subsidiary: Subsidiary }) {
    return (
        <article className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="text-orange-600">{subsidiary.icon}</div>

            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-600">
                {subsidiary.industry}
            </p>

            <h2 className="mt-2 text-2xl font-semibold leading-8 tracking-tight text-neutral-950">
                {subsidiary.name}
            </h2>

            <p className="mt-2 text-sm leading-5 text-neutral-600">
                {subsidiary.shortDescription}
            </p>
        </article>
    );
}

function SubsidiarySections() {
    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <div className="space-y-24 lg:space-y-32">
                    {subsidiaries.map((subsidiary) => (
                        <SubsidiaryDetailSection
                            key={subsidiary.name}
                            subsidiary={subsidiary}
                        />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function SubsidiaryDetailSection({
    subsidiary,
}: {
    subsidiary: Subsidiary;
}) {
    const imageFirst = subsidiary.imageSide === "left";

    return (
        <section className="grid items-center gap-12 lg:grid-cols-2">
            {imageFirst ? <SubsidiaryImage /> : null}

            <div className={imageFirst ? "lg:pl-6" : "lg:pr-6"}>
                <p className="text-sm font-bold uppercase tracking-wider text-orange-600">
                    {subsidiary.industry}
                </p>

                <h2 className="mt-2 text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                    {subsidiary.name}
                </h2>

                <p className="mt-6 text-lg leading-8 text-neutral-600">
                    {subsidiary.description}
                </p>

                <Link
                    href={subsidiary.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                    {subsidiary.websiteLabel}
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
            </div>

            {!imageFirst ? <SubsidiaryImage /> : null}
        </section>
    );
}

function SubsidiaryImage() {
    return (
        <div className="overflow-hidden rounded-xl border border-neutral-300 bg-stone-200 p-px shadow-sm">
            <div className="flex h-80 items-center justify-center rounded-xl bg-stone-300 text-neutral-500">
                <ImageIcon className="h-6 w-6" />
            </div>
        </div>
    );
}

function GroupSynergySection() {
    return (
        <section className="bg-stone-100 py-16">
            <SectionContainer>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                        Group Synergy
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold leading-10 tracking-tight text-neutral-950 md:text-4xl">
                        Building Value Through Business Synergy
                    </h2>

                    <p className="mt-4 text-base leading-7 text-neutral-600">
                        WIN Holdings connects its subsidiaries through strategic
                        direction, governance, and operational coordination. This
                        approach allows each company to grow independently while
                        contributing to the strength of the overall group.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {synergyCards.map((card) => (
                        <article
                            key={card.title}
                            className="rounded-2xl border border-neutral-300 bg-white p-6 shadow-sm"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                                {card.icon}
                            </div>

                            <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950">
                                {card.title}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-neutral-600">
                                {card.description}
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
        <section className="relative overflow-hidden bg-stone-50 py-16">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-stone-100" />

            <SectionContainer className="relative flex justify-center">
                <div className="w-full max-w-3xl rounded-3xl border border-neutral-300 bg-white p-8 text-center shadow-sm md:p-16">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-600/10 text-orange-600">
                        <Handshake className="h-8 w-8" />
                    </div>

                    <h2 className="mt-8 text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                        Explore Opportunities with WIN Holdings
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-7 text-neutral-600">
                        Connect with WIN Holdings to learn more about our subsidiaries,
                        business portfolio, and partnership opportunities.
                    </p>

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <ButtonLink href="/contact">Contact Us</ButtonLink>

                        <ButtonLink href="/news" variant="outline">
                            View News & Info
                        </ButtonLink>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}