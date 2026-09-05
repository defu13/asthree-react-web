// src/components/home/CodeToken.jsx
"use client";

import { useRef, useCallback } from "react";

export function DragNumberToken({
    value,
    onChange,
    min = 6,
    max = 20,
    sensitivity = 8,
}) {
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startValue = useRef(value);

    const clamp = (v) => Math.min(max, Math.max(min, Math.round(v)));

    // Al presionar (ratón o dedo): iniciamos el drag y capturamos el puntero
    const handlePointerDown = useCallback(
        (e) => {
            isDragging.current = true;
            startX.current = e.clientX;
            startValue.current = value;

            // setPointerCapture asegura que sigamos recibiendo pointermove
            // aunque el dedo/cursor salga del elemento durante el arrastre
            e.target.setPointerCapture(e.pointerId);
        },
        [value],
    );

    // Mientras se mueve el puntero: calculamos el nuevo valor según el desplazamiento horizontal
    const handlePointerMove = useCallback(
        (e) => {
            if (!isDragging.current) return;

            // Bloqueamos el comportamiento nativo del navegador (scroll táctil)
            // mientras estamos arrastrando — esto es lo que evita el conflicto en móvil
            e.preventDefault();

            const dx = e.clientX - startX.current;
            const delta = Math.round(dx / sensitivity);
            onChange(clamp(startValue.current + delta));
        },
        [onChange, sensitivity, min, max],
    );

    // Al soltar: terminamos el drag y liberamos la captura del puntero
    const handlePointerUp = useCallback((e) => {
        isDragging.current = false;
        e.target.releasePointerCapture(e.pointerId);
    }, []);

    return (
        <span
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            title="Drag to change"
            className="cursor-ew-resize select-none text-emerald-300 touch-none p-0.5 bg-emerald-300/15 rounded-sm hover:bg-emerald-200/20 transition-colors"
            style={{touchAction: "none"}} // Evita el scroll táctil mientras arrastramos
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
