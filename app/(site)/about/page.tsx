import Link from "next/link";
import type { ReactNode } from "react";
import {
    ArrowRight,
    Award,
    Building2,
    CheckCircle2,
    Eye,
    Factory,
    Handshake,
    Repeat2,
    ShieldCheck,
    Target,
    TrendingUp,
    Users,
} from "lucide-react";
import Image from "next/image";

type ValueCard = {
    title: string;
    description: string;
    icon: ReactNode;
};

type SubsidiaryCard = {
    name: string;
    industry: string;
    description: string;
    icon: ReactNode;
};

type TimelineItem = {
    year: string;
    title: string;
    description: string;
    pillar: string;
    side: "left" | "right";
};

const timeline: TimelineItem[] = [
    {
        year: "2019",
        title: "Foundation in Construction Materials Trading",
        description:
            "The company was established in Indonesia with an initial focus on construction material trading in West Java, including cement, stone, sand, and other building materials. This stage built the supplier network and project-service experience that became the foundation for future business expansion.",
        pillar: "Trading • Procurement • Supply Network",
        side: "left",
    },
    {
        year: "2021",
        title: "Expansion into Workforce Solutions",
        description:
            "The company entered the manpower outsourcing and human resources supply sector, starting with Halmahera as its first strategic operation point. Services included operators, technicians, skilled workers, general workers, and project support personnel.",
        pillar: "Workforce • Industrial Services",
        side: "right",
    },
    {
        year: "2023",
        title: "Industrial Food Supply Development",
        description:
            "To support large-scale industrial operations, the company expanded into food supply and logistics, providing rice, vegetables, meat, seafood, seasonings, and other essential goods while strengthening warehousing, distribution, cold chain, and integrated supply-chain capabilities.",
        pillar: "Food Supply • Logistics",
        side: "left",
    },
    {
        year: "2024",
        title: "National and Multi-Sector Expansion",
        description:
            "The company expanded its operational bases into Sulawesi and Kalimantan, entered the construction sector through civil, mechanical, and electrical works, and invested in an industrial coating manufacturing facility in Cikarang, West Java.",
        pillar: "Regional Expansion • Construction Services • Manufacturing",
        side: "right",
    },
    {
        year: "2025",
        title: "Strategic Construction Expansion and Holding Headquarters",
        description:
            "The company strengthened its construction capability by winning a strategic project in West Kalimantan involving civil infrastructure and sports facility development. In the same year, the group established its headquarters at Gold Coast Office, Jakarta, with approximately 900 m² of office space to support integrated governance and corporate coordination.",
        pillar: "Infrastructure Development • Corporate Governance",
        side: "left",
    },
];

const values: ValueCard[] = [
    {
        title: "Integrity",
        description: "Upholding the highest ethical standards in every transaction.",
        icon: <ShieldCheck className="h-6 w-6" />,
    },
    {
        title: "Excellence",
        description: "Relentlessly pursuing quality and superior performance.",
        icon: <Award className="h-6 w-6" />,
    },
    {
        title: "Collaboration",
        description: "Working together to achieve more than we can alone.",
        icon: <Handshake className="h-6 w-6" />,
    },
    {
        title: "Growth",
        description: "Continuously expanding our potential and market impact.",
        icon: <TrendingUp className="h-6 w-6" />,
    },
];

const subsidiaries: SubsidiaryCard[] = [
    {
        name: "3C Paint",
        industry: "Manufacturing",
        description:
        "Leading manufacturer of premium industrial and commercial coatings.",
        icon: <Factory className="h-8 w-8" />,
    },
    {
        name: "WLS",
        industry: "Outsourcing",
        description:
        "Comprehensive workforce management and professional recruitment services.",
        icon: <Users className="h-8 w-8" />,
    },
    {
        name: "Indosino",
        industry: "Trading",
        description:
        "Global trading hub facilitating seamless international supply chains.",
        icon: <Repeat2 className="h-8 w-8" />,
    },
    {
        name: "ICG",
        industry: "Construction",
        description:
        "Specialized infrastructure development and architectural solutions.",
        icon: <Building2 className="h-8 w-8" />,
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <WhoWeAreSection />
            <VisionMissionSection />
            <CoreValuesSection />
            <BusinessEcosystemSection />
            <GrowthJourneySection />
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
function WhoWeAreSection() {
    return (
        <section className="bg-white py-12">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="relative h-80 overflow-hidden rounded-xl bg-stone-300 shadow-md">
                    <Image
                        src="/images/about-hero.jpeg"
                        alt="WIN Holdings boardroom and business discussion"
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        Who We Are
                    </h1>

                    <div className="mt-6 space-y-4 text-base leading-7 text-neutral-600">
                        <p>
                            WIN Holdings is a premier investment and management firm dedicated
                            to fostering sustainable growth through a diverse portfolio of
                            market-leading subsidiaries. Our expertise spans manufacturing,
                            human capital solutions, international trading, and infrastructure
                            development.
                        </p>

                        <p>
                            By providing strategic oversight and operational excellence to our
                            core entities—including{" "}
                            <strong className="font-bold text-neutral-950">Manufacturing</strong>,{" "}
                            <strong className="font-bold text-neutral-950">Outsourcing</strong>,{" "}
                            <strong className="font-bold text-neutral-950">Trading</strong>,
                            and <strong className="font-bold text-neutral-950">Construction</strong> companies —we
                            ensure each business maintains the highest standards of quality
                            while driving collective value for our stakeholders.
                        </p>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function VisionMissionSection() {
    const missions = [
        "Providing visionary strategic direction to ensure long-term profitability and market leadership for all subsidiaries.",
        "Upholding operational excellence through lean processes and innovative management frameworks.",
        "Cultivating sustainable partnerships that empower communities and preserve environmental integrity.",
        "Fostering responsible growth by adhering to the highest standards of corporate governance and ethics.",
    ];

    return (
        <section className="relative overflow-hidden bg-stone-50 py-12">
            <Image
                src="/images/landscape-bg-3.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-50/60" />

            <SectionContainer className="relative z-10 grid gap-6 lg:grid-cols-2">
                <article className="relative overflow-hidden rounded-xl border border-neutral-300 bg-white/90 p-6 shadow-sm backdrop-blur-sm lg:min-h-80">
                    <div className="absolute inset-x-0 top-0 h-1 bg-orange-600" />

                    <div className="flex items-center gap-3">
                        <Eye className="h-6 w-6 text-orange-600" />

                        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                            Our Vision
                        </h2>
                    </div>

                    <p className="mt-6 text-lg italic leading-8 text-neutral-600">
                        “To become a trusted holding company that creates sustainable value
                        and drives transformative growth across global markets through
                        excellence and innovation.”
                    </p>
                </article>

                <article className="relative overflow-hidden rounded-xl border border-neutral-300 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                    <div className="absolute inset-x-0 top-0 h-1 bg-orange-600" />

                    <div className="flex items-center gap-3">
                        <Target className="h-6 w-6 text-orange-600" />

                        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                            Our Mission
                        </h2>
                    </div>

                    <ul className="mt-6 space-y-4">
                        {missions.map((mission) => (
                            <li key={mission} className="flex gap-3">
                                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-orange-600" />

                                <p className="text-base leading-6 text-neutral-600">
                                    {mission}
                                </p>
                            </li>
                        ))}
                    </ul>
                </article>
            </SectionContainer>
        </section>
    );
}

function CoreValuesSection() {
    return (
        <section className="bg-stone-100 py-12">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        Our Core Values
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-neutral-600">
                        The principles that guide our every decision and interaction across
                        the WIN Holdings ecosystem.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((value) => (
                        <article
                            key={value.title}
                            className="flex flex-col items-center rounded-xl border border-neutral-300 bg-white p-6 text-center shadow-sm"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600/10 text-orange-600">
                                {value.icon}
                            </div>

                            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">
                                {value.title}
                            </h3>

                            <p className="mt-2 text-base leading-6 text-neutral-600">
                                {value.description}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function BusinessEcosystemSection() {
    return (
        <section className="relative overflow-hidden bg-stone-50 py-12">
            <Image
                src="/images/landscape-bg-4.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-50/70" />

            <SectionContainer className="relative z-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            Our Business Ecosystem
                        </h2>

                        <p className="mt-4 text-base leading-6 text-neutral-600">
                            Diverse expertise, unified by strategic management.
                        </p>
                    </div>

                    <Link
                        href="/subsidiaries"
                        className="inline-flex items-center gap-2 text-base leading-6 text-orange-600 transition-colors hover:text-orange-700"
                    >
                        View All Subsidiaries
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {subsidiaries.map((item) => (
                        <article
                            key={item.name}
                            className="rounded-xl bg-neutral-800/95 p-6 text-stone-50 shadow-sm backdrop-blur-sm"
                        >
                            <div className="text-orange-600">{item.icon}</div>

                            <h3 className="mt-4 text-2xl font-semibold leading-8 tracking-tight">
                                {item.industry}
                            </h3>

                            <p className="mt-3 text-base leading-6 text-stone-50/80">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}
function GrowthJourneySection() {
    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                        Company History
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        Our Growth Journey
                    </h2>

                    <p className="mt-4 text-base leading-7 text-neutral-600">
                        From construction material trading to an integrated industrial
                        supply and construction group, our growth reflects continuous
                        expansion across procurement, workforce services, logistics,
                        construction, manufacturing, and corporate governance.
                    </p>
                </div>

                <div className="relative mx-auto mt-16 max-w-5xl">
                    <div className="absolute bottom-0 left-4 top-0 w-px bg-neutral-300 md:left-1/2 md:-translate-x-1/2" />

                    <div className="space-y-10 md:space-y-16">
                        {timeline.map((item) => (
                            <TimelineRow key={`${item.year}-${item.title}`} item={item} />
                        ))}
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function TimelineRow({ item }: { item: TimelineItem }) {
    const isLeft = item.side === "left";

    return (
        <div className="relative grid gap-8 pl-12 md:grid-cols-2 md:pl-0">
            <div
                className={
                    isLeft
                        ? "md:col-start-1 md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12 md:text-left"
                }
            >
                <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
                        {item.year}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold leading-7 tracking-tight text-neutral-950">
                        {item.title}
                    </h3>

                    <p className="mt-3 text-base leading-7 text-neutral-600">
                        {item.description}
                    </p>

                    <div
                        className={
                            isLeft
                                ? "mt-5 flex md:justify-end"
                                : "mt-5 flex md:justify-start"
                        }
                    >
                        <span className="inline-flex rounded-full bg-orange-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
                            {item.pillar}
                        </span>
                    </div>
                </article>
            </div>

            <span className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-orange-600 shadow-sm md:left-1/2" />
        </div>
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
                    Building Stronger Businesses Together
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    Join us as we continue to shape industries and define the future of
                    strategic management.
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