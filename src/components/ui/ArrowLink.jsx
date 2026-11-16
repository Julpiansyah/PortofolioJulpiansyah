import { Link } from 'react-router-dom';

/**
 * Link mono dengan panah ↗ (Figma: "GitHub ↗" — default / hover accent).
 * Hover: warna accent + garis bawah tergambar dari kiri + panah bergeser kanan-atas.
 */
export default function ArrowLink({ href, to, children, className = '', ...rest }) {
  const cls = `group inline-flex items-center gap-1.5 font-label text-[11.5px] uppercase tracking-[0.12em] text-fg transition-colors duration-300 hover:text-accent focus-visible:text-accent ${className}`;
  const content = (
    <>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out-expo group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        ↗
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }

  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      className={cls}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
