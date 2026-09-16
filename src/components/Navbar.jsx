import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { List, X, GraduationCap, Phone, EnvelopeSimple, MapPin } from '@phosphor-icons/react';
import Logo from './Logo';
import siteData from '../data/site.json';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT BIU', href: '/about' },
  { label: 'FACULTIES', href: '/faculties' },
  { label: 'PLACEMENTS', href: '/placements' },
  { label: 'NEWS & EVENTS', href: '/news' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'CONTACT', href: '/#contact' },
];

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('HOME');
  const { scrollY } = useScroll();
  const navRef = useRef(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  // Sync active nav item with URL path and hash
  useEffect(() => {
    const updateActiveItem = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path === '/about') {
        setActive('ABOUT BIU');
      } else if (path === '/faculties') {
        setActive('FACULTIES');
      } else if (path === '/placements') {
        setActive('PLACEMENTS');
      } else if (path === '/news') {
        setActive('NEWS & EVENTS');
      } else if (path === '/gallery') {
        setActive('GALLERY');
      } else if (hash === '#contact') {
        setActive('CONTACT');
      } else {
        setActive('HOME');
      }
    };

    updateActiveItem();
    window.addEventListener('hashchange', updateActiveItem);
    window.addEventListener('popstate', updateActiveItem);
    return () => {
      window.removeEventListener('hashchange', updateActiveItem);
      window.removeEventListener('popstate', updateActiveItem);
    };
  }, []);

  // Close mobile navbar menu when clicking anywhere outside of it
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <motion.header
      ref={navRef}
      initial={reduceMotion ? false : { y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,shadow] duration-500 ease-premium ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-200/60'
      }`}
    >
      {/* Top Utility Strip - Silky smooth gradual Framer Motion animation */}
      <motion.div
        initial={false}
        animate={
          scrolled
            ? { height: 0, opacity: 0 }
            : { height: 'auto', opacity: 1 }
        }
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden bg-[#0c2340] text-white/80 font-sans text-[11px] sm:text-[12px] border-b border-white/10"
      >
        <div className="mx-auto flex max-w-[1560px] items-center justify-between gap-3 px-3 sm:px-6 py-1.5">
          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/85">
            <a
              href="tel:+915812526244"
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <Phone size={14} weight="fill" className="text-gold shrink-0" />
              <span>+91-581-2526244</span>
            </a>
            <a
              href="mailto:admissions@biu.edu.in"
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <EnvelopeSimple size={14} weight="fill" className="text-gold shrink-0" />
              <span>admissions@biu.edu.in</span>
            </a>
            <div className="flex items-center gap-1.5 text-white/75">
              <MapPin size={14} weight="fill" className="text-gold shrink-0" />
              <span>Pilibhit Bypass Road, Bareilly, UP</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation Bar */}
      <nav className="mx-auto flex max-w-[1560px] items-center justify-between pl-4 pr-2 sm:px-6 py-1 border-t border-slate-100/80">
        {/* University Logo & Brand */}
        <a href="/" className="group flex items-center gap-2.5 sm:gap-3" aria-label="BIU Home">
          <img
            src="/biu-logo.webp"
            alt="Bareilly International University Logo"
            className="h-9 w-auto sm:h-12 object-contain transition-transform duration-500 ease-premium group-hover:scale-105"
          />
          <span className="flex flex-col leading-tight">
            <span className="mt-1 font-serif text-sm font-extrabold tracking-wide text-slate-950 sm:text-[20px]">
              {siteData.name || 'Bareilly International University'}
            </span>
            <span className="mt-0.5 font-sans text-[8.5px] uppercase tracking-[0.16em] text-cyan-800 font-semibold sm:text-[10px]">
              {siteData.accreditation || 'UGC Approved | NAAC A+ Grade'}
            </span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setActive(link.label)}
                className="group relative font-sans text-[12px] xl:text-[13px] font-bold uppercase tracking-[0.12em] text-slate-700 transition-colors duration-300 hover:text-[#0c2340]"
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#0c2340] transition-all duration-300 ease-premium ${
                    active === link.label ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-60'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Apply Now CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 pr-1 sm:pr-0">
          <a
            href="/#contact"
            className="group hidden sm:flex items-center gap-1.5 sm:gap-2 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light px-3.5 sm:px-6 py-2 sm:py-2.5 font-sans text-[10px] sm:text-[12px] font-extrabold uppercase tracking-[0.10em] sm:tracking-[0.14em] text-forest-dark shadow-md border border-gold-light/50 transition-all duration-300 ease-premium hover:scale-105 hover:shadow-lg hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <GraduationCap size={16} weight="fill" className="text-forest-dark shrink-0 transition-transform duration-300 group-hover:scale-110 sm:w-[18px] sm:h-[18px]" />
            <span>{siteData.bookButtonLabel || 'Apply Now 2026'}</span>
          </a>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-800 ring-1 ring-inset ring-slate-300 transition-colors duration-300 hover:bg-slate-100 lg:hidden shrink-0"
          >
            {menuOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <motion.div
        initial={false}
        animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden lg:hidden"
      >
        <ul className="flex flex-col gap-1 bg-white px-6 py-5 border-t border-slate-200 shadow-xl">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => {
                  setActive(link.label);
                  setMenuOpen(false);
                }}
                className="block py-2.5 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-slate-800 transition-colors hover:text-[#0c2340]"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-3">
            <a
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light px-6 py-3 text-center font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-forest-dark shadow-md border border-gold-light/50"
            >
              <GraduationCap size={18} weight="fill" className="text-forest-dark shrink-0" />
              <span>{siteData.bookButtonLabel || 'Apply Now 2026'}</span>
            </a>
          </li>
        </ul>
      </motion.div>

      {/* Mobile Backdrop overlay for instant outside click dismissal */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}
    </motion.header>
  );
}
