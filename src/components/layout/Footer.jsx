import { useRef } from 'react';
import { useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { LuArrowUp } from 'react-icons/lu';
import { personal, socials } from '../../data/portfolio';
import { useLocalTime } from '../../hooks/useLocalTime';
import { MotionDiv, MotionSpan } from '../ui/motion';

/** Satu huruf nama raksasa: naik bertahap mengikuti scroll, terisi accent saat di-hover. */
function Letter({ char, index, total, progress, reduce }) {
  const start = (index / total) * 0.35;
  const y = useTransform(progress, [start, start + 0.55], reduce ? ['0%', '0%'] : ['55%', '0%']);
  return (
    <MotionSpan style={{ y }} className="outline-letter inline-block">
      {char}
    </MotionSpan>
  );
}

export default function Footer() {
  const time = useLocalTime();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const glowOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);
  const letters = [...personal.lastName.toUpperCase()];

  return (
    <footer ref={ref} className="relative z-10 overflow-hidden border-t border-line">
      {/* Cahaya yang menguat saat footer terlihat */}
      <MotionDiv
        aria-hidden="true"
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute bottom-[-40%] left-1/2 h-[80%] w-[90%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_14%,transparent),transparent)]"
      />

      <div className="shell relative grid grid-cols-2 gap-x-6 gap-y-6 py-12 font-mono text-[12px] tracking-[0.04em] md:grid-cols-[1.3fr_1fr_1fr_auto] md:items-center">
        <p className="text-fg">
          © {new Date().getFullYear()} {personal.fullName}
        </p>
        <p className="text-muted">
          Local time <span className="tabular-nums text-fg">{time}</span> GMT+7
        </p>
        <ul className="col-span-2 flex flex-wrap gap-x-5 gap-y-2 md:col-span-1">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors duration-300 hover:text-accent"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group col-span-2 inline-flex items-center gap-3 justify-self-start text-fg transition-colors duration-300 hover:text-accent md:col-span-1 md:justify-self-end"
        >
          Back to top
          <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-line-strong transition-[border-color,background-color,color,transform] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent group-active:scale-95">
            <LuArrowUp
              aria-hidden="true"
              className="absolute h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-8"
            />
            <LuArrowUp
              aria-hidden="true"
              className="absolute h-4 w-4 translate-y-8 transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
            />
          </span>
        </button>
      </div>

      <p className="shell relative pb-4 font-mono text-[11px] tracking-[0.06em] text-muted">Designed &amp; built by me</p>

      {/* Nama raksasa outline */}
      <div aria-hidden="true" className="relative h-[16vw] overflow-hidden">
        <div className="outline-text select-none whitespace-nowrap pl-[1vw] font-sans text-[19.5vw] font-medium leading-[0.82] tracking-[-0.03em]">
          {letters.map((ch, i) => (
            <Letter key={i} char={ch} index={i} total={letters.length} progress={scrollYProgress} reduce={reduce} />
          ))}
        </div>
      </div>
    </footer>
  );
}
