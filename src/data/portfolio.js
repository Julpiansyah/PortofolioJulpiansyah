import {
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
} from 'react-icons/fa';
import { SiVite } from 'react-icons/si';
import { TbBrandFramer } from 'react-icons/tb';

export const personalInfo = {
  name: 'Muhamad Mulyana Julpiansyah',
  initials: 'J',
  tagline: 'Speaking things into existence',
  description: `Saya adalah seorang pengembang frontend yang bersemangat dalam membangun aplikasi web modern dengan React dan teknologi terkini. Fokus saya adalah membangun antarmuka yang responsif, ramah pengguna, dan memberikan pengalaman yang menyenangkan. Saya percaya bahwa desain yang baik dan kode yang bersih adalah kunci dari aplikasi yang sukses. Setiap proyek adalah kesempatan bagi saya untuk belajar, bereksperimen, dan berkembang sebagai developer.`,
  location: 'Bogor, Indonesia',
  email: 'julpian@gmail.com',
  phone: '+62 858-8019-1716',
};

export const socialLinks = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/yanajulpian.s/',
    username: '@yanajulpian.s',
  },
  {
    label: 'Email',
    url: 'mailto:julpian@gmail.com',
    username: 'julpian@gmail.com',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '/projects' },
  { label: 'Certificates', href: '/certificates' },
  { label: 'Contact', href: '#contact' },
];

export const values = [
  {
    title: 'Clean Code',
    description:
      'Menulis kode yang terstruktur, mudah dirawat, skalabel, dan mengikuti praktik terbaik.',
    icon: '✨',
  },
  {
    title: 'Innovation',
    description:
      'Mencari solusi kreatif untuk masalah yang kompleks dengan memanfaatkan teknologi modern.',
    icon: '💡',
  },
  {
    title: 'Continuous Learning',
    description:
      'Selalu bersemangat untuk meningkatkan skill dan mengikuti perkembangan terbaru di dunia frontend.',
    icon: '📚',
  },
];

export const skills = [
  { name: 'React', icon: FaReact },
  { name: 'JavaScript', icon: FaJs },
  { name: 'HTML5', icon: FaHtml5 },
  { name: 'CSS3', icon: FaCss3Alt },
  { name: 'Git', icon: FaGitAlt },
  { name: 'Vite', icon: SiVite },
  { name: 'GitHub', icon: FaGithub },
  { name: 'Framer Motion', icon: TbBrandFramer },
];

export const contactInfo = [
  { icon: '📧', label: 'Email', value: 'julpian@gmail.com', link: 'mailto:julpian@gmail.com' },
  { icon: '📱', label: 'Phone', value: '+62 858-8019-1716', link: 'tel:+6285880191716' },
  { icon: '📍', label: 'Location', value: 'Bogor, Indonesia', link: null },
  { icon: '📷', label: 'Instagram', value: '@yanajulpian.s', link: 'https://www.instagram.com/yanajulpian.s/' },
];