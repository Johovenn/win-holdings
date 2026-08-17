import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
    BriefcaseBusiness,
    LayoutDashboard,
    LogOut,
    Newspaper,
} from "lucide-react";
import { getCurrentUser, signOut } from "@/lib/auth";

type DashboardCard = {
    title: string;
    description: string;
    href: string;
    icon: ReactNode;
};

const dashboardCards: DashboardCard[] = [
    {
        title: "News & Info",
        description: "Create, edit, publish, and manage company news articles.",
        href: "/admin/news",
        icon: <Newspaper className="h-6 w-6" />,
    },
    {
        title: "Career Positions",
        description: "Create, edit, publish, and manage career opportunities.",
        href: "/admin/careers",
        icon: <BriefcaseBusiness className="h-6 w-6" />,
    },
    {
        title: "Job Applicants",
        description: "View submitted applications from career openings.",
        href: "/admin/applicants",
        icon: <BriefcaseBusiness className="h-6 w-6" />,
    }
];

export default async function AdminDashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/admin/login");
    }

    return (
        <main className="min-h-screen bg-stone-50 text-neutral-950">
            <section className="border-b border-neutral-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-16">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-widest text-orange-600">
                            WIN Holdings
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-neutral-950">
                            Admin Dashboard
                        </h1>
                    </div>

                    <form action={signOutAction}>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-orange-600 hover:text-orange-600"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </section>

            <section className="py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                            <LayoutDashboard className="h-7 w-7" />
                        </div>

                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-950">
                            Welcome back
                        </h2>

                        <p className="mt-3 max-w-2xl text-base leading-7 text-neutral-600">
                            You are signed in as{" "}
                            <span className="font-semibold text-neutral-950">
                                {user.email}
                            </span>
                            . Use this dashboard to manage news and career content for
                            WIN Holdings.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {dashboardCards.map((card) => (
                            <AdminCard key={card.title} card={card} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

function AdminCard({ card }: { card: DashboardCard }) {
    return (
        <Link
            href={card.href}
            className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-orange-600 hover:shadow-md"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                {card.icon}
            </div>

            <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-950">
                {card.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
                {card.description}
            </p>
        </Link>
    );
}

async function signOutAction() {
    "use server";

    await signOut();

    redirect("/admin/login");
}
