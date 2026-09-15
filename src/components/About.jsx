import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BookOpenText, CalendarPlus } from '@phosphor-icons/react';
import Img from './Img';
import aboutData from '../data/about.json';

const EASE = [0.16, 1, 0.3, 1];

export default function About() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { y: 28, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const stats = aboutData.stats || [];

  return (
    <section id="about" className="relative w-full bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#f0f4f8] py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Left: aerial image with double-bezel frame */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative"
        >
          <div className="rounded-[1.75rem] bg-white/60 p-2 shadow-[0_30px_80px_-30px_rgba(20,57,43,0.35)] ring-1 ring-black/5">
            <Img
              src={aboutData.image}
              alt={aboutData.imageAlt || 'BIU University Campus'}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-[1.375rem] object-cover md:aspect-[9/10]"
            />
          </div>
          {/* Soft gold accent glow behind the frame */}
          <div className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
        </motion.div>

        {/* Right: content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col"
        >
          <motion.span
            variants={rise}
            className="block text-center sm:text-left font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold-dark"
          >
            {aboutData.badge}
          </motion.span>

          <motion.h2
            variants={rise}
            className="mt-4 text-center sm:text-left font-serif text-4xl font-medium leading-tight text-forest-dark sm:text-5xl md:text-[3.25rem]"
          >
            {aboutData.title}
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-6 mx-auto sm:mx-0 text-center sm:text-left max-w-xl font-sans text-base font-light leading-relaxed text-forest/70"
          >
            {aboutData.paragraph1}
          </motion.p>

          <motion.p
            variants={rise}
            className="mt-4 mx-auto sm:mx-0 text-center sm:text-left max-w-xl font-sans text-base font-light leading-relaxed text-forest/70"
          >
            {aboutData.paragraph2}
          </motion.p>

          {/* Stats grid */}
          <motion.div variants={rise} className="mt-10 grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-2xl border border-forest/10 bg-white/80 px-5 py-5 text-center sm:px-6 sm:py-6 sm:text-left transition-all duration-500 ease-premium hover:border-gold/50 hover:bg-white hover:shadow-[0_20px_50px_-20px_rgba(20,57,43,0.25)] hover:-translate-y-1"
              >
                <div className="font-serif text-3xl font-medium text-forest sm:text-4xl md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-forest/50 sm:mt-2 sm:text-[11px] sm:tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={rise} className="mt-10 flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <a
              href="/about"
              className="group inline-flex h-14 items-center gap-3 rounded-xl bg-[#0c2340] border border-gold/50 px-8 font-sans text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#f7e7b4] shadow-md transition-all duration-300 ease-premium hover:bg-[#163860] hover:border-gold hover:scale-105 hover:shadow-lg active:scale-95 cursor-pointer"
            >
              <BookOpenText size={18} weight="fill" className="text-gold shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span>Explore Our Story</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gold/20 text-gold transition-transform duration-300 ease-premium group-hover:translate-x-1">
                <ArrowRight size={13} weight="bold" />
              </span>
            </a>

            <a
              href="#contact"
              className="group inline-flex h-14 items-center gap-3 rounded-xl border border-[#0c2340]/20 bg-white/90 px-8 font-sans text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.16em] text-forest-dark shadow-sm transition-all duration-300 ease-premium hover:border-gold-dark hover:bg-white hover:scale-105 hover:shadow-[0_8px_30px_rgba(12,35,64,0.15)] active:scale-95 cursor-pointer"
            >
              <CalendarPlus size={18} weight="fill" className="text-gold-dark shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span>{aboutData.ctaLabel || 'Schedule a Visit'}</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#0c2340]/10 text-forest-dark transition-all duration-300 ease-premium group-hover:translate-x-1 group-hover:bg-gold/20 group-hover:text-gold-dark">
                <ArrowRight size={13} weight="bold" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
