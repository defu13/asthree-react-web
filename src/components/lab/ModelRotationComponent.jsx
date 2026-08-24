import { Label, Slider, ToggleButton } from "@heroui/react";
import { useRenderSettings } from "@/lib/renderSettings";
import React from "react";
import { Arrows3RotateRight } from "@gravity-ui/icons";
import ResetButton from "./ResetButton";

function RotationComponent() {
    const { model, setSettings, resetProperty } = useRenderSettings();

    const axes = [
        { key: "x", label: "X Axis" },
        { key: "y", label: "Y Axis" },
        { key: "z", label: "Z Axis" },
    ];

    return (
        <div className="flex flex-col gap-3">
            {axes.map(({ key, label }) => (
                <Slider
                    key={key}
                    className="w-full"
                    value={(model.rotation[key] * 180) / Math.PI} // rad → deg
                    minValue={0}
                    maxValue={360}
                    step={1}
                    onChange={(value) =>
                        setSettings("model", {
                            rotation: {
                                ...model.rotation,
                                [key]: (value * Math.PI) / 180, // deg → rad
                            },
                        })
                    }
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
                    onReset={() => resetProperty("model", "rotation")}
                />
            </div>

            {/* AUTO ROTATE */}
            <div className="flex flex-col gap-2 justify-center">
                <ToggleButton
                    className={`border-neutral-50/10 border backdrop-blur-md rounded-xl`}
                    variant="ghost"
                    size="sm"
                    isSelected={model.autoRotate}
                    onChange={(value) =>
                        setSettings("model", { autoRotate: value })
                    }
                >
                    <Arrows3RotateRight />
                    Auto Rotate
                </ToggleButton>

                {/* AUTO ROTATE SPEED */}
                <Slider
                    className="w-full"
                    isDisabled={!model.autoRotate}
                    value={model.autoRotateSpeed * 10} // rad → deg
                    minValue={1}
                    maxValue={20}
                    step={1}
                    onChange={(value) =>
                        setSettings("model", {
                            autoRotateSpeed: value / 10,
                        })
                    }
                >
                    <Label className="text-xs text-neutral-500 uppercase tracking-wider">Speed</Label>
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
