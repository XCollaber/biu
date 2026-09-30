import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const QUICK_ACTIONS = [
  {
    id: 'fee-structure',
    title: 'FEE STRUCTURE',
    desc: 'Get courses fee structure details for this Session',
    href: '/links/Fees-Structure-2026-27.pdf',
    image: '/links/letter.png',
    alt: 'BIU Fee Structure Details',
    // Individual Sphere & Image settings for Fee Structure (change in px format like h-[130px] w-[130px])
    sphereClass: 'h-[130px] w-[130px]',
    imageClass: 'h-[96px] w-[96px] object-contain',
  },
  {
    id: 'online-payment',
    title: 'ONLINE PAYMENT',
    desc: 'Pay your, fees, and other Charges Online',
    href: 'https://page.biu.edu.in/online-payment/',
    image: '/links/atm-card.png',
    alt: 'BIU Online Payment Gateway',
    // Individual Sphere & Image settings for Online Payment
    sphereClass: 'h-[130px] w-[130px]',
    imageClass: 'h-[92px] w-[92px] object-contain',
  },
  {
    id: 'our-courses',
    title: 'OUR COURSES',
    desc: 'We are offering Medical, Dental, Nursing and Other Courses',
    href: 'https://biu.edu.in/medical.php',
    image: '/links/graduation.png',
    alt: 'Explore BIU Academic Courses',
    // Individual Sphere & Image settings for Our Courses
    sphereClass: 'h-[130px] w-[130px]',
    imageClass: 'h-[90px] w-[90px] object-contain',
  },
  {
    id: 'online-registration',
    title: 'ONLINE REGISTRATION',
    desc: 'Admission Open for Session 2026-27',
    href: 'https://admissions.biuerp.com/',
    image: '/links/open-enrollment.png',
    alt: 'BIU Online Admission Registration',
    // Individual Sphere & Image settings for Online Registration
    sphereClass: 'h-[130px] w-[130px]',
    imageClass: 'ml-4 h-[94px] w-[94px] object-contain',
  },
];

export default function QuickLinks() {
  return (
    <section className="relative z-10 w-full bg-white py-10 sm:py-10 font-sans">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 items-start">
          {QUICK_ACTIONS.map((action, idx) => (
            <motion.a
              key={action.id}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: EASE }}
              className="group relative flex flex-col items-center text-center p-2 sm:p-4 bg-transparent cursor-pointer"
            >
              {/* 3D Volumetric Sphere Container */}
              <div className="relative mb-5 flex flex-col items-center">
                {/* 3D Sphere Body */}
                <div
                  style={{
                    background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f8fafc 42%, #e2e8f0 78%, #cbd5e1 100%)',
                  }}
                  className={`relative flex items-center justify-center rounded-full border border-white/80 shadow-[0_16px_32px_-8px_rgba(12,35,64,0.18),0_4px_12px_-2px_rgba(12,35,64,0.08),inset_-8px_-8px_20px_rgba(12,35,64,0.13),inset_6px_6px_14px_rgba(255,255,255,1)] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 group-hover:shadow-[0_24px_42px_-10px_rgba(12,35,64,0.22),0_8px_18px_-4px_rgba(12,35,64,0.10),inset_-10px_-10px_24px_rgba(12,35,64,0.16),inset_8px_8px_16px_rgba(255,255,255,1)] ${action.sphereClass || 'h-[130px] w-[130px]'
                    }`}
                >
                  {/* Top-Left Specular Light Glint */}
                  <span className="pointer-events-none absolute top-3 left-4.5 h-4.5 w-8 rounded-full bg-white/80 filter blur-[0.5px] rotate-[-25deg] opacity-90" />

                  <img
                    src={action.image}
                    alt={action.alt}
                    loading="lazy"
                    className={`relative z-10 transition-transform duration-300 group-hover:scale-105 select-none ${action.imageClass || 'h-[64px] w-[64px] object-contain'
                      }`}
                  />
                </div>

                {/* Soft Ground Floor Shadow */}
                <div className="pointer-events-none -mt-2 h-3.5 w-[72%] rounded-full bg-[#0c2340]/15 filter blur-sm transition-all duration-300 group-hover:w-[82%] group-hover:opacity-80 group-hover:scale-105" />
              </div>

              {/* Title */}
              <h3 className="font-sans text-sm sm:text-[16px] font-bold tracking-wider text-[#0c2340] group-hover:text-gold-dark transition-colors duration-200 uppercase">
                {action.title}
              </h3>

              {/* Description */}
              <p className="mt-2 font-fraunces text-xs sm:text-[14px] font-normal leading-relaxed text-slate-500 max-w-[220px]">
                {action.desc}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
