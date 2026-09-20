// src/lib/ScrollContainerContext.js
"use client";

import { createContext, useContext } from "react";

/**
 * Contexto que expone el elemento DOM que hace scroll en la sección de docs.
 * Antes de mover el scroll al div del layout, TableOfContents asumía que
 * ese elemento era siempre `window` — ahora puede ser cualquier contenedor,
 * así que lo pasamos explícitamente en vez de hardcodear `window` dentro del hook.
 */
const ScrollContainerContext = createContext(null);

export function ScrollContainerProvider({ containerRef, children }) {
    return (
        <ScrollContainerContext.Provider value={containerRef}>
            {children}
        </ScrollContainerContext.Provider>
    );
}

/**
 * Devuelve el ref del contenedor de scroll actual, o null si no hay
 * ninguno registrado (en cuyo caso el consumidor debería caer a `window`
 * como comportamiento por defecto, para no romper otros usos del componente
 * fuera de /docs).
 */
export function useScrollContainer() {
    return useContext(ScrollContainerContext);
}