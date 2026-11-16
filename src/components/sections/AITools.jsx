import { aiModels, aiToolGroups } from '../../data/portfolio';
import SectionHeader from '../ui/SectionHeader';
import Reveal from '../ui/Reveal';
import MonoLabel from '../ui/MonoLabel';
import IconTile from '../ui/IconTile';
import { MotionLi, inView, DUR } from '../ui/motion';

/*
 * Tata letak panel (xl, 4 kolom) agar seimbang:
 * Editor (8) ▸ 2 kolom · Terminal (5) ▸ 2 kolom
 * Otonom (6) ▸ 2 kolom · Ekstensi (3) ▸ 1 kolom · Pengujian (1) ▸ 1 kolom
 */
const SPANS = {
  'Editor Kode & Asisten IDE': 'md:col-span-2 xl:col-span-2',
  'Agen Coding Berbasis Terminal': 'xl:col-span-2',
  'Agen Rekayasa Perangkat Lunak Otonom': 'xl:col-span-2',
  'Ekstensi Agen Open-Source': '',
  'Pengujian & Peninjauan Kode': '',
};
const ORDER = [
  'Editor Kode & Asisten IDE',
  'Agen Coding Berbasis Terminal',
  'Agen Rekayasa Perangkat Lunak Otonom',
  'Ekstensi Agen Open-Source',
  'Pengujian & Peninjauan Kode',
];

export default function AITools() {
  const groups = ORDER.map((label) => aiToolGroups.find((g) => g.label === label)).filter(Boolean);

  return (
    <section id="ai-tools" className="relative z-10 py-24 md:py-36">
      <div className="shell">
        <SectionHeader index={3} label="AI Tools" title="AI tools" italic="landscape" />
        <Reveal delay={0.2} y={14}>
          <p className="mt-8 max-w-[540px] text-[17px] leading-[1.6] text-muted md:mt-12 md:text-[19px]">
            Tools and models across the AI-assisted development workflow.
          </p>
        </Reveal>

        {/* Model AI utama — tile besar dengan cahaya saat hover */}
        <div className="mt-14 md:mt-20">
          <Reveal y={10} duration={DUR.fast} className="flex items-baseline justify-between gap-4">
            <MonoLabel tone="accent">{aiModels.label}</MonoLabel>
            <MonoLabel>{String(aiModels.items.length).padStart(2, '0')}</MonoLabel>
          </Reveal>
          <ul className="mt-6 grid grid-cols-3 gap-x-3 gap-y-4 sm:flex sm:flex-wrap sm:gap-4">
            {aiModels.items.map((item, i) => (
              <MotionLi
                key={item.name}
                {...inView(0.1 + i * 0.08, { y: 26, duration: DUR.reveal, scale: 0.92 })}
                className="flex justify-center"
              >
                <IconTile name={item.name} Icon={item.Icon} mark={item.mark} size="lg" />
              </MotionLi>
            ))}
          </ul>
        </div>

        {/* Lima kategori lainnya */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {groups.map((group, gi) => (
            <Reveal
              key={group.label}
              delay={0.05 + (gi % 2) * 0.1}
              y={30}
              className={`surface spotlight rounded-2xl p-5 md:p-6 ${SPANS[group.label] ?? ''}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <MonoLabel tone="accent">{group.label}</MonoLabel>
                <MonoLabel>{String(group.items.length).padStart(2, '0')}</MonoLabel>
              </div>
              <ul className="mt-6 grid grid-cols-3 gap-x-2 gap-y-6 sm:grid-cols-4">
                {group.items.map((item, i) => (
                  <MotionLi
                    key={item.name}
                    {...inView(0.15 + (gi % 2) * 0.1 + i * 0.05, { y: 14, duration: DUR.base, scale: 0.92 })}
                    className="flex justify-center"
                  >
                    <IconTile
                      name={item.name}
                      Icon={item.Icon}
                      mark={item.mark}
                      size="sm"
                      labelMode="always"
                      className="w-full"
                    />
                  </MotionLi>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
