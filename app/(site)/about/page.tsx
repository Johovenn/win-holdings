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
    side: "left" | "right";
};

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

const timeline: TimelineItem[] = [
    {
        year: "2010",
        title: "The Foundation",
        description:
        "WIN Holdings established as a strategic management firm to consolidate regional manufacturing assets.",
        side: "left",
    },
    {
        year: "2014",
        title: "Manufacturing Excellence",
        description:
        "Acquisition and scaling of 3C Paint, establishing a foothold in the industrial coatings market.",
        side: "right",
    },
    {
        year: "2018",
        title: "Diversification Phase",
        description:
        "Expansion into human resources and international trade with WLS and Indosino Sukses Bersama.",
        side: "left",
    },
    {
        year: "2023+",
        title: "Future-Forward Construction",
        description:
        "Launching ICG to spearhead sustainable infrastructure and modern architectural development.",
        side: "right",
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
                <div
                    className="h-80 overflow-hidden rounded-xl bg-stone-300 bg-cover bg-center shadow-md"
                    style={{
                        backgroundImage: "url('/images/about-boardroom.jpg')",
                    }}
                />

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
                            <strong className="font-bold text-neutral-950">3C Paint</strong>,{" "}
                            <strong className="font-bold text-neutral-950">WLS</strong>,{" "}
                            <strong className="font-bold text-neutral-950">Indosino</strong>,
                            and <strong className="font-bold text-neutral-950">ICG</strong>—we
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
        <section className="bg-stone-50 py-12">
            <SectionContainer className="grid gap-6 lg:grid-cols-2">
                <article className="relative overflow-hidden rounded-xl border border-neutral-300 bg-white p-6 shadow-sm lg:min-h-80">
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

                <article className="relative overflow-hidden rounded-xl border border-neutral-300 bg-white p-6 shadow-sm">
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
        <section className="bg-stone-50 py-12">
            <SectionContainer>
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
                            className="rounded-xl bg-neutral-800 p-6 text-stone-50 shadow-sm"
                        >
                            <div className="text-orange-600">{item.icon}</div>

                            <h3 className="mt-4 text-2xl font-semibold leading-8 tracking-tight">
                                {item.name}
                            </h3>

                            <p className="text-base uppercase leading-6 text-orange-600">
                                {item.industry}
                            </p>

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
                <h2 className="text-center text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                 Our Growth Journey
                </h2>

                <div className="relative mx-auto mt-16 max-w-5xl">
                    <div className="absolute bottom-0 left-4 top-0 w-px bg-neutral-300 md:left-1/2 md:-translate-x-1/2" />

                    <div className="space-y-16 md:space-y-24">
                        {timeline.map((item) => (
                        <TimelineRow key={item.year} item={item} />
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
                <p className="text-base leading-6 text-orange-600">{item.year}</p>

                <h3 className="mt-2 text-base font-medium leading-6 text-neutral-950">
                    {item.title}
                </h3>

                <p className="mt-2 text-base leading-6 text-neutral-600">
                    {item.description}
                </p>
            </div>

            <span className="absolute left-4 top-2 h-4 w-4 -translate-x-1/2 rounded-full bg-orange-600 md:left-1/2" />
        </div>
    );
}

function CTASection() {
    return (
        <section className="bg-neutral-800 py-12 text-stone-50">
            <SectionContainer className="flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                    Building Stronger Businesses Together
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    Join us as we continue to shape industries and define the future of
                    strategic management.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <ButtonLink href="/subsidiaries">Explore Our Subsidiaries</ButtonLink>

                    <ButtonLink href="/contact" variant="outline-light">
                        Contact Us
                    </ButtonLink>
                </div>
            </SectionContainer>
        </section>
    );
}