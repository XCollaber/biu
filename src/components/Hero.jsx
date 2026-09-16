import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkle, CaretDown, WhatsappLogo, ArrowRight, GraduationCap, CaretRight } from '@phosphor-icons/react';
import heroData from '../data/hero.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);

  // Signal hero video is ready for sequential testimonial preloading
  const handleCanPlay = () => {
    if (!window.__HERO_VIDEO_READY__) {
      window.__HERO_VIDEO_READY__ = true;
      window.dispatchEvent(new CustomEvent('hero-video-ready'));
    }
  };

  // 1. IntersectionObserver to pause Hero Video when out of viewport
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => { });
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Staggered reveal orchestration for the hero stack
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };
  const rise = {
    hidden: reduceMotion ? {} : { y: 24, opacity: 0, filter: 'blur(4px)' },
    show: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: EASE },
    },
  };

  const whatsappUrl = `https://wa.me/${siteData.whatsappPhone || '917455002900'}`;

  return (
    <section id="home" className="relative w-full bg-white pt-24 sm:pt-28 lg:pt-28 pb-6 sm:pb-10 px-2 sm:px-4 lg:px-6">
      {/* Outer Container Card Frame */}
      <div className="relative mx-auto max-w-[1560px] w-full min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] bg-[#0c2340] shadow-2xl border border-slate-200/50">
        
        {/* Background video inside rounded frame */}
        <video
          ref={videoRef}
          src="/hero_video.mp4"
          className="absolute inset-0 h-full w-full object-cover rounded-[2rem] sm:rounded-[2.5rem]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          onPlaying={handleCanPlay}
        />

        {/* Cinematic gradient overlays with signature blue tint */}
        <div className="absolute inset-0 bg-[#0c2340]/45" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#061426]/92 via-[#0c2340]/70 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />

        {/* Hero Card Content Overlay */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex h-full min-h-[520px] sm:min-h-[580px] lg:min-h-[620px] flex-col justify-between p-6 sm:p-10 lg:p-14 text-left"
        >

          {/* Center Main Headline & Subtitle */}
          <div className="my-auto max-w-2xl lg:max-w-3xl pt-6 pb-12">
            <motion.h1
              variants={rise}
              className="font-serif leading-[1.08] tracking-tight text-white drop-shadow-md"
            >
              <span className="block text-[2.5rem] font-light text-white/95 sm:text-6xl lg:text-[4.2rem]">
                {heroData.headlineLine1 || 'Empowering Minds'}
              </span>
              <span className="block text-[2.8rem] font-medium text-white mt-1 sm:mt-2 sm:text-6xl lg:text-[4.5rem]">
                {heroData.headlineLine2 || 'Shaping Global Leaders'}
              </span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-xl font-sans text-base sm:text-lg lg:text-[20px] font-light leading-relaxed text-white/90 drop-shadow"
            >
              {heroData.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={rise} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                className="group flex h-12 sm:h-14 items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-gold-dark via-gold to-gold-light px-7 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-[0.14em] text-forest-dark shadow-xl transition-all duration-300 ease-premium hover:scale-105 hover:shadow-2xl active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <GraduationCap size={20} weight="fill" className="text-forest-dark shrink-0 transition-transform group-hover:scale-110" />
                <span>{heroData.ctaPrimaryLabel || 'Admissions 2026-27'}</span>
                <ArrowRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1 text-forest-dark" />
              </a>

              <a
                href="/faculties"
                className="group flex h-12 sm:h-14 items-center justify-center gap-2 rounded-lg border border-white/40 bg-white/10 backdrop-blur-md px-7 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-[0.14em] text-white transition-all duration-300 ease-premium hover:bg-white/20 hover:border-white hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>{heroData.ctaSecondaryLabel || 'Explore Faculties'}</span>
                <CaretRight size={14} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll cue icon inside card bottom */}
        <motion.a
          href="#about"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          aria-label="Scroll to next section"
          className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-white sm:hidden"
        >
          <CaretDown size={24} weight="thin" className="animate-scroll-bob" />
        </motion.a>
      </div>

      {/* Floating WhatsApp chat button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
        aria-label="Contact us on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-[#0c2340] shadow-xl ring-1 ring-inset ring-white/20 transition-all duration-500 ease-premium hover:bg-gold-light hover:shadow-2xl active:scale-95"
      >
        <WhatsappLogo size={28} weight="fill" className="transition-transform duration-500 ease-premium group-hover:scale-110" />
      </motion.a>
    </section>
  );
}
