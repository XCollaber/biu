import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Sparkle,
  Star,
  Crown,
  Heart,
  ShieldCheck,
  WhatsappLogo,
  Car,
  UserCheck,
  Wheelchair,
  Lightning,
  Wind,
  ForkKnife,
  Compass,
  WifiHigh,
  Coffee,
  Suitcase,
  Snowflake,
  Elevator,
  Users
} from '@phosphor-icons/react';
import aboutData from '../../data/about.json';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Img from '../Img';

const EASE = [0.16, 1, 0.3, 1];

export default function AboutPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const cmsAbout = aboutData.aboutPage || {};
  const features = cmsAbout.features || [];
  const campusFacilities = cmsAbout.campusFacilities || [];

  const getFacilityIcon = (iconName) => {
    switch (iconName) {
      case 'Car':
        return <Car size={32} weight="fill" />;
      case 'UserCheck':
        return <UserCheck size={32} weight="fill" />;
      case 'Crown':
        return <Crown size={32} weight="fill" />;
      case 'Sparkle':
        return <Sparkle size={32} weight="fill" />;
      case 'Wheelchair':
        return <Wheelchair size={32} weight="fill" />;
      case 'Heart':
        return <Heart size={32} weight="fill" />;
      case 'ShieldCheck':
        return <ShieldCheck size={32} weight="fill" />;
      case 'Lightning':
        return <Lightning size={32} weight="fill" />;
      case 'Wind':
        return <Wind size={32} weight="fill" />;
      case 'ForkKnife':
        return <ForkKnife size={32} weight="fill" />;
      case 'Compass':
        return <Compass size={32} weight="fill" />;
      case 'WifiHigh':
        return <WifiHigh size={32} weight="fill" />;
      case 'Coffee':
        return <Coffee size={32} weight="fill" />;
      case 'Suitcase':
        return <Suitcase size={32} weight="fill" />;
      case 'Snowflake':
        return <Snowflake size={32} weight="fill" />;
      case 'Elevator':
        return <Elevator size={32} weight="fill" />;
      case 'Users':
        return <Users size={32} weight="fill" />;
      default:
        return <Sparkle size={32} weight="fill" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-forest-dark selection:bg-gold selection:text-forest-dark">
      <Navbar />

      {/* Hero Banner Section (Luxury Forest Dark Header) */}
      <section className="relative overflow-hidden bg-[#0c2340] pt-28 pb-16 md:pt-32 md:pb-20 text-white">
        {/* Background Hex Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="aboutHexDark" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aboutHexDark)" />
          </svg>
        </div>

        {/* Ambient Gold Glow Behind Hero */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
          {/* Back to Home Button */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-10"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                if (onBack) onBack();
                else window.location.hash = 'home';
              }}
              className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-gold/90 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:text-gold active:scale-[0.97]"
            >
              <ArrowLeft size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-1" />
              {cmsAbout.backButtonLabel || 'Back to Home'}
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="font-sans text-[10px] sm:text-[13px] font-semibold uppercase tracking-[0.3em] text-gold">
              {cmsAbout.badge || 'Our Heritage & Philosophy'}
            </span>
            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
              {cmsAbout.titlePrefix || 'Empowering Future'}{' '}
              <span className="text-gold italic font-normal">
                {cmsAbout.titleHighlight || 'Global Leaders'}
              </span>
            </h1>
            <p className="mt-5 font-sans text-base font-light leading-relaxed text-white/80 sm:text-lg">
              {cmsAbout.subtitle ||
                "Welcome to Bareilly International University — Northern India's premier multi-disciplinary institution dedicated to medical excellence, scientific innovation, and holistic student growth."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Feature Showcase Image & Stats (Warm Cream Canvas) */}
      <section className="relative z-10 -mt-8 mx-auto max-w-[1400px] px-5 pb-14 sm:px-8 sm:pb-20">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-2 shadow-[0_25px_70px_-20px_rgba(20,57,43,0.25)] ring-1 ring-black/5"
        >
          <div className="h-[320px] sm:h-[480px] md:h-[520px] lg:h-[680px] w-full overflow-hidden rounded-xl bg-forest/20">
            <Img
              src={cmsAbout.mainImage || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop'}
              alt={cmsAbout.mainImageAlt || 'BIU University Campus'}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-x-2 bottom-2 h-32 rounded-b-xl bg-gradient-to-t from-forest-dark/80 via-forest-dark/20 to-transparent pointer-events-none" />

          {/* Floating Badge Overlay */}
          <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-3 rounded-xl border border-white/20 bg-forest-dark/85 px-5 py-3 backdrop-blur-md text-white">
            <Star size={18} weight="fill" className="text-gold" />
            <span className="font-serif text-sm font-medium tracking-wide">
              Bareilly's Premier Educational Institution
            </span>
          </div>
        </motion.div>
      </section>

      {/* Story & Philosophy Section (Warm Luxury Light Canvas) */}
      <section className="relative z-10 bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#f0f4f8] pt-8 pb-16 sm:pt-14 sm:pb-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Story Text */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-gold-dark">
                {cmsAbout.storyBadge || 'The BIU Story'}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-medium text-forest-dark sm:text-4xl md:text-5xl leading-tight">
                {cmsAbout.storyTitle || 'A Sanctuary of Splendor and Warm Hospitality'}
              </h2>

              <div className="mt-6 space-y-4 font-sans text-base font-light leading-relaxed text-forest/80">
                <p>{cmsAbout.storyParagraph1}</p>
                <p>{cmsAbout.storyParagraph2}</p>
                {cmsAbout.storyParagraph3 && <p>{cmsAbout.storyParagraph3}</p>}
              </div>
            </motion.div>

            {/* Feature Cards Container (Horizontal scroll on mobile, 2-col grid on desktop) */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex snap-x snap-mandatory overflow-x-auto gap-5 pb-4 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2"
            >
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center text-center w-[82vw] max-w-[300px] flex-shrink-0 snap-center rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl border border-gold/25 bg-white p-6 sm:p-7 shadow-[0_8px_25px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(12,36,23,0.12)] hover:border-gold/60 sm:w-auto sm:flex-shrink"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-[#faf5eb] border border-gold/35 text-gold-dark shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold/15">
                    <Sparkle size={24} weight="fill" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-forest-dark transition-colors duration-300 group-hover:text-gold-dark mb-2">{feat.title}</h3>
                  <p className="font-sans text-xs sm:text-sm font-light leading-relaxed text-forest-dark/75">{feat.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Pillars / Values Section */}
      <section className="relative z-10 bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="font-sans text-[12px] font-semibold uppercase tracking-[0.28em] text-gold-dark">
              {cmsAbout.pillarsBadge || 'Our Core Pillars'}
            </span>
            <h2 className="mt-3 font-serif text-3xl font-medium text-forest-dark sm:text-4xl leading-tight">
              {cmsAbout.pillarsTitle || 'What Defines the BIU Student Experience'}
            </h2>
          </motion.div>

          <div className="mt-8 sm:mt-14 flex snap-x snap-mandatory overflow-x-auto gap-5 pb-4 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {(cmsAbout.pillars || []).map((pillar, idx) => {
              const icons = [Crown, Heart, ShieldCheck, Sparkle];
              const IconComp = icons[idx % icons.length];
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center text-center w-[82vw] max-w-[300px] flex-shrink-0 snap-center rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl border border-gold/25 bg-white p-7 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(12,36,23,0.12)] hover:border-gold/60 sm:w-auto sm:flex-shrink shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[#faf5eb] border border-gold/35 text-gold-dark shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold/15">
                    <IconComp size={26} weight="fill" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-forest-dark transition-colors duration-300 group-hover:text-gold-dark mb-2.5">{pillar.title}</h3>
                  <p className="font-sans text-xs sm:text-sm font-light leading-relaxed text-forest-dark/75">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campus Facilities & Amenities Bento Section */}
      <section className="relative z-10 bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#f0f4f8] py-16 sm:py-24 border-t border-forest/10">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-forest">
              <Sparkle size={14} weight="fill" className="text-gold-dark" />
              {cmsAbout.facilitiesBadge || 'Campus Infrastructure & Amenities'}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-forest-dark sm:text-4xl md:text-5xl">
              {cmsAbout.facilitiesTitle || 'World-Class Academic Infrastructure for Every Student'}
            </h2>
            <p className="mt-4 font-sans text-sm sm:text-base font-light text-forest/70 leading-relaxed">
              {cmsAbout.facilitiesSubtitle ||
                'Every detail at BIU is engineered to deliver a world-class educational and clinical learning experience, ensuring research excellence, comfort, and holistic development for all scholars.'}
            </p>
          </div>

          {/* Campus Facilities Cards Grid */}
          <div className="flex snap-x snap-mandatory overflow-x-auto gap-5 pb-4 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {campusFacilities.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center text-center w-[78vw] max-w-[260px] flex-shrink-0 snap-center rounded-tl-[36px] rounded-br-[36px] rounded-tr-xl rounded-bl-xl border border-gold/25 bg-white p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(12,36,23,0.12)] hover:border-gold/60 sm:w-auto sm:flex-shrink shadow-[0_8px_25px_rgba(0,0,0,0.04)]"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faf5eb] border border-gold/35 text-gold-dark shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:bg-gold/15">
                  {getFacilityIcon(item.icon)}
                </div>
                <h3 className="font-serif text-lg font-medium text-forest-dark transition-colors duration-300 group-hover:text-gold-dark mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs font-light leading-relaxed text-forest-dark/75">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Invitation Card (Bridging Light Cream to Dark Footer) */}
      <section className="relative z-10 bg-white pb-12 pt-6 sm:pb-20 sm:pt-10">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-forest/15 bg-[#0c2340] p-6 sm:p-20 md:p-16 text-center text-white shadow-2xl"
          >
            {/* Background Texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
              <svg className="h-full w-full" width="100%" height="100%">
                <defs>
                  <pattern id="ctaHex" width="60" height="52" patternUnits="userSpaceOnUse">
                    <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#ctaHex)" />
              </svg>
            </div>

            {/* Ambient Gold Glow inside Card */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-2xl sm:max-w-3xl lg:max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-3.5 py-1 sm:px-5 sm:py-2 font-sans text-[10px] sm:text-[12px] font-semibold uppercase tracking-[0.25em] text-gold">
                <Sparkle size={14} weight="fill" />
                Visit BIU Campus
              </span>
              <h2 className="mt-3 sm:mt-6 font-serif text-2xl font-medium text-white sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                {cmsAbout.ctaTitle || 'Shape Your Future at Bareilly International University'}
              </h2>
              <p className="mt-2 sm:mt-5 font-sans text-xs sm:text-lg lg:text-xl font-light text-white/80 leading-relaxed max-w-2xl mx-auto">
                {cmsAbout.ctaSubtitle ||
                  'Schedule a campus visit or counseling session with BIU Admissions Cell today.'}
              </p>
              <div className="mt-6 sm:mt-10 flex justify-center">
                <button
                  onClick={() => {
                    const phone = '917455002900';
                    const message = encodeURIComponent('Hello BIU Admissions Cell, I would like to inquire about course admissions and schedule a campus visit.');
                    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
                  }}
                  className="group inline-flex h-12 sm:h-14 max-w-full items-center justify-center gap-2 sm:gap-3 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-4 sm:px-10 font-sans shadow-md transition-all duration-300 ease-premium hover:scale-105 hover:shadow-lg hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer"
                >
                  <WhatsappLogo size={22} weight="fill" className="text-forest-dark shrink-0 transition-transform duration-300 group-hover:scale-110 sm:w-7 sm:h-7" />
                  <span className="whitespace-nowrap text-[10.5px] sm:text-[13px] font-extrabold uppercase tracking-[0.08em] sm:tracking-[0.16em] text-forest-dark">{cmsAbout.ctaButtonLabel || 'Book a Site Tour'}</span>
                  <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-lg bg-forest-dark/20 text-forest-dark transition-transform duration-300 ease-premium group-hover:translate-x-1">
                    <ArrowRight size={12} weight="bold" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
