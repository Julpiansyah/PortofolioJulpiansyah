import { useRef } from 'react';
import { useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { LuArrowDown } from 'react-icons/lu';
import { timeline, education } from '../../data/portfolio';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import MaskLine from '../ui/MaskLine';
import { MotionDiv, MotionLi, MotionSpan, MotionP, inView, EASE, DUR } from '../ui/motion';

export default function Experience() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  // Titik bercahaya di ujung progres timeline
  const headTop = useTransform(fill, (v) => `${Math.min(1, Math.max(0, v)) * 100}%`);

  return (
    <section id="experience" className="relative z-10 py-24 md:py-36">
      <div className="shell">
        <SectionHeader index={5} label="Experience" title="Where I’ve" italic="learned" />

        <div className="mt-14 grid grid-cols-1 gap-16 md:mt-24 xl:grid-cols-12 xl:gap-10">
          {/* Timeline — garis accent terisi mengikuti scroll */}
          <div ref={ref} className="relative pl-9 md:pl-12 xl:col-span-7">
            <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-2 w-px bg-line" />
            <MotionDiv
              aria-hidden="true"
              className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-accent/30 to-accent"
              style={{ scaleY: reduce ? 1 : fill }}
            />
            {!reduce && (
              <MotionSpan
                aria-hidden="true"
                className="absolute left-[2px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-accent shadow-[0_0_14px_3px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
                style={{ top: headTop }}
              />
            )}

            <ol className="space-y-16 md:space-y-20">
              {timeline.map((item) => (
                <MotionLi
                  key={item.title}
                  className="relative"
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '0px 0px -30% 0px' }}
                  transition={{ duration: DUR.slow, ease: EASE }}
                >
                  {/* Titik timeline: membesar & terisi accent saat item aktif */}
                  <MotionSpan
                    aria-hidden="true"
                    className="absolute -left-9 top-1.5 h-[11px] w-[11px] rounded-full border md:-left-12"
                    initial={{ scale: 0, backgroundColor: 'var(--bg-base)', borderColor: 'var(--text-secondary)' }}
                    whileInView={{ scale: 1, backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }}
                    viewport={{ once: true, margin: '0px 0px -30% 0px' }}
                    transition={{ duration: DUR.base, ease: EASE }}
                  />
                  <MotionP {...inView(0.05, { y: 8, duration: DUR.fast })} className="mono-label uppercase text-muted">
                    {item.meta}
                  </MotionP>
                  <h3 className="mt-3 font-serif text-[clamp(2.25rem,3.6vw,3.5rem)] leading-none text-fg">
                    <MaskLine delay={0.1} duration={DUR.reveal}>
                      {item.title}
                    </MaskLine>
                  </h3>
                  <MotionP
                    {...inView(0.22, { y: 10, duration: DUR.base })}
                    className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.65] text-muted"
                  >
                    {item.description}
                  </MotionP>
                </MotionLi>
              ))}
            </ol>
          </div>

          {/* Kartu pendidikan — tumpukan di samping timeline (desktop) */}
          <div className="flex flex-col gap-4 xl:col-span-5 xl:pt-2">
            {education.map((edu, i) => (
              <Reveal
                key={edu.school}
                delay={i * 0.1}
                y={28}
                className={`surface spotlight group rounded-2xl px-6 py-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1 md:px-7 ${
                  edu.current ? '!border-accent/60' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p
                    className={`flex items-center gap-2 font-mono text-[12px] tracking-[0.06em] ${
                      edu.current ? 'text-accent' : 'text-muted'
                    }`}
                  >
                    {edu.current && (
                      <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50 motion-reduce:hidden" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                      </span>
                    )}
                    {edu.status}
                  </p>
                  <span className="font-mono text-[12px] tabular-nums text-muted">{edu.years}</span>
                </div>
                <h3 className="mt-6 font-serif text-[32px] leading-[1.05] text-fg transition-colors duration-300 group-hover:text-accent">
                  {edu.school}
                </h3>
              </Reveal>
            ))}

            <Reveal className="mt-4" delay={0.3} y={12} duration={DUR.base}>
              <Button
                href="#certificates"
                onClick={(e) => {
                  const el = document.getElementById('certificates');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant="secondary"
                size="md"
                iconDir="up"
                icon={LuArrowDown}
              >
                Certificates
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
