import AsciiScene from "./three/AsciiScene";
import HydrationGate from "./HydrationGate";
import Noise from "./Noise";
import RenderControls from "./RenderControls";
import Sidebar from "./Sidebar";
import useAccentColor from "@/hooks/useAccentColor";
import usePresetSync from "@/hooks/usePresetSync";
import { AnimatePresence, motion } from "motion/react";

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
        <div className="font-mono dark asthree-lab">
            <PresetSync />
            <AccentSync />
            <HydrationGate>
                <main className="h-full w-full flex">
                    <Sidebar>
                        <RenderControls />
                    </Sidebar>
                    <AnimatePresence>
                        <motion.div
                        className="w-full h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            <AsciiScene />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </HydrationGate>
            <div className="absolute block inset-0 -z-20 pointer-events-none">
                <Noise patternAlpha={4} />
            </div>
        </div>
    );
}

export default LabApp;
