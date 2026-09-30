const LOGOS = [
  { logo: '/footer/pci-logo.png', alt: 'Pharmacy Council of India (PCI)' },
  { logo: '/footer/mohfw.png', alt: 'Ministry of Health and Family Welfare (MoHFW)' },
  { logo: '/footer/nmc-logo.png', alt: 'National Medical Commission (NMC)' },
  { logo: '/footer/dci-logo.png', alt: 'Dental Council of India (DCI)' },
  { logo: '/footer/inc-logo.png', alt: 'Indian Nursing Council (INC)' },
  { logo: '/footer/ugc-logo.png', alt: 'University Grants Commission (UGC)' },
];

export default function Approvals() {
  return (
    <section className="relative z-10 w-full bg-transparent py-2 sm:py-4 pb-6 sm:pb-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 lg:gap-20">
          {LOGOS.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center transition-transform duration-300 hover:scale-105 cursor-default"
            >
              <img
                src={item.logo}
                alt={item.alt}
                className="h-20 sm:h-24 md:h-28 lg:h-32 w-auto max-w-[150px] sm:max-w-[190px] md:max-w-[200px] object-contain select-none opacity-80 hover:opacity-95 transition-all duration-300"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
