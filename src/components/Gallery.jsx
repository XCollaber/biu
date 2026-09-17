import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Images } from '@phosphor-icons/react';
import Img from './Img';
import galleryData from '../data/gallery.json';

const EASE = [0.16, 1, 0.3, 1];

const fallback = (seed) => `https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop`;

const GImg = ({ name, alt, seed, className }) => {
  if (!name) return null;
  const isExternal = name.startsWith('http://') || name.startsWith('https://') || name.startsWith('/uploads/') || name.startsWith('/');
  const src = isExternal ? name : `/gallery/${name}`;

  return (
    <div className={`group relative overflow-hidden rounded-lg ring-1 ring-black/5 ${className}`}>
      <Img
        src={src}
        alt={alt || 'Candid gallery photo'}
        loading="lazy"
        onError={(e) => {
          const fb = fallback(seed);
          if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
        }}
        className="h-full w-full object-cover transition-transform duration-[1.3s] ease-premium group-hover:scale-[1.07]"
      />
      <div className="absolute inset-0 bg-forest-dark/0 transition-colors duration-500 group-hover:bg-forest-dark/15" />
    </div>
  );
};

export default function Gallery() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { y: 24, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };

  const images = galleryData.images || [];

  return (
    <section id="gallery" className="relative w-full bg-white py-24 md:py-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={rise}
            className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold-dark"
          >
            {galleryData.badge}
          </motion.span>
          <motion.h2 variants={rise} className="mt-3 font-serif text-4xl font-medium sm:text-5xl">
            <span className="text-forest/45">{galleryData.titlePrefix}</span>{' '}
            <span className="text-forest-dark">{galleryData.titleSuffix}</span>
          </motion.h2>
          <motion.p
            variants={rise}
            className="mx-auto mt-4 max-w-md font-sans text-base font-light leading-relaxed text-forest/70"
          >
            {galleryData.subtitle}
          </motion.p>
        </motion.div>

        {/* Primary 8-image Masonry Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4"
        >
          {/* Left: two stacked large feature images */}
          <div className="grid grid-rows-2 gap-3 lg:gap-4">
            {images[0] && (
              <motion.div variants={rise} className="h-full">
                <GImg name={images[0].name} alt={images[0].alt} seed={images[0].seed} className="h-64 sm:h-72 lg:h-full" />
              </motion.div>
            )}
            {images[1] && (
              <motion.div variants={rise} className="h-full">
                <GImg name={images[1].name} alt={images[1].alt} seed={images[1].seed} className="h-64 sm:h-72 lg:h-full" />
              </motion.div>
            )}
          </div>

          {/* Right: two-column staggered masonry */}
          <div className="grid grid-cols-2 gap-3 lg:gap-4">
            <div className="flex flex-col gap-3 lg:gap-4">
              {images[2] && (
                <motion.div variants={rise}>
                  <GImg name={images[2].name} alt={images[2].alt} seed={images[2].seed} className="aspect-[4/3]" />
                </motion.div>
              )}
              {images[3] && (
                <motion.div variants={rise}>
                  <GImg name={images[3].name} alt={images[3].alt} seed={images[3].seed} className="aspect-[3/4]" />
                </motion.div>
              )}
              {images[4] && (
                <motion.div variants={rise}>
                  <GImg name={images[4].name} alt={images[4].alt} seed={images[4].seed} className="aspect-[3/4]" />
                </motion.div>
              )}
            </div>
            <div className="flex flex-col gap-3 lg:gap-4">
              {images[5] && (
                <motion.div variants={rise}>
                  <GImg name={images[5].name} alt={images[5].alt} seed={images[5].seed} className="aspect-[3/5]" />
                </motion.div>
              )}
              {images[6] && (
                <motion.div variants={rise}>
                  <GImg name={images[6].name} alt={images[6].alt} seed={images[6].seed} className="aspect-[4/3]" />
                </motion.div>
              )}
              {images[7] && (
                <motion.div variants={rise}>
                  <GImg name={images[7].name} alt={images[7].alt} seed={images[7].seed} className="aspect-[3/3]" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* View All Photos CTA Button */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-12 flex justify-center"
        >
          <a
            href="/gallery"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/gallery';
            }}
            className="group inline-flex h-13 sm:h-14 items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-gradient-to-r from-[#0c2340]/95 via-[#102d52]/90 to-[#163860]/95 backdrop-blur-md px-6 font-sans text-xs sm:text-[12.5px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(8,23,43,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:from-[#163860]/95 hover:via-[#102d52]/90 hover:to-[#0c2340]/95 hover:shadow-[0_14px_32px_rgba(8,23,43,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-0 active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
          >
            <Images size={18} weight="fill" className="text-gold-light shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span>View Full Gallery</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-gold-light transition-all duration-200 group-hover:translate-x-1 group-hover:bg-white/20 group-hover:text-white">
              <ArrowRight size={12} weight="bold" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
