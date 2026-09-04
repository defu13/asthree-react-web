import React from "react";
import ShinyText from "../lab/ShinyText";
import { NAV_ITEMS } from "@/lib/NavList";
import Link from "next/link";

function FooterComponent({ className = "", footerMenu = true }) {
    return (
        <footer className={`flex flex-col gap-20 ${className}`}>
            {footerMenu && (
                <div className="w-full flex flex-wrap gap-12 justify-between">
                    <div className="gap-1 flex flex-col">
                        <h1 className="w-full tracking-tight text-xl text-neutral-50">
                            Asthree React
                        </h1>
                        <span className="w-full text-neutral-500 text-xs font-mono tracking-tighter">
                            Interactive ASCII 3D rendering for React.
                        </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-xs text-neutral-500 uppercase font-mono mb-2">Navigation</span>
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={item.label}
                                className="text-sm font-mono transition-colors text-neutral-400 hover:text-neutral-200"
                                aria-label={item.label}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div className="w-full flex flex-wrap gap-1 justify-between text-neutral-400 truncate font-mono tracking-tighter text-xs">
                <span className="truncate flex gap-1.5 mr-4">
                    Created by
                    <a
                        href="https://yubaldefuente.vercel.app/"
                        target="_blank"
                        title="Yubal De Fuente - Portfolio"
                        className="flex w-fit hover:underline"
                    >
                        <ShinyText
                            className="truncate flex-1"
                            speed={2.5}
                            delay={0.5}
                            color="#a1a1a1"
                            shineColor="#ffffff"
                            spread={120}
                            direction="left"
                            yoyo={false}
                            pauseOnHover={false}
                            disabled={false}
                        >
                            yubalfdev
                        </ShinyText>
                    </a>
                    for creatives. {"<3"}
                </span>
                <span>
                    <a
                        href="https://github.com/defu13/asthree-web"
                        target="_blank"
                        title="Asthree React - GitHub"
                        className="flex w-fit myLink hover:underline"
                    >
                        © 2026 Asthree React{" • All rights reserved."}
                    </a>
                </span>
            </div>
        </footer>
    );
}

export default FooterComponent;
