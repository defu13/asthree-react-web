// src/components/home/DropdownToken.jsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "@gravity-ui/icons";

export function DropdownToken({ value, options, onChange, colorClass = "text-sky-300", hoverBgClass = "hover:bg-sky-200/20", bgClass = "bg-sky-300/15" }) {
    const [open, setOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const menuRef    = useRef(null);

    const updateCoords = useCallback(() => {
        if (!triggerRef.current) return;
        const rect = triggerRef.current.getBoundingClientRect();
        setCoords({
            top:  rect.bottom + window.scrollY + 6,
            left: rect.left + window.scrollX,
        });
    }, []);

    const toggleOpen = () => {
        if (!open) updateCoords();
        setOpen((o) => !o);
    };

    useEffect(() => {
        if (!open) return;

        const onClickOutside = (e) => {
            if (
                triggerRef.current && !triggerRef.current.contains(e.target) &&
                menuRef.current && !menuRef.current.contains(e.target)
            ) {
                setOpen(false);
            }
        };

        // Reposicionar si hay scroll o resize mientras está abierto
        const onReposition = () => updateCoords();

        document.addEventListener("mousedown", onClickOutside);
        window.addEventListener("scroll", onReposition, true);
        window.addEventListener("resize", onReposition);

        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            window.removeEventListener("scroll", onReposition, true);
            window.removeEventListener("resize", onReposition);
        };
    }, [open, updateCoords]);

    return (
        <span ref={triggerRef} className="relative inline-block">
            <span
                onClick={toggleOpen}
                className={`cursor-pointer inline-flex items-center gap-0.5 ${colorClass} p-0.5 ${bgClass} ${hoverBgClass} rounded-sm transition-colors`}
            >
                {value}
                <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
            </span>

            {open && typeof document !== "undefined" &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={{ position: "absolute", top: coords.top, left: coords.left }}
                        className={`min-w-[120px] rounded-sm ${colorClass} p-1.5 ${bgClass} backdrop-blur-md shadow-xl overflow-hidden z-[999]`}
                    >
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setOpen(false);
                                }}
                                className={`w-full text-left p-0.5 ${hoverBgClass} transition-colors rounded-sm cursor-pointer font-mono text-[13px] leading-relaxed ${
                                    opt.value === value ? hoverBgClass : colorClass
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>,
                    document.body
                )
            }
        </span>
    );
}