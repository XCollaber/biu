import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import Img from './Img';
import { assetUrl } from '../utils/assetUrl';
import collegesData from '../data/colleges.json';

const EASE = [0.16, 1, 0.3, 1];

export default function Colleges() {
  const reduceMotion = useReducedMotion();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.5;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const colleges = collegesData.colleges || [];

  return (
    <section
      id="colleges"
      className="relative mx-auto w-full max-w-[1440px] h-[800px] overflow-hidden bg-white py-16 sm:py-20 md:py-24 font-[Plus_Jakarta_Sans,sans-serif]"
    >
      {/* Background Image: BIU Building Watermark */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <img
          src={assetUrl(collegesData.bgImage || '/biu-building.png')}
          alt="BIU Building Background"
          className="h-full w-full object-contain object-top opacity-[0.21] filter brightness-95 contrast-105 transform scale-x-[1.01] scale-y-[0.94] -translate-y-12"
        />
        {/* Soft Radial & 4-Edge Misty Fog Overlays to seamlessly blend borders into white */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(255,255,255,0.85)_75%,#ffffff_100%)]" />
        <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-36 bg-gradient-to-l from-white via-white/90 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-92 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1450px] px-4 sm:px-6 md:px-0 flex flex-col items-center">
        {/* Top Center BIU Logo Emblem */}
        <motion.div
          initial={reduceMotion ? false : { scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-4 mt-6 transform translate-y-6"
        >
          <div className="relative flex h-24 w-24 sm:h-48 sm:w-48 items-center">
            <Img
              src={collegesData.centerLogo || '/biu-logo.jpg.jpeg'}
              alt="Bareilly International University Emblem"
              className="h-full w-full object-contain rounded-full"
            />
          </div>
        </motion.div>

        {/* Section Main Headline */}
        <motion.h2
          initial={reduceMotion ? false : { y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="-mt-8 text-center font-times text-2xl sm:text-2xl md:text-3xl lg:text-[2.35rem] tracking-tight font-medium text-[#0c2340] leading-[1.12]"
        >
          {collegesData.title || 'BIU Colleges & Constituent Institutes'}
        </motion.h2>

        {/* Section Subtitle */}
        <motion.p
          initial={reduceMotion ? false : { y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mt-1 text-center font-sans text-sm sm:text-sm md:text-base font-semibold leading-relaxed text-gold-dark tracking-wide max-w-3xl"
        >
          {collegesData.subtitle || 'Explore our Academic Institutions'}
        </motion.p>

        {/* Colleges Horizontal Scroll Roster Container */}
        <div className="relative mt-8 sm:mt-9 w-full px-4 sm:px-0">
          {/* Scroll Navigation Buttons */}
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className="absolute left-0 top-[39%] z-20 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-0 outline-none bg-transparent text-[#0c2340] transition-all duration-200 hover:bg-white hover:shadow-xl hover:scale-110 active:scale-95 hidden sm:flex"
          >
            <CaretLeft size={24} weight="bold" />
          </button>

          <button
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className="absolute right-0 top-[39%] z-20 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-0 outline-none bg-transparent text-[#0c2340] transition-all duration-200 hover:bg-white hover:shadow-xl hover:scale-110 active:scale-95 hidden sm:flex"
          >
            <CaretRight size={24} weight="bold" />
          </button>

          {/* Horizontal Scroll Roster of Circular College Logos */}
          <div
            ref={scrollRef}
            className="flex w-full items-start justify-center gap-1.5 sm:gap-2.5 md:gap-3.5 overflow-x-auto py-4 px-2 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {colleges.map((college, idx) => (
              <motion.div
                key={college.id || idx}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="snap-center shrink-0 flex flex-col items-center w-28 sm:w-32 md:w-36 lg:w-40 group cursor-pointer text-center"
              >
                {/* Circular Logo Container */}
                <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36 items-center justify-center rounded-full bg-white p-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg overflow-hidden shrink-0">
                  <Img
                    src={college.logo}
                    alt={college.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* College Text OUTSIDE the Circular Container */}
                <h3 className="mt-3 font-sans text-xs sm:text-sm font-bold leading-tight text-slate-800 transition-colors group-hover:text-gold-dark text-center px-1">
                  {college.name}
                </h3>
                <p className="mt-1 font-sans text-[11px] font-semibold text-gold text-center">
                  {college.shortName || college.category}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
