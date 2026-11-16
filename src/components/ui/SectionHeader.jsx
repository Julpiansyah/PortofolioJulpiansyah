import SectionTitle from './SectionTitle';
import RevealLine from './RevealLine';
import { MotionSpan, inView, DUR } from './motion';

/**
 * Pembuka "bab": indeks (01) + nama section + hairline yang tergambar, lalu judul bermask.
 */
export default function SectionHeader({ index, label, title, italic, as, className = '' }) {
  return (
    <header className={className}>
      <div className="mb-8 flex items-center gap-4 md:mb-12">
        <MotionSpan {...inView(0, { y: 8, duration: DUR.fast })} className="mono-label text-accent">
          ({String(index).padStart(2, '0')})
        </MotionSpan>
        <MotionSpan {...inView(0.06, { y: 8, duration: DUR.fast })} className="mono-label uppercase text-muted">
          {label}
        </MotionSpan>
        <RevealLine delay={0.1} duration={DUR.slow} className="flex-1" />
      </div>
      {title && (
        <SectionTitle italic={italic} as={as}>
          {title}
        </SectionTitle>
      )}
    </header>
  );
}
