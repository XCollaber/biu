import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, SquaresFour } from '@phosphor-icons/react';
import Img from './Img';
import spacesData from '../data/faculties.json';

const EASE = [0.16, 1, 0.3, 1];

const FALLBACK =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80';

function FacultyCard({ space, featured }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl ring-1 ring-black/5 ${
        featured ? 'h-72 sm:h-80 lg:h-[22rem]' : 'h-56 sm:h-60'
      }`}
    >
      <Img
        src={space.img}
        alt={space.name}
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:from-black/85" />

      <div className={`absolute inset-x-0 bottom-0 flex flex-col ${featured ? 'p-6' : 'p-5'}`}>
        <h3
          className={`font-serif font-medium text-white ${
            featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {space.name}
        </h3>
        {space.desc && (
          <p className="mt-1 max-w-md font-sans text-[13px] font-light leading-snug text-white/80">
            {space.desc}
          </p>
        )}
        <span className="mt-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-gold-light">
          {space.stats}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
    </div>
  );
}

export default function Faculties() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { y: 28, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };

  const featured = spacesData.featured || [];
  const secondary = spacesData.secondary || [];

  return (
    <section id="faculties" className="relative w-full overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white/60 px-3.5 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-dark backdrop-blur-md">
              <SquaresFour size={14} weight="bold" />
              {spacesData.badge || 'Academic Colleges'}
            </span>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-forest-dark sm:text-4xl md:text-5xl">
              {spacesData.title || 'Colleges & Faculties'}
            </h2>
            <p className="mt-3 font-sans text-[15px] font-light leading-relaxed text-forest/70">
              {spacesData.subtitle}
            </p>
          </div>

          <a
            href="/faculties"
            className="group inline-flex items-center gap-3 self-start rounded-full border border-forest-dark/20 bg-forest-dark px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition-all duration-500 ease-premium hover:border-gold hover:bg-gold hover:text-forest-dark active:scale-[0.98]"
          >
            {spacesData.ctaLabel || 'View All Faculties'}
            <ArrowRight
              size={14}
              weight="bold"
              className="transition-transform duration-500 ease-premium group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {featured.map((space) => (
            <FacultyCard key={space.name} space={space} featured />
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {secondary.map((space) => (
            <FacultyCard key={space.name} space={space} />
          ))}
        </div>
      </div>
    </section>
  );
}
