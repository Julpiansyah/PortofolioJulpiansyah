/**
 * Tile icon (Figma: Stack tile & AI tile).
 * - `Icon`: logo resmi; `mark`: tampilan tipografi bila tidak ada logo resmi yang sesuai.
 * - Hover: border + icon menjadi accent, nama muncul / diperjelas.
 * - labelMode 'hover': nama muncul saat hover/fokus, selalu tampil di layar sentuh.
 *   labelMode 'always': nama selalu tampil.
 */
const SIZES = {
  sm: { tile: 'h-14 w-14', icon: 'h-6 w-6', mark: 'text-[13px]' },
  md: { tile: 'h-[64px] w-[64px] md:h-[76px] md:w-[76px]', icon: 'h-7 w-7 md:h-8 md:w-8', mark: 'text-[15px]' },
  lg: {
    tile: 'h-[104px] w-[104px] md:h-[150px] md:w-[150px]',
    icon: 'h-11 w-11 md:h-[60px] md:w-[60px]',
    mark: 'text-xl',
  },
};

export function TileFace({ Icon, mark, size = 'md', className = '' }) {
  const s = SIZES[size];
  return (
    <span
      className={`surface relative grid shrink-0 place-items-center rounded-xl text-icon transition-[transform,border-color,color,box-shadow] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:border-accent/70 group-hover:text-accent group-hover:shadow-[inset_0_1px_0_var(--highlight),0_14px_34px_-14px_color-mix(in_srgb,var(--accent)_70%,transparent)] group-focus-visible:border-accent group-focus-visible:text-accent ${s.tile} ${className}`}
    >
      {Icon ? (
        <Icon
          className={`${s.icon} transition-transform duration-500 ease-out-expo group-hover:scale-[1.08]`}
          aria-hidden="true"
        />
      ) : (
        <span
          aria-hidden="true"
          className={`font-mono font-medium tracking-tight transition-transform duration-500 ease-out-expo group-hover:scale-[1.08] ${s.mark}`}
        >
          {mark}
        </span>
      )}
    </span>
  );
}

export default function IconTile({ name, Icon, mark, size = 'md', labelMode = 'hover', className = '' }) {
  const labelCls =
    labelMode === 'hover'
      ? 'tile-label-hover text-accent'
      : 'text-muted transition-colors duration-300 group-hover:text-accent';
  return (
    <figure tabIndex={0} title={name} className={`group flex flex-col items-center gap-2.5 outline-none ${className}`}>
      <TileFace Icon={Icon} mark={mark} size={size} />
      <figcaption
        className={`max-w-[9.5rem] text-center font-mono text-[10.5px] leading-snug tracking-[0.04em] ${labelCls}`}
      >
        {name}
      </figcaption>
    </figure>
  );
}
