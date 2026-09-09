"use client";

import { AlmostEqual, Sparkles } from "@gravity-ui/icons";
import { Label, Separator, Slider, ToggleButton } from "@heroui/react";
import { ColorPickerComponent } from "./ColorPickerComponent";
import ResetButton from "./ResetButton";
import { useDeferredSetting } from "@/hooks/useDeferredSetting";
import { useRenderSettings } from "@/lib/renderSettings";

function EffectsComponent() {
    const cellSize = useDeferredSetting("ascii", "cellSize");
    const contrastAdjust = useDeferredSetting("postfx", "contrastAdjust");
    const glowSize = useDeferredSetting("ascii", "glowSize");
    const glowIntensity = useDeferredSetting("ascii", "glowIntensity");
    const glow = useDeferredSetting("ascii", "glow");
    const volumeShading = useDeferredSetting("ascii", "volumeShading");
    const shadingIntensity = useDeferredSetting("ascii", "shadingIntensity");
    const { resetSection } = useRenderSettings();

    const glowConfig = [
        {
            key: "glowIntensity",
            label: "Glow Intensity",
            setting: glowIntensity,
        },
        { key: "glowSize", label: "Glow Size", setting: glowSize },
    ];

    const handleReset = () => {
        resetSection("ascii");
        resetSection("postfx");
    };

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
                value={cellSize.localValue}
                minValue={5}
                maxValue={25}
                step={1}
                onChange={cellSize.onChange}
                onChangeEnd={cellSize.onChangeEnd}
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
                value={contrastAdjust.localValue}
                minValue={0.1}
                maxValue={10}
                step={0.1}
                onChange={contrastAdjust.onChange}
                onChangeEnd={contrastAdjust.onChangeEnd}
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
                    isSelected={glow.localValue}
                    onChange={glow.onChangeEnd}
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
                    isDisabled={!glow.localValue}
                    value={config.setting.localValue}
                    minValue={1}
                    maxValue={10}
                    step={0.1}
                    onChange={config.setting.onChange}
                    onChangeEnd={config.setting.onChangeEnd}
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
                    isSelected={volumeShading.localValue}
                    onChange={volumeShading.onChangeEnd}
                >
                    <AlmostEqual />
                    Shading
                </ToggleButton>
            </div>

            {/* Shading intensity */}
            <Slider
                className="w-full px-4"
                isDisabled={!volumeShading.localValue}
                value={shadingIntensity.localValue}
                minValue={-5}
                maxValue={10}
                step={0.01}
                onChange={shadingIntensity.onChange}
                onChangeEnd={shadingIntensity.onChangeEnd}
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
