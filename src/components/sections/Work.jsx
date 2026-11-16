import { useRef, useState } from 'react';
import { AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { LuArrowUpRight, LuGithub } from 'react-icons/lu';
import { projects } from '../../data/portfolio';
import SectionHeader from '../ui/SectionHeader';
import Tag from '../ui/Tag';
import MaskLine from '../ui/MaskLine';
import RevealLine from '../ui/RevealLine';
import { MotionDiv, MotionSpan, inView, DUR, EASE } from '../ui/motion';

export default function Work() {
  const listRef = useRef(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(null);

  // Label "GitHub ↗" yang mengikuti pointer di dalam daftar (desktop saja)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.5 });
  const y = useSpring(my, { stiffness: 300, damping: 30, mass: 0.5 });

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <section id="work" className="relative z-10 py-24 md:py-36">
      <div className="shell">
        <SectionHeader index={4} label="Work" title="Selected" italic="work" />

        <div
          ref={listRef}
          className="relative mt-14 md:mt-24"
          onPointerMove={onMove}
          onPointerLeave={() => setHovered(null)}
        >
          <ul className="work-list">
            {projects.map((project, i) => {
              // Lapisan per baris: garis → nomor → judul (mask) → tag → kategori
              const d = (i % 3) * 0.05;
              return (
                <li key={project.title} className="work-row relative">
                  <RevealLine delay={d} className="absolute inset-x-0 top-0" />
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} — view source on GitHub`}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(i)}
                    onFocus={() => setHovered(null)}
                    className="group relative grid grid-cols-[2rem_1fr_auto] items-center gap-x-4 gap-y-3 py-6 outline-none md:grid-cols-[4rem_1fr_auto] md:py-8 xl:grid-cols-[5.25rem_1fr_minmax(0,20rem)_auto] xl:py-10"
                  >
                    {/* Sapuan cahaya dari kiri saat hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-0 origin-left scale-x-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--accent)_9%,transparent),transparent_70%)] transition-transform duration-700 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />

                    <MotionSpan
                      {...inView(d + 0.1, { y: 8, duration: DUR.fast })}
                      className="relative font-label text-[12px] text-muted transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </MotionSpan>

                    <span className="display-m relative text-fg">
                      <MaskLine delay={d + 0.08} duration={DUR.reveal} className="-mr-[0.4em] pr-[0.4em]">
                        <span className="inline-block transition-transform duration-700 ease-out-expo group-hover:translate-x-3 group-hover:text-accent group-focus-visible:text-accent">
                          {project.title}
                        </span>
                      </MaskLine>
                    </span>

                    <MotionSpan
                      {...inView(d + 0.22, { y: 10, duration: DUR.base })}
                      className="relative col-start-2 col-end-4 row-start-2 flex flex-wrap gap-1.5 xl:col-start-3 xl:col-end-4 xl:row-start-1"
                    >
                      {project.tags.map((tag, ti) => (
                        <Tag
                          key={tag}
                          className="group-hover:border-accent/70 group-hover:text-accent"
                          style={{ transitionDelay: `${ti * 40}ms` }}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </MotionSpan>

                    {/* Kategori + chip panah */}
                    <MotionSpan
                      {...inView(d + 0.3, { y: 8, duration: DUR.fast })}
                      className="relative col-start-3 row-start-1 flex items-center justify-self-end gap-3 xl:col-start-4"
                    >
                      {project.category && (
                        <span className="hidden font-label text-[12px] tracking-[0.04em] text-muted transition-colors duration-300 group-hover:text-accent sm:inline">
                          {project.category}
                        </span>
                      )}
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong text-fg transition-[background-color,border-color,color,transform] duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent md:h-12 md:w-12">
                        <LuArrowUpRight aria-hidden="true" className="h-4 w-4 md:h-[18px] md:w-[18px]" />
                      </span>
                    </MotionSpan>
                  </a>
                </li>
              );
            })}
          </ul>
          <RevealLine delay={0.1} />

          {/* Label pengikut pointer */}
          <AnimatePresence>
            {hovered !== null && !reduce && (
              <MotionDiv
                aria-hidden="true"
                style={{ x, y }}
                className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: DUR.micro, ease: EASE }}
              >
                <span className="btn-primary relative isolate ml-5 mt-5 inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 font-sub text-[12px] uppercase tracking-[0.1em]">
                  <LuGithub className="h-4 w-4" />
                  View source
                </span>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
