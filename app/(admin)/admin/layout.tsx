import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Admin Dashboard | WIN Holdings",
    description: "Protected administrator dashboard for WIN Holdings.",
};

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        redirect("/admin/login");
    }

    const { data: adminUser, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

    if (adminError || !adminUser) {
        await supabase.auth.signOut();

        redirect("/admin/login?error=not_authorized");
    }

    return (
        <div className="min-h-screen bg-stone-50 text-neutral-950">
            {children}
        </div>
    );
}