// src/app/docs/[slug]/page.js

import fs from "fs/promises";
import path from "path";
import { DOCS_FLAT } from "@/lib/docsConfig";
import { extractHeadings } from "@/lib/toc";
import { notFound } from "next/navigation";
import DocsContent from "@/components/docs/DocsContent";

export async function generateStaticParams() {
    return DOCS_FLAT.map((item) => ({ slug: item.slug }));
}

export default async function DocPage({ params }) {
    const { slug } = await params;

    if (!DOCS_FLAT.some((item) => item.slug === slug)) {
        notFound();
    }

    const filePath = path.join(process.cwd(), "src/content", `${slug}.mdx`);

    let source;
    try {
        source = await fs.readFile(filePath, "utf-8");
    } catch {
        notFound();
    }

    const headings = extractHeadings(source);

    return (
        <div className="flex gap-12 pl-8 pr-6 pb-10 pt-20 items-start max-w-5xl mx-auto">
            <DocsContent source={source} headings={headings} />
        </div>
    );
}
