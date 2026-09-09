import { Label, Slider, ToggleButton } from "@heroui/react";
import React from "react";
import { Arrows3RotateRight } from "@gravity-ui/icons";
import ResetButton from "./ResetButton";
import { useDeferredNestedSetting, useDeferredSetting } from "@/hooks/useDeferredSetting";
import { useRenderSettings } from "@/lib/renderSettings";

function RotationComponent() {
    const xAxis = useDeferredNestedSetting("model", "rotation", "x");
    const yAxis = useDeferredNestedSetting("model", "rotation", "y");
    const zAxis = useDeferredNestedSetting("model", "rotation", "z");
    const autoRotate = useDeferredSetting("model", "autoRotate");
    const autoRotateSpeed = useDeferredSetting("model", "autoRotateSpeed");
    const {resetProperty} = useRenderSettings();

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
                    value={(axis.localValue * 180) / Math.PI} // rad → deg
                    minValue={0}
                    maxValue={360}
                    step={1}
                    // calculo inverso
                    onChange={(value) => axis.onChange((value * Math.PI) / 180)}
                    onChangeEnd={(value) => axis.onChangeEnd((value * Math.PI) / 180)}
                >
                    <Label className="text-xs text-neutral-500 uppercase tracking-wider">
                        {label}
                    </Label>
                    <Slider.Output />
                    <Slider.Track>
                        <Slider.Fill />
                        <Slider.Thumb />
                    </Slider.Track>
                </Slider>
            ))}
            <div className="w-full flex flex-col items-end">
                <ResetButton
                    onReset={() => resetProperty("model", "rotation")}
                />
            </div>

            {/* AUTO ROTATE */}
            <div className="flex flex-col gap-2 justify-center">
                <ToggleButton
                    className={`border-neutral-50/10 border backdrop-blur-md rounded-xl`}
                    variant="ghost"
                    size="sm"
                    isSelected={autoRotate.localValue}
                    onChange={autoRotate.onChangeEnd}
                >
                    <Arrows3RotateRight />
                    Auto Rotate
                </ToggleButton>

                {/* AUTO ROTATE SPEED */}
                <Slider
                    className="w-full"
                    isDisabled={autoRotate.localValue === false}
                    value={autoRotateSpeed.localValue}
                    minValue={0}
                    maxValue={10}
                    step={0.1}
                    onChange={autoRotateSpeed.onChange}
                    onChangeEnd={autoRotateSpeed.onChangeEnd}
                >
                    <Label className="text-xs text-neutral-500 uppercase tracking-wider">
                        Speed
                    </Label>
                    <Slider.Output />
                    <Slider.Track>
                        <Slider.Fill />
                        <Slider.Thumb />
                    </Slider.Track>
                </Slider>
            </div>
        </div>
    );
}

export default RotationComponent;
