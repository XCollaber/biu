import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  IdentificationCard,
  User,
  UsersThree,
  GraduationCap,
  CalendarBlank,
  Buildings,
  EnvelopeSimple,
  Phone,
  ChatTeardropText,
  FileText,
  PaperPlaneTilt,
  ArrowCounterClockwise,
  CheckCircle,
  WarningCircle,
  ShieldCheck,
  Info,
  Clock,
  MapPin,
  SealCheck,
  Printer,
  CaretRight,
} from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const EASE = [0.16, 1, 0.3, 1];

const COLLEGES_LIST = [
  'Rohilkhand Medical College & Hospital (RMCH)',
  'Institute of Dental Sciences (IDS)',
  'Rohilkhand College of Nursing (RCN)',
  'BIU College of Pharmacy',
  'Faculty of Allied and Health Care Sciences',
  'Faculty of Forensic Sciences',
  'BIU College of Management',
  'Faculty of Fine Arts (FFA)',
  'BIU College of Humanities & Journalism',
  'Rohilkhand Ayurvedic Medical College & Hospital (RAMCH)',
  'University Administrative / Central Examination Cell',
];

const SEMESTERS_LIST = [
  '1st Year / Semester 1',
  '1st Year / Semester 2',
  '2nd Year / Semester 3',
  '2nd Year / Semester 4',
  '3rd Year / Semester 5',
  '3rd Year / Semester 6',
  '4th Year / Semester 7',
  '4th Year / Semester 8',
  'Final Year / Internship',
  'Postgraduate / Research Scholar',
  'Alumni / Passed Out',
];

export default function GrievanceRedressalPage({ onBack }) {
  const reduceMotion = useReducedMotion();
  const formRef = useRef(null);

  const [form, setForm] = useState({
    enrollmentNo: '',
    name: '',
    fatherName: '',
    programme: '',
    semesterYear: '',
    collegeName: '',
    email: '',
    contactNo: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState(null);

  // Field change handler
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Phone number restriction (digits only, max 10)
  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    handleChange('contactNo', val);
  };

  // Reset handler
  const handleReset = () => {
    setForm({
      enrollmentNo: '',
      name: '',
      fatherName: '',
      programme: '',
      semesterYear: '',
      collegeName: '',
      email: '',
      contactNo: '',
      subject: '',
      message: '',
    });
    setErrors({});
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form validation & submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.enrollmentNo.trim()) {
      newErrors.enrollmentNo = 'Enrollment number is required.';
    }

    if (!form.name.trim()) {
      newErrors.name = 'Your full name is required.';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Please enter a valid full name.';
    }

    if (!form.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required.";
    }

    if (!form.programme.trim()) {
      newErrors.programme = 'Programme name is required.';
    }

    if (!form.semesterYear.trim()) {
      newErrors.semesterYear = 'Please specify semester or year.';
    }

    if (!form.collegeName.trim()) {
      newErrors.collegeName = 'Please select or enter your college name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!form.contactNo.trim()) {
      newErrors.contactNo = 'Contact number is required.';
    } else if (form.contactNo.replace(/\D/g, '').length !== 10) {
      newErrors.contactNo = 'Please enter a valid 10-digit mobile number.';
    }

    if (!form.subject.trim()) {
      newErrors.subject = 'Subject of grievance is required.';
    } else if (form.subject.trim().length < 4) {
      newErrors.subject = 'Subject must be at least 4 characters long.';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Please describe your suggestion / grievance.';
    } else if (form.message.trim().length < 15) {
      newErrors.message = 'Please provide sufficient detail (at least 15 characters).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = Object.keys(newErrors)[0];
      const el = document.getElementById(`grievance-${firstErrorField}`);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);

    // Simulate backend processing and generation of unique SGRC ticket ID
    setTimeout(() => {
      const generatedId = `BIU-SGRC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setTicketData({
        ticketId: generatedId,
        date: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        ...form,
      });
      setIsSubmitting(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 750);
  };

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-gold selection:text-[#0c2340]">
      {/* Top University Navigation */}
      <Navbar />

      {/* Hero Header Section - Consistent with University Theme */}
      <section className="relative bg-white border-b border-slate-200/80 pt-28 pb-10 sm:pt-32 sm:pb-14 font-sans z-20">
        {/* Heritage Diamond Lattice Background Overlay */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.035]" aria-hidden="true">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grievance-heritage-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 48 24 L 24 48 L 0 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.65" />
                <path d="M 24 9 L 39 24 L 24 39 L 9 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.60" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grievance-heritage-lattice)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          {/* Breadcrumb / Back button */}
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                if (onBack) {
                  e.preventDefault();
                  onBack();
                }
              }}
              className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-md border border-slate-200/70 sm:border-slate-300/80 bg-white px-2.5 py-1 sm:px-3.5 sm:py-1.5 font-sans text-[11px] sm:text-xs font-medium sm:font-semibold text-slate-600 sm:text-slate-700 shadow-2xs transition-all duration-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#0c2340]/90 hover:via-[#102d52]/90 hover:to-[#163860]/70 hover:text-white hover:brightness-125 hover:shadow-md active:scale-[0.98]"
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
                  STUDENT WELFARE & STATUTORY COMPLIANCE
                </span>
              </div>
              <h1 className="font-times text-[24px] sm:text-3xl lg:text-[2.65rem] font-medium text-[#0c2340] leading-[1.15]">
                Grievance Redressal Form
              </h1>
              <p className="mt-2 text-[12px] sm:text-sm text-slate-500 font-sans max-w-2xl leading-relaxed">
                Statutory student grievance redressal portal under UGC Regulations for prompt, confidential, and unbiased resolution of academic, hostel, and campus concerns.
              </p>
            </div>

            {/* Badges toolbar matching BIU style */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-lg border border-slate-300/80 bg-white px-3 sm:px-3.5 py-2 font-sans text-xs font-semibold text-slate-700 shadow-2xs">
                <SealCheck size={18} weight="bold" className="text-cyan-700 shrink-0" />
                <span>UGC SGRC Compliant</span>
              </div>
              <div className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-300/80 bg-white px-3 sm:px-3.5 py-2 font-sans text-xs font-semibold text-slate-700 shadow-2xs">
                <ShieldCheck size={18} weight="bold" className="text-cyan-700 shrink-0" />
                <span>100% Confidential Redressal</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section with Atmospheric Background */}
      <section className="relative z-[2] w-full overflow-hidden bg-[#fbfbfd] py-10 sm:py-14 lg:py-16 font-sans">
        {/* Atmospheric Background Wave Blob */}
        <div className="pointer-events-none absolute -right-28 sm:-right-10 top-20 w-[650px] lg:w-[850px] h-[650px] lg:h-[850px] bg-gradient-to-bl from-[#d9ebfb]/55 via-[#eaf4fd]/40 to-transparent rounded-full filter blur-3xl z-0 opacity-60" />


        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14">

            {/* =========================================================
                LEFT / MAIN COLUMN: GRIEVANCE REDRESSAL FORM (8 COLS)
            ========================================================= */}
            <div ref={formRef} className="lg:col-span-8 flex flex-col text-left">
              <div className="flex flex-col justify-start mb-4">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className="w-9 h-[4px] bg-gradient-to-r from-cyan-600 via-sky-500 to-transparent rounded-full" />
                  <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                    OFFICIAL SUBMISSION PORTAL
                  </span>
                </div>
                <h2 className="font-times text-[23.5px] sm:text-3xl font-medium text-[#0c2340]">
                  Submit Your Suggestion / Grievance
                </h2>
                <p className="font-sans text-xs sm:text-[13.5px] text-slate-600 font-normal leading-relaxed mt-1">
                  Please fill out the details accurately. All submissions are directly logged in the university grievance registry for committee review.
                </p>
              </div>

              {/* Form Card Container */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="overflow-hidden rounded-xl bg-white border border-slate-200/90 shadow-[0_16px_50px_-15px_rgba(12,35,64,0.12)]"
              >
                {/* Header Top Ribbon Matching University Blue Strip */}
                <div
                  style={{
                    background: 'linear-gradient(to right, rgba(7, 22, 44, 0.9) 0%, rgba(12, 35, 64, 0.75) 50%, rgba(7, 22, 44, 0.5) 100%)',
                  }}
                  className="px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-slate-200/80 text-white shrink-0"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={20} weight="fill" className="text-gray-100 shrink-0" />
                    <span className="font-sans text-[10px] sm:text-[13px] font-bold uppercase tracking-[0.08em] text-white">
                      STUDENT GRIEVANCE REDRESSAL<span className="hidden sm:inline"> (SGRC)</span> APPLICATION
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-blue-50 hidden sm:inline">
                    Confidential & Protected
                  </span>
                </div>

                {/* Form Body or Success State */}
                <div className="p-6 sm:p-8 lg:p-9">
                  {ticketData ? (
                    /* Success Confirmation State */
                    <div className="py-6 sm:py-8 text-center flex flex-col items-center">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm mb-4">
                        <CheckCircle size={36} weight="fill" />
                      </div>
                      <h3 className="font-times text-2xl sm:text-3xl text-[#0c2340] font-medium mb-2">
                        Grievance Registered Successfully
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
                        Your grievance has been securely logged with the Student Grievance Redressal Committee (SGRC) under statutory reference.
                      </p>

                      {/* Ticket Summary Box */}
                      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 text-left mb-6 font-sans">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3.5 sm:mr-10 -mr-1">
                          <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">Reference Ticket ID</span>
                          <span className="font-mono text-[11px] sm:text-base font-bold text-cyan-800 bg-cyan-100/70 border border-cyan-200 sm:px-2 px-1 py-0.5 rounded-md">
                            {ticketData.ticketId}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs sm:text-[13px] text-slate-700">
                          <div>
                            <span className="text-slate-400 block text-[11px]">Applicant Name:</span>
                            <strong className="font-semibold text-slate-900">{ticketData.name}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">Enrollment No:</span>
                            <strong className="font-semibold text-slate-900">{ticketData.enrollmentNo}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">College:</span>
                            <span className="font-medium truncate block">{ticketData.collegeName}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[11px]">Date & Time:</span>
                            <span className="font-medium">{ticketData.date}</span>
                          </div>
                          <div className="col-span-2 pt-1 border-t border-slate-200/70">
                            <span className="text-slate-400 block text-[11px]">Subject:</span>
                            <span className="font-medium text-slate-800">{ticketData.subject}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-all active:scale-[0.98]"
                        >
                          <Printer size={20} weight="bold" />
                          <span>Print Acknowledgement</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTicketData(null);
                            handleReset();
                          }}
                          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-5 py-2.5 text-[13px] font-semibold text-white brightness-125 hover:brightness-140 shadow-sm transition-all active:scale-[0.98]"
                        >
                          <span>Submit Another Grievance</span>
                          <CaretRight size={14} weight="bold" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* The 10 Form Input Fields from User's Screenshot */
                    <form onSubmit={handleSubmit} noValidate className="space-y-5">

                      {/* Row 1: Enrollment No, Your Name, Your Father's Name (3 Columns on Desktop) */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                        {/* 1. Enrollment No */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="grievance-enrollmentNo"
                            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                          >
                            Enrollment No <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="grievance-enrollmentNo"
                              type="text"
                              value={form.enrollmentNo}
                              onChange={(e) => handleChange('enrollmentNo', e.target.value)}
                              placeholder="e.g. BIU2023048"
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
                                errors.enrollmentNo
                                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                  : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                              }`}
                            />
                          </div>
                          {errors.enrollmentNo && (
                            <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                              <WarningCircle size={13} weight="bold" />
                              {errors.enrollmentNo}
                            </span>
                          )}
                        </div>

                        {/* 2. Your Name */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="grievance-name"
                            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                          >
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="grievance-name"
                              type="text"
                              value={form.name}
                              onChange={(e) => handleChange('name', e.target.value)}
                              placeholder="Enter Full Name"
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
                                errors.name
                                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                  : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                              }`}
                            />
                          </div>
                          {errors.name && (
                            <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                              <WarningCircle size={13} weight="bold" />
                              {errors.name}
                            </span>
                          )}
                        </div>

                        {/* 3. Your Father's Name */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="grievance-fatherName"
                            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                          >
                            Your Father&apos;s Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="grievance-fatherName"
                              type="text"
                              value={form.fatherName}
                              onChange={(e) => handleChange('fatherName', e.target.value)}
                              placeholder="Enter Father's Name"
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
                                errors.fatherName
                                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                  : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                              }`}
                            />
                          </div>
                          {errors.fatherName && (
                            <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                              <WarningCircle size={13} weight="bold" />
                              {errors.fatherName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Programme Name, Semester / Year, College Name (3 Columns on Desktop) */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                        {/* 4. Programme Name */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="grievance-programme"
                            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                          >
                            Programme Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="grievance-programme"
                              type="text"
                              value={form.programme}
                              onChange={(e) => handleChange('programme', e.target.value)}
                              placeholder="e.g. MBBS, BDS, B.Sc. Nursing, MBA"
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
                                errors.programme
                                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                  : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                              }`}
                            />
                          </div>
                          {errors.programme && (
                            <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                              <WarningCircle size={13} weight="bold" />
                              {errors.programme}
                            </span>
                          )}
                        </div>

                        {/* 5. Semester / Year */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="grievance-semesterYear"
                            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                          >
                            Semester / Year <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="grievance-semesterYear"
                              list="semesters-list"
                              type="text"
                              value={form.semesterYear}
                              onChange={(e) => handleChange('semesterYear', e.target.value)}
                              placeholder="e.g. 2nd Year / 3rd Sem"
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
                                errors.semesterYear
                                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                  : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                              }`}
                            />
                            <datalist id="semesters-list">
                              {SEMESTERS_LIST.map((item, idx) => (
                                <option key={idx} value={item} />
                              ))}
                            </datalist>
                          </div>
                          {errors.semesterYear && (
                            <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                              <WarningCircle size={13} weight="bold" />
                              {errors.semesterYear}
                            </span>
                          )}
                        </div>

                        {/* 6. College Name */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="grievance-collegeName"
                            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                          >
                            College Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="grievance-collegeName"
                              list="colleges-list"
                              type="text"
                              value={form.collegeName}
                              onChange={(e) => handleChange('collegeName', e.target.value)}
                              placeholder="Select or enter college"
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
                                errors.collegeName
                                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                  : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                              }`}
                            />
                            <datalist id="colleges-list">
                              {COLLEGES_LIST.map((cName, idx) => (
                                <option key={idx} value={cName} />
                              ))}
                            </datalist>
                          </div>
                          {errors.collegeName && (
                            <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                              <WarningCircle size={13} weight="bold" />
                              {errors.collegeName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Row 3: Your Email, Your Contact No. (2 Columns on Desktop) */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        {/* 7. Your Email */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="grievance-email"
                            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                          >
                            Your Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              id="grievance-email"
                              type="email"
                              value={form.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder="e.g. student@biu.edu.in"
                              className={`w-full rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
                                errors.email
                                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                  : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                              <WarningCircle size={13} weight="bold" />
                              {errors.email}
                            </span>
                          )}
                        </div>

                        {/* 8. Your Contact No. */}
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="grievance-contactNo"
                            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                          >
                            Your Contact No. <span className="text-red-500">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <span className="absolute left-3 font-sans text-xs sm:text-sm font-semibold text-slate-400">
                              +91
                            </span>
                            <input
                              id="grievance-contactNo"
                              type="tel"
                              value={form.contactNo}
                              onChange={handlePhoneChange}
                              placeholder="10-digit mobile number"
                              maxLength={10}
                              className={`w-full rounded-lg border pl-11 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
                                errors.contactNo
                                  ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                  : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                              }`}
                            />
                          </div>
                          {errors.contactNo && (
                            <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                              <WarningCircle size={13} weight="bold" />
                              {errors.contactNo}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Row 4: Subject (Full Width) */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="grievance-subject"
                          className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                        >
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="grievance-subject"
                            type="text"
                            value={form.subject}
                            onChange={(e) => handleChange('subject', e.target.value)}
                            placeholder="Brief subject of your grievance or suggestion"
                            className={`w-full rounded-lg border px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 ${
                              errors.subject
                                ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                            }`}
                          />
                        </div>
                        {errors.subject && (
                          <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                            <WarningCircle size={13} weight="bold" />
                            {errors.subject}
                          </span>
                        )}
                      </div>

                      {/* Row 5: Enter Your Suggestion/Grievance (Textarea Full Width) */}
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <label
                            htmlFor="grievance-message"
                            className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700"
                          >
                            Enter Your Grievance <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {form.message.length}/1500 chars
                          </span>
                        </div>
                        <div className="relative">
                          <textarea
                            id="grievance-message"
                            rows={5}
                            maxLength={1500}
                            value={form.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            placeholder="Please enter your suggestion / grievance clearly including relevant dates, faculty, or incident context..."
                            className={`w-full rounded-lg border p-3.5 text-[12px] sm:text-sm text-slate-800 placeholder-slate-400 shadow-2xs transition-all duration-200 resize-y focus:bg-white focus:outline-none focus:ring-2 ${
                              errors.message
                                ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-red-400/20'
                                : 'border-slate-300/80 bg-white hover:border-slate-400 focus:border-cyan-700 focus:ring-cyan-700/20'
                            }`}
                          />
                        </div>
                        {errors.message && (
                          <span className="font-sans text-[11px] text-red-600 font-medium flex items-center gap-1">
                            <WarningCircle size={13} weight="bold" />
                            {errors.message}
                          </span>
                        )}
                      </div>

                      {/* Row 6: Submit & Reset Action Buttons */}
                      <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group flex h-11 sm:h-14 w-full sm:w-auto sm:flex-1 items-center justify-center gap-2 sm:gap-2.5 rounded-lg bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-4 sm:px-8 font-sans text-xs sm:text-[14px] font-bold uppercase tracking-wider text-white shadow-sm brightness-125 transition-all duration-200 hover:shadow-lg hover:brightness-140 active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:pointer-events-none whitespace-nowrap shrink-0"
                        >
                          <PaperPlaneTilt
                            size={17}
                            weight="fill"
                            className="text-blue-100 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0"
                          />
                          <span>{isSubmitting ? 'Submitting Grievance...' : 'Submit Your Grievance'}</span>
                          <CaretRight size={15} weight="bold" className="text-white/90 transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" />
                        </button>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="group flex h-10 sm:h-14 items-center justify-center gap-1.5 sm:gap-2 rounded-lg border border-slate-300/80 bg-white px-5 sm:px-6 font-sans text-xs sm:text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 active:scale-[0.98] cursor-pointer shrink-0 w-full sm:w-auto whitespace-nowrap"
                        >
                          <ArrowCounterClockwise size={15} weight="bold" className="text-slate-500 transition-transform duration-200 group-hover:-rotate-45 shrink-0" />
                          <span>Reset Form</span>
                        </button>
                      </div>

                    </form>
                  )}
                </div>
              </motion.div>
            </div>

            {/* =========================================================
                RIGHT SIDEBAR COLUMN: STATUTORY INFO & SUPPORT (4 COLS)
            ========================================================= */}
            <div className="lg:col-span-4 flex flex-col gap-6 sm:mt-24 mt-0">

              {/* Card 1: Statutory Guidelines & SGRC Mechanism */}
              <div className="rounded-xl bg-white mt-2 border border-slate-200/90 p-5 sm:p-6 shadow-[0_12px_36px_-10px_rgba(12,35,64,0.08)] text-left">
                <div className="flex items-center gap-2 mb-3.5">
                  <Info size={20} weight="bold" className="text-cyan-700 shrink-0" />
                  <h3 className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0c2340]">
                    SGRC Guidelines
                  </h3>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-sans">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-800 font-bold shrink-0">•</span>
                    <span>
                      <strong className="text-slate-800 font-semibold">Statutory Authority:</strong> Functioning strictly under UGC (Redressal of Grievances of Students) Regulations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-800 font-bold shrink-0">•</span>
                    <span>
                      <strong className="text-slate-800 font-semibold">Jurisdiction:</strong> Covers admissions, examinations, fee discrepancies, evaluation, hostel, and conduct.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-800 font-bold shrink-0">•</span>
                    <span>
                      <strong className="text-slate-800 font-semibold">Resolution Timeline:</strong> Grievances are reviewed within <span className="underline underline-offset-2 font-medium">15 working days</span> by the Student Grievance Redressal Committee.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-800 font-bold shrink-0">•</span>
                    <span>
                      <strong className="text-slate-800 font-semibold">Appeal Option:</strong> Any student aggrieved by SGRC decision may appeal to the University Ombudsperson.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Helpdesk & Direct Support Contacts */}
              <div className="rounded-xl bg-slate-50/90 border border-slate-200/80 p-5 sm:p-6 shadow-2xs text-left">
                <div className="flex items-center gap-2 mb-3">
                  <UsersThree size={20} weight="bold" className="text-cyan-700 shrink-0" />
                  <h4 className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0c2340]">
                    Direct Grievance Cell
                  </h4>
                </div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed font-sans">
                  For urgent assistance, escalation, or physical submission of supporting grievance documents:
                </p>

                <div className="space-y-3 font-sans text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <EnvelopeSimple size={16} className="text-cyan-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">Official Email:</span>
                      <a href="mailto:grievance@biu.edu.in" className="font-semibold text-cyan-800 hover:underline">
                        grievance@biu.edu.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone size={16} className="text-cyan-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">Helpline Phone:</span>
                      <a href="tel:+915812526244" className="font-bold text-slate-900 hover:underline">
                        +91 (581) 2526244 / 2526153
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 border-t border-slate-200/70">
                    <MapPin size={16} className="text-cyan-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[11px]">Physical Cell Location:</span>
                      <span className="text-slate-600 text-[11.5px] leading-relaxed block">
                        Office of the Registrar / SGRC Secretariat, Administrative Block, BIU Main Campus, Bareilly.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* University Footer */}
      <Footer />
    </div>
  );
}
