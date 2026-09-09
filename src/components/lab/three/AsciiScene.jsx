"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { Environment } from "@react-three/drei";
import { Vector2 } from "three";
import { AsciiEffect } from "./AsciiEffect";
import Model from "./Model";
import { useRenderSettings } from "@/lib/renderSettings";
import CameraController from "./CameraController";
import { useCaptureStore } from "@/lib/captureStore";
import { getLivePreview } from "@/lib/livePreview";

function SceneWithDelayedComposer({ resolution, onReady }) {
    const { gl } = useThree();
    const [composerReady, setComposerReady] = useState(false);
    const frameCount = useRef(0);
    const { lights } = useRenderSettings();

    useFrame(() => {
        frameCount.current++;
        if (frameCount.current >= 3 && !composerReady) {
            const t = setTimeout(() => {
                try {
                    const context = gl.getContext();
                    if (context && !context.isContextLost?.()) {
                        setComposerReady(true);
                        onReady?.();
                    }
                } catch (e) {}
            }, 100);
            return () => clearTimeout(t);
        }
    });

    return (
        <>
            <Environment files="/hdr/studio.hdr" background={false} />
            <LiveAmbientLight ambient={lights.ambient} />
            <LiveDirectionalLight
                lightKey="directional1"
                light={lights.directional1}
            />
            <LiveDirectionalLight
                lightKey="directional2"
                light={lights.directional2}
            />
            <Suspense fallback={null}>
                <Model />
            </Suspense>
            {composerReady && (
                <EffectComposer>
                    <AsciiEffect
                        characterSet="terminal"
                        resolution={resolution}
                    />
                </EffectComposer>
            )}
        </>
    );
}

function CanvasRefCapture({ onCanvas }) {
    const { gl } = useThree();
    useEffect(() => {
        onCanvas?.(gl.domElement);
    }, [gl, onCanvas]);
    return null;
}

/**
 * Envuelve una directional light y actualiza su posición/intensidad
 * en cada frame leyendo primero el preview en vivo, cayendo al valor
 * persistente si no hay override activo. Evita que mover el slider
 * dispare un re-render de React sobre el elemento <directionalLight>.
 */
function LiveDirectionalLight({ lightKey, light }) {
    const ref = useRef(null);

    useFrame(() => {
        if (!ref.current) return;

        const x =
            getLivePreview(`lights.${lightKey}.position.0`) ??
            light.position[0];
        const y =
            getLivePreview(`lights.${lightKey}.position.1`) ??
            light.position[1];
        const z =
            getLivePreview(`lights.${lightKey}.position.2`) ??
            light.position[2];
        const intensity =
            getLivePreview(`lights.${lightKey}.intensity`) ?? light.intensity;

        ref.current.position.set(x, y, z);
        ref.current.intensity = intensity;
    });

    return <directionalLight ref={ref} />;
}

function LiveAmbientLight({ ambient }) {
    const ref = useRef(null);

    useFrame(() => {
        if (!ref.current) return;
        ref.current.intensity = getLivePreview("lights.ambient") ?? ambient;
    });

    return <ambientLight ref={ref} />;
}

export default function AsciiScene({
    className,
    enableOrbit = true,
    enableZoom = true,
    width = "100%",
    height = "100%",
    onCanvasReady,
}) {
    const containerRef = useRef(null);
    const [mousePos] = useState(() => new Vector2(0, 0));
    const [resolution] = useState(() => new Vector2(1920, 1080));
    const ascii = useRenderSettings((s) => s.ascii);
    const camera = useRenderSettings((s) => s.camera);

    const { setCanvas } = useCaptureStore();

    const sizeFactor = Math.pow(ascii.glowSize / 2, 1.2);
    const opacityFactor = Math.pow(ascii.glowIntensity / 2, 1.1);

    // blur
    const blurBig = 10 * sizeFactor;
    const blurSmall = 5 * sizeFactor;

    // alpha (B3 = baseline)
    const normalized = (ascii.glowIntensity - 1) / 9; // 0–1
    const alpha = Math.round(179 * normalized) // 179 = 0xB3
        .toString(16)
        .padStart(2, "0")
        .toUpperCase();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateResolution = () => {
            const rect = container.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            resolution.set(
                (rect.width || 1920) * dpr,
                (rect.height || 1080) * dpr,
            );
        };

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = rect.height - (e.clientY - rect.top);
            mousePos.set(x, y);
        };

        updateResolution();
        const ro = new ResizeObserver(updateResolution);
        ro.observe(container);
        container.addEventListener("mousemove", handleMouseMove);

        return () => {
            ro.disconnect();
            container.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mousePos, resolution]);

    return (
        <div
            ref={containerRef}
            data-model-canvas-container
            className={className}
            style={{
                width: width,
                height: height,
                cursor: enableOrbit ? "grab" : "default",
            }}
        >
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                style={{
                    filter: ascii.glow
                        ? `drop-shadow(${ascii.tintColor}${alpha} 0px 0px ${blurBig}px) 
                    drop-shadow(${ascii.tintColor}${alpha} 0px 0px ${blurSmall}px)`
                        : "none",
                }}
                dpr={Math.min(
                    typeof window !== "undefined" ? window.devicePixelRatio : 1,
                    1.5,
                )}
                camera={{
                    position: [
                        camera.position.x,
                        camera.position.y,
                        camera.position.z,
                    ],
                    fov: camera.fov,
                }}
                onCreated={({ gl }) => {
                    gl.toneMappingExposure = 0.6;

                    const handleContextLost = (event) => {
                        event.preventDefault();
                        console.warn(
                            "WebGL context lost. Attempting to restore...",
                        );
                    };

                    const handleContextRestored = () => {
                        console.log("WebGL context restored");
                    };

                    gl.domElement.addEventListener(
                        "webglcontextlost",
                        handleContextLost,
                    );
                    gl.domElement.addEventListener(
                        "webglcontextrestored",
                        handleContextRestored,
                    );

                    return () => {
                        gl.domElement.removeEventListener(
                            "webglcontextlost",
                            handleContextLost,
                        );
                        gl.domElement.removeEventListener(
                            "webglcontextrestored",
                            handleContextRestored,
                        );
                    };
                }}
            >
                <CanvasRefCapture onCanvas={setCanvas} />
                <CameraController
                    containerRef={containerRef}
                    enableZoom={enableZoom}
                    enableOrbit={enableOrbit}
                />
                <SceneWithDelayedComposer resolution={resolution} />
            </Canvas>
        </div>
    );
}
