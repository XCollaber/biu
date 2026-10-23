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
  CaretDown
} from '@phosphor-icons/react';
import disclosureData from '../../data/disclosure.json';

export default function PublicDisclosureExplorer() {
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
            const inContactName = item.contact?.name?.toLowerCase().includes(q);
            const inContactEmail = item.contact?.email?.toLowerCase().includes(q);
            const inContactPhone = item.contact?.phone?.toLowerCase().includes(q);
            const inCategoryTitle = cat.title.toLowerCase().includes(q);
            const inShortTitle = cat.shortTitle?.toLowerCase().includes(q);
            return (
              inSubtitle ||
              inDetails ||
              inLink ||
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

  const totalResultsCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <section className="w-full py-8 sm:py-12 font-sans bg-[#fbfbfd]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        {/* Toolbar: Search, Custom Section Dropdown, Items Count & Print */}
        <div className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-xs mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input - Replicated from News Page */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative flex items-center flex-1 max-w-xl"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search disclosures (e.g., Act, RTI, Finance, Fees, Ombudsperson)..."
                className="w-full rounded-lg border border-slate-300/80 bg-white/70 backdrop-blur-xs pl-3.5 pr-24 py-2 font-sans text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus-visible:outline-none focus:border-slate-400 focus:bg-white focus:ring-1 focus:ring-slate-300/60 transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-20 top-1/2 -translate-y-1/2 text-slate-500 hover:text-rose-600 p-2 cursor-pointer"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 rounded-md bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-3.5 font-sans text-[11px] font-bold uppercase tracking-wider text-white brightness-125 transition-all duration-200 hover:brightness-140 hover:shadow-sm active:scale-[0.98] cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Right Hand Side: Custom Dropdown, Count, Print */}
            <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto">
              {/* Custom Category Dropdown */}
              <div className="relative w-48 sm:w-52" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-full inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50/70 hover:bg-slate-100/70 text-xs font-semibold text-[#0c2340] shadow-2xs transition-all duration-150 cursor-pointer"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Funnel size={15} className="text-slate-600/70 shrink-0" weight="bold" />
                    <span className="truncate">
                      {selectedCategory === 'all'
                        ? 'All Sections (10)'
                        : `${categories.find((c) => c.id === selectedCategory)?.number}. ${
                            categories.find((c) => c.id === selectedCategory)?.shortTitle
                          }`}
                    </span>
                  </div>
                  <CaretDown
                    size={12}
                    weight="bold"
                    className={`text-slate-500 transition-transform duration-200 shrink-0 ${
                      isDropdownOpen ? 'rotate-180 text-[#0c2340]' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu Panel - Exact same width as button */}
                {isDropdownOpen && (
                  <div
                    role="listbox"
                    className="absolute left-0 right-0 top-full mt-1 w-full max-h-80 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-lg z-30 font-sans"
                  >
                    <button
                      type="button"
                      role="option"
                      aria-selected={selectedCategory === 'all'}
                      onClick={() => {
                        setSelectedCategory('all');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        selectedCategory === 'all'
                          ? 'bg-blue-50/80 text-[#0c2340] font-bold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium'
                      }`}
                    >
                      <span className="truncate pr-1">All Sections (10)</span>
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
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
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

              {/* Results Count */}
              <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-2 rounded-lg border border-slate-200 tabular-nums">
                {totalResultsCount} items
              </span>

              {/* Print Action */}
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                title="Print Public Disclosure Table"
              >
                <Printer size={15} weight="bold" />
                <span>Print Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Statutory Downloads Strip - Directly on page background */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-gold rounded-full" />
              <h2 className="text-xs font-bold uppercase tracking-[0.11em] text-[#0c2340]">
                Quick Statutory Downloads
              </h2>
            </div>
            <span className="text-[12px] text-slate-500 font-medium">
              Official PDFs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
            {quickDownloads.map((doc, idx) => (
              <a
                key={idx}
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-cyan-700/40 hover:shadow-xs transition-all duration-150 min-w-0"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-105 transition-transform">
                    <FilePdf size={26} weight="fill" />
                  </div>
                  <span className="text-[12.5px] font-semibold text-[#0c2340] group-hover:text-cyan-800 truncate leading-tight">
                    {doc.title}
                  </span>
                </div>
                <DownloadSimple size={17} weight="bold" className="text-slate-400 group-hover:text-cyan-800 transition-colors shrink-0 ml-1" />
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
          <div className="rounded-xl bg-white border border-slate-300 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-slate-300 text-xs sm:text-[13px]">
                {/* 4 Standard Statutory Columns */}
                <thead>
                  <tr className="bg-[#0c2340] text-white font-bold border-b border-slate-300">
                    <th className="py-3 px-3 sm:px-4 w-16 sm:w-20 text-center uppercase tracking-wider text-xs border-r border-slate-600/60">
                      Sr. No.
                    </th>
                    <th className="py-3 px-4 sm:px-5 w-48 sm:w-60 uppercase tracking-wider text-xs border-r border-slate-600/60">
                      Title
                    </th>
                    <th className="py-3 px-4 sm:px-5 uppercase tracking-wider text-xs border-r border-slate-600/60 min-w-[300px]">
                      Subtitle
                    </th>
                    <th className="py-3 px-4 sm:px-5 w-72 sm:w-80 uppercase tracking-wider text-xs">
                      Links on Website
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {filteredCategories.map((cat) => {
                    const rowCount = cat.items.length;
                    if (rowCount === 0) return null;

                    return cat.items.map((item, idx) => {
                      const isFirst = idx === 0;
                      const isLast = idx === rowCount - 1;

                      return (
                        <tr
                          key={`${cat.id}-${idx}`}
                          className={`hover:bg-blue-50/20 transition-colors ${
                            isLast ? 'border-b-2 border-slate-300' : 'border-b border-slate-200'
                          }`}
                        >
                          {/* 1. Sr. No. (Rowspanned across all items in section) */}
                          {isFirst && (
                            <td
                              rowSpan={rowCount}
                              className="py-3 px-3 sm:px-4 text-center font-bold text-slate-700 align-top bg-white border-r border-slate-300 tabular-nums text-xs sm:text-sm pt-4"
                            >
                              {cat.number}
                            </td>
                          )}

                          {/* 2. Title (Rowspanned across all items in section) */}
                          {isFirst && (
                            <td
                              rowSpan={rowCount}
                              className="py-3 px-4 sm:px-5 font-bold text-[#0c2340] align-top bg-white border-r border-slate-300 text-xs sm:text-sm leading-snug pt-4"
                            >
                              <span>{cat.shortTitle || cat.title}</span>
                            </td>
                          )}

                          {/* 3. Subtitle */}
                          <td className="py-3 px-4 sm:px-5 align-top border-r border-slate-200">
                            <span className="font-semibold text-slate-800 leading-snug block">
                              {item.subtitle}
                            </span>
                            {item.details && (
                              <span className="text-[11px] text-slate-500 leading-normal block mt-0.5 font-normal">
                                {item.details}
                              </span>
                            )}
                          </td>

                          {/* 4. Links on Website */}
                          <td className="py-3 px-4 sm:px-5 align-top">
                            {/* Contact Person Details */}
                            {item.contact ? (
                              <div className="space-y-1 text-xs text-slate-800 font-sans">
                                {item.contact.name && (
                                  <div className="font-bold text-[#0c2340]">
                                    Name: {item.contact.name}
                                  </div>
                                )}
                                {item.contact.email && (
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-slate-500">Email:</span>
                                    <a
                                      href={`mailto:${item.contact.email}`}
                                      className="text-blue-600 hover:text-blue-800 hover:underline break-all font-medium"
                                    >
                                      {item.contact.email}
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => handleCopy(item.contact.email, `email-${cat.id}-${idx}`)}
                                      className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
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
                                    <span className="text-slate-500">Mobile:</span>
                                    <a
                                      href={`tel:${item.contact.phone}`}
                                      className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                    >
                                      {item.contact.phone}
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => handleCopy(item.contact.phone, `phone-${cat.id}-${idx}`)}
                                      className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer"
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
                              /* Clickable Link (URL or PDF) matching screenshot style */
                              <a
                                href={item.link}
                                target={item.link.startsWith('http') || item.type === 'pdf' ? '_blank' : undefined}
                                rel={item.link.startsWith('http') || item.type === 'pdf' ? 'noopener noreferrer' : undefined}
                                className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-start gap-1.5 break-all text-xs font-medium leading-snug group"
                              >
                                {item.type === 'pdf' || item.link.toLowerCase().endsWith('.pdf') ? (
                                  <FilePdf size={14} weight="fill" className="text-red-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                ) : (
                                  <ArrowSquareOut size={13} className="text-blue-500 shrink-0 mt-0.5" />
                                )}
                                <span>{item.link}</span>
                              </a>
                            ) : item.type === 'na' || item.status === 'NA' ? (
                              <span className="text-slate-500 text-xs font-medium">NA</span>
                            ) : (
                              <span className="text-amber-700/70 text-xs italic">
                                {item.status || 'In Preparation / Under Process'}
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
        )}

        {/* Footer Regulatory Compliance Notice */}
        <div className="mt-8 rounded-xl bg-[#0c2340] text-white p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-white/10 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold/20 border border-gold/40 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} weight="fill" />
            </div>
            <div>
              <h3 className="font-times text-base font-normal text-white">
                Statutory University Compliance & Information Disclosure
              </h3>
              <p className="font-sans text-xs text-slate-300/90 leading-relaxed mt-0.5 max-w-2xl">
                Bareilly International University is recognized under Section 2(f) of the UGC Act, 1956, and accredited with NAAC A+ Grade. All disclosure records are systematically updated and audited in alignment with Higher Education Institution (HEI) regulations.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gold text-[#0c2340] text-xs font-bold hover:bg-gold-light transition-all shadow-2xs"
            >
              <span>Contact Compliance Cell</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
