import { useRenderSettings } from "@/lib/renderSettings";
import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import React, { useState } from "react";

function ResetOrbitButton() {
    const { camera, resetProperty } = useRenderSettings();
    const [rotating, setRotating] = useState(false);

    const defaults = {
        theta: 0,
        phi: 1.5,
        radius: 4.5,
    };

    // estado derivado (NO useState)
    const isDirty =
        camera.orbit.theta !== defaults.theta ||
        camera.orbit.phi !== defaults.phi ||
        camera.orbit.radius !== defaults.radius;

    const handleReset = () => {
        if (rotating) return;
        setRotating(true);
        const t = setTimeout(() => {
            setRotating(false);
            resetProperty("camera", "orbit");
        }, 500); // duración del spin
        return () => clearTimeout(t);
    };

    const text = "Grab It! ->";

    return (
        <>
            <Button
                onPress={handleReset}
                className={`
                    backdrop-blur-md min-[510px]:top-0 top-4 border border-neutral-50/10 transition-all duration-300 pointer-events-auto
                    ${isDirty ? "scale-100" : "scale-0 pointer-events-none"}
                    ${rotating ? "animate-[spin-once-left_0.5s_ease]" : ""}`}
                size="lg"
                variant="danger-soft"
                isIconOnly
                aria-label="Reset orbit"
            >
                <ArrowsRotateLeft className="w-5 h-5" />
            </Button>
            <span
                className={`absolute hidden min-[510px]:block transition-all duration-300 top-16 whitespace-nowrap pointer-events-auto
                    ${!isDirty ? "scale-100" : "scale-0 pointer-events-none"}`}
                style={{
                    fontFamily: "monospace",
                }}
            >
                {text}
            </span>
        </>
    );
}

export default ResetOrbitButton;
