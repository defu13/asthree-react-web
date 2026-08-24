import { Geist } from "next/font/google";
import Navbar from "@/components/nav/Navbar";
import "./globals.css";

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

export const metadata = {
    title: "Asthree React — 3D ASCII render for React",
    description: "A React component that renders 3D models with a real-time ASCII art effect.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`dark ${geistSans.variable}`} data-theme="dark">
            <body className="antialiased font-sans">
                <Navbar />
                {children}
            </body>
        </html>
    );
}