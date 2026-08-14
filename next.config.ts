import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    output: "standalone",
    // Keep Turbopack inside this repository when a parent directory has another lockfile.
    turbopack: {
        root: process.cwd(),
    },
    images: {
        remotePatterns: [],
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
