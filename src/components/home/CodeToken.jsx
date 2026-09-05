// src/components/home/CodeToken.jsx
"use client";

import { useRef, useCallback } from "react";

function startDrag(onMove, onEnd) {
    document.addEventListener("pointermove", onMove);

    const onUp = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointercancel", onUp);
        onEnd?.();
    };

    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
}

export function DragNumberToken({
    value,
    onChange,
    min = 6,
    max = 20,
    sensitivity = 8,
}) {
    // Guardamos value/onChange/min/max en un ref para leer siempre la versión
    // más reciente dentro de los listeners de document, sin recrearlos en cada render
    const stateRef = useRef({ value, onChange, min, max });
    stateRef.current = { value, onChange, min, max };

    const clamp = (v, min, max) => Math.min(max, Math.max(min, Math.round(v)));

    const handlePointerDown = useCallback((e) => {
        // Solo prevenimos el default en ratón — en touch dejamos que el navegador
        // decida si es scroll o no, y nos apoyamos en touch-action + el umbral
        const isTouch = e.pointerType === "touch";
        if (!isTouch) e.preventDefault();

        const startX = e.clientX;
        const { value: startValue, min, max } = stateRef.current;

        // No consideramos que hay drag real hasta superar unos pocos px de movimiento
        let moved = false;

        if (!isTouch) {
            document.body.style.cursor = "ew-resize";
            document.body.style.userSelect = "none";
        }

        startDrag(
            (ev) => {
                const dx = ev.clientX - startX;

                // Umbral: por debajo de 2px de movimiento no hacemos nada todavía,
                // así un simple tap/click no dispara ningún cambio de valor
                if (!moved && Math.abs(dx) > 2) moved = true;
                if (!moved) return;

                const delta = Math.round(dx / sensitivity);
                stateRef.current.onChange(clamp(startValue + delta, min, max));
            },
            () => {
                document.body.style.cursor = "";
                document.body.style.userSelect = "";
            }
        );
    }, [sensitivity]);

    return (
        <span
            onPointerDown={handlePointerDown}
            title="Drag to change"
            className="cursor-ew-resize select-none text-emerald-300 touch-none p-0.5 bg-emerald-300/15 rounded-sm hover:bg-emerald-200/20 transition-colors"
            style={{ touchAction: "none" }} // Evita el scroll táctil mientras arrastramos
        >
            {value.toFixed(1)}
        </span>
    );
}

export function BooleanToken({ value, onChange }) {
    return (
        <span
            onClick={() => onChange(!value)}
            title="Click to toggle"
            className={`cursor-pointer p-0.5 bg-emerald-300/15 rounded-sm hover:bg-emerald-200/20 transition-colors ${
                value ? "text-emerald-300" : "text-red-400"
            }`}
        >
            {String(value)}
        </span>
    );
}
