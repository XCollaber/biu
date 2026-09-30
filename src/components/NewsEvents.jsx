import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, NewspaperClipping, CaretRight } from '@phosphor-icons/react';
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

  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const posts = journalData.posts || [];

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

        {/* 4-Column News Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7"
        >
          {posts.map((post, idx) => (
            <motion.article
              key={post.id || idx}
              variants={fadeUp}
              className="group relative flex flex-col justify-between overflow-hidden rounded-lg bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-400/30 hover:-translate-y-1.5 transition-all duration-300"
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
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                  {/* Upload Date Badge on Bottom Right of Image */}
                  {post.date && (
                    <span className="absolute bottom-2 right-2 bg-[#0c2340]/45 text-white backdrop-blur-sm font-sans text-[11px] font-medium tracking-wide px-3 py-0.5 rounded-md shadow-md border border-white/20">
                      {post.date}
                    </span>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 text-left">
                  <h3 className="font-fraunces text-lg sm:text-[18.5px] font-medium leading-[1.28] text-[#0c2340] group-hover:text-gold-dark transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-xs sm:text-[13px] font-normal leading-relaxed text-slate-500">
                    <span>{truncateExcerpt(post.excerpt, 52)}</span>
                    <a
                      href="/news"
                      className="inline-flex items-center gap-1 font-sans text-xs font-bold text-gold-dark group-hover:text-[#0c2340]/90 ml-1.5 transition-colors whitespace-nowrap"
                    >
                      <span className="hover:underline">Read More</span>
                      <ArrowRight size={12} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
