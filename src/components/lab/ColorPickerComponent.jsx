// src/components/lab/ColorPickerComponent.jsx
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
import { useDeferredColorSetting } from "@/hooks/useDeferredSetting";

export function ColorPickerComponent({ label = "Pick a color", path = [] }) {
    // localValue = hex que ve la UI en vivo mientras se arrastra el area/slider
    // onChange   = solo escribe en el preview en vivo (barato, sin tocar zustand)
    // onChangeEnd = confirma al store persistente al soltar
    const { localValue, onChange, onChangeEnd } = useDeferredColorSetting(path);

    const color = parseColor(localValue || "#5C3FF2");

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

    // Los sliders/área internos trabajan con objetos Color de React Aria,
    // pero nuestro sistema de preview trabaja con strings hex — convertimos aquí
    const handleChange = (c) => onChange(c.toString("hex"));
    const handleChangeEnd = (c) => onChangeEnd(c.toString("hex"));

    // Los presets y el shuffle son clics discretos (no arrastre continuo),
    // así que confirman directamente sin pasar por el preview en vivo
    const selectPreset = (hex) => onChangeEnd(hex);

    const shuffleColor = () => {
        const randomHue = Math.floor(Math.random() * 360);
        const randomSaturation = 50 + Math.floor(Math.random() * 50);
        const randomLightness = 40 + Math.floor(Math.random() * 30);

        const randomColor = parseColor(
            `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`
        );
        selectPreset(randomColor.toString("hex"));
    };

    return (
        <div className="flex flex-col gap-4 px-4">
            <ColorPicker
                value={color}
                onChange={handleChange}
            >
                <ColorPicker.Trigger
                    className="hover:bg-[#27272a] gap-2 border-neutral-50/10 border backdrop-blur-md rounded-xl px-4 py-2"
                >
                    <ColorSwatch size="xs" />
                    <Label>{label + ": "}{color.toString("hex")}</Label>
                </ColorPicker.Trigger>
                <ColorPicker.Popover className="gap-2 dark border-neutral-50/10 border">
                    <ColorSwatchPicker className="justify-center pt-2" size="xs">
                        {colorPresets.map((preset) => (
                            <ColorSwatchPicker.Item
                                key={preset}
                                color={preset}
                                onPress={() => selectPreset(preset)}
                            >
                                <ColorSwatchPicker.Swatch />
                            </ColorSwatchPicker.Item>
                        ))}
                    </ColorSwatchPicker>

                    {/* onChange aquí también dispara handleChange/handleChangeEnd
                        heredados del ColorPicker padre por contexto de React Aria —
                        no hace falta repetirlos en cada hijo */}
                    <ColorArea
                        aria-label="Color area"
                        className="max-w-full"
                        colorSpace="hsb"
                        xChannel="saturation"
                        yChannel="brightness"
                        onChangeEnd={handleChangeEnd}
                    >
                        <ColorArea.Thumb />
                    </ColorArea>

                    <div className="flex items-center gap-2 px-1">
                        <ColorSlider
                            aria-label="Hue slider"
                            channel="hue"
                            className="flex-1"
                            colorSpace="hsb"
                            onChangeEnd={handleChangeEnd}
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
        </div>
    );
}