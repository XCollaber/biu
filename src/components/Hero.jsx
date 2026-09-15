import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkle, CaretDown, WhatsappLogo, ArrowRight, Bed, CalendarCheck } from '@phosphor-icons/react';
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
      transition: { staggerChildren: 0.12, delayChildren: 0.35 },
    },
  };
  const rise = {
    hidden: reduceMotion ? {} : { y: 26, opacity: 0, filter: 'blur(6px)' },
    show: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: EASE },
    },
  };

  const whatsappUrl = `https://wa.me/${siteData.whatsappPhone || '917455002900'}`;

  return (
    <section id="home" className="relative flex min-h-[100svh] sm:min-h-screen w-full flex-col overflow-hidden bg-[#0c2340]">
      {/* Background video */}
      <video
        ref={videoRef}
        src="/hero_video.mp4"
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onPlaying={handleCanPlay}
      />

      {/* Cinematic overlays for legibility */}
      <div className="absolute inset-0 bg-[#0c2340]/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50" />

      {/* Hero content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-28 text-center sm:px-8"
      >
        {/* Headline */}
        <motion.h1
          variants={rise}
          className="font-serif leading-[1.06] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]"
        >
          <span className="block text-[2.35rem] font-light text-white/90 sm:text-5xl md:text-6xl lg:text-[4.0rem]">
            {heroData.headlineLine1}
          </span>
          <span className="block text-[2.75rem] font-medium text-white mt-1 sm:mt-2 sm:text-6xl md:text-7xl lg:text-[4.5rem]">
            {heroData.headlineLine2}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={rise}
          className="mt-6 max-w-xl font-sans text-lg font-light leading-relaxed text-white/85 sm:text-xl md:text-[21px]"
        >
          {heroData.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={rise} className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <a
            href="#book"
            className="group flex h-11 sm:h-14 w-full items-center justify-center gap-2.5 sm:gap-3 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light px-5 sm:px-8 font-sans text-[11px] sm:text-[13px] font-extrabold uppercase tracking-[0.16em] text-forest-dark shadow-lg border border-gold-light/60 transition-all duration-300 ease-premium hover:scale-105 hover:shadow-xl hover:from-gold-light hover:to-gold-dark active:scale-95 sm:w-auto cursor-pointer"
          >
            <CalendarCheck size={18} weight="fill" className="text-forest-dark shrink-0 transition-transform duration-300 group-hover:scale-110 sm:h-[18px] sm:w-[18px]" />
            <span>{heroData.ctaPrimaryLabel || 'Plan Your Event'}</span>
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-lg bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-1">
              <ArrowRight size={12} weight="bold" />
            </span>
          </a>

          <a
            href="#rooms-page"
            className="group flex h-11 sm:h-14 w-full items-center justify-center gap-2.5 sm:gap-3 rounded-xl bg-[#0c2340] border border-gold/60 px-5 sm:px-8 font-sans text-[11px] sm:text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#f7e7b4] backdrop-blur-xl shadow-lg transition-all duration-300 ease-premium hover:bg-[#163860] hover:border-gold hover:scale-105 hover:shadow-xl active:scale-95 sm:w-auto cursor-pointer"
          >
            <Bed size={18} weight="fill" className="text-gold shrink-0 transition-transform duration-300 group-hover:scale-110 sm:h-[18px] sm:w-[18px]" />
            <span>{heroData.ctaSecondaryLabel || 'Book Rooms'}</span>
          </a>
        </motion.div>
      </motion.div>
      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <CaretDown size={26} weight="thin" className="animate-scroll-bob" />
      </motion.a>

      {/* Floating WhatsApp chat button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: EASE }}
        aria-label="Contact us on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-[#0c2340] shadow-lg ring-1 ring-inset ring-white/20 transition-all duration-500 ease-premium hover:bg-gold-light hover:shadow-xl active:scale-95"
      >
        <WhatsappLogo size={28} weight="fill" className="transition-transform duration-500 ease-premium group-hover:scale-110" />
      </motion.a>
    </section>
  );
}
