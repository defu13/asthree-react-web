import { useState } from "react";
import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export default function ResetButton({onFinish, onReset, children = false }) {
    const [rotating, setRotating] = useState(false);

    const handleClick = () => {
        if (rotating) return;

        setRotating(true);
        onReset?.();

        const t = setTimeout(() => {
            setRotating(false);
            onFinish?.(); // avisar que la animación ha terminado
        }, 500); // misma duración que la animación

        return () => clearTimeout(t);
    };

    return (
        <Button aria-label="Reset settings" isIconOnly={!children} size="sm" variant="danger-soft" onClick={handleClick} className="flex items-center border border-neutral-50/10 backdrop-blur-md">
            <span
                className={`inline-block ${
                    rotating ? "animate-[spin-once-left_0.5s_ease]" : ""
                }`}
            >
                <ArrowsRotateLeft />
            </span>
            {children}
        </Button>
    );
}
