import { MotionSpan, EASE, DUR, VIEWPORT } from './motion';

/**
 * Text reveal: teks naik dari balik mask.
 * - `onMount`: animasi saat halaman dimuat (hero); default: saat masuk viewport.
 * - `inline`: mask berupa inline-block (untuk beberapa potongan dalam satu baris).
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
  const trigger = onMount ? { animate: { y: '0%' } } : { whileInView: { y: '0%' }, viewport: VIEWPORT };
  return (
    <span
      className={`${inline ? 'inline-block align-bottom' : 'block'} -mb-[0.14em] overflow-hidden pb-[0.14em] ${className}`}
    >
      <MotionSpan
        className={`block ${innerClassName}`}
        initial={{ y: '108%' }}
        {...trigger}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </MotionSpan>
    </span>
  );
}
