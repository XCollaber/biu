import { motion, useReducedMotion } from 'framer-motion';
import { GraduationCap, Lightbulb, UsersThree, Buildings, ArrowRight, CaretRight, Compass } from '@phosphor-icons/react';

const EASE = [0.16, 1, 0.3, 1];

const NOTICES = [
  { text: "Documents required for UP NEET UG Counseling - 2026", link: "https://biu.edu.in/notice/3.%20Final%20UG%20Documents%20required.pdf" },
  { text: "Documents required for UP NEET PG Counseling - 2026", link: "https://biu.edu.in/notice/UP%20NEET%20PG%202026.pdf" },
  { text: "New Course: POST BASIC DIPLOMA IN ONCOLOGY NURSING (PBDON)", link: "https://biu.edu.in/notice/advertisement-oncology-nursing.jpeg" },
  { text: "Rohilkhand College of Nursing: B.Sc Nursing Entrance Result 2026 Announced", link: "https://biu.edu.in/notice/Merit%20List_B.Sc%20Nursing.pdf" },
  { text: "Applications are invited for Ph.D. programme for July, 2026", link: "https://biu.edu.in/research/Ph.D-Notification%20July%202026.pdf" },
  { text: "CUET UG, PG 2026-27 Score Accepted", link: "https://biu.edu.in/#" },
  { text: "MBBS/MD/MS Admission Contact: 9557259598", link: "https://biu.edu.in/#" },
  { text: "Faculty of Fine Arts Courses Offered", link: "https://biu.edu.in/notice/scroller/faculty-of-fine-arts.pdf" },
  { text: "BIU College of Pharmacy Courses Offered", link: "https://biu.edu.in/notice/scroller/biu-college-of-pharmacy.pdf" },
  { text: "BIU College of Management Courses Offered", link: "https://biu.edu.in/notice/scroller/biu-college-of-management.pdf" },
  { text: "Faculty of Forensic Sciences Courses Offered", link: "https://biu.edu.in/notice/scroller/faculty-of-forensic-sciences.pdf" },
  { text: "Faculty of Allied and Healthcare Sciences Courses Offered", link: "https://biu.edu.in/notice/scroller/faculty-of-allied-and-healthcare-sciences.pdf" },
  { text: "Medical Sciences Courses Offered", link: "https://biu.edu.in/notice/scroller/medical-sciences.pdf" },
  { text: "Nursing Sciences Courses Offered", link: "https://biu.edu.in/notice/scroller/nursing-sciences.pdf" },
  { text: "BIU College of Humanities and Journalism Courses Offered", link: "https://biu.edu.in/notice/scroller/biu-college-of-humanities-and-journalism.pdf" }
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="about" className="relative w-full bg-white overflow-hidden font-sans">
      {/* Blue Gradient Announcement & Notice Scroller Strip */}
      <div className="w-full overflow-hidden bg-gradient-to-r from-[#143966] via-[#0c2340] to-[#07192e] py-1.5 sm:py-0.5 shadow-md border-y border-white/10 relative z-20">
        <div className="relative flex items-center overflow-hidden">
          <div className="animate-notice-marquee flex items-center whitespace-nowrap">
            {[...NOTICES, ...NOTICES].map((item, idx) => (
              <span key={idx} className="inline-flex items-center text-xs sm:text-sm font-bold tracking-wide text-white px-3 sm:px-4">
                <span className="mr-2 text-amber-200 text-sm sm:text-base select-none">✦</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-amber-200 hover:underline"
                >
                  {item.text}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Section Content */}
      <div className="relative w-full max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-24 py-14 sm:py-18 lg:pt-20 lg:pb-16 overflow-hidden">
        {/* Background Banyan Tree Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-20">
          <img
            src="/tree.png"
            alt="BIU Banyan Tree Emblem"
            className="w-full max-w-3xl md:max-w-lg opacity-[0.20] object-contain filter brightness-0 transform -translate-x-12 md:-translate-x-40 scale-110 md:scale-155"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          {/* Left Column: Content & Features */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            {/* Eyebrow Tag */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-8 h-[3.5px] bg-gold rounded-full" />
              <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                ABOUT BIU
              </span>
            </div>

            {/* Main Heading */}
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-4 font-times text-2xl sm:text-3xl md:text-4xl lg:text-[2.35rem] font-medium drop-shadow-md text-[#0c2340] leading-[1.14] mb-5"
            >
              A University Built<br className="hidden sm:inline" /> For A Brighter Tomorrow
            </motion.h2>

            {/* Description Paragraph */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="font-sans text-xs sm:text-sm md:text-[14.5px] text-slate-600 font-normal leading-relaxed mb-8 max-w-xl"
            >
              Bareilly International University (BIU) is committed to creating knowledge, fostering innovation, and nurturing future-ready global citizens through excellence in education, research and community engagement.
            </motion.p>

            {/* 4 Feature Points (2x2 Grid) */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6 sm:gap-y-7 mb-9"
            >
              {/* 1. Industry-Aligned Curriculum */}
              <div className="flex items-start gap-3.5 group cursor-default">
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-gold shadow-xs flex items-center justify-center shrink-0 text-[#0c2340]/80 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <GraduationCap size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="font-sans text-sm sm:text-[14.5px] font-bold text-[#0c2340] leading-snug">
                    Industry-Aligned Curriculum
                  </h3>
                  <p className="font-sans text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Programs designed for real-world impact
                  </p>
                </div>
              </div>

              {/* 2. World-Class Faculty */}
              <div className="flex items-start gap-3.5 group cursor-default">
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-gold shadow-xs flex items-center justify-center shrink-0 text-[#0c2340]/80 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <Lightbulb size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="font-sans text-sm sm:text-[14.5px] font-bold text-[#0c2340] leading-snug">
                    World-Class Faculty
                  </h3>
                  <p className="font-sans text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Learn from experienced academicians &amp; experts
                  </p>
                </div>
              </div>

              {/* 3. Research & Innovation */}
              <div className="flex items-start gap-3.5 group cursor-default">
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-gold shadow-xs flex items-center justify-center shrink-0 text-[#0c2340]/80 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <UsersThree size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="font-sans text-sm sm:text-[14.5px] font-bold text-[#0c2340] leading-snug">
                    Research &amp; Innovation
                  </h3>
                  <p className="font-sans text-xs text-slate-500 mt-0.5 leading-relaxed">
                    Driving solutions for a better tomorrow
                  </p>
                </div>
              </div>

              {/* 4. Vibrant Campus Life */}
              <div className="flex items-start gap-3.5 group cursor-default">
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white border-2 border-gold shadow-xs flex items-center justify-center shrink-0 text-[#0c2340]/80 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <Buildings size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="font-sans text-sm sm:text-[14.5px] font-bold text-[#0c2340] leading-snug">
                    Vibrant Campus Life
                  </h3>
                  <p className="font-sans text-xs text-slate-500 mt-0.5 leading-relaxed">
                    A diverse and inclusive community
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            >
              <a
                href="/about"
                className="group inline-flex items-center gap-2.5 rounded-lg mt-4 bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-5.5 py-3 sm:px-6 sm:py-3.5 font-sans text-xs sm:text-[13.5px] font-semibold text-white shadow-sm brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-125 active:scale-[0.98]"
              >
                <Compass size={20} weight="fill" className="text-blue-100 transition-transform duration-200 group-hover:scale-110" />
                <span>Explore About BIU</span>
                <CaretRight size={14} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Campus Visual */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="relative w-full max-w-[680px] group z-10"
            >
              <img
                src="/about.png"
                alt="Bareilly International University Campus"
                className="w-full h-[700px] object-contain rounded-xl select-none transition-transform duration-700 ease-out group-hover:scale-[1.02] origin-center"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
