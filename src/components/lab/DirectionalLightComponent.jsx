import { Label, Slider } from "@heroui/react";
import { useRenderSettings } from "@/lib/renderSettings";
import ResetButton from "./ResetButton";

function DirectionalLightComponent({ lightKey }) {
    const { lights, setSettings, resetProperty } = useRenderSettings();
    const light = lights[lightKey];

    const updatePosition = (index, value) => {
        const newPosition = [...light.position];
        newPosition[index] = value;

        setSettings("lights", {
            [lightKey]: {
                ...light,
                position: newPosition,
            },
        });
    };

    const positionAxes = [
        { index: 0, label: "X Axis" },
        { index: 1, label: "Y Axis" },
        { index: 2, label: "Z Axis" },
    ];

    return (
        <div className="flex flex-col gap-3">
            {/* INTENSITY */}
            <Slider
                value={100 - light.intensity * 10}
                minValue={0}
                maxValue={100}
                step={1}
                onChange={(value) =>
                    setSettings("lights", {
                        [lightKey]: {
                            ...light,
                            intensity: (100 - value) / 10,
                        },
                    })
                }
            >
                <Label className="text-xs text-neutral-500 uppercase tracking-wider">Intensity</Label>
                <Slider.Output />
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                </Slider.Track>
            </Slider>

            {/* POSITION */}
            {positionAxes.map(({ index, label }) => (
                <Slider
                    key={index}
                    value={light.position[index]}
                    minValue={-30}
                    maxValue={30}
                    step={0.1}
                    onChange={(value) => updatePosition(index, value)}
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
                    onReset={() => resetProperty("lights", lightKey)}
                />
            </div>
        </div>
    );
}

export default DirectionalLightComponent;
