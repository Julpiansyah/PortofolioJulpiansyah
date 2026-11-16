/*
 * Seluruh konten portfolio.
 * Sumber: desain Figma, data lama project, dan materi dari pemilik portfolio.
 * Jangan menambahkan informasi yang tidak terverifikasi.
 */
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiLaravel,
  SiNodedotjs,
  SiExpress,
  SiFlutter,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVite,
  SiFramer,
  SiPython,
  SiTypescript,
  SiCplusplus,
  SiPhp,
  SiDart,
  SiGo,
  SiGithubcopilot,
  SiWindsurf,
  SiZedindustries,
  SiJetbrains,
  SiReplit,
  SiV0,
  SiQodo,
  SiClaude,
  SiOpenai,
  SiGooglegemini,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa6';
import { TbBrandCSharp } from 'react-icons/tb';
import { GrOracle } from 'react-icons/gr';
import { DiMsqlServer } from 'react-icons/di';
import {
  CursorIcon,
  ClaudeCodeIcon,
  CodexIcon,
  GeminiCliIcon,
  OpenCodeIcon,
  ClineIcon,
  RooCodeIcon,
  KiloCodeIcon,
  DevinIcon,
  LovableIcon,
  OpenHandsIcon,
  DeepSeekIcon,
  QwenIcon,
} from '../components/icons/LobeIcons';

export const personal = {
  firstName: 'Muhamad',
  middleName: 'Mulyana',
  lastName: 'Julpiansyah',
  fullName: 'Muhamad Mulyana Julpiansyah',
  tagline: 'I build things that ship, from web to mobile.',
  intro:
    'Full-stack and mobile developer. Grade 12 at SMK Wikrama Bogor, building real products since day one.',
  availability: 'Open for internships & freelance',
  city: 'Bogor, ID',
  location: 'Bogor, Indonesia',
  email: 'yanajulpian@gmail.com',
  phone: '+62 858-8019-1716',
  phoneHref: 'tel:+6285880191716',
};

export const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Stack', id: 'stack' },
  { label: 'Work', id: 'work' },
  { label: 'Experience', id: 'experience' },
  { label: 'Certificates', id: 'certificates' },
  { label: 'Contact', id: 'contact' },
];

// handle = diturunkan dari URL yang sudah ada (bukan akun baru)
export const socials = [
  { label: 'GitHub', url: 'https://github.com/Julpiansyah', handle: '@Julpiansyah' },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/muhamad-mulyana-julpiansyah-064a1b410/',
    handle: 'Muhamad Mulyana Julpiansyah',
  },
  { label: 'Instagram', url: 'https://www.instagram.com/yanajulpian.s/', handle: '@yanajulpian.s' },
];

/* ---------- About (teks persis dari Figma) ---------- */
export const about = {
  // `accent: true` = kata yang disorot warna accent di Figma
  paragraph: [
    { text: 'I’m' },
    { text: 'Muhamad', accent: true },
    { text: 'Mulyana Julpiansyah, a' },
    { text: 'full-stack', accent: true },
    { text: 'and' },
    { text: 'mobile', accent: true },
    {
      text: 'developer from Bogor, Indonesia. At SMK Wikrama Bogor I turned curiosity into craft, and through internships at CV IDS and Rumah Pendidikan Indonesia Kejar.id I learned what it takes to build for',
    },
    { text: 'real users.', accent: true },
    { text: 'I care about clean architecture, honest interfaces, and' },
    { text: 'motion', accent: true },
    { text: 'that actually means something.' },
  ],
  facts: [
    { title: 'Class of 2027', detail: 'SMK Wikrama Bogor, Grade 12' },
    { title: 'Bogor, Indonesia', detail: 'GMT+7' },
    { title: '2 work environments', detail: 'CV IDS · Kejar.id' },
  ],
};

/* ---------- Stack ---------- */

// Dua baris marquee, persis Figma
export const marqueeRows = [
  [
    { name: 'HTML', Icon: SiHtml5 },
    { name: 'CSS', Icon: SiCss },
    { name: 'JavaScript', Icon: SiJavascript },
    { name: 'React', Icon: SiReact },
    { name: 'Next.js', Icon: SiNextdotjs },
  ],
  [
    { name: 'Node.js', Icon: SiNodedotjs },
    { name: 'PostgreSQL', Icon: SiPostgresql },
    { name: 'MongoDB', Icon: SiMongodb },
    { name: 'Oracle', Icon: GrOracle },
    { name: 'SQL Server', Icon: DiMsqlServer },
  ],
];

// 11 bahasa pemrograman — urutan & deskripsi persis sesuai materi.
// `mark` = tampilan tipografi untuk bahasa tanpa logo resmi yang sesuai.
export const languages = [
  {
    name: 'Python',
    abbr: 'py',
    Icon: SiPython,
    description:
      'Populer untuk kecerdasan buatan (AI), data science, otomatisasi, dan pengembangan backend.',
  },
  {
    name: 'JavaScript',
    abbr: 'js',
    Icon: SiJavascript,
    description:
      'Bahasa utama untuk membuat tampilan halaman web interaktif (frontend) dan server (Node.js).',
  },
  {
    name: 'TypeScript',
    abbr: 'ts',
    Icon: SiTypescript,
    description:
      'Pengembangan dari JavaScript dengan sistem pengecekan tipe data agar kode lebih aman pada proyek skala besar.',
  },
  {
    name: 'Java',
    Icon: FaJava,
    description:
      'Digunakan untuk sistem perusahaan (enterprise), perbankan, dan pengembangan aplikasi Android.',
  },
  {
    name: 'C',
    mark: 'C',
    description:
      'Bahasa dasar tingkat menengah untuk sistem operasi, firmware, dan perangkat keras (embedded systems).',
  },
  {
    name: 'C++',
    Icon: SiCplusplus,
    description:
      'Bahasa berkecepatan tinggi untuk pengembangan game berat, sistem real-time, dan aplikasi desktop.',
  },
  {
    name: 'C#',
    Icon: TbBrandCSharp,
    description:
      'Bahasa buatan Microsoft yang banyak dipakai untuk membuat game di Unity dan aplikasi desktop Windows.',
  },
  {
    name: 'PHP',
    Icon: SiPhp,
    description:
      'Bahasa sisi server (backend) yang umum digunakan untuk membangun situs web dinamis dan CMS seperti WordPress.',
  },
  {
    name: 'Dart',
    Icon: SiDart,
    description:
      'Bahasa yang digunakan bersama framework Flutter untuk membuat aplikasi lintas platform (Android dan iOS sekaligus).',
  },
  {
    name: 'Go',
    Icon: SiGo,
    description:
      'Bahasa buatan Google yang cepat dan efisien untuk layanan cloud, microservices, dan backend.',
  },
  {
    name: 'Assembly',
    mark: 'ASM',
    description:
      'Bahasa tingkat rendah yang berkomunikasi langsung dengan arsitektur prosesor perangkat keras.',
  },
];

// Kategori Figma. JavaScript, PHP, dan Dart ada di `languages` (tidak digandakan).
// GitHub, Vite, Framer Motion = teknologi dari data lama project.
export const stackGroups = [
  {
    label: 'Frontend',
    items: [
      { name: 'HTML', Icon: SiHtml5 },
      { name: 'CSS', Icon: SiCss },
      { name: 'React', Icon: SiReact },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'Vue', Icon: SiVuedotjs },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Laravel', Icon: SiLaravel },
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'Express', Icon: SiExpress },
    ],
  },
  {
    label: 'Mobile',
    items: [{ name: 'Flutter', Icon: SiFlutter }],
  },
  {
    label: 'Database',
    items: [
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'Oracle', Icon: GrOracle },
      { name: 'SQL Server', Icon: DiMsqlServer },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Git', Icon: SiGit },
      { name: 'GitHub', Icon: SiGithub },
      { name: 'Vite', Icon: SiVite },
      { name: 'Framer Motion', Icon: SiFramer },
    ],
  },
];

/* ---------- AI Tools ---------- */
// Tanpa `Icon` = tidak ada logo resmi yang tersedia → tile tipografi (`mark`).
export const aiModels = {
  label: 'Model AI Utama',
  items: [
    { name: 'Claude (Opus & Sonnet)', Icon: SiClaude },
    { name: 'GPT & Seri Codex (OpenAI)', Icon: SiOpenai },
    { name: 'Google Gemini', Icon: SiGooglegemini },
    { name: 'DeepSeek', Icon: DeepSeekIcon },
    { name: 'Qwen Coder', Icon: QwenIcon },
  ],
};

export const aiToolGroups = [
  {
    label: 'Editor Kode & Asisten IDE',
    items: [
      { name: 'Cursor', Icon: CursorIcon },
      { name: 'GitHub Copilot', Icon: SiGithubcopilot },
      { name: 'Windsurf (Devin Desktop)', Icon: SiWindsurf },
      { name: 'Zed AI', Icon: SiZedindustries },
      { name: 'JetBrains AI Assistant', Icon: SiJetbrains },
      { name: 'Tabnine', mark: 'Tn' },
      { name: 'Augment Code', mark: 'Au' },
      { name: 'Sourcegraph Cody', mark: 'Cy' },
    ],
  },
  {
    label: 'Agen Coding Berbasis Terminal',
    items: [
      { name: 'Claude Code', Icon: ClaudeCodeIcon },
      { name: 'OpenAI Codex CLI', Icon: CodexIcon },
      { name: 'Gemini CLI', Icon: GeminiCliIcon },
      { name: 'Aider', mark: 'Ai' },
      { name: 'OpenCode', Icon: OpenCodeIcon },
    ],
  },
  {
    label: 'Ekstensi Agen Open-Source',
    items: [
      { name: 'Cline', Icon: ClineIcon },
      { name: 'Roo Code', Icon: RooCodeIcon },
      { name: 'Kilo Code', Icon: KiloCodeIcon },
    ],
  },
  {
    label: 'Agen Rekayasa Perangkat Lunak Otonom',
    items: [
      { name: 'Devin', Icon: DevinIcon },
      { name: 'Replit Agent', Icon: SiReplit },
      { name: 'Bolt.new', mark: 'Bo' },
      { name: 'Lovable', Icon: LovableIcon },
      { name: 'v0 by Vercel', Icon: SiV0 },
      { name: 'OpenHands', Icon: OpenHandsIcon },
    ],
  },
  {
    label: 'Pengujian & Peninjauan Kode',
    items: [{ name: 'Qodo', Icon: SiQodo }],
  },
];

/* ---------- Work ---------- */
// 01–06: judul, tag, kategori persis Figma. 07–09: dari data lama project (tanpa kategori).
export const projects = [
  {
    title: 'Concert Ticketing',
    tags: ['Laravel', 'PHP', 'Vite'],
    category: 'Web',
    url: 'https://github.com/Julpiansyah/Pembelian-Tiket-Konser',
  },
  {
    title: 'Book Lending API',
    tags: ['Node.js', 'REST API', 'Migrations'],
    category: 'Backend',
    url: 'https://github.com/Julpiansyah/BE-PeminjamanBuku',
  },
  {
    title: 'Book Lending App',
    tags: ['Flutter', 'Dart', 'Mobile'],
    category: 'Mobile',
    url: 'https://github.com/Julpiansyah/peminjamanBuku',
  },
  {
    title: 'Inventory API',
    tags: ['Backend', 'REST API'],
    category: 'Backend',
    url: 'https://github.com/Julpiansyah/BE-inventNew',
  },
  {
    title: 'Inventory App',
    tags: ['Flutter', 'Dart', 'Mobile'],
    category: 'Mobile',
    url: 'https://github.com/Julpiansyah/FE-Inventaris',
  },
  {
    title: 'GymPro Mobile',
    tags: ['Flutter', 'Dart', 'Mobile'],
    category: 'Mobile',
    url: 'https://github.com/Julpiansyah/gymPro-Mobile',
  },
  {
    title: 'Booking Lapangan',
    tags: ['Booking', 'Time Slot', 'React'],
    url: 'https://github.com/Julpiansyah/Booking-Lapangan-mobile',
  },
  {
    title: 'Jam',
    tags: ['UI', 'Time', 'Frontend'],
    url: 'https://github.com/Julpiansyah/Jam-Mobile',
  },
  {
    title: 'E-Commerce',
    tags: ['React', 'E-commerce', 'UI'],
    url: 'https://github.com/Julpiansyah/e_comerc-mobile',
  },
];

/* ---------- Experience (persis Figma) ---------- */
export const timeline = [
  {
    meta: 'Rumah Pendidikan Indonesia',
    title: 'Kejar.id',
    description: 'Hands-on product work with a real team and real users.',
  },
  {
    meta: 'Internship (PKL)',
    title: 'CV IDS',
    description:
      'My first production environment: requirements, code reviews, deadlines, and delivery.',
  },
  {
    meta: '2024 – 2027 · Grade 12',
    title: 'SMK Wikrama Bogor',
    description:
      'Where the foundation was built: software engineering, teamwork, and a habit of building every idea.',
  },
];

export const education = [
  { status: 'Grade 12 · Class of 2027', school: 'SMK Wikrama Bogor', years: '2024 – 2027', current: true },
  { status: 'Completed', school: 'MTs Fathan Mubina', years: '2021 – 2024' },
  { status: 'Completed', school: 'SDN Cibedug 3', years: '2015 – 2021' },
];

/* ---------- Contact ---------- */
export const contact = {
  pitch: ['Have a project, an internship, or just an idea?', 'Send it over. I reply within 24 hours.'],
  supporting: "Let's talk about your next project. I'll get back to you as soon as possible.",
  // Informasi kontak lama — dipertahankan seluruhnya
  info: [
    { label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { label: 'Phone', value: personal.phone, href: personal.phoneHref },
    { label: 'Location', value: personal.location },
    { label: 'Instagram', value: '@yanajulpian.s', href: 'https://www.instagram.com/yanajulpian.s/' },
    {
      label: 'LinkedIn',
      value: 'Muhamad Mulyana Julpiansyah',
      href: 'https://www.linkedin.com/in/muhamad-mulyana-julpiansyah-064a1b410/',
    },
  ],
};
