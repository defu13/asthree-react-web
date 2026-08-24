// components/ModelSelector.jsx
"use client";

import { useRef, useState, useCallback } from "react";
import { Button } from "@heroui/react";
import { FileArrowUp, Check, TriangleExclamationFill } from "@gravity-ui/icons";
import {
    useModelStore,
    PRESET_MODELS,
    validateGLBFile,
} from "@/lib/modelStore";

// ── Drop Zone ─────────────────────────────────────────────────────────────

function DropZone({ onFile, error }) {
    const inputRef = useRef(null);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const [hovered, setHovered] = useState(false);

    const processFile = useCallback(
        (file) => {
            if (file) onFile(file);
        },
        [onFile],
    );

    const onDragOver = (e) => {
        e.preventDefault();
        setIsDraggingOver(true);
    };
    const onDragLeave = () => setIsDraggingOver(false);
    const onDrop = (e) => {
        e.preventDefault();
        setIsDraggingOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };
    const onInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
        e.target.value = "";
    };

    const borderColor = error
        ? "border-red-500/60"
        : isDraggingOver || hovered
          ? "border-accent-soft-foreground/80"
          : "border-neutral-200/15";

    const bgColor = isDraggingOver || hovered
        ? "bg-accent-soft/60"
        : "bg-neutral-200/5";

    return (
        <div
            className={`
                relative flex flex-col items-center justify-center gap-2 
                rounded-xl border-2 border-dashed px-4 py-6 transition-colors 
                duration-150 cursor-pointer backdrop-blur-md ${borderColor} ${bgColor}
            `}
            onClick={() => inputRef.current?.click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <input
                ref={inputRef}
                type="file"
                accept=".glb"
                className="hidden"
                onChange={onInputChange}
            />
            <FileArrowUp
                className={`w-6 h-6 ${isDraggingOver || hovered ? "text-accent-soft-foreground" : ""} transition-colors duration-150`}
            />
            <div className="text-center">
                <p className="text-sm">
                    Drop a{" "}
                    <span className="font-mono text-accent-soft-foreground">.glb</span> file
                    here
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                    or click to browse · max 15 MB
                </p>
            </div>
            {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
                    <TriangleExclamationFill className="w-3.5 h-3.5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}

// ── Componente principal ──────────────────────────────────────────────────

export default function ModelSelector() {
    const { activePresetId, source, loadedFile, setPreset, setFile } =
        useModelStore();

    const [fileError, setFileError] = useState("");

    const handleFile = useCallback(
        (file) => {
            const err = validateGLBFile(file);
            if (err) {
                setFileError(err);
                return;
            }
            setFileError("");
            const objectUrl = URL.createObjectURL(file);
            setFile(file, objectUrl); // name y size se guardan en el store
        },
        [setFile],
    );

    return (
        <div className="flex flex-col gap-5">
            {/* ── Presets ──────────────────────────────────────── */}
            <div className="flex flex-col gap-2">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">
                    Preset models
                </span>
                <div className="flex flex-wrap gap-2">
                    {PRESET_MODELS.map((preset) => {
                        const active =
                            source === "preset" && activePresetId === preset.id;
                        return (
                            <Button
                                key={preset.id}
                                size="sm"
                                variant={"outline"}
                                aria-label={`Select preset model: ${preset.label}`}
                                className={`rounded-xl border border-neutral-50/10 backdrop-blur-md ${
                                    active &&
                                    "bg-accent-soft hover:bg-accent-soft-hover text-accent-soft-foreground"
                                }`}
                                onPress={() => setPreset(preset)}
                            >
                                {active && <Check className="w-3.5 h-3.5" />}
                                {preset.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* ── Upload ───────────────────────────────────────── */}
            <div className="flex flex-col gap-2">
                <span className="text-xs text-neutral-500 uppercase tracking-wider">
                    Upload file
                </span>

                {source === "file" && loadedFile && !fileError && (
                    <div className="flex items-center gap-2 text-xs text-accent-soft-foreground bg-accent-soft/60 border border-accent-soft-foreground/80 rounded-lg px-3 py-2">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{loadedFile.name}</span>
                        <span className="text-neutral-500 shrink-0">
                            {(loadedFile.size / 1024 / 1024).toFixed(1)} MB
                        </span>
                    </div>
                )}

                <DropZone onFile={handleFile} error={fileError} />
            </div>
        </div>
    );
}
