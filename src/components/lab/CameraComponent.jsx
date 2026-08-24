
import { useRenderSettings } from "@/lib/renderSettings";
import CameraTargetComponent from "./CameraTargetComponent";
import { Label, Slider } from "@heroui/react";

function CameraComponent() {
    const { camera, setSettings } = useRenderSettings();
    return (
        <section className="w-full flex flex-col gap-4 overflow-x-hidden">
           
            {/* CAMERA POSITION */}
            <CameraTargetComponent />

            {/* FOV */}
            <Slider
                className="w-full px-4"
                value={camera.fov}
                minValue={1}
                maxValue={150}
                step={1}
                onChange={(value) =>
                    setSettings("camera", {
                        fov: value,
                    })
                }
            >
                <Label className="text-xs text-neutral-500 uppercase tracking-wider">Fov</Label>
                <Slider.Output />
                <Slider.Track>
                    <Slider.Fill />
                    <Slider.Thumb />
                </Slider.Track>
            </Slider>
        </section>
    );
}

export default CameraComponent;
