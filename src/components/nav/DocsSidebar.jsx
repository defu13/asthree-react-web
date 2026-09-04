// src/components/nav/DocsSidebar.js
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Equal, ChevronDown } from "@gravity-ui/icons";
import { DOCS_NAV, DOCS_FLAT } from "@/lib/docsConfig";

export default function DocsSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Buscamos qué página de la doc está activa para mostrar su nombre en el botón móvil
    const activeItem = DOCS_FLAT.find(
        (item) => pathname === `/docs/${item.slug}`,
    );

    // Buscamos también a qué SECCIÓN pertenece esa página (ej: "Getting Started")
    // recorriendo DOCS_NAV, que agrupa los items por sección
    const activeSection = DOCS_NAV.find((section) =>
        section.items.some((item) => item.slug === activeItem?.slug)
    );

    const navList = (
        <>
            {DOCS_NAV.map((section) => (
                <div key={section.section} className="flex flex-col gap-3">
                    <span className="text-xs text-neutral-500 uppercase font-mono">
                        {section.section}
                    </span>
                    <ul className="relative flex flex-col gap-0.5 border-l border-neutral-800/80 pl-4">
                        {section.items.map((item) => {
                            const href = `/docs/${item.slug}`;
                            const active = pathname === href;

                            return (
                                <li key={item.slug} className="relative">
                                    {active && (
                                        <motion.span
                                            layoutId="docs-sidebar-indicator"
                                            className="absolute -left-[17px] top-0.5 bottom-0.5 w-[2px] rounded-full bg-violet-400"
                                            transition={{
                                                duration: 0.25,
                                                ease: "easeOut",
                                            }}
                                        />
                                    )}
                                    <Link
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`block text-sm py-1.5 px-3 rounded-lg transition-colors ${
                                            active
                                                ? "text-violet-300"
                                                : "text-neutral-400 hover:text-neutral-100"
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </>
    );

    return (
        <>
            {/* ── Versión desktop — sidebar fijo lateral (a partir de "md") ── */}
            <aside className="hidden md:flex w-56 shrink-0 flex-col gap-6 px-8 pt-24 sticky top-0 self-start h-dvh overflow-y-auto border-r border-neutral-50/10">
                {navList}
            </aside>

            {/* ── Versión móvil — botón + desplegable (por debajo de "md") ── */}
            <div className="md:hidden flex flex-col gap-3 w-full sticky top-[var(--navbar-height)] z-30 backdrop-blur-md border-b border-neutral-50/10">
                <button
                    onClick={() => setMobileOpen((o) => !o)}
                    className="w-full flex items-center gap-2 px-6 py-3 text-sm text-neutral-300 cursor-pointer hover:text-neutral-100 transition-colors"
                >
                    <Equal className="w-4 h-4 shrink-0" />
                    {/* Indica en qué sección de la documentación está el usuario */}
                    <span className="flex-1 text-left">
                        {activeSection && (
                            <span className="text-neutral-500">
                                {activeSection.section}{" "}
                                <span className="text-neutral-600">/</span>{" "}
                            </span>
                        )}
                        {activeItem?.label ?? "Documentation"}
                    </span>
                    <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${
                            mobileOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {/* Panel desplegable con la navegación completa de las docs */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="overflow-hidden"
                        >
                            <div className="flex flex-col gap-6 px-6 pb-6 pt-1 max-h-[60vh] overflow-y-auto">
                                {navList}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
