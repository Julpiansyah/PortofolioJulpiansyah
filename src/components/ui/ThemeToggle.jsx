import { LuMoon, LuSun } from 'react-icons/lu';
import { useTheme } from '../../hooks/useTheme';
import { MotionSpan, EASE } from './motion';

/** Saklar tema berbentuk pill: kenop meluncur, ikon berputar masuk. */
export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme();
  const dark = theme === 'dark';
  const next = dark ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`group relative flex h-11 w-[78px] items-center rounded-full border border-line bg-base/60 px-1.5 backdrop-blur-md transition-[border-color,transform] duration-500 ease-out-expo hover:border-accent/50 active:scale-95 ${className}`}
    >
      <LuSun aria-hidden="true" className="absolute left-3.5 h-3.5 w-3.5 text-muted" />
      <LuMoon aria-hidden="true" className="absolute right-3.5 h-3.5 w-3.5 text-muted" />
      <MotionSpan
        aria-hidden="true"
        className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-fg text-base shadow-[0_4px_14px_-4px_var(--shadow-color)]"
        animate={{ x: dark ? 32 : 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <MotionSpan
          key={theme}
          className="grid place-items-center"
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {dark ? <LuMoon className="h-3.5 w-3.5" /> : <LuSun className="h-3.5 w-3.5" />}
        </MotionSpan>
      </MotionSpan>
    </button>
  );
}
