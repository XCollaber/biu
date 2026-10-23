import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  HandCoins,
  Flask,
  Certificate,
  RocketLaunch,
  ArrowSquareOut,
  ShareNetwork,
  Printer,
  Check,
  List,
  X,
  CaretRight,
  FilePdf,
  DownloadSimple,
  ArrowRight,
  Sparkle,
  MagnifyingGlass,
  Funnel,
  ShieldCheck,
  Buildings,
  CheckCircle,
  Lightbulb,
  ArrowsOut,
  FileXls,
} from '@phosphor-icons/react';
import fundingData from '../../data/fundingInnovations.json';

const EASE = [0.16, 1, 0.3, 1];

const ICON_MAP = {
  HandCoins,
  Flask,
  Certificate,
  RocketLaunch,
};

export default function FundingInnovationsExplorer() {
  const reduceMotion = useReducedMotion();
  const contentRef = useRef(null);

  const sections = fundingData.sections || [];
  const defaultSection = sections[0] || {};

  const [activeSectionId, setActiveSectionId] = useState(defaultSection.id || 'research-grants');
  const [activeIcmrSubTab, setActiveIcmrSubTab] = useState('sts-list-2019-2025');
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Patents filters
  const [patentSearch, setPatentSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

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

    if (path.includes('icmr-research-proposals') || path.includes('research-grants')) {
      setActiveSectionId('research-grants');
    } else if (path.includes('icmr-funded')) {
      setActiveSectionId('icmr-funded-projects');
    } else if (path.includes('patent')) {
      setActiveSectionId('patents');
    } else if (path.includes('incubation') || path.includes('bmiil')) {
      setActiveSectionId('incubation-centre');
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

  // Filtered patents
  const patentsList = useMemo(() => {
    const rawList = activeSection.patents || [];
    return rawList.filter((p) => {
      const matchesSearch =
        patentSearch.trim() === '' ||
        p.title.toLowerCase().includes(patentSearch.toLowerCase()) ||
        p.name.toLowerCase().includes(patentSearch.toLowerCase()) ||
        p.patentNo.toLowerCase().includes(patentSearch.toLowerCase()) ||
        p.department.toLowerCase().includes(patentSearch.toLowerCase()) ||
        String(p.year).includes(patentSearch.trim());

      const matchesDept =
        selectedDept === 'All' || p.department.toLowerCase() === selectedDept.toLowerCase();

      const matchesYear =
        selectedYear === 'All' || String(p.year) === String(selectedYear);

      return matchesSearch && matchesDept && matchesYear;
    });
  }, [activeSection.patents, patentSearch, selectedDept, selectedYear]);

  // Unique departments & years for filter chips
  const departments = useMemo(() => {
    const rawList = activeSection.patents || [];
    const set = new Set();
    rawList.forEach((p) => {
      if (p.department) set.add(p.department.trim());
    });
    return ['All', ...Array.from(set).sort()];
  }, [activeSection.patents]);

  const years = useMemo(() => {
    const rawList = activeSection.patents || [];
    const set = new Set();
    rawList.forEach((p) => {
      if (p.year) set.add(String(p.year).trim());
    });
    return ['All', ...Array.from(set).sort().reverse()];
  }, [activeSection.patents]);

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans pb-24">
      {/* Header Breadcrumbs Strip */}
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap">
            <a href="/" className="hover:text-navy transition-colors font-medium">Home</a>
            <CaretRight size={12} className="text-slate-400" />
            <span className="text-slate-400">Funding & Innovation</span>
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
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors font-medium active:scale-[0.98]"
              title="Print page"
            >
              <Printer size={14} />
              <span>Print</span>
            </button> */}

            <a
              href="mailto:rdc@biu.edu.in"
              className="inline-flex items-center gap-1.5 bg-[#0c2340] hover:bg-[#163860] text-white font-semibold px-3 py-1 rounded-md shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span>Contact RDC Cell</span>
              <ArrowSquareOut size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Switcher Button */}
      <div className="lg:hidden mx-auto max-w-[1440px] px-4 sm:px-6 pt-4">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="w-full flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 shadow-sm text-left font-sans text-sm font-semibold text-slate-800"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#0c2340] text-white flex items-center justify-center font-bold">
              <List size={16} />
            </span>
            <div>
              <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Select Option
              </div>
              <div className="text-slate-900 font-bold">{activeSection.name}</div>
            </div>
          </div>
          <span className="text-xs text-[#0c2340] font-semibold bg-slate-100 px-2.5 py-1 rounded-md">
            Change
          </span>
        </button>
      </div>

      {/* Main 2-Column Content Layout */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* =========================================================
              LEFT SIDEBAR (Desktop: 4 Columns)
             ========================================================= */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-16 space-y-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <div className="px-3 py-2 border-b border-slate-100 mb-3 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Funding & Innovation
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#0c2340]">
                    Grants & Patents
                  </h3>
                </div>
                <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                  4 Options
                </span>
              </div>

              {/* Sidebar Navigation Items */}
              <nav className="space-y-1.5" aria-label="Funding and Innovations Options">
                {sections.map((item) => {
                  const IconComponent = ICON_MAP[item.icon] || HandCoins;
                  const isSelected = item.id === activeSectionId;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectSection(item.id, true)}
                      className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? 'bg-[#0c2340] text-white shadow-md'
                          : 'hover:bg-slate-50 text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-white/15 text-white'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-[#0c2340]/10 group-hover:text-[#0c2340]'
                          }`}
                        >
                          <IconComponent size={18} weight={isSelected ? 'fill' : 'regular'} />
                        </div>
                        <div>
                          <div className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                            {item.name}
                          </div>
                          <div className={`text-[11px] truncate max-w-[190px] ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.badge}
                          </div>
                        </div>
                      </div>

                      <CaretRight
                        size={16}
                        className={`transition-transform duration-200 ${
                          isSelected
                            ? 'text-white translate-x-1'
                            : 'text-slate-400 group-hover:translate-x-1 group-hover:text-slate-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>

              {/* Incubation Direct Link Promo */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href="http://bmiil.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-[#0c2340] border border-slate-200/70 transition-all text-xs font-semibold group"
                >
                  <div className="flex items-center gap-2">
                    <RocketLaunch size={16} className="text-[#0c2340]" weight="fill" />
                    <span>BMIIL Incubation Hub</span>
                  </div>
                  <ArrowSquareOut size={14} className="text-slate-400 group-hover:text-[#0c2340] group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Quick Contact & Info Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <ShieldCheck size={16} className="text-[#0c2340]" weight="fill" />
                <span>Research Oversight</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All ICMR proposals, student grants, clinical trials, and patent applications are monitored and facilitated by the Bareilly International University Research & Development Cell (RDC).
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0c2340]">
                <a href="/research" className="hover:underline flex items-center gap-1">
                  <span>Visit RDC Overview</span>
                  <ArrowRight size={12} />
                </a>
                <a href="mailto:rdc@biu.edu.in" className="hover:underline">
                  rdc@biu.edu.in
                </a>
              </div>
            </div>
          </aside>

          {/* =========================================================
              RIGHT MAIN CONTENT AREA (Desktop: 8 Columns)
             ========================================================= */}
          <main ref={contentRef} className="lg:col-span-8 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? false : { opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-7 shadow-sm space-y-6"
              >

                {/* ====================================================
                    OPTION 1: RESEARCH GRANTS (EMBEDDED PDF)
                   ==================================================== */}
                {activeSection.id === 'research-grants' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                          ICMR Research Proposals
                        </span>
                        <span>•</span>
                        <span className="text-slate-600">
                          Faculty & Institutional Grants
                        </span>
                      </div>

                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                        {activeSection.heading}
                      </h1>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {activeSection.description}
                      </p>
                    </div>

                    {/* Viewer Title Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c2340] text-white px-4 py-3 rounded-xl shadow-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <FilePdf size={20} weight="fill" className="text-white shrink-0" />
                        <span className="font-bold text-xs sm:text-sm truncate">
                          Final Submitted ICMR Research Proposals.pdf
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={activeSection.pdfUrl}
                          download="Final Submitted ICMR Research Proposals.pdf"
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
                    <div className="relative w-full h-[650px] sm:h-[850px] rounded-xl border border-slate-200/90 overflow-hidden bg-slate-100 shadow-inner">
                      <iframe
                        src={`${activeSection.pdfUrl}#toolbar=1&navpanes=0`}
                        title={activeSection.heading}
                        className="w-full h-full border-0"
                      />
                    </div>

                    {/* Fallback download helper */}
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
                      <span>
                        Document not displaying on your mobile or tablet browser?
                      </span>
                      <a
                        href={activeSection.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#0c2340] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Click here to open Research Proposals (PDF)</span>
                        <ArrowSquareOut size={13} />
                      </a>
                    </div>
                  </div>
                )}

                {/* ====================================================
                    OPTION 2: ICMR FUNDED PROJECTS (3 SUB-TABS + PDF)
                   ==================================================== */}
                {activeSection.id === 'icmr-funded-projects' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                          Indian Council of Medical Research
                        </span>
                        <span>•</span>
                        <span className="text-slate-600">
                          Short Term Studentship (STS)
                        </span>
                      </div>

                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                        {activeSection.heading}
                      </h1>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {activeSection.description}
                      </p>
                    </div>

                    {/* 3 Sub-menu / Sub-tab Options */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Select Project Document:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeSection.subTabs.map((tab) => {
                          const isSelected = activeIcmrSubTab === tab.id;

                          return (
                            <button
                              key={tab.id}
                              onClick={() => setActiveIcmrSubTab(tab.id)}
                              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                                isSelected
                                  ? 'bg-[#0c2340] text-white shadow-md'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                              }`}
                            >
                              {tab.tabLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Inbuilt PDF Viewer for the selected ICMR subtab */}
                    {(() => {
                      const currentTab =
                        activeSection.subTabs.find((t) => t.id === activeIcmrSubTab) ||
                        activeSection.subTabs[0];

                      return (
                        <div className="space-y-4 pt-2">
                          {/* Viewer Title Bar */}
                          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0c2340] text-white px-4 py-3 rounded-xl shadow-sm">
                            <div className="flex items-center gap-2 min-w-0">
                              <FilePdf size={20} weight="fill" className="text-white shrink-0" />
                              <span className="font-bold text-xs sm:text-sm truncate">
                                {currentTab.title} — {currentTab.badge}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <a
                                href={currentTab.pdfUrl}
                                download
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-medium transition-colors"
                                title="Download PDF"
                              >
                                <DownloadSimple size={14} />
                                <span className="hidden sm:inline">Download</span>
                              </a>
                              <a
                                href={currentTab.pdfUrl}
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
                          <div className="relative w-full h-[650px] sm:h-[850px] rounded-xl border border-slate-200/90 overflow-hidden bg-slate-100 shadow-inner">
                            <iframe
                              src={`${currentTab.pdfUrl}#toolbar=1&navpanes=0`}
                              title={currentTab.title}
                              className="w-full h-full border-0"
                            />
                          </div>

                          {/* Fallback download helper */}
                          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
                            <span>
                              Document not displaying on your device?
                            </span>
                            <a
                              href={currentTab.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-bold text-[#0c2340] hover:underline inline-flex items-center gap-1"
                            >
                              <span>Click here to open {currentTab.title} (PDF)</span>
                              <ArrowSquareOut size={13} />
                            </a>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* ====================================================
                    OPTION 3: PATENTS (TABLE WITH PDF HYPERLINKS)
                   ==================================================== */}
                {activeSection.id === 'patents' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                          Intellectual Property Rights
                        </span>
                        <span>•</span>
                        <span className="text-slate-600">
                          {patentsList.length} of {activeSection.totalCount} Patents Displayed
                        </span>
                      </div>

                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                        {activeSection.heading}
                      </h1>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {activeSection.description}
                      </p>

                      {/* Download Detailed Patents List Button */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <a
                          href={activeSection.downloadUrl}
                          download
                          className="inline-flex items-center gap-2 bg-[#0c2340] hover:bg-[#163860] text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-[0.98]"
                        >
                          <FileXls size={18} weight="fill" />
                          <span>Download Detailed Patents List</span>
                          <ArrowRight size={14} />
                        </a>

                        <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/80">
                          Official Excel Register • Up to Date 2026
                        </div>
                      </div>
                    </div>

                    {/* Search & Filter Controls */}
                    <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/80 space-y-3">
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        {/* Search Input */}
                        <div className="relative flex-1">
                          <MagnifyingGlass
                            size={16}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                          />
                          <input
                            type="text"
                            value={patentSearch}
                            onChange={(e) => setPatentSearch(e.target.value)}
                            placeholder="Search by patent no, title, inventor name, department..."
                            className="w-full pl-10 pr-9 py-2 bg-white rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0c2340]/20 focus:border-[#0c2340] transition-all"
                          />
                          {patentSearch && (
                            <button
                              onClick={() => setPatentSearch('')}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                              <X size={14} />
                            </button>
                          )}
                        </div>

                        {/* Department Filter */}
                        <div className="flex items-center gap-2 shrink-0">
                          <label className="text-xs font-semibold text-slate-600">Dept:</label>
                          <select
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                            className="bg-white border border-slate-200 text-xs font-medium text-slate-800 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#0c2340]"
                          >
                            {departments.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Year Filter */}
                        <div className="flex items-center gap-2 shrink-0">
                          <label className="text-xs font-semibold text-slate-600">Year:</label>
                          <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="bg-white border border-slate-200 text-xs font-medium text-slate-800 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#0c2340]"
                          >
                            {years.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Patents Table */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-[#0c2340] text-white">
                            <th className="py-3 px-3.5 font-bold w-12 text-center border-b border-slate-200">
                              Sl. No
                            </th>
                            <th className="py-3 px-3.5 font-bold min-w-[140px] border-b border-slate-200">
                              Patent/Design No.
                            </th>
                            <th className="py-3 px-3.5 font-bold min-w-[160px] border-b border-slate-200">
                              Name
                            </th>
                            <th className="py-3 px-3.5 font-bold min-w-[110px] border-b border-slate-200">
                              Department
                            </th>
                            <th className="py-3 px-3.5 font-bold min-w-[260px] border-b border-slate-200">
                              Title
                            </th>
                            <th className="py-3 px-3.5 font-bold min-w-[100px] text-center border-b border-slate-200">
                              Published / Awarded Year
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {patentsList.length > 0 ? (
                            patentsList.map((patent, idx) => (
                              <tr
                                key={patent.slNo || idx}
                                className="hover:bg-slate-50/80 transition-colors group"
                              >
                                <td className="py-3 px-3.5 text-center font-mono font-medium text-slate-500">
                                  {patent.slNo}
                                </td>
                                <td className="py-3 px-3.5 font-mono font-bold whitespace-nowrap">
                                  {patent.pdfUrl ? (
                                    <a
                                      href={patent.pdfUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[#0c2340] hover:text-[#163860] hover:underline font-semibold"
                                      title={`View official document for ${patent.patentNo}`}
                                    >
                                      <span>{patent.patentNo}</span>
                                      <ArrowSquareOut size={13} className="opacity-70 group-hover:opacity-100 shrink-0" />
                                    </a>
                                  ) : (
                                    <span className="text-slate-800">{patent.patentNo}</span>
                                  )}
                                </td>
                                <td className="py-3 px-3.5 text-slate-800 font-medium">
                                  {patent.name}
                                </td>
                                <td className="py-3 px-3.5">
                                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80">
                                    {patent.department}
                                  </span>
                                </td>
                                <td className="py-3 px-3.5 text-slate-700 font-normal leading-relaxed">
                                  {patent.title}
                                </td>
                                <td className="py-3 px-3.5 text-center font-mono font-semibold text-slate-700">
                                  <span className="inline-block px-2 py-0.5 bg-slate-50 rounded text-xs border border-slate-200">
                                    {patent.year}
                                  </span>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="py-12 text-center text-slate-500">
                                <FilePdf size={36} className="mx-auto text-slate-300 mb-2" />
                                <div className="font-semibold text-slate-700">No patents match your criteria</div>
                                <div className="text-xs text-slate-400 mt-1">Try resetting your search query or department filter</div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 pt-2">
                      <span>Clicking any Patent/Design No. opens the official filed / awarded document PDF in a new tab.</span>
                      <span className="font-mono">Total {activeSection.totalCount} Filed / Granted Patents</span>
                    </div>
                  </div>
                )}

                {/* ====================================================
                    OPTION 4: INCUBATION CENTRE (BMIIL.COM REDIRECT)
                   ==================================================== */}
                {activeSection.id === 'incubation-centre' && (
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                          Innovation & Entrepreneurship Hub
                        </span>
                        <span>•</span>
                        <span className="text-slate-600">
                          BMIIL Portal
                        </span>
                      </div>

                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                        {activeSection.heading}
                      </h1>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {activeSection.description}
                      </p>
                    </div>

                    {/* Featured Incubation Card with direct Link to bmiil.com */}
                    <div className="rounded-2xl border-2 border-[#0c2340]/20 bg-gradient-to-br from-[#0c2340] to-[#163860] p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
                      <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />

                      <div className="relative z-10 space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-xs font-semibold text-white">
                          <RocketLaunch size={14} weight="fill" className="text-white" />
                          <span>Official Incubation Centre</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                          Bareilly Medtech & Innovation Incubation Lab (BMIIL)
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                          Explore our full incubation programs, portfolio healthcare startups, incubation application forms, prototyping facilities, and mentorship network on the dedicated BMIIL portal.
                        </p>

                        <div className="pt-2">
                          <a
                            href={activeSection.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 bg-white text-[#0c2340] hover:bg-slate-100 font-bold px-6 py-3 rounded-xl text-sm shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span>Visit Official BMIIL Portal (bmiil.com)</span>
                            <ArrowSquareOut size={16} weight="bold" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Stats Matrix */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {activeSection.stats.map((st, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-center"
                        >
                          <div className="text-xl sm:text-2xl font-bold font-serif text-[#0c2340]">
                            {st.value}
                          </div>
                          <div className="text-xs text-slate-600 mt-1 font-medium">
                            {st.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Highlights Grid */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-base font-bold text-slate-900">
                        Incubation Offerings & Infrastructure
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeSection.highlights.map((hl, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-slate-200/80 bg-white hover:border-[#0c2340]/40 transition-colors shadow-sm space-y-1.5"
                          >
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                              <CheckCircle size={16} weight="fill" className="text-[#0c2340] shrink-0" />
                              <span>{hl.title}</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {hl.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact & Campus Location */}
                    <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{activeSection.contact.lab}</div>
                        <div className="text-slate-600 mt-0.5">{activeSection.contact.address}</div>
                        <div className="text-slate-500 mt-0.5">Email: {activeSection.contact.email}</div>
                      </div>

                      <a
                        href={activeSection.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-[#0c2340] hover:underline"
                      >
                        <span>Open bmiil.com</span>
                        <ArrowSquareOut size={14} />
                      </a>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </main>

        </div>
      </div>

      {/* =========================================================
          MOBILE DRAWER MODAL
         ========================================================= */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Bottom Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-3xl overflow-y-auto p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-lg text-slate-900">
                    Funding & Innovation Options
                  </span>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-2 pt-2">
                {sections.map((item) => {
                  const IconComponent = ICON_MAP[item.icon] || HandCoins;
                  const isSelected = item.id === activeSectionId;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectSection(item.id, true)}
                      className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#0c2340] text-white'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-700 shadow-sm'
                          }`}
                        >
                          <IconComponent size={16} weight={isSelected ? 'fill' : 'regular'} />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{item.name}</div>
                          <div className={`text-xs ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.badge}
                          </div>
                        </div>
                      </div>

                      <CaretRight size={16} className={isSelected ? 'text-white' : 'text-slate-400'} />
                    </button>
                  );
                })}

                <div className="pt-3 border-t border-slate-100">
                  <a
                    href="http://bmiil.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-[#0c2340]"
                  >
                    <span>Visit Incubation Hub (bmiil.com)</span>
                    <ArrowSquareOut size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}