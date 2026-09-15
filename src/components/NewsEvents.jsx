import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Newspaper } from '@phosphor-icons/react';
import Img from './Img';
import journalData from '../data/news.json';

const EASE = [0.16, 1, 0.3, 1];

const fallback = (seed) => `https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80`;

export default function NewsEvents() {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const rise = {
    hidden: reduceMotion ? {} : { y: 28, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };

  const posts = (journalData.posts || []).slice(0, 3);

  useEffect(() => {
    if (isInteracting || !posts.length) return undefined;
    const timer = setInterval(() => {
      if (!scrollRef.current) return;
      const el = scrollRef.current;
      if (el.scrollWidth > el.clientWidth) {
        const next = (activeIndex + 1) % posts.length;
        const itemWidth = el.scrollWidth / posts.length;
        el.scrollTo({
          left: itemWidth * next,
          behavior: 'smooth',
        });
        setActiveIndex(next);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [activeIndex, isInteracting, posts.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    if (el.scrollWidth > el.clientWidth) {
      const idx = Math.round((el.scrollLeft / el.scrollWidth) * posts.length);
      setActiveIndex(idx);
    }
  };

  return (
    <section id="news" className="relative w-full overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/60 px-3.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark backdrop-blur-md">
              <Newspaper size={14} weight="bold" />
              {journalData.badge || 'Campus News & Announcements'}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-forest-dark sm:text-4xl md:text-5xl">
              {journalData.title || 'BIU Journal & Latest Events'}
            </h2>
            <p className="mt-3 font-sans text-[15px] font-light leading-relaxed text-forest/70">
              {journalData.subtitle}
            </p>
          </div>

          <a
            href="/news"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-forest-dark/20 bg-forest-dark px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-500 ease-premium hover:border-gold hover:bg-gold hover:text-forest-dark active:scale-[0.98]"
          >
            {journalData.ctaLabel || 'Read All News'}
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        <motion.div
          ref={scrollRef}
          onScroll={handleScroll}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 flex snap-x snap-mandatory overflow-x-auto gap-6 pb-4 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3"
        >
          {posts.map((post, idx) => (
            <motion.article
              key={post.title}
              variants={rise}
              className="group flex flex-col justify-between w-[85vw] max-w-[340px] flex-shrink-0 snap-center rounded-2xl border border-gold/20 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl sm:w-auto sm:flex-shrink shadow-sm"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden rounded-xl bg-forest/20">
                  <Img
                    src={post.image || post.img}
                    alt={post.title}
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.src !== fallback(idx)) e.currentTarget.src = fallback(idx);
                    }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-forest-dark/80 px-3 py-1 backdrop-blur-md text-[10px] font-sans font-semibold uppercase tracking-wider text-gold">
                    {post.category || 'Announcement'}
                  </div>
                </div>

                <div className="mt-4">
                  <span className="font-sans text-[11px] font-medium text-forest/60">{post.date}</span>
                  <h3 className="mt-1 font-serif text-lg font-medium text-forest-dark transition-colors duration-300 group-hover:text-gold-dark line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 font-sans text-xs font-light leading-relaxed text-forest/75 line-clamp-3">
                    {post.excerpt || post.snippet}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-forest/10 pt-3">
                <a
                  href="/news"
                  className="inline-flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-gold-dark group-hover:text-forest-dark transition-colors"
                >
                  Read Full Update <ArrowRight size={12} weight="bold" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
