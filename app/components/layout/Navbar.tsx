"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks } from "@/lib/site";
import Container from "../ui/Container";

const navLabelKeys: Record<string, string> = {
    "/": "home",
    "/about": "about",
    "/subsidiaries": "subsidiaries",
    "/organization": "organization",
    "/news": "news",
    "/career": "career",
    "/contact": "contact",
};

export default function Navbar() {
    const pathname = usePathname();
    const t = useTranslations("Navbar");
    const [isOpen, setIsOpen] = useState(false);

    function isActive(href: string) {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    }

    function getNavLabel(href: string, fallback: string) {
        const key = navLabelKeys[href];

        return key ? t(`links.${key}`) : fallback;
    }

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 shadow-sm backdrop-blur-md">
            <Container>
                <div className="flex h-20 items-center justify-between">
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-[-0.24px] text-white"
                        onClick={() => setIsOpen(false)}
                    >
                        WIN{" "}
                        <span className="text-[#ea580c]">
                            Holdings
                        </span>
                    </Link>

                    <nav className="hidden items-center lg:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "ml-8 text-base leading-6 transition-colors first:ml-0 hover:text-[#ea580c]",
                                    isActive(link.href)
                                        ? "border-b-2 border-[#ea580c] pb-0.5 font-bold text-[#ea580c]"
                                        : "font-normal text-white/70",
                                )}
                            >
                                {getNavLabel(link.href, link.label)}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-4 lg:flex">
                        <LanguageSwitcher />

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-700"
                        >
                            {t("contactButton")}
                        </Link>
                    </div>

                    <button
                        type="button"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((current) => !current)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 transition-colors hover:border-[#ea580c] lg:hidden"
                    >
                        <span
                            className={cn(
                                "relative h-0.5 w-5 bg-white transition-all before:absolute before:left-0 before:h-0.5 before:w-5 before:bg-white before:transition-all before:content-[''] after:absolute after:left-0 after:h-0.5 after:w-5 after:bg-white after:transition-all after:content-['']",
                                isOpen
                                    ? "bg-transparent before:top-0 before:rotate-45 after:top-0 after:-rotate-45"
                                    : "before:-top-1.5 after:top-1.5",
                            )}
                        />
                    </button>
                </div>

                {isOpen ? (
                    <div className="border-t border-white/10 py-4 lg:hidden">
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "rounded-lg px-3 py-3 text-base transition-colors",
                                        isActive(link.href)
                                            ? "bg-[#ea580c]/10 font-semibold text-[#ea580c]"
                                            : "text-white/70 hover:bg-white/5 hover:text-[#ea580c]",
                                    )}
                                >
                                    {getNavLabel(link.href, link.label)}
                                </Link>
                            ))}

                            <div className="mt-3 px-3">
                                <LanguageSwitcher />
                            </div>

                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-orange-700"
                            >
                                {t("contactButton")}
                            </Link>
                        </nav>
                    </div>
                ) : null}
            </Container>
        </header>
    );
}

function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <div className="flex w-fit items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-sm">
            <Link
                href={pathname}
                locale="en"
                className={cn(
                    "rounded-full px-3 py-1.5 font-semibold transition-colors",
                    locale === "en"
                        ? "bg-orange-600 text-white"
                        : "text-white/70 hover:text-orange-500",
                )}
            >
                EN
            </Link>

            <Link
                href={pathname}
                locale="zh"
                className={cn(
                    "rounded-full px-3 py-1.5 font-semibold transition-colors",
                    locale === "zh"
                        ? "bg-orange-600 text-white"
                        : "text-white/70 hover:text-orange-500",
                )}
            >
                中文
            </Link>
        </div>
    );
}