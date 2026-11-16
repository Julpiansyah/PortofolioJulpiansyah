import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { about, personal } from '../../data/portfolio';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import MaskLine from '../ui/MaskLine';
import { MotionDiv, MotionSpan, EASE, DUR, VIEWPORT } from '../ui/motion';
import profile from '../../assets/profile-cutout.webp';

// Pecah paragraf menjadi kata, simpan penanda accent
const words = about.paragraph.flatMap((chunk) =>
  chunk.text.split(' ').map((w) => ({ w, accent: !!chunk.accent }))
);

/** Kata beralih dari redup ke penuh mengikuti scroll — tanpa gerakan posisi agar tetap mudah dibaca. */
function Word({ progress, range, accent, children }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <MotionSpan style={{ opacity }} className={accent ? 'text-accent' : 'text-fg'}>
      {children}
    </MotionSpan>
  );
}

export default function About() {
  const ref = useRef(null);
  const cardRef = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] });
  // Foto di dalam kartu bergeser pelan berlawanan arah scroll (parallax dalam bingkai)
  const { scrollYProgress: cardProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const innerY = useTransform(cardProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '8%']);

  return (
    <section id="about" className="relative z-10 py-24 md:py-36">
      <div className="shell">
        <SectionHeader index={1} label="About" title="About" />

        <div className="mt-14 grid grid-cols-1 gap-12 md:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Potret dalam bingkai — muncul dengan clip reveal */}
          <MotionDiv
            ref={cardRef}
            className="surface relative order-2 aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[28px] lg:order-none lg:col-span-4 lg:max-w-none xl:col-span-3"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(18% 10% 18% 10% round 28px)', opacity: 0 }}
            whileInView={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <div aria-hidden="true" className="hero-glow absolute -right-1/3 -top-1/4 h-[90%] w-[120%]" />
            <MotionDiv style={{ y: innerY }} className="absolute inset-x-0 -bottom-[6%] top-[8%]">
              <img
                src={profile}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
              />
            </MotionDiv>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <span className="mono-label uppercase text-fg">{personal.city}</span>
              <span className="mono-label text-muted">GMT+7</span>
            </div>
          </MotionDiv>

          {/* Paragraf editorial — kata menyala mengikuti scroll */}
          <p
            ref={ref}
            className="font-serif text-[clamp(1.75rem,3.4vw,3.25rem)] leading-[1.18] tracking-[-0.005em] lg:col-span-8 xl:col-span-9"
          >
            {words.map(({ w, accent }, i) => {
              const start = i / words.length;
              const end = Math.min(1, start + 3 / words.length);
              return (
                <span key={i}>
                  {reduce ? (
                    <span className={accent ? 'text-accent' : 'text-fg'}>{w}</span>
                  ) : (
                    <Word progress={scrollYProgress} range={[start, end]} accent={accent}>
                      {w}
                    </Word>
                  )}{' '}
                </span>
              );
            })}
          </p>
        </div>

        {/* Fakta pendukung — kartu dengan spotlight */}
        <ul className="mt-20 grid grid-cols-1 gap-4 md:mt-28 md:grid-cols-3">
          {about.facts.map((fact, i) => (
            <Reveal
              as="li"
              key={fact.title}
              delay={0.1 + i * 0.12}
              y={28}
              className="surface spotlight group rounded-2xl p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1 md:p-7"
            >
              <p className="mono-label text-accent" aria-hidden="true">0{i + 1}</p>
              <h3 className="mt-8 font-serif text-[clamp(1.875rem,2.6vw,2.5rem)] leading-[1.05] text-fg">
                <MaskLine delay={0.2 + i * 0.12} duration={DUR.reveal}>
                  {fact.title}
                </MaskLine>
              </h3>
              <p className="mono-label mt-3 tracking-[0.06em] text-muted">{fact.detail}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
