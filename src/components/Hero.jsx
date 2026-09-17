import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkle, CaretDown, ArrowRight, GraduationCap, CaretRight } from '@phosphor-icons/react';
import heroData from '../data/hero.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);

  // 3D Interactive Mouse Tilt - Left side coming forward out of screen, right side tilted back into depth
  const mouseX = useMotionValue(-0.5);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { damping: 28, stiffness: 220 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-11.5, -4.5]), { damping: 28, stiffness: 220 });

  const handleMouseMove = (e) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(-0.5);
    mouseY.set(0);
  };

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

  return (
    <section id="home" className="relative w-full bg-white pt-24 sm:pt-28 lg:pt-28 pb-6 sm:pb-10 px-3 sm:px-5 md:px-10 lg:px-12 xl:px-18 [perspective:1400px]">
      {/* 3D Container Card Frame with subtle tilt and layered depth */}
      <motion.div
        style={reduceMotion ? { rotateX: 0, rotateY: -9.5 } : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative mx-auto max-w-[1560px] w-full min-h-[490px] sm:min-h-[540px] lg:min-h-[570px] overflow-hidden rounded-xl sm:rounded-xl bg-[#0c2340] shadow-[0_30px_70px_-15px_rgba(12,35,64,0.4),0_15px_35px_-5px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.15)_inset] border border-slate-300/80 transition-shadow duration-500 will-change-transform"
      >
        {/* 3D Glass Specular Top Highlight*/}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-white/20 via-white/5 to-transparent z-20" />

        {/* Background video inside 3D frame */}
        <video
          ref={videoRef}
          src="/hero_video.mp4"
          className="absolute inset-0 h-full w-full object-cover rounded-xl sm:rounded-2xl"
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
          className="relative z-10 flex h-full min-h-[490px] sm:min-h-[540px] lg:min-h-[570px] flex-col justify-between p-6 sm:p-9 lg:p-12 text-left"
        >

          {/* Center Main Headline & Subtitle */}
          <div className="my-auto max-w-2xl lg:max-w-3xl pt-4 pb-8">
            <motion.h1
              variants={rise}
              className="font-serif leading-[1.08] tracking-tight text-white drop-shadow-md"
            >
              <span className="block text-[2.5rem] font-light text-white/95 sm:text-6xl lg:text-[3.8rem]">
                {heroData.headlineLine1 || 'Translating Knowledge'}
              </span>
              <span className="block text-[2.8rem] font-medium text-white mt-1 sm:mt-2 sm:text-6xl lg:text-[4.0rem]">
                {heroData.headlineLine2 || 'Into Clinical Excellence'}
              </span>
            </motion.h1>

            <motion.p
              variants={rise}
              className="mt-6 max-w-xl font-sans text-base sm:text-lg lg:text-[18px] font-light leading-relaxed text-white/90 drop-shadow"
            >
              {heroData.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={rise} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#contact"
                className="group flex h-12 sm:h-14 items-center justify-center gap-2.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light px-7 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-[0.14em] text-forest-dark shadow-xl transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-2xl hover:brightness-105 hover:from-gold-light hover:to-gold-dark active:translate-y-0 active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <GraduationCap size={24} weight="fill" className="text-forest-dark shrink-0 transition-transform duration-200 group-hover:scale-110" />
                <span>{heroData.ctaPrimaryLabel || 'Admissions 2026-27'}</span>
                <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1 text-forest-dark" />
              </a>

              <a
                href="/faculties"
                className="group flex h-12 sm:h-14 items-center justify-center gap-2 border border-white/20 bg-gradient-to-r from-navy-dark/90 via-navy/80 to-navy-light/85 backdrop-blur-md px-7 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_8px_20px_rgba(8,23,43,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/25 hover:from-navy-light/95 hover:via-navy/90 hover:to-navy-dark/95 hover:shadow-[0_12px_28px_rgba(8,23,43,0.5),inset_0_1px_0_rgba(255,255,255,0.35)] active:translate-y-0 active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>{heroData.ctaSecondaryLabel || 'Explore Faculties'}</span>
                <CaretRight size={16} weight="bold" className="text-white/80 transition-all duration-200 group-hover:translate-x-1 group-hover:text-white" />
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
      </motion.div>
    </section>
  );
}
