import { useRenderSettings } from "@/lib/renderSettings";
import { ArrowsRotateLeft } from "@gravity-ui/icons";
import { Button, Label, Slider } from "@heroui/react";
import React from "react";
import ResetButton from "./ResetButton";

function PositionComponent() {
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
                    value={model.position[key]}
                    minValue={-10}
                    maxValue={10}
                    step={0.1}
                    onChange={(value) =>
                        setSettings("model", {
                            position: {
                                ...model.position,
                                [key]: value,
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
                    onReset={() => resetProperty("model", "position")}
                />
            </div>
        </div>
    );
}

export default PositionComponent;
