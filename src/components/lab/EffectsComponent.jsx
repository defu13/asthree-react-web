"use client";

import { useRenderSettings } from "@/lib/renderSettings";
import { AlmostEqual, Sparkles } from "@gravity-ui/icons";
import { Label, Separator, Slider, ToggleButton } from "@heroui/react";
import { ColorPickerComponent } from "./ColorPickerComponent";
import ResetButton from "./ResetButton";

function EffectsComponent() {
    const { ascii, postfx, setSettings, resetSection } = useRenderSettings();

    const glowConfig = [
        { key: "glowIntensity", label: "Glow Intensity" },
        { key: "glowSize", label: "Glow Size" },
    ];

    const handleReset = () => {
        resetSection("ascii");
        resetSection("postfx");
    }

    return (
        <section className="w-full flex flex-col gap-4 overflow-x-hidden">
            {/* Tint color */}
            <ColorPickerComponent
                label="ASCII Color"
                path={["ascii", "tintColor"]}
            />

            {/* Character size */}
            <Slider
                className="w-full px-4"
                value={ascii.cellSize}
                minValue={5}
                maxValue={25}
                step={1}
                onChange={(value) =>
                    setSettings("ascii", {
                        cellSize: value,
                    })
                }
            >
                <Label className="text-xs text-neutral-500 uppercase tracking-wider">
                    Character Size
                </Label>
                <Slider.Output />
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                </Slider.Track>
            </Slider>

            {/* Contrast */}
            <Slider
                className="w-full px-4"
                value={postfx.contrastAdjust}
                minValue={0.1}
                maxValue={10}
                step={0.1}
                onChange={(value) =>
                    setSettings("postfx", {
                        contrastAdjust: value,
                    })
                }
            >
                <Label className="text-xs text-neutral-500 uppercase tracking-wider">
                    Contrast
                </Label>
                <Slider.Output />
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                </Slider.Track>
            </Slider>

            <div className="w-full flex px-4">
                <Separator className="my-4 bg-neutral-50/15" />
            </div>

            {/* Glow toggle */}
            <div className="w-full flex px-4">
                <ToggleButton
                    id="glow"
                    className={`border-neutral-50/10 border backdrop-blur-md rounded-xl`}
                    size="sm"
                    variant="ghost"
                    isSelected={ascii.glow}
                    onChange={(value) =>
                        setSettings("ascii", {
                            glow: value,
                        })
                    }
                >
                    <Sparkles />
                    Glow
                </ToggleButton>
            </div>

            {/* Glow config */}
            {glowConfig.map((config) => (
                <Slider
                    key={config.key}
                    className="w-full px-4"
                    isDisabled={!ascii.glow}
                    value={ascii[config.key]}
                    minValue={1}
                    maxValue={10}
                    step={0.1}
                    onChange={(value) =>
                        setSettings("ascii", {
                            [config.key]: value,
                        })
                    }
                >
                    <Label className="text-xs text-neutral-500 uppercase tracking-wider">
                        {config.label}
                    </Label>
                    <Slider.Output />
                    <Slider.Track>
                        <Slider.Fill />
                        <Slider.Thumb />
                    </Slider.Track>
                </Slider>
            ))}

            <div className="w-full flex px-4">
                <Separator className="my-4 bg-neutral-50/15" />
            </div>

            {/* Shading toggle */}
            <div className="w-full flex px-4">
                <ToggleButton
                    id="shading"
                    className={`border-neutral-50/10 border backdrop-blur-md rounded-xl`}
                    size="sm"
                    variant="ghost"
                    isSelected={ascii.volumeShading}
                    onChange={(value) =>
                        setSettings("ascii", {
                            volumeShading: value,
                        })
                    }
                >
                    <AlmostEqual />
                    Shading
                </ToggleButton>
            </div>

            {/* Shading intensity */}
            <Slider
                className="w-full px-4"
                isDisabled={!ascii.volumeShading}
                value={ascii.shadingIntensity * 10}
                minValue={-10}
                maxValue={100}
                step={1}
                onChange={(value) =>
                    setSettings("ascii", {
                        shadingIntensity: value / 10,
                    })
                }
            >
                <Label className="text-xs text-neutral-500 uppercase tracking-wider">
                    Shading Intensity
                </Label>
                <Slider.Output />
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                </Slider.Track>
            </Slider>

            <div className="w-full flex flex-col items-end px-4">
                <ResetButton onReset={handleReset} />
            </div>
        </section>
    );
}

export default EffectsComponent;
