// src/components/lab/DirectionalLightComponent.jsx
import { Label, Slider } from "@heroui/react";
import { useRenderSettings } from "@/lib/renderSettings";
import { useDeferredLightSetting, useDeferredLightPosition } from "@/hooks/useDeferredSetting";
import ResetButton from "./ResetButton";

const POSITION_AXES = [
    { index: 0, label: "X Axis" },
    { index: 1, label: "Y Axis" },
    { index: 2, label: "Z Axis" },
];

// Subcomponente por eje — así arrastrar X no re-renderiza los sliders de Y/Z
function AxisSlider({ lightKey, index, label }) {
    const { localValue, onChange, onChangeEnd } = useDeferredLightPosition(lightKey, index);

    return (
        <Slider
            value={localValue}
            minValue={-30}
            maxValue={30}
            step={0.1}
            onChange={onChange}
            onChangeEnd={onChangeEnd}
        >
            <Label className="text-xs text-neutral-500 uppercase tracking-wider">{label}</Label>
            <Slider.Output />
            <Slider.Track>
                <Slider.Fill />
                <Slider.Thumb />
            </Slider.Track>
        </Slider>
    );
}

function DirectionalLightComponent({ lightKey }) {
    // resetProperty es una función estable — no hace falta selector reactivo
    const resetProperty = useRenderSettings((s) => s.resetProperty);

    // Intensity usa una fórmula invertida (100 - intensity*10) — se mantiene igual
    const { localValue: intensity, onChange: onIntensityChange, onChangeEnd: onIntensityEnd } =
        useDeferredLightSetting(lightKey, "intensity");

    return (
        <div className="flex flex-col gap-3">
            {/* INTENSITY */}
            <Slider
                value={100 - intensity * 10}
                minValue={0}
                maxValue={100}
                step={1}
                onChange={(value) => onIntensityChange((100 - value) / 10)}
                onChangeEnd={(value) => onIntensityEnd((100 - value) / 10)}
            >
                <Label className="text-xs text-neutral-500 uppercase tracking-wider">Intensity</Label>
                <Slider.Output />
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                </Slider.Track>
            </Slider>

            {/* POSITION — un AxisSlider independiente por cada eje */}
            {POSITION_AXES.map(({ index, label }) => (
                <AxisSlider key={index} lightKey={lightKey} index={index} label={label} />
            ))}

            <div className="w-full flex flex-col items-end">
                <ResetButton onReset={() => resetProperty("lights", lightKey)} />
            </div>
        </div>
    );
}

export default DirectionalLightComponent;