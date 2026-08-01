import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";
import {
    BadgeCheck,
    Boxes,
    Building2,
    CheckCircle2,
    ClipboardList,
    Factory,
    Globe2,
    Hammer,
    Handshake,
    PackageCheck,
    ShieldCheck,
    ShoppingBag,
    Target,
    Truck,
    Utensils,
    Wrench,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type OverviewCard = {
    key: "established" | "sector" | "scope" | "role";
    icon: ReactNode;
};

type Product = {
    key:
        | "packaging"
        | "foodSupply"
        | "cement"
        | "cementClinker"
        | "gypsumBoard"
        | "ceramics"
        | "greaseLubricants"
        | "machineryParts";
    icon: ReactNode;
};

type FeatureDetail = {
    key: "foodSupply" | "packaging";
    image: string;
    reverse?: boolean;
};

type Capability = {
    key:
        | "procurement"
        | "industrialSupply"
        | "globalSourcing"
        | "packaging"
        | "distribution"
        | "foodSupply";
    icon: ReactNode;
};

type MaterialSupplyOrgNode = {
    title: string;
    variant?: "primary" | "secondary" | "division";
};

type MaterialSupplyDepartmentNode = {
    key: "sulawesi" | "maluku" | "finance" | "procurementLogistics";
    children: string[];
};

const materialSupplyDepartmentNodes: MaterialSupplyDepartmentNode[] = [
    {
        key: "sulawesi",
        children: ["sales", "procurement", "warehouse"],
    },
    {
        key: "maluku",
        children: ["sales", "procurement", "warehouse"],
    },
    {
        key: "finance",
        children: ["accounting"],
    },
    {
        key: "procurementLogistics",
        children: ["domesticInternationalProcurementLogistics"],
    },
];

const overviewCards: OverviewCard[] = [
    {
        key: "established",
        icon: <BadgeCheck className="h-6 w-6" />,
    },
    {
        key: "sector",
        icon: <Factory className="h-6 w-6" />,
    },
    {
        key: "scope",
        icon: <Globe2 className="h-6 w-6" />,
    },
    {
        key: "role",
        icon: <Handshake className="h-6 w-6" />,
    },
];

const products: Product[] = [
    {
        key: "packaging",
        icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
        key: "foodSupply",
        icon: <Utensils className="h-6 w-6" />,
    },
    {
        key: "cement",
        icon: <Building2 className="h-6 w-6" />,
    },
    {
        key: "cementClinker",
        icon: <Boxes className="h-6 w-6" />,
    },
    {
        key: "gypsumBoard",
        icon: <ClipboardList className="h-6 w-6" />,
    },
    {
        key: "ceramics",
        icon: <PackageCheck className="h-6 w-6" />,
    },
    {
        key: "greaseLubricants",
        icon: <Wrench className="h-6 w-6" />,
    },
    {
        key: "machineryParts",
        icon: <Hammer className="h-6 w-6" />,
    },
];

const featureDetails: FeatureDetail[] = [
    {
        key: "foodSupply",
        image: "/images/food-4.jpg",
    },
    {
        key: "packaging",
        image: "/images/packaging-1.jpg",
        reverse: true,
    },
];

const capabilities: Capability[] = [
    {
        key: "procurement",
        icon: <ClipboardList className="h-6 w-6" />,
    },
    {
        key: "industrialSupply",
        icon: <Factory className="h-6 w-6" />,
    },
    {
        key: "globalSourcing",
        icon: <Globe2 className="h-6 w-6" />,
    },
    {
        key: "packaging",
        icon: <PackageCheck className="h-6 w-6" />,
    },
    {
        key: "distribution",
        icon: <Truck className="h-6 w-6" />,
    },
    {
        key: "foodSupply",
        icon: <Utensils className="h-6 w-6" />,
    },
];

export default function WLSPage() {
    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <HeroSection />
            <CompanyOverviewSection />
            <VisionMissionSection />
            <ProductPortfolioSection />
            <FeaturedPortfolioSection />
            <IndustrialCapabilitySection />
            <MaterialSupplyOrganizationSection />
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
    const t = useTranslations("Trading.hero");

    return (
        <section className="relative overflow-hidden bg-stone-50 py-24 lg:py-32">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-100 grayscale"
                style={{
                    backgroundImage: "url('/images/subsidiaries-outsourcing.jpeg')",
                }}
            />

            <div className="absolute inset-0 bg-linear-to-r from-stone-50 via-stone-50/90 to-stone-50/30" />

            <SectionContainer className="relative">
                <div className="max-w-3xl">
                    <div className="inline-flex rounded-full bg-orange-600/10 px-4 py-2 text-sm font-medium uppercase tracking-wider text-orange-600">
                        {t("eyebrow")}
                    </div>

                    <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                        {t("title")}
                    </h1>

                    <p className="mt-5 text-2xl font-semibold leading-9 tracking-tight text-neutral-600">
                        {t("subtitle")}
                    </p>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
                        {t("description")}
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="inline-flex items-center gap-2 text-base font-medium italic text-orange-600">
                            <ShieldCheck className="h-5 w-5" />
                            {t("tagline")}
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function CompanyOverviewSection() {
    const t = useTranslations("Trading.companyOverview");

    return (
        <section className="bg-white py-16">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <div className="border-l-4 border-orange-600 pl-7">
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            {t("title")}
                        </h2>
                    </div>

                    <p className="mt-6 text-base leading-7 text-neutral-600">
                        {t("paragraph1")}
                    </p>

                    <p className="mt-5 text-base leading-7 text-neutral-600">
                        {t("paragraph2")}
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {overviewCards.map((item) => (
                        <OverviewCard key={item.key} item={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function OverviewCard({ item }: { item: OverviewCard }) {
    const t = useTranslations("Trading.overviewCards");

    return (
        <article className="rounded-xl border border-neutral-300/40 bg-stone-100 p-6">
            <div className="text-orange-600">{item.icon}</div>

            <p className="mt-4 text-base font-medium text-neutral-950">
                {t(`${item.key}.label`)}
            </p>

            <p className="mt-1 text-base text-neutral-700">
                {t(`${item.key}.value`)}
            </p>
        </article>
    );
}

function VisionMissionSection() {
    const t = useTranslations("Trading.visionMission");

    return (
        <section className="relative overflow-hidden bg-stone-100 py-16">
            <Image
                src="/images/packaging-2.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
            />

            <div className="absolute inset-0 bg-stone-100/60" />

            <SectionContainer className="relative z-10 grid gap-6 lg:grid-cols-2">
                <article className="rounded-2xl border border-neutral-300 bg-white/85 p-8 shadow-sm backdrop-blur-md lg:p-12">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600 text-white">
                        <BadgeCheck className="h-6 w-6" />
                    </div>

                    <h2 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950">
                        {t("visionTitle")}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-neutral-600">
                        {t("visionText")}
                    </p>
                </article>

                <article className="rounded-2xl border border-neutral-300 bg-white/85 p-8 shadow-sm backdrop-blur-md lg:p-12">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600 text-white">
                        <TargetIcon />
                    </div>

                    <h2 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950">
                        {t("missionTitle")}
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-neutral-600">
                        {t("missionText")}
                    </p>
                </article>
            </SectionContainer>
        </section>
    );
}

function ProductPortfolioSection() {
    const t = useTranslations("Trading.products");

    return (
        <section id="product-portfolio" className="bg-white py-16">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <div className="mx-auto mt-3 h-1 w-20 bg-orange-600" />
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.key} product={product} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function ProductCard({ product }: { product: Product }) {
    const t = useTranslations("Trading.products.items");

    return (
        <article className="rounded-xl border border-neutral-300 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="text-orange-600">{product.icon}</div>

            <h3 className="mt-5 text-base font-medium leading-6 text-neutral-950">
                {t(`${product.key}.title`)}
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
                {t(`${product.key}.description`)}
            </p>
        </article>
    );
}

function FeaturedPortfolioSection() {
    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <div className="space-y-8 lg:space-y-20">
                    {featureDetails.map((item) => (
                        <FeatureDetailSection key={item.key} item={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function FeatureDetailSection({ item }: { item: FeatureDetail }) {
    const t = useTranslations("Trading.featureDetails.items");

    const imageOrder = item.reverse
        ? "order-1 lg:order-2"
        : "order-1 lg:order-1";

    const contentOrder = item.reverse
        ? "order-2 lg:order-1"
        : "order-2 lg:order-2";

    const useCases = t.raw(`${item.key}.useCases`) as string[];

    return (
        <section className="grid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:grid-cols-2 lg:items-center lg:gap-12 lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none">
            <div className={imageOrder}>
                <div className="relative h-72 overflow-hidden bg-stone-300 md:h-80 lg:rounded-2xl lg:shadow-lg">
                    <Image
                        src={item.image}
                        alt={t(`${item.key}.imageAlt`)}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </div>

            <div className={`${contentOrder} p-6 lg:p-0`}>
                <h2 className="text-2xl font-semibold leading-9 tracking-tight text-neutral-950 md:text-3xl md:leading-10">
                    {t(`${item.key}.title`)}
                </h2>

                <p className="mt-4 text-base leading-7 text-neutral-600 md:mt-5">
                    {t(`${item.key}.description`)}
                </p>

                <ul className="mt-6 space-y-3">
                    {useCases.map((useCase) => (
                        <li key={useCase} className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-orange-600" />

                            <span className="text-base text-neutral-950">
                                {useCase}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function IndustrialCapabilitySection() {
    const t = useTranslations("Trading.capabilities");

    return (
        <section
            className="relative bg-cover bg-center bg-no-repeat py-20 text-white"
            style={{
                backgroundImage: "url('/images/warehouse-1.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-neutral-900/90" />

            <div className="relative z-10">
                <SectionContainer>
                    <div className="max-w-3xl">
                        <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                            {t("title")}
                        </h2>

                        <p className="mt-5 text-base leading-7 text-white/70">
                            {t("description")}
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {capabilities.map((capability) => (
                            <CapabilityCard
                                key={capability.key}
                                capability={capability}
                            />
                        ))}
                    </div>
                </SectionContainer>
            </div>
        </section>
    );
}

function CapabilityCard({ capability }: { capability: Capability }) {
    const t = useTranslations("Trading.capabilities.items");

    return (
        <article className="rounded-xl border border-white/10 bg-black/70 p-6">
            <div className="text-orange-500">{capability.icon}</div>

            <h3 className="mt-5 text-lg font-medium text-white">
                {t(`${capability.key}.title`)}
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/70">
                {t(`${capability.key}.description`)}
            </p>
        </article>
    );
}

function MaterialSupplyOrganizationSection() {
    const t = useTranslations("Trading.organization");

    return (
        <section className="bg-white py-16">
            <SectionContainer>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-widest text-orange-600">
                        {t("eyebrow")}
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <p className="mt-4 text-base leading-7 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-14">
                    <MobileMaterialSupplyOrganizationChart />
                    <DesktopMaterialSupplyOrganizationChart />
                </div>
            </SectionContainer>
        </section>
    );
}

function MobileMaterialSupplyOrganizationChart() {
    const t = useTranslations("Trading.organization");

    return (
        <div className="space-y-6 lg:hidden">
            <div className="rounded-2xl border border-neutral-200 bg-stone-50 p-5 shadow-sm">
                <div className="flex justify-center">
                    <MaterialSupplyOrgCard
                        title={t("materialSupply")}
                        variant="primary"
                    />
                </div>

                <MaterialSupplyConnectorLine className="mx-auto h-8" />

                <div className="flex justify-center">
                    <MaterialSupplyOrgCard
                        title={t("viceCeo")}
                        variant="secondary"
                    />
                </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                    {t("departmentsLabel")}
                </p>

                <div className="mt-4 grid gap-4">
                    {materialSupplyDepartmentNodes.map((department) => (
                        <MaterialSupplyMobileDepartmentCard
                            key={department.key}
                            department={department}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

function DesktopMaterialSupplyOrganizationChart() {
    const t = useTranslations("Trading.organization");

    return (
        <div className="hidden overflow-x-auto rounded-2xl border border-neutral-200 bg-stone-50 p-6 shadow-sm lg:block">
            <div className="min-w-200">
                <div className="flex justify-center">
                    <MaterialSupplyOrgCard
                        title={t("materialSupply")}
                        variant="primary"
                    />
                </div>

                <MaterialSupplyConnectorLine className="mx-auto h-10" />

                <div className="flex justify-center">
                    <MaterialSupplyOrgCard
                        title={t("viceCeo")}
                        variant="secondary"
                    />
                </div>

                <MaterialSupplyConnectorLine className="mx-auto h-10" />

                <div className="relative">
                    <div className="absolute left-1/2 top-0 h-px w-11/12 -translate-x-1/2 bg-neutral-300" />

                    <div className="grid grid-cols-4 gap-6 pt-6">
                        {materialSupplyDepartmentNodes.map((department) => (
                            <div key={department.key} className="relative">
                                <div className="absolute -top-6 left-1/2 h-6 w-px -translate-x-1/2 bg-neutral-300" />

                                <MaterialSupplyDepartmentCard
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

function MaterialSupplyDepartmentCard({
    department,
}: {
    department: MaterialSupplyDepartmentNode;
}) {
    const t = useTranslations("Trading.organization.departments");

    return (
        <article className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <MaterialSupplyOrgCard
                title={t(`${department.key}.title`)}
                variant="division"
            />

            <MaterialSupplyConnectorLine className="mx-auto h-6" />

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

function MaterialSupplyMobileDepartmentCard({
    department,
}: {
    department: MaterialSupplyDepartmentNode;
}) {
    const t = useTranslations("Trading.organization.departments");

    return (
        <article className="rounded-xl border border-neutral-200 bg-stone-50 p-4">
            <h3 className="text-sm font-bold leading-5 text-neutral-950">
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

function MaterialSupplyOrgCard({
    title,
    variant = "division",
}: MaterialSupplyOrgNode) {
    const variants = {
        primary:
            "border-orange-600 bg-orange-600 text-white shadow-lg shadow-orange-600/20",
        secondary:
            "border-neutral-200 bg-white text-neutral-950 shadow-sm",
        division:
            "border-orange-100 bg-orange-50 text-neutral-950 shadow-sm",
    };

    return (
        <div
            className={`flex min-h-16 w-full min-w-44 max-w-72 items-center justify-center rounded-xl border px-5 py-4 text-center ${variants[variant]}`}
        >
            <p className="text-sm font-bold leading-5">{title}</p>
        </div>
    );
}

function MaterialSupplyConnectorLine({
    className = "",
}: {
    className?: string;
}) {
    return <div className={`w-px bg-neutral-300 ${className}`} />;
}

function CTASection() {
    const t = useTranslations("Trading.cta");

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

function TargetIcon() {
    return <Target className="h-6 w-6" />;
}