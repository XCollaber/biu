import { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Users,
  Clock,
  MapPin,
  CheckCircle,
  PaperPlaneTilt,
  CaretRight,
  FilePdf,
  UploadSimple,
  Trash,
  ArrowCounterClockwise,
  WarningCircle,
  EnvelopeSimple,
  Phone,
  Sparkle,
  ShieldCheck,
  Buildings,
} from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import careerData from '../../data/careers.json';

const EASE = [0.16, 1, 0.3, 1];
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB in bytes

export default function CareerPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const formRef = useRef(null);
  const resumeInputRef = useRef(null);
  const appFormInputRef = useRef(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    applyingFor: '',
    experience: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [appFormFile, setAppFormFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pageHeader = careerData.pageHeader || {};
  const openingsHeader = careerData.openingsHeader || {};
  const openings = careerData.openings || [];
  const guidelines = careerData.submissionGuidelines || [];
  const hr = careerData.contactHR || {};

  // Quick Apply handler from opening cards
  const handleQuickApply = (positionTitle) => {
    setForm((prev) => ({ ...prev, applyingFor: positionTitle }));
    if (errors.applyingFor) {
      setErrors((prev) => ({ ...prev, applyingFor: '' }));
    }
    // Smooth scroll to form card
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Text inputs handlers
  const handleNameChange = (e) => {
    const val = e.target.value.replace(/[^a-zA-Z\s.]/g, '').replace(/\s+/g, ' ');
    if (val.length <= 60) {
      setForm((prev) => ({ ...prev, name: val }));
      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value.trim();
    if (val.length <= 80) {
      setForm((prev) => ({ ...prev, email: val }));
      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 10) {
      setForm((prev) => ({ ...prev, phone: val }));
      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const handleApplyingForChange = (e) => {
    const val = e.target.value;
    if (val.length <= 100) {
      setForm((prev) => ({ ...prev, applyingFor: val }));
      if (errors.applyingFor) setErrors((prev) => ({ ...prev, applyingFor: '' }));
    }
  };

  const handleExperienceChange = (e) => {
    const val = e.target.value;
    if (val.length <= 50) {
      setForm((prev) => ({ ...prev, experience: val }));
      if (errors.experience) setErrors((prev) => ({ ...prev, experience: '' }));
    }
  };

  // File upload handlers with PDF and 1MB size validations
  const validateFile = (file) => {
    if (!file) return null;
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      return 'Only PDF files (.pdf) are allowed.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds 1 MB limit.`;
    }
    return null;
  };

  const handleResumeSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setErrors((prev) => ({ ...prev, resume: error }));
      setResumeFile(null);
      if (resumeInputRef.current) resumeInputRef.current.value = '';
    } else {
      setResumeFile(file);
      if (errors.resume) setErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  const handleAppFormSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateFile(file);
    if (error) {
      setErrors((prev) => ({ ...prev, appForm: error }));
      setAppFormFile(null);
      if (appFormInputRef.current) appFormInputRef.current.value = '';
    } else {
      setAppFormFile(file);
      if (errors.appForm) setErrors((prev) => ({ ...prev, appForm: '' }));
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    if (resumeInputRef.current) resumeInputRef.current.value = '';
    if (errors.resume) setErrors((prev) => ({ ...prev, resume: '' }));
  };

  const removeAppForm = () => {
    setAppFormFile(null);
    if (appFormInputRef.current) appFormInputRef.current.value = '';
    if (errors.appForm) setErrors((prev) => ({ ...prev, appForm: '' }));
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Reset entire form
  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      applyingFor: '',
      experience: '',
    });
    setResumeFile(null);
    setAppFormFile(null);
    setErrors({});
    if (resumeInputRef.current) resumeInputRef.current.value = '';
    if (appFormInputRef.current) appFormInputRef.current.value = '';
  };

  // Submit validation and submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Full name is required.';
    } else if (form.name.trim().length < 3) {
      newErrors.name = 'Please enter a valid full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Contact number is required.';
    } else if (form.phone.replace(/\D/g, '').length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!form.applyingFor.trim()) {
      newErrors.applyingFor = 'Please specify the post you are applying for.';
    }

    if (!form.experience.trim()) {
      newErrors.experience = 'Please specify previous experience (in months/years).';
    }

    if (!resumeFile) {
      newErrors.resume = 'Please attach your resume in PDF format (less than 1 MB).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Focus on first error element
      const firstErrorKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`career-${firstErrorKey}`);
      if (el) el.focus();
      return;
    }

    // Process submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-gold selection:text-[#0c2340]">
      {/* Top University Navigation */}
      <Navbar />

      {/* Hero Header Section - Replicating Public Disclosure Page Signature Light Header */}
      <section className="relative bg-white border-b border-slate-200/80 pt-28 pb-10 sm:pt-32 sm:pb-14 font-sans z-20">
        {/* Subtle Background Pattern - Double-Line Diamond Lattice matching Disclosure */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.035]" aria-hidden="true">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="career-heritage-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 48 24 L 24 48 L 0 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.65" />
                <path d="M 24 9 L 39 24 L 24 39 L 9 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.60" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#career-heritage-lattice)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          {/* Breadcrumb / Back button matching Disclosure Page exactly */}
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
              className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-md border border-slate-200/70 sm:border-slate-300/80 bg-white px-1.5 py-0.5 sm:px-3.5 sm:py-1.5 font-sans text-[11px] sm:text-xs font-medium sm:font-semibold text-slate-500 sm:text-slate-700 shadow-2xs transition-all duration-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#0c2340]/90 hover:via-[#102d52]/90 hover:to-[#163860]/70 hover:text-white hover:brightness-125 hover:shadow-md active:scale-[0.98]"
            >
              <ArrowLeft size={13} weight="bold" className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </a>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 sm:gap-6">
            <div>
              <div className="hidden sm:flex items-center gap-2.5 mb-2.5">
                <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.09em] text-[#0c2340]">
                  {pageHeader.badge || 'CAREERS & CURRENT OPENINGS'}
                </span>
              </div>
              <h1 className="font-times text-[22px] sm:text-3xl lg:text-[2.6rem] font-medium text-[#0c2340] leading-[1.15]">
                Careers & Current Openings
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 font-sans max-w-xl leading-relaxed">
                {pageHeader.subtitle ||
                  'Join a NAAC A+ accredited premier university campus dedicated to medical excellence, higher education research, and transformative pedagogy.'}
              </p>
            </div>

            {/* Quick action buttons & status badges matching Disclosure Page toolbar style */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-300/80 bg-white px-3 sm:px-3.5 py-2 font-sans text-xs font-semibold text-slate-700 shadow-2xs">
                <ShieldCheck size={16} weight="fill" className="text-amber-500" />
                <span>NAAC A+ Accredited</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-300/80 bg-white px-3 sm:px-3.5 py-2 font-sans text-xs font-semibold text-slate-700 shadow-2xs">
                <Buildings size={16} weight="fill" className="text-cyan-700" />
                <span>100-Acre Campus</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (formRef.current) {
                    formRef.current.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex lg:hidden items-center gap-2 rounded-lg bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-white brightness-125 transition-all duration-200 hover:brightness-140 hover:shadow-sm active:scale-[0.98] cursor-pointer shadow-2xs"
              >
                <PaperPlaneTilt size={14} weight="fill" className="text-blue-100" />
                <span>Apply Online</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main 2-Column Content Section matching Contact Section Layout & Aesthetics */}
      <section className="relative z-[2] w-full bg-[#fbfbfd] py-10 sm:py-14 lg:py-16 font-sans">
        {/* Atmospheric Background Wave Blob */}
        <div className="pointer-events-none absolute -right-28 sm:-right-10 top-20 w-[650px] lg:w-[850px] h-[650px] lg:h-[850px] bg-gradient-to-bl from-[#d9ebfb]/55 via-[#eaf4fd]/40 to-transparent rounded-full filter blur-3xl z-0 opacity-60" />

        {/* Center Background Banyan Tree Watermark (Consistent with Home Page Contact Section) */}
        <div className="pointer-events-none absolute inset-0 z-0 select-none">
          <img
            src="/tree.png"
            alt=""
            className="absolute top-12 left-[50%] -translate-x-1/2 lg:-translate-x-0 lg:left-[12%] w-[850px] lg:w-[1100px] h-auto max-w-none opacity-[0.14] filter brightness-0"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">

            {/* =========================================================
                LEFT COLUMN: CURRENT OPENINGS & VACANCY ANNOUNCEMENTS
            ========================================================= */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start text-left">
              {/* Eyebrow Tag */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                  {openingsHeader.badge || 'CURRENT OPENINGS'}
                </span>
              </div>

              {/* Heading with accent underline */}
              <div className="relative mb-4">
                <h2 className="font-times text-3xl sm:text-4xl lg:text-[2.65rem] font-medium text-[#0c2340] leading-[1.12]">
                  Current <span className="font-bold">Openings</span>
                </h2>
                <div className="mt-2.5 h-1 w-16 bg-gradient-to-r from-cyan-600 via-sky-500 to-transparent rounded-full" />
              </div>

              {/* Description */}
              <p className="font-sans text-xs sm:text-sm md:text-[14.5px] text-slate-600 font-normal leading-relaxed mb-6 max-w-xl">
                {openingsHeader.subtitle ||
                  'Applications are invited from eligible candidates for faculty and academic positions in specialized departments.'}
              </p>

              {/* Vacancy Announcement Master Container */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="overflow-hidden rounded-xl bg-white border border-slate-200/90 shadow-[0_12px_36px_-10px_rgba(12,35,64,0.08)] mb-8"
              >
                {/* Vacancy Announcement Header Ribbon */}
                <div className="bg-gradient-to-r from-[#07162c] via-[#0c2340] to-[#163860] px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-white/10 text-white">
                  <div className="flex items-center gap-2.5">
                    <Briefcase size={20} weight="fill" className="text-amber-300 shrink-0" />
                    <span className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-[0.18em] text-white">
                      VACANCY ANNOUNCEMENT
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-200 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active Openings
                  </span>
                </div>

                {/* Job Openings List */}
                <div className="p-5 sm:p-6 lg:p-7 space-y-6 divide-y divide-slate-100">
                  {openings.map((job, idx) => (
                    <div key={job.id || idx} className={`${idx > 0 ? 'pt-6' : ''}`}>
                      {/* Job Title */}
                      <div className="flex items-start justify-between gap-3 mb-3.5">
                        <h3 className="font-sans text-base sm:text-lg font-bold text-[#0c2340] leading-snug">
                          {job.number ? `${job.number}. ` : `${idx + 1}. `}
                          {job.title}
                        </h3>
                        <span className="shrink-0 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-[#0c2340] border border-blue-100/80">
                          {job.type || 'Full Time'}
                        </span>
                      </div>

                      {/* Department / Faculty */}
                      {job.department && (
                        <p className="font-sans text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                          <Buildings size={14} className="text-slate-400 shrink-0" />
                          <span>{job.department}</span>
                        </p>
                      )}

                      {/* Number of Post pill box */}
                      <div className="mb-2.5 rounded-lg bg-[#f0f6fc] border border-[#d2e4f6] px-4 py-2.5 text-slate-800 text-xs sm:text-[13px] font-sans flex items-center gap-2">
                        <Users size={16} weight="bold" className="text-cyan-700 shrink-0" />
                        <span>
                          <strong className="font-semibold text-slate-900">Number of Post:</strong>{' '}
                          <span className="text-[#0c2340] font-bold">{job.posts}</span>
                        </span>
                      </div>

                      {/* Qualification pill box */}
                      <div className="mb-3.5 rounded-lg bg-[#f0f6fc] border border-[#d2e4f6] px-4 py-2.5 text-slate-800 text-xs sm:text-[13px] font-sans flex items-start gap-2">
                        <GraduationCap size={16} weight="bold" className="text-cyan-700 shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong className="font-semibold text-slate-900">Qualification:</strong>{' '}
                          <span className="text-slate-700">{job.qualification}</span>
                        </div>
                      </div>

                      {/* Quick Apply button */}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleQuickApply(job.title)}
                          className="group inline-flex items-center gap-1.5 rounded-lg bg-slate-50 hover:bg-[#0c2340] px-3.5 py-1.5 font-sans text-xs font-semibold text-[#0c2340] hover:text-white border border-slate-200 hover:border-[#0c2340] transition-all duration-200 cursor-pointer shadow-2xs active:scale-[0.98]"
                        >
                          <span>Apply for this Post</span>
                          <CaretRight size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Common Experience Requirement Dark Navy Banner from Image 1 */}
                  <div className="pt-6">
                    <div className="rounded-xl bg-gradient-to-r from-[#07162c] via-[#0c2340] to-[#102d52] p-4 sm:p-4.5 text-white shadow-sm border border-white/10 flex items-start sm:items-center gap-3">
                      <Clock size={22} weight="fill" className="text-amber-300 shrink-0 mt-0.5 sm:mt-0" />
                      <p className="font-sans text-xs sm:text-[13.5px] font-medium leading-relaxed text-slate-100">
                        {openingsHeader.experienceNotice ||
                          'Experience: Minimum three (03) years of experience for both the posts.'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Submission Guidelines Card */}
              <div className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-5 sm:p-6 mb-8 text-left">
                <h4 className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0c2340] mb-3 flex items-center gap-2">
                  <Sparkle size={16} weight="fill" className="text-amber-500" />
                  <span>Important Instructions for Applicants</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-[13px] text-slate-600 font-sans leading-relaxed">
                  {guidelines.map((guide, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-700 font-bold shrink-0">•</span>
                      <span>{guide}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* HR Cell Direct Contacts */}
              <div className="rounded-xl bg-white border border-slate-200/80 p-5 text-left text-xs sm:text-[13px] text-slate-600 shadow-2xs">
                <p className="font-semibold text-slate-800 mb-2 font-sans">For Inquiries & Application Support:</p>
                <div className="space-y-1.5 font-sans">
                  <div className="flex items-center gap-2">
                    <EnvelopeSimple size={15} className="text-cyan-700" />
                    <span>Email:</span>
                    <a href={`mailto:${hr.email}`} className="text-cyan-700 hover:underline font-medium">
                      {hr.email}
                    </a>
                    {hr.altEmail && (
                      <>
                        <span className="text-slate-300">/</span>
                        <a href={`mailto:${hr.altEmail}`} className="text-cyan-700 hover:underline font-medium">
                          {hr.altEmail}
                        </a>
                      </>
                    )}
                  </div>
                  {hr.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={15} className="text-cyan-700" />
                      <span>Helpline:</span>
                      <a href={`tel:${hr.phone}`} className="text-slate-800 font-medium hover:underline">
                        {hr.phone}
                      </a>
                    </div>
                  )}
                  {hr.address && (
                    <div className="flex items-start gap-2 text-slate-500 text-[12px] pt-1">
                      <MapPin size={15} className="text-slate-400 shrink-0 mt-0.5" />
                      <span>{hr.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =========================================================
                RIGHT COLUMN: CAREER APPLICATION FORM (MATCHING IMAGE 2)
            ========================================================= */}
            <div
              ref={formRef}
              className="lg:col-span-6 xl:col-span-6 flex flex-col justify-start text-left relative w-full scroll-mt-24"
            >
              {/* Eyebrow Tag */}
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-8 h-[3.5px] bg-gold rounded-full" />
                <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                  RECRUITMENT CELL
                </span>
              </div>

              {/* Heading from Image 1 */}
              <h2 className="font-times text-3xl sm:text-4xl lg:text-[2.65rem] font-medium text-[#0c2340] leading-[1.12] mt-2 mb-4">
                Want to join us?
              </h2>

              {/* Description from Image 1 */}
              <p className="font-sans text-xs sm:text-sm md:text-[14.5px] text-slate-600 font-normal leading-relaxed mb-8 max-w-xl">
                Fill the form below and send your resume. Our recruitment committee will review your credentials.
              </p>

              {/* Form Card Container matching Contact Form in Image 2 */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
                className="relative w-full rounded-xl bg-white border border-slate-200/80 shadow-[0_22px_65px_-15px_rgba(12,35,64,0.13)] p-6 sm:p-8 lg:p-9 xl:p-10"
              >
                {sent ? (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="my-6 flex flex-col items-center rounded-2xl bg-slate-50 border border-slate-200/80 p-8 text-center"
                  >
                    <CheckCircle size={52} weight="fill" className="text-[#0c2340]" />
                    <h3 className="mt-4 font-times text-2xl sm:text-3xl text-[#0c2340] font-bold">
                      Application Submitted!
                    </h3>
                    <p className="mt-2.5 max-w-sm font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Thank you for applying to Bareilly International University for{' '}
                      <strong className="text-[#0c2340]">{form.applyingFor || 'the position'}</strong>. Our HR team has received your resume and will reach out if shortlisted.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        handleReset();
                      }}
                      className="group mt-6 inline-flex items-center gap-2.5 rounded-lg bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-6 py-3 font-sans text-xs sm:text-[13.5px] font-semibold text-white shadow-sm brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-125 active:scale-[0.98] cursor-pointer"
                    >
                      <PaperPlaneTilt
                        size={18}
                        weight="fill"
                        className="text-blue-100 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                      <span>Submit Another Application</span>
                      <CaretRight size={13} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 sm:gap-6">
                    {/* Row 1: Name * & Email * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      {/* Name * */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="career-name"
                          className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-700"
                        >
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="career-name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Enter Name"
                          value={form.name}
                          onChange={handleNameChange}
                          className={`w-full rounded-lg border bg-white px-4 py-3 sm:px-5 sm:py-3.5 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                            errors.name ? 'border-red-500/70 ring-1 ring-red-500/20' : 'border-slate-200/90'
                          }`}
                        />
                        {errors.name && (
                          <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                            <WarningCircle size={13} weight="bold" />
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email * */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="career-email"
                          className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-700"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="career-email"
                          type="email"
                          required
                          maxLength={80}
                          autoComplete="email"
                          placeholder="Enter Email"
                          value={form.email}
                          onChange={handleEmailChange}
                          className={`w-full rounded-lg border bg-white px-4 py-3 sm:px-5 sm:py-3.5 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                            errors.email ? 'border-red-500/70 ring-1 ring-red-500/20' : 'border-slate-200/90'
                          }`}
                        />
                        {errors.email && (
                          <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                            <WarningCircle size={13} weight="bold" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Contact No. * & Applying For * */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                      {/* Contact No. * */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="career-phone"
                          className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-700"
                        >
                          Contact No. <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="career-phone"
                          type="tel"
                          required
                          maxLength={10}
                          autoComplete="tel"
                          placeholder="Enter Phone"
                          value={form.phone}
                          onChange={handlePhoneChange}
                          className={`w-full rounded-lg border bg-white px-4 py-3 sm:px-5 sm:py-3.5 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                            errors.phone ? 'border-red-500/70 ring-1 ring-red-500/20' : 'border-slate-200/90'
                          }`}
                        />
                        {errors.phone && (
                          <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                            <WarningCircle size={13} weight="bold" />
                            {errors.phone}
                          </span>
                        )}
                      </div>

                      {/* Applying For * */}
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="career-applyingFor"
                          className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-700"
                        >
                          Applying For <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="career-applyingFor"
                          type="text"
                          required
                          placeholder="Enter Post Applying For"
                          value={form.applyingFor}
                          onChange={handleApplyingForChange}
                          className={`w-full rounded-lg border bg-white px-4 py-3 sm:px-5 sm:py-3.5 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                            errors.applyingFor ? 'border-red-500/70 ring-1 ring-red-500/20' : 'border-slate-200/90'
                          }`}
                        />
                        {errors.applyingFor && (
                          <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                            <WarningCircle size={13} weight="bold" />
                            {errors.applyingFor}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick Selection Chips for Open Positions */}
                    <div className="-mt-1 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 font-medium">Quick select:</span>
                      {openings.map((job) => (
                        <button
                          key={job.id}
                          type="button"
                          onClick={() => handleQuickApply(job.title)}
                          className="rounded-md bg-slate-100 hover:bg-slate-200/80 px-2 py-0.5 text-[11px] font-medium text-slate-700 transition-colors cursor-pointer"
                        >
                          {job.title.split(' - ')[0]}
                        </button>
                      ))}
                    </div>

                    {/* Row 3: Previous Experience * */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="career-experience"
                        className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-700"
                      >
                        Previous Experience <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="career-experience"
                        type="text"
                        required
                        placeholder="Previous Experience In Months"
                        value={form.experience}
                        onChange={handleExperienceChange}
                        className={`w-full rounded-lg border bg-white px-4 py-3 sm:px-5 sm:py-3.5 font-sans text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-gold focus:ring-2 focus:ring-gold/20 ${
                          errors.experience ? 'border-red-500/70 ring-1 ring-red-500/20' : 'border-slate-200/90'
                        }`}
                      />
                      {errors.experience && (
                        <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <WarningCircle size={13} weight="bold" />
                          {errors.experience}
                        </span>
                      )}
                    </div>

                    {/* Row 4: Attach Resume (Only PDF file less than 1Mb)* */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="career-resume"
                        className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-700"
                      >
                        Attach Resume (Only PDF file less than 1Mb) <span className="text-red-500">*</span>
                      </label>

                      <input
                        ref={resumeInputRef}
                        id="career-resume"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleResumeSelect}
                        className="hidden"
                      />

                      {!resumeFile ? (
                        <div
                          onClick={() => resumeInputRef.current?.click()}
                          className={`w-full rounded-lg border-2 border-dashed bg-slate-50/70 hover:bg-slate-100/70 px-4 py-3 sm:py-3.5 flex items-center justify-between cursor-pointer transition-all duration-200 ${
                            errors.resume ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                              <UploadSimple size={18} weight="bold" />
                            </div>
                            <div className="text-left">
                              <p className="text-xs sm:text-[13px] font-medium text-slate-700">
                                Click to choose PDF or drag file here
                              </p>
                              <p className="text-[11px] text-slate-400">PDF file only, max 1 MB</p>
                            </div>
                          </div>
                          <span className="rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
                            Choose File
                          </span>
                        </div>
                      ) : (
                        <div className="w-full rounded-lg border border-slate-200 bg-[#f8fbff] px-4 py-2.5 flex items-center justify-between shadow-2xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-md bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
                              <FilePdf size={20} weight="fill" />
                            </div>
                            <div className="truncate text-left">
                              <p className="text-xs sm:text-[13px] font-semibold text-[#0c2340] truncate">
                                {resumeFile.name}
                              </p>
                              <p className="text-[11px] text-slate-500">{formatFileSize(resumeFile.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeResume}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0 ml-2"
                            title="Remove file"
                          >
                            <Trash size={16} weight="bold" />
                          </button>
                        </div>
                      )}

                      {errors.resume && (
                        <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <WarningCircle size={13} weight="bold" />
                          {errors.resume}
                        </span>
                      )}
                    </div>

                    {/* Row 5: Application Form (Only PDF file less than 1Mb)(Optional) */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="career-appForm"
                          className="font-sans text-[10.5px] font-bold uppercase tracking-wider text-slate-700"
                        >
                          Application Form (Only PDF file less than 1Mb)
                        </label>
                        <span className="font-sans text-[11px] text-amber-700 font-bold uppercase tracking-wider">
                          (OPTIONAL)
                        </span>
                      </div>

                      <input
                        ref={appFormInputRef}
                        id="career-appForm"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleAppFormSelect}
                        className="hidden"
                      />

                      {!appFormFile ? (
                        <div
                          onClick={() => appFormInputRef.current?.click()}
                          className={`w-full rounded-lg border-2 border-dashed bg-slate-50/70 hover:bg-slate-100/70 px-4 py-3 sm:py-3.5 flex items-center justify-between cursor-pointer transition-all duration-200 ${
                            errors.appForm ? 'border-red-400 bg-red-50/30' : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                              <UploadSimple size={18} weight="bold" />
                            </div>
                            <div className="text-left">
                              <p className="text-xs sm:text-[13px] font-medium text-slate-700">
                                Optional: Attach filled application form
                              </p>
                              <p className="text-[11px] text-slate-400">PDF file only, max 1 MB</p>
                            </div>
                          </div>
                          <span className="rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-2xs">
                            Choose File
                          </span>
                        </div>
                      ) : (
                        <div className="w-full rounded-lg border border-slate-200 bg-[#f8fbff] px-4 py-2.5 flex items-center justify-between shadow-2xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-md bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
                              <FilePdf size={20} weight="fill" />
                            </div>
                            <div className="truncate text-left">
                              <p className="text-xs sm:text-[13px] font-semibold text-[#0c2340] truncate">
                                {appFormFile.name}
                              </p>
                              <p className="text-[11px] text-slate-500">{formatFileSize(appFormFile.size)}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeAppForm}
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer shrink-0 ml-2"
                            title="Remove file"
                          >
                            <Trash size={16} weight="bold" />
                          </button>
                        </div>
                      )}

                      {errors.appForm && (
                        <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <WarningCircle size={13} weight="bold" />
                          {errors.appForm}
                        </span>
                      )}
                    </div>

                    {/* Row 6: Submit & Reset Buttons */}
                    <div className="mt-3 flex flex-col sm:flex-row items-center gap-3">
                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex h-13 sm:h-14 flex-1 w-full items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-8 font-sans text-xs sm:text-[15px] font-semibold text-white shadow-sm brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-125 active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
                      >
                        <PaperPlaneTilt
                          size={18}
                          weight="fill"
                          className="text-blue-100 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
                        <CaretRight size={15} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5" />
                      </button>

                      {/* Reset Button */}
                      <button
                        type="button"
                        onClick={handleReset}
                        className="group flex h-13 sm:h-14 items-center justify-center gap-2 rounded-lg border border-slate-300/80 bg-white px-5 sm:px-6 font-sans text-xs sm:text-[14px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 active:scale-[0.98] cursor-pointer shrink-0 w-full sm:w-auto"
                      >
                        <ArrowCounterClockwise size={16} weight="bold" className="text-slate-500 transition-transform duration-200 group-hover:-rotate-45" />
                        <span>Reset</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* University Footer */}
      <Footer />
    </div>
  );
}
