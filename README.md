# Portofolio Julpiansyah (React + Vite)

Portfolio personal **one-page scrolling** dengan design system *Dark Editorial Futurism* (Figma).

## Struktur halaman

- `/` — satu halaman: Hero → About → Stack → AI Tools → Work → Experience → Certificates → Contact → Footer
- `/certificates` → dialihkan ke `/#certificates`; `/projects` → `/#work`

## Teknologi

- **React 19** + **Vite**
- **Tailwind CSS v4** (`@tailwindcss/vite`) — token desain di `src/index.css`
- **Framer Motion** — animasi reveal, marquee, timeline
- **React Router DOM**
- **React Icons** + SVG dari `@lobehub/icons-static-svg` (MIT) di `src/components/icons/LobeIcons.jsx`

Font: Instrument Serif, Geist, JetBrains Mono (Google Fonts).

Arah visual: "Nocturne Editorial" — atmosfer gelap sinematik dengan cahaya ambient lime, fine grain, permukaan berlapis dengan spotlight, dan sistem tombol pill.

## Struktur kode

```
src/
  data/portfolio.js        # seluruh konten (profil, stack, AI tools, project, pengalaman, kontak)
  data/certificates.js     # data sertifikat (+ info yang tertera pada sertifikat)
  assets/certificates/     # render PDF sertifikat per halaman (WebP sm 1100px & lg 2400px)
  components/layout/       # Navbar, Footer, Atmosphere (cahaya, grain, garis), PageTransition
  components/sections/     # Hero, About, Stack, AITools, Work, Experience, Contact
  components/ui/           # Button (pill: primary/secondary/ghost), SectionHeader, IconTile, Magnetic, MaskLine, SplitText, ...
  hooks/                   # useTheme, useLocalTime, useActiveSection
```

## Tema

Dark (default) dan Light, toggle di navbar; pilihan disimpan di `localStorage`.
Animasi otomatis dinonaktifkan bila sistem meminta `prefers-reduced-motion`.

## Cara menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build produksi ke dist/
npm run lint
```

## Catatan

- PDF sertifikat asli tetap di `public/assets/certificates/` sebagai arsip (tautan "PDF" di lightbox).
- Sertifikat ditampilkan sebagai gambar; klik untuk lightbox (zoom, geser, navigasi halaman, Esc untuk menutup).
- Foto hero (`src/assets/profile-cutout.webp`, ±41 KB) adalah foto asli dengan latar dihapus.
