import { useCallback, useEffect, useState } from 'react';

const EVENT = 'themechange';
let themeTimer;
const read = () =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

/** Tema dark/light: atribut `data-theme` di <html>, disimpan di localStorage. */
export function useTheme() {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    const sync = () => setTheme(read());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);

  const toggle = useCallback(() => {
    const next = read() === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    // Transisi warna halus ke seluruh elemen hanya selama pergantian tema
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-anim');
      clearTimeout(themeTimer);
      themeTimer = setTimeout(() => root.classList.remove('theme-anim'), 650);
    }
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* penyimpanan tidak tersedia — abaikan */
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { theme, toggle };
}
