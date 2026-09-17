import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Clock, ArrowUpRight, QrCode as QrCodeIcon } from '@phosphor-icons/react';
import Img from './Img';
import locData from '../data/location.json';

const EASE = [0.16, 1, 0.3, 1];

const MAP = {
  lat: 28.381389,
  lng: 79.458119,
  link: 'https://www.google.com/maps/place/Bareilly+international+University+new+building/@28.3813889,79.4581194,17z/data=!3m1!4b1!4m6!3m5!1s0x39a007eaa171012f:0x535e385f86dbef22!8m2!3d28.3813889!4d79.4581194',
};
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3510.254210388375!2d79.45811936197623!3d28.381388942361564!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a007eaa171012f%3A0x535e385f86dbef22!2sBareilly%20international%20University%20new%20building!5e0!3m2!1sen!2sin!4v1789470009685!5m2!1sen!2sin';

const VENUE = {
  name: 'Bareilly International University Main Campus',
  address: 'Pilibhit Bypass Road, Bareilly, Uttar Pradesh 243006',
  note: '(Main Road, Near Rohilkhand Medical College & Hospital)',
};

export default function Location() {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&ecc=H&data=${encodeURIComponent(MAP.link)}`;

  return (
    <section id="location" className="relative w-full bg-gradient-to-br from-[#f0f4f8] via-[#e8eef5] to-[#f0f4f8] py-24 md:py-20">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10">
        {/* Left: info card matching reference design layout */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="flex flex-col justify-between rounded-2xl border border-[#0c2340]/10 bg-white/70 p-6 sm:p-8 md:p-10 shadow-sm"
        >
          <div>
            {/* Header Headline */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-medium leading-tight text-forest-dark">
              Find Bareilly International University <span className="text-forest/60 font-serif font-normal">in Bareilly</span>
            </h2>

            {/* Address Block */}
            <div className="mt-7 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">
                <MapPin size={15} weight="fill" className="text-gold-dark" />
                <span>ADDRESS</span>
              </div>
              <h3 className="font-sans text-base sm:text-[17px] font-bold text-slate-900 mt-0.5">
                {VENUE.name}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-700 font-light leading-relaxed">
                {VENUE.address}
              </p>
              <p className="font-sans text-xs text-slate-500 font-light italic mt-0.5">
                {VENUE.note}
              </p>
            </div>

            {/* Hours Block */}
            <div className="mt-6 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">
                <Clock size={15} weight="fill" className="text-gold-dark" />
                <span>HOURS</span>
              </div>
              <div className="mt-1 flex flex-col gap-1.5 font-sans text-xs sm:text-sm text-slate-800">
                <p><strong className="font-semibold text-slate-900">Admissions Cell:</strong> Mon – Sat (9:00am to 5:00pm)</p>
                <p><strong className="font-semibold text-slate-900">Hospital & Emergency:</strong> 24x7 Round the Clock</p>
                <p><strong className="font-semibold text-slate-900">Campus Visits:</strong> Mon – Sat (10:00am to 4:00pm)</p>
              </div>
            </div>
          </div>

          <div>
            {/* Horizontal Divider */}
            <div className="my-7 border-t border-slate-200/80" />

            {/* Bottom QR & Navigation Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
              {/* QR Code Container */}
              <a
                href={MAP.link}
                target="_blank"
                rel="noreferrer"
                aria-label="Open location in Google Maps"
                className="group relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-2xl bg-white p-2.5 ring-1 ring-black/10 shadow-sm transition-transform duration-300 hover:scale-[1.03]"
              >
                <Img
                  src={qrSrc}
                  alt="Scan to open venue location"
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
                <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg bg-white ring-2 ring-[#0c2340]/20 shadow-xs">
                  <Img
                    src="/biu-logo.webp"
                    alt="BIU Logo"
                    className="h-9 w-9 object-contain"
                  />
                </span>
              </a>

              {/* Right Details & Action Button */}
              <div className="flex flex-col items-start gap-1.5">
                {/* Scan Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-800/20 bg-cyan-900/5 px-3 py-1 font-sans text-[11px] font-bold text-cyan-600">
                  <QrCodeIcon size={18} weight="bold" />
                  <span>Scan for Directions</span>
                </div>

                <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Instant Navigation
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-sm">
                  Scan this QR code with your mobile camera to open exact GPS directions in Google Maps.
                </p>

                {/* Pill Button */}
                <a
                  href={MAP.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-2 inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-300 bg-gradient-to-r from-[#0c2340]/95 via-[#102d52]/90 to-[#163860]/65 px-5 font-sans text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight size={14} weight="bold" className="text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: map */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative min-h-[440px] overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-[0_30px_80px_-40px_rgba(20,57,43,0.4)]"
        >
          <iframe
            title={`Map showing ${locData.venueName || VENUE.name}`}
            src={MAP_EMBED}
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </motion.div>
      </div>
    </section>
  );
}
