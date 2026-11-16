/** Pill tag mono. */
export default function Tag({ children, className = '', ...rest }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-line bg-fg/[0.03] px-3 py-1 font-label text-[10.5px] uppercase tracking-[0.1em] text-fg transition-colors duration-300 ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
