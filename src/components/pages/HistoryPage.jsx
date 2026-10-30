import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Buildings,
  GraduationCap,
  CalendarBlank,
  Scroll,
  SealCheck,
  Sparkle,
  Compass,
  Books,
  ArrowSquareOut,
  CaretRight,
  Target,
  Lightbulb,
  CheckCircle,
  ShieldCheck
} from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const EASE = [0.16, 1, 0.3, 1];

export default function HistoryPage({ onBack }) {
  const reduceMotion = useReducedMotion();

  const handleReadMore = () => {
    window.location.href = 'https://page.biu.edu.in/';
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-gold selection:text-[#0c2340]">
      {/* Top University Navigation */}
      <Navbar />

      {/* =========================================================
          HERO HEADER: UNIVERSITY HISTORY & HERITAGE (BIU THEME)
      ========================================================= */}
      <section className="relative bg-white border-b border-slate-200/80 pt-28 pb-10 sm:pt-32 sm:pb-14 font-sans z-20 overflow-hidden">
        {/* College Building Image Background Overlay */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src="/biu-building.png"
            alt="Bareilly International University Campus"
            className="h-full w-full object-cover object-center opacity-45 sm:opacity-50 filter contrast-110 brightness-95 transform scale-x-100 scale-y-[0.75] mt-9 origin-center transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/hero-section.webp';
            }}
          />
          {/* Subtle Directional White Fog: Keeps left text crystal clear while making the architecture clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/35" />
          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Heritage Diamond Lattice Background Overlay */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.035] z-[1]" aria-hidden="true">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="history-heritage-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 48 24 L 24 48 L 0 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.65" />
                <path d="M 24 9 L 39 24 L 24 39 L 9 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.60" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#history-heritage-lattice)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          {/* Breadcrumb / Back button & Badges Toolbar */}
          <div className="mb-4 sm:mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-sans text-xs text-slate-500">
              <a
                href="/"
                onClick={(e) => {
                  if (onBack) {
                    e.preventDefault();
                    onBack();
                  }
                }}
                className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-md border border-slate-200/70 sm:border-slate-300/80 bg-white px-2.5 py-1 sm:px-3.5 sm:py-1.5 font-sans text-[11px] sm:text-xs font-medium sm:font-semibold text-slate-600 sm:text-slate-700 shadow-2xs transition-all duration-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#0c2340]/90 hover:via-[#102d52]/90 hover:to-[#163860]/70 hover:text-white hover:brightness-125 hover:shadow-md active:scale-[0.98]"
              >
                <ArrowLeft size={13} weight="bold" className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Home</span>
              </a>
              <span className="text-slate-300">•</span>
              <span className="hidden sm:inline">Pages</span>
              <span className="text-slate-300 hidden sm:inline">»</span>
              <span className="text-[#0c2340] font-semibold">University History</span>
            </div>

            {/* Badges toolbar matching BIU style */}
            <div className="flex flex-nowrap sm:flex-wrap items-center gap-1.5 sm:gap-2.5">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-slate-300/80 bg-white px-2 sm:px-3.5 py-1.5 sm:py-2 font-sans text-[10.5px] sm:text-xs font-semibold text-slate-700 shadow-2xs whitespace-nowrap shrink-0">
                <SealCheck size={18} weight="bold" className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-cyan-700 shrink-0" />
                <span>UP Govt. Act No. 26 of 2016</span>
              </div>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg border border-slate-300/80 bg-white px-2 sm:px-3.5 py-1.5 sm:py-2 font-sans text-[10.5px] sm:text-xs font-semibold text-slate-700 shadow-2xs whitespace-nowrap shrink-0">
                <ShieldCheck size={18} weight="bold" className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px] text-cyan-700 shrink-0" />
                <span>UGC Act 1956 Recognized</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
            <div>
              <div className="hidden sm:flex items-center gap-2.5 mb-2.5">
                <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.09em] text-[#0c2340]">
                  HERITAGE & STATUTORY ESTABLISHMENT
                </span>
              </div>
              <h1 className="font-times text-[26px] sm:text-3xl lg:text-[2.65rem] font-medium text-[#0c2340] leading-[1.15]">
                History
              </h1>
              <p className="mt-2 text-[12px] sm:text-sm text-slate-500 font-sans max-w-2xl leading-relaxed">
                <span className="sm:hidden">
                  Foundational statutory background and academic chronicle of Bareilly International University.
                </span>
                <span className="hidden sm:inline">
                  Foundational statutory background, academic inception, and institutional evolution of Bareilly International University.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MAIN EDITORIAL CONTENT: OVERVIEW & IDENTITY
      ========================================================= */}
      <section className="relative z-10 w-full overflow-hidden bg-[#fbfbfd] py-12 sm:py-16 lg:py-20 font-sans">
        {/* Soft Background Wave Blob */}
        <div className="pointer-events-none absolute -right-28 top-20 w-[600px] h-[600px] bg-gradient-to-bl from-[#d9ebfb]/45 via-[#eaf4fd]/30 to-transparent rounded-full filter blur-3xl z-0 opacity-70" />
        <div className="pointer-events-none absolute -left-28 bottom-20 w-[500px] h-[500px] bg-gradient-to-tr from-gold/10 via-amber-50/20 to-transparent rounded-full filter blur-3xl z-0 opacity-60" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14">

            {/* Left 8 Cols: Main Historical Narrative */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-8 flex flex-col"
            >
              <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-[0_16px_45px_-12px_rgba(12,35,64,0.08)]">
                {/* Heading Block Matching Original Style */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-[3px] bg-gradient-to-r from-red-600 via-rose-500 to-transparent rounded-full" />
                    <span className="font-sans text-[11px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                      HISTORICAL CHRONICLE
                    </span>
                  </div>

                  <h2 className="font-times text-2xl sm:text-3xl lg:text-[2.25rem] font-medium text-[#0c2340] tracking-tight">
                    Overview <span className="text-red-700 font-normal">& Identity</span>
                  </h2>
                  <div className="mt-2.5 h-[2.5px] w-14 bg-gradient-to-r from-red-600 via-red-500 to-transparent rounded-full" />
                </div>

                {/* Narrative Text Paragraphs Exactly Matching Reference Content */}
                <div className="space-y-5 sm:space-y-6 text-slate-700 font-sans text-[14px] sm:text-[15.5px] leading-[1.8] sm:leading-[1.85]">

                  {/* Paragraph 1 */}
                  <div className="rounded-xl border-l-4 border-red-600 bg-red-50/25 p-4 sm:p-5 text-slate-800">
                    <p>
                      <strong className="font-serif text-[#0c2340] font-bold text-[15px] sm:text-[16.5px]">
                        Bareilly International University, Bareilly
                      </strong>{' '}
                      is established in accordance to UGC Act 1956 by the Uttar Pradesh Govt. Act No. 26 of 2016 dated 16th Sept 2016. The University has commenced academic activities from session 2016-17 with various courses.
                    </p>
                  </div>

                  {/* Paragraph 2 */}
                  <p>
                    The University is in the process to design its own milestone in the pursuit of social commitment and excellence reflecting by establishing world class practices. It has reached the shores of developing into a seat of global learning to bring about transformation of the society through value based education, research promotions.
                  </p>

                  {/* Paragraph 3 */}
                  <p>
                    BIU has belief in innovation and forward-thinking that encourage to assume a leadership in various curriculum. These advantages give us a special opportunity to advance this great institution through carefully selected but ambitious choices that renew and extend its mission.
                  </p>

                  {/* Paragraph 4 */}
                  <p>
                    Objective of BIU is the holistic development of each student through inter-disciplinary, multi-disciplinary and trans-disciplinary approach. University offers various innovative and unique courses that are truly transdisciplinary in nature, scope and contents and help the students to develop knowledge and skills in diverse areas of study which are innovative in the emerging areas.
                  </p>

                  {/* Paragraph 5 */}
                  <p>
                    The learner-centric academic system with dynamic curriculum, broad-based courses are some of the important hall-marks of this University. The BIU aims to promote academic autonomy and empowerment, design multidisciplinary courses and exploratory research across disciplines among its faculty and students.
                  </p>
                </div>

                {/* Action Section: Read More Button Linking to https://page.biu.edu.in/ */}
                <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-sans text-center sm:text-left">
                    <span>Explore university publications & extended archives at </span>
                    <a
                      href="https://page.biu.edu.in/"
                      className="font-medium text-cyan-800 hover:underline"
                    >
                      page.biu.edu.in
                    </a>
                  </div>

                  <a
                    href="https://page.biu.edu.in/"
                    className="group inline-flex h-11 sm:h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#0c2340] px-6 sm:px-8 font-sans text-xs sm:text-[14px] font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#102d52] hover:shadow-md hover:brightness-110 active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    <span>Read More</span>
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right 4 Cols: University Identity & Core Tenets */}
            <div className="lg:col-span-4 flex flex-col gap-6">

              {/* Card 1: University Identity Summary */}
              <div className="rounded-xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-[0_12px_36px_-10px_rgba(12,35,64,0.08)] text-left">
                <div className="flex items-center gap-2 mb-3.5">
                  <Buildings size={20} weight="bold" className="text-cyan-800 shrink-0" />
                  <h3 className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0c2340]">
                    Institutional Charter
                  </h3>
                </div>

                <div className="space-y-3 font-sans text-xs sm:text-[13px] text-slate-600">
                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/60">
                    <span className="block text-[10.5px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">
                      Statutory Enactment
                    </span>
                    <span className="font-semibold text-slate-800">
                      UP Govt. Act No. 26 of 2016
                    </span>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/60">
                    <span className="block text-[10.5px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">
                      Academic Jurisdiction
                    </span>
                    <span className="font-semibold text-slate-800">
                      University Grants Commission (UGC Act 1956)
                    </span>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3 border border-slate-200/60">
                    <span className="block text-[10.5px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">
                      Campus Headquarters
                    </span>
                    <span className="font-semibold text-slate-800">
                      Pilibhit Bypass Road, Bareilly, UP 243006
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: Core Academic Pillars */}
              <div className="rounded-xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-[0_12px_36px_-10px_rgba(12,35,64,0.08)] text-left">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={20} weight="bold" className="text-red-700 shrink-0" />
                  <h3 className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0c2340]">
                    Core Academic Pillars
                  </h3>
                </div>

                <ul className="space-y-3.5 font-sans text-xs sm:text-[13px] text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 font-semibold">Social Commitment:</strong> Fostering value-based education for societal transformation.
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 font-semibold">Transdisciplinary Study:</strong> Cross-faculty research and curriculum integration.
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 font-semibold">Academic Autonomy:</strong> Empowering educators and students with dynamic choices.
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <CheckCircle size={16} weight="fill" className="text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-800 font-semibold">Holistic Development:</strong> Cultivating ethical leaders, researchers, and healthcare professionals.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Card 3: Quick Direct Link */}
              <div className="rounded-xl bg-gradient-to-br from-[#0c2340] to-[#163860] p-5 sm:p-6 text-white text-left shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkle size={18} weight="fill" className="text-gold shrink-0" />
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-gold">
                    Extended Portal
                  </span>
                </div>
                <h4 className="font-serif text-lg font-medium text-white mb-2">
                  Institutional Chronicle
                </h4>
                <p className="font-sans text-xs text-white/75 leading-relaxed mb-4">
                  Access archival documentation, annual achievements, and department milestones on the BIU portal.
                </p>
                <a
                  href="https://page.biu.edu.in/"
                  className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 font-sans text-xs font-bold text-white transition-all active:scale-[0.98]"
                >
                  <span>Visit page.biu.edu.in</span>
                  <ArrowSquareOut size={14} weight="bold" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* University Footer */}
      <Footer />
    </div>
  );
}
