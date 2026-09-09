// src/lib/livePreview.js

/**
 * Almacén de valores "en vivo" completamente fuera de React.
 *
 * No es un store de Zustand ni dispara re-renders — es un simple objeto
 * mutable con un sistema de listeners manual. Escribir aquí en cada tick
 * de un slider es prácticamente gratis (una asignación de propiedad +
 * notificar a quien esté escuchando ESE campo concreto).
 *
 * Los componentes 3D (Three.js) leen de aquí en su propio bucle de
 * renderizado (useFrame), que ya corre cada frame de todas formas —
 * no añadimos ningún trabajo nuevo, solo evitamos pasar por Zustand.
 */

// path -> valor actual en vivo (ej: "model.position.x" -> 3.2)
const liveValues = {};

// path -> Set de callbacks suscritos a ese path concreto
const listeners = {};

/**
 * Escribe un valor en vivo para un path y notifica a sus suscriptores.
 * Se llama en cada tick del drag (onChange del slider).
 */
export function setLivePreview(path, value) {
    liveValues[path] = value;

    // Notificamos solo a quien esté escuchando ESTE path exacto,
    // no a todos los suscriptores del sistema
    listeners[path]?.forEach((cb) => cb(value));
}

/**
 * Lee el valor en vivo actual de un path, o undefined si no hay override activo.
 */
export function getLivePreview(path) {
    return liveValues[path];
}

/**
 * Limpia el override de un path — se llama al soltar el slider,
 * una vez el valor ya se confirmó en el store persistente (Zustand).
 */
export function clearLivePreview(path) {
    delete liveValues[path];
    listeners[path]?.forEach((cb) => cb(undefined));
}

/**
 * Suscribe un callback a los cambios de un path concreto.
 * Devuelve una función de limpieza (unsubscribe).
 */
export function subscribeLivePreview(path, callback) {
    if (!listeners[path]) listeners[path] = new Set();
    listeners[path].add(callback);
    return () => listeners[path].delete(callback);
}