// Bareilly International University (BIU) — Academic Crest Emblem
export default function Logo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 100 108"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer Shield Shell */}
      <path
        d="M50 4 L90 20 V56 C90 78 72 98 50 104 C28 98 10 78 10 56 V20 L50 4 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Inner Hairline Shield */}
      <path
        d="M50 14 L82 27 V54 C82 72 67 89 50 94 C33 89 18 72 18 54 V27 L50 14 Z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        strokeLinejoin="round"
      />
      {/* University Torch of Knowledge / Star emblem */}
      <path
        d="M50 28 L53 38 L63 38 L55 44 L58 54 L50 48 L42 54 L45 44 L37 38 L47 38 Z"
        fill="currentColor"
        fillOpacity="0.9"
      />
      {/* Open Book Motif */}
      <path
        d="M28 66 C36 62 44 64 50 68 C56 64 64 62 72 66 V82 C64 78 56 80 50 83 C44 80 36 78 28 82 V66 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M50 68 V83"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}
