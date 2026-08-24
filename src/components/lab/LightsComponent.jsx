import { Accordion, Label, Slider } from "@heroui/react";
import React from "react";
import { useRenderSettings } from "@/lib/renderSettings";
import DirectionalLightComponent from "./DirectionalLightComponent";

function LightsComponent() {
    const { lights, setSettings } = useRenderSettings();

    const items = [
        {
            id: "dir1",
            label: "Directional Light 1",
            component: <DirectionalLightComponent lightKey="directional1" />,
        },
        {
            id: "dir2",
            label: "Directional Light 2",
            component: <DirectionalLightComponent lightKey="directional2" />,
        },
    ];

    return (
        <section className="w-full flex flex-col gap-4 overflow-x-hidden">
            <div className="flex w-full px-4">
                <Accordion
                    allowsMultipleExpanded
                    className="w-full backdrop-blur-md backdrop-saturate-150 bg-[#120f1773] border border-neutral-50/10"
                    defaultExpandedKeys={["dir1"]}
                    variant="surface"
                >
                    {items.map(({ id, label, component }) => (
                        <Accordion.Item id={id} key={id}>
                            <Accordion.Heading>
                                <Accordion.Trigger className="hover:bg-neutral-200/10 transition-all">
                                    {label}
                                    <Accordion.Indicator />
                                </Accordion.Trigger>
                            </Accordion.Heading>
                            <Accordion.Panel>
                                <Accordion.Body>{component}</Accordion.Body>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
            {/* AMBIENT */}
            <Slider
                className="w-full px-4"
                value={((10 - lights.ambient) / 20) * 100}
                minValue={0}
                maxValue={100}
                step={1}
                onChange={(value) =>
                    setSettings("lights", {
                        ambient: 10 - (value / 100) * 20,
                    })
                }
            >
                <Label className="text-xs text-neutral-500 uppercase tracking-wider">Ambient</Label>
                <Slider.Output />
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                </Slider.Track>
            </Slider>
        </section>
    );
}

export default LightsComponent;
