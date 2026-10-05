import { useState, useMemo, useRef } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CaretLeft,
  CaretRight,
  MagnifyingGlass,
  NewspaperClipping,
  X,
  Tag,
  PhoneCall,
  GraduationCap
} from '@phosphor-icons/react';
import journalData from '../../data/news.json';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Img from '../Img';

const EASE = [0.16, 1, 0.3, 1];
const ITEMS_PER_PAGE = 6;

const FALLBACK = (idx) =>
  `https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80`;

const truncateExcerpt = (text, maxLength = 62) => {
  if (!text) return '';
  const clean = text.replace(/\.{2,}$/, '').trim();
  if (clean.length <= maxLength) return clean;
  const truncated = clean.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const wordSafe = lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated;
  return wordSafe.trim() + '...';
};

export default function NewsEventsPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const allPosts = journalData.posts || [];
  const gridTopRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeArticle, setActiveArticle] = useState(null);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return allPosts;
    return allPosts.filter((post) => {
      return (
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query)
      );
    });
  }, [allPosts, searchQuery]);

  // Recent posts for sidebar (first 5 posts)
  const recentPosts = useMemo(() => {
    return allPosts.slice(0, 5);
  }, [allPosts]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedPosts = useMemo(() => {
    const startIdx = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredPosts.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  }, [filteredPosts, validCurrentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (gridTopRef.current) {
      gridTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-gold selection:text-[#0c2340]">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-28 pb-10 sm:pt-32 sm:pb-14 font-sans">
        {/* Subtle Background Pattern - Matching Navbar Double-Line Diamond Lattice */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden="true">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="news-heritage-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                {/* Outer Diamond Grid */}
                <path d="M 24 0 L 48 24 L 24 48 L 0 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.65" />
                {/* Inner Concentric Diamond */}
                <path d="M 24 9 L 39 24 L 24 39 L 9 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.60" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#news-heritage-lattice)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          {/* Breadcrumb / Back button */}
          <div className="mb-5 sm:mb-6">
            <a
              href="/"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
              className="group inline-flex items-center gap-2 rounded-md border border-slate-300/80 bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#0c2340]/90 hover:via-[#102d52]/90 hover:to-[#163860]/70 hover:text-white hover:brightness-125 hover:shadow-md active:scale-[0.98]"
            >
              <ArrowLeft size={14} weight="bold" className="transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-8 h-[3.5px] bg-gold rounded-full" />
              <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                CAMPUS UPDATES
              </span>
            </div>
            <h1 className="font-times -mb-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-medium text-[#0c2340] leading-[1.12]">
              Latest Events & Updates
            </h1>
            {/* <p className="mt-2.5 font-sans text-sm sm:text-[15px] font-normal leading-relaxed text-slate-600 max-w-3xl">
              Explore recent academic achievements, medical breakthroughs, clinical workshops, sports meets, and community outreach initiatives across Bareilly International University.
            </p> */}
          </div>
        </div>
      </section>

      {/* Main Content Section - 3 Cards per row on Left + Sidebar on Right */}
      <section ref={gridTopRef} className="relative z-10 w-full py-10 sm:py-14 md:pb-16 md:pt-5 font-sans">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10 items-start">
            {/* Left Content Column (3 Cards Grid + Pagination) */}
            <div className="flex-1 w-full min-w-0">
              {/* Results Counter */}
              <div className="mb-5 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>
                  Showing {filteredPosts.length > 0 ? (validCurrentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–
                  {Math.min(validCurrentPage * ITEMS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} updates
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-cyan-900 font-bold hover:underline cursor-pointer"
                  >
                    Clear search filter
                  </button>
                )}
              </div>

              {/* News Card Grid - 3 Cards per row */}
              {paginatedPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-6.5">
                  {paginatedPosts.map((post, idx) => (
                    <div
                      key={post.id || idx}
                      className="flex flex-col"
                    >
                      <div
                        onClick={() => setActiveArticle(post)}
                        className="group relative flex w-full flex-1 flex-col justify-between overflow-hidden rounded-lg bg-white border border-slate-200/80 shadow-xs hover:shadow-[0_20px_40px_-12px_rgba(12,35,64,0.16),0_8px_16px_-4px_rgba(12,35,64,0.06),0_0_0_1px_rgba(12,35,64,0.04)] hover:border-slate-200 transition-[box-shadow,border-color] duration-300 ease-out cursor-pointer text-left"
                      >
                        <div>
                          {/* Top Featured Image */}
                          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                            <Img
                              src={post.img || post.image}
                              alt={post.title}
                              loading="lazy"
                              onError={(e) => {
                                const fb = FALLBACK(idx);
                                if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                              }}
                              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                            />
                            {/* Upload Date Badge on Bottom Right of Image */}
                            {post.date && (
                              <span className="absolute bottom-2 right-2 bg-[#0c2340]/45 text-white backdrop-blur-sm font-sans text-[11px] font-medium tracking-wide px-3 py-0.5 rounded-md shadow-md border border-white/20 pointer-events-none">
                                {post.date}
                              </span>
                            )}
                          </div>

                          {/* Card Content Body */}
                          <div className="p-5 sm:p-5.5 text-left">
                            {post.category && (
                              <span className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                                {post.category}
                              </span>
                            )}
                            <h3 className="font-fraunces text-[17.5px] sm:text-[18px] font-medium leading-[1.28] text-[#0c2340] group-hover:text-gold-dark transition-colors duration-200 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="mt-2.5 font-sans text-xs sm:text-[13px] font-normal leading-relaxed text-slate-500">
                              <span>{truncateExcerpt(post.excerpt || post.snippet || post.content, 62)}</span>
                              <span className="inline-flex items-center gap-1 font-sans text-xs font-bold text-gold-dark group-hover:text-[#0c2340]/90 ml-1.5 transition-colors duration-200 whitespace-nowrap">
                                <span className="group-hover:underline">Read More</span>
                                <ArrowRight size={12} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-xs">
                  <NewspaperClipping size={40} weight="light" className="mx-auto text-slate-400 mb-3" />
                  <h3 className="font-sans text-base font-bold text-slate-800">No events found</h3>
                  <p className="font-sans text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    No matching events found for &quot;{searchQuery}&quot;. Try adjusting your search query.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-4 rounded-md bg-[#0c2340] px-4 py-2 font-sans text-xs font-semibold text-white shadow-xs hover:bg-[#102d52] transition-colors cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* Numerical Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 pt-6">
                  <button
                    type="button"
                    onClick={() => handlePageChange(Math.max(1, validCurrentPage - 1))}
                    disabled={validCurrentPage === 1}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2 font-sans text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                  >
                    <CaretLeft size={14} weight="bold" />
                    <span>Previous</span>
                  </button>

                  {/* Page Number Buttons */}
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = validCurrentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => handlePageChange(pageNum)}
                          className={`h-9 w-9 rounded-md font-sans text-xs font-bold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#0c2340] text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePageChange(Math.min(totalPages, validCurrentPage + 1))}
                    disabled={validCurrentPage >= totalPages}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-4 py-2 font-sans text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                  >
                    <span>Next</span>
                    <CaretRight size={14} weight="bold" />
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar Column - Search & Recent Posts (Matching Old Website Reference) */}
            <aside className="w-full lg:w-[310px] xl:w-[330px] shrink-0 space-y-6 lg:sticky lg:top-28">
              {/* Search Widget */}
              <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs">
                <div className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search news & events..."
                    className="w-full rounded-l-md border border-r-0 border-slate-300 bg-white px-3.5 py-2.5 font-sans text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#0c2340] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handlePageChange(1)}
                    className="rounded-r-md border border-[#0c2340] bg-[#0c2340] px-4 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#102d52] cursor-pointer shrink-0"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* Recent Posts Widget - Exact Match with Reference Image */}
              <div className="rounded-xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
                <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                  <h3 className="font-times text-lg font-semibold text-[#0c2340]">
                    Recent Posts
                  </h3>
                  <span className="w-6 h-0.5 bg-gold rounded-full" />
                </div>

                <div className="flex flex-col divide-y divide-slate-100">
                  {recentPosts.map((rPost, rIdx) => (
                    <div
                      key={rPost.id || rIdx}
                      onClick={() => setActiveArticle(rPost)}
                      className="group flex items-start gap-2.5 py-3.5 first:pt-0 last:pb-0 cursor-pointer"
                    >
                      <span className="text-slate-400 group-hover:text-cyan-900 transition-colors mt-0.5 shrink-0 text-sm font-light">
                        ◇
                      </span>
                      <div className="flex flex-col">
                        <h4 className="font-sans text-[12.5px] font-medium leading-snug text-slate-700 transition-colors group-hover:text-cyan-900 line-clamp-3">
                          {rPost.title}
                        </h4>
                        {rPost.date && (
                          <span className="text-[11px] text-slate-400 font-normal mt-1">
                            {rPost.date}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* University Admissions Contact Card */}
              <div className="rounded-xl border border-slate-200/90 bg-gradient-to-b from-[#eef4ff]/60 via-white to-white p-5 shadow-xs text-left">
                <div className="flex items-center gap-2 text-cyan-900 mb-2">
                  <GraduationCap size={20} weight="fill" />
                  <h4 className="font-sans text-xs font-bold uppercase tracking-wider">
                    Admissions 2026–27
                  </h4>
                </div>
                <p className="font-sans text-xs text-slate-600 leading-relaxed mb-3.5">
                  Direct counseling & registration is open for medical, dental, pharmacy, nursing & allied programmes.
                </p>
                <a
                  href="https://enquiry.biuerp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full rounded-md bg-[#0c2340] py-2 font-sans text-xs font-bold text-white shadow-xs hover:bg-[#102d52] transition-colors"
                >
                  <span>Admission Enquiry Portal</span>
                  <ArrowRight size={12} weight="bold" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Article Detail Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0c2340]/60 backdrop-blur-sm"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-xl bg-white shadow-2xl border border-slate-200 text-left font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-3.5 right-3.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X size={16} weight="bold" />
              </button>

              {/* Modal Featured Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Img
                  src={activeArticle.img || activeArticle.image}
                  alt={activeArticle.title}
                  className="h-full w-full object-cover"
                />
                {activeArticle.date && (
                  <span className="absolute bottom-3 left-3 bg-[#0c2340]/70 text-white backdrop-blur-sm font-sans text-xs font-medium px-3 py-1 rounded-md shadow-md border border-white/20">
                    {activeArticle.date}
                  </span>
                )}
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                {activeArticle.category && (
                  <span className="inline-flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-wider text-cyan-900 bg-cyan-50 px-2.5 py-1 rounded-md mb-3 border border-cyan-200/50">
                    <Tag size={12} weight="bold" />
                    {activeArticle.category}
                  </span>
                )}

                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#0c2340] leading-snug">
                  {activeArticle.title}
                </h2>

                <div className="mt-5 border-t border-slate-100 pt-5 font-sans text-sm sm:text-base leading-relaxed text-slate-700 space-y-4 font-normal">
                  <p>{activeArticle.content || activeArticle.excerpt}</p>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(null)}
                    className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-4 py-2 font-sans text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    <span>Close Window</span>
                  </button>

                  <a
                    href="https://page.biu.edu.in/latest-events/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-cyan-900 hover:underline"
                  >
                    <span>View on Official University Portal</span>
                    <ArrowRight size={13} weight="bold" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
