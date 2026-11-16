import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuInstagram,
  LuArrowUpRight,
  LuUser,
  LuAtSign,
  LuMessageSquareText,
  LuCheck,
  LuCopy,
} from 'react-icons/lu';
import { personal, socials, contact } from '../../data/portfolio';
import Reveal from '../ui/Reveal';
import SectionHeader from '../ui/SectionHeader';
import Magnetic from '../ui/Magnetic';
import MaskLine from '../ui/MaskLine';
import RevealLine from '../ui/RevealLine';
import ArrowLink from '../ui/ArrowLink';
import Button from '../ui/Button';
import { MotionDiv, MotionLi, MotionSpan, MotionP, inView, EASE, EASE_SOFT, DUR, VIEWPORT } from '../ui/motion';

// Ikon per jenis informasi kontak
const INFO_ICONS = { Email: LuMail, Phone: LuPhone, Location: LuMapPin, Instagram: LuInstagram };

/* ---------- Kolom kiri: satu baris informasi kontak ---------- */
function InfoRow({ item, index }) {
  const Icon = INFO_ICONS[item.label];
  const external = item.href && /^https?:/.test(item.href);
  const Comp = item.href ? 'a' : 'div';
  const linkProps = item.href
    ? { href: item.href, ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
    : {};

  return (
    <MotionLi className="relative" {...inView(0.15 + index * 0.09, { y: 14, duration: DUR.base })}>
      <RevealLine delay={0.1 + index * 0.09} className="absolute inset-x-0 top-0" />
      <Comp
        {...linkProps}
        className={`group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-5 outline-none md:gap-5 ${
          item.href ? 'cursor-pointer' : ''
        }`}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-[color,border-color,background-color,transform] duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent group-focus-visible:border-accent group-focus-visible:text-accent">
          <Icon
            aria-hidden="true"
            className="h-[17px] w-[17px] transition-transform duration-500 ease-out-expo group-hover:-rotate-[8deg] group-hover:scale-110"
          />
        </span>

        <span className="min-w-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
          <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{item.label}</span>
          <span className="mt-1 block break-words text-[17px] leading-snug text-fg transition-colors duration-300 group-hover:text-accent">
            {item.value}
          </span>
        </span>

        {item.href ? (
          <LuArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 -translate-x-1 translate-y-1 text-muted opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:translate-x-0 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-60"
          />
        ) : (
          <span />
        )}
      </Comp>
    </MotionLi>
  );
}

/* ---------- Kolom kanan: field form dengan ikon & state fokus accent ---------- */
function Field({ icon, label, multiline, index, ...props }) {
  const Icon = icon;
  const Input = multiline ? 'textarea' : 'input';
  return (
    <MotionDiv {...inView(0.2 + index * 0.09, { y: 16, duration: DUR.base })}>
      <label className="group relative block">
        <span className="sr-only">{label}</span>
        <Icon
          aria-hidden="true"
          className={`pointer-events-none absolute left-4 h-[17px] w-[17px] text-muted transition-[color,scale] duration-500 ease-out-expo group-hover:text-fg group-focus-within:scale-110 group-focus-within:text-accent ${
            multiline ? 'top-[18px]' : 'top-1/2 -translate-y-1/2'
          }`}
        />
        {/* Fokus: border accent + cahaya lembut; ikon ikut berubah accent */}
        <Input
          {...props}
          placeholder={label}
          className={`w-full rounded-xl border border-line bg-raised py-4 pl-12 pr-4 text-[16px] text-fg outline-none transition-[border-color,background-color,box-shadow] duration-500 ease-out-expo placeholder:text-muted placeholder:transition-opacity placeholder:duration-300 hover:border-muted focus:border-accent focus:bg-base focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_10%,transparent)] focus:placeholder:opacity-60 focus-visible:outline-none ${
            multiline ? 'resize-none' : ''
          }`}
        />
      </label>
    </MotionDiv>
  );
}

export default function Contact() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const copyTimer = useRef(null);
  const sentTimer = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  useEffect(
    () => () => {
      clearTimeout(copyTimer.current);
      clearTimeout(sentTimer.current);
    },
    []
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personal.email);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personal.email}`;
    }
  };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Tanpa backend: buka email client dengan isi form yang sudah terisi
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio message from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setForm({ name: '', email: '', message: '' });
    setSent(true);
    clearTimeout(sentTimer.current);
    sentTimer.current = setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative z-10 pb-24 pt-24 md:pb-32 md:pt-36">
      <div className="shell">
        <SectionHeader index={7} label="Contact" />

        {/* ---------- Penutup sinematik ---------- */}
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <h2 className="display-xl font-sans font-medium text-fg">
              <MaskLine>Let’s work</MaskLine>
              <MaskLine delay={0.14} innerClassName="font-serif font-normal italic tracking-[-0.01em]">
                together<span className="text-accent">.</span>
              </MaskLine>
            </h2>

            <Reveal delay={0.2} className="mt-10 md:mt-12">
              <p className="max-w-[460px] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.5] text-fg">
                {contact.pitch[0]}
                <br />
                {contact.pitch[1]}
              </p>
            </Reveal>

            <Reveal delay={0.3} className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-3">
              <button
                type="button"
                onClick={copyEmail}
                className="group relative inline-flex items-center gap-3 pb-1 text-left font-serif text-[clamp(1.75rem,3vw,2.75rem)] leading-tight text-fg transition-colors duration-300 hover:text-accent focus-visible:text-accent"
                aria-label={`Copy email address ${personal.email}`}
              >
                {personal.email}
                <LuCopy
                  aria-hidden="true"
                  className="h-5 w-5 -translate-x-1 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                />
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 block h-px bg-line" />
                <MotionSpan
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 block h-px origin-left bg-accent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: DUR.slow, ease: EASE, delay: 0.55 }}
                />
              </button>
              <span
                className="relative inline-flex h-8 items-center rounded-full border border-line px-3 font-mono text-[11px] tracking-[0.06em] text-muted"
                aria-live="polite"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <MotionSpan
                    key={copied ? 'copied' : 'idle'}
                    className={`inline-flex items-center gap-1.5 ${copied ? 'text-accent' : ''}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                    transition={{ duration: DUR.micro, ease: EASE_SOFT }}
                  >
                    {copied ? (
                      <>
                        <LuCheck aria-hidden="true" className="h-3.5 w-3.5" /> Copied
                      </>
                    ) : (
                      'Click to copy'
                    )}
                  </MotionSpan>
                </AnimatePresence>
              </span>
            </Reveal>

            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
              {socials.map((s, i) => (
                <MotionLi key={s.label} {...inView(0.4 + i * 0.07, { y: 10, duration: DUR.fast })}>
                  <ArrowLink href={s.url}>{s.label}</ArrowLink>
                </MotionLi>
              ))}
            </ul>
          </div>

          {/* CTA: lingkaran dengan teks berputar + tarikan magnetik halus */}
          <MotionDiv
            className="lg:col-span-3 lg:justify-self-end"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.8, rotate: reduce ? 0 : -20 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={VIEWPORT}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          >
            <Magnetic strength={0.35} max={14}>
              <a
                href={`mailto:${personal.email}?subject=${encodeURIComponent('Hello')}`}
                aria-label={`Say hello — email ${personal.email}`}
                className="group relative grid h-[168px] w-[168px] place-items-center rounded-full focus-visible:outline-offset-8 md:h-[200px] md:w-[200px]"
              >
                <svg viewBox="0 0 200 200" aria-hidden="true" className="spin-ring absolute inset-0 h-full w-full">
                  <defs>
                    <path id="cta-ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
                  </defs>
                  <text className="fill-muted font-mono text-[11.5px] uppercase tracking-[0.32em] transition-colors duration-500 group-hover:fill-accent">
                    <textPath href="#cta-ring">Say hello ✦ Say hello ✦ Say hello ✦ </textPath>
                  </text>
                </svg>
                <span className="btn-primary relative grid h-[96px] w-[96px] place-items-center overflow-hidden rounded-full transition-transform duration-700 ease-out-expo group-hover:scale-110 group-active:scale-95 md:h-[116px] md:w-[116px]">
                  <span className="btn-chip !h-full !w-full !bg-transparent !text-on-accent">
                    <LuArrowUpRight />
                    <LuArrowUpRight />
                  </span>
                </span>
              </a>
            </Magnetic>
          </MotionDiv>
        </div>

        {/* ---------- Contact Information & Send Me a Message ---------- */}
        <div className="mt-24 grid grid-cols-1 gap-4 md:mt-32 lg:grid-cols-2">
          {/* Kolom kiri */}
          <Reveal y={30} className="surface rounded-[28px] p-6 md:p-10">
            <h3 className="font-serif text-[clamp(2.25rem,3.6vw,3.25rem)] leading-[1.02] text-fg">
              <MaskLine duration={DUR.reveal}>Contact Information</MaskLine>
            </h3>
            <MotionP className="body-l mt-5 max-w-[460px] text-muted" {...inView(0.12, { y: 12, duration: DUR.base })}>
              {contact.supporting}
            </MotionP>

            <ul className="mt-10">
              {contact.info.map((item, i) => (
                <InfoRow key={item.label} item={item} index={i} />
              ))}
            </ul>
            <RevealLine delay={0.1 + contact.info.length * 0.09} />
          </Reveal>

          {/* Kolom kanan */}
          <Reveal y={30} delay={0.1} className="surface rounded-[28px] p-6 md:p-10">
            <h3 className="font-serif text-[clamp(2.25rem,3.6vw,3.25rem)] leading-[1.02] text-fg">
              <MaskLine duration={DUR.reveal} delay={0.08}>
                Send Me a Message
              </MaskLine>
            </h3>

            <form onSubmit={onSubmit} className="mt-10 space-y-4">
              <Field
                index={0}
                icon={LuUser}
                label="Your Name"
                type="text"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={onChange}
              />
              <Field
                index={1}
                icon={LuAtSign}
                label="Your Email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={onChange}
              />
              <Field
                index={2}
                icon={LuMessageSquareText}
                label="Your Message"
                multiline
                rows={6}
                name="message"
                required
                value={form.message}
                onChange={onChange}
              />

              <MotionDiv
                className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center"
                {...inView(0.47, { y: 12, duration: DUR.base })}
              >
                <Button type="submit" size="lg" magnetic className="w-full sm:w-auto">
                  Send Message
                </Button>
                <span aria-live="polite" className="min-h-[1.25rem] font-mono text-[12px] tracking-[0.04em] text-accent">
                  <AnimatePresence>
                    {sent && (
                      <MotionSpan
                        className="inline-flex items-center gap-1.5"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: DUR.fast, ease: EASE_SOFT }}
                      >
                        <LuCheck aria-hidden="true" className="h-3.5 w-3.5" />
                        Opening your email app…
                      </MotionSpan>
                    )}
                  </AnimatePresence>
                </span>
              </MotionDiv>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
