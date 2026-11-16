/** Label mono 12px uppercase +8% (Figma: Mono label). */
export default function MonoLabel({ children, tone = 'muted', className = '', as = 'p' }) {
  const Tag = as;
  const color = tone === 'accent' ? 'text-accent' : tone === 'fg' ? 'text-fg' : 'text-muted';
  return <Tag className={`mono-label uppercase ${color} ${className}`}>{children}</Tag>;
}
