import { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkle, Calendar, Clock, BookOpen, X } from '@phosphor-icons/react';
import journalData from '../../data/news.json';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Img from '../Img';

const EASE = [0.16, 1, 0.3, 1];

export default function NewsEventsPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const cmsPage = journalData.blogPage || {};
  const posts = journalData.posts || [];

  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <div className="min-h-screen bg-cream text-forest-dark selection:bg-gold selection:text-forest-dark">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-forest-dark pt-28 pb-16 md:pt-32 md:pb-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="newsHexDark" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#newsHexDark)" />
          </svg>
        </div>

        <div className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onBack) onBack();
                else window.location.href = '/';
              }}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-gold/90 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:text-gold"
            >
              <ArrowLeft size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-1" />
              {cmsPage.backButtonLabel || 'Back to Home'}
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="max-w-3xl"
          >
            <span className="font-sans text-[10px] sm:text-[13px] font-semibold uppercase tracking-[0.3em] text-gold">
              {cmsPage.badge || 'Campus News & Events'}
            </span>

            <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
              BIU Journal & <span className="italic font-normal text-gold">University News</span>
            </h1>

            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/80 sm:mt-6 sm:text-base md:text-lg">
              {cmsPage.subtitle ||
                'Stay updated with campus research breakthroughs, national medical conferences, academic seminars, and cultural festivals at BIU.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* News & Events Grid */}
      <section className="relative z-10 bg-cream pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id || post.title}
                onClick={() => setActiveArticle(post)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-b from-[#0a231b] via-[#0E4533] to-[#0a231b] text-white shadow-xl transition-all duration-500 hover:border-gold/60 hover:shadow-2xl cursor-pointer"
              >
                <div>
                  <div className="relative h-56 sm:h-64 lg:h-56 xl:h-64 w-full overflow-hidden bg-forest/20">
                    <Img
                      src={post.image || post.img}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="relative z-10 p-5 sm:p-6">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold">{post.category || 'Announcement'}</span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl font-medium text-white transition-colors duration-300 group-hover:text-gold">{post.title}</h3>
                    <p className="mt-2 font-sans text-xs sm:text-sm font-light leading-relaxed text-cream/90">{post.excerpt || post.snippet}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-sans text-cream/70">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} className="text-gold" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-gold" />
                        {post.readTime || '3 min read'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8 text-forest-dark shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-forest/10 text-forest hover:bg-forest/20"
              >
                <X size={18} />
              </button>

              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-gold-dark">{activeArticle.category}</span>
              <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-semibold text-forest">{activeArticle.title}</h2>
              <div className="mt-2 text-xs text-forest/60">{activeArticle.date}</div>

              <div className="mt-6 font-sans text-sm font-light leading-relaxed text-forest/80 space-y-4">
                <p>{activeArticle.content || activeArticle.excerpt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
