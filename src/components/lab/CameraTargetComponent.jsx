import { Button, Label, Slider } from "@heroui/react";
import React from "react";
import ResetButton from "./ResetButton";
import { useRenderSettings } from "@/lib/renderSettings";
import { useDeferredNestedSetting } from "@/hooks/useDeferredSetting";

function CameraTargetComponent() {
    const xAxis = useDeferredNestedSetting("camera", "target", "x");
    const yAxis = useDeferredNestedSetting("camera", "target", "y");
    const zAxis = useDeferredNestedSetting("camera", "target", "z");
    const resetProperty = useRenderSettings((s) => s.resetProperty);
    const model = useRenderSettings((s) => s.model);
    const setSettings = useRenderSettings((s) => s.setSettings);

    const axes = [
        { key: "x", label: "X Axis", axis: xAxis },
        { key: "y", label: "Y Axis", axis: yAxis },
        { key: "z", label: "Z Axis", axis: zAxis },
    ];

    const handleCenter = () => {
        setSettings("camera", {
            target: {
                x: model.position.x,
                y: model.position.y,
                z: model.position.z,
            },
        });
    };

    return (
        <div className="flex flex-col gap-3">
            {axes.map(({ key, label, axis }) => (
                <Slider
                    key={key}
                    className="w-full px-4"
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
            <div className="w-full flex justify-end px-4">
                {/* <Button
                    className={`transition-all duration-300 border-neutral-50/10 hover:bg-neutral-800 rounded-xl backdrop-blur-md`}
                    size="sm"
                    onPress={handleCenter}
                    variant="outline"
                    aria-label="Center Camera Target"
                >
                    Center View
                </Button> */}
                <ResetButton
                    onReset={() => resetProperty("camera", "target")}
                />
            </div>
        </div>
    );
}

export default CameraTargetComponent;
