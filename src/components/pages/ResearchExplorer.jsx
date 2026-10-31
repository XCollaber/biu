import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Buildings, Scroll, ShieldCheck, Certificate, ArrowSquareOut, ShareNetwork, Printer, Check, List, X, CaretRight, FilePdf, DownloadSimple, ArrowRight, Sparkle, BookOpen, Globe, Info, ArrowsOut } from '../icons';
import researchData from '../../data/research.json';

const EASE = [0.16, 1, 0.3, 1];

const ICON_MAP = {
  Buildings,
  Scroll,
  ShieldCheck,
  Certificate,
};

export default function ResearchExplorer() {
  const reduceMotion = useReducedMotion();
  const contentRef = useRef(null);

  const sections = researchData.sections || [];
  const defaultSection = sections[0] || {};

  const [activeSectionId, setActiveSectionId] = useState(defaultSection.id || 'about-rdc');
  const [activePolicySubTab, setActivePolicySubTab] = useState('promotion');
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Sync with URL query parameter or pathname on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') || window.location.hash.replace('#', '');

    if (tabParam) {
      const found = sections.find(
        (s) => s.id.toLowerCase() === tabParam.toLowerCase() || s.slug.toLowerCase() === tabParam.toLowerCase()
      );
      if (found) {
        setActiveSectionId(found.id);
        return;
      }
    }

    if (path.includes('research-policy')) {
      setActiveSectionId('research-promotion-policy');
    } else if (path.includes('codeofethics')) {
      setActiveSectionId('code-of-ethics');
    } else if (path.includes('dsir') || path.includes('siro')) {
      setActiveSectionId('dsir-siro');
    } else if (path.includes('aboutrdc')) {
      setActiveSectionId('about-rdc');
    }
  }, [sections]);

  // Handle switching section
  const handleSelectSection = (sectionId, scrollToTop = false) => {
    setActiveSectionId(sectionId);
    setMobileDrawerOpen(false);

    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}?tab=${sectionId}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);

      if (scrollToTop && contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const activeSection = useMemo(() => {
    return sections.find((s) => s.id === activeSectionId) || defaultSection;
  }, [activeSectionId, sections, defaultSection]);

  // Copy shareable link
  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}${window.location.pathname}?tab=${activeSection.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Handle print
  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  // Handle image error fallback
  const handleImageError = (key) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans pb-24">
      {/* Header Breadcrumbs Strip */}
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap">
            <a href="/" className="hover:text-navy transition-colors font-medium">Home</a>
            <CaretRight size={12} className="text-slate-400" />
            <span className="text-slate-400">Research & Innovation</span>
            <CaretRight size={12} className="text-slate-400" />
            <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {activeSection.shortName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors font-medium active:scale-[0.98]"
              title="Share this section"
            >
              {copiedLink ? <Check size={14} className="text-emerald-600" /> : <ShareNetwork size={14} />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button> */}

            {/* <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors font-medium active:scale-[0.98]"
              title="Print page"
            >
              <Printer size={14} />
              <span>Print</span>
            </button> */}

            <a
              href="mailto:rdc@biu.edu.in"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#0c2340] hover:bg-[#163860] text-white font-semibold px-3 py-1 rounded-md shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span>Contact RDC Cell</span>
              <ArrowSquareOut size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Switcher Button */}
      <div className="lg:hidden mx-4 my-4">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#0c2340] text-white rounded-xl shadow-md border border-navy-light font-medium text-sm active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-2.5 truncate">
            <List size={18} className="text-white shrink-0" />
            <span className="truncate">Research Section: <strong className="text-white font-semibold">{activeSection.shortName}</strong></span>
          </div>
          <span className="text-[11px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/90 shrink-0">
            Change
          </span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ========================================================
              LEFT SIDEBAR: RESEARCH MENU (NO SUB-IDS)
             ======================================================== */}
          <aside className="lg:col-span-4 xl:col-span-3.5 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden sticky top-16">
              
              {/* Sidebar Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800">
                    Research Framework
                  </h2>
                  {/* <span className="text-[11px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-mono">
                    BIU RDC
                  </span> */}
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Select a section to view policies, facilities & publications
                </p>
              </div>

              {/* 4 Direct Options Menu List */}
              <div className="p-2 space-y-1.5">
                {sections.map((section) => {
                  const isActive = activeSectionId === section.id;
                  const IconComp = ICON_MAP[section.icon] || Buildings;

                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSelectSection(section.id, true)}
                      className={`w-full flex items-center justify-between text-left p-3.5 rounded-xl transition-all duration-200 select-none group active:scale-[0.98] ${
                        isActive
                          ? 'bg-[#0c2340] text-white shadow-md font-semibold'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 hover:border-slate-300 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        {/* Icon Box */}
                        <span
                          className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-colors ${
                            isActive
                              ? 'bg-white/15 text-white'
                              : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200/80'
                          }`}
                        >
                          <IconComp size={18} weight={isActive ? 'bold' : 'regular'} />
                        </span>

                        {/* Title */}
                        <span className="text-xs sm:text-[13.5px] leading-tight">
                          {section.name}
                        </span>
                      </div>

                      <CaretRight
                        size={15}
                        weight="bold"
                        className={`shrink-0 transition-transform ${
                          isActive
                            ? 'text-white translate-x-0.5'
                            : 'text-slate-400 group-hover:translate-x-0.5 group-hover:text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Quick Info Card */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  <Info size={16} className="text-[#0c2340]" />
                  <span>Research Development Cell</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-500">
                  Bareilly International University, Pilibhit Bypass Road, Bareilly, Uttar Pradesh 243006.
                </p>
                <div className="space-y-1 text-xs pt-1">
                  <a
                    href="mailto:rdc@biu.edu.in"
                    className="font-semibold text-navy hover:text-[#163860] block transition-colors"
                  >
                    ✉️ {researchData.pageHeader.email}
                  </a>
                  <a
                    href="tel:+917055510700"
                    className="font-semibold text-navy hover:text-[#163860] block transition-colors"
                  >
                    📞 {researchData.pageHeader.helpline}
                  </a>
                </div>
              </div>

            </div>
          </aside>

          {/* ========================================================
              RIGHT MAIN PANEL: CONTENT SWITCHER
             ======================================================== */}
          <main ref={contentRef} className="lg:col-span-8 xl:col-span-8.5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-8 lg:p-9 space-y-8"
              >

                {/* ====================================================
                    OPTION 1: ABOUT RESEARCH DEVELOPMENT CENTRE
                   ==================================================== */}
                {activeSection.id === 'about-rdc' && (
                  <div className="space-y-8">
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-6">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          Central Research Cell
                        </span>
                        <span>•</span>
                        <span className="text-slate-600 font-mono">
                          Bareilly International University
                        </span>
                      </div>

                      <h1 className="text-xl sm:text-2xl md:text-3xl font-normal text-slate-800 leading-snug">
                        <span className="font-bold text-slate-900">
                          {activeSection.name}
                        </span>
                      </h1>
                    </div>

                    {/* Video Player */}
                    <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-md">
                      <div className="relative aspect-video w-full">
                        <video
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover"
                          poster="/biu-campus1.webp"
                        >
                          <source src={activeSection.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <div className="px-4 py-2.5 bg-slate-900/95 text-white/90 text-xs flex items-center justify-between border-t border-white/10">
                        <span className="font-medium truncate">{activeSection.videoTitle}</span>
                        <span className="text-[11px] text-slate-400 font-mono">BIU RDC Official</span>
                      </div>
                    </div>

                    {/* Two Descriptive Paragraphs */}
                    <div className="space-y-4 text-sm sm:text-[14.5px] leading-relaxed text-slate-700">
                      {activeSection.paragraphs.map((p, idx) => (
                        <p key={idx} className="text-justify sm:text-left leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Databases & Digital Subscriptions (DELNET & DOAJ) */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600">
                        Digital Library & Journal Subscriptions
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeSection.databases.map((db, idx) => (
                          <a
                            key={idx}
                            href={db.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-slate-200 hover:border-[#0c2340] bg-white hover:bg-slate-50/80 transition-all duration-200 shadow-sm hover:shadow active:scale-[0.99]"
                          >
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <div className="h-14 flex items-center justify-center">
                                {!imageErrors[`db_${idx}`] ? (
                                  <img
                                    src={db.image}
                                    alt={db.name}
                                    onError={() => handleImageError(`db_${idx}`)}
                                    className="max-h-12 max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="flex items-center gap-2 text-base font-bold text-slate-800">
                                    <Globe size={20} className="text-[#0c2340]" />
                                    <span>{db.name}</span>
                                  </div>
                                )}
                              </div>
                              <span className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-[#0c2340] text-slate-500 group-hover:text-white transition-colors">
                                <ArrowSquareOut size={16} />
                              </span>
                            </div>

                            <div>
                              <h4 className="font-bold text-slate-900 group-hover:text-navy transition-colors text-sm">
                                {db.name} — <span className="font-normal text-slate-600">{db.subtitle}</span>
                              </h4>
                              <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                                {db.desc}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Periodic Journals Section */}
                    {activeSection.journalsSection && (
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div>
                          <div className="border-b-2 border-[#0c2340] pb-1.5 inline-block">
                            <h3 className="text-base sm:text-lg font-bold text-slate-800">
                              {activeSection.journalsSection.title}
                            </h3>
                          </div>
                          <p className="mt-2 text-xs sm:text-sm text-slate-600">
                            {activeSection.journalsSection.subtitle}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                          {activeSection.journalsSection.journals.map((journal, idx) => (
                            <a
                              key={idx}
                              href={journal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white hover:border-[#0c2340] transition-all duration-300 shadow-sm hover:shadow-lg active:scale-[0.99]"
                            >
                              <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-slate-100 relative">
                                {!imageErrors[`journal_${idx}`] ? (
                                  <img
                                    src={journal.image}
                                    alt={journal.name}
                                    onError={() => handleImageError(`journal_${idx}`)}
                                    className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                                  />
                                ) : (
                                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                                    <BookOpen size={40} className="text-slate-400 mb-2" />
                                    <span className="font-bold text-slate-800 text-sm">{journal.shortName}</span>
                                  </div>
                                )}
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[11px] font-mono text-slate-700 shadow-sm">
                                  {journal.frequency}
                                </div>
                              </div>

                              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-gradient-to-b from-white to-slate-50/50">
                                <div>
                                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                                    {journal.issn}
                                  </span>
                                  <h4 className="mt-1 font-bold text-slate-900 text-sm sm:text-base group-hover:text-navy transition-colors line-clamp-2">
                                    {journal.name}
                                  </h4>
                                  <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                                    {journal.affiliation}
                                  </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-navy group-hover:text-[#163860]">
                                  <span>Visit Official Journal Portal</span>
                                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* ====================================================
                    OPTION 2: RESEARCH PROMOTION POLICY (MULTI-PDF)
                   ==================================================== */}
                {activeSection.id === 'research-promotion-policy' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          Statutory Framework
                        </span>
                        <span>•</span>
                        <span className="text-slate-600 font-mono">
                          BIU Institutional Policies
                        </span>
                      </div>

                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                        Research Policy
                      </h1>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                        {activeSection.description}
                      </p>
                    </div>

                    {/* 4 Switchable Policy Tabs */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Select Policy Document:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeSection.policies.map((pol) => {
                          const isSelected = activePolicySubTab === pol.id;

                          return (
                            <button
                              key={pol.id}
                              onClick={() => setActivePolicySubTab(pol.id)}
                              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                                isSelected
                                  ? 'bg-[#0c2340] text-white shadow-md'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                              }`}
                            >
                              {pol.tabLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inbuilt PDF Viewer for the selected policy */}
                    {(() => {
                      const currentPolicy =
                        activeSection.policies.find((p) => p.id === activePolicySubTab) ||
                        activeSection.policies[0];

                      return (
                        <div className="space-y-4 pt-2">
                          {/* Viewer Title Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c2340] text-white px-4 py-3 rounded-xl shadow-sm">
                            <div className="flex items-center gap-2">
                              <FilePdf size={20} weight="fill" className="text-white shrink-0" />
                              <span className="font-bold text-xs sm:text-sm truncate">
                                {currentPolicy.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <a
                                href={currentPolicy.pdfUrl}
                                download
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-medium transition-colors"
                                title="Download PDF"
                              >
                                <DownloadSimple size={14} />
                                <span className="hidden sm:inline">Download</span>
                              </a>
                              <a
                                href={currentPolicy.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-medium transition-colors"
                                title="Open in new window"
                              >
                                <ArrowsOut size={14} />
                                <span className="hidden sm:inline">Full Screen</span>
                              </a>
                            </div>
                          </div>

                          {/* PDF Frame */}
                          <div className="relative w-full h-[650px] sm:h-[800px] rounded-xl border border-slate-200/90 overflow-hidden bg-slate-100 shadow-inner">
                            <iframe
                              src={`${currentPolicy.pdfUrl}#toolbar=1&navpanes=0`}
                              title={currentPolicy.title}
                              className="w-full h-full border-0"
                            />
                          </div>

                          {/* Fallback download helper for devices without embedded PDF support */}
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
                            <span>
                              Document not displaying on your device?
                            </span>
                            <a
                              href={currentPolicy.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-navy hover:underline inline-flex items-center gap-1"
                            >
                              <span>Click here to open {currentPolicy.title} (PDF)</span>
                              <ArrowSquareOut size={13} />
                            </a>
                          </div>
                        </div>
                      );
                    })()}

                  </div>
                )}

                {/* ====================================================
                    OPTION 3: CODE OF ETHICS (SINGLE-PDF)
                   ==================================================== */}
                {activeSection.id === 'code-of-ethics' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          Bioethics & Compliance
                        </span>
                        <span>•</span>
                        <span className="text-slate-600 font-mono">
                          Institutional Ethics Committee
                        </span>
                      </div>

                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                        {activeSection.name}
                      </h1>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                        {activeSection.description}
                      </p>
                    </div>

                    {/* PDF Viewer */}
                    <div className="space-y-4">
                      {/* Viewer Title Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c2340] text-white px-4 py-3 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2">
                          <FilePdf size={20} weight="fill" className="text-white shrink-0" />
                          <span className="font-bold text-xs sm:text-sm">
                            {activeSection.pdfTitle || activeSection.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={activeSection.pdfUrl}
                            download
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-medium transition-colors"
                            title="Download PDF"
                          >
                            <DownloadSimple size={14} />
                            <span className="hidden sm:inline">Download</span>
                          </a>
                          <a
                            href={activeSection.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-medium transition-colors"
                            title="Open in new window"
                          >
                            <ArrowsOut size={14} />
                            <span className="hidden sm:inline">Full Screen</span>
                          </a>
                        </div>
                      </div>

                      {/* PDF Frame */}
                      <div className="relative w-full h-[650px] sm:h-[800px] rounded-xl border border-slate-200/90 overflow-hidden bg-slate-100 shadow-inner">
                        <iframe
                          src={`${activeSection.pdfUrl}#toolbar=1&navpanes=0`}
                          title={activeSection.name}
                          className="w-full h-full border-0"
                        />
                      </div>

                      {/* Fallback download helper */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
                        <span>
                          Document not previewing in your browser?
                        </span>
                        <a
                          href={activeSection.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-navy hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open Code of Ethics PDF directly</span>
                          <ArrowSquareOut size={13} />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

                {/* ====================================================
                    OPTION 4: DSIR/SIRO RECOGNITION (SINGLE-PDF)
                   ==================================================== */}
                {activeSection.id === 'dsir-siro' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          Government Recognition
                        </span>
                        <span>•</span>
                        <span className="text-slate-600 font-mono">
                          Ministry of Science & Technology
                        </span>
                      </div>

                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                        {activeSection.name}
                      </h1>
                      <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                        {activeSection.description}
                      </p>
                    </div>

                    {/* PDF Viewer */}
                    <div className="space-y-4">
                      {/* Viewer Title Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c2340] text-white px-4 py-3 rounded-xl shadow-sm">
                        <div className="flex items-center gap-2">
                          <Certificate size={20} weight="fill" className="text-white shrink-0" />
                          <span className="font-bold text-xs sm:text-sm">
                            {activeSection.pdfTitle || activeSection.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={activeSection.pdfUrl}
                            download
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-medium transition-colors"
                            title="Download Certificate"
                          >
                            <DownloadSimple size={14} />
                            <span className="hidden sm:inline">Download</span>
                          </a>
                          <a
                            href={activeSection.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-medium transition-colors"
                            title="Open in new window"
                          >
                            <ArrowsOut size={14} />
                            <span className="hidden sm:inline">Full Screen</span>
                          </a>
                        </div>
                      </div>

                      {/* PDF Frame */}
                      <div className="relative w-full h-[650px] sm:h-[800px] rounded-xl border border-slate-200/90 overflow-hidden bg-slate-100 shadow-inner">
                        <iframe
                          src={`${activeSection.pdfUrl}#toolbar=1&navpanes=0`}
                          title={activeSection.name}
                          className="w-full h-full border-0"
                        />
                      </div>

                      {/* Fallback download helper */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
                        <span>
                          Document not previewing in your browser?
                        </span>
                        <a
                          href={activeSection.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-navy hover:underline inline-flex items-center gap-1"
                        >
                          <span>Open DSIR/SIRO Certificate PDF directly</span>
                          <ArrowSquareOut size={13} />
                        </a>
                      </div>
                    </div>

                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* University RDC Trust Banner */}
            {/* <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-white rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                  Scientific & Industrial Research
                </span>
                <h3 className="text-lg sm:text-xl font-bold">
                  Bareilly International University (BIU)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  DSIR/SIRO recognized research hub with comprehensive clinical trials, inter-disciplinary doctoral research, and modern medical science laboratories.
                </p>
              </div>

              <a
                href="/programmes"
                className="shrink-0 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-navy font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98]"
              >
                <span>Explore Ph.D. Programmes</span>
                <ArrowRight size={14} weight="bold" />
              </a>
            </div> */}

          </main>
        </div>
      </div>

      {/* ========================================================
          MOBILE DRAWER / MODAL FOR SWITCHING SECTIONS
         ======================================================== */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Research Navigation</h3>
                  <p className="text-xs text-slate-500">Tap to view policies and details</p>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto p-4 space-y-2">
                {sections.map((section) => {
                  const isSelected = activeSectionId === section.id;
                  const IconComp = ICON_MAP[section.icon] || Buildings;

                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSelectSection(section.id, true)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs text-left transition-all ${
                        isSelected
                          ? 'bg-[#0c2340] text-white font-bold'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp size={18} className={isSelected ? 'text-white' : 'text-slate-600'} />
                        <span>{section.name}</span>
                      </div>
                      {isSelected && <Check size={16} className="text-white shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}