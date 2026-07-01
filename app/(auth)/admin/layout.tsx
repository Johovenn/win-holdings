import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Admin Login | WIN Holdings",
    description: "Secure administrator login page for WIN Holdings.",
};

export default function AdminLoginLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-stone-50 text-neutral-950">
            {children}
        </div>
    );
}