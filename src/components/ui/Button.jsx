import { Link } from 'react-router-dom';
import { LuArrowUpRight } from 'react-icons/lu';
import Magnetic from './Magnetic';

/**
 * Sistem tombol pill.
 * - variant: 'primary' (lime gradient + glow + kilau) | 'secondary' (kaca) | 'ghost' (teks + garis)
 * - size: 'sm' | 'md' | 'lg'
 * - icon: komponen ikon (default ArrowUpRight) — berganti dengan animasi saat hover; `false` = tanpa ikon
 * - iconDir: 'diag' (kanan-atas) | 'up'
 * - href (eksternal / anchor), to (route internal), atau tanpa keduanya (<button>)
 * - magnetic: tarikan halus ke arah pointer (desktop)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = LuArrowUpRight,
  iconDir = 'diag',
  href,
  to,
  magnetic = false,
  className = '',
  ...rest
}) {
  const Icon = icon;
  const cls = `btn btn-${variant} ${variant === 'ghost' ? '' : `btn-${size}`} ${
    Icon ? '' : 'btn-noicon'
  } ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <span className="btn-chip" data-dir={iconDir === 'up' ? 'up' : undefined} aria-hidden="true">
          <Icon />
          <Icon />
        </span>
      )}
    </>
  );

  let el;
  if (to) {
    el = (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  } else if (href) {
    const external = /^https?:/.test(href);
    el = (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    );
  } else {
    el = (
      <button type="button" className={cls} {...rest}>
        {content}
      </button>
    );
  }

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
