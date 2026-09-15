import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkle, Star, Users, ArrowsOut, ShieldCheck, Lightning, Car, Armchair, WhatsappLogo } from '@phosphor-icons/react';
import spacesData from '../../data/faculties.json';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Img from '../Img';

const EASE = [0.16, 1, 0.3, 1];

export default function FacultiesPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const cmsPage = spacesData.spacesPage || {};
  const spacesList = cmsPage.spacesList || [];
  const amenities = cmsPage.amenities || [];

  return (
    <div className="min-h-screen bg-white text-forest-dark selection:bg-gold selection:text-forest-dark">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-[#0c2340] pt-28 pb-16 md:pt-32 md:pb-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="facultiesHexDark" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#facultiesHexDark)" />
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
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-gold/90 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:text-gold"
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
              {cmsPage.badge || 'Academic Departments'}
            </span>

            <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
              {cmsPage.titlePrefix || 'Explore Our'}{' '}
              <span className="italic font-normal text-gold">{cmsPage.titleHighlight || 'Colleges & Faculties'}</span>
            </h1>

            <p className="mt-4 font-sans text-sm font-light leading-relaxed text-cream/80 sm:mt-6 sm:text-base md:text-lg">
              {cmsPage.subtitle ||
                'Bareilly International University houses specialized colleges recognized by national regulatory bodies including NMC, DCI, PCI, INC, BCI, and AICTE.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Feature Showcase Image */}
      <section className="relative z-10 -mt-8 mx-auto max-w-[1400px] px-5 sm:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-[0_25px_70px_-20px_rgba(20,57,43,0.25)] ring-1 ring-black/5"
        >
          <div className="aspect-[4/3] sm:aspect-auto sm:h-[420px] md:h-[480px] lg:h-[540px] xl:h-[600px] w-full overflow-hidden rounded-xl bg-forest/20">
            <Img
              src={cmsPage.heroImage || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop'}
              alt={cmsPage.heroImageAlt || 'BIU Campus Infrastructure'}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-x-2 bottom-2 h-32 rounded-b-xl bg-gradient-to-t from-forest-dark/80 via-forest-dark/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-3 rounded-xl border border-white/20 bg-forest-dark/85 px-5 py-3 backdrop-blur-md text-white">
            <Star size={18} weight="fill" className="text-gold" />
            <span className="font-serif text-sm font-medium tracking-wide">
              {cmsPage.heroImageCaption || 'BIU Campus • Excellence in Professional Education'}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Detailed Faculties Collection Grid */}
      <section className="relative z-10 bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#f0f4f8] pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {spacesList.map((space) => (
              <div
                key={space.id || space.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-[#0c2340] text-white shadow-xl transition-all duration-500 hover:border-gold/60 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute -top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/40 blur-3xl opacity-85 transition-all duration-500 group-hover:bg-gold/55 group-hover:opacity-100" />

                <div>
                  <div className="relative h-56 sm:h-64 lg:h-56 xl:h-64 w-full overflow-hidden bg-forest/20">
                    <Img
                      src={space.img}
                      alt={space.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  <div className="relative z-10 p-5 sm:p-6">
                    <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold">{space.category}</span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl font-medium text-white transition-colors duration-300 group-hover:text-gold">{space.name}</h3>
                    <p className="mt-2 font-sans text-xs sm:text-sm font-light leading-relaxed text-cream/90">{space.desc}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {space.capacity && (
                        <div className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-forest-dark/30 px-2.5 py-1 font-sans text-[10.5px] sm:text-[11px] font-medium text-cream backdrop-blur-md">
                          <Users size={13} className="text-gold" />
                          <span>{space.capacity}</span>
                        </div>
                      )}
                      {space.area && (
                        <div className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-forest-dark/30 px-2.5 py-1 font-sans text-[10.5px] sm:text-[11px] font-medium text-cream backdrop-blur-md">
                          <ArrowsOut size={13} className="text-gold" />
                          <span>{space.area}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions CTA Banner */}
      <section className="relative z-10 bg-white pb-12 pt-6 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-forest/15 bg-[#0c2340] p-8 sm:p-20 md:p-24 text-center text-white shadow-2xl"
          >
            <div className="relative z-10 mx-auto max-w-2xl sm:max-w-3xl lg:max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 sm:px-5 sm:py-2 font-sans text-[10px] sm:text-[12px] font-semibold uppercase tracking-[0.25em] text-gold">
                <Sparkle size={14} weight="fill" />
                Admissions Open 2026-27
              </span>
              <h2 className="mt-3 sm:mt-6 font-serif text-2xl font-medium text-white sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                {cmsPage.ctaTitle || 'Take the First Step Toward Excellence'}
              </h2>
              <p className="mt-2 sm:mt-5 font-sans text-xs sm:text-lg lg:text-xl font-light text-white/80 leading-relaxed max-w-2xl mx-auto">
                {cmsPage.ctaSubtitle ||
                  'Connect with BIU admissions counselors for course eligibility, fee details, and campus visit scheduling.'}
              </p>

              <div className="mt-6 sm:mt-10 flex justify-center">
                <a
                  href="/#contact"
                  className="group inline-flex h-12 sm:h-14 max-w-full items-center justify-center gap-2 sm:gap-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-4 sm:px-10 font-sans shadow-[0_8px_32px_rgba(212,175,55,0.45)] transition-all duration-300 ease-premium hover:scale-105 hover:shadow-[0_12px_40px_rgba(212,175,55,0.65)] hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer"
                >
                  <span className="whitespace-nowrap text-[10.5px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] sm:tracking-[0.16em] text-forest-dark">Apply Now 2026</span>
                  <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-1">
                    <ArrowRight size={12} weight="bold" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
