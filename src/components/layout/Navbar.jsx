import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { navLinks, personal, socials } from '../../data/portfolio';
import { useActiveSection } from '../../hooks/useActiveSection';
import ThemeToggle from '../ui/ThemeToggle';
import MaskLine from '../ui/MaskLine';
import { MotionDiv, MotionHeader, MotionSpan, MotionLi, EASE, DUR } from '../ui/motion';
import logo from '../../assets/logo.webp';

// 'home' & 'ai-tools' ikut diamati agar indikator tidak "nyangkut" di section sebelumnya
const SECTION_IDS = ['home', 'ai-tools', ...navLinks.map((l) => l.id)];

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const active = useActiveSection(SECTION_IDS, isHome);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 200);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const goTo = (e, id) => {
    setOpen(false);
    if (!isHome) return;
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', `#${id}`);
    }
  };

  const renderLink = (link, className, children) =>
    isHome ? (
      <a href={`#${link.id}`} onClick={(e) => goTo(e, link.id)} className={className}>
        {children}
      </a>
    ) : (
      <Link to={`/#${link.id}`} onClick={() => setOpen(false)} className={className}>
        {children}
      </Link>
    );

  return (
    <>
      <MotionHeader
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <MotionDiv
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.reveal, ease: EASE, delay: 0.1 }}
        >
          <nav className="shell flex h-[76px] items-center justify-between" aria-label="Primary">
            <Link
              to="/"
              onClick={(e) => {
                setOpen(false);
                if (isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="group relative block shrink-0 outline-none focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`${personal.fullName} — home`}
            >
              {/* Logo graffiti (latar transparan) — sedikit membesar & menyala lime saat hover */}
              <img
                src={logo}
                alt=""
                width="400"
                height="221"
                decoding="async"
                className="block h-[44px] w-auto transition-[transform,filter] duration-500 ease-out-expo group-hover:scale-[1.06] group-hover:drop-shadow-[0_0_14px_color-mix(in_srgb,var(--accent)_55%,transparent)] md:h-[58px]"
              />
            </Link>

            {/* Kapsul navigasi melayang */}
            <ul
              className={`hidden items-center gap-1 rounded-full border p-1.5 transition-[background-color,border-color,box-shadow] duration-500 md:flex ${
                scrolled
                  ? 'border-line bg-base/70 shadow-[0_12px_40px_-20px_var(--shadow-color)] backdrop-blur-md'
                  : 'border-transparent'
              }`}
            >
              {navLinks.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id} className="relative">
                    {isActive && (
                      <MotionSpan
                        layoutId="nav-pill"
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-accent/30 bg-accent/10"
                        transition={{ duration: DUR.base, ease: EASE }}
                      />
                    )}
                    {renderLink(
                      link,
                      `relative block rounded-full px-3 py-2 font-label text-[11.5px] uppercase tracking-[0.12em] lg:px-4 transition-colors duration-300 hover:text-accent ${
                        isActive ? 'text-accent' : 'text-fg'
                      }`,
                      link.label
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2.5">
              <ThemeToggle />
              <button
                type="button"
                className="group relative grid h-11 w-11 place-items-center rounded-full border border-line md:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={`absolute left-0 top-0 h-px w-full bg-fg transition-transform duration-500 ease-out-expo ${
                      open ? 'translate-y-1.5 rotate-45' : ''
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-px w-full bg-fg transition-transform duration-500 ease-out-expo ${
                      open ? '-translate-y-1.5 -rotate-45' : ''
                    }`}
                  />
                </span>
              </button>
            </div>
          </nav>
        </MotionDiv>
      </MotionHeader>

      {/* Menu mobile: tirai turun, tautan muncul bermask satu per satu */}
      <AnimatePresence>
        {open && (
          <MotionDiv
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-base pt-[76px] md:hidden"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div
              aria-hidden="true"
              className="hero-glow pointer-events-none absolute -right-1/3 top-1/4 h-[420px] w-[420px]"
            />
            <ul className="shell relative flex flex-1 flex-col justify-center">
              {navLinks.map((link, i) => (
                <li key={link.id} className="border-b border-line">
                  {renderLink(
                    link,
                    `flex items-baseline justify-between py-4 font-head text-[clamp(2rem,10vw,2.75rem)] leading-none ${
                      active === link.id ? 'text-accent' : 'text-fg'
                    }`,
                    <>
                      <MaskLine onMount delay={0.2 + i * 0.06} duration={DUR.reveal}>
                        {link.label}
                      </MaskLine>
                      <MotionSpan
                        className="font-label text-[12px] text-muted"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + i * 0.06, duration: DUR.base }}
                      >
                        0{i + 1}
                      </MotionSpan>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <ul className="shell relative flex gap-6 pb-10">
              {socials.map((s, i) => (
                <MotionLi
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.06, duration: DUR.base, ease: EASE }}
                >
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label text-[12px] tracking-[0.05em] text-muted transition-colors hover:text-accent"
                  >
                    {s.label} ↗
                  </a>
                </MotionLi>
              ))}
            </ul>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
