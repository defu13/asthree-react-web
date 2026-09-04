// app/docs/layout.js
"use client";
import DocsSidebar from "@/components/nav/DocsSidebar";
import FooterComponent from "@/components/ui/FooterComponent";

export default function DocsLayout({ children }) {
    return (
        <div className="mx-auto flex flex-col md:flex-row">
            <DocsSidebar />
            <div className="flex-1 pt-8 min-w-0">
                <main className="flex-1">{children}</main>
                
                {/* Separator */}
                <div
                    className="w-full h-px mt-32"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, .08) 30%, rgba(255, 255, 255, .08) 70%, transparent 100%)",
                    }}
                />

                {/* Footer */}
                <div className="w-full max-w-5xl mx-auto md:px-8 px-6">
                    <FooterComponent className="py-12" />
                </div>
            </div>
        </div>
    );
}
