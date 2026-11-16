import { useEffect } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { MotionDiv, MotionSpan, EASE } from '../ui/motion';

const LINES = [
  'left-[20px] md:left-[40px] xl:left-[72px]',
  'left-[31%] hidden md:block',
  'left-[64%] hidden md:block',
  'right-[20px] md:right-[40px] xl:right-[72px]',
];

/**
 * Lapisan atmosfer global (fixed, di belakang konten):
 * cahaya ambient yang melayang & bergeser mengikuti scroll, garis kolom, vignette, fine grain.
 * Juga memasang satu listener pointer untuk efek `.spotlight` pada kartu.
 */
export default function Atmosphere() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Cahaya bergeser perlahan sepanjang halaman → transisi antar-section terasa menyatu
  const lightY = useTransform(scrollYProgress, [0, 1], ['0vh', reduce ? '0vh' : '-35vh']);
  const lightX = useTransform(scrollYProgress, [0, 0.5, 1], ['0vw', reduce ? '0vw' : '-10vw', '0vw']);

  useEffect(() => {
    let frame = 0;
    let last = null;
    const onMove = (e) => {
      last = e;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = last.target instanceof Element ? last.target.closest('.spotlight') : null;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${last.clientX - r.left}px`);
        el.style.setProperty('--my', `${last.clientY - r.top}px`);
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <MotionDiv className="absolute inset-0" style={{ y: lightY, x: lightX }}>
        <div className="ambient-light ambient-a right-[-18vw] top-[-12vh] h-[85vh] w-[85vh]" />
        <div className="ambient-light ambient-b left-[-22vw] top-[38vh] h-[95vh] w-[95vh]" />
        <div className="ambient-light ambient-c right-[8vw] top-[90vh] h-[70vh] w-[70vh]" />
      </MotionDiv>

      <div className="shell relative h-full">
        {LINES.map((pos, i) => (
          <MotionSpan
            key={pos}
            className={`absolute inset-y-0 w-px origin-top bg-line/60 ${pos}`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.05 + i * 0.08 }}
          />
        ))}
      </div>

      <div className="vignette absolute inset-0" />
      <div className="grain absolute inset-[-50%] h-[200%] w-[200%]" />
    </div>
  );
}
