// src/components/home/SplashScreen.jsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import DotAnimation from "../lab/DotAnimation/DotAnimation";
import TextType from "../ui/TextType";

/**
 * Cortinilla de entrada — NO bloquea la carga de nada por debajo.
 * Se monta en paralelo al resto de la página (el Hero sigue montándose
 * y cargando su demo 3D exactamente al mismo tiempo, por detrás),
 * y solo se encarga de su propia animación de salida tras un tiempo fijo.
 *
 * Timeline (con TOTAL_DURATION = 2000ms):
 *   0ms     → título visible, opaco
 *   1000ms  → el título empieza a desvanecerse (fade-out, 500ms)
 *   1500ms  → el título ya es invisible, el FONDO empieza a desvanecerse (400ms)
 *   1900ms  → todo desvanecido → se desmonta el componente, dejando ver el Hero
 */

const titlePlayDuration = 1000;
const bgPlayDuration = 1800;
const endAnimationDuration = 2200;

export function SplashScreen() {
    // Controla si el título está visible o ya en su fade-out
    const [titleVisible, setTitleVisible] = useState(true);

    // Controla si el fondo completo está visible o ya en su fade-out
    const [bgVisible, setBgVisible] = useState(true);

    // Controla si la cortinilla sigue montada en el DOM
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        const titleTimer = setTimeout(() => {
            setTitleVisible(false);
        }, titlePlayDuration);
        const bgTimer = setTimeout(() => {
            setBgVisible(false);
        }, bgPlayDuration);
        const unmountTimer = setTimeout(() => {
            setMounted(false);
        }, endAnimationDuration);

        return () => {
            clearTimeout(titleTimer);
            clearTimeout(bgTimer);
            clearTimeout(unmountTimer);
        };
    }, []);

    return (
        <AnimatePresence>
            {mounted && (
                <motion.div
                    // El fade del FONDO se controla con las props de animate/exit
                    // de este mismo elemento raíz — bgVisible pasa a false
                    // y motion anima la opacidad de 1 a 0 automáticamente
                    animate={{ opacity: bgVisible ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-999 flex items-center justify-center bg-[#0a0a0a]"
                >
                    {/* El fade del TÍTULO es independiente y más rápido que el del fondo */}
                    <motion.h1
                        initial={{ opacity: 0, transition: { duration: 0.25 } }}
                        animate={{ opacity: titleVisible ? 1 : 0 }}
                        transition={{ duration: 0.75, ease: "easeInOut" }}
                        className="font-semibold tracking-tight text-neutral-50 flex flex-col items-center"
                    >
                        {/* Asthree React
                        <span className="tracking-widest text-neutral-400 text-lg -mt-2">
                            <DotAnimation />
                        </span> */}
                        <TextType text={"Asthree React"} loop={false} cursorCharacter="_" variableSpeed={{min: 30, max: 110}} cursorBlinkDuration={"0.4"}/>
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
