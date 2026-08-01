"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white p-1 text-sm shadow-sm">
            <Link
                href={pathname}
                locale="en"
                className={
                    locale === "en"
                        ? "rounded-full bg-orange-600 px-3 py-1 font-semibold text-white"
                        : "rounded-full px-3 py-1 font-medium text-neutral-600 hover:text-orange-600"
                }
            >
                EN
            </Link>

            <Link
                href={pathname}
                locale="zh"
                className={
                    locale === "zh"
                        ? "rounded-full bg-orange-600 px-3 py-1 font-semibold text-white"
                        : "rounded-full px-3 py-1 font-medium text-neutral-600 hover:text-orange-600"
                }
            >
                中文
            </Link>
        </div>
    );
}