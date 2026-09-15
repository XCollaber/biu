import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Briefcase } from '@phosphor-icons/react';
import Img from './Img';
import corpData from '../data/placements.json';

const EASE = [0.16, 1, 0.3, 1];

const FALLBACK =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80';

export default function Placements() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { y: 28, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const stats = corpData.stats || [];

  return (
    <section id="placements" className="relative w-full overflow-hidden bg-[#0c2340]">
      <Img
        src={corpData.bgImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop'}
        alt=""
        aria-hidden="true"
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#0c2340]/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0c2340] via-[#0c2340]/60 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-[1400px] items-center px-5 py-24 sm:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="max-w-xl"
        >
          <motion.span
            variants={rise}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold"
          >
            {corpData.badge || 'Career & Placements'}
          </motion.span>

          <motion.h2
            variants={rise}
            className="mt-4 font-serif text-4xl font-medium leading-[1.05] text-white sm:text-5xl md:text-[3.5rem]"
          >
            {corpData.titleLine1 || 'Where Education Meets'}{' '}
            <span className="italic text-gold">{corpData.titleLine2 || 'Global Placement Success'}</span>
          </motion.h2>

          <motion.p
            variants={rise}
            className="mt-6 font-sans text-[15px] font-light leading-relaxed text-white/75"
          >
            {corpData.subtitle}
          </motion.p>

          <motion.div variants={rise} className="mt-8 flex flex-wrap gap-8">
            {stats.map((st) => (
              <div key={st.label}>
                <div className="font-serif text-3xl font-medium text-white sm:text-4xl">
                  {st.value}
                </div>
                <div className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold/80">
                  {st.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={rise} className="mt-10 flex flex-wrap gap-4">
            <a
              href="/placements"
              className="group inline-flex items-center gap-3 rounded-full border border-gold/60 bg-gold px-7 py-3.5 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-forest-dark transition-all duration-500 ease-premium hover:bg-gold-light hover:shadow-[0_4px_20px_rgba(212,175,55,0.4)] active:scale-[0.98]"
            >
              <Briefcase size={15} weight="bold" />
              {corpData.ctaPrimaryLabel || 'View Placement Report'}
              <ArrowRight
                size={14}
                weight="bold"
                className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
