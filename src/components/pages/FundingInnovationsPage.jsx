import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import FundingInnovationsExplorer from './FundingInnovationsExplorer';
import fundingData from '../../data/fundingInnovations.json';

const EASE = [0.16, 1, 0.3, 1];

export default function FundingInnovationsPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const header = fundingData.pageHeader || {};

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
              <pattern id="fundingHexDark" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fundingHexDark)" />
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
            <h1 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Funding & Innovations{' '}
              <span className="font-serif text-white">at BIU</span>
            </h1>

            <p className="mt-3.5 font-sans text-sm sm:text-base md:text-lg font-light leading-relaxed text-slate-200/90 max-w-3xl">
              {header.description ||
                'Accelerating healthcare breakthroughs, national ICMR funded research projects, innovative medical device patents, and startup incubation at Bareilly Medtech & Innovation Incubation Lab.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Interactive Funding & Innovations Explorer */}
      <FundingInnovationsExplorer />

      {/* Global University Footer */}
      <Footer />
    </div>
  );
}