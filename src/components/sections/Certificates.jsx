import { useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { LuMaximize2, LuBadgeCheck, LuLayers } from 'react-icons/lu';
import { certificates } from '../../data/certificates';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import CertificateLightbox from '../ui/CertificateLightbox';
import { MotionDiv, MotionLi, inView, EASE, DUR, VIEWPORT } from '../ui/motion';

/*
 * Tata letak galeri (xl, 6 kolom): dua sertifikat pertama lebar (3+3), tiga berikutnya (2+2+2).
 * md: 2 kolom, sertifikat terakhir melebar penuh. Mobile: 1 kolom.
 */
const SPANS = ['xl:col-span-3', 'xl:col-span-3', 'xl:col-span-2', 'xl:col-span-2', 'md:col-span-2 xl:col-span-2'];

function CertificateCard({ cert, index, onOpen }) {
  const reduce = useReducedMotion();
  const cover = cert.pages[0];
  return (
    <MotionLi
      {...inView(0.05 + (index % 3) * 0.1, { y: 36, duration: DUR.reveal })}
      className={`surface spotlight group flex flex-col rounded-[22px] p-3 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5 md:p-3.5 ${SPANS[index] ?? ''}`}
    >
      {/* Gambar sertifikat — rasio asli, tidak terpotong */}
      <button
        type="button"
        onClick={() => onOpen(cert)}
        aria-label={`View certificate: ${cert.program}`}
        className="relative block w-full cursor-zoom-in overflow-hidden rounded-[14px] outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <MotionDiv
          layoutId={`cert-image-${cert.id}`}
          className="relative overflow-hidden rounded-[14px] bg-white"
          style={{ aspectRatio: `${cover.w} / ${cover.h}` }}
          initial={reduce ? false : { clipPath: 'inset(8% 6% 8% 6% round 14px)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 14px)' }}
          viewport={VIEWPORT}
          transition={{ duration: 1, ease: EASE, delay: 0.1 + (index % 3) * 0.1 }}
        >
          <img
            src={cover.sm}
            alt={cert.title}
            width={cover.w}
            height={cover.h}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
          {/* Kilau cahaya menyapu saat hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] transition-transform duration-1000 ease-out-quint group-hover:translate-x-full"
          />
          {/* Lapisan gelap + chip "View" */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid place-items-center bg-black/0 transition-colors duration-500 group-hover:bg-black/25"
          >
            <span className="flex translate-y-3 items-center gap-2 rounded-full bg-accent px-4 py-2 text-[13px] font-medium text-on-accent opacity-0 shadow-[0_10px_30px_-10px_var(--accent)] transition-[opacity,transform] duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
              <LuMaximize2 className="h-3.5 w-3.5" />
              View
            </span>
          </span>
        </MotionDiv>
      </button>

      {/* Informasi yang tertera pada sertifikat */}
      <div className="flex flex-1 flex-col px-2.5 pb-2 pt-5 md:px-3">
        <div className="flex items-start justify-between gap-3">
          <p className="mono-label uppercase text-accent">{cert.issuer}</p>
          <span className="mono-label shrink-0 text-muted">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-3 font-serif text-[clamp(1.6rem,2.2vw,2.1rem)] leading-[1.08] text-fg transition-colors duration-300 group-hover:text-accent">
          {cert.program}
        </h3>
        <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.6] text-muted">{cert.description}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4 font-mono text-[11.5px] tracking-[0.04em] text-muted">
          <span className="text-fg">{cert.date}</span>
          {cert.role && <span>{cert.role}</span>}
          {cert.credentialId && <span>ID {cert.credentialId}</span>}
          {cert.pages.length > 1 && (
            <span className="inline-flex items-center gap-1.5">
              <LuLayers className="h-3.5 w-3.5" aria-hidden="true" />
              {cert.pages.length} pages
            </span>
          )}
          {cert.verifyUrl && (
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 text-fg transition-colors duration-300 hover:text-accent"
            >
              <LuBadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Verify ↗
            </a>
          )}
        </div>
      </div>
    </MotionLi>
  );
}

export default function Certificates() {
  const [open, setOpen] = useState(null);

  return (
    <section id="certificates" className="relative z-10 py-24 md:py-36">
      <div className="shell">
        <SectionHeader index={6} label="Certificates" title="My" italic="Certificates" />
        <Reveal delay={0.2} y={14}>
          <p className="mt-8 max-w-[540px] text-[17px] leading-[1.6] text-muted md:mt-12 md:text-[19px]">
            Collection of my achievements and certifications
          </p>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 xl:grid-cols-6">
          {certificates.map((cert, i) => (
            <CertificateCard key={cert.id} cert={cert} index={i} onOpen={setOpen} />
          ))}
        </ul>
      </div>

      {/* Portal ke body agar lightbox berada di atas navbar */}
      {createPortal(
        <AnimatePresence>
          {open && <CertificateLightbox key={open.id} cert={open} onClose={() => setOpen(null)} />}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
