// src/app/docs/[slug]/page.js
import fs from "fs/promises";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DOCS_FLAT } from "@/lib/docsConfig";
import { notFound } from "next/navigation";

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

    return (
        <article className="prose prose-invert max-w-none">
            <MDXRemote source={source} />
        </article>
    );
}