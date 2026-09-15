// src/components/SmoothScroll.jsx
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Global listener for on-page anchor links (e.g. #contact, #location)
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || href === '#') return;

      // If it's an in-page section ID (e.g. #contact or #spaces)
      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        if (lenisRef.current) {
          lenisRef.current.scrollTo(element, { offset: 0, duration: 1.2 });
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return null; // Renders no UI elements
}

