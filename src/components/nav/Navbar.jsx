// components/nav/Navbar.js
"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoGithub, Bars } from "@gravity-ui/icons";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
    { href: "/docs/introduction", label: "Docs" },
    { href: "/lab", label: "Lab" },
];

/**
 * Calcula todos los valores visuales del navbar a partir de su "modo" actual.
 * Centralizar esto en una función evita repetir ternarios por todo el JSX:
 * el JSX solo consume el resultado, no decide nada por sí mismo.
 *
 * @param {"docs" | "floating"} mode - "docs" = navbar fijo con borde inferior (Docs/Lab)
 *                                      "floating" = navbar flotante tipo pill (Home)
 * @param {boolean} isActive - true si el navbar debe verse "activado"
 *                              (scrolleado en modo floating, o menú móvil abierto)
 */
function getNavbarStyle(mode, isActive) {
    // Modo "docs": siempre con blur y borde inferior, nunca cambia con el scroll
    if (mode === "docs") {
        return {
            maxWidth: undefined,
            borderColor: "",
            backgroundColor: "rgba(0,0,0,0)",
            blur: "blur(12px)",
            wrapperClass: "border-neutral-50/10 border-b",
            outerPadding: "",
        };
    }

    // Modo "floating": pill flotante que se compacta y oscurece al hacer scroll
    // (o al abrir el menú móvil, que se trata visualmente igual que "scrolleado")
    return {
        maxWidth: isActive ? 1280 : 1920,
        borderColor: isActive ? "rgba(245,245,245,0.1)" : "rgba(245,245,245,0)",
        backgroundColor: isActive ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0)",
        blur: isActive ? "blur(12px)" : "blur(0px)",
        wrapperClass: "border rounded-xl mt-3",
        outerPadding: "px-6",
    };
}

function NavItem({ item, active }) {
    return (
        <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-mono transition-colors ${
                active
                    ? "text-neutral-50"
                    : "text-neutral-400 hover:text-neutral-200"
            }`}
        >
            {item.label}
        </Link>
    );
}

export default function Navbar() {
    const pathname = usePathname();

    // Determinamos el "modo" del navbar a partir de la ruta actual
    const mode = pathname.startsWith("/docs") || pathname.startsWith("/lab")
        ? "docs"
        : "floating";

    const [scrolled, setScrolled] = useState(false);

    const [mobileOpen, setMobileOpen] = useState(false);

    // Detectar cuando se hace scroll
    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 16); // umbral de 16px antes de activar
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Cierra el desplegable móvil automáticamente al cambiar de ruta
    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    // El navbar se considera "activo" (compacto) si hay scroll o si el menú móvil está abierto
    const isActive = scrolled || mobileOpen;

    // Recalculamos el objeto de estilo solo cuando cambian sus dependencias reales
    const style = useMemo(() => getNavbarStyle(mode, isActive), [mode, isActive]);

    return (
        <div
            className={`fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none ${style.outerPadding}`}
        >
            <motion.nav
                animate={{
                    maxWidth: style.maxWidth,
                    borderColor: style.borderColor,
                    backgroundColor: style.backgroundColor,
                }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className={`pointer-events-auto w-full px-6 ${style.wrapperClass}`}
                style={{
                    backdropFilter: style.blur,
                    WebkitBackdropFilter: style.blur,
                }}
            >
                <div
                    className="flex items-center justify-between py-3 xs:gap-6 gap-3"
                    style={{ height: "var(--navbar-height)" }}
                >
                    <div className="flex items-center xs:gap-6 gap-3">
                        <Link
                            href="/"
                            className="font-semibold tracking-tight text-neutral-50 text-shadow-md leading-4 not-xs:text-sm"
                        >
                            Asthree React
                        </Link>
                        <span>/</span>

                        {/* Enlaces Docs/Lab — se ocultan por debajo de 480px (breakpoint "xs") */}
                        <div className="hidden xs:flex items-center gap-6">
                            {NAV_ITEMS.map((item) => {
                                const active =
                                    item.href === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(item.href);

                                return (
                                    <NavItem
                                        key={item.href}
                                        item={item}
                                        active={active}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Bloque derecho: theme toggle, github, npm, y hamburguesa en móvil */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <a
                            href="https://github.com/defu13/asthree-react"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub repository"
                            className="px-1.5 py-1.5 rounded-lg border border-neutral-50/10 hover:bg-neutral-800 transition-colors text-neutral-300"
                        >
                            <LogoGithub className="w-4 h-4" />
                        </a>

                        <a
                            href="https://www.npmjs.com/package/@defu13/asthree-react"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="npm package"
                            className="text-xs font-mono px-3 py-1.5 rounded-lg border border-neutral-50/10 hover:bg-neutral-800 transition-colors text-neutral-300"
                        >
                            npm
                        </a>
                        {/* Botón hamburguesa — solo visible por debajo de 480px */}
                        <button
                            onClick={() => setMobileOpen((o) => !o)}
                            aria-label="Toggle menu"
                            className="cursor-pointer xs:hidden px-1.5 py-1.5 rounded-lg border border-neutral-50/10 hover:bg-neutral-800 transition-colors text-neutral-300"
                        >
                            <Bars className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Panel desplegable móvil — contiene los enlaces ocultos por el breakpoint xs */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="xs:hidden overflow-hidden border-t border-neutral-50/10 z-50"
                        >
                            <div className="flex flex-col py-3 gap-3 text-end">
                                {NAV_ITEMS.map((item) => {
                                    const active = pathname.startsWith(
                                        item.href,
                                    );
                                    return (
                                        <NavItem
                                            key={item.href}
                                            item={item}
                                            active={active}
                                        />
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}
