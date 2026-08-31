// app/docs/layout.js
"use client";
import DocsSidebar from "@/components/nav/DocsSidebar";
import FooterComponent from "@/components/ui/FooterComponent";

export default function DocsLayout({ children }) {
    return (
        <div
            className="mx-auto flex flex-col md:flex-row"
        >
            <DocsSidebar />
            <div className="flex-1 py-8 min-w-0">
                <main className="flex-1">{children}</main>
                <div className="w-full max-w-5xl mx-auto md:px-8 px-6 mt-32">
                    <FooterComponent />
                </div>
            </div>
        </div>
    );
}
