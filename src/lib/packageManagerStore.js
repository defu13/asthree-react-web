// src/lib/packageManagerStore.js
import { create } from "zustand";

/**
 * Store global para recordar qué gestor de paquetes (npm/yarn/pnpm)
 * ha elegido el usuario mientras navega por las páginas de docs.
 *
 * Es un store aparte del de renderSettings porque no tiene nada que
 * ver con el Lab — solo afecta a cómo se muestran los comandos de
 * instalación en la documentación.
 */
export const usePackageManagerStore = create((set) => ({
    // "npm" | "yarn" | "pnpm" — npm es el valor por defecto pedido
    manager: "npm",

    setManager: (manager) => set({ manager }),
}));

/**
 * Traduce un comando de instalación escrito en formato npm
 * (ej: "npm i react react-dom") al equivalente de yarn o pnpm.
 *
 * Solo reconoce el prefijo "npm i" / "npm install" — el resto de
 * la línea (los paquetes) se reutiliza tal cual para los tres gestores.
 */
export function translateInstallCommand(npmCommand, manager) {
    // Extraemos la lista de paquetes quitando el prefijo "npm i "/"npm install "
    const packages = npmCommand.replace(/^npm (i|install)\s+/, "");

    switch (manager) {
        case "yarn":
            return `yarn add ${packages}`;
        case "pnpm":
            return `pnpm add ${packages}`;
        case "npm":
        default:
            return npmCommand;
    }
}