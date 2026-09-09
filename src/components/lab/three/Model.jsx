// components/Model.jsx
"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MeshStandardMaterial } from "three";
import { useRenderSettings } from "@/lib/renderSettings";
import { useModelStore, PRESET_MODELS } from "@/lib/modelStore";
import { getLivePreview } from "@/lib/livePreview";

// useGLTF.preload(PRESET_MODELS[0].path);

function UserModel({ path }) {
    const { scene } = useGLTF(path);

    const basicMat = useMemo(
        () =>
            new MeshStandardMaterial({
                color: "#917AFF",
                roughness: 0.12,
                metalness: 0,
                flatShading: false,
            }),
        [],
    );

    useEffect(() => {
        scene.traverse((obj) => {
            if (obj.isMesh) {
                const originalMat = obj.material;
                if (originalMat && originalMat.dispose && originalMat !== basicMat) {
                    try { originalMat.dispose(); } catch (e) {}
                }
                obj.material = basicMat;
            }
        });
        return () => {
            try { basicMat.dispose(); } catch (e) {}
        };
    }, [scene, basicMat]);

    return <primitive object={scene} />;
}

export default function Model() {
    const groupRef   = useRef(null);
    const autoY      = useRef(0);
    const model      = useRenderSettings((s) => s.model);
    const activePath = useModelStore((s) => s.activePath);

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        // Cada campo: si hay override en vivo (usuario arrastrando ese slider
        // ahora mismo), lo usamos; si no, el valor persistente normal
        const posX  = getLivePreview("model.position.x")  ?? model.position.x;
        const posY  = getLivePreview("model.position.y")  ?? model.position.y;
        const posZ  = getLivePreview("model.position.z")  ?? model.position.z;
        const rotX  = getLivePreview("model.rotation.x")  ?? model.rotation.x;
        const rotY  = getLivePreview("model.rotation.y")  ?? model.rotation.y;
        const rotZ  = getLivePreview("model.rotation.z")  ?? model.rotation.z;
        const tiltF = getLivePreview("model.tilt.forward") ?? model.tilt.forward;
        const tiltL = getLivePreview("model.tilt.left")     ?? model.tilt.left;
        const speed = getLivePreview("model.autoRotateSpeed") ?? model.autoRotateSpeed;
        const scale = getLivePreview("model.scale") ?? model.scale;

        if (model.autoRotate) autoY.current += delta * speed;

        groupRef.current.position.set(posX, posY, posZ);
        groupRef.current.rotation.x = rotX + tiltF;
        groupRef.current.rotation.y = rotY + autoY.current;
        groupRef.current.rotation.z = rotZ + tiltL;
        groupRef.current.scale.setScalar(scale);
    });

    return (
        <group
            ref={groupRef}
            // position={[model.position.x, model.position.y, model.position.z]}
        >
            <UserModel path={activePath} />
        </group>
    );
}