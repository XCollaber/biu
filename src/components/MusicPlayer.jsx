import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Waveform, SpeakerHigh, MusicNotes } from '@phosphor-icons/react';

// Local ambient audio asset
const MUSIC_URL = '/audio/audio.mp3';

// Responsive safety volume ceilings (50% for mobile phone speakers, 25% strictly for laptops)
const LAPTOP_VOLUME_CAP = 0.90;
const MOBILE_VOLUME_CAP = 0.80;

export default function MusicPlayer() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);
  const audioRef = useRef(null);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  // Strictly set volume: 50% ONLY for actual mobile devices (iOS/Android), 25% for laptops/desktops
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const isActualMobilePhone =
      typeof window !== 'undefined' &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    audio.volume = isActualMobilePhone ? MOBILE_VOLUME_CAP : LAPTOP_VOLUME_CAP;
  }, []);

  // Trigger ambient sound permission prompt 1.5s after initial page load if music is not playing
  useEffect(() => {
    if (isPlaying) return;
    const timer = setTimeout(() => {
      setShowWelcomePrompt(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Show permission prompt on page switch ONLY when music is NOT playing
  useEffect(() => {
    const handleRouteChange = () => {
      if (isPlaying) return;
      setShowWelcomePrompt(true);
    };

    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isPlaying]);

  // Auto-close pop-up card 5 seconds after music starts playing
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isPlaying]);

  // Close pop-up card when user clicks anywhere outside of it
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Synchronized Play / Pause
  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setShowWelcomePrompt(false);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  // Enable audio directly from initial top prompt banner
  const enableAudioFromPrompt = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play().then(() => {
      setIsPlaying(true);
      setShowWelcomePrompt(false);
      setIsOpen(true); // Open bottom-left panel so user sees controls in sync
    }).catch(() => {
      setIsPlaying(false);
      setShowWelcomePrompt(false);
    });
  };

  const dismissPrompt = () => {
    setShowWelcomePrompt(false);
  };

  return (
    <>
      {/* Background Audio Element */}
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />

      {/* Top Initial Audio Permission Banner Prompt */}
      <AnimatePresence>
        {showWelcomePrompt && !isPlaying && (
          <div className="fixed top-20 inset-x-0 z-50 flex justify-center px-4 pointer-events-none sm:top-24">
            <motion.div
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto w-full max-w-md"
            >
              <div className="flex items-center justify-between gap-3 rounded-full border border-gold/30 bg-forest-dark/95 py-2.5 px-4 text-white shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl ring-1 ring-white/10 sm:px-5 sm:py-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <SpeakerHigh size={16} weight="fill" />
                  </span>
                  <p className="truncate font-sans text-[12px] font-medium tracking-wide text-white/90 sm:text-[13px]">
                    Enhance your visit with ambient music?
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={enableAudioFromPrompt}
                    className="rounded-full bg-gold px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-wider text-forest-dark transition-all hover:bg-gold-light active:scale-95 sm:px-4"
                  >
                    Enable
                  </button>
                  <button
                    type="button"
                    onClick={dismissPrompt}
                    className="p-1 text-white/60 hover:text-white transition-colors"
                    aria-label="Close permission prompt"
                  >
                    <X size={15} weight="bold" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Music Widget Container (Fixed Bottom-Left) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start font-sans">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={containerRef}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.94 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 w-72 rounded-2xl bg-white p-5 text-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-black/5 sm:w-76"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-gray-200 pb-2.5">
                <h4 className="font-serif text-[12px] font-semibold uppercase tracking-[0.18em] text-[#9c7968]">
                  A Little Music for the Journey
                </h4>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-700 transition-colors"
                  aria-label="Close music panel"
                >
                  <X size={16} weight="bold" />
                </button>
              </div>

              {/* Card Body */}
              <p className="mt-3 text-[12.5px] font-normal leading-relaxed text-gray-600">
                We know searching for the perfect venue isn't easy. If you've found your way here, the least we can do is make the search feel pleasant. This soft melody is a small effort from our side — because we care about how you feel, not just what you book.
              </p>

              {/* Card Footer Toggle Row */}
              <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500">
                  Playing Softly
                </span>

                {/* Toggle Pill Switch */}
                <button
                  type="button"
                  onClick={toggleMusic}
                  role="switch"
                  aria-checked={isPlaying}
                  aria-label="Toggle ambient music"
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${isPlaying ? 'bg-forest-dark' : 'bg-gray-200'
                    }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${isPlaying ? 'translate-x-5' : 'translate-x-0'
                      }`}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button (Bottom-Left) */}
        <motion.button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Toggle music player panel"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#181818] text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-all duration-500 ease-premium hover:bg-black active:scale-95"
        >
          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-4 pb-0.5">
              <span className="w-[3px] bg-white rounded-full h-2.5 animate-pulse" />
              <span className="w-[3px] bg-white rounded-full h-4 animate-pulse [animation-delay:0.2s]" />
              <span className="w-[3px] bg-white rounded-full h-5 animate-pulse [animation-delay:0.4s]" />
            </div>
          ) : (
            <MusicNotes
              size={22}
              weight="bold"
              className="text-white transition-transform duration-500 ease-premium group-hover:scale-110"
            />
          )}
        </motion.button>
      </div>
    </>
  );
}
