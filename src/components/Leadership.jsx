import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import leadershipData from '../data/leadership.json';

const EASE = [0.23, 1, 0.32, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export default function Leadership() {
  const reduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 py-16 sm:py-20 md:py-14">
      {/* Background visual accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-full max-w-7xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="font-sans text-[12.5px] font-bold uppercase tracking-[0.28em] text-gold-dark">
            {leadershipData.badge || 'LEADERSHIP'}
          </span>
          <h2 className="mt-2.5 font-serif text-3xl font-medium leading-tight text-forest-dark sm:text-4xl md:text-5xl">
            {leadershipData.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-sans text-sm sm:text-base font-light leading-relaxed text-forest/70">
            {leadershipData.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 sm:mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7"
        >
          {leadershipData.leaders.map((leader, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-2xl border border-white/20 bg-[#07162c] shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-2xl"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/4.8] w-full overflow-hidden bg-[#051120]">
                <img
                  src={leader.image}
                  alt={leader.imageAlt || leader.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Soft Gradient Overlay at bottom for text readability, leaving faces bright & clear */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#061426] via-[#061426]/35 to-transparent transition-opacity duration-300 group-hover:from-[#061426]" />
              </div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end">
                <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.2em] text-gold-light">
                  {leader.role}
                </span>
                <h3 className="mt-1 font-sans text-base sm:text-[17px] font-bold text-white transition-colors duration-200 group-hover:text-gold-light">
                  {leader.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
