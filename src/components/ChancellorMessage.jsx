import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import chancellorData from '../data/chancellor.json';

const EASE = [0.23, 1, 0.32, 1];

export default function ChancellorMessage() {
  const reduceMotion = useReducedMotion();

  const fadeIn = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <section className="relative overflow-hidden bg-slate-50/60 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeIn}
          className="relative overflow-hidden border border-white/15 bg-gradient-to-tr from-[#07162c]/90 via-[#0c2340]/85 to-[#07162c]/50 p-6 sm:p-8 lg:p-10 shadow-[0_25px_60px_rgba(7,22,44,0.4)]"
        >
          {/* Hexagon pattern overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden="true">
            <defs>
              <pattern id="chancellorHexPattern" width="56" height="48" patternUnits="userSpaceOnUse">
                <path
                  d="M28 2 L52 15 V39 L28 52 L4 39 V15 Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#chancellorHexPattern)" />
          </svg>

          {/* Subtle ambient glows */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-navy-light/30 blur-3xl" />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 lg:items-center">
            {/* Left: Photo Frame & Chancellor Name Badge */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
              <div className="relative w-full max-w-[320px] lg:max-w-none overflow-hidden rounded-xl bg-[#051120] border border-white/10 p-2 sm:p-2.5 shadow-inner">
                <img
                  src={chancellorData.chancellor.image}
                  alt={chancellorData.chancellor.imageAlt}
                  loading="lazy"
                  className="w-full aspect-[4/4.6] object-cover object-top rounded-lg shadow-md"
                />
              </div>

              {/* Name & Role Card Overlay */}
              <div className="mt-1.5 w-full max-w-[320px] lg:max-w-none rounded-md border border-white/10 bg-white/10 p-4 backdrop-blur-md shadow-lg">
                <h3 className="font-sans text-base sm:text-[17px] font-bold tracking-wide text-gold-light">
                  {chancellorData.chancellor.name}
                </h3>
                <p className="mt-0.5 font-sans text-xs tracking-wider uppercase text-white/60">
                  {chancellorData.chancellor.role}
                </p>
              </div>
            </div>

            {/* Right: Message Content */}
            <div className="lg:col-span-8 flex flex-col justify-center">
              <span className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.25em] text-gold-light">
                {chancellorData.badge}
              </span>

              <h2 className="mt-2.5 font-serif text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold leading-tight text-white">
                {chancellorData.title}
              </h2>

              {/* Quote Block with Gold Accent Bar */}
              <blockquote className="mt-5 border-l-4 border-gold pl-4 sm:pl-6 py-1">
                <p className="font-sans text-sm sm:text-[15px] font-light italic leading-relaxed text-white/90">
                  "{chancellorData.quote}"
                </p>
              </blockquote>

              {/* Supporting Description */}
              <p className="mt-4 font-sans text-xs sm:text-sm font-light leading-relaxed text-white/70">
                {chancellorData.paragraph}
              </p>

              {/* Meta Tags Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 font-sans text-xs font-bold uppercase tracking-widest text-gold-light">
                {chancellorData.meta.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <span className="text-white/20">|</span>}
                    <span>{item.label}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
