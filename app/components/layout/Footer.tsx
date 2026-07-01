import Link from "next/link";
import { footerColumns, siteConfig, subsidiaries } from "@/lib/site";
import { cn } from "@/lib/cn";
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

export default function Footer() {
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
                            {siteConfig.description}
                        </p>
                    </div>

                    <FooterColumn
                        title="Quick Links"
                        links={quickLinks}
                    />

                    <SubsidiariesColumn />
                </div>

                <div className="mt-12 border-t border-[#c4c7c8]/30 pt-8 text-center">
                    <p className="text-base leading-6 text-[#444748]/60">
                        © 2024 WIN Holdings. All rights reserved.
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
    return (
        <div>
            <h3 className="text-base uppercase leading-6 tracking-[0.8px] text-[#5d5f5f]">
                {title}
            </h3>

            <ul className="mt-4 space-y-2">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={cn(
                                "text-base leading-6 text-[#444748] transition-colors hover:text-[#ea580c]",
                            )}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function SubsidiariesColumn() {
    return (
        <div>
            <h3 className="text-base uppercase leading-6 tracking-[0.8px] text-[#5d5f5f]">
                Subsidiaries
            </h3>

            <ul className="mt-4 space-y-2">
                {(subsidiaries as SubsidiaryItem[]).map((item) => {
                    const subsidiary = getSubsidiaryItem(item);

                    return (
                        <li key={subsidiary.label}>
                            {subsidiary.href ? (
                                <Link
                                    href={subsidiary.href}
                                    className="text-base leading-6 text-[#444748] transition-colors hover:text-[#ea580c]"
                                >
                                    {subsidiary.label}
                                </Link>
                            ) : (
                                <span className="text-base leading-6 text-[#444748]">
                                    {subsidiary.label}
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