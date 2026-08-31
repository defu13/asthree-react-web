// src/components/docs/MdxTable.jsx

/**
 * Reemplazo del <table> que usa MDX para renderizar tablas.
 * Envuelve la tabla en un contenedor con scroll horizontal propio,
 * evitando que desborde el ancho del artículo en pantallas estrechas.
 */
export function MdxTable({ children, ...props }) {
    return (
        // overflow-x-auto permite hacer scroll lateral SOLO dentro de este div,
        // sin afectar al resto de la página ni forzar overflow global
        <div className="overflow-x-auto my-6 rounded-xl border border-neutral-50/10 p-1.5">
            <table className="w-full m-0" {...props}>
                {children}
            </table>
        </div>
    );
}