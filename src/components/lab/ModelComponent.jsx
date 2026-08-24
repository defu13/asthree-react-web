import { Accordion, Label, Separator, Slider } from "@heroui/react";
import React from "react";
import RotationComponent from "./ModelRotationComponent";
import PositionComponent from "./ModelPositionComponent";
import { useRenderSettings } from "@/lib/renderSettings";
import ModelSelector from "./ModelSelector";

function ModelComponent() {
    const { model, setSettings } = useRenderSettings();
    const items = [
        {
            id: "rotation",
            label: "Rotation",
            component: <RotationComponent />,
        },
        {
            id: "position",
            label: "Position",
            component: <PositionComponent />,
        },
    ];

    return (
        <section className="w-full flex flex-col gap-4 overflow-x-hidden">
            <div className="w-full px-4">
                <ModelSelector />
            </div>

            <div className="w-full flex px-4">
                <Separator className="my-4 bg-neutral-50/15" />
            </div>

            <div className="flex w-full px-4">
                <Accordion
                    allowsMultipleExpanded
                    className="w-full backdrop-blur-md backdrop-saturate-150 bg-[#120f1773] border border-neutral-50/10"
                    defaultExpandedKeys={["rotation"]}
                    variant="surface"
                >
                    {items.map(({ id, label, component }) => (
                        <Accordion.Item id={id} key={id}>
                            <Accordion.Heading>
                                <Accordion.Trigger className="hover:bg-neutral-200/10 transition-all ">
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

            {/* SCALE */}
            <Slider
                className="w-full px-4"
                value={model.scale * 10}
                minValue={0}
                maxValue={100}
                step={1}
                onChange={(value) =>
                    setSettings("model", {
                        scale: value / 10,
                    })
                }
            >
                <Label className="text-xs text-neutral-500 uppercase tracking-wider">Scale</Label>
                <Slider.Output />
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                </Slider.Track>
            </Slider>
        </section>
    );
}

export default ModelComponent;
