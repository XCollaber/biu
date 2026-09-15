import { motion, useReducedMotion } from 'framer-motion';
import {
  FileText,
  ArrowLeft,
  CheckCircle,
  Scales,
  CalendarCheck,
  ShieldWarning,
  Handshake,
  Gavel,
  ShieldCheck,
  Lock,
  Eye,
  EnvelopeSimple,
  Phone,
} from '@phosphor-icons/react';
import termsData from '../../data/terms.json';
import Footer from '../Footer';
import Navbar from '../Navbar';

const EASE = [0.16, 1, 0.3, 1];

const ICON_MAP = {
  Handshake,
  CalendarCheck,
  Scales,
  CheckCircle,
  ShieldWarning,
  Gavel,
  ShieldCheck,
  Lock,
  Eye,
  FileText,
  EnvelopeSimple,
  Phone,
};

export default function TermsPage({ onBack }) {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const { badge, title, subtitle, backButtonLabel, sections } = termsData;

  return (
    <div className="min-h-screen bg-cream text-forest selection:bg-gold/30">
      <Navbar />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-forest-dark pb-16 pt-28 sm:pb-24 sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest/40 via-forest-dark to-forest-dark opacity-90" />
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
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
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-gold/90 backdrop-blur-md transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:text-gold cursor-pointer"
            >
              <ArrowLeft size={16} weight="bold" className="transition-transform duration-300 group-hover:-translate-x-1" />
              {backButtonLabel || 'Back to Home'}
            </a>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="font-sans text-[10px] sm:text-[13px] font-semibold uppercase tracking-[0.3em] text-gold">
              {badge || 'Service Guidelines & Policies'}
            </span>
            <h1 className="mt-3 font-serif text-3xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
              {title || 'Terms & Conditions'}
            </h1>
            <p className="mt-4 font-sans text-sm sm:text-base font-light leading-relaxed text-white/75">
              {subtitle || 'General terms, admission guidelines, and code of conduct governing academic sessions and campus living at Bareilly International University.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative z-10 -mt-8 px-5 pb-24 sm:-mt-12 sm:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {sections &&
            sections.map((sec, idx) => {
              const Icon = ICON_MAP[sec.icon] || FileText;
              return (
                <motion.div
                  key={sec.title || idx}
                  variants={fade}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.05 }}
                  className="rounded-2xl border border-forest/10 bg-white/90 p-6 sm:p-10 shadow-[0_10px_30px_-15px_rgba(20,57,43,0.08)] backdrop-blur-md transition-all duration-500 hover:border-gold/30 hover:shadow-[0_20px_40px_-20px_rgba(20,57,43,0.12)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-dark">
                      <Icon size={22} weight="fill" />
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-medium text-forest-dark">
                      {sec.title}
                    </h2>
                  </div>

                  <div className="mt-5 space-y-3 font-sans text-sm sm:text-[15px] font-light leading-relaxed text-forest/75">
                    {Array.isArray(sec.content) ? (
                      sec.content.map((paragraph, pIdx) => <p key={pIdx}>{paragraph}</p>)
                    ) : (
                      <p>{sec.content}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
