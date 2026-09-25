import { Geist } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

// METADATA
const SITE_URL = "https://asthreereact.dev";

export const metadata = {
    // metadataBase resuelve automáticamente todas las URLs relativas
    // de OpenGraph/Twitter que definas más abajo, en cualquier página
    metadataBase: new URL(SITE_URL),

    title: {
        default: "Asthree React — Real-time ASCII 3D render for React",
        template: "%s — Asthree React", // así /docs/usage sale como "Usage — Asthree React"
    },
    description:
        "A React component that renders 3D models with a real-time ASCII art effect. Interactive, customizable, and easy to drop into any React project.",

    keywords: [
        "react",
        "three.js",
        "ascii art",
        "3d render",
        "react component",
        "webgl",
        "react three fiber",
        "npm package",
        "ascii render",
        "ascii 3d render",
        "ascii 3d",
        "canvas",
        "asthree",
        "asthree react",
        "asthreereact",
        "react ascii editor online",
    ],

    authors: [
        { name: "Yubal De Fuente", url: "https://yubaldefuente.vercel.app" },
    ],
    creator: "Yubal De Fuente",

    // OpenGraph: cómo se ve el link al compartirlo en redes/Slack/Discord
    openGraph: {
        type: "website",
        url: SITE_URL,
        siteName: "Asthree React",
        title: "Asthree React — Real-time ASCII 3D render for React",
        description:
            "A React component that renders 3D models with a real-time ASCII art effect.",
        images: [
            {
                url: "/og-image.png", // hay que crear esta imagen, 1200x630px
                width: 1200,
                height: 630,
                alt: "Asthree React",
            },
        ],
    },

    // Twitter/X card
    twitter: {
        card: "summary_large_image",
        title: "Asthree React — Real-time ASCII 3D render for React",
        description:
            "A React component that renders 3D models with a real-time ASCII art effect.",
        images: ["/og-image.png"],
    },

    // Verificación de Google Search Console — la rellenas en el Paso 5
    verification: {
        google: "google-site-verification=olD8NZEpoa71rWuQY_hR3DfdK4tLfxIslJwaWcQ_BIo",
    },

    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable}`}
            suppressHydrationWarning
        >
            <body
                className="antialiased font-sans"
                style={{ overflow: "hidden" }}
            >
                <Analytics />
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
