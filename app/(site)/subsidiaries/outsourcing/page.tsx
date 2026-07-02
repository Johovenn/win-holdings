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
import ButtonLink from "@/app/components/ui/ButtonLink";

type OverviewCard = {
    label: string;
    value: string;
    icon: ReactNode;
};

type Product = {
    title: string;
    description: string;
    icon: ReactNode;
};

type FeatureDetail = {
    title: string;
    description: string;
    useCases: string[];
    image: string;
    imageAlt: string;
    reverse?: boolean;
};

type Capability = {
    title: string;
    description: string;
    icon: ReactNode;
};

const overviewCards: OverviewCard[] = [
    {
        label: "Established",
        value: "2019",
        icon: <BadgeCheck className="h-6 w-6" />,
    },
    {
        label: "Sector",
        value: "Industrial Supply",
        icon: <Factory className="h-6 w-6" />,
    },
    {
        label: "Scope",
        value: "Domestic & Global",
        icon: <Globe2 className="h-6 w-6" />,
    },
    {
        label: "Role",
        value: "Reliable Partner",
        icon: <Handshake className="h-6 w-6" />,
    },
];

const products: Product[] = [
    {
        title: "Cement",
        description:
            "Premium OPC and PCC cement for structural, masonry, plastering, and wall applications.",
        icon: <Building2 className="h-6 w-6" />,
    },
    {
        title: "Cement Clinker",
        description:
            "Bulk clinker supply sourced from major manufacturers across Indonesia and Asia.",
        icon: <Boxes className="h-6 w-6" />,
    },
    {
        title: "Gypsum Board",
        description:
            "Standard, moisture resistant, fire resistant, and aluminium foil laminated gypsum boards.",
        icon: <ClipboardList className="h-6 w-6" />,
    },
    {
        title: "Ceramics",
        description:
            "Floor tiles, wall tiles, granite tiles, roof tiles, and vinyl tiles for construction needs.",
        icon: <PackageCheck className="h-6 w-6" />,
    },
    {
        title: "Grease & Lubricants",
        description:
            "Industrial-grade SINOPEC grease and lubricants for machinery and vehicles.",
        icon: <Wrench className="h-6 w-6" />,
    },
    {
        title: "Machinery & Parts",
        description:
            "Pumps, welding machines, forklifts, compressors, electrical equipment, and spare parts.",
        icon: <Hammer className="h-6 w-6" />,
    },
    {
        title: "Packaging",
        description:
            "Paper bags and woven bags for cement, putty powder, tile adhesive, and dry mortar.",
        icon: <ShoppingBag className="h-6 w-6" />,
    },
    {
        title: "Food Supply",
        description:
            "Vegetables, meat, fruits, and seasonings for construction sites and industrial parks.",
        icon: <Utensils className="h-6 w-6" />,
    },
];

const featureDetails: FeatureDetail[] = [
    {
        title: "Cement & Clinker",
        description:
            "WLS supplies premium cement and cement clinker for infrastructure, batching plants, high-rise buildings, and industrial manufacturing. The company supports both domestic and international procurement needs.",
        useCases: [
            "Infrastructure Development",
            "High-Rise Construction",
            "Industrial Manufacturing",
        ],
        image: "/images/wls-cement-clinker.jpg",
        imageAlt: "Cement and clinker supply",
    },
    {
        title: "Gypsum & Ceramics",
        description:
            "WLS supports residential and commercial construction with gypsum board, ceiling systems, and ceramic products for modern building applications, interior finishing, and architectural development.",
        useCases: [
            "Commercial Interior Fit-outs",
            "Residential Housing Projects",
            "Hospitality Developments",
        ],
        image: "/images/wls-gypsum-ceramics.jpg",
        imageAlt: "Gypsum board and ceramic materials",
        reverse: true,
    },
];

const capabilities: Capability[] = [
    {
        title: "Procurement",
        description:
            "Strategic sourcing and negotiation to ensure competitive pricing and quality.",
        icon: <ClipboardList className="h-6 w-6" />,
    },
    {
        title: "Industrial Supply",
        description:
            "Direct supply of raw materials and industrial products for heavy operations.",
        icon: <Factory className="h-6 w-6" />,
    },
    {
        title: "Global Sourcing",
        description:
            "Specialized sourcing from domestic and international supply networks.",
        icon: <Globe2 className="h-6 w-6" />,
    },
    {
        title: "Packaging",
        description:
            "Industrial packaging solutions for cement, dry mortar, and bulk commodities.",
        icon: <PackageCheck className="h-6 w-6" />,
    },
    {
        title: "Distribution",
        description:
            "Logistics support for domestic and international material distribution.",
        icon: <Truck className="h-6 w-6" />,
    },
    {
        title: "Food Supply",
        description:
            "Reliable food supply for workers at remote construction and industrial sites.",
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

function HeroSection() {
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
                        Subsidiary Company
                    </div>

                    <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                        PT. WLS Trust International
                    </h1>

                    <p className="mt-5 text-2xl font-semibold leading-9 tracking-tight text-neutral-600">
                        Construction and industrial materials supplier for
                        project-based operations.
                    </p>

                    <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
                        Established in 2019, PT. WLS Trust International supplies
                        premium construction materials, industrial products, machinery,
                        packaging, and food supply solutions for domestic and
                        international customers.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="inline-flex items-center gap-2 text-base font-medium italic text-orange-600">
                            <ShieldCheck className="h-5 w-5" />
                            “Your Trust is Our Priority”
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function CompanyOverviewSection() {
    return (
        <section className="bg-white py-16">
            <SectionContainer className="grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <div className="border-l-4 border-orange-600 pl-7">
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            Company Overview
                        </h2>
                    </div>

                    <p className="mt-6 text-base leading-7 text-neutral-600">
                        PT. WLS Trust International stands as a reliable partner in the
                        industrial supply chain. The company specializes in supplying
                        construction materials and industrial needs for concrete
                        batching plants, property development projects, infrastructure
                        projects, industrial plants, and project-site operations.
                    </p>

                    <p className="mt-5 text-base leading-7 text-neutral-600">
                        Through procurement capability, quality control, and logistics
                        support, WLS helps project-based customers secure the materials
                        and supplies they need according to required quality standards
                        and schedules.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {overviewCards.map((item) => (
                        <OverviewCard key={item.label} item={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function OverviewCard({ item }: { item: OverviewCard }) {
    return (
        <article className="rounded-xl border border-neutral-300/40 bg-stone-100 p-6">
            <div className="text-orange-600">
                {item.icon}
            </div>

            <p className="mt-4 text-base font-medium text-neutral-950">
                {item.label}
            </p>

            <p className="mt-1 text-base text-neutral-700">
                {item.value}
            </p>
        </article>
    );
}

function VisionMissionSection() {
    return (
        <section className="bg-stone-100 py-16">
            <SectionContainer className="grid gap-6 lg:grid-cols-2">
                <article className="rounded-2xl border border-neutral-300 bg-white/80 p-8 shadow-sm backdrop-blur-md lg:p-12">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600 text-white">
                        <BadgeCheck className="h-6 w-6" />
                    </div>

                    <h2 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950">
                        Our Vision
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-neutral-600">
                        To develop and uphold our reputation in becoming the leading
                        construction and industrial materials supplier in Indonesia’s
                        construction, property, and industrial sector.
                    </p>
                </article>

                <article className="rounded-2xl border border-neutral-300 bg-white/80 p-8 shadow-sm backdrop-blur-md lg:p-12">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600 text-white">
                        <TargetIcon />
                    </div>

                    <h2 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-950">
                        Our Mission
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-neutral-600">
                        To fulfil our customers’ procurement needs by providing our
                        best service in accordance with the required quality standard
                        and schedule.
                    </p>
                </article>
            </SectionContainer>
        </section>
    );
}

function ProductPortfolioSection() {
    return (
        <section id="product-portfolio" className="bg-white py-16">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        Comprehensive Product Portfolio
                    </h2>

                    <div className="mx-auto mt-3 h-1 w-20 bg-orange-600" />
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.title} product={product} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function ProductCard({ product }: { product: Product }) {
    return (
        <article className="rounded-xl border border-neutral-300 bg-white p-6 transition-shadow hover:shadow-md">
            <div className="text-orange-600">
                {product.icon}
            </div>

            <h3 className="mt-5 text-base font-medium leading-6 text-neutral-950">
                {product.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
                {product.description}
            </p>
        </article>
    );
}

function FeaturedPortfolioSection() {
    return (
        <section className="bg-stone-50 py-16">
            <SectionContainer>
                <div className="space-y-20">
                    {featureDetails.map((item) => (
                        <FeatureDetailSection key={item.title} item={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function FeatureDetailSection({ item }: { item: FeatureDetail }) {
    const image = (
        <div className="overflow-hidden rounded-2xl bg-stone-300 shadow-lg">
            <div
                className="h-80 bg-cover bg-center"
                style={{
                    backgroundImage: `url('${item.image}')`,
                }}
                aria-label={item.imageAlt}
            />
        </div>
    );

    const content = (
        <div>
            <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                {item.title}
            </h2>

            <p className="mt-5 text-base leading-7 text-neutral-600">
                {item.description}
            </p>

            <ul className="mt-6 space-y-3">
                {item.useCases.map((useCase) => (
                    <li key={useCase} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-orange-600" />
                        <span className="text-base text-neutral-950">
                            {useCase}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <section className="grid items-center gap-12 lg:grid-cols-2">
            {item.reverse ? image : content}
            {item.reverse ? content : image}
        </section>
    );
}

function IndustrialCapabilitySection() {
    return (
        <section className="bg-neutral-800 py-20 text-white">
            <SectionContainer>
                <div className="max-w-3xl">
                    <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                        Core Industrial Capabilities
                    </h2>

                    <p className="mt-5 text-base leading-7 text-white/70">
                        WLS bridges global manufacturers and local project demands
                        through procurement expertise, supply coordination, and
                        transparent logistics execution.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((capability) => (
                        <CapabilityCard
                            key={capability.title}
                            capability={capability}
                        />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function CapabilityCard({ capability }: { capability: Capability }) {
    return (
        <article className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="text-orange-500">
                {capability.icon}
            </div>

            <h3 className="mt-5 text-lg font-medium text-white">
                {capability.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/70">
                {capability.description}
            </p>
        </article>
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
                    Source Reliable Construction and Industrial Materials with WLS
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-7 text-stone-50/80">
                    Connect with our procurement specialists to discuss your next
                    project&apost;s material, machinery, packaging, or site-supply
                    requirements.
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

function TargetIcon() {
    return (
        <Target className="h-6 w-6" />
    );
}