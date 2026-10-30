import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowSquareOut
} from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const EASE = [0.16, 1, 0.3, 1];

const CHRONICLE_UPDATES = [
  {
    id: 'endo-spine-2026',
    title: 'Advanced Endo Spine course 2026',
    tag: 'Surgical Workshop',
    tagClass: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
    description: "Dr. Varun's hands-on endoscopic spine surgery masterclass with live operative demonstrations and clinical sessions.",
    image: 'https://page.biu.edu.in/wp-content/uploads/2026/08/Dr-Varun-Advanced-Endo-Spine-Course-1-scaled-600x450.jpg',
    href: 'https://page.biu.edu.in/dr-varuns-advanced-endo-spine-course-2026/'
  },
  {
    id: 'faculty-fine-arts',
    title: 'Inauguration of Faculty of Fine Arts',
    tag: 'Campus Milestone',
    tagClass: 'text-amber-700 bg-amber-50 border-amber-200/60',
    description: 'Expanding interdisciplinary academic horizons with dedicated studios for contemporary visual design and creative arts.',
    image: 'https://page.biu.edu.in/wp-content/uploads/2026/08/Inauguration-Faculty-of-Fine-Arts-39-600x450.jpeg',
    href: 'https://page.biu.edu.in/inauguration-of-faculty-of-fine-arts/'
  },
  {
    id: 'vitalis-2026',
    title: 'Vitalis 2026',
    tag: 'Medical Confluence',
    tagClass: 'text-cyan-700 bg-cyan-50 border-cyan-200/60',
    description: 'A confluence of medical education, advanced clinical skills, and healthcare leadership at Rohilkhand Medical College.',
    image: 'https://page.biu.edu.in/wp-content/uploads/2026/09/Vitalis-2026-19-600x450.jpeg',
    href: 'https://page.biu.edu.in/vitalis-2026-a-confluence-of-medical-education-skills-and-leadership/'
  }
];

const CHRONICLE_VIDEOS = [
  {
    id: 'rmch-tour',
    title: 'Rohilkhand Medical College & Hospital',
    subtitle: 'Institutional Overview & Healthcare Facilities',
    embedUrl: 'https://www.youtube-nocookie.com/embed/BLglXs29744',
    href: 'https://www.youtube.com/watch?v=BLglXs29744'
  },
  {
    id: 'biu-campus',
    title: 'Bareilly International University',
    subtitle: 'Campus Documentary & Academic Faculties',
    embedUrl: 'https://www.youtube-nocookie.com/embed/kNSBFoUWSCc',
    href: 'https://www.youtube.com/watch?v=kNSBFoUWSCc'
  }
];

export default function HistoryPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const [chronicleTab, setChronicleTab] = useState('events'); // 'events' | 'videos'

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
            className="h-full w-full object-cover object-center opacity-45 sm:opacity-50 filter contrast-110 brightness-95 transform scale-x-100 sm:scale-x-90 scale-y-[0.85] sm:scale-y-[0.75] mt-9 ml-0 sm:ml-20 origin-center transition-transform duration-300"
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
          {/* Back button */}
          <div className="mb-4 sm:mb-6 flex items-center">
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
              <p className="mt-2 text-[12px] sm:text-sm text-slate-500 font-sans max-w-xl leading-relaxed">
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
                    <span className="w-7 h-[3px] bg-gradient-to-r from-cyan-600 via-cyan-500 to-transparent rounded-full" />
                    <span className="font-sans text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] text-[#0c2340]">
                      HISTORICAL CHRONICLE
                    </span>
                  </div>

                  <h2 className="font-times text-2xl sm:text-3xl lg:text-[2.25rem] font-medium text-[#0c2340] tracking-tight">
                    Overview <span className="text-cyan-700 font-normal">& Identity</span>
                  </h2>
                  <div className="mt-2.5 h-[2.5px] w-14 bg-gradient-to-r from-cyan-600 via-cyan-500 to-transparent rounded-full" />
                </div>

                {/* Narrative Text Paragraphs Exactly Matching Reference Content */}
                <div className="space-y-4 sm:space-y-6 text-slate-700 font-sans sm:text-[13.5px] text-[11.5px] leading-[1.75] sm:leading-[1.85]">

                  {/* Paragraph 1 */}
                  <p>
                    <strong className="font-semibold text-slate-900">Bareilly International University, Bareilly</strong> is established in accordance to UGC Act 1956 by the Uttar Pradesh Govt. Act No. 26 of 2016 dated 16th Sept 2016. The University has commenced academic activities from session 2016-17 with various courses.
                  </p>

                  {/* Paragraph 2 */}
                  <p>
                    The University is in the process to design its own milestone in the pursuit of social commitment and excellence reflecting by establishing world class practices. It has reached the shores of developing into a seat of global learning to bring about transformation of the society through value-based education, research promotions.
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
                  <div className="text-[11.5px] sm:text-xs text-slate-500 font-sans text-center sm:text-left">
                    <span>Explore university publications & extended archives at → </span>
                    <a
                      href="https://page.biu.edu.in/"
                      className="font-medium text-cyan-800 hover:underline"
                    >
                      page.biu.edu.in
                    </a>
                  </div>

                  <a
                    href="https://page.biu.edu.in/"
                    className="group inline-flex h-11 sm:h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-5 sm:px-6 font-sans text-xs sm:text-[14px] font-semibold text-white shadow-sm brightness-125 transition-all duration-200 hover:shadow-md hover:brightness-140 active:scale-[0.98] cursor-pointer whitespace-nowrap"
                  >
                    <span>Visit page.biu.edu.in</span>
                    <ArrowSquareOut
                      size={16}
                      weight="bold"
                      className="transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0"
                    />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right 4 Cols: Live Chronicle & Highlights from page.biu.edu.in */}
            <div className="lg:col-span-4 flex flex-col gap-5">

              {/* Sidebar Header with Live Chronicle Title and Tabs */}
              <div className="flex items-center justify-between gap-2 pb-2 mt-12 sm:mt-0 border-b border-slate-200/80">
                <div className="inline-flex items-center gap-2">
                  <span className="w-7 h-[3px] bg-gradient-to-r from-cyan-600 via-cyan-400 to-transparent rounded-full" />
                  <h3 className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.10em] text-[#0c2340]">
                    Campus Chronicle
                  </h3>
                </div>

                {/* Tab Pill Toggle */}
                <div className="inline-flex items-center p-0.5 rounded-lg bg-slate-100 border border-slate-200/80 text-[10.5px] sm:text-[11px] font-semibold text-slate-600">
                  <button
                    type="button"
                    onClick={() => setChronicleTab('events')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${chronicleTab === 'events'
                        ? 'bg-white text-cyan-800 shadow-2xs font-bold'
                        : 'hover:text-slate-900 text-slate-500'
                      }`}
                  >
                    Highlights (3)
                  </button>
                  <button
                    type="button"
                    onClick={() => setChronicleTab('videos')}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${chronicleTab === 'videos'
                        ? 'bg-white text-cyan-800 shadow-2xs font-bold'
                        : 'hover:text-slate-900 text-slate-500'
                      }`}
                  >
                    Videos (2)
                  </button>
                </div>
              </div>

              {/* View 1: 3 Featured Event Chronicle Cards */}
              {chronicleTab === 'events' && (
                <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 pb-3 pt-1 px-1 sm:px-0 sm:flex-col sm:space-y-6 sm:gap-0 sm:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden after:shrink-0 after:w-3 sm:after:hidden">
                  {CHRONICLE_UPDATES.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-[82vw] max-w-[315px] shrink-0 snap-start sm:w-full sm:max-w-none rounded-xl bg-white border border-slate-200/90 overflow-hidden shadow-[0_6px_20px_-8px_rgba(12,35,64,0.06)] hover:shadow-[0_14px_32px_-8px_rgba(12,35,64,0.12)] hover:border-cyan-400/80 transition-all duration-200 text-left cursor-pointer"
                    >
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5">
                          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${item.tagClass}`}>
                            {item.tag}
                          </span>
                        </div>
                        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/95 backdrop-blur-sm p-1.5 rounded-md text-[#0c2340] shadow-2xs">
                          <ArrowSquareOut size={13} weight="bold" />
                        </div>
                      </div>

                      <div className="p-3.5 sm:p-4">
                        <h4 className="font-sans text-[12.5px] sm:text-[13.5px] font-bold text-[#0c2340] group-hover:text-cyan-800 transition-colors line-clamp-1">
                          {item.title}
                        </h4>
                        <p className="mt-1 font-sans text-[11px] sm:text-xs text-slate-600 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              )}

              {/* View 2: 2 Official Video Highlights */}
              {chronicleTab === 'videos' && (
                <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 pb-3 pt-1 px-1 sm:px-0 sm:flex-col sm:space-y-4 sm:gap-0 sm:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden after:shrink-0 after:w-3 sm:after:hidden">
                  {CHRONICLE_VIDEOS.map((video) => (
                    <div
                      key={video.id}
                      className="w-[84vw] max-w-[335px] shrink-0 snap-start sm:w-full sm:max-w-none rounded-xl bg-white border border-slate-200/90 overflow-hidden shadow-[0_6px_20px_-8px_rgba(12,35,64,0.06)] text-left"
                    >
                      <div className="relative aspect-video w-full bg-slate-900">
                        <iframe
                          src={video.embedUrl}
                          title={video.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                      <div className="p-3.5 sm:p-4">
                        <h4 className="font-sans text-[12.5px] sm:text-[13.5px] font-bold text-[#0c2340]">
                          {video.title}
                        </h4>
                        <p className="mt-0.5 font-sans text-[11px] sm:text-xs text-slate-500">
                          {video.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* University Footer */}
      <Footer />
    </div>
  );
}
