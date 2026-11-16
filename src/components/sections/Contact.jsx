import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { SiGithub, SiInstagram, SiGmail, SiWhatsapp } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import {
  LuMail,
  LuPhone,
  LuMapPin,
  LuInstagram,
  LuLinkedin,
  LuArrowUpRight,
  LuUser,
  LuAtSign,
  LuMessageSquareText,
  LuCheck,
  LuCopy,
  LuPenLine,
  LuX,
} from 'react-icons/lu';
import { personal, socials, contact } from '../../data/portfolio';
import SectionHeader from '../ui/SectionHeader';
import MaskLine from '../ui/MaskLine';
import RevealLine from '../ui/RevealLine';
import Button from '../ui/Button';
import { MotionDiv, MotionSpan, MotionA, MotionLi, inView, EASE, EASE_SOFT, DUR, VIEWPORT } from '../ui/motion';

/* ------------------------------------------------------------------
 * SOCIAL CONNECTION — PERSONAL DIGITAL IDENTITY
 * Headline raksasa → CTA "Let's talk" → showcase logo sosial (komposisi asimetris)
 * → strip kontak pendukung. Form menjadi panel opsional ("Write a message").
 * ------------------------------------------------------------------ */

const social = Object.fromEntries(socials.map((s) => [s.label, s]));
const MAILTO = `mailto:${personal.email}`;
// WhatsApp memakai nomor telepon yang sudah ada di data (format internasional tanpa "+")
const WHATSAPP = `https://wa.me/${personal.phoneHref.replace(/\D/g, '')}`;

/*
 * Preset seragam untuk keluarga kartu Instagram · LinkedIn · WhatsApp:
 * bentuk, ukuran, radius, posisi logo & animasi identik — hanya logonya yang berbeda.
 */
const BRAND_CARD = {
  shape: 'min-h-[260px] rounded-[32px] md:col-span-12 md:min-h-[240px] lg:col-span-4 lg:min-h-[340px]',
  logoClass:
    '-bottom-[12%] -right-[10%] h-[74%] aspect-square rotate-[-10deg] group-hover:-translate-y-[3%] group-hover:translate-x-[4%] group-hover:rotate-0 group-hover:scale-[1.06] md:h-[76%] lg:h-[64%]',
  // Nama besar dibatasi di area kiri agar tidak menimpa logo
  nameClass: 'max-w-[62%] text-[clamp(1.9rem,2.5vw,2.4rem)]',
  handleClass: 'max-w-[62%]',
};

/**
 * Huruf-huruf yang terangkat halus saat di-hover (tanpa layout shift).
 * Huruf dikelompokkan per kata agar baris hanya patah di antara kata.
 */
function HoverChars({ text }) {
  return text.split(' ').map((word, w, words) => (
    <span key={w} className="inline-block whitespace-nowrap">
      {[...word].map((ch, i) => (
        <span key={i} className="name-char inline-block">
          {ch}
        </span>
      ))}
      {w < words.length - 1 ? ' ' : null}
    </span>
  ));
}

/**
 * Satu tile media sosial: logo raksasa (terpotong di tepi), nama platform, handle, chip panah.
 * Hover: logo membesar & tegak, berubah accent dengan cahaya; nama besar naik dari balik mask.
 */
function SocialTile({ href, icon, platform, handle, index, shape, logoClass, nameClass, handleClass = '' }) {
  const Icon = icon;
  return (
    <MotionA
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${platform} — ${handle}`}
      {...inView(0.1 + index * 0.1, { y: 40, duration: DUR.reveal, scale: 0.96 })}
      whileTap={{ scale: 0.985 }}
      className={`surface spotlight group relative isolate flex overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent ${shape}`}
    >
      {/* Logo raksasa */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute text-fg/85 transition-[transform,color,filter] max-md:text-fg/[0.14] duration-700 ease-out-expo group-hover:text-accent group-hover:drop-shadow-[0_0_40px_color-mix(in_srgb,var(--accent)_45%,transparent)] ${logoClass}`}
      >
        <Icon className="h-full w-full" />
      </span>

      {/* Teks */}
      <span className="relative z-10 flex w-full flex-col justify-between gap-10 p-6 md:p-8">
        <span className="flex items-start justify-between gap-4">
          <span className="mono-label uppercase text-muted transition-colors duration-300 group-hover:text-fg">
            ({String(index + 1).padStart(2, '0')}) {platform}
          </span>
          {/* Chip panah: panah lama keluar ke kanan-atas, panah baru masuk dari kiri-bawah */}
          <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-line-strong bg-base/40 text-fg backdrop-blur-sm transition-[transform,background-color,border-color,color] duration-500 ease-out-expo group-hover:scale-110 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent group-active:scale-95">
            <LuArrowUpRight
              aria-hidden="true"
              className="absolute h-5 w-5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-8 group-hover:translate-x-8"
            />
            <LuArrowUpRight
              aria-hidden="true"
              className="absolute h-5 w-5 -translate-x-8 translate-y-8 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0"
            />
          </span>
        </span>
        <span className="block">
          {/* Nama platform besar: naik dari balik mask saat hover (selalu tampil di layar sentuh) */}
          <span className="block overflow-hidden">
            <span
              className={`block translate-y-[105%] font-display leading-[0.86] text-fg [text-shadow:0_2px_28px_rgba(0,0,0,0.45)] transition-transform duration-700 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0 [@media(hover:none)]:translate-y-0 ${nameClass}`}
            >
              {platform}
            </span>
          </span>
          <span
            className={`mt-2 block font-sub text-[17px] text-fg [text-shadow:0_1px_16px_rgba(0,0,0,0.5)] transition-colors duration-300 group-hover:text-accent md:text-[19px] ${handleClass}`}
          >
            {handle}
          </span>
        </span>
      </span>
    </MotionA>
  );
}

/** Field form dengan ikon & state fokus accent. */
function Field({ icon, label, multiline, index, ...props }) {
  const Icon = icon;
  const Input = multiline ? 'textarea' : 'input';
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.base, ease: EASE, delay: 0.15 + index * 0.07 }}
    >
      <label className="group relative block">
        <span className="sr-only">{label}</span>
        <Icon
          aria-hidden="true"
          className={`pointer-events-none absolute left-5 h-[17px] w-[17px] text-muted transition-[color,scale] duration-500 ease-out-expo group-hover:text-fg group-focus-within:scale-110 group-focus-within:text-accent ${
            multiline ? 'top-[20px]' : 'top-1/2 -translate-y-1/2'
          }`}
        />
        <Input
          {...props}
          placeholder={label}
          className={`w-full border border-line bg-fg/[0.03] py-4 pl-13 pr-5 text-[16px] text-fg outline-none transition-[border-color,background-color,box-shadow] duration-500 ease-out-expo placeholder:text-muted hover:border-line-strong focus:border-accent focus:bg-base focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_10%,transparent)] focus-visible:outline-none ${
            multiline ? 'resize-none rounded-[24px]' : 'rounded-full'
          }`}
        />
      </label>
    </MotionDiv>
  );
}

const INFO_ICONS = { Email: LuMail, Phone: LuPhone, Location: LuMapPin, Instagram: LuInstagram, LinkedIn: LuLinkedin };

export default function Contact() {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
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
      window.location.href = MAILTO;
    }
  };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Tanpa backend: buka email client dengan isi form yang sudah terisi
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = `Portfolio message from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `${MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setForm({ name: '', email: '', message: '' });
    setSent(true);
    clearTimeout(sentTimer.current);
    sentTimer.current = setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative z-10 overflow-hidden pb-24 pt-24 md:pb-32 md:pt-36">
      {/* Cahaya ambient yang bernapas pelan */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute -left-[20%] top-[30%] h-[900px] w-[900px] opacity-60"
      />

      <div className="shell relative">
        <SectionHeader index={7} label="Contact" />

        {/* ---------- Headline raksasa ---------- */}
        <div className="flex flex-col gap-10 lg:gap-14">
          <div>
            <MotionSpan
              {...inView(0.05, { y: 10, duration: DUR.fast })}
              className="mono-label mb-6 flex items-center gap-3 uppercase text-accent"
            >
              <span aria-hidden="true" className="spin-ring inline-block">
                ✦
              </span>
              Have something in mind?
            </MotionSpan>
            <h2 className="display-xl text-fg" aria-label="Let's create something.">
              <MaskLine delay={0.05} duration={1}>
                <span aria-hidden="true">
                  <HoverChars text="Let’s create" />
                </span>
              </MaskLine>
              <MaskLine delay={0.18} duration={1} className="w-fit pr-[0.06em]">
                <span aria-hidden="true" className="relative inline-block text-accent">
                  <HoverChars text="something." />
                  <MotionSpan
                    className="signature-line absolute -bottom-[0.04em] left-0 block h-[3px] w-full origin-left rounded-full bg-accent shadow-[0_0_18px_color-mix(in_srgb,var(--accent)_55%,transparent)] md:h-[5px]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={VIEWPORT}
                    transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.8 }}
                  />
                </span>
              </MaskLine>
            </h2>
          </div>

          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <MotionDiv {...inView(0.3, { y: 16, duration: DUR.base })}>
              <p className="max-w-[360px] text-[17px] leading-[1.55] text-fg">
                {contact.pitch[0]} {contact.pitch[1]}
              </p>
            </MotionDiv>
            {/* CTA utama */}
            <MotionDiv
              initial={{ opacity: 0, scale: reduce ? 1 : 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: DUR.slow, ease: EASE, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button href={MAILTO} size="xl" magnetic aria-label={`Let's talk — email ${personal.email}`}>
                Let’s talk
              </Button>
              <Button
                variant="secondary"
                size="md"
                icon={formOpen ? LuX : LuPenLine}
                iconDir="up"
                aria-expanded={formOpen}
                aria-controls="message-panel"
                onClick={() => setFormOpen((v) => !v)}
              >
                {formOpen ? 'Close' : 'Write a message'}
              </Button>
            </MotionDiv>
          </div>
        </div>

        {/* ---------- Panel pesan (opsional) ---------- */}
        <AnimatePresence initial={false}>
          {formOpen && (
            <MotionDiv
              id="message-panel"
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="surface mt-10 grid grid-cols-1 gap-8 rounded-[32px] p-6 md:p-10 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h3 className="font-display text-[clamp(2.5rem,4vw,3.75rem)] leading-[0.88] text-fg">
                    Write a message
                  </h3>
                  <p className="mt-4 max-w-[340px] text-[16px] leading-[1.55] text-muted">{contact.supporting}</p>
                </div>
                <form onSubmit={onSubmit} className="space-y-3 lg:col-span-8">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                  </div>
                  <Field
                    index={2}
                    icon={LuMessageSquareText}
                    label="Your Message"
                    multiline
                    rows={5}
                    name="message"
                    required
                    value={form.message}
                    onChange={onChange}
                  />
                  <div className="flex flex-col items-start gap-4 pt-2 sm:flex-row sm:items-center">
                    <Button type="submit" size="lg" className="w-full sm:w-auto">
                      Send via email
                    </Button>
                    <span
                      aria-live="polite"
                      className="min-h-[1.25rem] font-label text-[12px] uppercase tracking-[0.1em] text-accent"
                    >
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
                  </div>
                </form>
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>

        {/* ---------- Showcase media sosial ----------
            GitHub: kartu lebar. Instagram · LinkedIn · WhatsApp: satu keluarga kartu identik (BRAND_CARD). */}
        <div className="mt-16 grid grid-cols-1 gap-4 md:mt-24 md:grid-cols-12">
          <SocialTile
            index={0}
            href={social.GitHub.url}
            icon={SiGithub}
            platform="GitHub"
            handle={social.GitHub.handle}
            shape="min-h-[300px] rounded-[36px] md:col-span-12 md:min-h-[320px]"
            logoClass="-bottom-[34%] -right-[6%] h-[110%] aspect-square rotate-[-8deg] group-hover:-translate-y-[4%] group-hover:rotate-0 group-hover:scale-[1.06] md:right-[4%] md:h-[135%]"
            nameClass="text-[clamp(4rem,9vw,8.5rem)]"
          />
          <SocialTile
            index={1}
            href={social.Instagram.url}
            icon={SiInstagram}
            platform="Instagram"
            handle={social.Instagram.handle}
            {...BRAND_CARD}
          />
          <SocialTile
            index={2}
            href={social.LinkedIn.url}
            icon={FaLinkedin}
            platform="LinkedIn"
            handle={social.LinkedIn.handle}
            {...BRAND_CARD}
          />
          <SocialTile
            index={3}
            href={WHATSAPP}
            icon={SiWhatsapp}
            platform="WhatsApp"
            handle={personal.phone}
            {...BRAND_CARD}
          />

          {/* Email: pill panjang dengan alamat raksasa */}
          <MotionDiv
            {...inView(0.4, { y: 40, duration: DUR.reveal, scale: 0.97 })}
            className="surface spotlight group relative isolate flex flex-col gap-6 overflow-hidden rounded-[36px] p-6 md:col-span-12 md:flex-row md:items-center md:rounded-full md:p-5 md:pr-8"
          >
            <a
              href={MAILTO}
              aria-label={`Email — ${personal.email}`}
              className="flex min-w-0 flex-1 items-center gap-5 outline-none focus-visible:text-accent md:gap-7"
            >
              <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-fg/[0.06] text-fg transition-[transform,background-color,color] duration-700 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-105 group-hover:bg-accent group-hover:text-on-accent md:h-28 md:w-28">
                <SiGmail className="h-9 w-9 md:h-12 md:w-12" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="mono-label block uppercase text-muted">(05) Email me</span>
                <span className="mt-1 block font-display text-[clamp(1.2rem,5.2vw,3.5rem)] leading-[1] [overflow-wrap:anywhere] text-fg transition-colors duration-500 group-hover:text-accent">
                  {personal.email}
                </span>
              </span>
            </a>
            <div className="flex items-center gap-3 md:shrink-0">
              <button
                type="button"
                onClick={copyEmail}
                className="btn btn-secondary btn-sm btn-noicon gap-2"
                aria-label={`Copy email address ${personal.email}`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <MotionSpan
                    key={copied ? 'copied' : 'idle'}
                    className={`inline-flex items-center gap-2 ${copied ? 'text-accent' : ''}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                    transition={{ duration: DUR.micro, ease: EASE_SOFT }}
                    aria-live="polite"
                  >
                    {copied ? <LuCheck className="h-4 w-4" /> : <LuCopy className="h-4 w-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </MotionSpan>
                </AnimatePresence>
              </button>
              <a
                href={MAILTO}
                aria-hidden="true"
                tabIndex={-1}
                className="grid h-12 w-12 place-items-center rounded-full border border-line-strong text-fg transition-[transform,background-color,border-color,color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent"
              >
                <LuArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </MotionDiv>
        </div>

        {/* ---------- Kontak pendukung ---------- */}
        <RevealLine className="mt-16 md:mt-20" duration={DUR.slow} />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {contact.info.map((item, i) => {
            const Icon = INFO_ICONS[item.label];
            const external = item.href && /^https?:/.test(item.href);
            const inner = (
              <>
                <span className="mono-label flex items-center gap-2 uppercase text-muted">
                  <Icon
                    aria-hidden="true"
                    className="h-3.5 w-3.5 transition-[transform,color] duration-500 ease-out-expo group-hover:-rotate-12 group-hover:text-accent"
                  />
                  {item.label}
                </span>
                <span className="mt-2 block break-words font-sub text-[16.5px] leading-snug text-fg">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat pb-0.5 transition-[background-size,color] duration-500 ease-out-expo group-hover:bg-[length:100%_1px] group-hover:text-accent">
                    {item.value}
                  </span>
                </span>
              </>
            );
            return (
              <MotionLi
                key={item.label}
                {...inView(0.1 + i * 0.08, { y: 14, duration: DUR.base })}
                className="border-b border-line py-5 sm:pr-6 lg:border-b-0 lg:border-r lg:py-7 lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group block outline-none focus-visible:text-accent"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="group">{inner}</div>
                )}
              </MotionLi>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
