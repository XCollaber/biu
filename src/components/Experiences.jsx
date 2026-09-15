import { motion, useReducedMotion } from 'framer-motion';
import Img from './Img';
import expData from '../data/campusLife.json';

const EASE = [0.16, 1, 0.3, 1];

const FALLBACK =
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80';

function CollageImg({ src, alt, className }) {
  return (
    <div className={`overflow-hidden rounded-xl ring-1 ring-black/5 ${className}`}>
      <Img
        src={src}
        alt={alt || 'Experience photo'}
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
        }}
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-premium hover:scale-[1.05]"
      />
    </div>
  );
}

export default function Experiences() {
  const reduceMotion = useReducedMotion();

  const rise = {
    hidden: reduceMotion ? {} : { y: 26, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
  };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const offerings = expData.offerings || [];
  const rawImages = expData.images || [];

  // Normalize images to array format
  const imageList = Array.isArray(rawImages)
    ? rawImages
    : [
        { img: rawImages.decor || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop', alt: 'BIU Medical Research Suite' },
        { img: rawImages.dining || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop', alt: 'BIU Campus Innovation Lab' },
        { img: rawImages.dance || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop', alt: 'BIU Student Auditorium' },
        { img: rawImages.reception || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop', alt: 'BIU Robotics Laboratory' },
      ];

  // Split images into two halves so the sequence (1 & 2 in Col 1, 3 & 4 in Col 2) matches original layout
  const half = Math.ceil(imageList.length / 2);
  const col1Images = imageList.slice(0, half);
  const col2Images = imageList.slice(half);

  return (
    <section id="experiences" className="relative w-full bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Left: content */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          <motion.span
            variants={rise}
            className="block text-center sm:text-left font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold-dark"
          >
            {expData.badge}
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-4 text-center sm:text-left font-serif text-4xl font-medium leading-tight text-forest-dark sm:text-5xl md:text-[3.25rem]"
          >
            {expData.title}
          </motion.h2>
          <motion.p
            variants={rise}
            className="mt-6 mx-auto sm:mx-0 text-center sm:text-left max-w-lg font-sans text-base font-light leading-relaxed text-forest/70"
          >
            {expData.subtitle}
          </motion.p>

          {/* Numbered offerings */}
          <div className="mt-10 flex flex-col divide-y divide-forest/10">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                variants={rise}
                className="group flex items-start gap-5 py-5"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 font-serif text-sm text-gold-dark transition-all duration-500 ease-premium group-hover:border-gold group-hover:bg-gold group-hover:text-forest-dark">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-forest-dark">{item.title}</h3>
                  <p className="mt-1 max-w-md font-sans text-[14px] font-light leading-relaxed text-forest/65">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: staggered collage */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1, ease: EASE }}
          className="grid grid-cols-2 gap-4 sm:gap-5"
        >
          <div className="flex flex-col gap-4 sm:gap-5">
            {col1Images.map((item, idx) => (
              <CollageImg
                key={item.img || idx}
                src={item.img}
                alt={item.alt}
                className={idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}
              />
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:mt-14 sm:gap-5">
            {col2Images.map((item, idx) => (
              <CollageImg
                key={item.img || idx}
                src={item.img}
                alt={item.alt}
                className={idx % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]'}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
