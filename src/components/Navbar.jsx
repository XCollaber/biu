import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import {
  List,
  X,
  GraduationCap,
  EnvelopeSimple,
  Phone,
  CaretDown,
  CaretRight,
  Briefcase,
  User,
  Buildings,
  UsersThree,
  ShieldCheck,
  Trophy,
  Compass,
  Scales,
  CheckCircle,
  Flask,
  BookOpen,
  Sparkle,
  FileText,
} from '@phosphor-icons/react';
import siteData from '../data/site.json';
import NAV_ITEMS from '../data/navigation.json';

const ICON_MAP = {
  Buildings,
  UsersThree,
  ShieldCheck,
  Trophy,
  Compass,
  Scales,
  CheckCircle,
  Flask,
  Briefcase,
  User,
  GraduationCap,
  BookOpen,
  Sparkle,
  FileText,
};

const renderIcon = (iconName, size = 16, className = '') => {
  const IconComp = ICON_MAP[iconName] || Buildings;
  return <IconComp size={size} weight="bold" className={className} />;
};


export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [activeSidebarIndex, setActiveSidebarIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('programmes');
  const [mobileAccordion, setMobileAccordion] = useState(null);
  const { scrollY } = useScroll();
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);
  });

  const handleMouseEnter = (itemId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveItem(itemId);
    setActiveSidebarIndex(0);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 100);
  };

  // Close mobile menu on click outside
  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const activeNavData = NAV_ITEMS.find((item) => item.id === activeItem);

  return (
    <motion.header
      ref={navRef}
      initial={reduceMotion ? false : { y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'
        }`}
    >
      {/* Top Utility Ribbon - Stripe Tier Clean Top Strip */}
      <motion.div
        initial={false}
        animate={scrolled ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={handleMouseLeave}
        className="overflow-hidden bg-gradient-to-r from-[#143966] via-[#0c2340] to-[#07192e] text-white/90 font-sans text-[11px] sm:text-[12px] border-b border-white/10"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-1.5">
          <div className="flex items-center gap-2 text-white font-medium text-[11px] sm:text-[12px] tracking-wide">
            <span className="font-semibold text-white">BIU</span>
            <span className="text-white/60">•</span>
            <span className="text-white/80">Bareilly International University Main Campus</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-white/90 text-[11px] sm:text-[12.5px]">
            <a href="mailto:admissions@biu.edu.in" className="flex items-center gap-1.5 transition-colors hover:text-blue-200/95">
              <EnvelopeSimple size={15} weight="fill" className="text-blue-300 shrink-0" />
              <span>admissions@biu.edu.in</span>
            </a>
            <a href="tel:+915812526244" className="hidden sm:flex items-center gap-1.5 transition-colors hover:text-blue-200/95">
              <Phone size={14} weight="fill" className="text-blue-300 shrink-0" />
              <span>+91 (581) 2526244</span>
            </a>
            <a
              href="https://student.biuerp.com/studentpanel/student/stulogin"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block font-medium text-white transition-colors hover:text-blue-200/95"
            >
              Student Portal
            </a>
            <a
              href="https://biu.edu.in/career.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white border border-white/20 transition-all hover:bg-white/20"
            >
              <Briefcase size={14} weight="fill" className="text-blue-300 shrink-0" />
              <span>Careers</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Stripe Navigation Bar */}
      <div className="relative w-full overflow-hidden">
        {/* Clean Concentric Double-Line Diamond Watermark Pattern Overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.10] overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 90%)',
          }}
          aria-hidden="true"
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="biu-heritage-lattice" width="48" height="48" patternUnits="userSpaceOnUse" patternTransform="translate(0, -22)">
                {/* Outer Diamond Grid */}
                <path d="M 24 0 L 48 24 L 24 48 L 0 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.65" />
                {/* Inner Concentric Diamond */}
                <path d="M 24 9 L 39 24 L 24 39 L 9 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.60" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#biu-heritage-lattice)" />
          </svg>
        </div>

        <div
          className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5"
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onMouseLeave={handleMouseLeave}
        >
          {/* University Brand Logo */}
          <a href="/" className="group flex items-center gap-3 shrink-0" aria-label="BIU Home">
            <img
              src="/biu-logo.jpg.jpeg"
              alt="Bareilly International University"
              className="h-9 w-auto sm:h-11 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-newsreader text-[18px] sm:text-[19px] font-semibold text-slate-900">
                {siteData.name || 'Bareilly International University'}
              </span>
              <span className="font-fraunces text-[9px] uppercase tracking-[0.16em] text-[#0c2340]/85 font-semibold sm:text-[9.5px]">
                {siteData.accreditation || 'UGC Approved | NAAC A+ Grade'}
              </span>
            </span>
          </a>

          {/* Desktop Nav Tabs (Stripe Style) */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isHovered = activeItem === item.id;
              const isDimmed = activeItem && !isHovered;

              return (
                <div
                  key={item.id}
                  className="relative py-1"
                  onMouseEnter={() => handleMouseEnter(item.id)}
                >
                  <a
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-[13.5px] font-bold tracking-tight transition-all duration-300 ${isHovered
                      ? 'bg-slate-100 text-[#0c2340] opacity-100'
                      : isDimmed
                        ? 'text-slate-600 opacity-70 hover:opacity-100'
                        : 'text-slate-700 hover:text-[#0c2340] hover:bg-slate-50 opacity-100'
                      }`}
                  >
                    <span>{item.label}</span>
                    <CaretDown
                      size={13}
                      weight="bold"
                      className={`transition-transform duration-200 ${isHovered ? 'rotate-180 text-[#0c2340]' : 'text-slate-400'
                        }`}
                    />
                  </a>
                </div>
              );
            })}
          </nav>

          {/* Right Buttons: Apply Now (Stripe Style) */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/#contact"
              className="group hidden sm:inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-3.5 py-2.5 font-sans text-xs font-semibold text-white shadow-xs brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-125 active:scale-[0.98]"
            >
              <GraduationCap size={18} weight="fill" className="text-blue-100 transition-transform duration-200 group-hover:scale-110" />
              <span>Apply Now 2026</span>
              <CaretRight size={12} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-800 ring-1 ring-inset ring-slate-300 transition-colors duration-200 hover:bg-slate-100 lg:hidden shrink-0"
            >
              {menuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
            </button>
          </div>
        </div>
      </div>

      {/* Stripe Mega Menu Dropdown Container */}
      <AnimatePresence>
        {activeNavData && (
          <div className="absolute inset-x-0 top-full z-50 pointer-events-none">
            <div className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                onWheel={(e) => e.stopPropagation()}
                data-lenis-prevent="true"
                className="relative pointer-events-auto overflow-hidden rounded-2xl bg-white p-3.5 sm:p-4 border border-slate-200/80 shadow-[0_25px_70px_-15px_rgba(12,35,64,0.16)] font-sans overscroll-contain"
              >
                {/* Invisible Hover Bridge to prevent gap mouseleave flicker */}
                <div
                  className="absolute -top-4 inset-x-0 h-4"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  }}
                />

                <div className="flex gap-3 font-sans items-stretch h-[440px]">
                  {/* Left Sidebar Panel - Exact Match with Image 2 */}
                  <div className="w-[235px] lg:w-[255px] shrink-0 rounded-xl border border-slate-200/90 bg-gradient-to-b from-gray-100/60 via-gray-100/20 to-white p-2 flex flex-col justify-between shadow-2xs h-full overflow-hidden">
                    <div data-lenis-prevent="true" className="flex flex-col gap-1 overflow-y-auto pr-0.5 overscroll-contain">
                      {(activeNavData.sidebar || []).map((sItem, idx) => {
                        const isActive = activeSidebarIndex === idx;
                        return (
                          <a
                            key={sItem.title}
                            href={sItem.href}
                            target={sItem.href?.startsWith('http') ? '_blank' : '_self'}
                            rel={sItem.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            onMouseEnter={() => setActiveSidebarIndex(idx)}
                            onClick={() => setActiveItem(null)}
                            className={`group flex items-center justify-between rounded-lg px-3 py-2 text-[12.5px] border transition-colors duration-150 ${
                              isActive
                                ? 'bg-[#eef4ff]/60 text-cyan-900 font-bold border-blue-300/25 shadow-2xs'
                                : 'border-transparent text-slate-700 hover:bg-white hover:text-[#0c2340] hover:shadow-2xs hover:border-slate-200/60 font-medium'
                            }`}
                          >
                            <span className="flex items-center gap-2.5 truncate">
                              {renderIcon(sItem.icon, 20, isActive ? 'text-cyan-900/90 font-bold' : 'text-slate-500 group-hover:text-[#0c2340]')}
                              <span className="truncate">{sItem.title}</span>
                            </span>
                            <CaretRight
                              size={12}
                              weight="bold"
                              className={isActive ? 'text-cyan-900/90 font-bold' : 'text-slate-400 group-hover:text-[#0c2340] group-hover:translate-x-0.5 transition-transform'}
                            />
                          </a>
                        );
                      })}
                    </div>

                    {/* Bottom Watermark Monument Graphic Card */}
                    <div className="relative -ml-2 -mr-2 -mb-2 mt-auto min-h-[140px] overflow-hidden rounded-b-xl bg-white pt-6 pb-3 px-4 shadow-2xs flex flex-col justify-end shrink-0">
                      <img
                        src="/biu-building.png"
                        alt="Bareilly International University"
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom scale-115 origin-bottom opacity-30"
                      />
                      <div className="relative z-10">
                        <div className="font-newsreader text-[12.5px] font-bold uppercase tracking-[0.10em] text-slate-800 leading-tight">
                          <div>Bareilly</div>
                          <div>International</div>
                          <div>University</div>
                        </div>
                        <div className="mt-1.5 h-0.5 w-7 rounded-full bg-gold" />
                      </div>
                    </div>
                  </div>

                  {/* Middle Multi-Column Grid - Dynamically Driven by Active Left Sidebar Category */}
                  {(() => {
                    const activeSidebarItem = activeNavData.sidebar?.[activeSidebarIndex] || activeNavData.sidebar?.[0];
                    const currentColumns = activeSidebarItem?.columns || activeNavData.columns || [];

                    return (
                      <div data-lenis-prevent="true" className="flex-1 p-5 lg:p-6 overflow-y-auto h-full overscroll-contain">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
                          {currentColumns.map((col) => (
                            <div key={col.title} className="flex flex-col gap-3">
                              <div className="flex items-center gap-1.5 pb-1.5 border-b border-slate-100">
                                {col.icon && renderIcon(col.icon, 13, 'text-slate-400 shrink-0')}
                                <h4 className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                                  {col.title}
                                </h4>
                              </div>
                              <div className="flex flex-col gap-2.5">
                                {col.items.map((item) => (
                                  <div key={item.title} className="group flex flex-col items-start w-full">
                                    {item.href ? (
                                      <a
                                        href={item.href}
                                        target={item.href.startsWith('http') ? '_blank' : '_self'}
                                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        onClick={() => setActiveItem(null)}
                                        className="flex items-center justify-between w-full py-1 font-sans text-[13px] font-semibold tracking-tight text-slate-800 transition-colors group-hover:text-cyan-900"
                                      >
                                        <span>{item.title}</span>
                                        <CaretRight
                                          size={11}
                                          weight="bold"
                                          className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-900 shrink-0"
                                        />
                                      </a>
                                    ) : (
                                      <span className="pt-2 pb-0.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                        {item.title}
                                      </span>
                                    )}
                                    {item.sublinks && item.sublinks.length > 0 && (
                                      <div className="mt-1 flex flex-col gap-1 pl-3 border-l-2 border-slate-200/80 w-[165px] mb-1">
                                        {item.sublinks.map((sub) => (
                                          <a
                                            key={sub.title}
                                            href={sub.href}
                                            target={sub.href.startsWith('http') ? '_blank' : '_self'}
                                            rel={sub.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            onClick={() => setActiveItem(null)}
                                            className="group/sub flex items-center justify-between w-full py-1 px-1.5 text-[12px] font-medium text-slate-700 rounded transition-all hover:bg-[#eef4ff]/70 hover:text-cyan-900"
                                          >
                                            <span className="transition-colors group-hover/sub:text-cyan-900">
                                              {sub.title}
                                            </span>
                                            <CaretRight
                                              size={10}
                                              weight="bold"
                                              className="text-slate-400 group-hover/sub:text-cyan-900 transition-all duration-150 group-hover/sub:translate-x-0.5 shrink-0 ml-2"
                                            />
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                  {/* Right Featured Column - Exact Match with Image 2 */}
                  <div className="w-[245px] lg:w-[265px] shrink-0 rounded-xl border border-slate-200/90 bg-gradient-to-b from-gray-100/60 via-gray-100/20 to-white p-3 flex flex-col justify-between shadow-2xs h-full">
                    <div>
                      {activeNavData.featured.image && (
                        <img
                          src={activeNavData.featured.image}
                          alt={activeNavData.featured.title}
                          className="h-56 w-full rounded-xl object-cover object-[center_20%] shadow-2xs border border-slate-200/60 bg-slate-100 shrink-0"
                        />
                      )}
                      <div className="mt-3 px-0.5">
                        <h5 className="font-sans text-[14px] font-bold text-slate-900 tracking-tight leading-snug">
                          {activeNavData.featured.title}
                        </h5>
                        <p className="font-sans text-[11.5px] text-slate-600 mt-1 leading-relaxed line-clamp-3">
                          {activeNavData.featured.desc}
                        </p>
                        <div className="h-0.5 w-8 bg-gold my-2.5 rounded-full" />
                      </div>
                    </div>

                    <a
                      href={activeNavData.featured.linkHref}
                      target={activeNavData.featured.linkHref?.startsWith('http') ? '_blank' : '_self'}
                      rel={activeNavData.featured.linkHref?.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={() => setActiveItem(null)}
                      className="group inline-flex items-center justify-center gap-2 w-full rounded-md bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-3.5 py-2.5 font-sans text-xs font-semibold text-white shadow-xs brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-125 active:scale-[0.98] shrink-0 mt-auto"
                    >
                      <span>{activeNavData.featured.linkText || 'Read Message'}</span>
                      <CaretRight size={12} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>

                {/* Bottom Footer Strip inside Mega Menu - Fixed to Admissions Registration */}
                <div className="bg-slate-50/90 rounded-lg border-t -mb-3 mt-2 border-slate-100 px-5 py-2 flex items-center justify-between">
                  <a
                    href="https://enquiry.biuerp.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setActiveItem(null)}
                    className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#0c2340] hover:text-cyan-800 transition-colors"
                  >
                    <span>Register for 2026–27 session admissions & counseling</span>
                    <CaretRight size={14} weight="bold" className="transition-transform group-hover:translate-x-0.5 text-[#0c2340] group-hover:text-cyan-800" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Backdrop Blur Overlay when Mega Menu is focused (Hero Section Only) */}
      <AnimatePresence>
        {activeNavData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full h-[100vh] -z-10 bg-slate-900/15 backdrop-blur-[4px] pointer-events-none hidden lg:block"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer (Accordion) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden lg:hidden bg-white border-t border-slate-100 shadow-xl"
            data-lenis-prevent="true"
          >
            <div className="flex flex-col gap-2 px-5 py-6">
              {NAV_ITEMS.map((item) => {
                const isOpen = mobileAccordion === item.id;
                return (
                  <div key={item.id} className="border-b border-slate-100 pb-2">
                    <button
                      type="button"
                      onClick={() => setMobileAccordion(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between py-2 text-left font-sans text-sm font-bold text-slate-800"
                    >
                      <span>{item.label}</span>
                      <CaretDown
                        size={16}
                        weight="bold"
                        className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0c2340]' : 'text-slate-400'}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="flex flex-col gap-3.5 pl-3 pt-2 pb-3">
                        {(item.sidebar || []).map((sCategory) => (
                          <div key={sCategory.title} className="flex flex-col gap-2">
                            <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#0c2340] border-b border-slate-100 pb-1 flex items-center gap-1.5">
                              {renderIcon(sCategory.icon, 14, 'text-blue-700')}
                              <span>{sCategory.title}</span>
                            </span>
                            {(sCategory.columns || []).map((col) => (
                              <div key={col.title} className="flex flex-col gap-1.5 pl-2">
                                <span className="font-sans text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                                  {col.title}
                                </span>
                                {col.items.map((sub) => (
                                  <div key={sub.title} className="flex flex-col gap-1">
                                    {sub.href ? (
                                      <a
                                        href={sub.href}
                                        target={sub.href.startsWith('http') ? '_blank' : '_self'}
                                        rel={sub.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        onClick={() => setMenuOpen(false)}
                                        className="font-sans text-xs font-semibold text-slate-700 hover:text-cyan-900"
                                      >
                                        {sub.title}
                                      </a>
                                    ) : (
                                      <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-slate-400 pt-1">
                                        {sub.title}
                                      </span>
                                    )}
                                    {sub.sublinks && sub.sublinks.length > 0 && (
                                      <div className="flex flex-col gap-1 pl-2.5 border-l-2 border-slate-200 mt-1">
                                        {sub.sublinks.map((child) => (
                                          <a
                                            key={child.title}
                                            href={child.href}
                                            target={child.href.startsWith('http') ? '_blank' : '_self'}
                                            rel={child.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                            onClick={() => setMenuOpen(false)}
                                            className="group/mobsub flex items-center justify-between text-[11.5px] font-medium text-slate-700 hover:text-cyan-900 py-0.5 w-full"
                                          >
                                            <span>{child.title}</span>
                                            <CaretRight size={10} weight="bold" className="text-slate-400 group-hover/mobsub:text-cyan-900 shrink-0" />
                                          </a>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="flex flex-col gap-2.5 pt-3">
                <a
                  href="https://student.biuerp.com/studentpanel/student/stulogin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-2.5 font-sans text-xs font-bold text-slate-800 shadow-xs"
                >
                  <User size={16} weight="bold" />
                  <span>Student ERP Portal</span>
                </a>
                <a
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0c2340] to-[#163860] py-3 font-sans text-xs font-bold text-white shadow-md"
                >
                  <GraduationCap size={18} weight="fill" className="text-amber-400 shrink-0" />
                  <span>Apply Now 2026</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

