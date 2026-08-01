import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";
import {
    ArrowUpRight,
    BarChart3,
    BriefcaseBusiness,
    Building2,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Share2,
    Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

type ContactInfo = {
    key: "headquarters" | "generalInquiries" | "corporatePhone";
    icon: ReactNode;
};

type FAQItem = {
    key:
        | "partner"
        | "subsidiaries"
        | "investmentFocus"
        | "career";
    icon: ReactNode;
};

type SocialLinkItem = {
    key: "linkedin" | "corporateNetwork" | "businessCommunity";
    href: string;
    icon: ReactNode;
};

type SubjectOption = {
    key:
        | "generalInquiry"
        | "partnership"
        | "investmentOpportunity"
        | "career"
        | "mediaInquiry";
    value: string;
};

const contactInfo: ContactInfo[] = [
    {
        key: "headquarters",
        icon: <MapPin className="h-5 w-5" />,
    },
    {
        key: "generalInquiries",
        icon: <Mail className="h-5 w-5" />,
    },
    {
        key: "corporatePhone",
        icon: <Phone className="h-5 w-5" />,
    },
];

const faqItems: FAQItem[] = [
    {
        key: "partner",
        icon: <MessageCircle className="h-5 w-5" />,
    },
    {
        key: "subsidiaries",
        icon: <Building2 className="h-5 w-5" />,
    },
    {
        key: "investmentFocus",
        icon: <BarChart3 className="h-5 w-5" />,
    },
    {
        key: "career",
        icon: <BriefcaseBusiness className="h-5 w-5" />,
    },
];

const socialLinks: SocialLinkItem[] = [
    {
        key: "linkedin",
        href: "#",
        icon: <Users className="h-4 w-4" />,
    },
    {
        key: "corporateNetwork",
        href: "#",
        icon: <Share2 className="h-4 w-4" />,
    },
    {
        key: "businessCommunity",
        href: "#",
        icon: <Building2 className="h-4 w-4" />,
    },
];

const subjectOptions: SubjectOption[] = [
    {
        key: "generalInquiry",
        value: "General Inquiry",
    },
    {
        key: "partnership",
        value: "Partnership",
    },
    {
        key: "investmentOpportunity",
        value: "Investment Opportunity",
    },
    {
        key: "career",
        value: "Career",
    },
    {
        key: "mediaInquiry",
        value: "Media Inquiry",
    },
];

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <HeroSection />
            <ContactSection />
            <FAQSection />
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
    const t = useTranslations("Contact.hero");

    return (
        <section className="relative overflow-hidden bg-stone-50 py-20 lg:py-28">
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-neutral-500/5 blur-3xl" />

            <SectionContainer className="relative grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                        {t("title")}
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
                        {t("description")}
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="mailto:info@winholdings.com"
                            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-orange-700"
                        >
                            {t("emailButton")}
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>

                        <Link
                            href="/career"
                            className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                        >
                            {t("careerButton")}
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-xl bg-white shadow-xl">
                    <div
                        className="h-96 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "linear-gradient(135deg, rgba(252,248,248,0.4), rgba(252,248,248,0)), url('/images/contact-hero.jpg')",
                        }}
                    >
                        <div className="flex h-full items-end bg-linear-to-tr from-white/30 to-transparent p-8">
                            <div className="rounded-2xl border border-white/40 bg-white/70 p-5 shadow-lg backdrop-blur-md">
                                <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                                    WIN Holdings
                                </p>

                                <p className="mt-2 max-w-xs text-lg font-semibold leading-7 text-neutral-950">
                                    {t("imageCardText")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </section>
    );
}

function ContactSection() {
    const t = useTranslations("Contact.office");
    const socialT = useTranslations("Contact.social");

    return (
        <section className="bg-stone-100 py-16 lg:py-20">
            <SectionContainer className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <div>
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            {t("title")}
                        </h2>

                        <div className="mt-4 h-1 w-20 rounded-full bg-orange-600" />
                    </div>

                    <div className="mt-10 space-y-6">
                        {contactInfo.map((item) => (
                            <ContactInfoItem key={item.key} item={item} />
                        ))}
                    </div>

                    <div className="mt-12">
                        <p className="text-sm font-medium uppercase tracking-widest text-neutral-950">
                            {socialT("title")}
                        </p>

                        <div className="mt-4 flex gap-3">
                            {socialLinks.map((item) => (
                                <SocialLink
                                    key={item.key}
                                    href={item.href}
                                    label={socialT(`items.${item.key}`)}
                                >
                                    {item.icon}
                                </SocialLink>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <ContactForm />
                </div>
            </SectionContainer>
        </section>
    );
}

function ContactInfoItem({ item }: { item: ContactInfo }) {
    const t = useTranslations("Contact.office.items");

    return (
        <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-neutral-300 bg-stone-50 text-orange-600">
                {item.icon}
            </div>

            <div>
                <h3 className="text-sm font-medium uppercase tracking-widest text-neutral-950">
                    {t(`${item.key}.label`)}
                </h3>

                <div className="mt-2 text-base leading-7 text-neutral-600">
                    <ContactInfoValue itemKey={item.key} />
                </div>
            </div>
        </div>
    );
}

function ContactInfoValue({
    itemKey,
}: {
    itemKey: ContactInfo["key"];
}) {
    const t = useTranslations("Contact.office.items");

    if (itemKey === "headquarters") {
        return (
            <p>
                {t("headquarters.line1")}
                <br />
                {t("headquarters.line2")}
                <br />
                {t("headquarters.line3")}
            </p>
        );
    }

    if (itemKey === "generalInquiries") {
        return (
            <Link
                href="mailto:info@winholdings.com"
                className="transition-colors hover:text-orange-600"
            >
                {t("generalInquiries.value")}
            </Link>
        );
    }

    return (
        <Link
            href="tel:+62215770000"
            className="transition-colors hover:text-orange-600"
        >
            {t("corporatePhone.value")}
        </Link>
    );
}

function SocialLink({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: ReactNode;
}) {
    return (
        <Link
            href={href}
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-stone-50 text-neutral-600 transition-colors hover:border-orange-600 hover:text-orange-600"
        >
            {children}
        </Link>
    );
}

function ContactForm() {
    const t = useTranslations("Contact.form");

    return (
        <form
            action="mailto:info@winholdings.com"
            method="post"
            encType="text/plain"
            className="rounded-xl border border-neutral-300 bg-stone-50 p-6 shadow-sm md:p-12"
        >
            <div className="grid gap-4 md:grid-cols-2">
                <Field label={t("fields.fullName.label")} htmlFor="fullName">
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder={t("fields.fullName.placeholder")}
                        className="h-12 w-full rounded-lg border border-neutral-300 bg-stone-50 px-4 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-600"
                    />
                </Field>

                <Field label={t("fields.email.label")} htmlFor="email">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("fields.email.placeholder")}
                        className="h-12 w-full rounded-lg border border-neutral-300 bg-stone-50 px-4 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-600"
                    />
                </Field>
            </div>

            <div className="mt-4">
                <Field label={t("fields.subject.label")} htmlFor="subject">
                    <select
                        id="subject"
                        name="subject"
                        defaultValue="General Inquiry"
                        className="h-12 w-full rounded-lg border border-neutral-300 bg-stone-50 px-4 text-base text-neutral-950 outline-none transition-colors focus:border-orange-600"
                    >
                        {subjectOptions.map((option) => (
                            <option key={option.key} value={option.value}>
                                {t(`subjects.${option.key}`)}
                            </option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="mt-4">
                <Field label={t("fields.message.label")} htmlFor="message">
                    <textarea
                        id="message"
                        name="message"
                        placeholder={t("fields.message.placeholder")}
                        rows={6}
                        className="w-full resize-none rounded-lg border border-neutral-300 bg-stone-50 px-4 py-3 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-600"
                    />
                </Field>
            </div>

            <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-4 text-base font-medium text-white transition-colors hover:bg-orange-700"
            >
                {t("submit")}
                <Send className="h-4 w-4" />
            </button>
        </form>
    );
}

function Field({
    label,
    htmlFor,
    children,
}: {
    label: string;
    htmlFor: string;
    children: ReactNode;
}) {
    return (
        <label htmlFor={htmlFor} className="block">
            <span className="mb-2 block text-base text-neutral-600">
                {label}
            </span>

            {children}
        </label>
    );
}

function FAQSection() {
    const t = useTranslations("Contact.faq");

    return (
        <section className="bg-stone-50 py-16 lg:py-20">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        {t("title")}
                    </h2>

                    <p className="mt-3 text-base leading-6 text-neutral-600">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {faqItems.map((item) => (
                        <FAQCard key={item.key} item={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function FAQCard({ item }: { item: FAQItem }) {
    const t = useTranslations("Contact.faq.items");

    return (
        <article className="rounded-xl border border-neutral-300 bg-stone-100 p-6">
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold leading-7 text-neutral-950">
                    {t(`${item.key}.question`)}
                </h3>

                <div className="text-orange-600">{item.icon}</div>
            </div>

            <p className="mt-3 text-base leading-7 text-neutral-600">
                {t(`${item.key}.answer`)}
            </p>
        </article>
    );
}