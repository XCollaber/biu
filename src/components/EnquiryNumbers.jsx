import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from '@phosphor-icons/react';
import enquiryData from '../data/enquiryNumbers.json';

const EASE = [0.16, 1, 0.3, 1];

export default function EnquiryNumbers() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  const counselors = enquiryData.counselors || [];

  return (
    <section id="enquiry-numbers" className="relative w-full bg-[#fbfbfd] py-14 sm:py-18 md:pt-10 md:pb-20 font-sans overflow-hidden border-t border-slate-200/30">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-start gap-1 mb-8 sm:mb-10"
        >
          {/* Eyebrow Tag */}
          <div className="flex items-center gap-2.5 mb-2">
            <span className="w-8 h-[3.5px] bg-gold rounded-full" />
            <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
              {enquiryData.badge || 'ADMISSION HELPLINE'}
            </span>
          </div>

          <h2 className="font-times text-2xl sm:text-3xl lg:text-[2.45rem] font-medium text-[#0c2340] leading-[1.12]">
            {enquiryData.title || 'Admission Enquiry Numbers'}
          </h2>
          <p className="mt-1 font-sans text-xs sm:text-[13px] text-slate-600 font-light leading-relaxed max-w-2xl">
            {enquiryData.subtitle || 'Connect directly with our designated department counselors and admission officers for guidance on eligibility, seats & fee structures.'}
          </p>
        </motion.div>

        {/* 4-Column Minimal Professional Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          {counselors.map((counselor, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: (idx % 4) * 0.04 }}
              className="group rounded-lg border border-slate-200/80 bg-white p-4 sm:px-5 sm:py-4 transition-all duration-200 hover:border-slate-300 hover:shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Department / Stream Discipline Tag */}
                <span className="inline-block font-sans text-[11px] font-bold uppercase tracking-wider text-cyan-800">
                  {counselor.discipline}
                </span>

                {/* Counselor Name */}
                <h3 className="font-newsreader text-[16px] sm:text-[16.5px] font-semibold text-[#0c2340] mt-1.5 leading-snug">
                  {counselor.name}
                </h3>
              </div>

              {/* Phone Contacts */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
                <Phone size={14} weight="fill" className="text-cyan-800 shrink-0" />
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                  {(counselor.phones || []).map((phone, pIdx) => {
                    const cleanPhone = phone.replace(/\s+/g, '');
                    return (
                      <span key={pIdx} className="inline-flex items-center">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="font-sans text-xs sm:text-[13px] font-semibold text-slate-700 hover:text-cyan-700 hover:underline transition-colors"
                        >
                          {phone}
                        </a>
                        {pIdx < (counselor.phones || []).length - 1 && (
                          <span className="text-slate-300 ml-1.5">/</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

