import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, NewspaperClipping, CaretRight, CaretLeft } from '@phosphor-icons/react';
import Img from './Img';
import journalData from '../data/news.json';

const EASE = [0.16, 1, 0.3, 1];

const FALLBACK = (idx) =>
  `https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80`;

const truncateExcerpt = (text, maxLength = 52) => {
  if (!text) return '';
  const clean = text.replace(/\.{2,}$/, '').trim();
  if (clean.length <= maxLength) return clean;
  const truncated = clean.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  const wordSafe = lastSpace > 20 ? truncated.slice(0, lastSpace) : truncated;
  return wordSafe.trim() + '...';
};

export default function NewsEvents() {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const posts = journalData.posts || [];

  const updatePagination = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 5) {
        setTotalPages(1);
        setCurrentPage(0);
        return;
      }
      const calculatedPages = Math.max(1, Math.ceil(scrollWidth / clientWidth));
      setTotalPages(calculatedPages);
      const activeIdx = Math.min(
        calculatedPages - 1,
        Math.round(scrollLeft / (clientWidth * 0.95))
      );
      setCurrentPage(Math.max(0, activeIdx));
    }
  };

  useEffect(() => {
    updatePagination();
    window.addEventListener('resize', updatePagination);
    return () => window.removeEventListener('resize', updatePagination);
  }, [posts]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 5) {
        setCurrentPage(0);
        return;
      }
      const activeIdx = Math.round(scrollLeft / clientWidth);
      setCurrentPage(Math.min(totalPages - 1, Math.max(0, activeIdx)));
    }
  };

  const scrollToPage = (pageIndex) => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: pageIndex * clientWidth,
        behavior: 'smooth',
      });
      setCurrentPage(pageIndex);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const nextPage =
        direction === 'left'
          ? Math.max(0, currentPage - 1)
          : Math.min(totalPages - 1, currentPage + 1);
      scrollToPage(nextPage);
    }
  };

  return (
    <section id="news" className="relative w-full overflow-hidden bg-[#fbfbfd] py-16 sm:py-20 md:py-22 font-sans">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6"
        >
          {/* Title and Eyebrow */}
          <div className="flex flex-col items-start text-left">
            {/* Eyebrow Tag */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-8 h-[3.5px] bg-gold rounded-full" />
              <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                {journalData.badge || 'CAMPUS UPDATES'}
              </span>
            </div>

            <h2 className="font-times text-3xl sm:text-4xl lg:text-[2.45rem] font-medium text-[#0c2340] leading-[1.12]">
              {journalData.title || 'BIU Highlights'}
            </h2>
          </div>

          {/* View All Button on opposite end matching Navbar button style */}
          <div className="flex items-center">
            <a
              href="/news"
              className="group inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-6 py-2.5 font-sans text-xs font-semibold text-white shadow-xs brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-125 hover:-translate-y-0.5 active:scale-[0.98] shrink-0"
            >
              <NewspaperClipping size={18} weight="fill" className="text-blue-100 transition-transform duration-200 group-hover:scale-110" />
              <span>{journalData.viewAllLabel || 'View All News'}</span>
              <CaretRight size={14} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Carousel Container with Side Navigation Arrows */}
        <div className="relative group/carousel">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            disabled={currentPage === 0}
            className="absolute -left-4 sm:-left-7 lg:-left-12 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-0 outline-none bg-transparent text-[#0c2340] transition-all duration-200 hover:bg-white hover:shadow-xl hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <CaretLeft size={28} weight="bold" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            disabled={currentPage >= totalPages - 1}
            className="absolute -right-4 sm:-right-7 lg:-right-12 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-0 outline-none bg-transparent text-[#0c2340] transition-all duration-200 hover:bg-white hover:shadow-xl hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none cursor-pointer"
          >
            <CaretRight size={28} weight="bold" />
          </button>

          {/* Horizontal Scroll Roster Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 sm:gap-7 overflow-x-auto snap-x snap-proximity pb-9 pt-2 -my-1 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {posts.map((post, idx) => (
              <div
                key={post.id || idx}
                className="w-full sm:w-[calc(50%-14px)] lg:w-[calc(25%-21px)] shrink-0 snap-start flex"
              >
                <article
                  className="group relative flex w-full flex-col justify-between overflow-hidden rounded-lg bg-white border border-slate-200/80 shadow-xs hover:shadow-[0_20px_40px_-12px_rgba(12,35,64,0.16),0_8px_16px_-4px_rgba(12,35,64,0.06),0_0_0_1px_rgba(12,35,64,0.04)] hover:border-slate-300 transition-[box-shadow,border-color] duration-300 ease-out"
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
                    <div className="p-5 sm:p-6 text-left">
                      <h3 className="font-fraunces text-lg sm:text-[18.5px] font-medium leading-[1.28] text-[#0c2340] group-hover:text-gold-dark transition-colors duration-200 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2.5 font-sans text-xs sm:text-[13px] font-normal leading-relaxed text-slate-500">
                        <span>{truncateExcerpt(post.excerpt, 52)}</span>
                        <a
                          href="/news"
                          className="inline-flex items-center gap-1 font-sans text-xs font-bold text-gold-dark group-hover:text-[#0c2340]/90 ml-1.5 transition-colors duration-200 whitespace-nowrap"
                        >
                          <span className="hover:underline">Read More</span>
                          <ArrowRight size={12} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </a>
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Bubble Drop / Pagination Indicator Dots at the Bottom */}
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const isActive = currentPage === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToPage(idx)}
                  aria-label={`Go to slide page ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${isActive
                      ? 'h-2.5 w-7 bg-[#0c2340] shadow-xs'
                      : 'h-2.5 w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
