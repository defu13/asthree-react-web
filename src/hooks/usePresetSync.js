"use client";

import { useEffect, useRef } from "react";
import {
  useRenderSettings,
  getSerializableSettings,
} from "@/lib/renderSettings";
import { encodePreset, decodePreset } from "@/lib/preset";

function usePresetLoader() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const preset = params.get("preset");

    if (preset) {
      const decoded = decodePreset(preset);
      if (decoded) {
        useRenderSettings.getState().replaceSettings(decoded);
      }
    }

    useRenderSettings.getState().setHydrated(true);
  }, []);
}

function usePresetWriter() {
  const hasHydrated = useRenderSettings((s) => s.hasHydrated);
  const camera  = useRenderSettings((s) => s.camera);
  const model   = useRenderSettings((s) => s.model);
  const lights  = useRenderSettings((s) => s.lights);
  const ascii   = useRenderSettings((s) => s.ascii);
  const postfx  = useRenderSettings((s) => s.postfx);
  const ui      = useRenderSettings((s) => s.ui);

  useEffect(() => {
    if (!hasHydrated) return;

    const serializable = getSerializableSettings(useRenderSettings.getState());
    const encoded = encodePreset(serializable);
    const url = new URL(window.location.href);

    if (encoded === null) {
      url.searchParams.delete("preset");
    } else {
      url.searchParams.set("preset", encoded);
    }

    window.history.replaceState({}, "", url.toString());
  }, [hasHydrated, camera, model, lights, ascii, postfx, ui]);
}

export default function usePresetSync() {
  usePresetLoader();
  usePresetWriter();
}