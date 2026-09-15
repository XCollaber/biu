import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, NavigationArrow, Car } from '@phosphor-icons/react';
import Logo from './Logo';
import Img from './Img';
import locData from '../data/location.json';

const EASE = [0.16, 1, 0.3, 1];

const MAP = {
  lat: 28.385388,
  lng: 79.490695,
  link: 'https://maps.app.goo.gl/WAZpvuSe3wtQNKCu5',
};
const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.52!2d79.490695!3d28.385388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a005003b175ef5%3A0x4ea934bf65de24!2sAMRITAARA!5e0!3m2!1sen!2sin!5m2!1sen!2sin';

const VENUE = {
  name: 'Bareilly International University',
  address: 'Pilibhit Bypass Road, Bareilly, Uttar Pradesh 243006',
};

const QR_CONFIG = {
  mode: 'generated',
  data: MAP.link,
  imageSrc: '/qr/location-qr.png',
  showLogo: true,
};

function QrCode() {
  const src =
    QR_CONFIG.mode === 'image'
      ? QR_CONFIG.imageSrc
      : `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&ecc=H&data=${encodeURIComponent(
        QR_CONFIG.data
      )}`;

  return (
    <a
      href={MAP.link}
      target="_blank"
      rel="noreferrer"
      aria-label="Open location in Google Maps"
      className="group relative inline-block h-40 w-40 shrink-0 rounded-xl bg-white p-3 ring-1 ring-black/10 shadow-sm transition-transform duration-500 ease-premium hover:scale-[1.03]"
    >
      <Img
        src={src}
        alt="Scan to open the venue location"
        loading="lazy"
        className="h-full w-full object-contain"
        onError={(e) => {
          const gen = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&ecc=H&data=${encodeURIComponent(
            QR_CONFIG.data
          )}`;
          if (e.currentTarget.src !== gen) e.currentTarget.src = gen;
        }}
      />
      {QR_CONFIG.showLogo && (
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg bg-forest-dark ring-2 ring-white">
          <Logo className="h-6 w-6 text-gold" />
        </span>
      )}
    </a>
  );
}

const DEFAULT_DISTANCES = [
  'Conveniently located on Dohra Road, near G.D. Goenka School, Bareilly',
  'Approximately 15 minutes from Bareilly Railway Station (Junction)',
  'Approximately 20 minutes from Bareilly Airport (Civil Enclave)',
  'Easy access from Delhi-Lucknow Highway (NH 30 / Bareilly Bypass)',
];

function Block({ icon: Icon, label, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
        <Icon size={16} weight="fill" />
        {label}
      </div>
      <div className="mt-3 space-y-1.5">{children}</div>
    </div>
  );
}

export default function Location() {
  const reduceMotion = useReducedMotion();

  const fade = {
    hidden: reduceMotion ? {} : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const distanceList =
    locData.distances && locData.distances.length > 0
      ? locData.distances.map((d) => (typeof d === 'string' ? d : d.text || d))
      : DEFAULT_DISTANCES;

  return (
    <section id="location" className="relative w-full bg-cream py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-10">
        {/* Left: info card */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="rounded-2xl border border-forest/10 bg-white/70 p-8 md:p-10"
        >
          <h2 className="font-serif text-[28px] font-medium leading-tight text-forest-dark sm:text-4xl">
            {locData.titleLine1 || 'Conveniently Connected'}
            <br />
            {locData.titleLine2 || 'Naturally Secluded'}
          </h2>

          <div className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:gap-6">
            <div className="space-y-8">
              <Block icon={MapPin} label="Distance">
                {distanceList.map((d) => (
                  <p key={d} className="font-sans text-[14px] font-light leading-relaxed text-forest/70">
                    {d}
                  </p>
                ))}
                <p className="pt-1 font-sans text-[12px] font-light italic text-forest/45">
                  {locData.travelTimeDisclaimer || 'Travel times are estimates and vary with traffic.'}
                </p>
              </Block>
            </div>

            {/* QR */}
            <div className="flex justify-center md:justify-end">
              <QrCode />
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div className="hidden sm:block">
              <Block icon={Car} label="Parking">
                <p className="font-sans text-[14px] font-light text-forest/70">
                  {locData.parkingText || '500 car spaces available'}
                </p>
              </Block>
            </div>
            <Block icon={NavigationArrow} label="Directions">
              <p className="font-sans text-[14px] font-light leading-relaxed text-forest/70">
                {locData.address || VENUE.address}
              </p>
              <div className="pt-3">
                <a
                  href={MAP.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-full sm:w-auto h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0c2417] via-[#163e28] to-[#081b11] border border-gold/50 px-6 font-sans text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#f7e7b4] shadow-[0_8px_30px_rgba(20,57,43,0.3)] transition-all duration-300 ease-premium hover:from-[#163e28] hover:to-[#0c2417] hover:border-gold hover:scale-105 hover:shadow-[0_8px_30px_rgba(212,175,55,0.35)] active:scale-95 cursor-pointer"
                >
                  <NavigationArrow size={18} weight="fill" className="text-gold shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span>{locData.directionsButtonLabel || 'Get Directions'}</span>
                </a>
              </div>
            </Block>
          </div>
        </motion.div>

        {/* Right: map */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="relative min-h-[420px] overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-[0_30px_80px_-40px_rgba(20,57,43,0.4)]"
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
