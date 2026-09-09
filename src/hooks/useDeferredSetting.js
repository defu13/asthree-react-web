// src/hooks/useDeferredSetting.js
"use client";

import { useState, useCallback, useEffect } from "react";
import { useRenderSettings } from "@/lib/renderSettings";
import { setLivePreview, clearLivePreview } from "@/lib/livePreview";

/**
 * Hook para un campo plano dentro de una sección específica
 * (eg: model.scale, model.autoRotate, model.autoRotateSpeed).
 */
export function useDeferredSetting(section, key) {
    const storeValue  = useRenderSettings((s) => s[section][key]);
    const setSettings = useRenderSettings((s) => s.setSettings);

    const [localValue, setLocalValue] = useState(storeValue);
    const path = `${section}.${key}`;

    // Resincroniza localValue cuando el store cambia por una vía EXTERNA
    // (reset, resetProperty, resetSection, replaceSettings al cargar un preset...)
    // en vez de por el propio onChangeEnd de este hook.
    // Sin esto, el slider queda "congelado" visualmente tras un reset,
    // porque localValue nunca se entera de que el store cambió por fuera.
    useEffect(() => {
        setLocalValue(storeValue);
        // Por seguridad, limpiamos cualquier preview que pudiera haber
        // quedado activo para este path (ej: reset disparado a mitad de un drag)
        clearLivePreview(path);
    }, [storeValue, path]);

    const onChange = useCallback((value) => {
        setLocalValue(value);
        // Escritura barata: no pasa por Zustand, no dispara re-renders de React
        setLivePreview(path, value);
    }, [path]);

    const onChangeEnd = useCallback((value) => {
        setLocalValue(value);
        setSettings(section, { [key]: value });
        // El store persistente ya tiene el valor correcto — limpiamos el override
        clearLivePreview(path);
    }, [section, key, setSettings, path]);

    return { localValue, onChange, onChangeEnd };
}

export function useDeferredNestedSetting(section, nestedKey, field) {
    const storeValue  = useRenderSettings((s) => s[section][nestedKey][field]);
    const setSettings = useRenderSettings((s) => s.setSettings);

    const [localValue, setLocalValue] = useState(storeValue);
    const path = `${section}.${nestedKey}.${field}`;

    // Misma resincronización tras cambios externos (reset, resetProperty
    // sobre "rotation"/"position" completos, carga de preset, etc.)
    useEffect(() => {
        setLocalValue(storeValue);
        clearLivePreview(path);
    }, [storeValue, path]);

    const onChange = useCallback((value) => {
        setLocalValue(value);
        setLivePreview(path, value);
    }, [path]);

    const onChangeEnd = useCallback((value) => {
        setLocalValue(value);
        const currentNested = useRenderSettings.getState()[section][nestedKey];
        setSettings(section, {
            [nestedKey]: { ...currentNested, [field]: value },
        });
        clearLivePreview(path);
    }, [section, nestedKey, field, setSettings, path]);

    return { localValue, onChange, onChangeEnd };
}

/**
 * Hook para un campo plano dentro de un objeto de luz concreto
 * (ej: lights.directional1.intensity, lights.directional2.intensity).
 *
 * Similar a useDeferredNestedSetting pero pensado para la forma
 * lights[lightKey][field], donde lightKey es dinámico ("directional1"/"directional2").
 */
export function useDeferredLightSetting(lightKey, field) {
    const storeValue  = useRenderSettings((s) => s.lights[lightKey][field]);
    const setSettings = useRenderSettings((s) => s.setSettings);

    const [localValue, setLocalValue] = useState(storeValue);
    const path = `lights.${lightKey}.${field}`;

    useEffect(() => {
        setLocalValue(storeValue);
        clearLivePreview(path);
    }, [storeValue, path]);

    const onChange = useCallback((value) => {
        setLocalValue(value);
        setLivePreview(path, value);
    }, [path]);

    const onChangeEnd = useCallback((value) => {
        setLocalValue(value);
        // Leemos el objeto de luz actualizado desde el store en el momento
        // exacto de confirmar, para no pisar otros campos con datos obsoletos
        const currentLight = useRenderSettings.getState().lights[lightKey];
        setSettings("lights", {
            [lightKey]: { ...currentLight, [field]: value },
        });
        clearLivePreview(path);
    }, [lightKey, field, setSettings, path]);

    return { localValue, onChange, onChangeEnd };
}

/**
 * Hook para un índice concreto del array "position" de una luz
 * (ej: lights.directional1.position[0], [1], [2]).
 *
 * Los arrays necesitan su propio hook porque el merge no es
 * {...obj, key: value} sino sustituir un índice concreto del array
 * manteniendo los otros dos intactos.
 */
export function useDeferredLightPosition(lightKey, index) {
    const storeValue  = useRenderSettings((s) => s.lights[lightKey].position[index]);
    const setSettings = useRenderSettings((s) => s.setSettings);

    const [localValue, setLocalValue] = useState(storeValue);
    const path = `lights.${lightKey}.position.${index}`;

    useEffect(() => {
        setLocalValue(storeValue);
        clearLivePreview(path);
    }, [storeValue, path]);

    const onChange = useCallback((value) => {
        setLocalValue(value);
        setLivePreview(path, value);
    }, [path]);

    const onChangeEnd = useCallback((value) => {
        setLocalValue(value);
        const currentLight = useRenderSettings.getState().lights[lightKey];
        const newPosition = [...currentLight.position];
        newPosition[index] = value;
        setSettings("lights", {
            [lightKey]: { ...currentLight, position: newPosition },
        });
        clearLivePreview(path);
    }, [lightKey, index, setSettings, path]);

    return { localValue, onChange, onChangeEnd };
}

/**
 * Hook genérico para el ColorPickerComponent, que usa un "path" tipo
 * ["ascii", "tintColor"] o ["ui", "accentColor"] en vez de section/key fijos.
 *
 * El componente original solo soporta 2 niveles de profundidad
 * (section + field), así que replicamos exactamente esa forma:
 * section = path[0], field = resto del path unido con "."
 */
export function useDeferredColorSetting(path) {
    const section = path[0];
    const field   = path.slice(1).join(".");

    // Selector explícito recorriendo el path — solo se re-renderiza
    // este componente si el valor concreto de ESE path cambia
    const storeValue = useRenderSettings((s) =>
        path.reduce((acc, key) => acc?.[key], s)
    );
    const setSettings = useRenderSettings((s) => s.setSettings);

    const [localValue, setLocalValue] = useState(storeValue);
    const previewPath = path.join(".");

    useEffect(() => {
        setLocalValue(storeValue);
        clearLivePreview(previewPath);
    }, [storeValue, previewPath]);

    // Cada tick del ColorArea/ColorSlider mientras se arrastra
    const onChange = useCallback((hex) => {
        setLocalValue(hex);
        setLivePreview(previewPath, hex);
    }, [previewPath]);

    // Al soltar: confirmamos al store persistente y limpiamos el preview
    const onChangeEnd = useCallback((hex) => {
        setLocalValue(hex);
        setSettings(section, { [field]: hex });
        clearLivePreview(previewPath);
    }, [section, field, setSettings, previewPath]);

    return { localValue, onChange, onChangeEnd };
}