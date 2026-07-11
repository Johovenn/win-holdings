// lib/site.ts

export const siteConfig = {
    name: "WIN Holdings",
    description: "Driving strategic growth across diverse industries through operational excellence and integrity.",
};

export const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Subsidiaries", href: "/subsidiaries" },
    { label: "Org Structure", href: "/organization" },
    { label: "News", href: "/news" },
    { label: "Career", href: "/career" },
];

export const footerColumns = [
    {
        title: "Quick Links",
        links: [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Subsidiaries", href: "/subsidiaries" },
            { label: "Org Structure", href: "/organization" },
        ],
    },
    {
        title: "Corporate",
        links: [
        { label: "News", href: "/news" },
        { label: "Career", href: "/career" },
        { label: "Contact", href: "/contact" },
        ],
    },
    {
        title: "Legal",
        links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        ],
    },
];

export const subsidiaries = [
    "Manufacturing",
    "Outsourcing",
    "Trading",
    "Construction",
];