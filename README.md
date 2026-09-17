# Asthree React — Website & Lab

The official website, documentation, and interactive editor for [`@defu13/asthree-react`](https://www.npmjs.com/package/@defu13/asthree-react) — a React component that renders 3D models with a real-time ASCII art effect.

**[Live site](https://asthreereact.vercel.app/)** · **[Documentation](https://asthreereact.vercel.app/docs)** · **[Lab (live editor)](https://asthreereact.vercel.app/lab)**

---

## What's in this repo

This is a Next.js application with three main sections:

- **Home** (`/`) — landing page with a live, interactive demo of the component
- **Docs** (`/docs`) — full documentation: installation, usage, props reference, and the preset system
- **Lab** (`/lab`) — a visual editor for configuring the component in real time. Every parameter (ASCII style, colors, lighting, camera, post-effects) updates the 3D preview instantly and generates a short, shareable preset code that plugs directly into the `preset` prop of `<AsthreeRender />`

The published npm package itself lives in a [separate repository](https://github.com/defu13/asthree-react) — this project consumes it (in the Home demo) and provides the tooling around it.

---

## Tech stack

- [Next.js](https://nextjs.org) (App Router) — framework
- [React Three Fiber](https://github.com/pmndrs/react-three-fiber) / [Three.js](https://threejs.org) — 3D rendering
- [postprocessing](https://github.com/pmndrs/postprocessing) — post-processing effects pipeline
- [Zustand](https://github.com/pmndrs/zustand) — state management (Lab editor)
- [HeroUI](https://heroui.com) — UI components
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Motion](https://motion.dev) — animations
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) + [Shiki](https://shiki.style) — documentation content and syntax highlighting

---

## Getting started

### Install dependencies

```bash
npm install
```

### Assets

The Lab and the Home demo need a default `.glb` model and an `.hdr` lighting file:

```
public/models/model.glb
public/hdr/studio.hdr
```

Free options: a model from [Sketchfab](https://sketchfab.com/feed), an HDR from [Poly Haven](https://polyhaven.com/a/studio_small_03).

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
npm run start
```

---

## Project structure

```
src/
├── app/
│   ├── page.js              # Home
│   ├── docs/                # Documentation routes (MDX-driven)
│   └── lab/                 # Lab editor route
├── components/
│   ├── home/                # Landing page components
│   ├── docs/                # Docs-specific UI (TOC, code blocks, tables)
│   ├── nav/                 # Navbar, docs sidebar
│   └── lab/                 # The full Lab editor (Three.js scene, settings panels)
├── content/                  # .mdx files — one per documentation page
├── lib/                      # Zustand stores, preset encode/decode, shared utils
└── hooks/                    # Shared hooks (deferred settings, copy-to-clipboard, etc.)
```

---

## Deployment

This project is deployed on [Vercel](https://vercel.com). Pushes to the main branch deploy automatically.

---

## Related

- [`@defu13/asthree-react`](https://www.npmjs.com/package/@defu13/asthree-react) — the npm package
- [asthree-react on GitHub](https://github.com/defu13/asthree-react) — package source

---

## License

MIT © [Yubal De Fuente](https://yubaldefuente.vercel.app)