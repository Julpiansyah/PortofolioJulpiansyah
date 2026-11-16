import { motion } from 'framer-motion';

/*
 * Sistem gerak bersama — "calm cinematic / editorial motion".
 * Durasi terukur 0.3–0.9 dtk sesuai jenis animasi; easing lembut tanpa pantulan.
 */
export const EASE = [0.16, 1, 0.3, 1]; // expo-out: reveal, masking teks
export const EASE_SOFT = [0.22, 1, 0.36, 1]; // quint-out: micro-interaction

export const DUR = {
  micro: 0.3, // hover, tap
  fast: 0.45, // label, ikon
  base: 0.6, // konten, tile
  reveal: 0.8, // blok konten, garis
  slow: 0.9, // judul, foto hero
};

/** Viewport standar: terpicu sedikit sebelum elemen benar-benar terlihat, sekali saja. */
export const VIEWPORT = { once: true, margin: '0px 0px -12% 0px' };

/** Preset fade + translate saat masuk viewport. */
export const inView = (delay = 0, { y = 20, duration = DUR.reveal, scale } = {}) => ({
  initial: { opacity: 0, y, ...(scale ? { scale } : {}) },
  whileInView: { opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) },
  viewport: VIEWPORT,
  transition: { duration, ease: EASE, delay },
});

export const MotionDiv = motion.div;
export const MotionSpan = motion.span;
export const MotionLi = motion.li;
export const MotionHeader = motion.header;
export const MotionButton = motion.button;
export const MotionP = motion.p;
export const MotionA = motion.a;
