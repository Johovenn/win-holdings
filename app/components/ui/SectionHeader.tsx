// components/ui/SectionHeader.tsx

import { cn } from "@/lib/cn";

type SectionHeaderProps = {
    title: string;
    description?: string;
    align?: "left" | "center";
    accentLine?: boolean;
    className?: string;
};

export default function SectionHeader({
    title,
    description,
    align = "left",
    accentLine = false,
    className,
}: SectionHeaderProps) {
    return (
        <div
            className={cn(
                align === "center" ? "text-center" : "text-left",
                className
            )}
        >
            <h2 className="text-3xl font-semibold leading-9.5 tracking-[-0.3px] text-[#1c1b1b]">
                {title}
            </h2>

            {accentLine ? (
                <div
                    className={cn(
                        "mt-2 h-1 w-20 bg-[#ea580c]",
                        align === "center" && "mx-auto"
                    )}
                />
            ) : null}

            {description ? (
                <p
                    className={cn(
                        "mt-4 text-base leading-6 text-[#444748]",
                        align === "center" && "mx-auto max-w-2xl"
                    )}
                >
                    {description}
                </p>
            ) : null}
        </div>
    );
}