import { Link } from "@/i18n/routing";
import { footerColumns, subsidiaries } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import Container from "../ui/Container";

type FooterLink = {
    label: string;
    href: string;
};

type SubsidiaryItem =
    | string
    | {
          name?: string;
          label?: string;
          href?: string;
      };

const quickLinks =
    footerColumns.find((column) =>
        column.title.toLowerCase().includes("quick"),
    )?.links ?? footerColumns[0]?.links ?? [];

const quickLinkLabelKeys: Record<string, string> = {
    "/": "home",
    "/about": "about",
    "/subsidiaries": "subsidiaries",
    "/organization": "organization",
    "/news": "news",
    "/career": "career",
    "/contact": "contact",
};

const subsidiaryLabelKeysByHref: Record<string, string> = {
    "/subsidiaries": "portfolio",
    "/subsidiaries/manufacture": "manufacture",
    "/subsidiaries/trading": "trading",
    "/subsidiaries/outsourcing": "outsourcing",
    "/subsidiaries/construction": "construction",
    "https://3c-paint.vercel.app/": "manufacture",
};

const subsidiaryLabelKeysByName: Record<string, string> = {
    "manufacture": "manufacture",
    "manufacturing": "manufacture",
    "3c paint": "manufacture",
    "trading": "trading",
    "trading material": "trading",
    "outsourcing": "outsourcing",
    "manpower": "outsourcing",
    "manpower supply": "outsourcing",
    "construction": "construction",
};

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="border-t border-[#c4c7c8] bg-white">
            <Container className="py-12">
                <div className="grid gap-10 md:grid-cols-3">
                    <div>
                        <Link
                            href="/"
                            className="text-2xl font-bold tracking-[-0.24px] text-[#1c1b1b]"
                        >
                            WIN{" "}
                            <span className="text-[#ea580c]">
                                Holdings
                            </span>
                        </Link>

                        <p className="mt-6 max-w-xs text-base leading-6 text-[#444748]">
                            {t("description")}
                        </p>
                    </div>

                    <FooterColumn
                        title={t("quickLinks.title")}
                        links={quickLinks}
                    />

                    <SubsidiariesColumn />
                </div>

                <div className="mt-12 border-t border-[#c4c7c8]/30 pt-8 text-center">
                    <p className="text-base leading-6 text-[#444748]/60">
                        {t("copyright")}
                    </p>
                </div>
            </Container>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: FooterLink[];
}) {
    const t = useTranslations("Footer.quickLinks.items");

    return (
        <div>
            <h3 className="text-base uppercase leading-6 tracking-[0.8px] text-[#5d5f5f]">
                {title}
            </h3>

            <ul className="mt-4 space-y-2">
                {links.map((link) => {
                    const labelKey = quickLinkLabelKeys[link.href];

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={cn(
                                    "text-base leading-6 text-[#444748] transition-colors hover:text-[#ea580c]",
                                )}
                            >
                                {labelKey ? t(labelKey) : link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function SubsidiariesColumn() {
    const t = useTranslations("Footer.subsidiaries");

    return (
        <div>
            <h3 className="text-base uppercase leading-6 tracking-[0.8px] text-[#5d5f5f]">
                {t("title")}
            </h3>

            <ul className="mt-4 space-y-2">
                {(subsidiaries as SubsidiaryItem[]).map((item) => {
                    const subsidiary = getSubsidiaryItem(item);
                    const labelKey = getSubsidiaryLabelKey(subsidiary);

                    return (
                        <li key={`${subsidiary.label}-${subsidiary.href}`}>
                            {subsidiary.href ? (
                                <Link
                                    href={subsidiary.href}
                                    className="text-base leading-6 text-[#444748] transition-colors hover:text-[#ea580c]"
                                >
                                    {labelKey
                                        ? t(`items.${labelKey}`)
                                        : subsidiary.label}
                                </Link>
                            ) : (
                                <span className="text-base leading-6 text-[#444748]">
                                    {labelKey
                                        ? t(`items.${labelKey}`)
                                        : subsidiary.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

function getSubsidiaryItem(item: SubsidiaryItem): FooterLink {
    if (typeof item === "string") {
        return {
            label: item,
            href: "",
        };
    }

    return {
        label: item.name ?? item.label ?? "Subsidiary",
        href: item.href ?? "",
    };
}

function getSubsidiaryLabelKey(item: FooterLink) {
    const hrefKey = subsidiaryLabelKeysByHref[item.href];

    if (hrefKey) {
        return hrefKey;
    }

    const normalizedLabel = item.label.trim().toLowerCase();

    return subsidiaryLabelKeysByName[normalizedLabel] ?? null;
}