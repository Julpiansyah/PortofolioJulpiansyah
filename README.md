# Portofolio Julpiansyah (React + Vite)

Portfolio personal **one-page scrolling** dengan design system *Dark Editorial Futurism* (Figma).

## Struktur halaman

- `/` — satu halaman: Hero → About → Stack → AI Tools → Work → Experience → Contact → Footer
- `/certificates` — halaman sertifikat (PDF dibuka di tab baru)
- `/projects` — dialihkan ke `/#work`

## Teknologi

- **React 19** + **Vite**
- **Tailwind CSS v4** (`@tailwindcss/vite`) — token desain di `src/index.css`
- **Framer Motion** — animasi reveal, marquee, timeline
- **React Router DOM**
- **React Icons** + SVG dari `@lobehub/icons-static-svg` (MIT) di `src/components/icons/LobeIcons.jsx`

Font (self-hosted, SIL OFL 1.1, lisensi di `public/fonts/*/OFL.txt`):
- **Gasoek One** — identitas utama: nama, judul section, judul kartu, CTA besar, footer.
- **Archivo** — pendamping netral untuk paragraf, label, navigasi, dan teks kecil.

Arah visual: "Nocturne Editorial" — atmosfer gelap sinematik dengan cahaya ambient lime, fine grain, permukaan berlapis dengan spotlight, dan sistem tombol pill.

## Struktur kode

```
src/
  data/portfolio.js        # seluruh konten (profil, stack, AI tools, project, pengalaman, kontak)
  data/certificates.js     # data sertifikat
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

- Asset statis (PDF sertifikat) ada di `public/assets/`.
- Foto hero (`src/assets/profile-cutout.webp`, ±41 KB) adalah foto asli dengan latar dihapus.
