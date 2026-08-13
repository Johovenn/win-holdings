import { Link } from "@/i18n/routing";
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
import { useTranslations } from "next-intl";
import SectionContainer from "@/app/components/ui/Container";

type Subsidiary = {
    key: "manufacture" | "trading" | "outsourcing" | "construction";
    websiteUrl: string;
    icon: ReactNode;
    imageSide: "left" | "right";
    imageSrc: string;
};

type SynergyCard = {
    key: "strategicDirection" | "operationalCoordination" | "sustainableGrowth";
    icon: ReactNode;
};

const subsidiaries: Subsidiary[] = [
    {
        key: "manufacture",
        websiteUrl: "https://3c-paint.vercel.app/",
        icon: <Factory className="h-6 w-6" />,
        imageSide: "right",
        imageSrc: "/images/subsidiaries-manufacture.jpg",
    },
    {
        key: "trading",
        websiteUrl: "/subsidiaries/trading",
        icon: <Truck className="h-6 w-6" />,
        imageSide: "left",
        imageSrc: "/images/warehouse-1.jpg",
    },
    {
        key: "outsourcing",
        websiteUrl: "/subsidiaries/outsourcing",
        icon: <Users className="h-6 w-6" />,
        imageSide: "right",
        imageSrc: "/images/manpower-8.jpg",
    },
    {
        key: "construction",
        websiteUrl: "/subsidiaries/construction",
        icon: <Hammer className="h-6 w-6" />,
        imageSide: "left",
        imageSrc: "/images/subsidiaries-construction.jpeg",
    },
];

const synergyCards: SynergyCard[] = [
    {
        key: "strategicDirection",
        icon: <Target className="h-6 w-6" />,
    },
    {
        key: "operationalCoordination",
        icon: <Network className="h-6 w-6" />,
    },
    {
        key: "sustainableGrowth",
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

function PortfolioOverviewSection() {
    const t = useTranslations("Subsidiaries.portfolioOverview");

    return (
        <section className="relative overflow-hidden bg-stone-100 py-12">
            <Image
                src="/images/subsidiary-1.png"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-100/85" />

            <SectionContainer className="relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h1>

                    <p className="mt-4 text-base leading-6 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {subsidiaries.map((item) => (
                        <PortfolioCard key={item.key} subsidiary={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function PortfolioCard({ subsidiary }: { subsidiary: Subsidiary }) {
    const t = useTranslations("Subsidiaries.items");

    return (
        <article className="rounded-xl border border-neutral-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="text-orange-600">{subsidiary.icon}</div>

            <h2 className="mt-2 text-2xl font-semibold leading-8 tracking-tight text-neutral-950">
                {t(`${subsidiary.key}.industry`)}
            </h2>

            <p className="mt-2 text-sm leading-5 text-neutral-600">
                {t(`${subsidiary.key}.shortDescription`)}
            </p>
        </article>
    );
}

function SubsidiarySections() {
    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <div className="space-y-8 lg:space-y-32">
                    {subsidiaries.map((subsidiary) => (
                        <SubsidiaryDetailSection
                            key={subsidiary.key}
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
    const t = useTranslations("Subsidiaries.items");
    const imageFirst = subsidiary.imageSide === "left";
    const isExternalLink = subsidiary.websiteUrl.startsWith("http");

    return (
        <article className="grid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:grid-cols-2 lg:items-center lg:gap-12 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none">
            <div
                className={
                    imageFirst
                        ? "order-1 lg:order-1"
                        : "order-1 lg:order-2"
                }
            >
                <SubsidiaryImage subsidiary={subsidiary} />
            </div>

            <div
                className={
                    imageFirst
                        ? "order-2 p-6 lg:order-2 lg:p-0 lg:pl-6"
                        : "order-2 p-6 lg:order-1 lg:p-0 lg:pr-6"
                }
            >
                <h2 className="text-2xl font-semibold leading-9 tracking-tight text-neutral-950 md:text-3xl md:leading-10">
                    {t(`${subsidiary.key}.industry`)}
                </h2>

                <p className="mt-4 text-base leading-7 text-neutral-600 md:mt-6 md:text-lg md:leading-8">
                    {t(`${subsidiary.key}.description`)}
                </p>

                <Link
                    href={subsidiary.websiteUrl}
                    target={isExternalLink ? "_blank" : undefined}
                    rel={isExternalLink ? "noreferrer" : undefined}
                    className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-orange-600 transition-colors hover:text-orange-700 md:mt-8"
                >
                    {t(`${subsidiary.key}.websiteLabel`)}
                    <ArrowUpRight className="h-4 w-4" />
                </Link>
            </div>
        </article>
    );
}

function SubsidiaryImage({
    subsidiary,
}: {
    subsidiary: Subsidiary;
}) {
    const t = useTranslations("Subsidiaries.items");

    return (
        <div className="relative h-64 overflow-hidden bg-stone-200 md:h-80 lg:h-96 lg:rounded-xl lg:border lg:border-neutral-300 lg:shadow-sm">
            <Image
                src={subsidiary.imageSrc}
                alt={t(`${subsidiary.key}.imageAlt`)}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
            />

            <div className="absolute inset-0 bg-neutral-950/10" />
        </div>
    );
}

function GroupSynergySection() {
    const t = useTranslations("Subsidiaries.groupSynergy");

    return (
        <section className="bg-stone-100 py-16">
            <SectionContainer>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                        {t("eyebrow")}
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold leading-10 tracking-tight text-neutral-950 md:text-4xl">
                        {t("title")}
                    </h2>

                    <p className="mt-4 text-base leading-7 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {synergyCards.map((card) => (
                        <article
                            key={card.key}
                            className="rounded-2xl border border-neutral-300 bg-white p-6 shadow-sm"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                                {card.icon}
                            </div>

                            <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950">
                                {t(`cards.${card.key}.title`)}
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-neutral-600">
                                {t(`cards.${card.key}.description`)}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function CTASection() {
    const t = useTranslations("Subsidiaries.cta");

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
