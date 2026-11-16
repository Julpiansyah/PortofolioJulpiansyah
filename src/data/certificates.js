/*
 * Data sertifikat.
 * - title, description, url (PDF arsip) = data asli project.
 * - program, issuer, date, credentialId, verifyUrl = dibaca langsung dari isi sertifikat.
 * - pages = render PDF per halaman (src/assets/certificates/<slug>-p<n>-{sm,lg}.webp).
 */
const files = import.meta.glob('../assets/certificates/*.webp', { eager: true, import: 'default' });
const img = (name) => files[`../assets/certificates/${name}.webp`];

// Rasio asli tiap PDF: IGDX 936×612 pt, lainnya A4 landscape 841.89×595.28 pt
const A4 = { w: 2400, h: 1697 };
const IGDX = { w: 2400, h: 1569 };

const pagesOf = (slug, count, size) =>
  Array.from({ length: count }, (_, i) => ({
    sm: img(`${slug}-p${i + 1}-sm`),
    lg: img(`${slug}-p${i + 1}-lg`),
    ...size,
  }));

export const certificates = [
  {
    id: 1,
    title: 'E-Sertifikat - Muhamad Mulyana Julpiansyah',
    description: 'Sertifikat resmi atas nama Muhamad Mulyana Julpiansyah.',
    program: 'IGDX Career Seminar — “Career Guidance For Aspiring Game Developer”',
    issuer: 'Kementerian Komunikasi dan Informatika × SMK Wikrama Bogor',
    role: 'Peserta',
    date: '18 Desember 2024',
    url: '/assets/certificates/E-Sertifikat - Muhamad Mulyana Julpiansyah.pdf',
    pages: pagesOf('e-sertifikat', 1, IGDX),
  },
  {
    id: 2,
    title: 'Sertifikat Belajar AI',
    description: 'Sertifikat pelatihan dan pembelajaran Artificial Intelligence (AI).',
    program: 'Belajar Dasar AI',
    issuer: 'Dicoding Indonesia',
    date: '30 September 2025',
    credentialId: 'MRZM68KKRPYQ',
    verifyUrl: 'https://www.dicoding.com/certificates/MRZM68KKRPYQ',
    url: '/assets/certificates/sertfikat belajar ai.pdf',
    pages: pagesOf('belajar-ai', 2, A4),
  },
  {
    id: 3,
    title: 'Sertifikat Dasar Pemrograman JavaScript',
    description: 'Sertifikat penyelesaian kelas dasar pemrograman JavaScript.',
    program: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia',
    date: '11 Januari 2025',
    credentialId: 'GRX53G64RZ0M',
    verifyUrl: 'https://www.dicoding.com/certificates/GRX53G64RZ0M',
    url: '/assets/certificates/sertifikat dasar pemrograman javascript.pdf',
    pages: pagesOf('dasar-javascript', 3, A4),
  },
  {
    id: 4,
    title: 'Sertifikat Dasar Pemrograman Web',
    description: 'Sertifikat penyelesaian kelas dasar pemrograman web.',
    program: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia',
    date: '01 November 2024',
    credentialId: 'EYX4JGMJOZDL',
    verifyUrl: 'https://www.dicoding.com/certificates/EYX4JGMJOZDL',
    url: '/assets/certificates/sertifikat dasar pemrograman web.pdf',
    pages: pagesOf('dasar-web', 3, A4),
  },
  {
    id: 5,
    title: 'Sertifikat E-Learning K3 Muhamad Muyana Julpiansyah',
    description: 'Sertifikat pelatihan E-Learning K3 atas nama Muhamad Muyana Julpiansyah.',
    program: 'E-learning “Keselamatan dan Kesehatan Kerja”',
    issuer: 'International Labour Organization (ILO)',
    date: '30 Agustus 2024',
    url: '/assets/certificates/Sertifikat E-Learning K3 Muhamad Muyana Julpiansyah.pdf',
    pages: pagesOf('e-learning-k3', 1, A4),
  },
];
