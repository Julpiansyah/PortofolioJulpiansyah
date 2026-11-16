import { MotionSpan, EASE, DUR, VIEWPORT } from './motion';

/** Garis pembatas tipis yang "tergambar" horizontal dari kiri saat masuk viewport. */
export default function RevealLine({ delay = 0, duration = DUR.reveal, className = '', tone = 'bg-line' }) {
  return (
    <MotionSpan
      aria-hidden="true"
      className={`block h-px origin-left ${tone} ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
    />
  );
}
