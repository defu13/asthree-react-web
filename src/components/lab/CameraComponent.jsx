
import CameraTargetComponent from "./CameraTargetComponent";
import { Label, Slider } from "@heroui/react";
import { useDeferredSetting } from "@/hooks/useDeferredSetting";

function CameraComponent() {
    const fov = useDeferredSetting("camera", "fov");
    return (
        <section className="w-full flex flex-col gap-4 overflow-x-hidden">
           
            {/* CAMERA POSITION */}
            <CameraTargetComponent />

            {/* FOV */}
            <Slider
                className="w-full px-4"
                value={fov.localValue}
                minValue={1}
                maxValue={150}
                step={1}
                onChange={fov.onChange}
                onChangeEnd={fov.onChangeEnd}
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
