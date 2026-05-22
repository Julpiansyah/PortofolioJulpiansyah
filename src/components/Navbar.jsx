import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from '../data/portfolio';
import NavIcon from './NavIcon';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    if (href.startsWith('#')) {
      return location.pathname === '/' && location.hash === href;
    }
    return location.pathname === href;
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const linkClass = (href, compact = false) => {
    const active = isActive(href);
    if (compact) {
      return `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl text-[9px] sm:text-[10px] font-medium transition-all duration-200 ${
        active
          ? 'text-navy-800 dark:text-amber-300'
          : 'text-navy-400 dark:text-cream-200/50 hover:text-navy-800 dark:hover:text-cream-200'
      }`;
    }
    return `w-10 h-10 flex items-center justify-center rounded-xl text-xs font-medium transition-all duration-200 hover:-translate-x-0.5 ${
      active
        ? 'bg-amber-300 text-navy-900 font-semibold shadow-sm'
        : 'text-navy-400 dark:text-cream-200/60 hover:text-navy-800 dark:hover:text-cream-200 hover:bg-cream-100 dark:hover:bg-navy-800'
    }`;
  };

  const renderNavItem = (link, compact = false) => {
    const className = linkClass(link.href, compact);

    if (link.href.startsWith('#')) {
      return (
        <a
          href={link.href}
          onClick={(e) => handleNavClick(e, link.href)}
          className={className}
          title={link.label}
        >
          <NavIcon label={link.label} className={compact ? 'w-5 h-5' : 'w-4 h-4'} />
          {compact && <span className="truncate max-w-[52px]">{link.label}</span>}
        </a>
      );
    }

    return (
      <Link to={link.href} className={className} title={link.label}>
        <NavIcon label={link.label} className={compact ? 'w-5 h-5' : 'w-4 h-4'} />
        {compact && <span className="truncate max-w-[52px]">{link.label}</span>}
      </Link>
    );
  };

  return (
    <>
      <nav className="hidden md:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <div
          className={`flex flex-col gap-1 p-2 rounded-2xl border transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 dark:bg-navy-900/90 backdrop-blur-lg border-cream-200 dark:border-navy-700 shadow-lg'
              : 'bg-white/80 dark:bg-navy-900/80 backdrop-blur-sm border-cream-200/50 dark:border-navy-700/50 shadow-md'
          }`}
        >
          {navLinks.map((link) => (
            <div key={link.label}>{renderNavItem(link)}</div>
          ))}
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-navy-900/90 backdrop-blur-lg border-t border-cream-200 dark:border-navy-700">
        <div className="flex items-center justify-around px-1 py-2">
          {navLinks.map((link) => (
            <div key={link.label}>{renderNavItem(link, true)}</div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
