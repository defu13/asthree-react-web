// utils/modelStore.js
import { create } from "zustand";

export const PRESET_MODELS = [
    { id: "model", label: "Default", path: "/models/model.glb" },
    { id: "car", label: "Car", path: "/models/car.glb" },
    { id: "astronaut", label: "Astronaut", path: "/models/astronaut.glb" },
];

export const MAX_FILE_SIZE = 15 * 1024 * 1024;

export function validateGLBFile(file) {
    if (!file.name.toLowerCase().endsWith(".glb")) {
        return "Only .glb files are supported.";
    }
    if (file.size > MAX_FILE_SIZE) {
        return `File exceeds the 10 MB limit (${(file.size / 1024 / 1024).toFixed(1)} MB).`;
    }
    return null;
}

export const useModelStore = create((set) => ({
    source: "preset",
    activePath: PRESET_MODELS[0].path,
    activePresetId: PRESET_MODELS[0].id,
    objectUrl: null,
    loadedFile: null,

    setPreset: (preset) =>
        set((state) => {
            if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
            return {
                source: "preset",
                activePath: preset.path,
                activePresetId: preset.id,
                objectUrl: null,
                loadedFile: null,
            };
        }),

    setFile: (file, objectUrl) =>
        set((state) => {
            if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
            return {
                source: "file",
                activePath: objectUrl,
                activePresetId: null,
                objectUrl,
                loadedFile: { name: file.name, size: file.size },
            };
        }),
}));