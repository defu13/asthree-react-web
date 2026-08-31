// src/components/home/LiveDemo.jsx
"use client";

import { AsthreeRender } from "@defu13/asthree-react";

export default function LiveDemo({ settings, preset, className }) {
    return (
        <div className={className}>
            <AsthreeRender
                model="/models/astronaut.glb"
                hdr="/hdr/studio.hdr"
                preset={preset}
                settings={preset ? undefined : settings}
                enableOrbit={false}
                enableZoom={false}
            />
        </div>
    );
}