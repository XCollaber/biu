import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  Certificate,
  Buildings,
  CheckCircle,
  FileText,
  Scales
} from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import PublicDisclosureExplorer from './PublicDisclosureExplorer';
import disclosureData from '../../data/disclosure.json';

const EASE = [0.16, 1, 0.3, 1];

export default function PublicDisclosurePage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const header = disclosureData.pageHeader || {};

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-[#0c2340] selection:text-white font-sans">
      {/* Top University Navigation */}
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-[#0c2340] pt-28 pb-14 md:pt-36 md:pb-16 text-white">
        {/* Subtle geometric pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="disclosurePattern" width="48" height="48" patternUnits="userSpaceOnUse">
                <circle cx="24" cy="24" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#disclosurePattern)" />
          </svg>
        </div>

        {/* Ambient atmospheric glows */}
        <div className="pointer-events-none absolute top-1/2 left-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#163860]/40 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 right-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {/* Back to Home Button */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-6"
          >
            <a
              href="/"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:border-amber-400/40 hover:bg-white/10 hover:text-amber-200"
            >
              <ArrowLeft size={14} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </a>
          </motion.div>

          <div className="max-w-4xl">
            {/* Regulatory Badge */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 mb-4 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-amber-200">
                {header.badge || 'MANDATORY STATUTORY DISCLOSURE'}
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="font-times text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium text-white tracking-[0.01em] leading-[1.12] mb-4"
            >
              {header.title}{' '}
              <span className="text-amber-300 italic font-serif">
                {header.highlight}
              </span>
            </motion.h1>

            {/* Description Subtitle */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="font-sans text-xs sm:text-sm md:text-base text-slate-300/90 font-normal leading-relaxed max-w-3xl mb-8"
            >
              {header.description}
            </motion.p>

            {/* Statutory Key Indicators / Chips */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl"
            >
              {header.quickStats?.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-3.5 backdrop-blur-sm"
                >
                  <p className="font-times text-lg sm:text-xl font-bold text-amber-300">
                    {stat.value}
                  </p>
                  <p className="text-[10.5px] sm:text-[11px] font-semibold text-slate-300 uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Interactive Explorer Island */}
      <main>
        <PublicDisclosureExplorer />
      </main>

      {/* University Footer */}
      <Footer />
    </div>
  );
}
