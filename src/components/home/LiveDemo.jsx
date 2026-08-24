// src/components/home/LiveDemo.jsx
"use client";

import { AsthreeRender } from "@defu13/asthree-react";

// import dynamic from "next/dynamic";

// const AsthreeRender = dynamic(
//     () => import("@defu13/asthree-react").then((m) => m.AsthreeRender),
//     { ssr: false }
// );

export default function LiveDemo({ settings, className }) {
    return (
        <div className={className}>
            <AsthreeRender
                model="/models/astronaut.glb"
                hdr="/hdr/studio.hdr"
                settings={settings}
                enableOrbit={false}
                enableZoom={false}
            />
        </div>
    );
}