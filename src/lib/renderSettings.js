import { create } from "zustand";

export const defaultSettings = {
    camera: {
        position: { x: 0, y: 0, z: 5 },
        target: { x: 0, y: 0, z: 0 },
        fov: 50,
        orbit: {
            theta: 0, // horizontal (izq/der)
            phi: 1.5, // vertical (arriba/abajo)
            radius: 4.5, // distancia
        },
    },

    model: {
        scale: 2,
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        tilt: { forward: 0, left: 0 },
        autoRotate: true,
        autoRotateSpeed: 0.2,
    },

    lights: {
        ambient: 0,
        directional1: {
            position: [2, 3.5, 6],
            intensity: 3,
        },
        directional2: {
            position: [-2, 1.5, 4],
            intensity: 0.35,
        },
    },

    ascii: {
        style: "standard",
        cellSize: 9,
        invert: true,
        color: true,
        volumeShading: true,
        shadingIntensity: 0.5,
        glow: true,
        glowIntensity: 7,
        glowSize: 3,
        tintColor: "#5C3FF2",
    },

    postfx: {
        contrastAdjust: 1.5,
        brightnessAdjust: 0.2,
    },
    ui: {
        accentColor: "hsl(250 55% 49% / 1)",
    },
};

export const getSerializableSettings = (state) => ({
    camera: state.camera,
    model: state.model,
    lights: state.lights,
    ascii: state.ascii,
    postfx: state.postfx,
    ui: state.ui,
});

export const useRenderSettings = create((set, get) => ({
    hasHydrated: false,

    setHydrated: (value) =>
        set({
            hasHydrated: value,
        }),

    ...structuredClone(defaultSettings),

    // =========================
    // UPDATE SECTION
    // =========================

    setSettings: (section, values) =>
        set((state) => ({
            [section]: {
                ...state[section],
                ...values,
            },
        })),

    // =========================
    // REPLACE FULL STATE
    // =========================

    replaceSettings: (settings) =>
        set((state) => ({
            ...state,
            ...structuredClone(defaultSettings),
            ...settings,
        })),

    // =========================
    // RESET ALL
    // =========================

    reset: () =>
        set((state) => ({
            ...state,
            ...structuredClone(defaultSettings),
        })),

    // =========================
    // RESET SECTION
    // =========================

    resetSection: (section) =>
        set((state) => ({
            ...state,
            [section]: structuredClone(defaultSettings[section]),
        })),

    // =========================
    // RESET PROPERTY
    // =========================

    resetProperty: (section, key) =>
        set((state) => ({
            [section]: {
                ...state[section],
                [key]: structuredClone(defaultSettings[section][key]),
            },
        })),

    // =========================
    // RESET NESTED PATH
    // =========================

    resetPath: (section, path) =>
        set((state) => {
            const next = structuredClone(state[section]);

            const defaults = structuredClone(defaultSettings[section]);

            let current = next;
            let defaultCurrent = defaults;

            for (let i = 0; i < path.length - 1; i++) {
                const key = path[i];

                current[key] = {
                    ...current[key],
                };

                current = current[key];
                defaultCurrent = defaultCurrent[key];
            }

            const lastKey = path[path.length - 1];

            current[lastKey] = defaultCurrent[lastKey];

            return {
                [section]: next,
            };
        }),

    // =========================
    // ORBIT CHECK
    // =========================

    isOrbitDirty: () => {
        const orbit = get().camera.orbit;
        const defaults = defaultSettings.camera.orbit;

        return (
            orbit.theta !== defaults.theta ||
            orbit.phi !== defaults.phi ||
            orbit.radius !== defaults.radius
        );
    },
}));