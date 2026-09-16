import { motion, useReducedMotion } from 'framer-motion';
import {
  WhatsappLogo,
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  ArrowRight,
  MapPin,
  Phone,
  EnvelopeSimple,
  CaretRight,
} from '@phosphor-icons/react';
import Img from './Img';
import footerData from '../data/footer.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

const CTA_BG = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop';
const CTA_FALLBACK =
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop';

const SOCIALS = [
  { label: 'WhatsApp', icon: WhatsappLogo, href: `https://wa.me/${siteData.whatsappPhone || '917455002900'}` },
  { label: 'Instagram', icon: InstagramLogo, href: 'https://instagram.com' },
  { label: 'Facebook', icon: FacebookLogo, href: 'https://facebook.com' },
  { label: 'YouTube', icon: YoutubeLogo, href: 'https://youtube.com' },
];

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const quickLinks = footerData.quickLinks || [];

  return (
    <footer className="relative w-full">
      {/* CTA band — Infused with University Deep Navy */}
      <div className="relative flex min-h-[48vh] sm:min-h-[52vh] items-center overflow-hidden bg-[#07172b]">
        <Img
          src={CTA_BG}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== CTA_FALLBACK) e.currentTarget.src = CTA_FALLBACK;
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* University Navy gradient overlays */}
        <div className="absolute inset-0 bg-[#0c2340]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08172b]/85 via-[#0c2340]/60 to-[#0c2340]" />

        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative z-10 mx-auto max-w-3xl px-5 py-20 text-center sm:px-8"
        >
          <h2 className="font-serif text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl drop-shadow-md">
            {footerData.ctaTitle}
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-[15px] font-light leading-relaxed text-white/80 drop-shadow">
            {footerData.ctaSubtitle}
          </p>
          <div className="mt-9 flex justify-center">
            <a
              href={footerData.ctaButtonLink || '#contact'}
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light px-8 py-3.5 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-[0.14em] text-forest-dark shadow-xl transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-2xl hover:brightness-105 hover:from-gold-light hover:to-gold-dark active:translate-y-0 active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <span>{footerData.ctaButtonLabel || 'Apply Now 2026'}</span>
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer body — Blends #0c2340 through deep navy shades */}
      <div className="relative bg-gradient-to-b from-[#0c2340] via-[#091b30] to-[#061426] border-t border-white/10 overflow-hidden">
        {/* Specular top border highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent" />

        {/* Ambient background watermark lattice */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] overflow-hidden"
          aria-hidden="true"
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="biu-footer-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M24 0 L48 24 L24 48 L0 24 Z" fill="none" stroke="#ffffff" strokeWidth="1" />
                <path d="M0 0 L24 24 L48 0 M0 48 L24 24 L48 48" fill="none" stroke="#ffffff" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#biu-footer-lattice)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-14 pt-12 sm:px-8">
          {/* Desktop Layout (md+) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.1fr_0.9fr] lg:gap-8 gap-12">
            {/* Brand */}
            <div>
              <a href="/" className="flex items-center gap-3 sm:gap-3.5 group" aria-label="BIU home">
                <div className="flex h-16 w-16 sm:h-[72px] sm:w-[72px] items-center justify-center rounded-full bg-white p-2 sm:p-2.5 shadow-lg shrink-0 transition-transform duration-500 ease-premium group-hover:scale-105">
                  <img
                    src="/biu-logo.webp"
                    alt="Bareilly International University Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="flex flex-col leading-tight">
                  <span className="mt-1 font-serif text-base sm:text-lg font-extrabold tracking-wide text-white whitespace-nowrap">
                    {siteData.name || 'Bareilly International University'}
                  </span>
                  <span className="mt-0.5 font-sans text-[8.5px] uppercase tracking-[0.16em] text-cyan-400 font-semibold sm:text-[10px] whitespace-nowrap">
                    {siteData.accreditation || 'UGC Approved | NAAC A+ Grade'}
                  </span>
                </span>
              </a>

              <p className="mt-4 max-w-xs font-sans text-[14px] font-light leading-relaxed text-white/60">
                {footerData.brandTagline}
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="font-serif text-[18px] ml-3 font-semibold tracking-wide text-white">
                Quick Links
              </h3>
              <ul className="mt-5 space-y-3">
                {quickLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="group flex items-center gap-1.5 font-sans text-[14px] font-light text-white/65 transition-all duration-200 hover:text-cyan-300 hover:translate-x-1"
                    >
                      <CaretRight size={12} weight="bold" className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-300" />
                      <span>{l.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h3 className="font-serif text-[18px] font-semibold tracking-wide text-white">
                Contact Information
              </h3>
              <div className="mt-5 space-y-3.5 font-sans text-[14px] font-light text-white/65">
                <div className="flex items-start gap-2.5">
                  <MapPin size={18} weight="fill" className="text-cyan-400/90 shrink-0 mt-0.5" />
                  <p className="max-w-xs leading-relaxed">{siteData.address}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={18} weight="fill" className="text-cyan-400/90 shrink-0" />
                  <a href={`tel:${siteData.phone}`} className="transition-colors hover:text-cyan-300">
                    {siteData.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <EnvelopeSimple size={18} weight="fill" className="text-cyan-400/90 shrink-0" />
                  <a href={`mailto:${siteData.email}`} className="transition-colors hover:text-cyan-300">
                    {siteData.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-serif text-[18px] font-semibold tracking-wide text-white">
                Connect with Us
              </h3>
              <p className="mt-2 text-[12px] text-white/50 font-sans">
                Follow our official academic updates & campus life
              </p>
              <div className="mt-4 flex gap-2.5 flex-wrap">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80 transition-all duration-200 hover:border-gold/60 hover:bg-gold hover:text-forest-dark hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(198,161,91,0.3)]"
                  >
                    <Icon size={20} weight="fill" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Specific Layout (<md) */}
          <div className="flex flex-col gap-9 md:hidden">
            {/* 1. Brand Header */}
            <div>
              <a href="/" className="flex items-center gap-2.5 group" aria-label="BIU home">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-1.5 shadow-md shrink-0 transition-transform duration-500 ease-premium group-hover:scale-105">
                  <img
                    src="/biu-logo.webp"
                    alt="Bareilly International University Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="flex flex-col leading-tight">
                  <span className="mt-0.5 font-serif text-base font-extrabold tracking-wide text-white">
                    {siteData.name || 'Bareilly International University'}
                  </span>
                  <span className="mt-0.5 font-sans text-[8px] uppercase tracking-[0.16em] text-cyan-400 font-semibold">
                    {siteData.accreditation || 'UGC Approved | NAAC A+ Grade'}
                  </span>
                </span>
              </a>
              <p className="mt-3 font-sans text-[13px] font-light leading-relaxed text-white/60">
                {footerData.brandTagline}
              </p>
            </div>

            {/* 2. Contact Information */}
            <div>
              <h3 className="font-serif text-[17px] font-semibold text-white">
                Contact Information
              </h3>
              <div className="mt-4 space-y-3 font-sans text-[14px] font-light text-white/65">
                <div className="flex items-start gap-2.5">
                  <MapPin size={17} weight="fill" className="text-cyan-400/90 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{siteData.address}</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone size={17} weight="fill" className="text-cyan-400/90 shrink-0" />
                  <a href={`tel:${siteData.phone}`} className="transition-colors hover:text-cyan-300">
                    {siteData.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <EnvelopeSimple size={17} weight="fill" className="text-cyan-400/90 shrink-0" />
                  <a href={`mailto:${siteData.email}`} className="transition-colors hover:text-cyan-300">
                    {siteData.email}
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Horizontal Level: Quick Links (Left) & Connect with Us (Right) */}
            <div className="grid grid-cols-2 gap-5">
              {/* Quick Links on Left */}
              <div>
                <h3 className="font-serif text-[17px] font-semibold text-white">
                  Quick Links
                </h3>
                <ul className="mt-3.5 space-y-2.5">
                  {quickLinks.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="font-sans text-[13.5px] font-light text-white/65 transition-colors hover:text-cyan-300"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connect with Us on Right */}
              <div>
                <h3 className="font-serif text-[17px] font-semibold text-white">
                  Connect
                </h3>
                <div className="mt-3.5 flex flex-wrap gap-2.5">
                  {SOCIALS.map(({ label, icon: Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80 transition-all hover:border-gold hover:bg-gold hover:text-forest-dark"
                    >
                      <Icon size={18} weight="fill" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright and Legal Bar */}
          <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="font-sans text-[12px] font-light text-white/45">
              &copy; {new Date().getFullYear()} {footerData.copyrightText}
            </p>
            <p className="font-sans text-[12px] font-light text-white/45">
              {footerData.craftedText}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
