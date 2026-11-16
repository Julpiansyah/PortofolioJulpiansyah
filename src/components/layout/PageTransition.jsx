import { useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { MotionDiv, EASE } from '../ui/motion';

/**
 * Transisi antarhalaman: tirai gelap dengan garis accent menyapu layar,
 * konten masuk dengan fade + translate. Setelah halaman terpasang, scroll ke #hash atau ke atas.
 */
// Pemuatan pertama tidak memakai tirai/fade — intro Hero yang menjadi pembuka.
let firstLoad = true;

export default function PageTransition({ children }) {
  const { hash } = useLocation();
  const reduce = useReducedMotion();
  const [isFirst] = useState(() => firstLoad);

  useLayoutEffect(() => {
    firstLoad = false;
  }, []);

  useLayoutEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (target) {
      // Tunggu satu frame agar layout halaman baru stabil
      requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant' }));
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MotionDiv
        initial={isFirst ? false : { opacity: 0, y: reduce ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -16 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {children}
      </MotionDiv>

      {!reduce && !isFirst && (
        <>
          {/* Tirai keluar (menutup) */}
          <MotionDiv
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90] origin-bottom bg-raised"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="absolute inset-x-0 top-0 h-px bg-accent" />
          </MotionDiv>
          {/* Tirai masuk (membuka) */}
          <MotionDiv
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[90] origin-top bg-raised"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          >
            <span className="absolute inset-x-0 bottom-0 h-px bg-accent" />
          </MotionDiv>
        </>
      )}
    </>
  );
}
