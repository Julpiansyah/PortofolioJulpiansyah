import MaskLine from './MaskLine';

/**
 * Judul section (Display L, Gasoek One). Bagian `italic` = kata aksen berwarna lime
 * (Gasoek tidak memiliki italic asli). Animasi berlapis: aksen menyusul 0.12 dtk kemudian.
 */
export default function SectionTitle({ children, italic, as = 'h2', className = '' }) {
  const Tag = as;
  return (
    <Tag className={`display-l flex flex-wrap gap-x-[0.2em] text-fg ${className}`}>
      <MaskLine inline>{children}</MaskLine>
      {italic && (
        <MaskLine inline delay={0.12} innerClassName="text-accent">
          {italic}
        </MaskLine>
      )}
    </Tag>
  );
}
