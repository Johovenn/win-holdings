"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInAction(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const redirectTo = String(formData.get("redirectTo") ?? "/admin");

    if (!email || !password) {
        redirect("/admin/login?error=missing_credentials");
    }

    const supabase = await createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error || !user) {
        redirect("/admin/login?error=invalid_credentials");
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

    const safeRedirectTo = redirectTo.startsWith("/admin")
        ? redirectTo
        : "/admin";

    redirect(safeRedirectTo);
}

export async function signOutAction() {
    const supabase = await createClient();

    await supabase.auth.signOut();

    redirect("/admin/login");
}