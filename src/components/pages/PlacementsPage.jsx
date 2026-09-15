import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Sparkle,
  Star,
  Users,
  ArrowsOut,
  ShieldCheck,
  Lightning,
  Car,
  WifiHigh,
  Briefcase,
  Trophy,
  UsersThree,
  ForkKnife,
  CheckCircle,
  X,
  Buildings,
} from '@phosphor-icons/react';
import corpData from '../../data/placements.json';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Img from '../Img';

const EASE = [0.16, 1, 0.3, 1];

export default function PlacementsPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const cmsPage = corpData.corporatePage || corpData || {};
  const stats = cmsPage.stats || [];
  const venues = cmsPage.venues || [];

  const [activeVenueModal, setActiveVenueModal] = useState(null);

  return (
    <div className="min-h-screen bg-white text-forest-dark selection:bg-gold selection:text-forest-dark">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-[#0c2340] pt-28 pb-16 md:pt-32 md:pb-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="placementsHexDark" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#placementsHexDark)" />
          </svg>
        </div>

        <div className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (onBack) onBack();
                else window.location.href = '/';
              }}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-gold/90 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:text-gold"
            >
              <ArrowLeft size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-1" />
              {cmsPage.backButtonLabel || 'Back to Home'}
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="max-w-3xl"
          >
            <span className="font-sans text-[10px] sm:text-[13px] font-semibold uppercase tracking-[0.3em] text-gold">
              {cmsPage.badge || 'Corporate Resource Center'}
            </span>

            <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
              {cmsPage.titlePrefix || 'Global Partnerships &'}{' '}
              <span className="italic font-normal text-gold">{cmsPage.titleHighlight || 'Career Placements'}</span>
            </h1>

            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/80 sm:mt-6 sm:text-base md:text-lg">
              {cmsPage.subtitle ||
                'Bareilly International University partners with top multi-specialty healthcare networks, Fortune 500 tech firms, and pharmaceutical leaders to ensure guaranteed career pathways.'}
            </p>
          </motion.div>

          {/* Key Placement Stats Bar */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {stats.map((st, i) => (
              <motion.div
                key={i}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: EASE }}
                className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-md text-center"
              >
                <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-gold">{st.value}</div>
                <div className="mt-1 font-sans text-[11px] sm:text-xs font-light tracking-wide text-cream/80">{st.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Sectors Grid */}
      <section className="relative z-10 bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#f0f4f8] pt-16 pb-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {venues.map((venue) => (
              <div
                key={venue.id || venue.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-[#0c2340] text-white shadow-xl transition-all duration-500 hover:border-gold/60 hover:shadow-2xl"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-forest/20">
                  <Img
                    src={venue.image}
                    alt={venue.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2340] via-[#0c2340]/40 to-transparent" />
                </div>

                <div className="relative z-10 p-6 sm:p-8">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white group-hover:text-gold transition-colors">{venue.name}</h3>
                  <p className="mt-2 font-sans text-sm font-light leading-relaxed text-cream/80">{venue.description}</p>

                  <div className="mt-6">
                    <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-gold">Top Recruiting Partners:</h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {venue.layouts?.map((partner, pIdx) => (
                        <span key={pIdx} className="rounded-md border border-white/20 bg-white/10 px-3 py-1 font-sans text-xs font-medium text-cream">
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/10 pt-4">
                    <ul className="space-y-2">
                      {venue.features?.map((ft, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 font-sans text-xs text-cream/90">
                          <CheckCircle size={14} className="text-gold shrink-0" />
                          <span>{ft}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
