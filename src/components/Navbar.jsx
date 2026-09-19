import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import { List, X, GraduationCap, EnvelopeSimple, Phone, CaretDown, CaretRight, Briefcase, User } from '@phosphor-icons/react';
import siteData from '../data/site.json';

const NAV_ITEMS = [
  {
    id: 'programmes',
    label: 'Programmes',
    href: '/faculties',
    columns: [
      {
        title: 'Medical & Dental',
        items: [
          { title: 'MBBS & MD/MS', href: '/faculties', desc: 'Premier NMC approved medical degree programs' },
          { title: 'BDS & MDS', href: '/faculties', desc: 'DCI recognized dental surgery & specialization' },
          { title: 'Super Specialty Medicine', href: '/faculties', desc: 'DM, M.Ch & Clinical Fellowships' },
        ],
      },
      {
        title: 'Healthcare & Sciences',
        items: [
          { title: 'Pharmacy', href: '/faculties', desc: 'B.Pharm, D.Pharm & Drug Research' },
          { title: 'Nursing Sciences', href: '/faculties', desc: 'B.Sc Nursing, GNM & Clinical Training' },
          { title: 'Paramedical & Allied', href: '/faculties', desc: 'BMLT, BRIT & Physiotherapy' },
        ],
      },
      {
        title: 'Technology & Business',
        items: [
          { title: 'Engineering & AI', href: '/faculties', desc: 'B.Tech, M.Tech & Artificial Intelligence' },
          { title: 'Computer Applications', href: '/faculties', desc: 'BCA, MCA & Cyber Security' },
          { title: 'Management & Law', href: '/faculties', desc: 'BBA, MBA, BA LLB & Corporate Law' },
        ],
      },
    ],
    featured: {
      tag: 'Admissions 2026',
      title: 'Academic Catalogue 2026',
      desc: 'Explore 50+ undergraduate & postgraduate degree programmes across 9 constituent colleges.',
      image: '/biu-campus1.webp',
      linkText: 'Download Brochure',
      linkHref: '/#contact',
    },
    bottomLink: { text: 'See all 50+ degree programmes & faculties', href: '/faculties' },
  },
  {
    id: 'admissions',
    label: 'Admissions',
    href: '/#contact',
    columns: [
      {
        title: 'Applications',
        items: [
          { title: 'Online Application Form', href: '/#contact', desc: 'Direct online registration portal' },
          { title: 'Admission Guidelines 2026', href: '/#contact', desc: 'Step-by-step application guidance & seat status' },
          { title: 'Fee Structure & Scholarships', href: '/#contact', desc: 'Merit-based scholarships & tuition details' },
        ],
      },
      {
        title: 'Entrance & Counseling',
        items: [
          { title: 'Entrance Examinations', href: '/#contact', desc: 'NEET, JEE & BIU Entrance guidelines' },
          { title: 'Eligibility Criteria', href: '/#contact', desc: 'Stream requirements & minimum cutoffs' },
          { title: 'Document Verification', href: '/#contact', desc: 'Checklist for physical counseling' },
        ],
      },
      {
        title: 'Helpline & Aid',
        items: [
          { title: 'Academic Counselors', href: 'tel:+915812526244', desc: 'Talk to our admissions desk directly' },
          { title: 'Education Loans', href: '/#contact', desc: 'Bank tie-ups & zero-interest assistance' },
          { title: 'Campus Visit Booking', href: '/#contact', desc: 'Schedule a guided 1-on-1 campus tour' },
        ],
      },
    ],
    featured: {
      tag: 'Helpline Desk',
      title: 'Direct Counsel Helpline',
      desc: 'Have questions about eligibility or fees? Talk directly with senior university counselors.',
      image: '/chancellor.webp',
      linkText: 'Talk to Counselor',
      linkHref: 'tel:+915812526244',
    },
    bottomLink: { text: 'Check eligibility & application deadlines for 2026-27', href: '/#contact' },
  },
  {
    id: 'erp',
    label: 'Student ERP',
    href: 'https://test.biu.edu.in/#erp',
    columns: [
      {
        title: 'Digital Portals',
        items: [
          { title: 'Student Portal Login', href: 'https://test.biu.edu.in/#erp', desc: 'Access attendance, grades & fee receipts' },
          { title: 'Faculty Desk', href: 'https://test.biu.edu.in/#erp', desc: 'Internal portal for academic management' },
          { title: 'Parent Portal', href: 'https://test.biu.edu.in/#erp', desc: 'Monitor student progress & attendance' },
        ],
      },
      {
        title: 'Academics & Exams',
        items: [
          { title: 'Examination Cell', href: 'https://test.biu.edu.in/#erp', desc: 'Schedules, admit cards & semester results' },
          { title: 'Academic Calendar 2026', href: 'https://test.biu.edu.in/#erp', desc: 'Key term dates, holidays & events' },
          { title: 'Digital E-Library', href: 'https://test.biu.edu.in/#erp', desc: 'Access IEEE, PubMed & digital archives' },
        ],
      },
      {
        title: 'Campus Services',
        items: [
          { title: 'Hostel Management', href: 'https://test.biu.edu.in/#erp', desc: 'Room allocation & mess menu' },
          { title: 'Transport Network', href: 'https://test.biu.edu.in/#erp', desc: 'Bus routes & timetable tracking' },
        ],
      },
    ],
    featured: {
      tag: 'Digital Campus',
      title: 'BIU Mobile App',
      desc: 'Track lectures, download assignment materials & get instant exam alerts on your phone.',
      image: '/biu-campus2.webp',
      linkText: 'Launch Student Portal',
      linkHref: 'https://test.biu.edu.in/#erp',
    },
    bottomLink: { text: 'Log in to BIU Digital Student & ERP Portal', href: 'https://test.biu.edu.in/#erp' },
  },
  {
    id: 'campus',
    label: 'Campus Life',
    href: '/gallery',
    columns: [
      {
        title: 'Infrastructure',
        items: [
          { title: 'Virtual 360° Campus Tour', href: '/gallery', desc: 'Explore our 100+ acre modern campus' },
          { title: 'Super-Specialty Hospital', href: '/gallery', desc: '750+ bed hospital & emergency unit' },
          { title: 'Research Laboratories', href: '/gallery', desc: 'Advanced diagnostic & AI research labs' },
        ],
      },
      {
        title: 'Living & Wellness',
        items: [
          { title: 'Hostels & Accommodation', href: '/gallery', desc: 'AC/Non-AC student residences & amenities' },
          { title: 'Food Courts & Dining', href: '/gallery', desc: 'Hygienic multi-cuisine mess & cafes' },
          { title: 'Sports & Gymnasium', href: '/gallery', desc: 'Complexes, grounds & fitness centers' },
        ],
      },
    ],
    featured: {
      tag: 'Campus Gallery',
      title: 'Life at BIU Campus',
      desc: 'Take a visual walk through state-of-the-art facilities, campus events, and green lawns.',
      image: '/gallery/biu-campus4.webp',
      linkText: 'View Full Gallery',
      linkHref: '/gallery',
    },
    bottomLink: { text: 'Explore campus facilities, hostels & sports grounds', href: '/gallery' },
  },
  {
    id: 'about',
    label: 'About BIU',
    href: '/#location',
    columns: [
      {
        title: 'University Overview',
        items: [
          { title: 'Vision & Mission', href: '/#location', desc: 'Premier NAAC A+ accredited university' },
          { title: 'Leadership & Deans', href: '/#location', desc: 'Meet our visionaries & academic heads' },
          { title: 'Accreditation & Approvals', href: '/#location', desc: 'UGC, NMC, DCI & INC recognitions' },
        ],
      },
      {
        title: 'Location & Contact',
        items: [
          { title: 'Bareilly Main Campus', href: '/#location', desc: 'Pilibhit Bypass Road, Bareilly, UP' },
          { title: 'Hospital & Emergency', href: '/#location', desc: '24x7 medical assistance & trauma center' },
        ],
      },
    ],
    featured: {
      tag: 'Leadership',
      title: "Chancellor's Message",
      desc: 'Empowering minds through world-class education, research, and healthcare excellence.',
      image: '/chancellor.webp',
      linkText: 'Read Message',
      linkHref: '/#location',
    },
    bottomLink: { text: 'Learn more about Bareilly International University', href: '/#location' },
  },
];

export default function Navbar() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
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
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveItem(null);
    }, 150);
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
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-[border-color,box-shadow] duration-300 ${
        scrolled ? 'border-b border-slate-200/80 shadow-xs' : 'border-b border-slate-200/60'
      }`}
    >
      {/* Top Utility Ribbon - Stripe Tier Clean Top Strip */}
      <motion.div
        initial={false}
        animate={scrolled ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={handleMouseLeave}
        className="overflow-hidden bg-[#0c2340] text-white/90 font-sans text-[11px] sm:text-[12px] border-b border-white/10"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-1.5">
          <div className="flex items-center gap-2 text-white font-medium text-[11px] sm:text-[12px] tracking-wide">
            <span className="font-semibold text-white">BIU</span>
            <span className="text-white/40">•</span>
            <span className="text-white/80">Bareilly International University Main Campus</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-white/90 text-[11px] sm:text-[12.5px]">
            <a href="mailto:admissions@biu.edu.in" className="flex items-center gap-1.5 transition-colors hover:text-cyan-300">
              <EnvelopeSimple size={14} weight="fill" className="text-cyan-400 shrink-0" />
              <span>admissions@biu.edu.in</span>
            </a>
            <a href="tel:+915812526244" className="hidden sm:flex items-center gap-1.5 transition-colors hover:text-cyan-300">
              <Phone size={14} weight="fill" className="text-cyan-400 shrink-0" />
              <span>+91 (581) 2526244</span>
            </a>
            <a
              href="https://test.biu.edu.in/#erp"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block font-medium text-white transition-colors hover:text-cyan-300"
            >
              Student Portal
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white border border-white/20 transition-all hover:bg-white/20"
            >
              <Briefcase size={13} weight="fill" className="text-amber-400 shrink-0" />
              <span>Careers</span>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Stripe Navigation Bar */}
      <div
        className="relative mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8 py-2.5"
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
        onMouseLeave={handleMouseLeave}
      >
        {/* University Brand Logo */}
        <a href="/" className="group flex items-center gap-3 shrink-0" aria-label="BIU Home">
          <img
            src="/biu-logo.webp"
            alt="Bareilly International University"
            className="h-9 w-auto sm:h-11 object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base font-extrabold tracking-tight text-slate-900 sm:text-[21px]">
              {siteData.name || 'Bareilly International University'}
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-[#0c2340] font-bold sm:text-[10px]">
              {siteData.accreditation || 'UGC Approved | NAAC A+ Grade'}
            </span>
          </span>
        </a>

        {/* Desktop Nav Tabs (Stripe Style) */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const isHovered = activeItem === item.id;
            return (
              <div
                key={item.id}
                className="relative py-1"
                onMouseEnter={() => handleMouseEnter(item.id)}
              >
                <a
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-[13px] font-bold tracking-tight transition-all duration-200 ${
                    isHovered
                      ? 'bg-slate-100 text-[#0c2340]'
                      : 'text-slate-700 hover:text-[#0c2340] hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <CaretDown
                    size={12}
                    weight="bold"
                    className={`transition-transform duration-200 ${
                      isHovered ? 'rotate-180 text-[#0c2340]' : 'text-slate-400'
                    }`}
                  />
                </a>
              </div>
            );
          })}
        </nav>

        {/* Right Buttons: Sign In & Apply Now (Stripe Style) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://test.biu.edu.in/#erp"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 font-sans text-xs font-bold text-[#0c2340] hover:text-[#102d52] px-3.5 py-2 transition-colors"
          >
            <User size={15} weight="bold" />
            <span>Sign in</span>
          </a>

          <a
            href="/#contact"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0c2340] via-[#102d52] to-[#163860] px-5 py-2.5 font-sans text-xs font-bold text-white shadow-xs transition-all duration-200 hover:shadow-md hover:brightness-110 active:scale-[0.98]"
          >
            <GraduationCap size={16} weight="fill" className="text-amber-400 transition-transform duration-200 group-hover:scale-110" />
            <span>Apply Now 2026</span>
            <CaretRight size={12} weight="bold" className="text-white/80 transition-transform duration-200 group-hover:translate-x-0.5" />
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

      {/* Stripe Mega Menu Dropdown Container */}
      <AnimatePresence>
        {activeNavData && (
          <div className="absolute inset-x-0 top-full z-50 pointer-events-none">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }}
                onMouseLeave={handleMouseLeave}
                className="relative pointer-events-auto overflow-hidden rounded-xl bg-white border border-slate-200/80 shadow-[0_30px_90px_-20px_rgba(12,35,64,0.18)] font-sans"
              >
                {/* Invisible Hover Bridge to prevent gap mouseleave flicker */}
                <div
                  className="absolute -top-4 inset-x-0 h-4"
                  onMouseEnter={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                  }}
                />

                <div className="grid grid-cols-12 divide-x divide-slate-100 font-sans">
                  {/* Left Multi-Column Layout */}
                  <div className="col-span-8 lg:col-span-9 p-7 sm:p-8">
                    <div
                      className={`grid gap-8 ${
                        activeNavData.columns.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
                      }`}
                    >
                      {activeNavData.columns.map((col) => (
                        <div key={col.title} className="flex flex-col gap-4">
                          <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            {col.title}
                          </h4>
                          <div className="flex flex-col gap-3.5">
                            {col.items.map((item) => (
                              <a
                                key={item.title}
                                href={item.href}
                                onClick={() => setActiveItem(null)}
                                className="group flex flex-col items-start rounded-lg transition-colors"
                              >
                                <span className="flex items-center gap-1 font-sans text-[13.5px] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-800">
                                  <span>{item.title}</span>
                                  <CaretRight
                                    size={12}
                                    weight="bold"
                                    className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-cyan-800"
                                  />
                                </span>
                                <span className="font-sans text-xs text-slate-500 font-normal leading-relaxed mt-0.5 group-hover:text-slate-700">
                                  {item.desc}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Featured Column (Stripe Style Light Tint Panel) */}
                  <div className="col-span-4 lg:col-span-3 bg-[#f8f9fc] p-6 sm:p-7 flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400 mb-4">
                        {activeNavData.featured.tag}
                      </h4>

                      <a
                        href={activeNavData.featured.linkHref}
                        onClick={() => setActiveItem(null)}
                        className="group block rounded-xl bg-white p-4 border border-slate-200/70 shadow-xs transition-all duration-200 hover:shadow-md hover:border-slate-300"
                      >
                        {activeNavData.featured.image && (
                          <img
                            src={activeNavData.featured.image}
                            alt={activeNavData.featured.title}
                            className="h-28 w-full rounded-lg object-cover mb-3.5"
                          />
                        )}
                        <h5 className="font-sans text-xs font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                          {activeNavData.featured.title}
                        </h5>
                        <p className="font-sans text-[11.5px] text-slate-500 mt-1 leading-relaxed">
                          {activeNavData.featured.desc}
                        </p>
                        <div className="mt-3.5 inline-flex items-center gap-1 font-sans text-xs font-bold text-[#0c2340] group-hover:text-cyan-800 transition-colors">
                          <span>{activeNavData.featured.linkText}</span>
                          <CaretRight size={12} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer Strip inside Mega Menu */}
                {activeNavData.bottomLink && (
                  <div className="bg-slate-50/90 border-t border-slate-100 px-7 py-3 flex items-center justify-between">
                    <a
                      href={activeNavData.bottomLink.href}
                      onClick={() => setActiveItem(null)}
                      className="group inline-flex items-center gap-1.5 font-sans text-xs font-bold text-[#0c2340] hover:text-cyan-800 transition-colors"
                    >
                      <span>{activeNavData.bottomLink.text}</span>
                      <CaretRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
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
                      <div className="flex flex-col gap-3 pl-3 pt-2 pb-3">
                        {item.columns.map((col) => (
                          <div key={col.title} className="flex flex-col gap-2">
                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {col.title}
                            </span>
                            {col.items.map((sub) => (
                              <a
                                key={sub.title}
                                href={sub.href}
                                onClick={() => setMenuOpen(false)}
                                className="font-sans text-xs text-slate-600 hover:text-[#0c2340]"
                              >
                                {sub.title}
                              </a>
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
                  href="https://test.biu.edu.in/#erp"
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

