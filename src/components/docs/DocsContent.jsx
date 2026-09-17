import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import TableOfContents from "@/components/docs/TableOfContents";
import remarkGfm from "remark-gfm";
import { MdxPre } from "@/components/docs/MdxPre";
import { MdxTable } from "@/components/docs/MdxTable";
import { DocsAnimatedWrapper } from "./DocsAnimatedWrapper";
import { InstallSnippet } from "./InstallSnippet";
import { PackageManagerTabs } from "./PackageManagerTabs";

function DocsContent({ source, headings }) {
    return (
        <>
            <DocsAnimatedWrapper>
                <MDXRemote
                    source={source}
                    components={{ pre: MdxPre, table: MdxTable, InstallSnippet, PackageManagerTabs, }}
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
            </DocsAnimatedWrapper>
            <TableOfContents headings={headings} />
        </>
    );
}

export default DocsContent;
