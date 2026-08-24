// src/components/home/Hero.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import LiveDemo from "./LiveDemo";
import { CodeWindow } from "./CodeWindow";
import { DragNumberToken, BooleanToken } from "./CodeToken";
import InstallCommand from "./InstallCommand";
import Grainient from "./Grainient";
import { ColorPickerToken } from "./ColorPickerToken";

const CELL_SIZE_OPTIONS = [6, 9, 12, 16, 20];
const COLOR_OPTIONS = ["#5C3FF2", "#FF3366", "#22C55E", "#06B6D4", "#F97316"];

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

export default function Hero() {
    const [cellSize, setCellSize] = useState(9);
    const [tintColor, setTintColor] = useState("#5C3FF2");
    const [autoRotate, setAutoRotate] = useState(true);
    const [glow, setGlow] = useState(true);

    // Merge profundo manual solo en las secciones que tocamos
    const settings = {
        ...BASE_SETTINGS,
        ascii: { ...BASE_SETTINGS.ascii, cellSize, tintColor, glow },
        model: { ...BASE_SETTINGS.model, autoRotate },
    };

    return (
        <section className="relative w-full min-h-screen flex items-center overflow-hidden">
            <LiveDemo settings={settings} className="absolute inset-0 -z-10" />
            <div className="absolute inset-0 -z-30 opacity-75">
                <Grainient
                    blendSoftness={0.4}
                    color1={tintColor}
                    color2="#0a0a0a"
                    color3="#0a0a0a"
                    grainAmount={0.05}
                    saturation={0.4}
                    grainScale={1.5}
                    timeSpeed={0.3}
                />
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-10 items-center pt-14">
                <div className="flex flex-col gap-5">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                        3D models, rendered as ASCII.
                    </h1>
                    <p className="text-neutral-400 max-w-md">
                        A React component that turns any{" "}
                        <code className="font-mono text-sm">.glb</code> model
                        into a real-time, customizable ASCII render.
                    </p>

                    <InstallCommand />

                    <div className="flex gap-3 mt-2">
                        <Link
                            href="/docs"
                            className="text-sm px-4 py-2 rounded-lg bg-violet-500/15 text-violet-300 border border-violet-400/20 hover:bg-violet-500/25 transition-colors"
                        >
                            Read the docs
                        </Link>
                        <Link
                            href="/lab"
                            className="text-sm px-4 py-2 rounded-lg border border-neutral-50/10 hover:bg-neutral-800 transition-colors"
                        >
                            Open the Lab
                        </Link>
                    </div>
                </div>

                <CodeWindow>
                    <span className="text-neutral-500">import</span>{" "}
                    {"{ AsthreeRender }"}{" "}
                    <span className="text-neutral-500">from</span>{" "}
                    <span className="text-emerald-300">&quot;@defu13/asthree-react&quot;</span>;
                    {"\n\n"}
                    <span className="text-sky-300">&lt;AsthreeRender</span>
                    {"\n  "}model=<span className="text-emerald-300">&quot;/models/model.glb&quot;</span>
                    {"\n  "}hdr=<span className="text-emerald-300">&quot;/hdr/studio.hdr&quot;</span>
                    {"\n  "}settings={"{{"}
                    {"\n    "}ascii: {"{"}
                    {"\n      "}cellSize: <DragNumberToken value={cellSize} onChange={setCellSize} min={6} max={20} />,
                    {"\n      "}tintColor: <ColorPickerToken value={tintColor} onChange={setTintColor} />,
                    {"\n      "}glow: <BooleanToken value={glow} onChange={setGlow} />,
                    {"\n    "}{"},"}
                    {"\n    "}model: {"{"}
                    {"\n      "}autoRotate: <BooleanToken value={autoRotate} onChange={setAutoRotate} />,
                    {"\n    "}{"},"}
                    {"\n  "}{"}}"}
                    {"\n"}
                    <span className="text-sky-300">/&gt;</span>
                    {"\n\n"}
                    <span className="text-neutral-500 text-[10px] text-right w-full block">🡤 All setting values ​​are editable.</span>
                </CodeWindow>
            </div>
        </section>
    );
}
