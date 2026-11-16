import MaskLine from './MaskLine';

/**
 * Judul section serif (Display L). Bagian `italic` ditulis miring seperti Figma.
 * Animasi berlapis: bagian tegak muncul dulu, bagian italic menyusul 0.12 dtk kemudian.
 */
export default function SectionTitle({ children, italic, as = 'h2', className = '' }) {
  const Tag = as;
  return (
    <Tag className={`display-l flex flex-wrap gap-x-[0.2em] text-fg ${className}`}>
      <MaskLine inline>{children}</MaskLine>
      {italic && (
        <MaskLine inline delay={0.12} innerClassName="italic">
          {italic}
        </MaskLine>
      )}
    </Tag>
  );
}
