import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  Sparkle,
  Star,
  Hospital,
  ShieldCheck,
  Certificate,
  Flask,
} from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ResearchExplorer from './ResearchExplorer';
import researchData from '../../data/research.json';

const EASE = [0.16, 1, 0.3, 1];

export default function ResearchPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const header = researchData.pageHeader || {};

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 selection:bg-[#0c2340] selection:text-white">
      {/* Top University Navigation */}
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-[#0c2340] pt-28 pb-14 md:pt-36 md:pb-18 text-white">
        {/* Subtle geometric pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="researchHexDark" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#researchHexDark)" />
          </svg>
        </div>

        {/* Subtle ambient lighting */}
        <div className="pointer-events-none absolute top-1/2 left-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#163860]/40 blur-[120px]" />
        <div className="pointer-events-none absolute top-1/3 right-1/4 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8">
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
              Back to Home
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="max-w-4xl"
          >
            {/* <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300 mb-3">
              <Sparkle size={13} weight="fill" className="text-amber-400" />
              <span>{header.badge || 'Research & Innovation'}</span>
            </div> */}

            <h1 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Research & Development Cell{' '}
              <span className="font-serif text-white">at BIU</span>
            </h1>

            <p className="mt-3.5 font-sans text-sm sm:text-base md:text-lg font-light leading-relaxed text-slate-200/90 max-w-3xl">
              {header.description ||
                'Fostering interdepartmental and inter-institutional collaborative research programmes across Medical & Health Sciences, Dental, Pharmacy, Nursing, Allied Healthcare, and Technology.'}
            </p>

            {/* Quick Accreditation Badges */}
            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-300">
              {/* <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                <Certificate size={16} className="text-amber-400" />
                <span>DSIR / SIRO Recognized Organisation</span>
              </div> */}
              {/* <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                <Hospital size={16} className="text-rose-400" />
                <span>1000+ Bed Teaching Hospital Trials</span>
              </div> */}
              {/* <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/10">
                <Flask size={16} className="text-amber-400" />
                <span>ICMR & National Research Grants</span>
              </div> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Research Explorer */}
      <ResearchExplorer />

      {/* Global University Footer */}
      <Footer />
    </div>
  );
}