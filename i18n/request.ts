import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
    const requestedLocale = await requestLocale;
    const locale = requestedLocale ?? routing.defaultLocale;

    if (!routing.locales.includes(locale as "en" | "zh")) {
        notFound();
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default,
    };
});