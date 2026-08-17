import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Admin Dashboard | WIN Holdings",
    description: "Protected administrator dashboard for WIN Holdings.",
};

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/admin/login");
    }

    return (
        <div className="min-h-screen bg-stone-50 text-neutral-950">
            {children}
        </div>
    );
}
