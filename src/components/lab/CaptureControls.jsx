// components/CaptureControls.jsx
"use client";

import { Camera, Video } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export function CaptureControls({ onImage, onVideo, recording, progress, className }) {
    return (
        <div className={`flex gap-2 pointer-events-auto transition-discrete duration-300 ${className}`}>
            {/* Botón imagen */}
            <Button
                size="sm"
                variant="outline"
                className="backdrop-blur-md border border-neutral-50/10 rounded-xl"
                onPress={onImage}
                isDisabled={recording}
            >
                <Camera className="w-3.5 h-3.5" />
                Screenshot
            </Button>

            {/* Botón vídeo con barra de progreso */}
            <div className="relative overflow-hidden rounded-xl">
                {/* Barra de progreso como fondo animado */}
                {recording && (
                    <>
                        {/* Fondo relleno izquierda */}
                        <div
                            className="absolute inset-0 bg-red-500/15 pointer-events-none z-20"
                            style={{
                                width: `${progress * 100}%`,
                            }}
                        />
                        {/* Línea vertical de corte */}
                        <div
                            className="absolute top-0 bottom-0 w-px bg-red-500/60 pointer-events-none z-20"
                            style={{
                                left: `${progress * 100}%`,
                            }}
                        />
                    </>
                )}
                <Button
                    size="sm"
                    variant="outline"
                    className={`relative backdrop-blur-md border rounded-xl z-10 transition-colors ${
                        recording
                            ? "border-red-500/40 text-red-300"
                            : "border-neutral-50/10"
                    }`}
                    onPress={onVideo}
                >
                    <Video
                        className={`w-3.5 h-3.5 ${recording ? "text-red-400" : ""}`}
                    />
                    {recording
                        ? `Recording ${Math.round(progress * 10)}s / 10s`
                        : "Record 10s"}
                </Button>
            </div>
        </div>
    );
}
