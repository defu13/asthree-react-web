"use client";

import { Tabs } from "@heroui/react";
import ModelComponent from "./ModelComponent";
import CameraComponent from "./CameraComponent";
import LightsComponent from "./LightsComponent";
import EffectsComponent from "./EffectsComponent";
import { Bulb, Person, Sparkles, Video } from "@gravity-ui/icons";

export default function RenderControls() {
    const tabsConfig = [
        {
            id: "model",
            label: "Model",
            component: <ModelComponent />,
            icon: <Person className="w-3.5 h-3.5" />,
        },
        {
            id: "camera",
            label: "Camera",
            component: <CameraComponent />,
            icon: <Video className="w-3.5 h-3.5" />,
        },
        {
            id: "lights",
            label: "Lights",
            component: <LightsComponent />,
            icon: <Bulb className="w-3.5 h-3.5" />,
        },
        {
            id: "effects",
            label: "Effects",
            component: <EffectsComponent />,
            icon: <Sparkles className="w-3.5 h-3.5" />,
        },
    ];

    const textTitle = "Asthree Lab";
    const textSubTitle = "Explore styles for your 3D ASCII rendering";

    return (
        <div className="flex flex-col gap-4 w-full h-full">
            <div className="flex-col items-center z-10 px-4 pt-4 min-[510px]:mt-0 mt-12">
                <h1 className="w-full tracking-tight font-semibold min-[510px]:text-2xl text-lg font-sans text-neutral-50 -mb-1">
                    {textTitle}
                </h1>
                <h2 className="w-full text-neutral-500 font-sans text-sm">
                    {textSubTitle}
                </h2>
            </div>
            <Tabs className="w-full z-10 flex-1 min-h-0 pb-4 pt-0 gap-2">
                <Tabs.ListContainer className="px-4 bg-transparent">
                    <Tabs.List
                        className="backdrop-blur-md backdrop-saturate-150 bg-[#120f1773] border border-neutral-50/10 rounded-xl"
                        aria-label="Options"
                    >
                        {tabsConfig.map((tab, index) => (
                            <Tabs.Tab
                                key={tab.id}
                                id={tab.id}
                                className="hover:text-neutral-50 px-3"
                            >
                                {index !== 0 && <Tabs.Separator />}
                                {tab.icon}
                                <span className="min-[510px]:block hidden ml-1">
                                    {tab.label}
                                </span>
                                <Tabs.Indicator className="bg-neutral-900/30 border border-neutral-50/10 rounded-lg" />
                            </Tabs.Tab>
                        ))}
                    </Tabs.List>
                </Tabs.ListContainer>
                {tabsConfig.map((tab) => (
                    <Tabs.Panel
                        key={tab.id}
                        id={tab.id}
                        className="px-0 h-full overflow-y-auto"
                    >
                        {tab.component}
                    </Tabs.Panel>
                ))}
            </Tabs>
        </div>
    );
}
