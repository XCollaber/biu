import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Images } from '@phosphor-icons/react';
import Img from './Img';
import galleryData from '../data/gallery.json';

const EASE = [0.16, 1, 0.3, 1];

const fallback = (seed) => `https://picsum.photos/seed/${seed || 'biu'}/700/800`;

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
    <section id="gallery" className="relative w-full bg-white py-24 md:py-32">
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
            href="#gallery-page"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = 'gallery-page';
              window.scrollTo(0, 0);
            }}
            className="group inline-flex h-14 items-center gap-3 rounded-xl bg-[#0c2340] border border-gold/50 px-8 font-sans text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#f7e7b4] shadow-[0_8px_30px_rgba(12,35,64,0.3)] transition-all duration-300 ease-premium hover:bg-[#163860] hover:border-gold hover:scale-105 hover:shadow-[0_10px_35px_rgba(212,175,55,0.35)] active:scale-95 cursor-pointer"
          >
            <Images size={18} weight="fill" className="text-gold shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span>View Full Gallery</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-gold/20 text-gold transition-transform duration-300 ease-premium group-hover:translate-x-1">
              <ArrowRight size={13} weight="bold" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
