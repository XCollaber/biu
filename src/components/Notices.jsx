import { motion, useReducedMotion } from 'framer-motion';
import { CaretRight, BellSimple, CalendarBlank, ArrowUpRight } from '@phosphor-icons/react';
import noticesData from '../data/notices.json';

const EASE = [0.16, 1, 0.3, 1];

export default function Notices() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const important = noticesData.important || {};
  const academics = noticesData.academics || {};

  return (
    <section id="notices" className="relative w-full bg-[#fbfbfd] py-14 sm:py-18 md:py-20 font-sans overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">

          {/* =========================================================
              LEFT COLUMN: IMPORTANT - NEWS & NOTICE
          ========================================================= */}
          <div className="flex flex-col">
            {/* Header outside the container */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex items-end justify-between gap-4 mb-6 sm:mb-7"
            >
              <div>
                {/* Eyebrow Tag */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                  <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                    {important.badge || 'IMPORTANT'}
                  </span>
                </div>

                <h2 className="font-times text-2xl sm:text-3xl lg:text-[2.2rem] font-medium text-[#0c2340] leading-[1.12]">
                  {important.title || 'News & Notice'}
                </h2>
              </div>

              {/* View All Button matching Navbar/Highlights button style */}
              <a
                href={important.viewAllLink || '/news'}
                className="group inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-4 sm:px-5 py-2 font-sans text-xs font-semibold text-white shadow-xs brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-125 hover:-translate-y-0.5 active:scale-[0.98] shrink-0"
              >
                <BellSimple size={15} weight="fill" className="text-blue-100 transition-transform duration-200 group-hover:scale-110" />
                <span>View All</span>
                <CaretRight size={13} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Card Container holding the items list */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 lg:p-7 shadow-xs hover:shadow-[0_20px_40px_-12px_rgba(12,35,64,0.12),0_8px_16px_-4px_rgba(12,35,64,0.06),0_0_0_1px_rgba(12,35,64,0.04)] transition-all duration-300"
            >
              <div className="flex flex-col divide-y divide-slate-100">
                {(important.items || []).map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link || '#'}
                    target={item.link?.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3.5 sm:gap-5 py-4 sm:py-4.5 first:pt-0 last:pb-0 transition-all duration-200 hover:bg-slate-50/80 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-xl"
                  >
                    {/* Left Date Column */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-14 sm:w-16 py-1.5 px-1 rounded-xl bg-slate-50/90 border border-slate-200/60 text-center transition-all duration-200 group-hover:scale-105 group-hover:bg-amber-50/40 group-hover:border-amber-200/60">
                      <span className="font-times text-xl sm:text-2xl font-bold text-[#0c2340] leading-none">
                        {item.day}
                      </span>
                      <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-1 whitespace-nowrap">
                        {item.monthYear}
                      </span>
                    </div>

                    {/* Middle Content Column */}
                    <div className="flex-1 min-w-0 flex flex-col items-start pr-1 sm:pr-2">
                      <h3 className="font-fraunces text-[14.5px] sm:text-[15.5px] font-medium text-[#0c2340] group-hover:text-gold-dark transition-colors duration-200 leading-[1.3] line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-[12.5px] text-slate-500 font-light leading-relaxed mt-1 line-clamp-1 sm:line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Right Action Button */}
                    <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#0c2340] group-hover:bg-[#0c2340] group-hover:text-white group-hover:border-[#0c2340] group-hover:shadow-md transition-all duration-200">
                      <ArrowUpRight size={14} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: ACADEMICS - UPDATES & EVENTS
          ========================================================= */}
          <div className="flex flex-col">
            {/* Header outside the container */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="flex items-end justify-between gap-4 mb-6 sm:mb-7"
            >
              <div>
                {/* Eyebrow Tag */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                  <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                    {academics.badge || 'ACADEMICS'}
                  </span>
                </div>

                <h2 className="font-times text-2xl sm:text-3xl lg:text-[2.2rem] font-medium text-[#0c2340] leading-[1.12]">
                  {academics.title || 'Updates & Events'}
                </h2>
              </div>

              {/* View All Button matching Navbar/Highlights button style */}
              <a
                href={academics.viewAllLink || '/news'}
                className="group inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-4 sm:px-5 py-2 font-sans text-xs font-semibold text-white shadow-xs brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-125 hover:-translate-y-0.5 active:scale-[0.98] shrink-0"
              >
                <CalendarBlank size={15} weight="fill" className="text-blue-100 transition-transform duration-200 group-hover:scale-110" />
                <span>View All</span>
                <CaretRight size={13} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Card Container holding the items list */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: 0.1 }}
              className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 lg:p-7 shadow-xs hover:shadow-[0_20px_40px_-12px_rgba(12,35,64,0.12),0_8px_16px_-4px_rgba(12,35,64,0.06),0_0_0_1px_rgba(12,35,64,0.04)] transition-all duration-300"
            >
              <div className="flex flex-col divide-y divide-slate-100">
                {(academics.items || []).map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link || '#'}
                    target={item.link?.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3.5 sm:gap-5 py-4 sm:py-4.5 first:pt-0 last:pb-0 transition-all duration-200 hover:bg-slate-50/80 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-xl"
                  >
                    {/* Left Date Column */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-14 sm:w-16 py-1.5 px-1 rounded-xl bg-slate-50/90 border border-slate-200/60 text-center transition-all duration-200 group-hover:scale-105 group-hover:bg-blue-50/40 group-hover:border-blue-200/60">
                      <span className="font-times text-xl sm:text-2xl font-bold text-[#0c2340] leading-none">
                        {item.day}
                      </span>
                      <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-1 whitespace-nowrap">
                        {item.monthYear}
                      </span>
                    </div>

                    {/* Middle Content Column */}
                    <div className="flex-1 min-w-0 flex flex-col items-start pr-1 sm:pr-2">
                      <h3 className="font-fraunces text-[14.5px] sm:text-[15.5px] font-medium text-[#0c2340] group-hover:text-gold-dark transition-colors duration-200 leading-[1.3] line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-[12.5px] text-slate-500 font-light leading-relaxed mt-1 line-clamp-1 sm:line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Right Action Button */}
                    <div className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-50 border border-slate-200/80 flex items-center justify-center text-[#0c2340] group-hover:bg-[#0c2340] group-hover:text-white group-hover:border-[#0c2340] group-hover:shadow-md transition-all duration-200">
                      <ArrowUpRight size={14} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
