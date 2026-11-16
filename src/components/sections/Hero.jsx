import { useRef } from 'react';
import { useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { LuArrowDown } from 'react-icons/lu';
import { personal } from '../../data/portfolio';
import { useLocalTime } from '../../hooks/useLocalTime';
import HeroName from './HeroName';
import Button from '../ui/Button';
import { MotionDiv, MotionSpan, EASE, DUR } from '../ui/motion';
import profile from '../../assets/profile-cutout.webp';

/*
 * Urutan masuk (detik) — nama adalah pusat perhatian (lihat HeroName.jsx, selesai ±1.9 dtk):
 * 0.15–1.0 nama · 0.45 foto (clip reveal + zoom-out) · 0.4 orbit · 0.6 cahaya
 * 1.1 tagline → 1.2 intro → 1.3 tombol, badge, meta → 1.4 jam → 1.55 scroll
 */
const enter = (delay, y = 14) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.reveal, ease: EASE, delay },
});

const scrollTo = (id) => (e) => {
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Hero() {
  const time = useLocalTime();
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // Parallax scroll berlapis
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 110]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 200]);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.25]);

  // Kedalaman mengikuti pointer: tiap lapisan bergerak berbeda
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.6 });
  const photoPX = useTransform(sx, (v) => v * 10);
  const photoPY = useTransform(sy, (v) => v * 8);
  const ringPX = useTransform(sx, (v) => v * -18);
  const ringPY = useTransform(sy, (v) => v * -14);
  const glowPX = useTransform(sx, (v) => v * 28);
  const glowPY = useTransform(sy, (v) => v * 22);

  const onPointerMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="relative overflow-hidden pt-[76px]"
    >
      <div className="shell relative flex min-h-[calc(100svh-76px)] flex-col justify-end pb-10 md:min-h-[900px] xl:min-h-[1000px]">
        {/* Cahaya (lapisan terjauh) */}
        <MotionDiv
          aria-hidden="true"
          style={{ y: glowY }}
          className="pointer-events-none absolute right-[-30%] top-[6%] h-[600px] w-[600px] md:right-[-8%] md:top-[2%] md:h-[880px] md:w-[880px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
        >
          <MotionDiv style={{ x: glowPX, y: glowPY }} className="h-full w-full">
            <div className="hero-glow h-full w-full" />
          </MotionDiv>
        </MotionDiv>

        {/* Foto + orbit */}
        <MotionDiv
          style={{ y: photoY }}
          className="pointer-events-none relative order-1 mx-auto mt-6 w-[80%] max-w-[360px] md:absolute md:bottom-[160px] md:right-[-9%] md:order-none md:mt-0 md:w-[44%] md:max-w-[600px] lg:right-[-2%] lg:w-[46%] xl:right-[9%]"
        >
          {/* Cincin orbit tipis — bergerak berlawanan dengan foto untuk kesan kedalaman */}
          <MotionDiv
            aria-hidden="true"
            style={{ x: ringPX, y: ringPY }}
            className="absolute left-[-9%] top-[-29%] aspect-square w-[118%]"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          >
            <svg viewBox="0 0 400 400" className="spin-slow absolute inset-0 h-full w-full overflow-visible">
              <circle cx="200" cy="200" r="190" fill="none" stroke="var(--border-strong)" strokeWidth="0.6" />
              <circle cx="200" cy="10" r="3" fill="var(--accent)" />
            </svg>
            <svg viewBox="0 0 400 400" className="spin-slower absolute inset-[13%] h-[74%] w-[74%] overflow-visible">
              <circle
                cx="200"
                cy="200"
                r="190"
                fill="none"
                stroke="var(--border-subtle)"
                strokeWidth="0.8"
                strokeDasharray="2 7"
              />
              <circle cx="390" cy="200" r="2.5" fill="var(--text-secondary)" />
            </svg>
          </MotionDiv>

          <MotionDiv style={{ x: photoPX, y: photoPY }} className="relative">
            <MotionDiv
              initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
            >
              <MotionDiv
                initial={{ scale: reduce ? 1 : 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.45 }}
              >
                <img
                  src={profile}
                  alt={`Portrait of ${personal.fullName}`}
                  width="704"
                  height="960"
                  fetchPriority="high"
                  decoding="async"
                  className="block h-auto w-full [mask-image:linear-gradient(to_bottom,black_60%,transparent_95%)]"
                />
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>

        {/* Meta atas (desktop) */}
        <div className="pointer-events-none absolute inset-x-0 top-10 hidden md:block">
          <div className="flex items-start justify-between px-5 md:px-10 xl:px-16">
            <MotionSpan {...enter(1.3, 8)} className="mono-label uppercase text-muted">
              {personal.city} · <span className="tabular-nums">{time}</span> GMT+7
            </MotionSpan>
            <MotionSpan {...enter(1.35, 8)} className="mono-label uppercase text-muted">
              Full-stack · Mobile
            </MotionSpan>
          </div>
        </div>

        {/* Nama */}
        <MotionDiv style={{ y: nameY, opacity: fade }} className="relative z-10 order-0 md:order-none">
          <HeroName />
        </MotionDiv>

        {/* Baris bawah */}
        <div className="relative z-10 order-2 mt-8 flex flex-col gap-8 md:order-none md:mt-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <MotionDiv {...enter(1.1)}>
              <p className="body-l text-fg">{personal.tagline}</p>
            </MotionDiv>
            <MotionDiv {...enter(1.2)}>
              <p className="mt-3 max-w-[380px] text-[15px] leading-[1.6] text-muted">{personal.intro}</p>
            </MotionDiv>
            <MotionDiv {...enter(1.3)} className="mt-7 flex flex-wrap items-center gap-3">
              <Button href="#contact" onClick={scrollTo('contact')} size="md" magnetic>
                Say hello
              </Button>
              <Button
                href="#work"
                onClick={scrollTo('work')}
                variant="secondary"
                size="md"
                iconDir="up"
                icon={LuArrowDown}
              >
                Selected work
              </Button>
            </MotionDiv>
          </div>

          <div className="flex flex-col items-start gap-3 md:items-end">
            <MotionDiv {...enter(1.3, 10)}>
              <span className="surface inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.04em] text-fg">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {personal.availability}
              </span>
            </MotionDiv>
            <MotionDiv {...enter(1.4, 8)} className="md:hidden">
              <p className="font-mono text-[11px] tracking-[0.06em] text-muted">
                {personal.city} · <span className="tabular-nums">{time}</span> GMT+7
              </p>
            </MotionDiv>
            {/* Indikator scroll: kapsul dengan titik yang turun */}
            <MotionDiv {...enter(1.55, 8)} className="hidden md:block">
              <a
                href="#about"
                onClick={scrollTo('about')}
                className="group mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors duration-300 hover:text-accent"
              >
                Scroll
                <span className="relative flex h-10 w-6 justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent">
                  <MotionSpan
                    className="mt-2 block h-1.5 w-1 rounded-full bg-current"
                    animate={reduce ? {} : { y: [0, 14, 0], opacity: [1, 0.2, 1] }}
                    transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity }}
                  />
                </span>
              </a>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
}
