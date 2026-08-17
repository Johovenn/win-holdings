"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";

export async function signInAction(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const redirectTo = String(formData.get("redirectTo") ?? "/admin");

    if (!email || !password) {
        redirect("/admin/login?error=missing_credentials");
    }

    if (!(await signIn(email, password))) {
        redirect("/admin/login?error=invalid_credentials");
    }

    const safeRedirectTo = redirectTo.startsWith("/admin")
        ? redirectTo
        : "/admin";

    redirect(safeRedirectTo);
}

export async function signOutAction() {
    await signOut();

    redirect("/admin/login");
}
