# Dunia Anura — Exotic Frogs & Marine Fish

Website showcase katak eksotis dan ikan laut hias, dilengkapi blog artikel edukatif, maskot 3D interaktif, dan filtering kategori. Dibangun dengan React + Vite + Tailwind CSS v4, dengan UI yang dipadu dari komponen Radix UI dan MUI serta animasi Framer Motion.

> Proyek portfolio personal — desain awal di-export dari Figma Make lalu dikembangkan lebih lanjut.

## Live Demo

- **Vercel:** https://dunia-anura-design.vercel.app
- **Repo:** https://github.com/Swordekel/dunia-anura-design

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite 6
- **Styling:** Tailwind CSS v4, CSS variables theming
- **UI primitives:** Radix UI, Material UI (`@mui/material`)
- **3D:** Three.js via `@react-three/fiber` + `@react-three/drei` (frog mascot)
- **Animasi:** Framer Motion (`motion`)
- **Form / interaksi:** React Hook Form, Embla Carousel, React Slick
- **Charts:** Recharts

## Fitur Utama

- **Showcase hewan** — grid katak & ikan dengan filter kategori dan subkategori
- **Blog artikel** — daftar artikel + halaman detail, view counter berbasis `localStorage`
- **Maskot katak 3D** — interaktif, di-render via react-three-fiber
- **Section YouTube** — embed konten video
- **Content protection hook** — proteksi sederhana (disable right-click, devtools shortcut) sebagai eksperimen UX
- **Admin view stats** — panel statistik artikel (hanya aktif di mode development)
- **Responsive UI** — mobile-first dengan Tailwind
- **SPA navigation** — state-based routing antar halaman

## Struktur Proyek

```
src/
├── main.tsx
├── app/
│   ├── App.tsx
│   ├── components/        # Hero, AnimalGrid, BlogHome, ArticleDetail, FrogMascot3D, ...
│   ├── data/              # animals.ts, articles.ts
│   ├── hooks/             # useContentProtection
│   └── utils/             # viewCounter
├── assets/                # gambar artikel & hewan
└── styles/                # tailwind.css, theme.css, fonts.css, index.css
public/
└── videos/                # aset video lokal
```

## Setup Lokal

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # output di dist/
```

## Deployment

Di-deploy ke Vercel. Konfigurasi build di [`vercel.json`](vercel.json):

- Framework preset: `vite`
- Build command: `npm run build`
- Output: `dist/`
- SPA rewrite ke `index.html` untuk semua route

## Roadmap (potensi peningkatan)

- Migrasi state-based routing ke React Router untuk URL yang bisa dibookmark/share
- Lazy-load section berat (3D mascot, charts) dengan `React.lazy` + `Suspense`
- Pindahkan view counter ke backend (Supabase / Vercel KV) agar lintas-device
- Tambahkan CMS untuk artikel (Sanity / MDX)
- Image optimization via `next-gen formats` + lazy loading
- Unit tests untuk utility (`viewCounter`) dan integration tests untuk navigasi

## Lisensi

Lihat [`ATTRIBUTIONS.md`](ATTRIBUTIONS.md) untuk atribusi aset pihak ketiga.
