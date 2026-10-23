import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  BookOpen, 
  Bank,
  Buildings, 
  UsersThree, 
  FirstAidKit, 
  ArrowRight 
} from '@phosphor-icons/react';
import whyChooseUsData from '../data/whyChooseUs.json';

const EASE = [0.16, 1, 0.3, 1];

const ICON_MAP = {
  BookOpen,
  Bank,
  Buildings: Bank,
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


      <div className="relative z-10 mx-auto max-w-[1430px] px-5 sm:px-8 lg:px-12">
        {/* Mobile Header (< lg): Introduces section cleanly on mobile before cards */}
        <div className="block lg:hidden mb-6 text-left">
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-8 h-[3.5px] bg-gold rounded-full" />
            <span className="font-sans text-[12px] font-black uppercase tracking-[0.20em] text-[#0c2340]">
              {whyChooseUsData.badge || 'WHY CHOOSE BIU'}
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="font-times text-2xl sm:text-3xl font-medium tracking-[0.01em] text-[#0c2340] leading-[1.14] mb-3">
            {whyChooseUsData.titleMain}{' '}
            <span className="text-[#1b3570]">{whyChooseUsData.titleHighlight}</span>
          </h2>

          {/* Subtitle / Paragraph */}
          <p className="font-sans text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            {whyChooseUsData.description}
          </p>
        </div>

        {/* Main 2-Column Grid: Left Column starts at heading level, capturing full vertical space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Featured Initiative Card (5 cols) - Aligned with main heading */}
          <div 
            className="lg:col-span-5 xl:col-span-5 flex flex-col lg:pt-[35px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Unified Card Container: 3/4 Aspect Ratio on Laptop */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/4] lg:aspect-[10/9] rounded-2xl overflow-hidden shadow-[0_4px_22px_-2px_rgba(12,35,64,0.12),0_2px_6px_rgba(12,35,64,0.06)] bg-slate-100 group">
              {/* Full Card Background Image Carousel with Fast Smooth Crossfade */}
              <AnimatePresence>
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentInitiative.image}
                    alt={currentInitiative.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Glassmorphism Gradient Blue Overlay Panel at Bottom (Compact) */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#041122]/95 via-[#081e3a]/80 via-[#0c2340]/40 to-transparent backdrop-blur-sm px-4.5 py-3.5 sm:px-5 sm:py-4 pt-6 sm:pt-4 z-10">
                <div className="flex items-center justify-between gap-3">
                  <div className="max-w-[80%] sm:max-w-xs">
                    {/* Tag + Gold Accent Line */}
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-sans text-[10px] sm:text-[10.5px] font-black uppercase tracking-[0.16em] text-amber-200">
                        {currentInitiative.tag}
                      </span>
                      <span className="w-7 h-[2px] bg-amber-200 rounded-full" />
                    </div>

                    {/* Initiative Title */}
                    <h3 className="font-times text-base sm:text-lg lg:text-[1.3rem] font-normal text-white leading-snug mb-1 drop-shadow-xs">
                      {currentInitiative.title}
                    </h3>

                    {/* Initiative Description */}
                    <p className="font-sans text-[11px] sm:text-[12px] text-slate-200/90 font-normal leading-relaxed line-clamp-1 sm:line-clamp-2">
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
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-[#0c2340] hover:text-[#0c2340] flex items-center justify-center shadow-md shrink-0 transition-all duration-300 hover:scale-110 hover:bg-gold-light active:scale-95 group-hover:shadow-lg cursor-pointer"
                  >
                    <ArrowRight size={17} weight="bold" className="transition-colors duration-200" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Section Header at Top + 2x2 Feature Grid Below (7 cols) */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between h-full">
            {/* Desktop Section Header (visible on lg:) */}
            <div className="hidden lg:block text-left mb-6 lg:mb-7">
              {/* Eyebrow Tag */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                <span className="font-sans text-[12px] sm:text-[12px] font-black uppercase tracking-[0.20em] text-[#0c2340]">
                  {whyChooseUsData.badge || 'WHY CHOOSE BIU'}
                </span>
              </div>

              {/* Main Heading */}
              <motion.h2
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="font-times text-2xl sm:text-3xl md:text-4xl lg:text-[2.45rem] tracking-[0.01em] font-medium drop-shadow-xs text-[#0c2340] leading-[1.14] mb-3.5"
              >
                {whyChooseUsData.titleMain}{' '}
                <span className="text-[#1b3570]">
                  {whyChooseUsData.titleHighlight}
                </span>
              </motion.h2>

              {/* Subtitle / Paragraph */}
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                className="font-sans text-xs sm:text-sm md:text-[14px] text-slate-600 font-normal leading-relaxed max-w-2xl"
              >
                {whyChooseUsData.description}
              </motion.p>
            </div>

            {/* 2x2 Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5 lg:gap-5 flex-1">
            {features.map((feature) => {
              const IconComponent = ICON_MAP[feature.icon] || BookOpen;
              return (
                <motion.div
                  key={feature.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="bg-white rounded-2xl p-5 sm:p-5.5 lg:py-4 lg:px-3.5 border border-slate-200/80 shadow-[0_4px_22px_-2px_rgba(12,35,64,0.09),0_2px_6px_rgba(12,35,64,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:shadow-[0_12px_30px_-4px_rgba(12,35,64,0.14),0_4px_10px_rgba(12,35,64,0.06)] hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 sm:gap-3.5 group h-full justify-between"
                >
                  {/* Circular Golden Border Icon Container (Matching About section) */}
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-gold shadow-xs flex items-center justify-center shrink-0 text-[#0c2340] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md mt-0.5">
                    <IconComponent
                      size={27}
                      weight="regular"
                      className="[&_path]:stroke-current [&_path]:stroke-[0.8px] [&_path]:[stroke-linejoin:round]"
                    />
                  </div>

                  {/* Feature Content */}
                  <div className="flex flex-col justify-between flex-1 min-w-0 h-full">
                    <div>
                      {/* Feature Title - Matching About section */}
                      <h3 className="font-sans text-sm sm:text-[15px] font-bold text-[#0c2340] leading-snug mb-1">
                        {feature.title}
                      </h3>

                      {/* Feature Description - Matching About section */}
                      <p className="font-sans text-xs sm:text-[12.5px] text-slate-500 font-normal leading-relaxed mb-2 line-clamp-3">
                        {feature.description}
                      </p>
                    </div>

                    {/* Explore Link */}
                    <a
                      href={feature.link}
                      className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-[14px] font-bold text-[#0c2340]/80 hover:text-cyan-800 transition-colors group/link mt-auto"
                    >
                      <span>Explore</span>
                      <ArrowRight
                        size={14}
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
      </div>
    </div>
  </section>
  );
}
