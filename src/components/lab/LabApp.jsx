import AsciiScene from "./three/AsciiScene";
import HydrationGate from "./HydrationGate";
import Noise from "./Noise";
import RenderControls from "./RenderControls";
import Sidebar from "./Sidebar";
import useAccentColor from "@/hooks/useAccentColor";
import usePresetSync from "@/hooks/usePresetSync";

function AccentSync() {
    useAccentColor();
    return null;
}

function PresetSync() {
    usePresetSync();
    return null;
}

function LabApp() {
    return (
        <div className="font-mono">
            <PresetSync />
            <AccentSync />
            <HydrationGate>
                <main className="h-full w-full flex">
                    <Sidebar>
                        <RenderControls />
                    </Sidebar>
                    <AsciiScene />
                </main>
            </HydrationGate>
            <div className="absolute block inset-0 -z-20 pointer-events-none">
                <Noise patternAlpha={6} />
            </div>
        </div>
    );
}

export default LabApp;
