// src/components/home/ColorPickerToken.jsx
"use client";

import { ColorPicker, ColorArea, ColorSlider, ColorSwatch, parseColor } from "@heroui/react";

export function ColorPickerToken({ value, onChange }) {
    const color = parseColor(value);

    const handleChange = (c) => {
        onChange(c.toString("hex"));
    };

    return (
        <ColorPicker value={color} onChange={handleChange}>
            <ColorPicker.Trigger className="cursor-pointer inline-flex items-center gap-1.5 group bg-transparent border-none p-0">
                <ColorSwatch
                    size="xs"
                    color={value}
                    className="w-2.5 h-2.5 rounded-xs"
                />
                <span className="text-emerald-300 p-0.5 bg-emerald-300/15 rounded-sm hover:bg-emerald-200/20 transition-colors">
                    &quot;{value}&quot;
                </span>
            </ColorPicker.Trigger>

            <ColorPicker.Popover className="gap-2 p-3 border border-neutral-50/10">
                <ColorArea
                    aria-label="Color area"
                    className="max-w-full"
                    colorSpace="hsb"
                    xChannel="saturation"
                    yChannel="brightness"
                >
                    <ColorArea.Thumb />
                </ColorArea>
                <ColorSlider
                    aria-label="Hue slider"
                    channel="hue"
                    colorSpace="hsb"
                >
                    <ColorSlider.Track>
                        <ColorSlider.Thumb />
                    </ColorSlider.Track>
                </ColorSlider>
            </ColorPicker.Popover>
        </ColorPicker>
    );
}