import Hero from "@/components/home/Hero";
import { SplashScreen } from "@/components/home/SplashScreen";

export const metadata = {
    title: "Asthree React — Interactive ASCII 3D for React",
    description:
        "Turn your 3D models into interactive ASCII art. A React component with real-time rendering, presets, and full customization.",
    alternates: {
        canonical: "/",
    },
};

export default function Home() {
    return (
        <>
            <SplashScreen />
            <Hero />
        </>
    );
}
