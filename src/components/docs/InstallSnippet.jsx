// src/components/docs/InstallSnippet.jsx
"use client";

import { usePackageManagerStore, translateInstallCommand } from "@/lib/packageManagerStore";
import { CopyButton } from "@/components/ui/CopyButton";

/**
 * Bloque de comando de instalación que se traduce en vivo según el
 * gestor de paquetes activo (leído del store global compartido con
 * PackageManagerTabs). Reutiliza CopyButton para copiar el comando
 * ya traducido, no el original en formato npm.
 *
 * @param {string} command - comando escrito en formato npm, ej: "npm i react react-dom"
 */
export function InstallSnippet({ command }) {
    // Leemos el gestor activo — si cambia en PackageManagerTabs,
    // este componente se re-renderiza automáticamente con el comando correcto
    const manager = usePackageManagerStore((s) => s.manager);

    const translated = translateInstallCommand(command, manager);

    return (
        <div className="relative group not-prose">
            <pre className="rounded-xl border border-neutral-50/10 bg-neutral-950/60 px-4 py-3 overflow-x-auto">
                <code className="font-mono text-sm text-neutral-200">
                    <span className="text-neutral-600">$ </span>
                    {translated}
                </code>
            </pre>
            {/* Copiamos el comando YA TRADUCIDO, no el original en npm */}
            <CopyButton
                text={translated}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900/80 rounded-md p-1.5 border border-neutral-50/10"
            />
        </div>
    );
}