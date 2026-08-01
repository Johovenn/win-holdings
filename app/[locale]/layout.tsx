import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Noto_Sans_SC } from "next/font/google";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

const notoSansSC = Noto_Sans_SC({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

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
            <div
                lang={locale}
                className={cn(
                    "min-h-screen",
                    locale === "zh" ? notoSansSC.className : "",
                )}
            >
                {children}
            </div>
        </NextIntlClientProvider>
    );
}