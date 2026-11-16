import { marqueeRows, languages, stackGroups } from '../../data/portfolio';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import RevealLine from '../ui/RevealLine';
import MonoLabel from '../ui/MonoLabel';
import IconTile, { TileFace } from '../ui/IconTile';
import { MotionLi, MotionDiv, inView, DUR } from '../ui/motion';

// Lebar panel kategori (xl, 12 kolom) disesuaikan jumlah ikon
const GROUP_SPANS = {
  Frontend: 'sm:col-span-2 xl:col-span-5',
  Backend: 'xl:col-span-4',
  Mobile: 'xl:col-span-3',
  Database: 'xl:col-span-6',
  Tools: 'xl:col-span-6',
};

function MarqueeRow({ items, reverse }) {
  // Diulang agar trek selalu lebih lebar dari layar; separuh trek = satu siklus (-50%)
  const loop = [...items, ...items, ...items];
  const track = [...loop, ...loop];
  return (
    <div className="marquee-track overflow-hidden border-b border-line" aria-hidden="true">
      <div className="marquee" data-reverse={reverse ? 'true' : 'false'}>
        {track.map((item, i) => (
          <div key={i} className="flex items-center">
            <span
              title={item.name}
              className="group grid h-[104px] w-[150px] place-items-center text-icon md:h-[170px] md:w-[240px]"
            >
              <item.Icon className="h-12 w-12 transition-[transform,color] duration-500 ease-out-expo group-hover:scale-110 group-hover:text-accent md:h-[84px] md:w-[84px]" />
            </span>
            <span aria-hidden="true" className="px-6 text-[13px] text-accent md:px-[56px]">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Kartu bahasa: ikon utama, nama, singkatan, deskripsi lengkap + ikon watermark besar. */
function LanguageCard({ lang, index, total }) {
  const Icon = lang.Icon;
  const last = index === total - 1;
  return (
    <MotionLi
      {...inView(0.05 + (index % 3) * 0.09, { y: 30, duration: DUR.reveal })}
      className={`surface spotlight group relative overflow-hidden rounded-2xl p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1 md:p-7 ${
        last ? 'md:col-span-2 xl:col-span-2' : ''
      }`}
    >
      {/* Watermark ikon */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-6 text-fg opacity-[0.03] transition-[transform,opacity,color] duration-700 ease-out-expo group-hover:-rotate-6 group-hover:scale-105 group-hover:text-accent group-hover:opacity-[0.08]"
      >
        {Icon ? (
          <Icon className="h-40 w-40" />
        ) : (
          <span className="font-mono text-[120px] font-semibold leading-none">{lang.mark}</span>
        )}
      </span>

      <div className="relative flex items-start justify-between gap-4">
        <TileFace Icon={Icon} mark={lang.mark} size="sm" />
        <span className="mono-label text-muted">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="relative mt-8 flex items-baseline gap-3">
        <span className="font-serif text-[34px] leading-none text-fg transition-colors duration-300 group-hover:text-accent">
          {lang.name}
        </span>
        {lang.abbr && (
          <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[11px] tracking-[0.06em] text-muted">
            {lang.abbr}
          </span>
        )}
      </p>
      <p className="relative mt-3 max-w-[46ch] text-[14.5px] leading-[1.65] text-muted">{lang.description}</p>
    </MotionLi>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="relative z-10 py-24 md:py-36">
      <div className="shell">
        <SectionHeader index={2} label="Stack" title="Tools of the" italic="trade" />
      </div>

      {/* Marquee logo — 2 baris, arah berlawanan, tepi memudar, berhenti saat hover */}
      <RevealLine className="mt-16 md:mt-24" duration={DUR.slow} />
      <Reveal delay={0.15} y={0} duration={DUR.slow}>
        {marqueeRows.map((row, i) => (
          <MarqueeRow key={i} items={row} reverse={i % 2 === 1} />
        ))}
      </Reveal>

      <div className="shell">
        {/* 11 bahasa pemrograman — bento */}
        <div className="mt-20 md:mt-28">
          <Reveal className="flex items-baseline justify-between gap-4" y={10} duration={DUR.fast}>
            <MonoLabel tone="accent">Languages</MonoLabel>
            <MonoLabel>{String(languages.length).padStart(2, '0')}</MonoLabel>
          </Reveal>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {languages.map((lang, i) => (
              <LanguageCard key={lang.name} lang={lang} index={i} total={languages.length} />
            ))}
          </ul>
        </div>

        {/* Kategori stack — panel */}
        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-12">
            {stackGroups.map((group, gi) => (
              <Reveal
                key={group.label}
                delay={0.05 + gi * 0.08}
                y={24}
                className={`surface spotlight rounded-2xl p-5 ${GROUP_SPANS[group.label] ?? ''}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <MonoLabel tone="accent">{group.label}</MonoLabel>
                  <MonoLabel>{String(group.items.length).padStart(2, '0')}</MonoLabel>
                </div>
                <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                  {group.items.map((item, ti) => (
                    <MotionDiv
                      key={item.name}
                      {...inView(0.15 + gi * 0.08 + ti * 0.06, { y: 14, duration: DUR.base, scale: 0.92 })}
                    >
                      <IconTile name={item.name} Icon={item.Icon} size="md" />
                    </MotionDiv>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
