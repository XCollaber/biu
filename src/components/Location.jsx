import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Clock, ArrowUpRight, QrCode as QrCodeIcon } from '@phosphor-icons/react';
import Img from './Img';
import locData from '../data/location.json';

const EASE = [0.16, 1, 0.3, 1];

const MAP = {
  lat: 28.381389,
  lng: 79.458119,
  link: 'https://maps.app.goo.gl/3QBkAFNhHetHEcar9',
};
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3510.254210388375!2d79.45811936197623!3d28.381388942361564!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a007eaa171012f%3A0x535e385f86dbef22!2sBareilly%20international%20University%20new%20building!5e0!3m2!1sen!2sin!4v1789470009685!5m2!1sen!2sin';

const VENUE = {
  name: 'Bareilly International University Main Campus',
  address: 'Pilibhit Bypass Road, Bareilly, Uttar Pradesh, 243006',
  note: '(Main Road, Near Rohilkhand Medical College & Hospital)',
};

export default function Location() {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section id="location" className="relative z-10 w-full bg-transparent pb-20 pt-4 sm:pb-16 sm:pt-6">
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Section Eyebrow & Headline outside the container */}
        <div className="mb-8 sm:mb-7 text-left">
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-8 h-[3.5px] bg-gold rounded-full" />
            <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
              CAMPUS LOCATION
            </span>
          </div>

          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-times text-3xl sm:text-4xl lg:text-[2.50rem] font-medium text-[#0c2340] leading-[1.12]"
          >
            Find Bareilly International University.
          </motion.h2>
        </div>

        {/* 2-Column Grid Container */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left: info card matching reference design layout */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.05 }}
            className="flex flex-col justify-between rounded-xl border border-[#0c2340]/10 bg-white/70 p-6 sm:p-8 md:p-6 shadow-sm"
          >
            <div>
              {/* Address Block */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-gold-dark">
                  <MapPin size={15} weight="fill" className="text-gold-dark" />
                  <span>ADDRESS</span>
                </div>
                <h3 className="font-sans text-sm sm:text-[15px] font-bold text-slate-900 mt-0.5">
                  {VENUE.address}
                </h3>
                <p className="font-fraunces text-[14px] text-slate-600 font-light">
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
                <p><strong className="font-bold text-slate-900">Admissions Cell :</strong> Mon – Sat (9:00am to 5:00pm)</p>
                <p><strong className="font-bold text-slate-900">Hospital & Emergency :</strong> 24x7 Round the Clock</p>
                <p><strong className="font-bold text-slate-900">Campus Visits :</strong> Mon – Sat (10:00am to 4:00pm)</p>
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
                className="group relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 rounded-xl bg-white p-1 ring-1 ring-black/10 shadow-sm transition-transform duration-300 hover:scale-[1.03]"
              >
                <img
                  src="/qr-code.png"
                  alt="Scan to open Bareilly International University location in Google Maps"
                  loading="lazy"
                  className="h-full w-full object-contain rounded-xl"
                />
              </a>

              {/* Right Details & Action Button */}
              <div className="flex flex-col items-start gap-1.5">
                {/* Scan Badge */}
                <div className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-navy/[0.05] px-2.5 py-1 font-fraunces text-[12px] font-bold text-navy/85 shadow-xs">
                  <QrCodeIcon size={18} weight="bold" className="text-navy/85" />
                  <span>Scan for Directions</span>
                </div>

                {/* <h3 className="font-sans text-base sm:text-lg font-bold text-slate-900 mt-0.5">
                  Instant Navigation
                </h3> */}
                <p className="ml-1 font-fraunces text-xs sm:text-[13px] text-slate-700 font-light leading-relaxed max-w-sm">
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
          className="relative min-h-[440px] overflow-hidden rounded-xl ring-1 ring-black/10 shadow-[0_30px_80px_-40px_rgba(20,57,43,0.4)]"
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
      </div>
    </section>
  );
}
