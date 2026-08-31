// src/hooks/useCopyToClipboard.js
"use client";

import { useState, useCallback, useRef } from "react";

/**
 * Hook que centraliza la lógica de "copiar al portapapeles + feedback visual".
 * Devuelve el estado `copied` (true durante 2s tras copiar) y la función `copy`.
 *
 * @param {number} resetDelay - ms que dura el estado "copied" antes de volver a false
 */
export function useCopyToClipboard(resetDelay = 2000) {
    // Estado que indica si el contenido acaba de copiarse (para mostrar feedback)
    const [copied, setCopied] = useState(false);

    // Guardamos el timeout en un ref para poder cancelarlo si se copia varias veces seguidas
    const timeoutRef = useRef(null);

    const copy = useCallback((text) => {
        // Copiamos el texto al portapapeles usando la Clipboard API nativa
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);

            // Si ya había un timeout pendiente de una copia anterior, lo cancelamos
            clearTimeout(timeoutRef.current);

            // Volvemos al estado normal pasado el tiempo indicado
            timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
        });
    }, [resetDelay]);

    return { copied, copy };
}