"use client";

import { useState } from "react";
import { Button, Popover } from "@heroui/react";
import { LayoutSideContent } from "@gravity-ui/icons";
import ResetOrbitButton from "./ResetOrbitButton";
import ResetButton from "./ResetButton";
import { useRenderSettings } from "@/lib/renderSettings";
import DotField from "./DotField";
import ShinyText from "./ShinyText";
import { PresetControls } from "./PresetControls";
import { CaptureControls } from "./CaptureControls";
import { useCaptureStore } from "@/lib/captureStore";
import FooterComponent from "../ui/FooterComponent";

export default function Sidebar({ children }) {
    const [open, setOpen] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const { reset, ascii } = useRenderSettings();
    const bgGradient = `linear-gradient(180deg, ${ascii.tintColor}4D 3%, #1f1f1f17 90%)`;
    const captureImage = useCaptureStore((s) => s.captureImage);
    const captureVideo = useCaptureStore((s) => s.captureVideo);
    const recording = useCaptureStore((s) => s.recording);
    const progress = useCaptureStore((s) => s.progress);

    return (
        <>
            {/* Sidebar */}
            <div
                className={` flex flex-col gap-4
                fixed top-0 left-0 max-w-[450px] w-full
                transition-all duration-300 z-10 p-4
                ${open ? "translate-x-0" : "-translate-x-full"}
            `}
                style={{
                    height: "calc(100vh - calc(var(--navbar-height)))",
                    marginTop: "calc(var(--navbar-height))",
                }}
            >
                {/* Tab container */}
                <div
                    style={{
                        boxShadow:
                            "0 4px 32px #00000066, inset 0 .5px #ffffff0f",
                    }}
                    className={`w-full h-full overflow-hidden border border-neutral-50/10 rounded-xl relative`}
                >
                    {/* <div
                        style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            inset: 0,
                            zIndex: 10,
                        }}
                    >
                        <DotField
                            dotRadius={1.5}
                            dotSpacing={14}
                            bulgeStrength={67}
                            glowRadius={160}
                            sparkle={false}
                            waveAmplitude={0}
                            cursorRadius={500}
                            cursorForce={0.1}
                            bulgeOnly
                            gradientFrom="rgba(255, 255, 255, 0.15)"
                            gradientTo="rgba(255, 255, 255, 0.15)"
                            glowColor="transparent"
                        />
                    </div> */}
                    <div
                        className={`w-full h-full absolute inset-0 backdrop-blur-lg`}
                        style={{
                            backgroundImage: bgGradient,
                        }}
                    />
                    <div className="z-20 w-full h-full">{children}</div>
                </div>

                {/* Preset controls */}
                <div className="flex min-w-0">
                    <PresetControls />
                </div>

                <div className="w-full flex justify-between items-end">
                    <FooterComponent />

                    {/* Reset All Button */}
                    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
                        <Button
                            size="sm"
                            variant="danger-soft"
                            className="backdrop-blur-md border border-neutral-50/10"
                            aria-label="Reset all settings"
                        >
                            Reset All
                        </Button>
                        <Popover.Content placement="top" className="border border-neutral-50/10 dark rounded-2xl">
                            <Popover.Dialog>
                                <div className="flex flex-col gap-2 items-center">
                                    <span>Sure?</span>
                                    <ResetButton
                                        onReset={reset}
                                        onFinish={() => setIsOpen(false)}
                                    >
                                        Reset
                                    </ResetButton>
                                </div>
                            </Popover.Dialog>
                        </Popover.Content>
                    </Popover>
                </div>
            </div>

            <div
                className={`flex flex-col gap-2 fixed top-0 z-20 transition-all duration-300 h-full py-4 pointer-events-none justify-between
                ${open ? "min-[510px]:left-[450px] left-8" : "left-4"}
                `}
                style={{
                    height: "calc(100vh - calc(var(--navbar-height)))",
                    marginTop: "calc(var(--navbar-height))",
                }}
            >
                <div className="flex min-[510px]:flex-col flex-row gap-2">
                    {/* Toggle Button */}
                    <Button
                        onPress={() => setOpen(!open)}
                        className={`
                        border-neutral-50/10 hover:bg-neutral-800 rounded-xl backdrop-blur-md min-[510px]:top-0 top-4 pointer-events-auto
                        `}
                        size="lg"
                        variant="outline"
                        isIconOnly
                        aria-label="Toggle Sidebar"
                    >
                        <LayoutSideContent className="w-5 h-5" />
                    </Button>
                    <ResetOrbitButton />
                </div>
                <CaptureControls
                    onImage={captureImage}
                    onVideo={captureVideo}
                    recording={recording}
                    progress={progress}
                    className={
                        open
                            ? "opacity-0 pointer-events-none min-[720px]:opacity-100 min-[720px]:pointer-events-auto"
                            : `opacity-100`
                    }
                />
            </div>
        </>
    );
}
