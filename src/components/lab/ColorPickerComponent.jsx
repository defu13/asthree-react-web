"use client";

import {
    Button,
    ColorArea,
    ColorField,
    ColorPicker,
    ColorSlider,
    ColorSwatch,
    ColorSwatchPicker,
    Label,
    parseColor,
} from "@heroui/react";
import { Shuffle } from "@gravity-ui/icons";
import { useRenderSettings } from "@/lib/renderSettings";

function getValue(obj, path) {
    return path.reduce((acc, key) => acc?.[key], obj);
}

export function ColorPickerComponent({ label = "Pick a color", path = [] }) {
    const state = useRenderSettings();
    const setSettings = useRenderSettings((s) => s.setSettings);
    const hex = getValue(state, path) || "#5C3FF2";
    const color = parseColor(hex);

    const colorPresets = [
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#06b6d4",
        "#3b82f6",
        "#5C3FF2",
        "#ec4899",
        "#f43f5e",
    ];

    const updateColor = (c) => {
        const newHex = c.toString("hex");

        setSettings(path[0], {
            [path.slice(1).join(".")]: newHex,
        });
    };

    const shuffleColor = () => {
        const randomHue = Math.floor(Math.random() * 360);
        const randomSaturation = 50 + Math.floor(Math.random() * 50); // 50-100%
        const randomLightness = 40 + Math.floor(Math.random() * 30); // 40-70%

        const randomColor = parseColor(
            `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`,
        );
        updateColor(randomColor);
    };

    return (
        <div className="flex flex-col gap-4 px-4">
            <ColorPicker value={color} onChange={updateColor}>
                <ColorPicker.Trigger
                    className={`hover:bg-[#27272a] gap-2 border-neutral-50/10 border backdrop-blur-md rounded-xl px-4 py-2`}
                >
                    <ColorSwatch size="xs" />
                    <Label>{label}</Label>
                </ColorPicker.Trigger>
                <ColorPicker.Popover className="gap-2">
                    <ColorSwatchPicker
                        className="justify-center pt-2"
                        size="xs"
                    >
                        {colorPresets.map((preset) => (
                            <ColorSwatchPicker.Item
                                key={preset}
                                color={preset}
                                onPress={() => updateColor(parseColor(preset))}
                            >
                                <ColorSwatchPicker.Swatch />
                            </ColorSwatchPicker.Item>
                        ))}
                    </ColorSwatchPicker>
                    <ColorArea
                        aria-label="Color area"
                        className="max-w-full"
                        colorSpace="hsb"
                        xChannel="saturation"
                        yChannel="brightness"
                    >
                        <ColorArea.Thumb />
                    </ColorArea>
                    <div className="flex items-center gap-2 px-1">
                        <ColorSlider
                            aria-label="Hue slider"
                            channel="hue"
                            className="flex-1"
                            colorSpace="hsb"
                        >
                            <ColorSlider.Track>
                                <ColorSlider.Thumb />
                            </ColorSlider.Track>
                        </ColorSlider>
                        <Button
                            isIconOnly
                            aria-label="Shuffle color"
                            size="sm"
                            variant="tertiary"
                            onPress={shuffleColor}
                        >
                            <Shuffle />
                        </Button>
                    </div>
                    <ColorField aria-label="Color field">
                        <ColorField.Group variant="secondary">
                            <ColorField.Prefix>
                                <ColorSwatch size="xs" />
                            </ColorField.Prefix>
                            <ColorField.Input />
                        </ColorField.Group>
                    </ColorField>
                </ColorPicker.Popover>
            </ColorPicker>
            {/* <p className="w-60 text-sm text-muted">
                Selected:{" "}
                <span className="font-medium">{color.toString("hex")}</span>
            </p> */}
        </div>
    );
}
