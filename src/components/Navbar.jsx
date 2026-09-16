import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { List, X, GraduationCap, Phone, EnvelopeSimple, MapPin, CaretDown, Briefcase } from '@phosphor-icons/react';
import Logo from './Logo';
import siteData from '../data/site.json';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  {
    label: 'PROGRAMMES OFFERED',
    href: '/faculties',
    dropdown: [
      { name: 'Medical Sciences (MBBS, MD, MS)', href: '/faculties', desc: 'Premier NMC approved medical degree programs' },
      { name: 'Dental Sciences (BDS, MDS)', href: '/faculties', desc: 'DCI recognized dental surgery & specialization' },
      { name: 'Engineering & Technology', href: '/faculties', desc: 'B.Tech, M.Tech, Computer Science & AI' },
      { name: 'Pharmacy & Drug Research', href: '/faculties', desc: 'B.Pharm, D.Pharm & Pharmaceutical Sciences' },
      { name: 'Nursing & Allied Health', href: '/faculties', desc: 'B.Sc Nursing, GNM & Clinical Training' },
      { name: 'Management & Law', href: '/faculties', desc: 'BBA, MBA, BA LLB & Corporate Law' },
    ],
  },
  {
    label: 'ADMISSIONS DESK',
    href: '/#contact',
    dropdown: [
      { name: 'Admission Procedure 2026-27', href: '/#contact', desc: 'Step-by-step application guidance & seat status' },
      { name: 'Fee Structure & Scholarships', href: '/#contact', desc: 'Merit-based scholarships & tuition details' },
      { name: 'Online Application Form', href: '/#contact', desc: 'Direct online registration portal' },
      { name: 'Entrance Examinations', href: '/#contact', desc: 'NEET, JEE & University entrance guidelines' },
      { name: 'Counseling & Helpline', href: 'tel:+915812526244', desc: 'Talk to our academic counselors directly' },
    ],
  },
  {
    label: 'STUDENT ERP',
    href: 'https://test.biu.edu.in/#erp',
    dropdown: [
      { name: 'Student Portal Login', href: 'https://test.biu.edu.in/#erp', desc: 'Access attendance, grades & course materials' },
      { name: 'Examinations & Results', href: 'https://test.biu.edu.in/#erp', desc: 'Schedules, admit cards & semester results' },
      { name: 'Academic Calendar 2026', href: 'https://test.biu.edu.in/#erp', desc: 'Key term dates, holidays & events' },
      { name: 'Digital E-Library', href: 'https://test.biu.edu.in/#erp', desc: 'Access journals, e-books & research papers' },
    ],
  },
  {
    label: 'CAMPUS TOUR',
    href: '/gallery',
    dropdown: [
      { name: 'Virtual 360° Campus Tour', href: '/gallery', desc: 'Explore our 100+ acre modern campus' },
      { name: 'Hostels & Accommodation', href: '/gallery', desc: 'AC/Non-AC student residences & amenities' },
      { name: 'Sports & Gymnasium', href: '/gallery', desc: 'Complexes, grounds & fitness centers' },
      { name: 'Labs & Research Infrastructure', href: '/gallery', desc: 'State-of-the-art super-specialty labs' },
    ],
  },
];

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('HOME');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileAccordion, setMobileAccordion] = useState(null);
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

      if (path === '/faculties') {
        setActive('PROGRAMMES OFFERED');
      } else if (path === '/gallery') {
        setActive('CAMPUS TOUR');
      } else if (hash === '#contact') {
        setActive('ADMISSIONS DESK');
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,shadow] duration-500 ease-premium ${scrolled
        ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-md'
        : 'bg-white border-b border-slate-200/60'
        }`}
    >
      {/* Top Utility Strip - Matches Reference Design */}
      <motion.div
        initial={false}
        animate={
          scrolled
            ? { height: 0, opacity: 0 }
            : { height: 'auto', opacity: 1 }
        }
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden bg-[#0c2340] text-white/90 font-sans text-[11px] sm:text-[12px] border-b border-white/10"
      >
        <div className="w-full flex items-center justify-between gap-3 px-3 sm:px-6 lg:px-8 py-1.5">
          {/* Left Side: Campus Identity */}
          <div className="flex items-center gap-2 text-white font-medium text-[11px] sm:text-[12px] tracking-wide">
            <span>BIU (Bareilly International University)</span>
            <span className="text-white/90">|</span>
            <span className="text-white">Main Campus</span>
          </div>

          {/* Right Side: Quick Links & Careers */}
          <div className="flex items-center gap-4 sm:gap-6 text-white text-[11px] sm:text-[13px]">
            <a
              href="mailto:admissions@biu.edu.in"
              className="flex items-center gap-1.5 transition-colors hover:text-cyan-300"
            >
              <EnvelopeSimple size={15} weight="fill" className="mb-0.5 text-white hover:text-cyan-300 shrink-0" />
              <span>admissions@biu.edu.in</span>
            </a>
            <a
              href="/#contact"
              className="hidden sm:inline-block transition-colors hover:text-cyan-300 text-white"
            >
              Alumni
            </a>
            <a
              href="https://test.biu.edu.in/#erp"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block transition-colors hover:text-cyan-300 text-white"
            >
              Student Portal
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-0.5 text-[10.5px] sm:text-[12px] font-medium text-white border border-white/20 transition-all hover:bg-white/25 hover:border-white/30"
            >
              <Briefcase size={14} weight="fill" className="mb-0.5 text-cyan-300 shrink-0" />
              <span>Careers</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation Bar */}
      <nav className="relative w-full flex items-center justify-between px-3 sm:px-6 lg:px-8 py-1.5 border-t border-slate-100/80">
        {/* Heritage Diamond Lattice Watermark Pattern Overlay (Fade-out from bottom to top) */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 90%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 90%)',
          }}
          aria-hidden="true"
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="biu-heritage-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M24 0 L48 24 L24 48 L0 24 Z" fill="none" stroke="#0c2340" strokeWidth="1" />
                <path d="M24 6 L42 24 L24 42 L6 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.6" strokeDasharray="2,2" />
                <path d="M0 0 L24 24 L48 0 M0 48 L24 24 L48 48" fill="none" stroke="#0c2340" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#biu-heritage-lattice)" />
          </svg>
        </div>
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

        {/* Desktop nav links with Dropdown Menus */}
        <ul className="hidden items-center gap-2 lg:flex xl:gap-2.5">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.label;
            const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);
            const isHovered = openDropdown === link.label;

            return (
              <li
                key={link.label}
                className="relative shrink-0 py-2"
                onMouseEnter={() => hasDropdown && setOpenDropdown(link.label)}
                onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
              >
                <a
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 font-sans text-[11px] xl:text-[12px] font-semibold uppercase tracking-[0.08em] transition-all duration-200 whitespace-nowrap border ${isActive || isHovered
                      ? 'bg-[#0c2340]/10 text-cyan-900 border-[#0c2340]/10 shadow-xs'
                      : 'border-transparent text-slate-800 hover:bg-[#0c2340]/10 hover:text-cyan-900'
                    }`}
                >
                  <span>{link.label}</span>
                  {hasDropdown && (
                    <CaretDown
                      size={12}
                      weight="bold"
                      className={`transition-transform duration-200 ${isHovered ? 'rotate-180 text-cyan-900' : 'text-slate-500'
                        }`}
                    />
                  )}
                </a>

                {/* Dropdown Menu Container */}
                <AnimatePresence>
                  {hasDropdown && isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-full left-0 w-72 rounded-2xl bg-[#fdfbf7] backdrop-blur-xl border border-slate-200/90 shadow-2xl p-2.5 z-50 overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => {
                              setActive(link.label);
                              setOpenDropdown(null);
                            }}
                            className="group flex flex-col p-2.5 rounded-xl hover:bg-slate-100/90 transition-colors text-left"
                          >
                            <span className="font-heading text-[13px] font-semibold tracking-tight text-slate-900 group-hover:text-cyan-900 transition-colors">
                              {item.name}
                            </span>
                            {item.desc && (
                              <span className="font-sans text-[11px] font-normal text-slate-500 mt-0.5 leading-snug">
                                {item.desc}
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
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
        <ul className="flex flex-col gap-1 bg-[#fdfbf7] px-6 py-5 border-t border-amber-200/60 shadow-xl">
          {NAV_LINKS.map((link) => {
            const hasDropdown = Boolean(link.dropdown && link.dropdown.length > 0);
            const isAccordionOpen = mobileAccordion === link.label;

            return (
              <li key={link.label} className="border-b border-slate-100 last:border-0 pb-1">
                <div className="flex items-center justify-between py-2">
                  <a
                    href={link.href}
                    onClick={() => {
                      setActive(link.label);
                      setMenuOpen(false);
                    }}
                    className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-slate-800 transition-colors hover:text-cyan-800"
                  >
                    {link.label}
                  </a>
                  {hasDropdown && (
                    <button
                      type="button"
                      onClick={() => setMobileAccordion(isAccordionOpen ? null : link.label)}
                      className="p-1 text-slate-500 hover:text-cyan-900"
                    >
                      <CaretDown
                        size={16}
                        weight="bold"
                        className={`transition-transform duration-300 ${isAccordionOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </div>

                {/* Mobile Accordion Items */}
                {hasDropdown && isAccordionOpen && (
                  <div className="flex flex-col gap-1 pl-3 pb-2 pt-1">
                    {link.dropdown.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        onClick={() => {
                          setActive(link.label);
                          setMenuOpen(false);
                        }}
                        className="py-1.5 font-sans text-xs text-slate-600 hover:text-cyan-900"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
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
