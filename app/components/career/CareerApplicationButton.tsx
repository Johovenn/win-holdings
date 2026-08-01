"use client";

import { useState } from "react";
import {
    BriefcaseBusiness,
    ExternalLink,
    Mail,
    Phone,
    Send,
    User,
    X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { createCareerApplicationAction } from "@/app/[locale]/(site)/career/actions";

type CareerApplicationButtonProps = {
    careerId: string;
    careerSlug: string;
    careerTitle: string;
};

export default function CareerApplicationButton({
    careerId,
    careerSlug,
    careerTitle,
}: CareerApplicationButtonProps) {
    const t = useTranslations("CareerApplication");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex w-full items-center justify-center rounded-lg bg-orange-600 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-orange-700"
            >
                {t("button")}
            </button>

            {isOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
                    <button
                        type="button"
                        aria-label={t("closeAriaLabel")}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
                    />

                    <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-neutral-200 bg-white px-6 py-5">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-600/10 text-orange-600">
                                        <BriefcaseBusiness className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                                            {t("modalLabel")}
                                        </p>

                                        <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                                            {careerTitle}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                aria-label={t("closeAriaLabel")}
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form
                            action={createCareerApplicationAction}
                            className="grid gap-5 px-6 py-6"
                        >
                            <input
                                type="hidden"
                                name="career_id"
                                value={careerId}
                            />

                            <input
                                type="hidden"
                                name="career_slug"
                                value={careerSlug}
                            />

                            <input
                                type="hidden"
                                name="career_title"
                                value={careerTitle}
                            />

                            <label className="block">
                                <span className="text-sm font-medium text-neutral-700">
                                    {t("fields.fullName.label")}
                                </span>

                                <div className="relative mt-2">
                                    <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                    <input
                                        name="full_name"
                                        type="text"
                                        required
                                        placeholder={t("fields.fullName.placeholder")}
                                        className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                    />
                                </div>
                            </label>

                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-medium text-neutral-700">
                                        {t("fields.email.label")}
                                    </span>

                                    <div className="relative mt-2">
                                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            placeholder={t("fields.email.placeholder")}
                                            className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                        />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-neutral-700">
                                        {t("fields.phone.label")}
                                    </span>

                                    <div className="relative mt-2">
                                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                        <input
                                            name="phone"
                                            type="tel"
                                            placeholder={t("fields.phone.placeholder")}
                                            className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                        />
                                    </div>
                                </label>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-medium text-neutral-700">
                                        {t("fields.linkedin.label")}
                                    </span>

                                    <div className="relative mt-2">
                                        <ExternalLink className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                        <input
                                            name="linkedin_url"
                                            type="url"
                                            placeholder={t("fields.linkedin.placeholder")}
                                            className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                        />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-neutral-700">
                                        {t("fields.portfolio.label")}
                                    </span>

                                    <div className="relative mt-2">
                                        <ExternalLink className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                        <input
                                            name="portfolio_url"
                                            type="url"
                                            placeholder={t("fields.portfolio.placeholder")}
                                            className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                        />
                                    </div>
                                </label>
                            </div>

                            <label className="block">
                                <span className="text-sm font-medium text-neutral-700">
                                    {t("fields.message.label")}
                                </span>

                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder={t("fields.message.placeholder")}
                                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                />
                            </label>

                            <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
                                >
                                    {t("cancel")}
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
                                >
                                    <Send className="h-4 w-4" />
                                    {t("submit")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}