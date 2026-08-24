// app/docs/layout.js
import DocsSidebar from "@/components/nav/DocsSidebar";

export default function DocsLayout({ children }) {
    return (
        <div
            className="max-w-7xl mx-auto flex px-6"
            style={{
                height: "calc(100vh - var(--navbar-height))",
                marginTop: "var(--navbar-height)",
            }}
        >
            <DocsSidebar />
            <main className="flex-1 py-8 pl-8 min-w-0">{children}</main>
        </div>
    );
}