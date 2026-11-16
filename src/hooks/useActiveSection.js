import { useEffect, useState } from 'react';

/** Mengembalikan id section yang sedang berada di tengah viewport. */
export function useActiveSection(ids, enabled = true) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled) return undefined;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? active : null;
}
