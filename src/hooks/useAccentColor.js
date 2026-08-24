"use client";

import { useEffect } from "react";
import { useRenderSettings } from "@/lib/renderSettings";

function hexToHue(hex) {
    hex = hex.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let h = 0;

    if (max !== min) {
        const d = max - min;

        switch (max) {
            case r:
                h = ((g - b) / d) % 6;
                break;

            case g:
                h = (b - r) / d + 2;
                break;

            case b:
                h = (r - g) / d + 4;
                break;
        }

        h *= 60;

        if (h < 0) h += 360;
    }

    return Math.round(h);
}

export default function useAccentColor() {
    const tintColor = useRenderSettings((state) => state.ascii.tintColor);

    const setSettings = useRenderSettings((state) => state.setSettings);

    const currentAccent = useRenderSettings((state) => state.ui.accentColor);

    useEffect(() => {
        const hue = hexToHue(tintColor);

        // SOLO cambia el tono
        const accentColor = `hsl(${hue} 55% 49% / 1)`;

        document.documentElement.style.setProperty("--accent", accentColor);

        if (currentAccent !== accentColor) {
            setSettings("ui", {
                accentColor,
            });
        }
    }, [tintColor, setSettings]);
}
