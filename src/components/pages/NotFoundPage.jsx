import { motion, useReducedMotion } from 'framer-motion';
import { House, Sparkle, ArrowRight, Bed, MapPin, WhatsappLogo } from '@phosphor-icons/react';
import Logo from '../Logo';
import siteData from '../../data/site.json';
import Navbar from '../Navbar';
import Footer from '../Footer';

const EASE = [0.16, 1, 0.3, 1];

export default function NotFoundPage({ onGoHome }) {
  const reduceMotion = useReducedMotion();

  const handleHomeClick = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
    window.location.hash = '';
    if (onGoHome) {
      onGoHome();
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0c2340] text-white selection:bg-gold/30">
      <Navbar />

      {/* Main 404 Showcase */}
      <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 pt-20 pb-8 sm:px-8 sm:py-32">
        {/* Ambient lighting glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest/50 via-forest-dark to-forest-dark opacity-90" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          {/* Badge */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 sm:px-4 sm:py-1.5 backdrop-blur-md"
          >
            <Sparkle size={12} weight="fill" className="text-gold shrink-0 sm:w-[14px] sm:h-[14px]" />
            <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-gold">
              Error 404 &bull; Page Not Found
            </span>
          </motion.div>

          {/* Large 404 Header */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="mt-4 sm:mt-6"
          >
            <h1 className="font-serif text-7xl font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-gold/70 sm:text-8xl md:text-9xl">
              404
            </h1>
            <h2 className="mt-2 font-serif text-2xl font-medium text-white sm:text-3xl md:text-4xl">
              Page Not Found
            </h2>
            <p className="mx-auto mt-4 max-w-lg font-sans text-sm sm:text-base font-light leading-relaxed text-white/75">
              The page you are searching for might have been moved or renamed. Allow us to guide you back to Bareilly International University.
            </p>
          </motion.div>

          {/* Navigation Action Buttons */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="mt-6 sm:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button
              onClick={handleHomeClick}
              className="group inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light border border-gold-light/60 px-8 font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-forest-dark shadow-md transition-all duration-300 ease-premium hover:scale-105 hover:shadow-lg hover:from-gold-light hover:to-gold-dark active:scale-95 cursor-pointer"
            >
              <House size={18} weight="fill" className="text-forest-dark shrink-0" />
              <span>Return to Home</span>
              <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Quick links footer cards inside 404 */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-6 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4 text-center sm:text-left"
          >
            <a
              href="/faculties"
              className="group flex flex-col items-center sm:items-start rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:p-4 transition-all duration-300 hover:border-gold/50 hover:bg-white/10"
            >
              <Bed size={16} weight="fill" className="text-gold transition-transform duration-300 group-hover:scale-110 sm:w-5 sm:h-5" />
              <div className="mt-1.5 font-serif text-[11px] sm:text-sm font-medium leading-tight text-white">BIU Faculties</div>
              <div className="mt-0.5 font-sans text-[9px] sm:text-[11px] leading-tight text-white/50">Academic Departments</div>
            </a>

            <a
              href="https://maps.app.goo.gl/WAZpvuSe3wtQNKCu5"
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center sm:items-start rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:p-4 transition-all duration-300 hover:border-gold/50 hover:bg-white/10"
            >
              <MapPin size={16} weight="fill" className="text-gold transition-transform duration-300 group-hover:scale-110 sm:w-5 sm:h-5" />
              <div className="mt-1.5 font-serif text-[11px] sm:text-sm font-medium leading-tight text-white">Locate Us</div>
              <div className="mt-0.5 font-sans text-[9px] sm:text-[11px] leading-tight text-white/50">Bareilly, UP</div>
            </a>

            <a
              href={`https://wa.me/${siteData.whatsappPhone || '917455002900'}`}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col items-center sm:items-start rounded-2xl border border-white/10 bg-white/5 p-2.5 sm:p-4 transition-all duration-300 hover:border-gold/50 hover:bg-white/10"
            >
              <WhatsappLogo size={16} weight="fill" className="text-gold transition-transform duration-300 group-hover:scale-110 sm:w-5 sm:h-5" />
              <div className="mt-1.5 font-serif text-[11px] sm:text-sm font-medium leading-tight text-white">Concierge</div>
              <div className="mt-0.5 font-sans text-[9px] sm:text-[11px] leading-tight text-white/50">WhatsApp Assistance</div>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
