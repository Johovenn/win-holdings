import Link from "next/link";
import type { ReactNode } from "react";
import {
    ArrowUpRight,
    Factory,
    Hammer,
    Network,
    Target,
    TrendingUp,
    Truck,
    Users,
} from "lucide-react";
import Image from "next/image";
import ButtonLink from "@/app/components/ui/ButtonLink";

type Subsidiary = {
    name: string;
    industry: string;
    shortDescription: string;
    description: string;
    websiteLabel: string;
    websiteUrl: string;
    icon: ReactNode;
    imageSide: "left" | "right";
    imageSrc: string;
    imageAlt: string;
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
        websiteUrl: "https://3c-paint.vercel.app/",
        icon: <Factory className="h-6 w-6" />,
        imageSide: "right",
        imageSrc: "/images/subsidiaries-manufacture.jpg",
        imageAlt: "3C Paint manufacturing and coating production facility",
    },
    {
        name: "WLS Trust International",
        industry: "Outsourcing",
        shortDescription: "Construction materials and industrial supply solutions.",
        description:
            "WLS Trust International supplies construction materials, industrial products, machinery, packaging, and operational goods for project-based business needs. The company supports domestic and international customers with reliable procurement and distribution capabilities.",
        websiteLabel: "Learn more",
        websiteUrl: "/subsidiaries/outsourcing",
        icon: <Truck className="h-6 w-6" />,
        imageSide: "left",
        imageSrc: "/images/subsidiaries-outsourcing.jpeg",
        imageAlt: "WLS Trust International construction and industrial material supply",
    },
    {
        name: "Indosino Sukses Bersama",
        industry: "Trading",
        shortDescription: "Professional manpower and outsourcing support services.",
        description:
            "Indosino Sukses Bersama provides human resources, outsourcing, and manpower support for industrial and foreign-invested projects across Indonesia. The company helps businesses operate efficiently through reliable workforce solutions and business support services.",
        websiteLabel: "Learn more",
        websiteUrl: "/subsidiaries/trading",
        icon: <Users className="h-6 w-6" />,
        imageSide: "right",
        imageSrc: "/images/subsidiaries-trading.jpeg",
        imageAlt: "Indosino Sukses Bersama professional HR outsourcing team",
    },
    {
        name: "Indosino Construction Group",
        industry: "Construction",
        shortDescription: "Industrial construction and engineering project execution.",
        description:
            "Indosino Construction Group focuses on industrial engineering, construction, commissioning, and production-line support for large-scale projects. The company supports complex industrial development across key operational regions in Indonesia.",
        websiteLabel: "Learn more",
        websiteUrl: "/subsidiaries/construction",
        icon: <Hammer className="h-6 w-6" />,
        imageSide: "left",
        imageSrc: "/images/subsidiaries-construction.jpeg",
        imageAlt: "Indosino Construction Group industrial engineering and construction project",
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
    const isExternalLink = subsidiary.websiteUrl.startsWith("http");

    return (
        <section className="grid items-center gap-12 lg:grid-cols-2">
            {imageFirst ? (
                <SubsidiaryImage subsidiary={subsidiary} />
            ) : null}

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
                    target={isExternalLink ? "_blank" : undefined}
                    rel={isExternalLink ? "noreferrer" : undefined}
                    className="mt-8 inline-flex items-center gap-2 text-base font-semibold text-orange-600 transition-colors hover:text-orange-700"
                >
                    {subsidiary.websiteLabel}
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
            </div>

            {!imageFirst ? (
                <SubsidiaryImage subsidiary={subsidiary} />
            ) : null}
        </section>
    );
}

function SubsidiaryImage({
    subsidiary,
}: {
    subsidiary: Subsidiary;
}) {
    return (
        <div className="relative h-80 overflow-hidden rounded-xl border border-neutral-300 bg-stone-200 shadow-sm md:h-96">
            <Image
                src={subsidiary.imageSrc}
                alt={subsidiary.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
            />

            <div className="absolute inset-0 bg-neutral-950/10" />
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
                    Explore Opportunities with WIN Holdings
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    Connect with WIN Holdings to learn more about our subsidiaries,
                        business portfolio, and partnership opportunities.
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