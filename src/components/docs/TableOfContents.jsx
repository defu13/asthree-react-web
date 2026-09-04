// src/components/docs/TableOfContents.js
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

const OFFSET = 120; // navbar height + margen de respiro

export default function TableOfContents({ headings }) {
    const [activeId, setActiveId] = useState(headings[0]?.id ?? null);

    const updateActive = useCallback(() => {
        let current = null;
        for (const h of headings) {
            const el = document.getElementById(h.id);
            if (!el) continue;
            const top = el.getBoundingClientRect().top;
            if (top - OFFSET <= 0) {
                current = h.id;
            } else {
                break;
            }
        }
        setActiveId(current ?? headings[0]?.id ?? null);
    }, [headings]);

    useEffect(() => {
        if (!headings.length) return;

        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                updateActive();
                ticking = false;
            });
        };

        updateActive();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [headings, updateActive]);

    const handleClick = (id) => (e) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - OFFSET + 8;
        window.scrollTo({ top, behavior: "smooth" });
    };

    if (!headings.length) return null;

    return (
        <nav className="hidden xl:flex flex-col gap-3 w-56 shrink-0 sticky top-34 self-start border border-neutral-50/10 rounded-xl p-5">
            <span className="text-xs text-neutral-500 uppercase font-mono">
                On this page
            </span>
            <ul className="relative flex flex-col gap-0.5 border-l border-neutral-800/80 pl-4">
                {headings.map((h) => {
                    const active = h.id === activeId;
                    return (
                        <li key={h.id} className="relative">
                            {active && (
                                <motion.span
                                    layoutId="toc-indicator"
                                    className="absolute -left-[17px] top-0.5 bottom-0.5 w-[2px] rounded-full bg-violet-400"
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                />
                            )}
                            <a
                                href={`#${h.id}`}
                                onClick={handleClick(h.id)}
                                className={`block text-sm py-1 transition-colors ${
                                    h.level === 3 ? "pl-3" : ""
                                } ${
                                    active
                                        ? "text-violet-300"
                                        : "text-neutral-500 hover:text-neutral-200"
                                }`}
                            >
                                {h.text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}