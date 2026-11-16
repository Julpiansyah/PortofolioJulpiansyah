import { useReducedMotion } from 'framer-motion';
import { personal } from '../../data/portfolio';
import { MotionSpan, EASE } from '../ui/motion';

/*
 * Signature opening — nama di Hero.
 * Timeline (detik):
 *   0.15 → "Muhamad"      per huruf: mask + naik + blur→tajam  (stagger 0.045)
 *   0.55 → "Mulyana"      sapuan kiri→kanan seperti tanda tangan + garis lime
 *   0.70 → "Julpiansyah"  per huruf: mask + momentum (miring → tegak) (stagger 0.032)
 *   1.35 → garis lime     tergambar kiri→kanan, lalu kilau cahaya melintas (berkala, pelan)
 * Selesai ±1.9 dtk. Hanya transform/opacity/filter — tanpa layout shift.
 */

/** Satu baris sans: tiap huruf punya pembungkus animasi (masuk) + pembungkus hover. */
function CharLine({ text, delay, stagger, blur = false, momentum = false, reduce }) {
  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]" aria-hidden="true">
      {[...text].map((ch, i) => (
        <MotionSpan
          key={i}
          className="inline-block will-change-transform"
          initial={
            reduce
              ? false
              : {
                  y: '112%',
                  opacity: 0,
                  ...(blur ? { filter: 'blur(14px)' } : {}),
                  ...(momentum ? { rotate: 7, skewX: -6 } : {}),
                }
          }
          animate={{
            y: '0%',
            opacity: 1,
            ...(momentum ? { rotate: 0, skewX: 0 } : {}),
            // Blur → tajam; setelah selesai filter dilepas agar teks dirender setajam mungkin
            ...(blur ? { filter: 'blur(0px)', transitionEnd: { filter: 'none' } } : {}),
          }}
          transition={{
            delay: delay + i * stagger,
            y: { duration: momentum ? 0.95 : 1.05, ease: EASE },
            rotate: { duration: 1.1, ease: EASE },
            skewX: { duration: 1.1, ease: EASE },
            opacity: { duration: 0.5, ease: 'easeOut' },
            filter: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <span className="name-char inline-block">{ch}</span>
        </MotionSpan>
      ))}
    </span>
  );
}

export default function HeroName() {
  const reduce = useReducedMotion();
  const { firstName, middleName, lastName, fullName } = personal;

  // Ukuran khusus nama: ±17% lebih kecil dari display-xl agar wajah di foto tetap terlihat
  return (
    <h1
      className="font-display text-[clamp(2.25rem,10vw,9.25rem)] leading-[1] tracking-[-0.02em] text-fg"
      aria-label={fullName}
    >
      {/* Muhamad */}
      <CharLine text={firstName} delay={0.15} stagger={0.045} blur reduce={reduce} />

      {/* Mulyana — signature: sapuan reveal + garis lime + cahaya halus */}
      <span className="-mb-[0.16em] block w-fit pb-[0.16em] pr-[0.08em]" aria-hidden="true">
        <span className="group/sig relative inline-block">
          <MotionSpan
            className="signature-glow inline-block will-change-transform"
            initial={reduce ? false : { clipPath: 'inset(-25% 100% -25% -8%)', y: '18%', opacity: 0.2 }}
            animate={{
              clipPath: 'inset(-25% -8% -25% -8%)',
              y: '0%',
              opacity: 1,
            }}
            transition={{
              delay: 0.55,
              clipPath: { duration: 1.25, ease: [0.65, 0, 0.35, 1] },
              y: { duration: 1.1, ease: EASE },
              opacity: { duration: 0.6, ease: 'easeOut' },
            }}
          >
            {middleName}
          </MotionSpan>

          {/* Garis lime: tergambar kiri → kanan, lalu kilau melintas berkala */}
          <MotionSpan
            className="signature-line absolute -bottom-[0.04em] left-0 block h-[3px] w-full origin-left rounded-full bg-accent shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_55%,transparent)] transition-[box-shadow,scale] duration-500 ease-out-expo group-hover/sig:scale-y-150 group-hover/sig:shadow-[0_0_30px_var(--accent)] md:h-[5px]"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 1.35 }}
          />
        </span>
      </span>

      {/* Julpiansyah */}
      <CharLine text={lastName} delay={0.7} stagger={0.032} momentum reduce={reduce} />
    </h1>
  );
}
