// src/components/docs/DocsAnimatedWrapper.jsx
"use client";

import { motion } from "motion/react";

/**
 * Wrapper de animación puro — no conoce nada sobre MDX ni sobre cómo
 * se genera el contenido, solo recibe "children" ya resueltos y los anima.
 *
 * Al ser un Client Component simple (sin lógica async), puede convivir
 * sin problemas con el Server Component asíncrono que renderiza el MDX,
 * porque aquí el MDX ya llega como children compilados, no se genera aquí.
 */
export function DocsAnimatedWrapper({ children }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="prose prose-invert max-w-none flex-1 min-w-0"
        >
            {children}
        </motion.article>
    );
}