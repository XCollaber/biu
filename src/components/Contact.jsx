import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  CheckCircle,
  PaperPlaneTilt,
  Plus,
  Minus,
  ArrowRight,
  Stethoscope,
  Gear,
  Heart,
  ChartBar,
  Tag,
  SquaresFour,
  Question,
  CaretRight,
} from '@phosphor-icons/react';
import contactData from '../data/contact.json';
import faqData from '../data/faq.json';
import siteData from '../data/site.json';

const EASE = [0.16, 1, 0.3, 1];

const INTEREST_OPTIONS = [
  { id: 'medical', label: 'Medical & Dental', icon: Stethoscope },
  { id: 'engineering', label: 'Engineering & Tech', icon: Gear },
  { id: 'nursing', label: 'Nursing & Paramedical', icon: Heart },
  { id: 'management', label: 'Management', icon: ChartBar },
  { id: 'pharmacy', label: 'Pharmacy', icon: Tag },
  { id: 'other', label: 'Other', icon: SquaresFour },
];

function FaqItem({ item, isOpen, onToggle, index }) {
  const reduceMotion = useReducedMotion();
  const panelId = `faq-panel-${index}`;
  const btnId = `faq-btn-${index}`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 bg-white ${
        isOpen
          ? 'border-gold/50 shadow-xs'
          : 'border-slate-200/80 hover:border-gold/40 shadow-xs'
      }`}
    >
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-4.5 text-left cursor-pointer"
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
            <p className="px-5 pb-5 font-newsreader text-[14px] font-light leading-relaxed text-forest/65 sm:px-6">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const [selectedField, setSelectedField] = useState('medical');
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [errors, setErrors] = useState({});

  const questions = faqData.questions || [];

  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ');
    if (val.length <= 50) {
      setForm((f) => ({ ...f, name: val }));
      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value.trim();
    setForm((f) => ({ ...f, email: val }));
    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((f) => ({ ...f, phone: digitsOnly }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleCourseChange = (e) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, course: val }));
    if (errors.course) setErrors((prev) => ({ ...prev, course: '' }));
  };

  const handleMessageChange = (e) => {
    const val = e.target.value;
    if (val.length <= 1000) {
      setForm((f) => ({ ...f, message: val }));
      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Full Name is required.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Please enter a valid name.';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    const digitsOnly = form.phone.replace(/\D/g, '');
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (digitsOnly.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const activeOption = INTEREST_OPTIONS.find((opt) => opt.id === selectedField);
      const fieldLabel = activeOption ? activeOption.label : selectedField;

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        course: form.course.trim(),
        field: fieldLabel,
        message: form.message.trim(),
      };

      setSent(true);

      const targetPhone = (siteData.whatsappPhone || '917455002900').replace(/\D/g, '');
      const userMessage = payload.message ? payload.message : 'I would like to inquire about admissions and counseling.';
      const coursePart = payload.course ? `\n*Course:* ${payload.course}` : '';
      const fieldPart = payload.field ? `\n*Interested Field:* ${payload.field}` : '';
      const formattedMessage = `Hello BIU Admissions Team,\n\n${userMessage}\n\n*Name:* ${payload.name}\n*Email:* ${payload.email}\n*Phone:* ${payload.phone}${coursePart}${fieldPart}`;

      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }
  };

  return (
    <section id="contact" className="relative w-full bg-[#fbfbfd] py-18 sm:py-24 lg:py-28 overflow-hidden font-sans">
      {/* Target anchor for FAQ direct links */}
      <div id="faq" className="absolute -top-20 left-0" />
      <div id="book" className="absolute -top-20 left-0" />

      {/* Atmospheric Background Wave Blob */}
      <div className="pointer-events-none absolute -right-28 sm:-right-10 top-1/2 -translate-y-1/2 w-[650px] lg:w-[900px] h-[650px] lg:h-[900px] bg-gradient-to-bl from-[#d9ebfb]/65 via-[#eaf4fd]/40 to-transparent rounded-full filter blur-3xl z-0" />

      {/* Center Background Banyan Tree Watermark */}
      <div className="pointer-events-none absolute left-[32%] sm:left-[38%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] lg:w-[1100px] opacity-[0.14] filter brightness-0 z-0 select-none">
        <img
          src="/tree.png"
          alt=""
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1520px] px-5 sm:px-8 lg:px-12 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
          
          {/* =========================================================
              LEFT COLUMN: FREQUENTLY ASKED QUESTIONS
          ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left">
            {/* Eyebrow Tag */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <span className="w-8 h-[3.5px] bg-gold rounded-full" />
              <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                {faqData.badge || 'ADMISSIONS FAQ'}
              </span>
            </div>

            {/* Heading */}
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-times text-3xl sm:text-4xl lg:text-[2.65rem] font-medium text-[#0c2340] leading-[1.12] mt-2 mb-4"
            >
              Frequently Asked Questions
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
              className="font-sans text-xs sm:text-sm md:text-[14.5px] text-slate-600 font-normal leading-relaxed mb-8 max-w-xl"
            >
              Get quick answers to common questions about admissions, programs, eligibility, campus facilities and more.
            </motion.p>

            {/* Accordion List */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
              className="flex flex-col gap-3.5 mb-9 w-full max-w-[620px]"
            >
              {questions.map((item, i) => (
                <FaqItem
                  key={item.q || i}
                  item={item}
                  index={i}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex((cur) => (cur === i ? -1 : i))}
                />
              ))}
            </motion.div>

            {/* View All FAQs Pill Button */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            >
              <a
                href="#faq"
                className="group inline-flex items-center gap-2.5 mt-2 ml-1.5 rounded-lg bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-5.5 py-3 sm:px-6 sm:py-3.5 font-sans text-xs sm:text-[13.5px] font-semibold text-white shadow-sm brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-125 active:scale-[0.98] w-fit"
              >
                <Question size={20} weight="fill" className="text-blue-100 transition-transform duration-200 group-hover:scale-110" />
                <span>View All FAQs</span>
                <CaretRight size={14} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          </div>


          {/* =========================================================
              RIGHT COLUMN: ADMISSIONS 2026-27 / CONTACT INQUIRY CARD
          ========================================================= */}
          <div className="lg:col-span-6 xl:col-span-6 relative w-full">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
              className="relative w-full rounded-3xl bg-white border border-slate-200/80 shadow-[0_22px_65px_-15px_rgba(12,35,64,0.13)] p-6 sm:p-8 lg:p-9 xl:p-10"
            >
              {/* Card Header */}
              <div className="text-center mb-7">
                <span className="font-sans text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#c49216]">
                  {contactData.badge || 'ADMISSIONS 2026–27'}
                </span>
                <h3 className="mt-1.5 font-times text-2xl sm:text-3xl lg:text-[2.2rem] font-medium text-[#0c2340] leading-snug">
                  Begin Your <span className="font-bold">BIU Journey</span>
                </h3>
                <p className="mt-2 text-xs sm:text-[13px] text-slate-500 max-w-md mx-auto leading-relaxed">
                  {contactData.subtitle || 'Share your details below and our Admissions Cell will contact you with course brochures, fee structures, and campus visit counseling.'}
                </p>
              </div>

              {sent ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="my-6 flex flex-col items-center rounded-2xl bg-slate-50 border border-slate-200/80 p-8 text-center"
                >
                  <CheckCircle size={46} weight="fill" className="text-[#0c2340]" />
                  <h4 className="mt-3.5 font-times text-2xl text-[#0c2340] font-bold">
                    {contactData.thankYouTitle || 'Inquiry Received!'}
                  </h4>
                  <p className="mt-2 max-w-sm font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {contactData.thankYouMessage || 'Thank you for reaching out to Bareilly International University. Our counselors will contact you shortly.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setForm({ name: '', email: '', phone: '', course: '', message: '' });
                      setErrors({});
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0c2340] text-white px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#102d52] transition-colors cursor-pointer"
                  >
                    <span>Send Another Inquiry</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="c-name" className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-600">
                        FULL NAME
                      </label>
                      <input
                        id="c-name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={handleNameChange}
                        className={`w-full rounded-xl border bg-white px-4 py-3 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                          errors.name ? 'border-red-500/70 ring-1 ring-red-500/20' : 'border-slate-200/90'
                        }`}
                      />
                      {errors.name && (
                        <span className="font-sans text-[11px] text-red-600 font-medium">{errors.name}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="c-email" className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-600">
                        EMAIL
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="e.g. rahul@example.com"
                        value={form.email}
                        onChange={handleEmailChange}
                        className={`w-full rounded-xl border bg-white px-4 py-3 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                          errors.email ? 'border-red-500/70 ring-1 ring-red-500/20' : 'border-slate-200/90'
                        }`}
                      />
                      {errors.email && (
                        <span className="font-sans text-[11px] text-red-600 font-medium">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Course Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="c-phone" className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-600">
                        PHONE NUMBER
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        required
                        maxLength={10}
                        autoComplete="tel"
                        placeholder="e.g. 9876543210"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        className={`w-full rounded-xl border bg-white px-4 py-3 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                          errors.phone ? 'border-red-500/70 ring-1 ring-red-500/20' : 'border-slate-200/90'
                        }`}
                      />
                      {errors.phone && (
                        <span className="font-sans text-[11px] text-red-600 font-medium">{errors.phone}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="c-course" className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-600">
                        COURSE NAME
                      </label>
                      <input
                        id="c-course"
                        type="text"
                        placeholder="e.g. MBBS, B.Tech, B.Pharm, MBA"
                        value={form.course}
                        onChange={handleCourseChange}
                        className={`w-full rounded-xl border bg-white px-4 py-3 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                          errors.course ? 'border-red-500/70 ring-1 ring-red-500/20' : 'border-slate-200/90'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Interested Field Chips (Optional) */}
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-600">
                      INTERESTED FIELD (OPTIONAL)
                    </label>
                    <div className="flex flex-wrap gap-2 pt-0.5">
                      {INTEREST_OPTIONS.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = selectedField === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedField(isSelected ? '' : opt.id)}
                            className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 font-sans text-xs font-semibold transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? 'border-[#3b82f6] bg-[#eef6ff] text-[#1d4ed8] shadow-xs ring-1 ring-[#3b82f6]/30 scale-[1.02]'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <Icon size={15} weight="bold" className={isSelected ? 'text-[#2563eb]' : 'text-slate-500'} />
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message (Optional) */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="c-message" className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-600">
                      MESSAGE (OPTIONAL)
                    </label>
                    <textarea
                      id="c-message"
                      rows={3}
                      placeholder="Share details about your query, preferred date, or special requests..."
                      value={form.message}
                      onChange={handleMessageChange}
                      className="w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="group mt-2 flex h-13 sm:h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-[#0c2340] hover:bg-[#102d52] px-8 font-sans text-xs sm:text-[13px] font-extrabold uppercase tracking-[0.16em] text-white shadow-md hover:shadow-lg transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] cursor-pointer"
                  >
                    <PaperPlaneTilt size={18} weight="fill" className="text-gold shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span>SUBMIT ADMISSION INQUIRY</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
