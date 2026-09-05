// src/components/home/Hero.jsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LiveDemo from "./LiveDemo";
import { CodeWindow } from "./CodeWindow";
import { DragNumberToken, BooleanToken } from "./CodeToken";
import InstallCommand from "./InstallCommand";
import Grainient from "../ui/Grainient";
import { ColorPickerToken } from "./ColorPickerToken";
import { HERO_PRESETS, PRESET_LABELS } from "./presets";
import { DropdownToken } from "./DropdownToken";
import FooterComponent from "../ui/FooterComponent";

// Objeto base completo — evita depender del merge interno del paquete
const BASE_SETTINGS = {
    camera: {
        position: { x: 0, y: 0, z: 5 },
        target: { x: 0, y: 0, z: 0 },
        fov: 50,
        orbit: {
            theta: 0, // horizontal (izq/der)
            phi: 1.5, // vertical (arriba/abajo)
            radius: 4.5, // distancia
        },
    },

    model: {
        scale: 3.5,
        position: { x: 0, y: -3.9, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        tilt: { forward: 0, left: 0 },
        autoRotate: true,
        autoRotateSpeed: 0.2,
    },

    lights: {
        ambient: 0,
        directional1: {
            position: [2, 3.5, 6],
            intensity: 3,
        },
        directional2: {
            position: [-2, 1.5, 4],
            intensity: 0.35,
        },
    },

    ascii: {
        style: "standard",
        cellSize: 9,
        invert: true,
        color: true,
        volumeShading: true,
        shadingIntensity: 0.5,
        glow: true,
        glowIntensity: 9,
        glowSize: 3,
        tintColor: "#5C3FF2",
    },

    postfx: {
        contrastAdjust: 1.5,
        brightnessAdjust: 0.2,
    },
};

const MODE_OPTIONS = [
    { value: "settings", label: "settings" },
    { value: "preset", label: "preset" },
];

const PRESET_OPTIONS = Object.entries(PRESET_LABELS).map(([value, label]) => ({
    value,
    label,
}));

export function getContrastColor(hex) {
    const cleanHex = hex.replace("#", "");

    const r = parseInt(cleanHex.slice(0, 2), 16);
    const g = parseInt(cleanHex.slice(2, 4), 16);
    const b = parseInt(cleanHex.slice(4, 6), 16);

    // Luminancia perceptual aproximada
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? "#262626" : "#e5e5e5";
}

export default function Hero() {
    const [mode, setMode] = useState("settings"); // "settings" | "preset"
    const [presetKey, setPresetKey] = useState("neon");

    const [cellSize, setCellSize] = useState(9);
    const [tintColor, setTintColor] = useState("#5C3FF2");
    const [autoRotate, setAutoRotate] = useState(true);
    const [glow, setGlow] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const activePreset = HERO_PRESETS[presetKey];

    // Merge profundo manual solo en las secciones que tocamos
    const settings = useMemo(() => {
        return {
            ...BASE_SETTINGS,
            ascii: { ...BASE_SETTINGS.ascii, cellSize, tintColor, glow },
            model: { ...BASE_SETTINGS.model, autoRotate },
        };
    }, [cellSize, tintColor, glow, autoRotate]);

    const backgroundColor =
        mode === "preset" ? activePreset.accentColor : tintColor;

    return (
        <>
            <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden md:p-6 px-6 pb-6 pt-12">
                {/* Fade top */}
                <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-black/45 to-transparent pointer-events-none -z-10 "></div>

                {/* Live demo */}
                <LiveDemo
                    settings={mode === "settings" ? settings : undefined}
                    preset={mode === "preset" ? activePreset.code : undefined}
                    className="absolute inset-0 -z-20"
                />

                {/* Background gradient */}
                <div className="absolute inset-0 -z-30 opacity-65">
                    <Grainient
                        blendSoftness={0.4}
                        color1={backgroundColor}
                        color2="#303030"
                        color3="#303030"
                        grainAmount={0.05}
                        grainAnimated={true}
                        saturation={0.4}
                        timeSpeed={0.3}
                    />
                </div>

                {/* Fade bottom */}
                <div
                    className="absolute bottom-0 left-0 w-full h-[130px] pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to top, #0a0a0a 0%, transparent 100%)",
                    }}
                />

                <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-6 md:gap-10 items-center pt-14">
                    <div className="flex flex-col gap-3 md:gap-5">
                        <h1 className="text-3xl lg:text-6xl tracking-tight leading-none font-medium">
                            Interactive ASCII 3D, for React developers
                        </h1>
                        <p className="text-neutral-400 max-w-md">
                            Turn your 3D models into interactive ASCII art. Mess
                            with the settings, experiment with the effects, and
                            find a look that feels like yours.
                        </p>

                        <InstallCommand />

                        <div className="flex gap-3">
                            <Link
                                href="/docs/introduction"
                                className={`text-sm px-4 py-2 rounded-lg font-mono font-semibold border transition-all shadow-xl`}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{
                                    filter: `${isHovered ? `drop-shadow(0 0 14px ${backgroundColor}90)` : `drop-shadow(0 0 8px ${backgroundColor}80)`}`,
                                    borderColor: backgroundColor,
                                    color: backgroundColor,
                                    backgroundColor:
                                        getContrastColor(backgroundColor),
                                }}
                            >
                                Read the docs
                            </Link>
                            <Link
                                href="/lab"
                                className="font-mono text-sm px-4 py-2 rounded-lg backdrop-blur-md border border-neutral-50/10 hover:bg-neutral-800 transition-colors shadow-xl"
                            >
                                Open the Lab
                            </Link>
                        </div>
                    </div>

                    <CodeWindow>
                        <div>
                            <span className="text-neutral-500">import</span>{" "}
                            {"{ AsthreeRender }"}{" "}
                            <span className="text-neutral-500">from</span>{" "}
                            <span className="text-emerald-300">
                                &quot;@defu13/asthree-react&quot;
                            </span>
                            ;{"\n\n"}
                            <span className="text-sky-300">
                                &lt;AsthreeRender
                            </span>
                            {"\n  "}model=
                            <span className="text-emerald-300">
                                &quot;/models/model.glb&quot;
                            </span>
                            {"\n  "}hdr=
                            <span className="text-emerald-300">
                                &quot;/hdr/studio.hdr&quot;
                            </span>
                            {"\n  "}
                            <DropdownToken
                                value={mode}
                                options={MODE_OPTIONS.filter(
                                    (o) => o.value !== mode,
                                )}
                                onChange={setMode}
                                colorClass="text-sky-300"
                                bgClass="bg-sky-300/15"
                                hoverBgClass="hover:bg-sky-200/20"
                            />
                            <span>=</span>
                            {mode === "settings" ? (
                                <>
                                    {"{{"}
                                    {"\n    "}ascii: {"{"}
                                    {"\n      "}cellSize:{" "}
                                    <DragNumberToken
                                        value={cellSize}
                                        onChange={setCellSize}
                                        min={6}
                                        max={20}
                                    />
                                    ,{"\n      "}tintColor: &quot;
                                    <ColorPickerToken
                                        value={tintColor}
                                        onChange={setTintColor}
                                    />
                                    &quot; ,{"\n      "}glow:{" "}
                                    <BooleanToken
                                        value={glow}
                                        onChange={setGlow}
                                    />
                                    ,{"\n    "}
                                    {"},"}
                                    {"\n    "}model: {"{"}
                                    {"\n      "}autoRotate:{" "}
                                    <BooleanToken
                                        value={autoRotate}
                                        onChange={setAutoRotate}
                                    />
                                    ,{"\n    "}
                                    {"},"}
                                    {"\n  "}
                                    {"}}"}
                                </>
                            ) : (
                                <>
                                    <span className="text-emerald-300">
                                        &quot;
                                        <DropdownToken
                                            value={presetKey}
                                            options={PRESET_OPTIONS}
                                            onChange={setPresetKey}
                                            colorClass="text-emerald-300"
                                            bgClass="bg-emerald-300/15"
                                            hoverBgClass="hover:bg-emerald-200/20"
                                        />
                                        &quot;
                                    </span>
                                </>
                            )}
                            {"\n"}
                            <span className="text-sky-300">/&gt;</span>
                            {"\n\n"}
                        </div>
                        <span className="text-neutral-500 text-[10px] text-right w-full block mt-auto">
                            🡤 All setting values are editable.
                        </span>
                    </CodeWindow>
                </div>
            </section>

            {/* Separator */}
            <div
                className="w-full h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, .08) 30%, rgba(255, 255, 255, .08) 70%, transparent 100%)",
                }}
            />

            {/* Footer */}
            <div className="w-full px-6">
                <FooterComponent className={"max-w-7xl mx-auto py-12"} />
            </div>
        </>
    );
}
