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
    description:
        "A React component that renders 3D models with a real-time ASCII art effect.",
};

// Se ejecuta ANTES de que React pinte nada, evitando el flash del tema incorrecto
const themeScript = `
(function() {
    try {
        var theme = localStorage.getItem("theme");
        if (theme === "light") {
            document.documentElement.classList.add("theme-light");
        }
    } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${geistSans.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body className="antialiased font-sans">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
