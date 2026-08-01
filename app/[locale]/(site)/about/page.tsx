import { Link } from "@/i18n/routing";
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
import { useTranslations } from "next-intl";

type ValueCard = {
    key: "integrity" | "excellence" | "collaboration" | "growth";
    icon: ReactNode;
};

type SubsidiaryCard = {
    key: "manufacturing" | "outsourcing" | "trading" | "construction";
    icon: ReactNode;
};

type TimelineItem = {
    key: "foundation" | "workforce" | "foodSupply" | "expansion" | "headquarters";
    year: string;
    side: "left" | "right";
};

const timeline: TimelineItem[] = [
    {
        key: "foundation",
        year: "2019",
        side: "left",
    },
    {
        key: "workforce",
        year: "2021",
        side: "right",
    },
    {
        key: "foodSupply",
        year: "2023",
        side: "left",
    },
    {
        key: "expansion",
        year: "2024",
        side: "right",
    },
    {
        key: "headquarters",
        year: "2025",
        side: "left",
    },
];

const values: ValueCard[] = [
    {
        key: "integrity",
        icon: <ShieldCheck className="h-6 w-6" />,
    },
    {
        key: "excellence",
        icon: <Award className="h-6 w-6" />,
    },
    {
        key: "collaboration",
        icon: <Handshake className="h-6 w-6" />,
    },
    {
        key: "growth",
        icon: <TrendingUp className="h-6 w-6" />,
    },
];

const subsidiaries: SubsidiaryCard[] = [
    {
        key: "manufacturing",
        icon: <Factory className="h-8 w-8" />,
    },
    {
        key: "outsourcing",
        icon: <Users className="h-8 w-8" />,
    },
    {
        key: "trading",
        icon: <Repeat2 className="h-8 w-8" />,
    },
    {
        key: "construction",
        icon: <Building2 className="h-8 w-8" />,
    },
];

const missionKeys = [
    "strategicDirection",
    "operationalExcellence",
    "sustainablePartnerships",
    "responsibleGrowth",
] as const;

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
    const t = useTranslations("About.whoWeAre");

    return (
        <section className="bg-white py-12">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="relative h-80 overflow-hidden rounded-xl bg-stone-300 shadow-md">
                    <Image
                        src="/images/hq-3.jpg"
                        alt={t("imageAlt")}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h1>

                    <div className="mt-6 space-y-4 text-base leading-7 text-neutral-600">
                        <p>{t("paragraph1")}</p>

                        <p>
                            {t.rich("paragraph2", {
                                manufacturing: (chunks) => (
                                    <strong className="font-bold text-neutral-950">
                                        {chunks}
                                    </strong>
                                ),
                                outsourcing: (chunks) => (
                                    <strong className="font-bold text-neutral-950">
                                        {chunks}
                                    </strong>
                                ),
                                trading: (chunks) => (
                                    <strong className="font-bold text-neutral-950">
                                        {chunks}
                                    </strong>
                                ),
                                construction: (chunks) => (
                                    <strong className="font-bold text-neutral-950">
                                        {chunks}
                                    </strong>
                                ),
                            })}
                        </p>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function VisionMissionSection() {
    const t = useTranslations("About.visionMission");

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
                            {t("visionTitle")}
                        </h2>
                    </div>

                    <p className="mt-6 text-lg italic leading-8 text-neutral-600">
                        {t("visionText")}
                    </p>
                </article>

                <article className="relative overflow-hidden rounded-xl border border-neutral-300 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
                    <div className="absolute inset-x-0 top-0 h-1 bg-orange-600" />

                    <div className="flex items-center gap-3">
                        <Target className="h-6 w-6 text-orange-600" />

                        <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                            {t("missionTitle")}
                        </h2>
                    </div>

                    <ul className="mt-6 space-y-4">
                        {missionKeys.map((missionKey) => (
                            <li key={missionKey} className="flex gap-3">
                                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-orange-600" />

                                <p className="text-base leading-6 text-neutral-600">
                                    {t(`missions.${missionKey}`)}
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
    const t = useTranslations("About.coreValues");

    return (
        <section className="bg-stone-100 py-12">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-base leading-6 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((value) => (
                        <article
                            key={value.key}
                            className="flex flex-col items-center rounded-xl border border-neutral-300 bg-white p-6 text-center shadow-sm"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-600/10 text-orange-600">
                                {value.icon}
                            </div>

                            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-neutral-950">
                                {t(`items.${value.key}.title`)}
                            </h3>

                            <p className="mt-2 text-base leading-6 text-neutral-600">
                                {t(`items.${value.key}.description`)}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function BusinessEcosystemSection() {
    const t = useTranslations("About.businessEcosystem");

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
                            {t("title")}
                        </h2>

                        <p className="mt-4 text-base leading-6 text-neutral-600">
                            {t("description")}
                        </p>
                    </div>

                    <Link
                        href="/subsidiaries"
                        className="inline-flex items-center gap-2 text-base leading-6 text-orange-600 transition-colors hover:text-orange-700"
                    >
                        {t("cta")}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {subsidiaries.map((item) => (
                        <article
                            key={item.key}
                            className="rounded-xl bg-neutral-800/95 p-6 text-stone-50 shadow-sm backdrop-blur-sm"
                        >
                            <div className="text-orange-600">{item.icon}</div>

                            <h3 className="mt-4 text-2xl font-semibold leading-8 tracking-tight">
                                {t(`items.${item.key}.title`)}
                            </h3>

                            <p className="mt-3 text-base leading-6 text-stone-50/80">
                                {t(`items.${item.key}.description`)}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function GrowthJourneySection() {
    const t = useTranslations("About.growthJourney");

    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                        {t("eyebrow")}
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <p className="mt-4 text-base leading-7 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="relative mx-auto mt-16 max-w-5xl">
                    <div className="absolute bottom-0 left-4 top-0 w-px bg-neutral-300 md:left-1/2 md:-translate-x-1/2" />

                    <div className="space-y-10 md:space-y-16">
                        {timeline.map((item) => (
                            <TimelineRow
                                key={`${item.year}-${item.key}`}
                                item={item}
                            />
                        ))}
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function TimelineRow({ item }: { item: TimelineItem }) {
    const t = useTranslations("About.growthJourney.timeline");
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
                        {t(`${item.key}.title`)}
                    </h3>

                    <p className="mt-3 text-base leading-7 text-neutral-600">
                        {t(`${item.key}.description`)}
                    </p>

                    <div
                        className={
                            isLeft
                                ? "mt-5 flex md:justify-end"
                                : "mt-5 flex md:justify-start"
                        }
                    >
                        <span className="inline-flex rounded-full bg-orange-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-700">
                            {t(`${item.key}.pillar`)}
                        </span>
                    </div>
                </article>
            </div>

            <span className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-orange-600 shadow-sm md:left-1/2" />
        </div>
    );
}

function CTASection() {
    const t = useTranslations("About.cta");

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