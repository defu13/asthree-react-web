// src/components/home/CodeWindow.jsx
export function CodeWindow({ children }) {
    return (
        <div className="rounded-xl overflow-hidden border border-neutral-50/10 bg-neutral-900/10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-50/10">
                <span className="w-2.5 h-2.5 rounded-full border border-neutral-50/10" />
                <span className="w-2.5 h-2.5 rounded-full border border-neutral-50/10" />
                <span className="w-2.5 h-2.5 rounded-full border border-neutral-50/10" />
            </div>
            <pre className="p-5 text-[13px] leading-relaxed font-mono overflow-x-auto whitespace-pre">
                <code>{children}</code>
            </pre>
        </div>
    );
}