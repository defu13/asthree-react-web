// app/lab/page.js
import LabApp from "@/components/lab/LabApp";

export const metadata = {
    title: "Lab — Visual Editor",
    description:
        "Configure your ASCII 3D render visually. Adjust every parameter in real time and generate a shareable preset code.",
    alternates: {
        canonical: "/lab",
    },
};

export default function LabPage() {
    return <LabApp />;
}