import { motion, useReducedMotion } from 'framer-motion';
import { PhoneCall, UserCheck } from '@phosphor-icons/react';
import enquiryData from '../data/enquiryNumbers.json';

const EASE = [0.16, 1, 0.3, 1];

export default function EnquiryNumbers() {
  const reduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  const counselors = enquiryData.counselors || [];

  return (
    <section id="enquiry-numbers" className="relative w-full bg-[#fbfbfd] py-14 sm:py-18 md:pt-14 md:pb-20 font-sans overflow-hidden border-t border-slate-200/70">
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

        {/* 4-Column Grid of Counselor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4.5">
          {counselors.map((counselor, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: (idx % 4) * 0.05 }}
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-4.5 shadow-xs hover:shadow-[0_16px_32px_-8px_rgba(12,35,64,0.12)] hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-start justify-between gap-2">
                  <span className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-cyan-800 bg-slate-50 border border-slate-200/70 px-2 py-0.5 rounded-md line-clamp-1">
                    {counselor.discipline}
                  </span>
                  <div className="shrink-0 w-7 h-7 rounded-lg bg-blue-50/80 border border-blue-200/70 flex items-center justify-center text-cyan-800 transition-colors group-hover:bg-[#0c2340] group-hover:text-white group-hover:border-[#0c2340]">
                    <PhoneCall size={14} weight="fill" />
                  </div>
                </div>

                {/* Counselor Name */}
                <h3 className="font-newsreader text-[15.5px] sm:text-base font-semibold text-[#0c2340] mt-3 group-hover:text-gold-dark transition-colors">
                  {counselor.name}
                </h3>

                {/* Clickable Telephone Numbers */}
                <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                  {(counselor.phones || []).map((phone, pIdx) => {
                    const cleanPhone = phone.replace(/\s+/g, '');
                    return (
                      <span key={pIdx} className="inline-flex items-center">
                        <a
                          href={`tel:${cleanPhone}`}
                          className="font-sans text-xs sm:text-[12.5px] font-bold text-rose-600 hover:text-rose-700 transition-colors hover:underline"
                        >
                          {phone}
                        </a>
                        {pIdx < (counselor.phones || []).length - 1 && (
                          <span className="text-slate-300 mx-1 font-sans text-xs">•</span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Subtle Status Bar */}
              <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-sans">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available</span>
                </span>
                <span className="font-semibold text-slate-500 group-hover:text-[#0c2340] transition-colors">
                  Direct Line &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
