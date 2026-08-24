// utils/captureStore.js
import { create } from "zustand";
import { useRenderSettings } from "./renderSettings";

const VIDEO_SECONDS = 10;
const VIDEO_FPS = 60;

export const useCaptureStore = create((set, get) => ({
    canvasEl: null,
    recording: false,
    progress: 0,
    _recorder: null, // refs internas
    _interval: null,

    setCanvas: (el) => set({ canvasEl: el }),

    captureImage: () => {
        const canvas = get().canvasEl;
        if (!canvas) return;

        const { ascii } = useRenderSettings.getState();
        const dpr = window.devicePixelRatio || 1;

        const out = document.createElement("canvas");
        out.width = canvas.width;
        out.height = canvas.height;
        const ctx = out.getContext("2d");

        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, out.width, out.height);

        if (ascii.glow) {
            const sizeFactor = Math.pow(ascii.glowSize / 2, 1.2);
            const blurBig = 24 * sizeFactor * dpr;
            const blurSmall = 14 * sizeFactor * dpr;

            // Alpha escalado directamente — es lo que realmente controla la intensidad visible
            const normalized = (ascii.glowIntensity - 1) / 9; // 0–1
            const alphaValue = Math.round(255 * normalized * 0.9); // 0.6 = factor de ajuste, sube/baja para calibrar
            const alpha = alphaValue
                .toString(16)
                .padStart(2, "0")
                .toUpperCase();
            const glowColor = `${ascii.tintColor}${alpha}`;

            // Dos capas fijas — el alpha hace todo el trabajo de intensidad
            ctx.save();
            ctx.shadowBlur = blurBig;
            ctx.shadowColor = glowColor;
            ctx.drawImage(canvas, 0, 0);
            ctx.restore();

            ctx.save();
            ctx.shadowBlur = blurSmall;
            ctx.shadowColor = glowColor;
            ctx.drawImage(canvas, 0, 0);
            ctx.restore();
        }

        // Canvas original limpio encima
        ctx.drawImage(canvas, 0, 0);

        const dataUrl = out.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = `asthree-${Date.now()}.png`;
        a.click();
    },

    cancelVideo: () => {
        const { _recorder, _interval, _animFrame } = get();
        if (_interval) clearInterval(_interval);
        if (_animFrame) cancelAnimationFrame(_animFrame);
        if (_recorder && _recorder.state !== "inactive") {
            _recorder.onstop = null;
            _recorder.stop();
        }
        set({
            recording: false,
            progress: 0,
            _recorder: null,
            _interval: null,
            _animFrame: null,
        });
    },

    captureVideo: () => {
        const { canvasEl, recording } = get();
        if (!canvasEl) return;

        if (recording) {
            get().cancelVideo();
            return;
        }

        const { ascii } = useRenderSettings.getState();
        const dpr = window.devicePixelRatio || 1;

        // Forzar resolución mínima 1920×1080
        const targetW = Math.max(canvasEl.width, 1920 * dpr);
        const targetH = Math.max(canvasEl.height, 1080 * dpr);

        const composite = document.createElement("canvas");
        composite.width = targetW;
        composite.height = targetH;
        const ctx = composite.getContext("2d");

        // Escala para centrar el canvas WebGL en el compuesto
        const scale = Math.min(
            targetW / canvasEl.width,
            targetH / canvasEl.height,
        );
        const dx = (targetW - canvasEl.width * scale) / 2;
        const dy = (targetH - canvasEl.height * scale) / 2;

        const sizeFactor = Math.pow(ascii.glowSize / 2, 1.2);
        const blurBig = 24 * sizeFactor * dpr;
        const blurSmall = 14 * sizeFactor * dpr;
        const normalized = (ascii.glowIntensity - 1) / 9;
        const alphaValue = Math.round(255 * normalized * 0.9);
        const alpha = alphaValue.toString(16).padStart(2, "0").toUpperCase();
        const glowColor = `${ascii.tintColor}${alpha}`;

        let animFrameId = null;

        const drawFrame = () => {
            ctx.clearRect(0, 0, targetW, targetH);

            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, targetW, targetH);

            if (ascii.glow) {
                ctx.save();
                ctx.shadowBlur = blurBig;
                ctx.shadowColor = glowColor;
                ctx.drawImage(
                    canvasEl,
                    dx,
                    dy,
                    canvasEl.width * scale,
                    canvasEl.height * scale,
                );
                ctx.restore();

                ctx.save();
                ctx.shadowBlur = blurSmall;
                ctx.shadowColor = glowColor;
                ctx.drawImage(
                    canvasEl,
                    dx,
                    dy,
                    canvasEl.width * scale,
                    canvasEl.height * scale,
                );
                ctx.restore();
            }

            ctx.drawImage(
                canvasEl,
                dx,
                dy,
                canvasEl.width * scale,
                canvasEl.height * scale,
            );

            animFrameId = requestAnimationFrame(drawFrame);
        };

        drawFrame();

        const mimeType =
            [
                "video/webm;codecs=vp9",
                "video/webm;codecs=vp8",
                "video/webm",
            ].find((m) => MediaRecorder.isTypeSupported(m)) ?? "video/webm";

        const stream = composite.captureStream(VIDEO_FPS);
        const chunks = [];
        const recorder = new MediaRecorder(stream, {
            mimeType,
            videoBitsPerSecond: 40_000_000, // 40 Mbps — máximo práctico para VP9
        });

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = () => {
            cancelAnimationFrame(animFrameId);
            const blob = new Blob(chunks, { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `asthree-${Date.now()}.webm`;
            a.click();
            URL.revokeObjectURL(url);
            set({
                recording: false,
                progress: 0,
                _recorder: null,
                _interval: null,
                _animFrame: null,
            });
        };

        recorder.start(100);

        const startTime = performance.now();
        const interval = setInterval(() => {
            const elapsed = (performance.now() - startTime) / 1000;
            const p = Math.min(elapsed / VIDEO_SECONDS, 1);
            set({ progress: p });
            if (elapsed >= VIDEO_SECONDS) {
                clearInterval(interval);
                set({ _interval: null });
                recorder.stop();
            }
        }, 100);

        set({
            recording: true,
            progress: 0,
            _recorder: recorder,
            _interval: interval,
            _animFrame: animFrameId,
        });
    },
}));
