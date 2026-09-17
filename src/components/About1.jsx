import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export default function About() {
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: '12+', label: 'Campuses' },
    { value: '50+', label: 'Acres' },
    { value: '275+', label: 'Programs' },
    { value: '470+', label: 'Faculty members' },
    { value: '1000+', label: 'Hospital Beds' },
    { value: '75+', label: 'Research & Innovation Labs' },
  ];

  return (
    <section id="about" className="relative w-full bg-white pt-20 sm:pt-24 md:pt-32 pb-32 sm:pb-40 md:pb-48 overflow-hidden font-[Plus_Jakarta_Sans,sans-serif]">
      {/* Background Center Banyan Tree Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img
          src="/tree.png"
          alt="BIU Banyan Tree Emblem"
          className="mt-16 w-full max-w-3xl md:max-w-lg opacity-[1] object-contain filter sepia-[0.35] brightness-15 saturate-150 transform scale-110 md:scale-155"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1300px] px-5 sm:px-8 flex flex-col items-center text-center">
        {/* Main Central Headline */}
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="max-w-4xl text-2xl sm:text-4xl md:text-[40px] font-bold uppercase leading-[1.25] tracking-tight text-[#1e3a60] font-['Montserrat',sans-serif]"
        >
          STEP INTO THE WORLD OF EVIDENCE-DRIVEN, COMPETENCY-BASED LEARNING.
        </motion.h2>

        {/* Row of 6 Gold Stat Circles */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="my-10 md:my-14 flex flex-wrap items-start justify-center gap-5 sm:gap-6 md:gap-8 w-full"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center max-w-[100px] sm:max-w-[125px] group">
              {/* Circular Badge */}
              <div className="w-21 h-21 sm:w-24 sm:h-24 md:w-22 md:h-22 rounded-full bg-white border-2 border-amber-200/50 shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
                <span className="font-extrabold text-xl sm:text-2xl md:text-[26px] text-[#0A2540] tracking-tight font-['Montserrat',sans-serif]">
                  {stat.value}
                </span>
              </div>

              {/* Label below */}
              <span className="mt-3 text-xs sm:text-sm font-bold text-[#1e3a60] text-center leading-tight tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Bottom Narrative Description */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          className="max-w-3xl text-sm sm:text-base text-neutral-600 font-normal leading-relaxed text-center px-4 mb-6 sm:mb-10"
        >
          Founded in 2016 and recognized as a premier university, BIU is a dynamic hub of multidisciplinary learning. With exceptional faculty, state-of-the-art facilities, and an industry-aligned curriculum, it fuels innovation, research, and a vibrant campus life — shaping future leaders ready to make an impact.
        </motion.p>
      </div>
    </section>
  );
}
