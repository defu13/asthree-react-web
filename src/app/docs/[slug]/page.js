// src/app/docs/[slug]/page.js
import fs from "fs/promises";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import { DOCS_FLAT } from "@/lib/docsConfig";
import { extractHeadings } from "@/lib/toc";
import TableOfContents from "@/components/docs/TableOfContents";
import { notFound } from "next/navigation";
import remarkGfm from "remark-gfm";
import { MdxPre } from "@/components/docs/MdxPre";
import { MdxTable } from "@/components/docs/MdxTable";

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
        <div className="flex gap-12 md:px-8 px-6 pb-10 pt-20 items-start max-w-5xl mx-auto">
            <article className="prose prose-invert max-w-none flex-1 min-w-0 pt-4">
                <MDXRemote
                    source={source}
                    components={{pre: MdxPre, table: MdxTable}}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkGfm],
                            rehypePlugins: [
                                rehypeSlug,
                                [
                                    rehypeShiki,
                                    {
                                        theme: "github-dark-default",
                                    },
                                ],
                            ],
                        },
                    }}
                />
            </article>
            <TableOfContents headings={headings} />
        </div>
    );
}