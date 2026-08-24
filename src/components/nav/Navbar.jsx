// components/nav/Navbar.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoGithub } from "@gravity-ui/icons";

const NAV_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/docs", label: "Docs" },
    { href: "/lab", label: "Lab" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/10 border-b border-neutral-50/10">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3" style={{ height: "var(--navbar-height)" }}>
                <Link
                    href="/"
                    className="font-mono font-semibold tracking-tight text-neutral-50"
                >
                    Asthree React
                </Link>

                <div className="flex items-center gap-6">
                    {NAV_ITEMS.map((item) => {
                        const active =
                            item.href === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm transition-colors ${
                                    active
                                        ? "text-neutral-50"
                                        : "text-neutral-500 hover:text-neutral-200"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <a
                        href="https://github.com/defu13/asthree-react"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub repository"
                        className="text-neutral-500 hover:text-neutral-200 transition-colors"
                    >
                        <LogoGithub className="w-4 h-4" />
                    </a>

                    <a
                        href="https://www.npmjs.com/package/@defu13/asthree-react"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-mono px-3 py-1.5 rounded-lg border border-neutral-50/10 hover:bg-neutral-800 transition-colors text-neutral-300"
                    >
                        npm
                    </a>
                </div>
            </div>
        </nav>
    );
}
