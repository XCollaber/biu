import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  BookOpen, 
  Buildings, 
  UsersThree, 
  FirstAidKit, 
  ArrowRight 
} from '@phosphor-icons/react';
import whyChooseUsData from '../data/whyChooseUs.json';

const EASE = [0.16, 1, 0.3, 1];

const ICON_MAP = {
  BookOpen,
  Buildings,
  UsersThree,
  FirstAidKit,
};

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const initiatives = whyChooseUsData.initiatives || [];
  const features = whyChooseUsData.features || [];

  // Auto-advance carousel every 5s unless paused by user interaction
  useEffect(() => {
    if (isPaused || initiatives.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % initiatives.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, initiatives.length]);

  const currentInitiative = initiatives[activeSlide] || initiatives[0];

  return (
    <section 
      id="why-choose-us" 
      className="relative w-full bg-gradient-to-b from-[#fafbfc] via-white to-[#fafbfc] overflow-hidden py-12 sm:py-14 lg:py-15 font-sans border-b border-slate-100"
    >
      {/* Top-Right Campus Watermark */}
      <div className="pointer-events-none absolute top-0 right-0 w-[380px] sm:w-[500px] lg:w-[980px] h-[300px] sm:h-[360px] overflow-hidden select-none z-0">
        <img
          src="/biu-building.png"
          alt=""
          aria-hidden="true"
          className="absolute -top-6 -right-8 w-full h-full object-contain object-right-top opacity-[0.18] filter contrast-125 brightness-95"
        />

        {/* Delicate bird silhouettes */}
        <svg 
          className="absolute top-10 right-56 w-10 h-6 text-blue-400/35 opacity-70" 
          viewBox="0 0 50 30" 
          fill="currentColor"
        >
          <path d="M10,15 Q15,5 25,12 Q35,5 40,15 Q30,10 25,15 Z" />
          <path d="M30,22 Q34,14 42,19 Q50,14 54,22 Q46,18 42,22 Q38,18 30,22 Z" transform="scale(0.6) translate(10, -5)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl text-left mb-8 sm:mb-9">
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-8 h-[3px] bg-[#F5C518] rounded-full" />
            <span className="font-sans text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
              {whyChooseUsData.badge || 'WHY CHOOSE US'}
            </span>
          </div>

          {/* Main Serif Heading */}
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-[#0c2340] leading-[1.16] tracking-tight mb-3"
          >
            {whyChooseUsData.titleMain}{' '}
            <span className="text-[#1b3570]">
              {whyChooseUsData.titleHighlight}
            </span>
          </motion.h2>

          {/* Subtitle / Paragraph */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="font-sans text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-2xl"
          >
            {whyChooseUsData.description}
          </motion.p>
        </div>

        {/* Content Layout: Left Featured Initiative (5 cols) + Right 2x2 Feature Grid (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Featured Initiative Card + Carousel Dots */}
          <div 
            className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Card Container */}
            <div className="relative w-full h-[340px] sm:h-[370px] lg:h-[390px] rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-[#07162c] group">
              {/* Background Slide Image with Fade Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentInitiative.image}
                    alt={currentInitiative.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Frosted Dark Glass Bottom Overlay Panel */}
              <div className="absolute inset-x-0 bottom-0 bg-[#1c1206]/85 backdrop-blur-md border-t border-white/10 p-4 sm:p-5 z-10">
                <div className="flex items-center justify-between gap-3">
                  <div className="max-w-[78%] sm:max-w-xs">
                    {/* Tag + Gold Accent Line */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-sans text-[10.5px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-white/95">
                        {currentInitiative.tag}
                      </span>
                      <span className="w-8 h-[2.5px] bg-[#F5C518] rounded-full" />
                    </div>

                    {/* Initiative Title */}
                    <h3 className="font-serif text-lg sm:text-xl lg:text-[1.3rem] font-bold text-white leading-tight mb-1">
                      {currentInitiative.title}
                    </h3>

                    {/* Initiative Description */}
                    <p className="font-sans text-xs sm:text-[12.5px] text-slate-200/90 font-normal leading-relaxed line-clamp-2">
                      {currentInitiative.description}
                    </p>
                  </div>

                  {/* Circular Interactive Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveSlide((prev) => (prev + 1) % initiatives.length);
                    }}
                    aria-label={`Next initiative (currently: ${currentInitiative.title})`}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#0c2340] flex items-center justify-center shadow-md shrink-0 transition-all duration-300 hover:scale-110 hover:bg-[#F5C518] active:scale-95 group-hover:shadow-lg cursor-pointer"
                  >
                    <ArrowRight size={18} weight="bold" className="text-[#0c2340]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Carousel Pagination Dots */}
            <div className="flex items-center justify-center gap-2 mt-3.5">
              {initiatives.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === idx
                      ? 'w-6 bg-[#0c2340]'
                      : 'w-2 bg-blue-100 hover:bg-blue-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: 2x2 Features Grid (7 cols, equal height parallel alignment) */}
          <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 grid-rows-2 gap-4 h-full lg:h-[390px]">
            {features.map((feature) => {
              const IconComponent = ICON_MAP[feature.icon] || BookOpen;
              return (
                <motion.div
                  key={feature.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="bg-white rounded-2xl p-4.5 sm:p-5 border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3.5 group h-full justify-between"
                >
                  {/* Rounded Soft Gold Icon Container */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FEF9E7] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:bg-[#fef08a]/60 mt-0.5">
                    <IconComponent size={21} weight="fill" className="text-[#0c2340]" />
                  </div>

                  {/* Feature Content */}
                  <div className="flex flex-col justify-between flex-1 min-w-0 h-full">
                    <div>
                      {/* Feature Title */}
                      <h3 className="font-serif text-[16px] sm:text-[17.5px] font-bold text-[#0c2340] mb-1 leading-snug">
                        {feature.title}
                      </h3>

                      {/* Feature Description */}
                      <p className="font-sans text-xs sm:text-[13px] text-slate-600 font-normal leading-relaxed mb-2.5 line-clamp-3">
                        {feature.description}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <a
                      href={feature.link}
                      className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-[12.5px] font-bold text-[#0c2340] hover:text-[#1b3570] transition-colors group/link mt-auto"
                    >
                      <span>Read More</span>
                      <ArrowRight
                        size={12}
                        weight="bold"
                        className="transition-transform duration-200 group-hover/link:translate-x-1"
                      />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Center: Explore More CTA Button */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <motion.a
            href={whyChooseUsData.ctaLink || '#programs'}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full border border-[#8c6d3b]/50 text-[#694e22] bg-white hover:bg-[#694e22] hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-wider shadow-xs hover:shadow-md cursor-pointer group"
          >
            <span>{whyChooseUsData.ctaText || 'EXPLORE MORE'}</span>
            <ArrowRight 
              size={13} 
              weight="bold" 
              className="transition-transform duration-200 group-hover:translate-x-1" 
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
