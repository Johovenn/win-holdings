import Link from "next/link";
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
import { createClient } from "@/lib/supabase/server";
import LatestNewsClient from "../components/news/LatestNewsClient";

type Highlight = {
  title: string;
  description: string;
  icon: ReactNode;
};

type Subsidiary = {
  name: string;
  category: string;
  description: string;
  cta: string;
  icon: ReactNode;
};

type NewsItem = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    category: string | null;
    status: "draft" | "published";
    published_at: string | null;
    created_at: string;
};

const highlights: Highlight[] = [
  {
    title: "Diversified Portfolio",
    description:
      "Managing a robust range of industries to balance risk and maximize return across markets.",
    icon: <BriefcaseBusiness className="h-5 w-5" />,
  },
  {
    title: "Strategic Growth",
    description:
      "Leveraging market insights and capital efficiency to drive expansion in emerging sectors.",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "Operational Excellence",
    description:
      "Standardizing best practices across all subsidiaries to ensure peak efficiency and quality.",
    icon: <Award className="h-5 w-5" />,
  },
];

const subsidiaries: Subsidiary[] = [
  {
    name: "3C Paint",
    category: "Manufacturing",
    description:
      "Specializing in high-durability industrial coatings and innovative chemical solutions for the global market.",
    cta: "View Details",
    icon: <Factory className="h-10 w-10" />,
  },
  {
    name: "WLS",
    category: "Outsourcing",
    description:
      "Streamlining enterprise operations through professional talent and process management.",
    cta: "View Details",
    icon: <Users className="h-10 w-10" />,
  },
  {
    name: "Indosino",
    category: "Trading",
    description:
      "Bridging global markets with efficient supply chain logistics and commodity trading.",
    cta: "View Details",
    icon: <Repeat2 className="h-10 w-10" />,
  },
  {
    name: "ICG Construction",
    category: "Construction",
    description:
      "Defining city skylines through large-scale infrastructure projects and high-end residential developments.",
    cta: "Project Portfolio",
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
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      <SectionContainer className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-orange-600/10 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
            Holding Company
          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
            Building Sustainable Growth Across Multiple Industries
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-7 text-neutral-600">
            A diversified holding company managing businesses in manufacturing,
            outsourcing, trading, and construction with strategic precision.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <PrimaryLink href="/subsidiaries">Explore Our Business</PrimaryLink>

            <PrimaryLink href="/about" variant="outline">
              Learn About Us
            </PrimaryLink>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-orange-600/10 blur-3xl" />

            <div className="relative h-96 overflow-hidden rounded-2xl shadow-2xl">
                <Image
                    src="/images/hq-5.jpg"
                    alt="WIN Holdings business and industrial operations"
                    fill
                    priority
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
                  Years of Growth
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
                        About Our Company
                    </h2>

                    <p className="mt-4 text-lg leading-7 text-neutral-600">
                        We are a diversified holding company focused on creating long-term
                        value through strategic business management, operational excellence,
                        and sustainable growth across multiple sectors. Our commitment lies
                        in fostering innovation and stability.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {highlights.map((item) => (
                        <article
                            key={item.title}
                            className="rounded-xl border border-neutral-300/30 bg-white/85 p-6 shadow-sm backdrop-blur-sm"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-neutral-950 shadow-sm">
                                {item.icon}
                            </div>

                            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-950">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-base leading-6 text-neutral-600">
                                {item.description}
                            </p>
                        </article>
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function BusinessPortfolio() {
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
                        Our Business Portfolio
                    </h2>

                    <div className="mx-auto mt-2 h-1 w-20 bg-orange-600" />
                </div>

                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                    {subsidiaries.map((item) => (
                        <article
                            key={item.category}
                            className="rounded-2xl bg-neutral-950/95 p-6 text-white shadow-xl backdrop-blur-sm"
                        >
                            <div className="flex min-h-60 flex-col justify-between">
                                <div>
                                    <div className="mb-4 text-orange-600">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-2xl font-semibold tracking-tight text-white">
                                        {item.category}
                                    </h3>

                                    <p className="mt-3 max-w-xl text-base leading-6 text-neutral-300">
                                        {getPublicSubsidiaryDescription(item.category)}
                                    </p>
                                </div>

                                <div className="mt-4 border-t border-neutral-300/30 pt-4">
                                    <Link
                                        href="/subsidiaries"
                                        className="inline-flex items-center gap-2 text-base text-orange-600 transition-colors hover:text-orange-400"
                                    >
                                        Explore Business Unit
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

function getPublicSubsidiaryDescription(category: string) {
    const value = category.toLowerCase();

    if (value.includes("manufacture") || value.includes("manufacturing")) {
        return "A manufacturing business unit focused on supporting industrial and commercial product development with consistent quality and operational reliability.";
    }

    if (
        value.includes("trading") ||
        value.includes("supply") ||
        value.includes("industrial")
    ) {
        return "A trading and supply business unit providing reliable procurement, materials, and distribution support for industrial and project-based needs.";
    }

    if (
        value.includes("outsourcing") ||
        value.includes("hr") ||
        value.includes("human")
    ) {
        return "An outsourcing business unit delivering manpower, workforce support, and business process services for operational efficiency.";
    }

    if (
        value.includes("construction") ||
        value.includes("engineering") ||
        value.includes("infrastructure")
    ) {
        return "A construction and engineering business unit supporting project execution, infrastructure development, and industrial construction requirements.";
    }

    return "A strategic business unit operating under WIN Holdings to support diversified growth across selected industries.";
}

function OrganizationLeadership() {
    const points = [
        "Experienced Board of Directors",
        "Agile Organizational Structure",
        "Direct Accountability Models",
    ];

    const images = [
        {
            src: "/images/hq-4.jpg",
            alt: "WIN Holdings leadership meeting",
            className: "h-64",
        },
        {
            src: "/images/hq-2.jpg",
            alt: "WIN Holdings corporate discussion",
            className: "h-48",
        },
        {
            src: "/images/hq-1.jpg",
            alt: "WIN Holdings management collaboration",
            className: "h-48",
        },
        {
            src: "/images/hq-6.jpg",
            alt: "WIN Holdings executive leadership",
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
                        Organization & Leadership
                    </h2>

                    <p className="mt-4 text-lg leading-7 text-neutral-800">
                        Our leadership team brings decades of collective experience across
                        manufacturing, finance, and global logistics. We pride ourselves on a
                        governance structure that emphasizes transparency, agility, and
                        ethics.
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
                        View Organization Structure
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
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("news")
        .select("id, title, slug, excerpt, category, status, published_at, created_at")
        .eq("status", "published")
        .order("published_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(6);

    const newsItems = (data ?? []) as NewsItem[];

    return (
        <section className="bg-white py-12">
            <SectionContainer>
                <h2 className="text-center text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                    Latest News & Insights
                </h2>

                {error ? (
                    <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                        Failed to load latest news. Please check your Supabase
                        connection and policies.
                    </div>
                ) : null}

                {!error && newsItems.length === 0 ? (
                    <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-neutral-200 bg-stone-50 px-4 py-10 text-center">
                        <p className="text-base font-medium text-neutral-950">
                            No published news yet.
                        </p>

                        <p className="mt-2 text-sm text-neutral-600">
                            Latest company updates will appear here once published.
                        </p>

                        <div className="mt-8">
                            <Link
                                href="/news"
                                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                            >
                                View All News
                            </Link>
                        </div>
                    </div>
                ) : null}

                {!error && newsItems.length > 0 ? (
                    <LatestNewsClient newsItems={newsItems} />
                ) : null}
            </SectionContainer>
        </section>
    );
}

function CareerSection() {
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
                    Grow Your Career With Us
                </h2>

                <p className="mt-4 max-w-2xl text-lg leading-7 text-neutral-300">
                    Be part of a dynamic team driving change across multiple industries.
                    We offer a culture of continuous learning, professional growth, and
                    global opportunities.
                </p>

                <PrimaryLink
                    href="/career"
                    variant="orange"
                    className="mt-8 rounded-2xl px-12 py-5"
                >
                    Explore Career Opportunities
                </PrimaryLink>
            </SectionContainer>
        </section>
    );
}