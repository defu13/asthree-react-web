import { Button, Label, Slider } from "@heroui/react";
import React from "react";
import ResetButton from "./ResetButton";
import { useRenderSettings } from "@/lib/renderSettings";

function CameraTargetComponent() {
    const { camera, setSettings, resetProperty, model } = useRenderSettings();

    const axes = [
        { key: "x", label: "X Axis" },
        { key: "y", label: "Y Axis" },
        { key: "z", label: "Z Axis" },
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
            {axes.map(({ key, label }) => (
                <Slider
                    key={key}
                    className="w-full px-4"
                    value={camera.target[key]}
                    minValue={-10}
                    maxValue={10}
                    step={0.1}
                    onChange={(value) =>
                        setSettings("camera", {
                            target: {
                                ...camera.target,
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
            <div className="w-full flex justify-between px-4">
                <Button
                    className={`transition-all duration-300 border-neutral-50/10 hover:bg-neutral-800 rounded-xl backdrop-blur-md`}
                    size="sm"
                    onPress={handleCenter}
                    variant="outline"
                    aria-label="Center Camera Target"
                >
                    Center View
                </Button>
                <ResetButton
                    onReset={() => resetProperty("camera", "target")}
                />
            </div>
        </div>
    );
}

export default CameraTargetComponent;
