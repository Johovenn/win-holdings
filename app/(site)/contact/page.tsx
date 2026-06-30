import Link from "next/link";
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

type ContactInfo = {
    label: string;
    value: ReactNode;
    icon: ReactNode;
};

type FAQItem = {
    question: string;
    answer: string;
    icon: ReactNode;
};

const contactInfo: ContactInfo[] = [
    {
        label: "Headquarters",
        value: (
            <>
                Sampoerna Strategic Square, Level 24
                <br />
                Jl. Jenderal Sudirman No.45-46, Jakarta 12930
                <br />
                Indonesia
            </>
        ),
        icon: <MapPin className="h-5 w-5" />,
    },
    {
        label: "General Inquiries",
        value: (
            <Link
                href="mailto:info@winholdings.com"
                className="transition-colors hover:text-orange-600"
            >
                info@winholdings.com
            </Link>
        ),
        icon: <Mail className="h-5 w-5" />,
    },
    {
        label: "Corporate Phone",
        value: (
            <Link
                href="tel:+62215770000"
                className="transition-colors hover:text-orange-600"
            >
                +62 21 577 0000
            </Link>
        ),
        icon: <Phone className="h-5 w-5" />,
    },
];

const faqItems: FAQItem[] = [
    {
        question: "How to partner with us?",
        answer:
            "We look for long-term collaborations that align with our core values of integrity and innovation. Interested parties should submit a proposal via the Partnership category in our contact form.",
        icon: <MessageCircle className="h-5 w-5" />,
    },
    {
        question: "Where are your subsidiaries located?",
        answer:
            "WIN Holdings maintains a diversified presence across Southeast Asia, with major operations in Jakarta, Singapore, and Bangkok. Detailed subsidiary profiles are available in our Subsidiaries section.",
        icon: <Building2 className="h-5 w-5" />,
    },
    {
        question: "What is your investment focus?",
        answer:
            "Our primary focus is on sustainable infrastructure, fintech, and renewable energy sectors within emerging markets, aiming for transformative social and economic impact.",
        icon: <BarChart3 className="h-5 w-5" />,
    },
    {
        question: "How can I apply for a position?",
        answer:
            "Career opportunities are updated regularly on our Career page. You can also send your CV directly to our HR team by selecting Career in the contact form inquiry dropdown.",
        icon: <BriefcaseBusiness className="h-5 w-5" />,
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
    return (
        <section className="relative overflow-hidden bg-stone-50 py-20 lg:py-28">
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-neutral-500/5 blur-3xl" />

            <SectionContainer className="relative grid items-center gap-12 lg:grid-cols-2">
                <div>
                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-neutral-950 md:text-5xl">
                        Get in Touch
                    </h1>

                    <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
                        Connecting global vision with local excellence. Reach out to
                        us for strategic partnerships, investment opportunities, or to
                        join our growing team of professionals.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="mailto:info@winholdings.com"
                            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-orange-700"
                        >
                            Email Us
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>

                        <Link
                            href="/career"
                            className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-950 transition-colors hover:border-orange-600 hover:text-orange-600"
                        >
                            Career Opportunities
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
                                    Strategic growth starts with the right conversation.
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
    return (
        <section className="bg-stone-100 py-16 lg:py-20">
            <SectionContainer className="grid gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <div>
                        <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                            Office Information
                        </h2>

                        <div className="mt-4 h-1 w-20 rounded-full bg-orange-600" />
                    </div>

                    <div className="mt-10 space-y-6">
                        {contactInfo.map((item) => (
                            <ContactInfoItem key={item.label} item={item} />
                        ))}
                    </div>

                    <div className="mt-12">
                        <p className="text-sm font-medium uppercase tracking-widest text-neutral-950">
                            Connect with us
                        </p>

                        <div className="mt-4 flex gap-3">
                            <SocialLink href="#" label="LinkedIn">
                                <Users className="h-4 w-4" />
                            </SocialLink>

                            <SocialLink href="#" label="Corporate network">
                                <Share2 className="h-4 w-4" />
                            </SocialLink>

                            <SocialLink href="#" label="Business community">
                                <Building2 className="h-4 w-4" />
                            </SocialLink>
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
    return (
        <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-neutral-300 bg-stone-50 text-orange-600">
                {item.icon}
            </div>

            <div>
                <h3 className="text-sm font-medium uppercase tracking-widest text-neutral-950">
                    {item.label}
                </h3>

                <p className="mt-2 text-base leading-7 text-neutral-600">
                    {item.value}
                </p>
            </div>
        </div>
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
    return (
        <form
            action="mailto:info@winholdings.com"
            method="post"
            encType="text/plain"
            className="rounded-xl border border-neutral-300 bg-stone-50 p-6 shadow-sm md:p-12"
        >
            <div className="grid gap-4 md:grid-cols-2">
                <Field label="Full Name" htmlFor="fullName">
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        className="h-12 w-full rounded-lg border border-neutral-300 bg-stone-50 px-4 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-600"
                    />
                </Field>

                <Field label="Email Address" htmlFor="email">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="h-12 w-full rounded-lg border border-neutral-300 bg-stone-50 px-4 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-600"
                    />
                </Field>
            </div>

            <div className="mt-4">
                <Field label="Subject" htmlFor="subject">
                    <select
                        id="subject"
                        name="subject"
                        defaultValue="General Inquiry"
                        className="h-12 w-full rounded-lg border border-neutral-300 bg-stone-50 px-4 text-base text-neutral-950 outline-none transition-colors focus:border-orange-600"
                    >
                        <option>General Inquiry</option>
                        <option>Partnership</option>
                        <option>Investment Opportunity</option>
                        <option>Career</option>
                        <option>Media Inquiry</option>
                    </select>
                </Field>
            </div>

            <div className="mt-4">
                <Field label="Message" htmlFor="message">
                    <textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        rows={6}
                        className="w-full resize-none rounded-lg border border-neutral-300 bg-stone-50 px-4 py-3 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-600"
                    />
                </Field>
            </div>

            <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-600 px-6 py-4 text-base font-medium text-white transition-colors hover:bg-orange-700"
            >
                Send Message
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
            <span className="mb-2 block text-base text-neutral-600">{label}</span>
            {children}
        </label>
    );
}

function FAQSection() {
    return (
        <section className="bg-stone-50 py-16 lg:py-20">
            <SectionContainer>
                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-tight text-neutral-950">
                        Quick Help & FAQ
                    </h2>

                    <p className="mt-3 text-base leading-6 text-neutral-600">
                        Common inquiries about our operations and strategic goals.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {faqItems.map((item) => (
                        <FAQCard key={item.question} item={item} />
                    ))}
                </div>
            </SectionContainer>
        </section>
    );
}

function FAQCard({ item }: { item: FAQItem }) {
    return (
        <article className="rounded-xl border border-neutral-300 bg-stone-100 p-6">
            <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-bold leading-7 text-neutral-950">
                    {item.question}
                </h3>

                <div className="text-orange-600">{item.icon}</div>
            </div>

            <p className="mt-3 text-base leading-7 text-neutral-600">
                {item.answer}
            </p>
        </article>
    );
}