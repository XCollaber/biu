import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Plus } from '@phosphor-icons/react';
import faqData from '../data/faq.json';

const EASE = [0.16, 1, 0.3, 1];

function FaqItem({ item, isOpen, onToggle, index }) {
  const reduceMotion = useReducedMotion();
  const panelId = `faq-panel-${index}`;
  const btnId = `faq-btn-${index}`;

  return (
    <div className="overflow-hidden rounded-xl border border-forest/10 bg-white transition-colors duration-300 hover:border-gold/40">
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
        >
          <span className="font-sans text-[15px] font-medium text-forest-dark sm:text-base">
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gold-dark"
          >
            <Plus size={18} weight="bold" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            initial={reduceMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="px-5 pb-5 font-sans text-[14px] font-light leading-relaxed text-forest/65 sm:px-6">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);

  const questions = faqData.questions || [];

  return (
    <section id="faq" className="relative w-full bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-center"
        >
          <span className="font-sans text-[12px] font-medium uppercase tracking-[0.28em] text-gold-dark">
            {faqData.badge}
          </span>
          <h2 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">
            <span className="text-forest/45">{faqData.titlePrefix}</span>{' '}
            <span className="text-forest-dark">{faqData.titleSuffix}</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mt-12 flex flex-col gap-3"
        >
          {questions.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? -1 : i))}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
