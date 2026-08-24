"use client";

import { useRenderSettings } from "@/lib/renderSettings";
import { AnimatePresence, motion } from "motion/react";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

export default function HydrationGate({ children }) {
    const hasHydrated = useRenderSettings((s) => s.hasHydrated);

    return (
        <AnimatePresence mode="wait">
            {!hasHydrated ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-screen h-screen flex items-center justify-center"
                >
                    <LoadingSpinner />
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-screen h-screen"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
