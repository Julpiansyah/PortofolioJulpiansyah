import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, useMotionValue, animate, useReducedMotion } from 'framer-motion';
import {
  LuX,
  LuZoomIn,
  LuZoomOut,
  LuChevronLeft,
  LuChevronRight,
  LuFileText,
  LuBadgeCheck,
} from 'react-icons/lu';
import { MotionDiv, MotionSpan, EASE, DUR } from './motion';

const ZOOM = 2.6;

/**
 * Lightbox sertifikat: gambar membesar dari kartu (shared layout), zoom di titik klik,
 * geser saat diperbesar, navigasi halaman, Esc / ← → / + − dari keyboard.
 */
export default function CertificateLightbox({ cert, onClose }) {
  const reduce = useReducedMotion();
  const [page, setPage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [bounds, setBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const frameRef = useRef(null);
  const closeRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const current = cert.pages[page];
  const ratio = current.w / current.h;
  const multi = cert.pages.length > 1;

  const resetPan = useCallback(() => {
    animate(x, 0, { duration: DUR.base, ease: EASE });
    animate(y, 0, { duration: DUR.base, ease: EASE });
  }, [x, y]);

  const setZoom = useCallback(
    (on, point) => {
      setZoomed(on);
      if (!on || !frameRef.current) return resetPan();
      // Batas geser = kelebihan ukuran gambar setelah diperbesar
      const r = frameRef.current.getBoundingClientRect();
      const maxX = (r.width * (ZOOM - 1)) / 2;
      const maxY = (r.height * (ZOOM - 1)) / 2;
      setBounds({ left: -maxX, right: maxX, top: -maxY, bottom: maxY });
      if (!point) return resetPan();
      // Perbesar di titik yang diklik: geser agar titik itu tetap di bawah pointer
      const cx = point.x - (r.left + r.width / 2);
      const cy = point.y - (r.top + r.height / 2);
      animate(x, Math.max(-maxX, Math.min(maxX, -cx * (ZOOM - 1))), { duration: DUR.base, ease: EASE });
      animate(y, Math.max(-maxY, Math.min(maxY, -cy * (ZOOM - 1))), { duration: DUR.base, ease: EASE });
    },
    [resetPan, x, y]
  );

  const go = useCallback(
    (dir) => {
      if (!multi) return;
      setZoomed(false);
      resetPan();
      setPage((p) => (p + dir + cert.pages.length) % cert.pages.length);
    },
    [cert.pages.length, multi, resetPan]
  );

  // Keyboard, kunci scroll body, fokus awal & kembalikan fokus saat ditutup
  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === '+' || e.key === '=') setZoom(true);
      else if (e.key === '-') setZoom(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (prevFocus instanceof HTMLElement) prevFocus.focus({ preventScroll: true });
    };
  }, [go, onClose, setZoom]);

  const iconBtn =
    'grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-base/60 text-fg transition-[background-color,border-color,color,transform] duration-300 hover:border-accent hover:text-accent active:scale-95 disabled:opacity-30 disabled:hover:border-line-strong disabled:hover:text-fg';

  return (
    <MotionDiv
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-dialog-title"
      className="fixed inset-0 z-[80] flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: DUR.fast, ease: EASE }}
    >
      {/* Latar */}
      <div className="absolute inset-0 bg-base/95 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <div aria-hidden="true" className="hero-glow pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 opacity-50" />

      {/* Bilah atas */}
      <MotionDiv
        className="relative z-10 flex items-start justify-between gap-4 px-4 pt-4 md:px-8 md:pt-6"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: DUR.base, ease: EASE, delay: 0.1 }}
      >
        <div className="min-w-0">
          <p className="mono-label uppercase text-accent">
            {cert.issuer} · {cert.date}
          </p>
          <h3 id="cert-dialog-title" className="mt-1.5 truncate font-head text-[22px] leading-tight text-fg md:text-[30px]">
            {cert.program}
          </h3>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} className={`${iconBtn} shrink-0`} aria-label="Close certificate">
          <LuX className="h-5 w-5" />
        </button>
      </MotionDiv>

      {/* Gambar */}
      <div className="relative z-10 flex flex-1 items-center justify-center overflow-hidden px-4 py-4 md:px-20">
        <MotionDiv
          ref={frameRef}
          layoutId={page === 0 ? `cert-image-${cert.id}` : undefined}
          className="relative overflow-hidden rounded-xl bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
          style={{ width: `min(100%, calc((100svh - 220px) * ${ratio}))`, aspectRatio: `${current.w} / ${current.h}` }}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <MotionDiv
              key={page}
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DUR.micro }}
            >
              <MotionDiv
                className={`h-full w-full ${zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
                style={{ x, y }}
                animate={{ scale: zoomed ? ZOOM : 1 }}
                transition={{ duration: DUR.base, ease: EASE }}
                drag={zoomed}
                dragMomentum={false}
                dragElastic={0.08}
                dragConstraints={bounds}
                onClick={(e) => !zoomed && setZoom(true, { x: e.clientX, y: e.clientY })}
                onDoubleClick={() => zoomed && setZoom(false)}
              >
                <img
                  src={current.lg}
                  alt={`${cert.title} — page ${page + 1}`}
                  width={current.w}
                  height={current.h}
                  draggable="false"
                  className="pointer-events-none h-full w-full select-none object-contain"
                />
              </MotionDiv>
            </MotionDiv>
          </AnimatePresence>
        </MotionDiv>

        {multi && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous page"
              className={`${iconBtn} absolute left-3 top-1/2 hidden -translate-y-1/2 md:grid`}
            >
              <LuChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next page"
              className={`${iconBtn} absolute right-3 top-1/2 hidden -translate-y-1/2 md:grid`}
            >
              <LuChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Bilah bawah */}
      <MotionDiv
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-4 pb-5 md:px-8 md:pb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: DUR.base, ease: EASE, delay: 0.12 }}
      >
        <div className="flex items-center gap-2">
          {multi && (
            <button type="button" onClick={() => go(-1)} aria-label="Previous page" className={`${iconBtn} md:hidden`}>
              <LuChevronLeft className="h-5 w-5" />
            </button>
          )}
          <span className="mono-label min-w-[4.5rem] text-center text-muted" aria-live="polite">
            Page{' '}
            <MotionSpan key={page} className="inline-block text-fg" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              {page + 1}
            </MotionSpan>{' '}
            / {cert.pages.length}
          </span>
          {multi && (
            <button type="button" onClick={() => go(1)} aria-label="Next page" className={`${iconBtn} md:hidden`}>
              <LuChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setZoom(false)} disabled={!zoomed} aria-label="Zoom out" className={iconBtn}>
            <LuZoomOut className="h-[18px] w-[18px]" />
          </button>
          <button type="button" onClick={() => setZoom(true)} disabled={zoomed} aria-label="Zoom in" className={iconBtn}>
            <LuZoomIn className="h-[18px] w-[18px]" />
          </button>
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm btn-noicon gap-2"
            >
              <LuBadgeCheck className="h-4 w-4" aria-hidden="true" />
              Verify
            </a>
          )}
          <a
            href={encodeURI(cert.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm btn-noicon gap-2"
          >
            <LuFileText className="h-4 w-4" aria-hidden="true" />
            PDF
          </a>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}
