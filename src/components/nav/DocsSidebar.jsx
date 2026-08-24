// components/nav/DocsSidebar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAV } from "@/lib/docsConfig";

export default function DocsSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-56 shrink-0 flex flex-col gap-6 py-8 pr-6 border-r border-neutral-50/10">
            {DOCS_NAV.map((section) => (
                <div key={section.section} className="flex flex-col gap-1">
                    <span className="text-xs text-neutral-500 uppercase tracking-wider px-3 mb-1">
                        {section.section}
                    </span>
                    {section.items.map((item) => {
                        const href = `/docs/${item.slug}`;
                        const active = pathname === href;

                        return (
                            <Link
                                key={item.slug}
                                href={href}
                                className={`text-sm px-3 py-1.5 rounded-lg transition-colors ${
                                    active
                                        ? "bg-violet-500/10 text-violet-300"
                                        : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-50/5"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            ))}
        </aside>
    );
}