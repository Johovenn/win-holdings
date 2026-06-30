// components/ui/PlaceholderBlock.tsx

import { cn } from "@/lib/cn";

type PlaceholderBlockProps = {
    className?: string;
};

export default function PlaceholderBlock({ className }: PlaceholderBlockProps) {
    return (
        <div
            className={cn(
                "rounded-2xl bg-[#ddd9d9]",
                className
            )}
        />
    );
}