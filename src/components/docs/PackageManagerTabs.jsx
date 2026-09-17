// src/components/docs/PackageManagerTabs.jsx
"use client";

import { usePackageManagerStore } from "@/lib/packageManagerStore";
import { motion } from "motion/react";

// Opciones disponibles — el orden aquí es el orden en que se muestran las pestañas
const MANAGERS = [
    { id: "npm", label: "npm" },
    { id: "yarn", label: "yarn" },
    { id: "pnpm", label: "pnpm" },
];

/**
 * Selector de gestor de paquetes. No renderiza ningún comando por sí mismo
 * — solo cambia el estado global (usePackageManagerStore), que es leído
 * por todos los <InstallSnippet> de la página para traducir sus comandos.
 *
 * Se coloca una única vez en la página (normalmente antes del primer
 * InstallSnippet), y afecta a todos los snippets que aparezcan después.
 */
export function PackageManagerTabs() {
    const manager = usePackageManagerStore((s) => s.manager);
    const setManager = usePackageManagerStore((s) => s.setManager);

    return (
        <div className="inline-flex items-center rounded-lg border border-neutral-50/10 bg-neutral-950/60 p-1 not-prose mb-3">
            {MANAGERS.map(({ id, label }) => {
                const active = manager === id;
                return (
                    <button
                        key={id}
                        type="button"
                        onClick={() => setManager(id)}
                        className={`relative cursor-pointer px-3 py-1 rounded-md font-mono transition-colors text-sm ${
                            active
                                ? "text-violet-300"
                                : "text-neutral-500 hover:text-neutral-200"
                        }`}
                    >
                        {active && (
                            <motion.span
                                layoutId="package-manager-active-bg"
                                className="absolute inset-0 rounded-md bg-violet-500/15"
                                transition={{ duration: 0.25, ease: "easeOut" }}
                            />
                        )}
                        <span className="relative z-10">{label}</span>
                    </button>
                );
            })}
        </div>
    );
}
