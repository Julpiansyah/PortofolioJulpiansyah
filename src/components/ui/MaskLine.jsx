import { MotionSpan, EASE, DUR, VIEWPORT } from './motion';

/**
 * Text reveal: teks naik dari balik mask.
 * - `onMount`: animasi saat halaman dimuat (hero); default: saat masuk viewport.
 * - `inline`: mask berupa inline-block (untuk beberapa potongan dalam satu baris).
 *
 * Catatan: yang diamati IntersectionObserver adalah *mask* (tidak bergerak), bukan teks
 * yang tersembunyi di bawahnya — elemen yang sepenuhnya terpotong overflow tidak pernah
 * dianggap "terlihat", sehingga judul multi-baris bisa tak pernah muncul.
 */
export default function MaskLine({
  children,
  delay = 0,
  duration = DUR.slow,
  onMount = false,
  inline = false,
  className = '',
  innerClassName = '',
}) {
  const trigger = onMount ? { animate: 'show' } : { whileInView: 'show', viewport: VIEWPORT };
  return (
    <MotionSpan
      initial="hidden"
      {...trigger}
      className={`${inline ? 'inline-block align-bottom' : 'block'} -mb-[0.14em] overflow-hidden pb-[0.14em] ${className}`}
    >
      <MotionSpan
        className={`block ${innerClassName}`}
        variants={{
          hidden: { y: '108%' },
          show: { y: '0%', transition: { duration, ease: EASE, delay } },
        }}
      >
        {children}
      </MotionSpan>
    </MotionSpan>
  );
}
