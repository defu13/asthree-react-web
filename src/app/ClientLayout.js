// app/ClientLayout.js — todo lo que necesita "use client"
"use client";

import { useRef } from "react";
import Navbar from "@/components/nav/Navbar";
import { ScrollContainerProvider } from "@/lib/ScrollContainerContext";

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

export default function ClientLayout({ children }) {
    const scrollRef = useRef(null);

    return (
        <>
            <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            <ScrollContainerProvider containerRef={scrollRef}>
                <Navbar />
                {children}
            </ScrollContainerProvider>
        </>
    );
}