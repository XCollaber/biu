import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowLeft, X, CaretLeft, CaretRight, MagnifyingGlassPlus } from '@phosphor-icons/react';
import galleryData from '../../data/gallery.json';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Img from '../Img';

const EASE = [0.16, 1, 0.3, 1];
const fallback = (seed) => `https://picsum.photos/seed/${seed || 'biu'}/1000/800`;

export default function GalleryPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // CMS Page Configuration & Image Archives
  const cmsPage = galleryData.galleryPage || {};
  const allImages = galleryData.images || [];

  // Lightbox keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % allImages.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, allImages.length]);

  return (
    <div className="min-h-screen bg-[#0c2340] text-white selection:bg-gold selection:text-forest-dark">
      <Navbar />

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden pt-28 pb-14 md:pt-32 md:pb-18">
        {/* Background Texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg className="h-full w-full" width="100%" height="100%">
            <defs>
              <pattern id="galleryHex" width="60" height="52" patternUnits="userSpaceOnUse">
                <path d="M30 2 L56 16 V46 L30 60 L4 46 V16 Z" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#galleryHex)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
          {/* Back to Home Button */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8"
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
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="font-sans text-[10px] sm:text-[13px] font-semibold uppercase tracking-[0.3em] text-gold">
              {cmsPage.badge || 'Visual Archives'}
            </span>
            <h1 className="mt-3 font-serif text-4xl font-medium leading-tight text-white sm:text-5xl md:text-6xl">
              {cmsPage.titlePrefix || 'BIU'}{' '}
              <span className="text-gold italic font-normal">
                {cmsPage.titleHighlight || 'Photo Gallery'}
              </span>
            </h1>
            <p className="mt-5 font-sans text-base font-light leading-relaxed text-white/80 sm:text-lg">
              {cmsPage.subtitle ||
                'Explore the complete visual journey of Bareilly International University. Browse clinical labs, library reading halls, campus grounds, and academic events.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Gallery Grid Section */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 pb-32 sm:px-8">
        {allImages.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-white/60">
              {cmsPage.emptyStateMessage || 'No photos available in gallery.'}
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {allImages.map((img, idx) => {
                const isExternal = img.name?.startsWith('http') || img.name?.startsWith('/uploads/') || img.name?.startsWith('/');
                const src = isExternal ? img.name : `/gallery/${img.name}`;
                const titleText = img.caption || img.alt || 'Campus Photo';

                return (
                  <motion.div
                    key={img.name || idx}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-forest/40">
                      <Img
                        src={src}
                        alt={img.alt || titleText}
                        loading="lazy"
                        onError={(e) => {
                          const fb = fallback(img.seed || idx);
                          if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                        }}
                        className="h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-110"
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-sans text-[11px] font-medium uppercase tracking-wider text-gold">
                            BIU Archives
                          </span>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/90 text-forest-dark shadow-md">
                            <MagnifyingGlassPlus size={16} weight="bold" />
                          </span>
                        </div>
                        <p className="font-serif text-base text-white/95 line-clamp-2">
                          {titleText}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close Lightbox"
            >
              <X size={24} weight="bold" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
              aria-label="Previous Image"
            >
              <CaretLeft size={24} weight="bold" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % allImages.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
              aria-label="Next Image"
            >
              <CaretRight size={24} weight="bold" />
            </button>

            {/* Lightbox Content Container */}
            <div
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-2xl border border-white/15 bg-forest-dark/80 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const currentImg = allImages[lightboxIndex];
                if (!currentImg) return null;
                const isExternal = currentImg.name?.startsWith('http') || currentImg.name?.startsWith('/uploads/') || currentImg.name?.startsWith('/');
                const src = isExternal ? currentImg.name : `/gallery/${currentImg.name}`;
                const captionText = currentImg.caption || currentImg.alt || 'BIU Moments';

                return (
                  <div className="flex flex-col items-center">
                    <Img
                      src={src}
                      alt={currentImg.alt || captionText}
                      onError={(e) => {
                        const fb = fallback(currentImg.seed || lightboxIndex);
                        if (e.currentTarget.src !== fb) e.currentTarget.src = fb;
                      }}
                      className="max-h-[75vh] max-w-full object-contain"
                    />
                    <div className="w-full border-t border-white/10 bg-black/60 p-4 text-center">
                      <p className="font-serif text-lg text-white">{captionText}</p>
                      <p className="mt-1 font-sans text-xs uppercase tracking-widest text-gold">
                        Image {lightboxIndex + 1} of {allImages.length}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
