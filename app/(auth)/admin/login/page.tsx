import Link from "next/link";
import {
    ArrowLeft,
    Building2,
    LockKeyhole,
    Mail,
    ShieldCheck,
} from "lucide-react";
import { signInAction } from "./actions";

type SearchParams = {
    error?: string;
    redirectTo?: string;
};

export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams?: SearchParams | Promise<SearchParams>;
}) {
    const params = await Promise.resolve(searchParams ?? {});
    const errorMessage = getErrorMessage(params.error);

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <section className="grid min-h-screen lg:grid-cols-2">
                <div className="relative hidden overflow-hidden bg-neutral-950 text-white lg:block">
                    <div className="absolute inset-0 bg-linear-to-br from-neutral-950 via-neutral-900 to-neutral-800" />
                    <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-orange-600/20 blur-3xl" />
                    <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />

                    <div className="relative flex h-full flex-col justify-between p-12">
                        <Link
                            href="/"
                            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Website
                        </Link>

                        <div>
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600 text-white">
                                <Building2 className="h-7 w-7" />
                            </div>

                            <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight tracking-tight">
                                WIN Holdings Admin Portal
                            </h1>

                            <p className="mt-5 max-w-lg text-lg leading-8 text-white/70">
                                Manage company news, career openings, subsidiaries,
                                documents, and website content from one secure dashboard.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-600/10 text-orange-400">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>

                                <div>
                                    <p className="font-semibold text-white">
                                        Secure access only
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-white/60">
                                        This area is restricted to authorized WIN
                                        Holdings administrators.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center px-6 py-12 lg:px-16">
                    <div className="w-full max-w-md">
                        <div className="lg:hidden">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-orange-600"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Website
                            </Link>
                        </div>

                        <div className="mt-10 lg:mt-0">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600/10 text-orange-600">
                                <LockKeyhole className="h-7 w-7" />
                            </div>

                            <h2 className="mt-8 text-4xl font-bold tracking-tight text-neutral-950">
                                Admin Login
                            </h2>

                            <p className="mt-3 text-base leading-7 text-neutral-600">
                                Sign in with your administrator account to manage
                                WIN Holdings website content.
                            </p>
                        </div>

                        {errorMessage ? (
                            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                                {errorMessage}
                            </div>
                        ) : null}

                        <form action={signInAction} className="mt-8 space-y-5">
                            <input
                                type="hidden"
                                name="redirectTo"
                                value={params.redirectTo ?? "/admin"}
                            />

                            <label htmlFor="email" className="block">
                                <span className="text-sm font-medium text-neutral-700">
                                    Email Address
                                </span>

                                <div className="relative mt-2">
                                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="admin@winholdings.com"
                                        required
                                        className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                    />
                                </div>
                            </label>

                            <label htmlFor="password" className="block">
                                <span className="text-sm font-medium text-neutral-700">
                                    Password
                                </span>

                                <div className="relative mt-2">
                                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        required
                                        className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                    />
                                </div>
                            </label>

                            <button
                                type="submit"
                                className="flex h-12 w-full items-center justify-center rounded-lg bg-orange-600 px-6 text-base font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}

function getErrorMessage(error?: string) {
    if (!error) {
        return null;
    }

    if (error === "missing_credentials") {
        return "Please enter your email and password.";
    }

    if (error === "invalid_credentials") {
        return "Invalid email or password. Please check your credentials and try again.";
    }

    if (error === "not_authorized") {
        return "Your account is signed in, but it is not authorized to access the admin dashboard.";
    }

    return "Something went wrong. Please try again.";
}