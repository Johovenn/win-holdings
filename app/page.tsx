import Link from "next/link";

type Highlight = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type Subsidiary = {
  name: string;
  category: string;
  description: string;
  cta: string;
  icon: React.ReactNode;
};

type Activity = {
  title: string;
  description: string;
};

type NewsItem = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Subsidiaries", href: "/subsidiaries" },
  { label: "Org Structure", href: "/organization" },
  { label: "News", href: "/news" },
  { label: "Career", href: "/career" },
];

const highlights: Highlight[] = [
  {
    title: "Diversified Portfolio",
    description:
      "Managing a robust range of industries to balance risk and maximize return across markets.",
    icon: <PortfolioIcon />,
  },
  {
    title: "Strategic Growth",
    description:
      "Leveraging market insights and capital efficiency to drive expansion in emerging sectors.",
    icon: <GrowthIcon />,
  },
  {
    title: "Operational Excellence",
    description:
      "Standardizing best practices across all subsidiaries to ensure peak efficiency and quality.",
    icon: <ExcellenceIcon />,
  },
];

const subsidiaries: Subsidiary[] = [
  {
    name: "3C Paint",
    category: "Manufacturing",
    description:
      "Specializing in high-durability industrial coatings and innovative chemical solutions for the global market.",
    cta: "View Details",
    icon: <FactoryIcon />,
  },
  {
    name: "WLS",
    category: "Outsourcing",
    description:
      "Streamlining enterprise operations through professional talent and process management.",
    cta: "View Details",
    icon: <PeopleIcon />,
  },
  {
    name: "Indosino",
    category: "Trading",
    description:
      "Bridging global markets with efficient supply chain logistics and commodity trading.",
    cta: "View Details",
    icon: <TradeIcon />,
  },
  {
    name: "ICG Construction",
    category: "Construction",
    description:
      "Defining city skylines through large-scale infrastructure projects and high-end residential developments.",
    cta: "Project Portfolio",
    icon: <ConstructionIcon />,
  },
];

const activities: Activity[] = [
  {
    title: "Corporate Events",
    description:
      "Building synergy through regular stakeholder summits and internal leadership workshops.",
  },
  {
    title: "Business Development",
    description:
      "Exploring new horizons and integrating strategic acquisitions into our ecosystem.",
  },
  {
    title: "Social & Community",
    description:
      "Giving back through structured CSR programs and environmental sustainability initiatives.",
  },
];

const newsItems: NewsItem[] = [
  {
    category: "Industry",
    date: "October 24, 2024",
    title: "WIN Holdings Expands Manufacturing Capacity for 3C Paint",
    excerpt:
      "Announcing the groundbreaking of our new 5,000 sqm production facility designed to meet rising global demand.",
  },
  {
    category: "Community",
    date: "October 12, 2024",
    title: "2024 Annual Sustainability Report Released",
    excerpt:
      "Detailing our progress toward zero-net emissions across all subsidiaries and our increased investment in local training.",
  },
  {
    category: "Corporate",
    date: "September 30, 2024",
    title: "Strategic Partnership with Global Logistics Leader",
    excerpt:
      "WIN Holdings enters a long-term agreement with international partners to optimize supply chain performance.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-[#1c1b1b]">
      <Header />
      <HeroSection />
      <CompanyOverview />
      <BusinessPortfolio />
      <OrganizationLeadership />
      <LatestNews />
      <CareerSection />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#c4c7c8] bg-[#fcf8f8]/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 lg:px-16">
        <Link href="/" className="text-2xl font-extrabold tracking-[-0.6px]">
          WIN <span className="text-[#ea580c]">Holdings</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.label === "Home";

            return (
              <Link
                key={link.label}
                href={link.href}
                className={[
                  "text-base transition-colors hover:text-[#ea580c]",
                  isActive
                    ? "border-b-2 border-[#ea580c] pb-1.5 text-[#ea580c]"
                    : "text-[#444748]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-lg bg-[#ea580c] px-6 py-2 text-base text-white shadow-[0px_10px_15px_-3px_rgba(234,88,12,0.2),0px_4px_6px_-4px_rgba(234,88,12,0.2)] transition-colors hover:bg-[#c2410c] lg:inline-flex"
        >
          Contact Us
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#c4c7c8] lg:hidden"
          aria-label="Open navigation menu"
        >
          <span className="relative h-0.5 w-5 bg-[#1c1b1b] before:absolute before:-top-1.5 before:left-0 before:h-0.5 before:w-5 before:bg-[#1c1b1b] before:content-[''] after:absolute after:left-0 after:top-1.5 after:h-0.5 after:w-5 after:bg-[#1c1b1b] after:content-['']" />
        </button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 lg:grid-cols-2 lg:px-16">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-[#ea580c]/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.6px] text-[#ea580c]">
            Holding Company
          </div>

          <h1 className="max-w-[620px] text-4xl font-bold leading-tight tracking-[-0.96px] text-[#1c1b1b] md:text-5xl md:leading-[60px]">
            Building Sustainable Growth Across Multiple Industries
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-7 text-[#444748]">
            A diversified holding company managing businesses in manufacturing,
            outsourcing, trading, and construction with strategic precision.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/subsidiaries"
              className="inline-flex items-center justify-center rounded-xl bg-[#1c1b1b] px-8 py-4 text-base text-white shadow-[0px_20px_25px_-5px_rgba(28,27,27,0.1),0px_8px_10px_-6px_rgba(28,27,27,0.1)] transition-colors hover:bg-black"
            >
              Explore Our Business
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-[#c4c7c8] bg-white px-8 py-4 text-base text-[#1c1b1b] transition-colors hover:border-[#ea580c] hover:text-[#ea580c]"
            >
              Learn About Us
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#ea580c]/10 blur-3xl" />

          <div className="relative h-[360px] overflow-hidden rounded-2xl bg-[#ddd9d9] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] md:h-[500px]" />

          <div className="absolute -bottom-6 left-4 rounded-xl border border-[#e5e7e9]/50 bg-white/80 p-6 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] backdrop-blur-md md:-left-6">
            <div className="flex items-center gap-4">
              <div className="flex h-[42px] w-11 items-center justify-center rounded-lg bg-[#ea580c]">
                <TrendingIcon />
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-[-0.24px] text-[#1c1b1b]">
                  15+
                </p>
                <p className="text-xs font-semibold text-[#444748]">
                  Years of Growth
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyOverview() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold leading-[38px] tracking-[-0.3px] text-[#1c1b1b]">
            About Our Company
          </h2>
          <p className="mt-4 text-lg leading-7 text-[#444748]">
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
              className="rounded-xl border border-[#c4c7c8]/30 bg-[#f6f3f2] p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
                {item.icon}
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.24px] text-[#1c1b1b]">
                {item.title}
              </h3>

              <p className="mt-2 text-base leading-6 text-[#444748]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessPortfolio() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-16">
        <div className="text-center">
          <h2 className="text-3xl font-semibold leading-[38px] tracking-[-0.3px] text-[#1c1b1b]">
            Our Business Portfolio
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-[#ea580c]" />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {subsidiaries.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl bg-[#1c1b1b] p-6 text-white"
            >
              <div className="flex min-h-[235px] flex-col justify-between">
                <div>
                  <div className="mb-4 text-[#ea580c]">{item.icon}</div>

                  <p className="text-base uppercase tracking-[1.6px] text-[#ea580c]">
                    {item.category}
                  </p>

                  <h3 className="mt-1 text-2xl font-semibold tracking-[-0.24px] text-white">
                    {item.name}
                  </h3>

                  <p className="mt-2 max-w-xl text-base leading-6 text-[#c6c6c7]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 border-t border-[#c4c7c8]/30 pt-4">
                  <Link
                    href="/subsidiaries"
                    className="inline-flex items-center gap-2 text-base text-[#ea580c] transition-colors hover:text-orange-400"
                  >
                    {item.cta}
                    <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function OrganizationLeadership() {
  const points = [
    "Experienced Board of Directors",
    "Agile Organizational Structure",
    "Direct Accountability Models",
  ];

  return (
    <section className="mt-12 overflow-hidden bg-[#ebe7e7] pb-12 pt-24">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-6 lg:grid-cols-2 lg:px-16">
        <div>
          <h2 className="text-3xl font-semibold leading-[38px] tracking-[-0.3px] text-[#1c1b1b]">
            Organization & Leadership
          </h2>

          <p className="mt-4 text-lg leading-7 text-[#444748]">
            Our leadership team brings decades of collective experience across
            manufacturing, finance, and global logistics. We pride ourselves on a
            governance structure that emphasizes transparency, agility, and
            ethics.
          </p>

          <div className="mt-6 space-y-4 pb-8">
            {points.map((point) => (
              <div key={point} className="flex items-center gap-4">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" />
                <p className="text-base text-[#1c1b1b]">{point}</p>
              </div>
            ))}
          </div>

          <Link
            href="/organization"
            className="inline-flex items-center justify-center rounded-xl bg-[#1c1b1b] px-12 py-4 text-base text-white transition-colors hover:bg-black"
          >
            View Organization Structure
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-6 pt-12">
            <div className="h-64 rounded-2xl border-4 border-white bg-[#ddd9d9] shadow-lg" />
            <div className="h-48 rounded-2xl border-4 border-white bg-[#ddd9d9] shadow-lg" />
          </div>

          <div className="space-y-6 pb-12">
            <div className="h-48 rounded-2xl border-4 border-white bg-[#ddd9d9] shadow-lg" />
            <div className="h-64 rounded-2xl border-4 border-white bg-[#ddd9d9] shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LatestNews() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-16">
        <h2 className="text-center text-3xl font-semibold leading-[38px] tracking-[-0.3px] text-[#1c1b1b]">
          Latest News & Insights
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.title}>
              <div className="relative h-[207px] overflow-hidden rounded-2xl bg-[#ddd9d9]">
                <span className="absolute left-4 top-4 rounded bg-[#ea580c] px-3 py-1 text-xs font-semibold uppercase leading-4 text-white">
                  {item.category}
                </span>
              </div>

              <time className="mt-4 block text-sm font-medium tracking-[0.14px] text-[#444748]">
                {item.date}
              </time>

              <h3 className="mt-1 text-2xl font-semibold leading-8 tracking-[-0.24px] text-[#1c1b1b]">
                {item.title}
              </h3>

              <p className="mt-2 line-clamp-3 text-base leading-6 text-[#444748]">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/news"
            className="inline-flex items-center justify-center rounded-xl border-2 border-[#1c1b1b] px-12 py-2.5 text-base text-[#1c1b1b] transition-colors hover:bg-[#1c1b1b] hover:text-white"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}

function CareerSection() {
  return (
    <section className="bg-[#1c1b1b] py-12 text-white">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 text-center lg:px-16">
        <h2 className="text-4xl font-bold leading-tight tracking-[-0.96px] md:text-5xl md:leading-[56px]">
          Grow Your Career With Us
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-7 text-[#c6c6c7]">
          Be part of a dynamic team driving change across multiple industries.
          We offer a culture of continuous learning, professional growth, and
          global opportunities.
        </p>

        <Link
          href="/career"
          className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#ea580c] px-12 py-5 text-base text-white shadow-[0px_25px_50px_-12px_rgba(234,88,12,0.3)] transition-colors hover:bg-[#c2410c]"
        >
          Explore Career Opportunities
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#c4c7c8] bg-white">
      <div className="mx-auto max-w-[1280px] px-6 py-12 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-[-0.24px] text-[#1c1b1b]"
            >
              WIN <span className="text-[#ea580c]">Holdings</span>
            </Link>

            <p className="mt-4 max-w-xs text-base leading-6 text-[#444748]">
              A leader in diversified business management, committed to creating
              long-term value through integrity and innovation.
            </p>

            <div className="mt-4 flex gap-4">
              <SocialCircle />
              <SocialCircle />
            </div>
          </div>

          <FooterColumn
            title="Company"
            links={[
              { label: "About Us", href: "/about" },
              { label: "Leadership", href: "/organization" },
              { label: "News & Media", href: "/news" },
              { label: "Careers", href: "/career" },
              { label: "Contact", href: "/contact" },
            ]}
          />

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[1.4px] text-[#1c1b1b]">
              Subsidiaries
            </h3>

            <ul className="mt-4 space-y-2 text-sm font-medium leading-5 tracking-[0.14px] text-[#444748]">
              <li>3C Paint — Manufacturing</li>
              <li>WLS — Outsourcing</li>
              <li>Indosino — Trading</li>
              <li>ICG — Construction</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[1.4px] text-[#1c1b1b]">
              Get In Touch
            </h3>

            <div className="mt-4 space-y-3 text-sm font-medium leading-5 tracking-[0.14px] text-[#444748]">
              <p>WIN Corporate Center, Level 24 Finance District, Main City</p>
              <p>+1 (234) 567-890</p>
              <p>info@win-holdings.com</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-[#c4c7c8] pt-6 text-sm font-medium tracking-[0.14px] text-[#444748] md:flex-row md:items-center md:justify-between">
          <p>© 2024 WIN Holdings. All rights reserved.</p>

          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>
            <Link href="/cookies" className="underline">
              Cookie Policy
            </Link>
            <Link href="/sustainability" className="underline">
              Sustainability
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-[1.4px] text-[#1c1b1b]">
        {title}
      </h3>

      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm font-medium leading-5 tracking-[0.14px] text-[#444748] transition-colors hover:text-[#ea580c]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialCircle() {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ebe7e7]">
      <span className="h-4 w-4 rounded-full bg-[#444748]" />
    </span>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8h9M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SmallArrowIcon() {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8h9M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendingIcon() {
  return (
    <svg
      className="h-5 w-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 16l5-5 4 4 5-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 8h4v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PortfolioIcon() {
  return (
    <svg className="h-5 w-5 text-[#1c1b1b]" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h16v12H4V7Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M9 7V5h6v2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg className="h-5 w-5 text-[#1c1b1b]" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 17l5-5 4 4 7-9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExcellenceIcon() {
  return (
    <svg className="h-5 w-5 text-[#1c1b1b]" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2 7.5 14 3 9.6l6.2-.9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FactoryIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
      <path
        d="M6 38V18l12 7V18l12 7V12h8v26H6Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M12 32h4M22 32h4M32 32h4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
      <path
        d="M18 22a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM30 24a6 6 0 1 0 0-12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M7 39c1.5-7 6-11 11-11s9.5 4 11 11M29 30c5 1 8.5 4 10 9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TradeIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
      <path
        d="M8 18h27M13 10h27M8 30h27M13 38h27"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M31 10l9 8-9 8M17 22l-9 8 9 8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ConstructionIcon() {
  return (
    <svg className="h-10 w-10" viewBox="0 0 48 48" fill="none">
      <path
        d="M10 40h28M14 40V14h20v26M19 20h4M25 20h4M19 27h4M25 27h4M19 34h4M25 34h4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}