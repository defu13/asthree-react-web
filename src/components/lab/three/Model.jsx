// components/Model.jsx
"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MeshStandardMaterial } from "three";
import { useRenderSettings } from "@/lib/renderSettings";
import { useModelStore, PRESET_MODELS } from "@/lib/modelStore";

useGLTF.preload(PRESET_MODELS[0].path);

function UserModel({ path, scale }) {
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

    return <primitive object={scene} scale={scale} />;
}

export default function Model() {
    const groupRef   = useRef(null);
    const autoY      = useRef(0);
    const { model }  = useRenderSettings();
    const activePath = useModelStore((s) => s.activePath);

    useFrame((_, delta) => {
        if (!groupRef.current) return;
        if (model.autoRotate) autoY.current += delta * model.autoRotateSpeed;
        groupRef.current.rotation.x = model.rotation.x + model.tilt.forward;
        groupRef.current.rotation.y = model.rotation.y + autoY.current;
        groupRef.current.rotation.z = model.rotation.z + model.tilt.left;
    });

    return (
        <group
            ref={groupRef}
            position={[model.position.x, model.position.y, model.position.z]}
        >
            <UserModel path={activePath} scale={model.scale} />
        </group>
    );
}