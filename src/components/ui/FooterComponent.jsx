import React from "react";
import ShinyText from "../lab/ShinyText";

function FooterComponent({ className }) {
    return (
        <footer
            className={`flex flex-col text-neutral-600 truncate font-mono tracking-tighter text-sm ${className}`}
        >
            <a
                href="https://yubaldefuente.vercel.app/"
                target="_blank"
                title="Yubal De Fuente - Portfolio"
                className="flex w-fit myLink hover:underline"
            >
                <ShinyText
                    className="truncate"
                    speed={2.5}
                    delay={1}
                    color="#525252"
                    shineColor="#ffffff"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                    disabled={false}
                >
                    © 2026 Yubal De Fuente.
                </ShinyText>
            </a>
            <span
                className="truncate"
            >
                Hecho con pasión y dedicación {"<3"}
            </span>
        </footer>
    );
}

export default FooterComponent;
