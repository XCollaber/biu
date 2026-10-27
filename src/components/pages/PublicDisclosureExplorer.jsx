import { useState, useMemo, useRef, useEffect } from 'react';
import {
  MagnifyingGlass,
  FilePdf,
  ArrowSquareOut,
  Printer,
  ShieldCheck,
  DownloadSimple,
  X,
  PhoneCall,
  EnvelopeSimple,
  Check,
  Copy,
  Funnel,
  CaretDown,
  ArrowLeft
} from '@phosphor-icons/react';
import disclosureData from '../../data/disclosure.json';

export default function PublicDisclosureExplorer({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = disclosureData.categories || [];
  const quickDownloads = disclosureData.pageHeader?.quickDownloads || [];

  const handleCopy = (text, id) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter items based on active category and live search query
  const filteredCategories = useMemo(() => {
    let result = categories;

    if (selectedCategory !== 'all') {
      result = result.filter((cat) => cat.id === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result
        .map((cat) => {
          const matchingItems = cat.items.filter((item) => {
            const inSubtitle = item.subtitle?.toLowerCase().includes(q);
            const inDetails = item.details?.toLowerCase().includes(q);
            const inLink = item.link?.toLowerCase().includes(q);
            const inUrl = item.url?.toLowerCase().includes(q);
            const inContactName = item.contact?.name?.toLowerCase().includes(q);
            const inContactEmail = item.contact?.email?.toLowerCase().includes(q);
            const inContactPhone = item.contact?.phone?.toLowerCase().includes(q);
            const inCategoryTitle = cat.title.toLowerCase().includes(q);
            const inShortTitle = cat.shortTitle?.toLowerCase().includes(q);
            return (
              inSubtitle ||
              inDetails ||
              inLink ||
              inUrl ||
              inContactName ||
              inContactEmail ||
              inContactPhone ||
              inCategoryTitle ||
              inShortTitle
            );
          });

          return { ...cat, items: matchingItems };
        })
        .filter((cat) => cat.items.length > 0);
    }

    return result;
  }, [categories, selectedCategory, searchQuery]);

  const header = disclosureData.pageHeader || {};

  const handlePrint = () => {
    const previousTitle = document.title;
    // Set a clean filename without forbidden Windows characters (| \ / : * ? " < >)
    document.title = 'Bareilly International University - Public Self-Disclosure';

    const restoreTitle = () => {
      document.title = previousTitle;
      window.removeEventListener('afterprint', restoreTitle);
    };

    window.addEventListener('afterprint', restoreTitle);

    // Give browser a frame to update document.title before print dialog opens
    setTimeout(() => {
      window.print();
    }, 100);
  };

  return (
    <>
      {/* Scoped Dedicated Print Styles for High-Fidelity Table Export */}
      <style>{`
        @media print {
          @page {
            size: auto;
            margin: 10mm 8mm 12mm 8mm;
          }

          html, body {
            overflow: visible !important;
            overflow-x: visible !important;
            overflow-y: visible !important;
            height: auto !important;
            min-height: 0 !important;
            background: #ffffff !important;
            color: #0c2340 !important;
            font-size: 9.5pt !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          header,
          nav,
          footer,
          aside,
          button,
          .print-hidden,
          [data-print-hidden="true"] {
            display: none !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          a::after {
            content: none !important;
          }

          a {
            color: #0369a1 !important;
            text-decoration: underline !important;
          }

          #disclosure-printable-table,
          #disclosure-printable-table * {
            overflow: visible !important;
            max-height: none !important;
          }

          #disclosure-printable-table {
            box-shadow: none !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }

          table {
            width: 100% !important;
            border-collapse: collapse !important;
            table-layout: auto !important;
            margin: 0 !important;
          }

          thead {
            display: table-header-group !important;
          }

          thead, thead tr, thead th {
            background-color: #0c2340 !important;
            background-image: none !important;
            color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          tfoot {
            display: table-footer-group !important;
          }

          /* Important: Allow natural pagination flow across multi-row sections to prevent PDF layout deadlocks */
          tr {
            page-break-inside: auto !important;
            break-inside: auto !important;
          }

          td, th {
            page-break-inside: auto !important;
            break-inside: auto !important;
            padding: 6px 8px !important;
            vertical-align: top !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Column proportions to avoid horizontal overflow on A4/Letter */
          th:nth-child(1), td:nth-child(1) { width: 6% !important; min-width: 0 !important; }
          th:nth-child(2), td:nth-child(2) { width: 13% !important; min-width: 0 !important; }
          th:nth-child(3), td:nth-child(3) { width: 43% !important; min-width: 0 !important; }
          th:nth-child(4), td:nth-child(4) { width: 38% !important; min-width: 0 !important; }
        }
      `}</style>

      {/* TOP HERO HEADER - Replicating the News Page Signature Header with Integrated Controls */}
      <section className="relative bg-white border-b border-slate-200/80 pt-28 pb-10 sm:pt-32 sm:pb-14 font-sans z-20 print:hidden">
        {/* Subtle Background Pattern - Double-Line Diamond Lattice */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.035]" aria-hidden="true">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="disclosure-heritage-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 48 24 L 24 48 L 0 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.65" />
                <path d="M 24 9 L 39 24 L 24 39 L 9 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.60" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#disclosure-heritage-lattice)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          {/* Breadcrumb / Back button */}
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
              className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-md border border-slate-200/70 sm:border-slate-300/80 bg-white px-1.5 py-0.5 sm:px-3.5 sm:py-1.5 font-sans text-[11px] sm:text-xs font-medium sm:font-semibold text-slate-500 sm:text-slate-700 shadow-2xs transition-all duration-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#0c2340]/90 hover:via-[#102d52]/90 hover:to-[#163860]/70 hover:text-white hover:brightness-125 hover:shadow-md active:scale-[0.98]"
            >
              <ArrowLeft size={13} weight="bold" className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </a>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3.5 sm:gap-6">
            <div>
              <div className="hidden sm:flex items-center gap-2.5 mb-2.5">
                <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.09em] text-[#0c2340]">
                  {header.badge || 'MANDATORY STATUTORY DISCLOSURE'}
                </span>
              </div>
              <h1 className="font-times text-[22px] sm:text-3xl lg:text-[2.6rem] font-medium text-[#0c2340] leading-[1.15]">
                Self Public Disclosure
              </h1>
            </div>

            {/* Filter toolbar placed directly in the top section */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 w-full lg:w-auto">
              {/* Search Input - Flexible on mobile, fixed comfortable width on laptop */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="relative flex items-center flex-1 sm:flex-initial w-full sm:w-[380px] md:w-[410px] max-w-[435px] min-w-0"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search disclosures..."
                  className="w-full h-[35px] sm:h-10 rounded-lg border border-slate-300/80 bg-white pl-3 sm:pl-3.5 pr-8 sm:pr-24 font-sans text-xs sm:text-[13px] text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus-visible:outline-none focus:border-slate-400 focus:bg-white focus:ring-1 focus:ring-slate-300/60 transition-all shadow-2xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-8 sm:right-20 top-1/2 -translate-y-1/2 text-slate-500 hover:text-rose-600 p-1.5 sm:p-2 cursor-pointer"
                    title="Clear search"
                  >
                    <X size={14} className="sm:hidden" />
                    <X size={16} className="hidden sm:block" />
                  </button>
                )}
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-1 top-1 bottom-1 sm:right-1.5 sm:top-1.5 sm:bottom-1.5 rounded-md bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 w-7 sm:w-auto px-1.5 sm:px-3 font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white brightness-125 transition-all duration-200 hover:brightness-140 hover:shadow-sm active:scale-[0.98] cursor-pointer flex items-center justify-center shrink-0"
                >
                  <MagnifyingGlass size={13} weight="bold" className="sm:hidden" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </form>

              {/* Custom Dropdown & Print Button Group - Inline with Search on mobile */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                {/* Custom Category Dropdown */}
                <div className="relative shrink-0 sm:w-40" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className="h-[35px] sm:h-10 inline-flex items-center justify-between gap-1 sm:gap-2 px-2 sm:px-3.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs sm:text-[13px] font-semibold text-[#0c2340] shadow-2xs transition-all duration-150 cursor-pointer sm:w-full"
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="listbox"
                    title={selectedCategory === 'all' ? 'All Sections' : categories.find((c) => c.id === selectedCategory)?.shortTitle}
                  >
                    <div className="flex items-center gap-1 sm:gap-1.5 truncate">
                      <Funnel size={14} className="text-slate-600/70 shrink-0" weight="bold" />
                      <span className="sm:hidden text-xs font-semibold truncate max-w-[55px]">
                        {selectedCategory === 'all'
                          ? 'Sections'
                          : `Sec ${categories.find((c) => c.id === selectedCategory)?.number || ''}`}
                      </span>
                      <span className="hidden sm:inline truncate">
                        {selectedCategory === 'all'
                          ? 'All Sections'
                          : `${categories.find((c) => c.id === selectedCategory)?.number}. ${categories.find((c) => c.id === selectedCategory)?.shortTitle}`}
                      </span>
                    </div>
                    <CaretDown
                      size={11}
                      weight="bold"
                      className={`text-slate-500 transition-transform duration-200 shrink-0 ${isDropdownOpen ? 'rotate-180 text-[#0c2340]' : ''
                        }`}
                    />
                  </button>

                  {/* Dropdown Menu Panel - Compact snug width on mobile, full width on laptop */}
                  {isDropdownOpen && (
                    <div
                      role="listbox"
                      className="absolute right-0 sm:left-0 sm:right-0 top-full mt-1 w-[150px] sm:w-full max-w-[calc(100vw-24px)] max-h-80 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl z-50 font-sans"
                    >
                      <button
                        type="button"
                        role="option"
                        aria-selected={selectedCategory === 'all'}
                        onClick={() => {
                          setSelectedCategory('all');
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 sm:py-2 text-xs sm:text-[12.5px] flex items-center justify-between transition-colors cursor-pointer ${selectedCategory === 'all'
                          ? 'bg-blue-50/80 text-[#0c2340] font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                          }`}
                      >
                        <span className="truncate pr-1">All Sections</span>
                        {selectedCategory === 'all' && (
                          <Check size={14} weight="bold" className="text-[#0c2340] shrink-0" />
                        )}
                      </button>

                      {categories.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-1.5 sm:py-2 text-xs sm:text-[12px] flex items-center justify-between transition-colors cursor-pointer ${isSelected
                              ? 'bg-blue-50/80 text-[#0c2340] font-bold'
                              : 'text-slate-700 hover:bg-slate-50 hover:text-cyan-900 font-medium'
                              }`}
                          >
                            <span className="truncate pr-1">
                              {cat.number}. {cat.shortTitle}
                            </span>
                            {isSelected && (
                              <Check size={14} weight="bold" className="text-[#0c2340] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Print Action - Icon-only on mobile, full button on laptop */}
                <button
                  type="button"
                  onClick={handlePrint}
                  className="h-[35px] sm:h-10 inline-flex items-center justify-center gap-1.5 px-2.5 sm:px-3 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs sm:text-[13px] font-semibold shadow-2xs transition-colors cursor-pointer shrink-0"
                  title="Print Public Disclosure Table"
                  aria-label="Print Table"
                >
                  <Printer size={16} weight="bold" className="shrink-0" />
                  <span className="hidden sm:inline">Print Table</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Explorer Content Section */}
      <section className="w-full py-8 sm:py-10 font-sans bg-[#fbfbfd] print:bg-white print:py-0 print:m-0 print:w-full">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 print:max-w-none print:p-0 print:m-0 print:w-full">

          {/* Quick Statutory Downloads Strip - Directly on page background */}
          <div className="mb-6 print:hidden">
            <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 sm:w-6 h-[3px] bg-gold rounded-full -ml-2 sm:ml-0.5 " />
                <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.08em] text-[#0c2340]">
                  Quick Downloads
                </h2>
              </div>
              <span className="hidden sm:inline text-[12px] text-slate-500 font-medium">
                Official PDFs
              </span>
            </div>

            <div
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 no-scrollbar snap-x snap-mandatory sm:snap-none -mx-3.5 sm:mx-0"
            >
              {quickDownloads.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-2 px-2.5 py-2 sm:px-3 sm:py-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-cyan-700/40 hover:shadow-xs transition-all duration-150 w-[215px] sm:w-auto shrink-0 snap-start sm:shrink sm:snap-align-none"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-105 transition-transform">
                      <FilePdf size={22} weight="fill" className="sm:hidden" />
                      <FilePdf size={26} weight="fill" className="hidden sm:block" />
                    </div>
                    <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#0c2340] group-hover:text-cyan-800 truncate leading-tight">
                      {doc.title}
                    </span>
                  </div>
                  <DownloadSimple size={15} weight="bold" className="text-slate-400 group-hover:text-cyan-800 transition-colors shrink-0 ml-1" />
                </a>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredCategories.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center my-6 shadow-2xs">
              <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                <MagnifyingGlass size={22} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">
                No matching records found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
                We couldn't find any compliance record matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 font-sans text-xs font-semibold uppercase tracking-wider text-white brightness-125 transition-all duration-200 hover:brightness-140 hover:shadow-sm active:scale-[0.98] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* ============================================================== */
            /* THE CLEAN OFFICIAL STATUTORY TABLE                             */
            /* Exactly matching: Sr. No. | Title | Subtitle | Links on Website */
            /* ============================================================== */
            <>
              {/* Official Print-Only University Document Header */}
              <div className="hidden print:block mb-4 pb-3 border-b-2 border-[#0c2340]">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold font-times text-[#0c2340] tracking-wide">
                      Bareilly International University
                    </h1>
                    <p className="text-[11px] font-sans font-semibold uppercase tracking-wider text-slate-700">
                      Mandatory Public Self-Disclosure Portal — Statutory Compliance (UGC & NAAC)
                    </p>
                  </div>
                  <div className="text-right text-[10px] text-slate-500 font-sans">
                    <p className="font-semibold text-slate-700">Academic Session 2026–27</p>
                    <p>Official Website: www.biu.edu.in</p>
                  </div>
                </div>
              </div>

              <div
                id="disclosure-printable-table"
                className="-mx-3.5 sm:mx-0 rounded-lg sm:rounded-xl bg-white border border-slate-200/80 shadow-xs overflow-hidden print:m-0 print:p-0 print:border print:border-slate-300 print:shadow-none print:overflow-visible print:w-full"
              >
                <div className="overflow-x-auto print:overflow-visible print:w-full">
                  <table className="w-full text-left border-collapse text-xs sm:text-[13px] print:text-[10px] print:w-full">
                    {/* 4 Standard Statutory Columns - Styled with EducationStreams blue gradient ribbon */}
                    <thead
                      style={{
                        background: 'linear-gradient(to right, rgba(7, 22, 44, 0.9) 0%, rgba(12, 35, 64, 0.75) 50%, rgba(7, 22, 44, 0.5) 100%)'
                      }}
                      className="bg-gradient-to-r from-[#07162c]/90 via-[#0c2340]/75 to-[#07162c]/50 text-white"
                    >
                      <tr
                        style={{
                          background: 'linear-gradient(to right, rgba(7, 22, 44, 0.9) 0%, rgba(12, 35, 64, 0.75) 50%, rgba(7, 22, 44, 0.5) 100%)'
                        }}
                        className="bg-gradient-to-r from-[#07162c]/90 via-[#0c2340]/75 to-[#07162c]/50 text-white border-b border-slate-200/80"
                      >
                        <th className="py-3 px-2 sm:px-4 w-12 sm:w-20 text-center uppercase tracking-wider text-xs sm:text-[11.5px] font-semibold text-white border-r border-r-slate-200">
                          Sr. No.
                        </th>
                        <th className="py-3 px-2.5 sm:px-4 w-24 sm:w-40 uppercase tracking-wider text-xs font-semibold text-white border-r border-r-slate-200">
                          Title
                        </th>
                        <th className="py-3 px-3 sm:px-5 uppercase tracking-wider text-xs font-semibold text-white border-r border-r-slate-200 min-w-[220px] sm:min-w-[440px] print:min-w-0">
                          Subtitle
                        </th>
                        <th className="py-3 px-5 sm:px-5 w-64 sm:w-80 uppercase tracking-wider text-xs font-semibold text-white print:w-auto">
                          Links on Website
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredCategories.map((cat, catIdx) => {
                        const rowCount = cat.items.length;
                        if (rowCount === 0) return null;
                        const col1Bg = catIdx % 2 === 0 ? 'bg-slate-50/90' : 'bg-white';
                        const col2Bg = catIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/90';

                        return cat.items.map((item, idx) => {
                          const isFirst = idx === 0;
                          const isLast = idx === rowCount - 1;
                          const rawTarget = item.url || item.link;
                          const targetUrl = rawTarget && !rawTarget.startsWith('http') && !rawTarget.startsWith('mailto:') && !rawTarget.startsWith('tel:')
                            ? `https://www.biu.edu.in${rawTarget.startsWith('/') ? '' : '/'}${rawTarget}`
                            : rawTarget;
                          const isPdf = item.type === 'pdf' || (targetUrl && targetUrl.toLowerCase().endsWith('.pdf')) || (item.link && item.link.toLowerCase().endsWith('.pdf'));
                          const isExternal = targetUrl && (targetUrl.startsWith('http') || isPdf);

                          return (
                            <tr
                              key={`${cat.id}-${idx}`}
                              className={`transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/90'
                                } hover:bg-blue-50/90`}
                            >
                              {/* 1. Sr. No. (Rowspanned across all items in section) */}
                              {isFirst && (
                                <td
                                  rowSpan={rowCount}
                                  className={`py-3 px-2 sm:px-4 text-center font-bold text-slate-700 align-top ${col1Bg} transition-colors border-r border-r-slate-200 border-b-2 border-b-slate-400 tabular-nums text-xs sm:text-sm pt-4`}
                                >
                                  {cat.number}
                                </td>
                              )}

                              {/* 2. Title (Rowspanned across all items in section) */}
                              {isFirst && (
                                <td
                                  rowSpan={rowCount}
                                  className={`py-3 px-2.5 sm:px-4 font-bold text-[#0c2340] align-top ${col2Bg} transition-colors border-r border-r-slate-200 border-b-2 border-b-slate-400 text-xs sm:text-sm leading-snug pt-4`}
                                >
                                  <span>{cat.shortTitle || cat.title}</span>
                                </td>
                              )}

                              {/* 3. Subtitle */}
                              <td className={`py-3 px-3 sm:px-5 align-top border-r border-r-slate-200 ${isLast ? 'border-b-2 border-b-slate-400' : 'border-b border-b-slate-200'
                                }`}>
                                <span className="font-semibold font-sans text-[13px] text-slate-800 leading-snug block print:text-[8.5pt] print:font-medium">
                                  {item.subtitle}
                                </span>
                              </td>

                              {/* 4. Links on Website */}
                              <td className={`py-3 px-5 sm:px-5 align-top ${isLast ? 'border-b-2 border-b-slate-400' : 'border-b border-b-slate-200'
                                }`}>
                                {/* Contact Person Details */}
                                {item.contact ? (
                                  <div className="space-y-1 text-xs text-slate-800 font-sans print:text-[8.5pt]">
                                    {item.contact.name && (
                                      <div className="flex items-baseline gap-1.5">
                                        <span className="text-slate-500 shrink-0 font-semibold print:text-[8.5pt]">Name:</span>
                                        <span className="font-bold text-[#0c2340] print:text-[8.5pt]">{item.contact.name}</span>
                                      </div>
                                    )}
                                    {item.contact.email && (
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 print:text-[8.5pt]">Email:</span>
                                        <a
                                          href={`mailto:${item.contact.email}`}
                                          className="text-cyan-600 hover:text-cyan-800 hover:underline break-all font-medium truncate print:text-cyan-800 print:underline print:text-[8.5pt]"
                                        >
                                          {item.contact.email}
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() => handleCopy(item.contact.email, `email-${cat.id}-${idx}`)}
                                          className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer print:hidden"
                                          title="Copy email"
                                        >
                                          {copiedId === `email-${cat.id}-${idx}` ? (
                                            <Check size={11} className="text-emerald-600" />
                                          ) : (
                                            <Copy size={11} />
                                          )}
                                        </button>
                                      </div>
                                    )}
                                    {item.contact.phone && (
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 print:text-[8.5pt]">Mobile:</span>
                                        <a
                                          href={`tel:${item.contact.phone.replace(/[^0-9+]/g, '')}`}
                                          className="text-cyan-600 hover:text-cyan-800 hover:underline font-medium print:text-cyan-800 print:underline print:text-[8.5pt]"
                                        >
                                          {item.contact.phone}
                                        </a>
                                        <button
                                          type="button"
                                          onClick={() => handleCopy(item.contact.phone, `phone-${cat.id}-${idx}`)}
                                          className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer print:hidden"
                                          title="Copy phone"
                                        >
                                          {copiedId === `phone-${cat.id}-${idx}` ? (
                                            <Check size={11} className="text-emerald-600" />
                                          ) : (
                                            <Copy size={11} />
                                          )}
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ) : item.link ? (
                                  isPdf ? (
                                    /* Boxed PDF Document Link matching top Quick Statutory Downloads card style */
                                    <a
                                      href={targetUrl}
                                      target={isExternal ? '_blank' : undefined}
                                      rel={isExternal ? 'noopener noreferrer' : undefined}
                                      className="group inline-flex items-center justify-between -ml-2 gap-3 px-1.5 py-1.5 rounded-lg bg-white border border-slate-200/80 hover:border-cyan-800/30 hover:shadow-xs transition-all duration-150 max-w-full cursor-pointer print:border print:border-slate-300 print:bg-white print:inline-flex print:m-0 print:py-1 print:px-2"
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-7 h-7 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-105 transition-transform print:border-red-200">
                                          <FilePdf size={22} weight="fill" />
                                        </div>
                                        <span className="text-[12px] sm:text-[12.5px] font-semibold text-[#0c2340] group-hover:text-cyan-800 break-all leading-tight print:text-cyan-900 print:underline print:text-[8.5pt]">
                                          {item.link}
                                        </span>
                                      </div>
                                      <DownloadSimple size={14} weight="bold" className="text-slate-400 group-hover:text-cyan-800 transition-colors shrink-0 ml-1 print:text-slate-500" />
                                    </a>
                                  ) : (
                                    /* Regular Web Link */
                                    <a
                                      href={targetUrl}
                                      target={isExternal ? '_blank' : undefined}
                                      rel={isExternal ? 'noopener noreferrer' : undefined}
                                      className="text-cyan-600 hover:text-cyan-800 hover:underline inline-flex items-start gap-1.5 break-all text-[12px] sm:text-[13px] font-semibold leading-snug group print:text-cyan-800 print:underline print:text-[8.5pt]"
                                    >
                                      <ArrowSquareOut size={15} weight="bold" className="text-cyan-800 shrink-0 mt-0.5 print:inline-block" />
                                      <span>{item.link}</span>
                                    </a>
                                  )
                                ) : item.type === 'na' || item.status === 'NA' ? (
                                  <span className="text-slate-400/80 text-[11px] font-medium print:text-[8.5pt]">NA</span>
                                ) : (
                                  <span className="text-slate-400/80 text-[11px] leading-tight block print:text-[8.5pt]">
                                    Under Process
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Print-Only Footer Note */}
              <div className="hidden print:flex items-center justify-between mt-4 pt-2 border-t border-slate-300 text-[9px] text-slate-500 font-sans">
                <span>Bareilly International University (UGC Approved &bull; NAAC A+ Accredited)</span>
                <span>Mandatory Public Self-Disclosure &bull; Verify live at biu.edu.in/public-disclosure</span>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
