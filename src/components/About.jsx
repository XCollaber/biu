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

  return (
    <section id="about" className="relative w-full bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#f0f4f8] py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.18fr_1fr] lg:gap-12 xl:gap-16">
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
              className="aspect-[16/9] w-full rounded-[1.375rem] object-cover object-center"
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
            className="block text-center sm:text-left font-sans text-[13px] font-medium uppercase tracking-[0.28em] text-gold-dark"
          >
            {aboutData.badge}
          </motion.span>

          <motion.h2
            variants={rise}
            className="mt-4 text-center sm:text-left font-serif text-4xl font-medium leading-tight text-forest-dark sm:text-5xl md:text-[2.85rem]"
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


          {/* CTA Buttons — Single Horizontal Row */}
          <motion.div variants={rise} className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-3.5 flex-nowrap">
            <a
              href="/about"
              className="group inline-flex h-13 sm:h-14 items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-gradient-to-r from-[#0c2340]/95 via-[#102d52]/90 to-[#163860]/95 backdrop-blur-md px-5 sm:px-6 font-sans text-xs sm:text-[12.5px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(8,23,43,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:from-[#163860]/95 hover:via-[#102d52]/90 hover:to-[#0c2340]/95 hover:shadow-[0_14px_32px_rgba(8,23,43,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-0 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
            >
              <BookOpenText size={18} weight="fill" className="text-gold-light shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span>Explore Our Story</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-gold-light transition-all duration-200 group-hover:translate-x-1 group-hover:bg-white/20 group-hover:text-white">
                <ArrowRight size={12} weight="bold" />
              </span>
            </a>

            <a
              href="#contact"
              className="group inline-flex h-13 sm:h-14 items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-gradient-to-r from-[#0c2340]/95 via-[#102d52]/90 to-[#163860]/95 backdrop-blur-md px-5 sm:px-6 font-sans text-xs sm:text-[12.5px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(8,23,43,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:from-[#163860]/95 hover:via-[#102d52]/90 hover:to-[#0c2340]/95 hover:shadow-[0_14px_32px_rgba(8,23,43,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-0 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
            >
              <CalendarPlus size={18} weight="fill" className="text-gold-light shrink-0 transition-transform duration-200 group-hover:scale-110" />
              <span>{aboutData.ctaLabel || 'Schedule a Visit'}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-gold-light transition-all duration-200 group-hover:translate-x-1 group-hover:bg-white/20 group-hover:text-white">
                <ArrowRight size={12} weight="bold" />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
