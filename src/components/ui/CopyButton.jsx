// src/components/ui/CopyButton.jsx
"use client";

import { Check, Copy } from "@gravity-ui/icons";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

/**
 * Botón de copiar genérico con feedback visual (icono check + 2s).
 * Se usa tanto en InstallCommand como en los bloques de código de las docs.
 *
 * @param {string} text - Texto que se copiará al portapapeles
 * @param {string} className - Clases extra para posicionar/estilizar el botón según el contexto
 */
export function CopyButton({ text, className = "" }) {
    // Reutilizamos el hook con la lógica de copiar + feedback temporal
    const { copied, copy } = useCopyToClipboard();

    return (
        <button
            type="button"
            onClick={() => copy(text)}
            aria-label="Copy to clipboard"
            className={`cursor-pointer shrink-0 text-neutral-500 hover:text-neutral-200 transition-colors border border-neutral-50/10 hover:border-neutral-50/20 rounded-lg ${className}`}
        >
            {/* Mostramos el check mientras copied=true, si no el icono de copiar */}
            {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
                <Copy className="w-3.5 h-3.5" />
            )}
        </button>
    );
}