// src/lib/ScrollContainerContext.js
"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";

// Contexto para LEER el contenedor activo — su valor cambia cuando se navega
const ScrollContainerValueContext = createContext(null);

// Contexto para EL SETTER — nunca cambia de identidad, evita que el
// callback ref de useRegisterScrollContainer se recree en cada render
const ScrollContainerSetterContext = createContext(null);

export function ScrollContainerProvider({ children }) {
    const [container, setContainer] = useState(null);

    return (
        // setContainer es estable de por vida (garantía de useState),
        // así que este Provider nunca necesita re-renderizarse por sí mismo
        <ScrollContainerSetterContext.Provider value={setContainer}>
            {/* Este sí cambia, pero solo afecta a quien LEE, no a quien registra */}
            <ScrollContainerValueContext.Provider value={container}>
                {children}
            </ScrollContainerValueContext.Provider>
        </ScrollContainerSetterContext.Provider>
    );
}

/**
 * Para componentes que LEEN el contenedor activo (Navbar, TOC).
 */
export function useScrollContainer() {
    return useContext(ScrollContainerValueContext);
}

/**
 * Para páginas que REGISTRAN su propio contenedor de scroll (Hero, DocsLayout).
 * El callback ref ahora depende únicamente del setter, que es estable
 * de por vida — nunca se recrea, así que React nunca dispara el ciclo
 * de cleanup/re-attach que causaba el bucle.
 */
export function useRegisterScrollContainer() {
    const setContainer = useContext(ScrollContainerSetterContext);

    return useCallback((node) => {
        setContainer?.(node);
    }, [setContainer]);
}