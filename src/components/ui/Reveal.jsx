import { MotionDiv, MotionLi, MotionP, inView, DUR } from './motion';

const TAGS = { div: MotionDiv, li: MotionLi, p: MotionP };

/** Fade + translate halus saat elemen pertama kali masuk viewport (sekali saja). */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 20,
  duration = DUR.reveal,
  scale,
  className = '',
  ...rest
}) {
  const Comp = TAGS[as] ?? MotionDiv;
  return (
    <Comp className={className} {...inView(delay, { y, duration, scale })} {...rest}>
      {children}
    </Comp>
  );
}
