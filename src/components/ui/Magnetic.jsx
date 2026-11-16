import { useRef } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { MotionSpan } from './motion';

/**
 * Efek "magnetic-feel" ringan: elemen tertarik sedikit ke arah pointer (maks ±`max` px).
 * Hanya aktif pada perangkat dengan pointer presisi; nonaktif saat reduced motion.
 */
export default function Magnetic({ children, strength = 0.28, max = 10, className = '' }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    x.set(Math.max(-max, Math.min(max, dx)));
    y.set(Math.max(-max, Math.min(max, dy)));
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <MotionSpan
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </MotionSpan>
  );
}
