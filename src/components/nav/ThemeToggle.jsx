// src/components/nav/ThemeToggle.jsx
"use client";
import { Sun, Moon } from "@gravity-ui/icons";

export default function ThemeToggle() {
    const toggle = () => {
        const html = document.documentElement;
        const next = !html.classList.contains("theme-light");

        html.classList.toggle("theme-light", next);
        localStorage.setItem("theme", next ? "light" : "dark");
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="cursor-pointer px-1.5 py-1.5 rounded-lg border border-neutral-50/10 hover:bg-neutral-800 transition-colors text-neutral-300"
        >
            <Sun className="theme-icon-sun w-4 h-4" />
            <Moon className="theme-icon-moon w-4 h-4" />
        </button>
    );
}