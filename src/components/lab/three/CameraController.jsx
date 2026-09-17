import { useThree, useFrame } from "@react-three/fiber";
import { useRenderSettings } from "@/lib/renderSettings";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { getLivePreview } from "@/lib/livePreview";

function CameraController({
    containerRef,
    enableOrbit = true,
    enableZoom = true,
}) {
    const { camera } = useThree();
    const { camera: cam, setSettings } = useRenderSettings();

    const camOrbitRef = useRef(cam.orbit);
    useEffect(() => {
        camOrbitRef.current = cam.orbit;
    }, [cam.orbit]);

    const orbitRef = useRef({
        theta: cam.orbit.theta,
        phi: cam.orbit.phi,
        radius: cam.orbit.radius,
    });

    const dragOrbit = useRef({
        theta: cam.orbit.theta,
        phi: cam.orbit.phi,
        radius: cam.orbit.radius,
    });

    const isDragging = useRef(false);
    // Estado propio para el pinch — el orbit de un dedo y el zoom de dos
    // son gestos distintos, y el useFrame necesita saber que dragOrbit
    // manda también durante un pinch, no solo durante un drag
    const isPinching = useRef(false);
    const last = useRef({ x: 0, y: 0 });
    const lastPinchDistance = useRef(null);

    // =========================
    // FOV
    // =========================
    useFrame(() => {
        const fov = getLivePreview("camera.fov") ?? cam.fov;
        if (camera.fov !== fov) {
            camera.fov = fov;
            camera.updateProjectionMatrix();
        }
    });

    // =========================
    // ORBIT ANIMATION LOOP
    // =========================
    useFrame(() => {
        // dragOrbit manda si hay un drag de un dedo/ratón O un pinch de dos dedos
        const interacting = isDragging.current || isPinching.current;
        const target = interacting ? dragOrbit.current : camOrbitRef.current;

        orbitRef.current.theta = THREE.MathUtils.lerp(
            orbitRef.current.theta,
            target.theta,
            0.12,
        );
        orbitRef.current.phi = THREE.MathUtils.lerp(
            orbitRef.current.phi,
            target.phi,
            0.12,
        );
        orbitRef.current.radius = THREE.MathUtils.lerp(
            orbitRef.current.radius,
            target.radius,
            0.12,
        );

        const { theta, phi, radius } = orbitRef.current;

        const targetX = getLivePreview("camera.target.x") ?? cam.target.x;
        const targetY = getLivePreview("camera.target.y") ?? cam.target.y;
        const targetZ = getLivePreview("camera.target.z") ?? cam.target.z;

        camera.position.set(
            targetX + radius * Math.sin(phi) * Math.sin(theta),
            targetY + radius * Math.cos(phi),
            targetZ + radius * Math.sin(phi) * Math.cos(theta),
        );
        camera.lookAt(targetX, targetY, targetZ);
    });

    // =========================
    // EVENTOS
    // =========================
    useEffect(() => {
        const el = containerRef?.current;
        if (!el) return;
        if (!enableOrbit && !enableZoom) return;

        const startDrag = (x, y) => {
            if (!enableOrbit) return;
            isDragging.current = true;
            last.current = { x, y };
            dragOrbit.current = { ...camOrbitRef.current };
        };

        const moveDrag = (x, y) => {
            if (!enableOrbit || !isDragging.current) return;

            const dx = x - last.current.x;
            const dy = y - last.current.y;
            last.current = { x, y };

            const sensitivity = 0.005;
            dragOrbit.current.theta -= dx * sensitivity;
            dragOrbit.current.phi = Math.max(
                0.1,
                Math.min(
                    Math.PI - 0.1,
                    dragOrbit.current.phi - dy * sensitivity,
                ),
            );
        };

        // Confirma al store el estado final de dragOrbit y sincroniza los refs.
        // Sirve tanto para el fin de un drag como para el fin de un pinch,
        // por eso ya no comprueba isDragging: el llamante decide cuándo toca.
        const commitOrbit = () => {
            const finalOrbit = { ...dragOrbit.current };

            orbitRef.current.theta = finalOrbit.theta;
            orbitRef.current.phi = finalOrbit.phi;
            orbitRef.current.radius = finalOrbit.radius;

            camOrbitRef.current = { ...camOrbitRef.current, ...finalOrbit };

            setSettings("camera", { orbit: finalOrbit });
        };

        const endDrag = () => {
            if (!enableOrbit || !isDragging.current) return;
            isDragging.current = false;
            commitOrbit();
        };

        const endPinch = () => {
            if (!isPinching.current) return;
            isPinching.current = false;
            lastPinchDistance.current = null;
            commitOrbit();
        };

        const zoomTo = (newRadius) => {
            const clamped = Math.max(1.5, Math.min(10, newRadius));
            dragOrbit.current.radius = clamped;
            camOrbitRef.current = { ...camOrbitRef.current, radius: clamped };
            setSettings("camera", {
                orbit: { ...camOrbitRef.current, radius: clamped },
            });
        };

        // ── Mouse ─────────────────────────────────────────────

        const onMouseDown = (e) => {
            startDrag(e.clientX, e.clientY);
            if (enableOrbit) el.style.cursor = "grabbing";
        };
        const onMouseUp = () => {
            endDrag();
            if (enableOrbit) el.style.cursor = "grab";
        };
        const onMouseMove = (e) => moveDrag(e.clientX, e.clientY);

        const onWheel = (e) => {
            if (!enableZoom) return;
            e.preventDefault();
            zoomTo(camOrbitRef.current.radius + e.deltaY * 0.01);
        };

        // ── Touch ─────────────────────────────────────────────

        const startPinch = (e) => {
            // Cancelamos cualquier orbit en curso, pero SIN confirmar todavía:
            // el gesto continúa como pinch y se confirmará al levantar los dedos
            isDragging.current = false;
            isPinching.current = true;

            // Partimos del estado actual para que el pinch acumule sobre él
            dragOrbit.current = { ...camOrbitRef.current };

            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            lastPinchDistance.current = Math.hypot(dx, dy);
        };

        const onTouchStart = (e) => {
            if (e.touches.length === 1 && enableOrbit) {
                startDrag(e.touches[0].clientX, e.touches[0].clientY);
            } else if (e.touches.length === 2 && enableZoom) {
                startPinch(e);
            }
        };

        const onTouchMove = (e) => {
            e.preventDefault();

            if (e.touches.length === 1 && enableOrbit && isDragging.current) {
                moveDrag(e.touches[0].clientX, e.touches[0].clientY);
            } else if (
                e.touches.length === 2 &&
                enableZoom &&
                isPinching.current &&
                lastPinchDistance.current !== null
            ) {
                const dx = e.touches[0].clientX - e.touches[1].clientX;
                const dy = e.touches[0].clientY - e.touches[1].clientY;
                const distance = Math.hypot(dx, dy);

                const delta = lastPinchDistance.current - distance;
                lastPinchDistance.current = distance;

                // Acumulamos sobre dragOrbit (no sobre camOrbitRef), que es
                // lo que el useFrame está leyendo mientras isPinching es true
                dragOrbit.current.radius = Math.max(
                    1.5,
                    Math.min(10, dragOrbit.current.radius + delta * 0.03),
                );
            }
        };

        const onTouchEnd = (e) => {
            if (e.touches.length === 0) {
                // Se levantaron todos los dedos: cerramos el gesto que estuviera activo
                endPinch();
                endDrag();
            } else if (e.touches.length === 1) {
                // Queda un dedo tras un pinch: confirmamos el zoom
                // y retomamos como orbit desde la posición del dedo restante
                endPinch();
                if (enableOrbit) {
                    startDrag(e.touches[0].clientX, e.touches[0].clientY);
                }
            }
        };

        const onTouchCancel = () => {
            // El navegador puede robar el gesto (scroll, llamada entrante...):
            // cerramos limpiamente en vez de dejar los refs colgados
            endPinch();
            endDrag();
        };

        // ── Registro ──────────────────────────────────────────

        el.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("mousemove", onMouseMove);
        el.addEventListener("wheel", onWheel, { passive: false });
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: false });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        el.addEventListener("touchcancel", onTouchCancel, { passive: true });

        return () => {
            el.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
            el.removeEventListener("wheel", onWheel);
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", onTouchEnd);
            el.removeEventListener("touchcancel", onTouchCancel);
        };
    }, [enableOrbit, enableZoom]);

    return null;
}

export default CameraController;