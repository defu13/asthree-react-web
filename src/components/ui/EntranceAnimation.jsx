// src/components/docs/DocsAnimatedWrapper.jsx
"use client";

import { AnimatePresence, motion } from "motion/react";

/**
 * Wrapper de animación puro — no conoce nada sobre MDX ni sobre cómo
 * se genera el contenido, solo recibe "children" ya resueltos y los anima.
 *
 * Al ser un Client Component simple (sin lógica async), puede convivir
 * sin problemas con el Server Component asíncrono que renderiza el MDX,
 * porque aquí el MDX ya llega como children compilados, no se genera aquí.
 */
export function EntranceAnimation({ children, className }) {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
