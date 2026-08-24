// lib/docsConfig.js
export const DOCS_NAV = [
    {
        section: "Getting Started",
        items: [
            { slug: "introduction",  label: "Introduction" },
            { slug: "installation",  label: "Installation" },
            { slug: "usage",         label: "Usage" },
        ],
    },
    {
        section: "Reference",
        items: [
            { slug: "props",         label: "Props" },
            { slug: "presets",       label: "Presets" },
        ],
    },
];

// Lista plana para navegación prev/next
export const DOCS_FLAT = DOCS_NAV.flatMap((s) => s.items);