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

    const handlePointerDown = useCallback(
        (e) => {
            isDragging.current = true;
            startX.current = e.clientX;
            startValue.current = value;
            e.target.setPointerCapture(e.pointerId);
        },
        [value],
    );

    const handlePointerMove = useCallback(
        (e) => {
            if (!isDragging.current) return;
            const dx = e.clientX - startX.current;
            const delta = Math.round(dx / sensitivity);
            onChange(clamp(startValue.current + delta));
        },
        [onChange, sensitivity, min, max],
    );

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
        >
            {value}
        </span>
    );
}

export function BooleanToken({ value, onChange }) {
    return (
        <span
            onClick={() => onChange(!value)}
            title="Click to toggle"
            className={`cursor-pointer p-0.5 bg-emerald-300/15 rounded-sm hover:bg-emerald-200/20 transition-colors ${
                value
                    ? "text-emerald-300"
                    : "text-red-400"
            }`}
        >
            {String(value)}
        </span>
    );
}
