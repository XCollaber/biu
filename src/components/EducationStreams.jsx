import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Stethoscope,
  Tooth,
  FirstAid,
  Pill,
  Buildings,
  BookOpenText,
  Heartbeat,
  Flask,
  Plant,
  PaintBrush,
  CaretDown,
  ArrowUpRight,
  ArrowRight,
  GraduationCap,
} from '@phosphor-icons/react';
import streamsData from '../data/streams.json';

const EASE = [0.16, 1, 0.3, 1];

const ICON_MAP = {
  Stethoscope,
  Tooth,
  FirstAid,
  Pill,
  Buildings,
  BookOpenText,
  Heartbeat,
  Flask,
  Plant,
  PaintBrush,
};

export default function EducationStreams() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('institutions');
  const [openStream, setOpenStream] = useState(null);

  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const institutionsSection = streamsData.institutionsSection || {};
  const streamsSection = streamsData.streamsSection || {};
  const currentTabObj = (institutionsSection.tabs || []).find((t) => t.id === activeTab) || institutionsSection.tabs?.[0] || {};

  const toggleStream = (id) => {
    setOpenStream((prev) => (prev === id ? null : id));
  };

  return (
    <section id="streams" className="relative w-full bg-[#fbfbfd] py-14 sm:py-18 md:pt-14 md:pb-20 font-sans overflow-hidden border-t border-slate-200/70">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16">

          {/* =========================================================
              LEFT COLUMN: ALL COURSES IDEA / CONSTITUENT INSTITUTIONS
          ========================================================= */}
          <div className="flex flex-col">
            {/* Header outside the container */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col items-start gap-1 mb-6 sm:mb-7"
            >
              {/* Eyebrow Tag */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                  {institutionsSection.badge || 'ACADEMIC DIRECTORY'}
                </span>
              </div>

              <h2 className="font-times text-2xl sm:text-3xl lg:text-[2.45rem] font-medium text-[#0c2340] leading-[1.12]">
                {institutionsSection.title || 'All Courses Idea'}
              </h2>
            </motion.div>

            {/* Horizontal Tabs Header */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-3 -mx-1 px-1 scrollbar-none">
              {(institutionsSection.tabs || []).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-sans text-xs sm:text-[13px] font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer border ${
                      isActive
                        ? 'bg-[#0c2340] text-white border-[#0c2340] shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200/80 hover:bg-slate-100/80 hover:text-[#0c2340]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Main Card Container */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="flex-1 rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs hover:shadow-[0_20px_40px_-12px_rgba(12,35,64,0.12),0_8px_16px_-4px_rgba(12,35,64,0.06),0_0_0_1px_rgba(12,35,64,0.04)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Colored University Header Ribbon */}
                <div className="bg-gradient-to-r from-[#0c2340] via-[#102d52] to-[#163860] px-5 py-3.5 flex items-center justify-between text-white">
                  <span className="font-times text-[15.5px] sm:text-base font-semibold tracking-wide">
                    {currentTabObj.headerTitle || 'Our Constituent Institutions'}
                  </span>
                  <span className="font-sans text-[11px] uppercase tracking-wider font-semibold text-blue-200/80">
                    Direct Link
                  </span>
                </div>

                {/* Sub-Header Columns */}
                <div className="bg-slate-50/90 border-b border-slate-200/85 px-5 py-2 flex items-center justify-between font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                  <span>Institutions / Portals</span>
                  <span>Link</span>
                </div>

                {/* Table Rows List */}
                <div className="divide-y divide-slate-200/85">
                  {(currentTabObj.items || []).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link || '/faculties'}
                      target={item.link?.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 px-5 py-2.5 sm:py-3 transition-all duration-150 hover:bg-slate-50/90"
                    >
                      <span className="font-newsreader text-[14.5px] sm:text-[15.5px] font-medium text-[#0c2340] group-hover:text-rose-600 transition-colors duration-150 line-clamp-1">
                        {item.name}
                      </span>
                      <span className="shrink-0 inline-flex items-center gap-1 font-sans text-xs sm:text-[12.5px] font-bold text-rose-600 transition-all duration-150 group-hover:translate-x-0.5 group-hover:underline">
                        <span>Visit</span>
                        <ArrowUpRight size={13} weight="bold" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom Quick View All Link */}
              <div className="bg-slate-50/80 border-t border-slate-200/85 px-5 py-3 flex items-center justify-between text-slate-500 font-sans text-xs">
                <span>Explore all faculties & campus centres</span>
                <a
                  href="/faculties"
                  className="font-semibold text-[#0c2340] hover:text-rose-600 transition-colors inline-flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight size={13} weight="bold" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* =========================================================
              RIGHT COLUMN: EDUCATION STREAM ACCORDION
          ========================================================= */}
          <div className="flex flex-col">
            {/* Header outside the container */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-start gap-1 mb-6 sm:mb-7"
            >
              {/* Eyebrow Tag */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                  {streamsSection.badge || 'STUDY DISCIPLINES'}
                </span>
              </div>

              <h2 className="font-times text-2xl sm:text-3xl lg:text-[2.45rem] font-medium text-[#0c2340] leading-[1.12]">
                {streamsSection.title || 'Education Stream'}
              </h2>
              <p className="mt-1 font-sans text-xs sm:text-[13px] text-slate-600 font-light leading-relaxed max-w-xl">
                {streamsSection.description || 'Students seeking a degree can choose from our Programmes like MD/MS, MBBS, MDS, BDS, M.Sc Medical, B.Sc Nursing, B. Pharma etc.'}
              </p>
            </motion.div>

            {/* Accordion List Card Container */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: 0.1 }}
              className="flex-1 rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-4 lg:p-5 shadow-xs hover:shadow-[0_20px_40px_-12px_rgba(12,35,64,0.12),0_8px_16px_-4px_rgba(12,35,64,0.06),0_0_0_1px_rgba(12,35,64,0.04)] transition-all duration-300"
            >
              <div className="flex flex-col divide-y divide-slate-200/85">
                {(streamsSection.streams || []).map((stream) => {
                  const isOpen = openStream === stream.id;
                  const IconComp = ICON_MAP[stream.icon] || GraduationCap;

                  return (
                    <div key={stream.id} className="py-2.5 sm:py-2 first:pt-0 last:pb-0">
                      {/* Accordion Row Header Button */}
                      <button
                        type="button"
                        onClick={() => toggleStream(stream.id)}
                        className="group w-full flex items-center justify-between gap-3.5 px-2 sm:px-2 py-1 rounded-xl transition-all duration-150 hover:bg-slate-50/90 text-left cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                          {/* Unified Category Icon — matching footer active hover aesthetic */}
                          <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200 ${
                            isOpen
                              ? 'bg-[#0c2340] text-white border-[#0c2340] shadow-[0_4px_12px_rgba(12,35,64,0.2)]'
                              : 'border-slate-300 bg-blue-100/50 text-[#0c2340] shadow-[0_2px_8px_rgba(191,219,254,0.4)] group-hover:bg-[#0c2340] group-hover:text-white group-hover:border-[#0c2340]'
                          }`}>
                            <IconComp size={25} weight="fill" />
                          </div>

                          {/* Faculty Stream Name */}
                          <span className="font-newsreader text-[14.5px] sm:text-[15.5px] font-medium text-[#0c2340] group-hover:text-gold-dark transition-colors duration-150 line-clamp-1">
                            {stream.name}
                          </span>
                        </div>

                        {/* Expand hint & Caret */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-sans text-[11px] font-semibold text-slate-400 group-hover:text-slate-600 transition-colors uppercase tracking-wider hidden sm:inline">
                            {isOpen ? 'Close' : 'View Courses'}
                          </span>
                          <div className={`w-5 h-5 rounded flex items-center justify-center text-slate-400 group-hover:text-[#0c2340] transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0c2340]' : ''}`}>
                            <CaretDown size={14} weight="bold" />
                          </div>
                        </div>
                      </button>

                      {/* Expandable Course Degrees Details */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="pt-1 pb-0.5 pl-11 sm:pl-16 pr-3">
                              <p className="font-sans text-xs sm:text-[12.5px] text-slate-500 font-medium leading-relaxed mb-2.5">
                                {stream.desc}
                              </p>

                              {/* Degrees Pills Badges */}
                              <div className="flex flex-wrap gap-1.5 mb-2">
                                {(stream.degrees || []).map((deg, dIdx) => (
                                  <span
                                    key={dIdx}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-100/90 border border-slate-200/80 font-sans text-[11px] sm:text-[11.5px] font-semibold text-[#0c2340]"
                                  >
                                    {deg}
                                  </span>
                                ))}
                              </div>

                              <div className="pt-1">
                                <a
                                  href={stream.link || 'https://biu.edu.in/medical'}
                                  target={stream.link?.startsWith('http') ? '_blank' : '_self'}
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 font-sans text-xs font-bold text-cyan-800/80 underline hover:text-cyan-800 transition-colors"
                                >
                                  <span>Explore Degree Curriculum &amp; Eligibility</span>
                                  <ArrowRight size={12} weight="bold" />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

