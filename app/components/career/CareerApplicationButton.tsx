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
import { createCareerApplicationAction } from "@/app/(site)/career/actions";

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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex w-full items-center justify-center rounded-lg bg-orange-600 px-5 py-3 text-base font-medium text-white transition-colors hover:bg-orange-700"
            >
                Apply Now
            </button>

            {isOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
                    <button
                        type="button"
                        aria-label="Close application modal"
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
                                            Career Application
                                        </p>

                                        <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
                                            {careerTitle}
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
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
                                    Full Name
                                </span>

                                <div className="relative mt-2">
                                    <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                    <input
                                        name="full_name"
                                        type="text"
                                        required
                                        placeholder="Enter your full name"
                                        className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                    />
                                </div>
                            </label>

                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-medium text-neutral-700">
                                        Email Address
                                    </span>

                                    <div className="relative mt-2">
                                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="name@example.com"
                                            className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                        />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-neutral-700">
                                        Phone Number
                                    </span>

                                    <div className="relative mt-2">
                                        <Phone className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                        <input
                                            name="phone"
                                            type="tel"
                                            placeholder="+62 812 3456 7890"
                                            className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                        />
                                    </div>
                                </label>
                            </div>

                            <div className="grid gap-5 md:grid-cols-2">
                                <label className="block">
                                    <span className="text-sm font-medium text-neutral-700">
                                        LinkedIn URL
                                    </span>

                                    <div className="relative mt-2">
                                        <ExternalLink className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                        <input
                                            name="linkedin_url"
                                            type="url"
                                            placeholder="https://linkedin.com/in/yourname"
                                            className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                        />
                                    </div>
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-neutral-700">
                                        Portfolio / CV URL
                                    </span>

                                    <div className="relative mt-2">
                                        <ExternalLink className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />

                                        <input
                                            name="portfolio_url"
                                            type="url"
                                            placeholder="Google Drive, portfolio, or CV link"
                                            className="h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                        />
                                    </div>
                                </label>
                            </div>

                            <label className="block">
                                <span className="text-sm font-medium text-neutral-700">
                                    Short Message
                                </span>

                                <textarea
                                    name="message"
                                    rows={5}
                                    placeholder="Briefly introduce yourself and explain why you are interested in this role."
                                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm leading-6 text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-orange-600"
                                />
                            </label>

                            <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
                                >
                                    <Send className="h-4 w-4" />
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    );
}