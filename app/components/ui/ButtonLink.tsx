// components/ui/ButtonLink.tsx

import { Link } from "@/i18n/routing";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
    href: string;
    children: ReactNode;
    variant?: "orange" | "dark" | "outline" | "light-outline";
    className?: string;
};

const variants = {
    orange:
        "bg-[#ea580c] text-white shadow-[0px_10px_15px_-3px_rgba(234,88,12,0.2),0px_4px_6px_-4px_rgba(234,88,12,0.2)] hover:bg-[#c2410c]",
    dark:
        "bg-[#1c1b1b] text-white shadow-[0px_20px_25px_-5px_rgba(28,27,27,0.1),0px_8px_10px_-6px_rgba(28,27,27,0.1)] hover:bg-black",
    outline:
        "border border-[#c4c7c8] bg-white text-[#1c1b1b] hover:border-[#ea580c] hover:text-[#ea580c]",
    "light-outline":
        "border border-white/20 text-white hover:border-white/40",
};

export default function ButtonLink({
    href,
    children,
    variant = "orange",
    className,
}: ButtonLinkProps) {
    return (
        <Link
            href={href}
            className={cn(
                "inline-flex items-center justify-center rounded-lg px-6 py-2 text-base leading-6 transition-colors",
                variants[variant],
                className
            )}
        >
            {children}
        </Link>
    );
}