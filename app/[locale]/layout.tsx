import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import "@fontsource-variable/noto-sans-sc";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as "en" | "zh")) {
        notFound();
    }

    return (
        <NextIntlClientProvider>
            <div lang={locale} className="min-h-screen">
                {children}
            </div>
        </NextIntlClientProvider>
    );
}
