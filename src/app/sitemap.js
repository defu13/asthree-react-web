// app/sitemap.js
import { DOCS_FLAT } from "@/lib/docsConfig";

const SITE_URL = "https://asthreereact.dev";

export default function sitemap() {
    const staticRoutes = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: `${SITE_URL}/lab`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
    ];

    const docsRoutes = DOCS_FLAT.map((item) => ({
        url: `${SITE_URL}/docs/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [...staticRoutes, ...docsRoutes];
}