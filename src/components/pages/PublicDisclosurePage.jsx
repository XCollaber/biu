import { ArrowLeft } from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import PublicDisclosureExplorer from './PublicDisclosureExplorer';
import disclosureData from '../../data/disclosure.json';

export default function PublicDisclosurePage({ onBack }) {
  const header = disclosureData.pageHeader || {};

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-gold selection:text-[#0c2340]">
      {/* Top University Navigation */}
      <Navbar />

      {/* TOP HERO HEADER - Replicating the News Page Signature Header */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-28 pb-8 sm:pt-32 sm:pb-12 font-sans">
        {/* Subtle Background Pattern - Double-Line Diamond Lattice */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden="true">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="disclosure-heritage-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 48 24 L 24 48 L 0 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.65" />
                <path d="M 24 9 L 39 24 L 24 39 L 9 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.60" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#disclosure-heritage-lattice)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          {/* Breadcrumb / Back button */}
          <div className="mb-4 sm:mb-5 flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
              className="group inline-flex items-center gap-2 rounded-md border border-slate-300/80 bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#0c2340]/90 hover:via-[#102d52]/90 hover:to-[#163860]/70 hover:text-white hover:brightness-125 hover:shadow-md active:scale-[0.98]"
            >
              <ArrowLeft size={14} weight="bold" className="transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-8 h-[3.5px] bg-gold rounded-full" />
              <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                {header.badge || 'MANDATORY STATUTORY DISCLOSURE'}
              </span>
            </div>
            <h1 className="font-times text-2xl sm:text-3xl lg:text-[2.6rem] font-medium text-[#0c2340] leading-[1.15]">
              Self Public Disclosure
            </h1>
          </div>
        </div>
      </section>

      {/* Main Interactive Table Section */}
      <main>
        <PublicDisclosureExplorer />
      </main>

      {/* University Footer */}
      <Footer />
    </div>
  );
}
