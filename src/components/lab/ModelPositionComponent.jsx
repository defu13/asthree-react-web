import { useRenderSettings } from "@/lib/renderSettings";
import { Label, Slider } from "@heroui/react";
import React from "react";
import ResetButton from "./ResetButton";
import { useDeferredNestedSetting } from "@/hooks/useDeferredSetting";

function PositionComponent() {
    const xAxis = useDeferredNestedSetting("model", "position", "x");
    const yAxis = useDeferredNestedSetting("model", "position", "y");
    const zAxis = useDeferredNestedSetting("model", "position", "z");
    const resetProperty = useRenderSettings((s) => s.resetProperty);

    const axes = [
        { key: "x", label: "X Axis", axis: xAxis },
        { key: "y", label: "Y Axis", axis: yAxis },
        { key: "z", label: "Z Axis", axis: zAxis },
    ];

    return (
        <div className="flex flex-col gap-3">
            {axes.map(({ key, label, axis }) => (
                <Slider
                    key={key}
                    className="w-full"
                    value={axis.localValue}
                    minValue={-10}
                    maxValue={10}
                    step={0.1}
                    onChange={axis.onChange}
                    onChangeEnd={axis.onChangeEnd}
                >
                    <Label className="text-xs text-neutral-500 uppercase tracking-wider">{label}</Label>
                    <Slider.Output />
                    <Slider.Track>
                        <Slider.Fill />
                        <Slider.Thumb />
                    </Slider.Track>
                </Slider>
            ))}

            <div className="w-full flex flex-col items-end">
                <ResetButton
                    onReset={() => resetProperty("model", "position")}
                />
            </div>
        </div>
    );
}

export default PositionComponent;
