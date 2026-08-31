// src/components/docs/MdxPre.jsx
"use client";

import { useRef } from "react";
import { CopyButton } from "@/components/ui/CopyButton";

/**
 * Reemplazo del <pre> que usa MDX para bloques de código.
 * Envuelve el contenido original (ya coloreado por Shiki) y añade
 * un botón de copiar en la esquina superior derecha.
 *
 * Extraemos el texto plano leyendo el contenido del <pre> vía ref,
 * ya que Shiki inyecta <span> con estilos y no tenemos el string crudo aquí.
 */
export function MdxPre({ children, ...props }) {
    // Referencia al <pre> real, para poder leer su textContent al copiar
    const preRef = useRef(null);

    // Función que se ejecuta al pulsar el botón: lee el texto visible del bloque
    const getCode = () => preRef.current?.textContent ?? "";

    return (
        <div className="relative group">
            {/* Botón posicionado en la esquina superior derecha del bloque de código */}
            <CopyButton
                text={getCode()}
                className="absolute top-3 right-3 z-10 bg-neutral-900/80 rounded-md p-1.5 border border-neutral-50/10"
            />
            <pre ref={preRef} {...props}>
                {children}
            </pre>
        </div>
    );
}