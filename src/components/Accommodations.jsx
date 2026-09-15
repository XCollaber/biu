import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check } from '@phosphor-icons/react';
import Img from './Img';
import roomData from '../data/hostels.json';

const EASE = [0.16, 1, 0.3, 1];

const fallback = (seed) => `https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80`;

const AUTOPLAY_MS = 4500;

export default function Accommodations() {
  const reduceMotion = useReducedMotion();
  const [[index, direction], setState] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const accData = {
    badge: roomData.badge || 'Student Housing',
    title: roomData.title || 'Hostels & Residential Life',
    slides: (roomData.accommodationsPage?.list || []).map((item, idx) => ({
      name: item.name,
      count: item.category,
      label: item.capacity,
      desc: item.desc,
      seed: item.id || idx,
      img: idx === 0 
        ? 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80'
        : 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
      features: [
        '24/7 Air Conditioning & High-Speed Wi-Fi',
        'Biometric Access & 24/7 CCTV Security',
        'Nutritious Multi-Cuisine Mess Hall',
        'Quiet Study Lounges & Housekeeping'
      ]
    }))
  };

  const slides = accData.slides || [];

  const goTo = useCallback(
    (next) => {
      if (!slides.length) return;
      setState(([prev]) => [((next % slides.length) + slides.length) % slides.length, next > prev ? 1 : -1]);
    },
    [slides.length]
  );

  useEffect(() => {
    if (paused || !slides.length) return undefined;
    const id = setInterval(() => {
      setState(([prev]) => [(prev + 1) % slides.length, 1]);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, index, slides.length]);

  const slide = slides[index] || slides[0] || {};

  const variants = {
    enter: (dir) => (reduceMotion ? { opacity: 0 } : { x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => (reduceMotion ? { opacity: 0 } : { x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section id="stay" className="relative w-full bg-cream py-24 md:py-32">
      <div
        className="mx-auto max-w-[1400px] px-5 sm:px-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Section Header */}
        <div className="mb-12 text-center">
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold-dark">
            {accData.badge}
          </span>
          <h2 className="mt-2 font-serif text-3xl font-medium text-forest-dark sm:text-4xl">
            {accData.title}
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: EASE }}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Image */}
              <div className="overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-[0_30px_80px_-40px_rgba(20,57,43,0.4)]">
                <Img
                  src={slide.img}
                  alt={slide.name}
                  loading="lazy"
                  onError={(e) => {
                    const fb = fallback(slide.seed);
                    if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                  }}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              {/* Content */}
              <div>
                <h2 className="font-serif text-4xl font-medium text-forest-dark sm:text-5xl">
                  {slide.name}
                </h2>
                <p className="mt-3 font-sans text-base font-medium">
                  <span className="text-forest-dark">{slide.count}</span>{' '}
                  <span className="text-gold-dark">{slide.label}</span>
                </p>
                <p className="mt-5 max-w-lg font-sans text-base font-light leading-relaxed text-forest/70">
                  {slide.desc}
                </p>

                <ul className="mt-7 flex flex-col gap-3.5">
                  {(slide.features || []).map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                        <Check size={12} weight="bold" />
                      </span>
                      <span className="font-sans text-[15px] font-light text-forest/80">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {slides.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ${s.name}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-500 ease-premium ${i === index ? 'w-7 bg-forest' : 'w-2 bg-forest/25 hover:bg-forest/40'
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
