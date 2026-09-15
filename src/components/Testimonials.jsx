import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star } from '@phosphor-icons/react';
import testData from '../data/testimonials.json';
import Img from './Img';

const EASE = [0.16, 1, 0.3, 1];
const AUTOPLAY_MS = 4500;

function Stars({ count = 5, className = '' }) {
  return (
    <div className={`flex gap-1 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} weight="fill" className="text-gold" />
      ))}
    </div>
  );
}

function MediaCard() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] bg-forest-dark">
      <Img
        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
        alt="BIU Campus & Academic Highlights"
        className="h-full w-full object-cover"
      />
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* Live Badge */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 backdrop-blur-md">
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-sans text-[12px] font-medium tracking-wide text-white">
          BIU Campus &amp; Academic Highlights
        </span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [[index, direction], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const reviews = testData.reviews || [];

  const goTo = useCallback(
    (next) => {
      if (!reviews.length) return;
      setState(([prev]) => [((next % reviews.length) + reviews.length) % reviews.length, next > prev ? 1 : -1]);
    },
    [reviews.length]
  );

  useEffect(() => {
    if (paused || !reviews.length) return undefined;
    const id = setInterval(() => {
      setState(([prev]) => [(prev + 1) % reviews.length, 1]);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, index, reviews.length]);

  const review = reviews[index] || {};

  const variants = {
    enter: (dir) => (reduceMotion ? { opacity: 0 } : { y: dir > 0 ? 24 : -24, opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit: (dir) => (reduceMotion ? { opacity: 0 } : { y: dir > 0 ? -24 : 24, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="relative w-full overflow-hidden bg-[#0c2340] py-24 md:py-32">
      {/* Faint hexagon texture */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
        <defs>
          <pattern id="hexPattern" width="56" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M28 2 L52 15 V39 L28 52 L4 39 V15 Z"
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" />
      </svg>

      <div
        className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold">
            {testData.badge || 'Testimonials'}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-medium leading-[1.08] text-white sm:text-5xl md:text-[3.5rem]">
            {testData.titleLine1 || 'What Our Clients'}
            <br />
            {testData.titleLine2 || 'Are Saying'}
          </h2>
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur-sm">
            <Stars />
            <span className="font-sans text-[13px] font-light text-white/85">
              {testData.googleRating || '4.8 on Google Reviews'}
            </span>
          </div>
        </motion.div>

        {/* Body */}
        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Quote carousel */}
          <div className="relative min-h-[240px] border-l border-gold/40 pl-6 sm:pl-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: EASE }}
              >
                <Stars className="mb-5" />
                <p className="font-serif text-xl italic leading-relaxed text-white/90 sm:text-2xl">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="font-serif text-lg text-white">{review.name}</p>
                  <p className="mt-1 font-sans text-[12px] uppercase tracking-[0.14em] text-gold">
                    {review.meta}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>

            {/* Dots */}
            <div className="mt-10 flex items-center gap-2.5">
              {reviews.map((r, i) => (
                <button
                  key={r.name || i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show testimonial from ${r.name}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-premium ${i === index ? 'w-7 bg-gold' : 'w-4 bg-white/25 hover:bg-white/40'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Video */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <MediaCard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
