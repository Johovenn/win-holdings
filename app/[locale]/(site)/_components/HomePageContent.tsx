import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";
import {
    ArrowRight,
    Award,
    BriefcaseBusiness,
    Building2,
    ChartNoAxesCombined,
    Factory,
    Repeat2,
    TrendingUp,
    Users,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import LatestNewsClient from "@/app/components/news/LatestNewsClient";
import SectionContainer from "@/app/components/ui/Container";
import { getLatestNews } from "@/lib/news";

type Highlight = {
    key: "diversifiedPortfolio" | "strategicGrowth" | "operationalExcellence";
    icon: ReactNode;
};

type Subsidiary = {
    key: "manufacturing" | "outsourcing" | "trading" | "construction";
    icon: ReactNode;
};

const highlights: Highlight[] = [
    {
        key: "diversifiedPortfolio",
        icon: <BriefcaseBusiness className="h-5 w-5" />,
    },
    {
        key: "strategicGrowth",
        icon: <TrendingUp className="h-5 w-5" />,
    },
    {
        key: "operationalExcellence",
        icon: <Award className="h-5 w-5" />,
    },
];

const subsidiaries: Subsidiary[] = [
    {
        key: "manufacturing",
        icon: <Factory className="h-10 w-10" />,
    },
    {
        key: "outsourcing",
        icon: <Users className="h-10 w-10" />,
    },
    {
        key: "trading",
        icon: <Repeat2 className="h-10 w-10" />,
    },
    {
        key: "construction",
        icon: <Building2 className="h-10 w-10" />,
    },
];

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white text-neutral-950">
            <HeroSection />
            <CompanyOverview />
            <BusinessPortfolio />
            <OrganizationLeadership />
            <LatestNews />
            <CareerSection />
        </main>
    );
}

function PrimaryLink({
    href,
    children,
    variant = "dark",
    className = "",
}: {
    href: string;
    children: ReactNode;
    variant?: "dark" | "orange" | "outline" | "dark-outline";
    className?: string;
}) {
    const variants = {
        dark: "bg-neutral-950 text-white shadow-xl hover:bg-black",
        orange: "bg-orange-600 text-white shadow-xl hover:bg-orange-700",
        outline:
            "border border-neutral-300 bg-white text-neutral-950 hover:border-orange-600 hover:text-orange-600",
        "dark-outline":
            "border-2 border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-white",
    };

    return (
        <Link
            href={href}
            className={`inline-flex items-center justify-center rounded-xl px-8 py-4 text-base transition-colors ${variants[variant]} ${className}`}
        >
            {children}
        </Link>
    );
}

function HeroSection() {
    const t = useTranslations("Home.hero");

    return (
        <section className="relative overflow-hidden bg-white py-20 lg:py-32">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <div className="mb-4 inline-flex rounded-full bg-orange-600/10 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
                        {t("eyebrow")}
                    </div>

                    <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                        {t("title")}
                    </h1>

                    <p className="mt-4 max-w-xl text-lg leading-7 text-neutral-600">
                        {t("description")}
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <PrimaryLink href="/subsidiaries">
                            {t("primaryCta")}
                        </PrimaryLink>

                        <PrimaryLink href="/about" variant="outline">
                            {t("secondaryCta")}
                        </PrimaryLink>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

                    <div className="relative h-96 overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                            src="/images/hq-5.jpg"
                            alt={t("imageAlt")}
                            fill
                            preload
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </div>

                    <div className="absolute -bottom-6 left-4 rounded-xl border border-neutral-200/50 bg-white/80 p-6 shadow-xl backdrop-blur-md md:-left-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-600 text-white">
                                <ChartNoAxesCombined className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-2xl font-semibold tracking-tight text-neutral-950">
                                    15+
                                </p>

                                <p className="text-xs font-semibold text-neutral-600">
                                    {t("growthLabel")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function CompanyOverview() {
    const t = useTranslations("Home.companyOverview");

    return (
        <section className="relative overflow-hidden bg-white py-12">
            <Image
                src="/images/landscape-bg-1.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-white/70" />

            <SectionContainer className="relative z-10">
                <div className="max-w-3xl">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <p className="mt-4 text-lg leading-7 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {highlights.map((item) => (
                        <article
                            key={item.key}
                            className="rounded-xl border border-neutral-300/30 bg-white/85 p-6 shadow-sm backdrop-blur-sm"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-neutral-950 shadow-sm">
                                {item.icon}
                            </div>

                            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                                {t(`highlights.${item.key}.title`)}
                            </h3>

                            <p className="mt-2 text-base leading-6 text-neutral-600">
                                {t(`highlights.${item.key}.description`)}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function BusinessPortfolio() {
    const t = useTranslations("Home.businessPortfolio");

    return (
        <section className="relative overflow-hidden bg-white py-12">
            <Image
                src="/images/business-portfolio-bg.jpeg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-white/85" />

            <SectionContainer className="relative z-10">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <div className="mx-auto mt-2 h-1 w-20 bg-orange-600" />
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    {subsidiaries.map((item) => (
                        <article
                            key={item.key}
                            className="rounded-2xl bg-neutral-950/95 p-6 text-white shadow-xl backdrop-blur-sm"
                        >
                            <div className="flex min-h-60 flex-col justify-between">
                                <div>
                                    <div className="mb-4 text-orange-600">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                                        {t(`items.${item.key}.title`)}
                                    </h3>

                                    <p className="mt-3 max-w-xl text-base leading-6 text-neutral-300">
                                        {t(`items.${item.key}.description`)}
                                    </p>
                                </div>

                                <div className="mt-4 border-t border-neutral-300/30 pt-4">
                                    <Link
                                        href="/subsidiaries"
                                        className="inline-flex items-center gap-2 text-base text-orange-600 transition-colors hover:text-orange-400"
                                    >
                                        {t("cta")}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function OrganizationLeadership() {
    const t = useTranslations("Home.organizationLeadership");

    const points = [
        t("points.experiencedBoard"),
        t("points.agileStructure"),
        t("points.accountability"),
    ];

    const images = [
        {
            src: "/images/hq-4.jpg",
            alt: t("images.leadershipMeeting"),
            className: "h-64",
        },
        {
            src: "/images/hq-2.jpg",
            alt: t("images.corporateDiscussion"),
            className: "h-48",
        },
        {
            src: "/images/hq-1.jpg",
            alt: t("images.managementCollaboration"),
            className: "h-48",
        },
        {
            src: "/images/hq-6.jpg",
            alt: t("images.executiveLeadership"),
            className: "h-64",
        },
    ];

    return (
        <section className="relative mt-12 overflow-hidden bg-stone-200 pb-12 pt-24">
            <Image
                src="/images/landscape-bg-2.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-200/70" />

            <SectionContainer className="relative z-10 grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <p className="mt-4 text-lg leading-7 text-neutral-800">
                        {t("description")}
                    </p>

                    <div className="mt-6 space-y-4 pb-8">
                        {points.map((point) => (
                            <div key={point} className="flex items-center gap-4">
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-600" />

                                <p className="text-base text-neutral-950">
                                    {point}
                                </p>
                            </div>
                        ))}
                    </div>

                    <PrimaryLink href="/organization">
                        {t("cta")}
                    </PrimaryLink>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-6 pt-12">
                        <LeadershipImage image={images[0]} />
                        <LeadershipImage image={images[1]} />
                    </div>

                    <div className="space-y-6 pb-12">
                        <LeadershipImage image={images[2]} />
                        <LeadershipImage image={images[3]} />
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function LeadershipImage({
    image,
}: {
    image: {
        src: string;
        alt: string;
        className: string;
    };
}) {
    return (
        <div
            className={`relative overflow-hidden rounded-xl border-4 border-white bg-stone-300 shadow-lg ${image.className}`}
        >
            <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
            />
        </div>
    );
}

async function LatestNews() {
    const t = await getTranslations("Home.latestNews");
    const { newsItems, hasError } = await getLatestNews();

    return (
        <section className="bg-white py-12">
            <SectionContainer>
                <h2 className="text-center text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                    {t("title")}
                </h2>

                {hasError ? (
                    <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                        {t("errorMessage")}
                    </div>
                ) : null}

                {!hasError && newsItems.length === 0 ? (
                    <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-neutral-200 bg-stone-50 px-4 py-10 text-center">
                        <p className="text-base font-medium text-neutral-950">
                            {t("emptyTitle")}
                        </p>

                        <p className="mt-2 text-sm text-neutral-600">
                            {t("emptyDescription")}
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/news"
                                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                            >
                                {t("viewAll")}
                            </Link>
                        </div>
                    </div>
                ) : null}

                {!hasError && newsItems.length > 0 ? (
                    <LatestNewsClient
                        newsItems={newsItems}
                        labels={{
                            readMore: t("readMore"),
                            viewMore: t("viewMore"),
                            viewAll: t("viewAll"),
                            fallbackExcerpt: t("fallbackExcerpt"),
                        }}
                    />
                ) : null}
            </SectionContainer>
        </section>
    );
}

function CareerSection() {
    const t = useTranslations("Home.career");

    return (
        <section className="relative overflow-hidden bg-neutral-950 py-12 text-white">
            <Image
                src="/images/cta-bg.jpeg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-neutral-950/75" />

            <SectionContainer className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                    {t("title")}
                </h2>

                <p className="mt-4 max-w-2xl text-lg leading-7 text-neutral-300">
                    {t("description")}
                </p>

                <PrimaryLink
                    href="/career"
                    variant="orange"
                    className="mt-8 rounded-2xl px-12 py-5"
                >
                    {t("cta")}
                </PrimaryLink>
            </SectionContainer>
        </section>
    );
}
