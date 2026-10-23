import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Stethoscope,
  Tooth,
  FirstAid,
  Pill,
  Buildings,
  BookOpenText,
  PaintBrush,
  Heartbeat,
  Flask,
  Plant,
  GraduationCap,
  Plus,
  Minus,
  MagnifyingGlass,
  FilePdf,
  ArrowSquareOut,
  CheckCircle,
  Clock,
  Users,
  Check,
  ShareNetwork,
  Printer,
  Sparkle,
  ArrowRight,
  CaretRight,
  Info,
  List,
  X,
} from '@phosphor-icons/react';
import programmesData from '../../data/programmes.json';

const EASE = [0.16, 1, 0.3, 1];

// Category Icons Registry
const CATEGORY_ICONS = {
  Stethoscope,
  Tooth,
  FirstAid,
  Pill,
  Buildings,
  BookOpenText,
  PaintBrush,
  Heartbeat,
  Flask,
  Plant,
  GraduationCap,
};

export default function ProgrammesExplorer() {
  const reduceMotion = useReducedMotion();
  const contentRef = useRef(null);

  // Initialize selected category & course
  const initialCategory = programmesData.categories[0];
  const initialCourse = initialCategory.courses[0];

  const [openCategoryId, setOpenCategoryId] = useState(initialCategory.id);
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourse.id);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Read URL query params on mount for deep linking (e.g. ?course=md or ?category=dental-sciences)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const courseParam = params.get('course') || window.location.hash.replace('#', '');
    const categoryParam = params.get('category');

    if (courseParam) {
      for (const cat of programmesData.categories) {
        const found = cat.courses.find(
          (c) => c.id.toLowerCase() === courseParam.toLowerCase() || c.shortName.toLowerCase() === courseParam.toLowerCase()
        );
        if (found) {
          setOpenCategoryId(cat.id);
          setSelectedCourseId(found.id);
          return;
        }
      }
    }

    if (categoryParam) {
      const foundCat = programmesData.categories.find(
        (c) => c.id.toLowerCase() === categoryParam.toLowerCase()
      );
      if (foundCat) {
        setOpenCategoryId(foundCat.id);
        if (foundCat.courses.length > 0) {
          setSelectedCourseId(foundCat.courses[0].id);
        }
      }
    }
  }, []);

  // Update URL search params cleanly without reload when user selects course
  const selectCourse = (categoryId, courseId, scrollToTop = false) => {
    setOpenCategoryId(categoryId);
    setSelectedCourseId(courseId);
    setMobileDrawerOpen(false);

    if (typeof window !== 'undefined') {
      const newUrl = `${window.location.pathname}?course=${courseId}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);

      if (scrollToTop && contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const toggleCategory = (categoryId) => {
    if (openCategoryId === categoryId) {
      // Toggle accordion closed if already open
      setOpenCategoryId(null);
    } else {
      setOpenCategoryId(categoryId);
      // Auto-select first course in that category if current selected course isn't in it
      const category = programmesData.categories.find((c) => c.id === categoryId);
      if (category && category.courses.length > 0) {
        const hasCurrentCourse = category.courses.some((c) => c.id === selectedCourseId);
        if (!hasCurrentCourse) {
          selectCourse(categoryId, category.courses[0].id, false);
        }
      }
    }
  };

  // Find active course and active category
  const activeCourse = useMemo(() => {
    for (const cat of programmesData.categories) {
      const match = cat.courses.find((c) => c.id === selectedCourseId);
      if (match) return match;
    }
    return initialCourse;
  }, [selectedCourseId, initialCourse]);

  const activeCategory = useMemo(() => {
    return programmesData.categories.find((c) =>
      c.courses.some((course) => course.id === activeCourse.id)
    ) || initialCategory;
  }, [activeCourse, initialCategory]);

  // Search filter across all courses
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return programmesData.categories;

    const q = searchQuery.toLowerCase().trim();
    return programmesData.categories
      .map((cat) => {
        const matchingCourses = cat.courses.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.shortName.toLowerCase().includes(q) ||
            cat.name.toLowerCase().includes(q)
        );
        if (matchingCourses.length > 0 || cat.name.toLowerCase().includes(q)) {
          return {
            ...cat,
            courses: matchingCourses.length > 0 ? matchingCourses : cat.courses,
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [searchQuery]);

  // Copy deep-link action
  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}${window.location.pathname}?course=${activeCourse.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Handle print
  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 font-sans pb-24">
      {/* Header Breadcrumbs & Notice Strip */}
      <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap">
            <a href="/" className="hover:text-navy transition-colors font-medium">Home</a>
            <CaretRight size={12} className="text-slate-400" />
            <span className="text-slate-400">Academics</span>
            <CaretRight size={12} className="text-slate-400" />
            <span className="font-semibold text-navy">{activeCategory.name}</span>
            <CaretRight size={12} className="text-slate-400" />
            <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {activeCourse.shortName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors font-medium active:scale-[0.98]"
              title="Share this course"
            >
              {copiedLink ? <Check size={14} className="text-emerald-600" /> : <ShareNetwork size={14} />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors font-medium active:scale-[0.98]"
              title="Print course curriculum sheet"
            >
              <Printer size={14} />
              <span>Print</span>
            </button> */}

            <a
              href="https://enquiry.biuerp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#0c2340] hover:bg-[#163860] text-white font-semibold px-3 py-1 rounded-md shadow-sm transition-all duration-200 active:scale-[0.98]"
            >
              <span>Apply Online 2026</span>
              <ArrowSquareOut size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Course Switcher Button */}
      {/* <div className="lg:hidden mx-4 my-4">
        <button
          onClick={() => setMobileDrawerOpen(true)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#0c2340] text-white rounded-xl shadow-md border border-navy-light font-medium text-sm active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-2.5 truncate">
            <List size={18} className="text-white shrink-0" />
            <span className="truncate">Select Programme: <strong className="text-white font-semibold">{activeCourse.shortName}</strong></span>
          </div>
          <span className="text-[11px] uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded text-white/90 shrink-0">
            Change
          </span>
        </button>
      </div> */}

      {/* Main Two-Column Layout */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ========================================================
              LEFT SIDEBAR: PROGRAMMES ACCORDION MENU
             ======================================================== */}
          <aside className="lg:col-span-4 xl:col-span-3.5 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden sticky top-16">
              
              {/* Sidebar Header matching screenshot */}
              <div className="p-4 sm:p-5 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800">
                    Programmes Available
                  </h2>
                  <span className="text-[11px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200">
                    2026–27
                  </span>
                </div>

                {/* Instant Search Bar */}
                <div className="mt-3 relative">
                  <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search e.g. MBBS, Dental, MBA..."
                    className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Accordion Categories List */}
              <div className="divide-y divide-slate-100 max-h-[calc(100vh-220px)] overflow-y-auto">
                {filteredCategories.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 text-sm">
                    No programmes found matching <span className="font-semibold text-slate-700">"{searchQuery}"</span>
                  </div>
                ) : (
                  filteredCategories.map((cat) => {
                    const isOpen = openCategoryId === cat.id;
                    const IconComp = CATEGORY_ICONS[cat.icon] || GraduationCap;
                    const isCategoryActive = activeCategory.id === cat.id;

                    return (
                      <div key={cat.id} className="transition-colors">
                        {/* Category Title Row */}
                        <button
                          onClick={() => toggleCategory(cat.id)}
                          className={`w-full flex items-center justify-between text-left px-4 py-3 sm:py-3.5 transition-all duration-200 select-none ${
                            isOpen
                              ? 'bg-[#0c2340] text-white shadow-inner font-semibold'
                              : isCategoryActive
                              ? 'bg-slate-50 text-slate-900 font-semibold hover:bg-slate-100'
                              : 'text-slate-700 hover:bg-slate-50 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            {/* Left Plus/Minus Box matching screenshot design */}
                            <span
                              className={`flex items-center justify-center w-5 h-5 rounded text-xs transition-transform duration-200 shrink-0 ${
                                isOpen
                                  ? 'bg-white/20 text-white'
                                  : 'bg-slate-100 text-slate-600 border border-slate-200'
                              }`}
                            >
                              {isOpen ? <Minus size={12} weight="bold" /> : <Plus size={12} weight="bold" />}
                            </span>

                            {/* Category Icon */}
                            <span className={`shrink-0 ${isOpen ? 'text-white' : 'text-slate-700'}`}>
                              <IconComp size={25} weight={isOpen ? 'fill' : 'regular'} />
                            </span>

                            {/* Category Name */}
                            <span className="text-sm sm:text-[13.5px] truncate">
                              {cat.name}
                            </span>
                          </div>

                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                            isOpen ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {cat.courses.length}
                          </span>
                        </button>

                        {/* Sub-courses List */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: EASE }}
                              className="overflow-hidden bg-slate-50/90 border-t border-navy-light/40"
                            >
                              <div className="py-1">
                                {cat.courses.map((course) => {
                                  const isSelected = selectedCourseId === course.id;

                                  return (
                                    <button
                                      key={course.id}
                                      onClick={() => selectCourse(cat.id, course.id, true)}
                                      className={`w-full flex items-center justify-between text-left pl-11 pr-4 py-2.5 text-xs sm:text-[13px] transition-all relative ${
                                        isSelected
                                          ? 'font-bold text-slate-900 bg-slate-100/90 shadow-sm border-l-4 border-[#0c2340]'
                                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 font-normal border-l-4 border-transparent'
                                      }`}
                                    >
                                      <span className="truncate pr-2">{course.shortName}</span>
                                      {isSelected && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#0c2340] shrink-0" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Sidebar Quick Help Card */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2 font-medium text-slate-700">
                  <Info size={18} className="text-slate-600" />
                  <span>Admission Helpline</span>
                </div>
                <p className="text-[13px] leading-relaxed text-slate-500">
                  Call our official university counselors for fee structure, hostel allotment & eligibility queries:
                </p>
                <a
                  href="tel:+917055510700"
                  className="font-bold text-navy hover:text-[#163860] text-sm block transition-colors"
                >
                  📞 {programmesData.pageHeader.helpline}
                </a>
              </div>
            </div>
          </aside>

          {/* ========================================================
              RIGHT MAIN PANEL: SELECTED COURSE DETAILS
             ======================================================== */}
          <main ref={contentRef} className="lg:col-span-8 xl:col-span-8.5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCourse.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-5 sm:p-8 lg:p-9 space-y-8"
              >

                {/* Course Title Header (Verbatim match to screenshot design) */}
                <div className="border-b border-slate-100 pb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {activeCategory.name}
                    </span>
                    {/* <span>•</span> */}
                    {/* <span className="text-slate-600 font-mono">
                      {activeCategory.approval}
                    </span> */}
                  </div>

                  <h1 className="text-xl sm:text-2xl md:text-3xl font-normal text-slate-800 leading-snug">
                    <span className="font-semibold text-slate-900">Course Name: </span>
                    <span className="text-slate-900 font-bold">
                      {activeCourse.name}
                    </span>
                  </h1>

                  {/* Institution banner */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 font-medium">
                    Offered by: <span className="text-navy font-semibold">{activeCategory.institution}</span>
                  </p>
                </div>

                {/* Quick Info Grid Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/90 rounded-xl p-3 sm:p-4 border border-slate-200/60 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                      <Clock size={14} className="text-slate-600" />
                      <span>Duration</span>
                    </div>
                    <p className="font-bold text-slate-800 line-clamp-2">
                      {activeCourse.duration}
                    </p>
                  </div>

                  <div className="space-y-1 border-l border-slate-200/60 pl-3">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                      <Users size={14} className="text-slate-600" />
                      <span>Annual Intake</span>
                    </div>
                    <p className="font-bold text-slate-800">
                      {activeCourse.intake} Seats
                    </p>
                  </div>

                  <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-2 sm:pt-0 sm:pl-3">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                      <CheckCircle size={14} className="text-slate-600" />
                      <span>Regulatory Body</span>
                    </div>
                    <p className="font-bold text-slate-800">
                      {activeCourse.regulationBody}
                    </p>
                  </div>

                  <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-200/60 pt-2 sm:pt-0 sm:pl-3">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                      <Sparkle size={14} className="text-slate-600" />
                      <span>Exam System</span>
                    </div>
                    <p className="font-bold text-slate-800">
                      {activeCourse.examinationSystem}
                    </p>
                  </div>
                </div>

                {/* Main Detailed Specifications List (verbatim layout matching screenshots) */}
                <div className="space-y-5 text-sm sm:text-[14.5px] leading-relaxed text-slate-700">
                  
                  {/* Course Duration */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 inline">Course Duration : </h3>
                    <span className="text-slate-700">{activeCourse.duration}</span>
                  </div>

                  {/* Annual Intake */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 inline">Annual Intake : </h3>
                    <span className="text-slate-700 font-semibold">{activeCourse.intake}</span>
                  </div>

                  {/* Eligibility */}
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-900 block sm:inline">Eligibility : </h3>
                    <p className="text-slate-700 text-justify sm:text-left leading-relaxed">
                      {activeCourse.eligibility}
                    </p>
                  </div>

                  {/* Admission Process */}
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-900 block sm:inline">Admission Process : </h3>
                    <p className="text-slate-700 text-justify sm:text-left leading-relaxed">
                      {activeCourse.admissionProcess}
                    </p>
                  </div>

                  {/* Hostel */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 inline">Hostel : </h3>
                    <span className="text-slate-700">{activeCourse.hostel}</span>
                  </div>

                  {/* Tuition Fee */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 inline">Tuition Fee : </h3>
                    <span className="text-slate-900 font-bold hover:underline cursor-pointer">
                      {activeCourse.tuitionFee}
                    </span>
                  </div>

                  {/* Examination System */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 inline">Examination System : </h3>
                    <span className="text-slate-700">{activeCourse.examinationSystem}</span>
                  </div>

                  {/* Regulation Body */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 inline">Regulation Body : </h3>
                    <span className="text-slate-700 font-medium">{activeCourse.regulationBody}</span>
                  </div>

                  {/* How to Apply */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="font-bold text-slate-900 block">How to Apply : </h3>
                    <p className="text-slate-700 text-justify sm:text-left leading-relaxed bg-slate-50/60 p-4 rounded-xl border border-slate-200/50">
                      {activeCourse.howToApply}
                    </p>
                  </div>
                </div>

                {/* ========================================================
                    SPECIALIZATIONS TABLE (Rendered if course has them, e.g. MD, MS, MDS)
                   ======================================================== */}
                {activeCourse.specializations && activeCourse.specializations.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="border-b-2 border-[#0c2340] pb-1.5 inline-block">
                      <h3 className="text-base sm:text-lg font-bold text-slate-800">
                        Specializations Information
                      </h3>
                    </div>

                    {/* Table Tab / Subheading */}
                    <div className="inline-block bg-slate-100 border border-slate-200 px-3 py-1 rounded-t text-xs font-semibold text-slate-700">
                      {activeCourse.shortName} (Specializations)
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        {/* Dark Navy Header Bar */}
                        <thead>
                          <tr className="bg-[#0c2340] text-white font-bold">
                            <th className="py-3 px-4 sm:px-6 border-b border-[#08172b]">Course Name</th>
                            <th className="py-3 px-4 sm:px-6 border-b border-[#08172b]">Course Duration</th>
                            <th className="py-3 px-4 sm:px-6 border-b border-[#08172b] text-right sm:text-left">Intake</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {activeCourse.specializations.map((spec, index) => (
                            <tr
                              key={index}
                              className={`transition-colors ${
                                index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                              } hover:bg-slate-100/60`}
                            >
                              <td className="py-3 px-4 sm:px-6 font-medium text-slate-900">
                                {spec.courseName}
                              </td>
                              <td className="py-3 px-4 sm:px-6 text-slate-600">
                                {spec.duration}
                              </td>
                              <td className="py-3 px-4 sm:px-6 font-bold text-slate-900 text-right sm:text-left">
                                {spec.intake}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                
                {/* ========================================================
                    SPECIALIZATIONS TABLE 2 (Rendered if course has them, e.g. MD, MS, MDS)
                   ======================================================== */}
                {activeCourse.specializations2 && activeCourse.specializations2.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="border-b-2 border-[#0c2340] pb-1.5 inline-block">
                      <h3 className="text-base sm:text-lg font-bold text-slate-800">
                        Specializations Information
                      </h3>
                    </div>

                    {/* Table Tab / Subheading */}
                    <div className="inline-block bg-slate-100 border border-slate-200 px-3 py-1 rounded-t text-xs font-semibold text-slate-700">
                      {activeCourse.shortName} (Specializations)
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        {/* Dark Navy Header Bar */}
                        <thead>
                          <tr className="bg-[#0c2340] text-white font-bold">
                            <th className="py-3 px-4 sm:px-6 border-b border-[#08172b]">Course Name</th>
                            <th className="py-3 px-4 sm:px-6 border-b border-[#08172b]">Course Duration</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {activeCourse.specializations2.map((spec, index) => (
                            <tr
                              key={index}
                              className={`transition-colors ${
                                index % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'
                              } hover:bg-slate-100/60`}
                            >
                              <td className="py-3 px-4 sm:px-6 font-medium text-slate-900">
                                {spec.courseName}
                              </td>
                              <td className="py-3 px-4 sm:px-6 text-slate-600">
                                {spec.duration}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Primary CTA Action Row */}
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={activeCourse.applyUrl || "https://enquiry.biuerp.com/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#0c2340] hover:bg-[#163860] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm active:scale-[0.97]"
                    >
                      <span>Apply Now</span>
                      <ArrowRight size={16} weight="bold" />
                    </a>

                    {/* Download Curriculum / Syllabus PDF */}
                    <a
                      href={activeCourse.pdfUrl}
                      download
                      className="inline-flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl border border-slate-200/80 transition-all duration-200 text-sm active:scale-[0.97]"
                    >
                      <FilePdf size={18} className="text-slate-700" weight="fill" />
                      <span>Download Brochure</span>
                    </a>
                  </div>

                  {/* <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100 animate-pulse" />
                    <span>Admissions Open for Session 2026–27</span>
                  </div> */}
                </div>

              </motion.div>
            </AnimatePresence>

            {/* University Trust & Accreditations Banner */}
            {/* <div className="bg-gradient-to-r from-navy via-navy-light to-navy text-white rounded-2xl p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">
                  Accreditation & Approvals
                </span>
                <h3 className="text-lg sm:text-xl font-bold">
                  Bareilly International University (BIU)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Established under Uttar Pradesh Act No. 26 of 2016. NAAC A+ premier university with a 1000+ bed teaching multi-specialty hospital.
                </p>
              </div>

              <a
                href="/faculties"
                className="shrink-0 inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-navy font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98]"
              >
                <span>View Campus & Labs</span>
                <ArrowRight size={14} weight="bold" />
              </a>
            </div> */}

          </main>
        </div>
      </div>

      {/* ========================================================
          MOBILE DRAWER / MODAL FOR SELECTING PROGRAMMES
         ======================================================== */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Select Academic Programme</h3>
                  <p className="text-xs text-slate-500">Tap any course to view full details</p>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="overflow-y-auto p-4 space-y-4">
                {programmesData.categories.map((cat) => {
                  const IconComp = CATEGORY_ICONS[cat.icon] || GraduationCap;

                  return (
                    <div key={cat.id} className="border border-slate-200 rounded-xl overflow-hidden">
                      <div className="bg-slate-100 px-3.5 py-2.5 flex items-center gap-2 font-bold text-xs text-slate-800">
                        <IconComp size={16} className="text-[#0c2340]" />
                        <span>{cat.name}</span>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {cat.courses.map((course) => {
                          const isSelected = selectedCourseId === course.id;

                          return (
                            <button
                              key={course.id}
                              onClick={() => selectCourse(cat.id, course.id, true)}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-xs text-left ${
                                isSelected ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-700'
                              }`}
                            >
                              <span>{course.name}</span>
                              {isSelected && <Check size={14} className="text-[#0c2340] shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}