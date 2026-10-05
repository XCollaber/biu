import { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  FolderSimple,
  User,
  FacebookLogo,
  TwitterLogo,
  LinkedinLogo,
  PinterestLogo,
  WhatsappLogo,
  LinkSimple,
  Check,
  PaperPlaneTilt,
  Quotes,
  X,
  CaretLeft,
  CaretRight,
  MagnifyingGlassPlus
} from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Img from '../Img';
import initialRecentComments from '../../data/recentComments.json';

export default function NewsDetailPage({
  article,
  allPosts = []
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    website: '',
    comment: '',
    saveInfo: false
  });
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Scroll to top whenever article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article]);

  // Handle escape key to close gallery lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIdx(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Compute Previous and Next posts for navigation
  const { prevPost, nextPost } = useMemo(() => {
    if (!article || allPosts.length === 0) return { prevPost: null, nextPost: null };
    const idx = allPosts.findIndex(
      (p) => (p.id && p.id === article.id) || p.title === article.title
    );
    return {
      prevPost: idx > 0 ? allPosts[idx - 1] : null,
      nextPost: idx >= 0 && idx < allPosts.length - 1 ? allPosts[idx + 1] : null
    };
  }, [allPosts, article]);

  // Recent posts for sidebar (first 5)
  const recentPosts = useMemo(() => {
    return allPosts.slice(0, 5);
  }, [allPosts]);

  const [recentComments, setRecentComments] = useState(initialRecentComments || []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.comment) return;
    setCommentSubmitted(true);

    if (article) {
      setRecentComments((prev) => [
        {
          author: commentForm.name + (commentForm.website ? ` (${commentForm.website})` : ''),
          articleTitle: article.title,
          articleLink: `/news/${encodeURIComponent(article.id)}`,
          comment: commentForm.comment,
          date: 'Just now'
        },
        ...prev.slice(0, 3)
      ]);
    }

    setTimeout(() => {
      setCommentSubmitted(false);
      setCommentForm({ name: '', email: '', website: '', comment: '', saveInfo: false });
    }, 4000);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.location.href = `/news?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  if (!article) return null;

  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-gold selection:text-[#0c2340]">
      <Navbar />

      {/* TOP HERO HEADER */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/80 pt-28 pb-8 sm:pt-32 sm:pb-12 font-sans">
        {/* Subtle Background Pattern - Double-Line Diamond Lattice */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035]" aria-hidden="true">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="news-detail-heritage-lattice" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 48 24 L 24 48 L 0 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.65" />
                <path d="M 24 9 L 39 24 L 24 39 L 9 24 Z" fill="none" stroke="#0c2340" strokeWidth="0.60" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#news-detail-heritage-lattice)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          {/* Back button */}
          <div className="mb-4 sm:mb-6">
            <a
              href="/news"
              className="group inline-flex items-center gap-2 rounded-md border border-slate-300/80 bg-white px-3.5 py-1.5 font-sans text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-200 hover:border-transparent hover:bg-gradient-to-r hover:from-[#0c2340]/90 hover:via-[#102d52]/90 hover:to-[#163860]/70 hover:text-white hover:brightness-125 hover:shadow-md active:scale-[0.98] cursor-pointer"
            >
              <ArrowLeft size={14} weight="bold" className="transition-transform group-hover:-translate-x-0.5" />
              <span>Back to All Events</span>
            </a>
          </div>

          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="w-8 h-[3.5px] bg-gold rounded-full" />
              <span className="font-sans text-[12px] sm:text-xs font-black uppercase tracking-[0.22em] text-[#0c2340]">
                EVENT DETAILS
              </span>
            </div>
            <h1 className="mt-6 font-times text-2xl sm:text-3xl lg:text-[2.6rem] font-medium text-[#0c2340] leading-[1.15]">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="relative z-10 w-full py-8 sm:py-12 md:pb-16 font-sans">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
            
            {/* LEFT MAIN ARTICLE COLUMN */}
            <div className="flex-1 w-full min-w-0">
              <article className="text-left">
                {/* Big Featured Image */}
                <div className="relative w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-200/80 shadow-xs mb-4">
                  <Img
                    src={article.img || article.image}
                    alt={article.title}
                    className="w-full max-h-[540px] object-cover object-top"
                  />
                </div>

                {/* Metadata Row Below Image (Date, Category, Author) */}
                <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 py-3.5 border-b border-slate-200/80 font-sans text-xs sm:text-[12.5px] font-medium text-slate-600 mb-6">
                  {article.date && (
                    <div className="flex items-center gap-2">
                      <Calendar size={15} weight="bold" className="text-gold-dark" />
                      <span className="text-slate-700">{article.date}</span>
                    </div>
                  )}
                  {article.category && (
                    <div className="flex items-center gap-2">
                      <FolderSimple size={15} weight="bold" className="text-gold-dark" />
                      <span className="text-slate-700">
                        {article.category}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <User size={15} weight="bold" className="text-gold-dark" />
                    <span className="text-slate-700">BIU Editorial Desk</span>
                  </div>
                </div>

                {/* Event Quick Info Box (If provided by CMS) */}
                {article.eventDetails && (
                  <div className="mb-8 rounded-xl border border-slate-200/90 bg-slate-50/60 p-5 sm:p-6 text-left shadow-2xs">
                    <h3 className="font-times text-xl sm:text-2xl font-semibold text-[#0c2340] mb-3.5 pb-2 border-b border-slate-200/70">
                      Event Details
                    </h3>
                    <div className="space-y-2.5 font-sans text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                      {article.eventDetails.event && (
                        <p><strong className="font-semibold text-[#0c2340]">Event:</strong> {article.eventDetails.event}</p>
                      )}
                      {article.eventDetails.dates && (
                        <p><strong className="font-semibold text-[#0c2340]">Dates:</strong> {article.eventDetails.dates}</p>
                      )}
                      {article.eventDetails.venue && (
                        <p><strong className="font-semibold text-[#0c2340]">Venue:</strong> {article.eventDetails.venue}</p>
                      )}
                      {article.eventDetails.highlights && (
                        <p>
                          <strong className="font-semibold text-[#0c2340]">Highlights:</strong>{' '}
                          {Array.isArray(article.eventDetails.highlights)
                            ? article.eventDetails.highlights.join(' | ')
                            : article.eventDetails.highlights}
                        </p>
                      )}
                      {article.eventDetails.contact && (
                        <p><strong className="font-semibold text-[#0c2340]">Contact:</strong> {article.eventDetails.contact}</p>
                      )}
                      {article.eventDetails.website && (
                        <p>
                          <strong className="font-semibold text-[#0c2340]">Website:</strong>{' '}
                          <a
                            href={article.eventDetails.website.startsWith('http') ? article.eventDetails.website : `https://${article.eventDetails.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-900 hover:underline font-medium"
                          >
                            {article.eventDetails.website}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Article Main Story Content */}
                <div className="font-sans text-[15px] sm:text-[16px] leading-[1.8] text-slate-700 space-y-6 font-normal">
                  {/* If structured sections are provided by CMS */}
                  {Array.isArray(article.sections) && article.sections.length > 0 ? (
                    article.sections.map((sec, sIdx) => (
                      <div key={sIdx} className="space-y-3">
                        {sec.heading && (
                          <h3 className="font-times text-xl sm:text-2xl font-semibold text-[#0c2340] pt-3 tracking-tight">
                            {sec.heading}
                          </h3>
                        )}
                        {sec.content && (
                          <div className="text-slate-700 space-y-3">
                            {sec.content.split('\n\n').map((paragraph, pIdx) => (
                              <p key={pIdx} className="whitespace-pre-line">{paragraph}</p>
                            ))}
                          </div>
                        )}
                        {sec.image && (
                          <div className="my-4 overflow-hidden rounded-xl border border-slate-200/80">
                            <Img src={sec.image} alt={sec.heading || 'Article illustration'} className="w-full h-auto object-cover" />
                          </div>
                        )}
                      </div>
                    ))
                  ) : article.contentHtml ? (
                    /* If Rich HTML is provided by CMS WYSIWYG */
                    <div
                      className="prose prose-slate max-w-none prose-headings:font-times prose-headings:text-[#0c2340] prose-h2:text-2xl prose-h3:text-xl prose-a:text-cyan-900 prose-blockquote:border-gold"
                      dangerouslySetInnerHTML={{ __html: article.contentHtml }}
                    />
                  ) : (
                    /* Default Standard Post Fallback */
                    <>
                      <p>
                        We are delighted to share that{' '}
                        <strong className="font-semibold text-slate-900">
                          {article.title.split(':')[0] || 'the honoured recipient'}
                        </strong>{' '}
                        has achieved remarkable recognition for exemplary dedication, compassionate leadership, and pioneering service towards the healthcare community and academic society.
                      </p>
                      <p className="whitespace-pre-line">
                        {article.content || article.excerpt}
                      </p>
                      <p>
                        The university leadership, faculty members, resident doctors, and student bodies extend their heartfelt congratulations and applaud this prestigious honour that reflects the core ethos of Bareilly International University in fostering clinical excellence, progressive medical research, and compassionate community care.
                      </p>
                    </>
                  )}

                  {/* Pull Quote / Testimonial (If provided by CMS) */}
                  {article.quote && (
                    <div className="my-8 rounded-xl border border-slate-200/90 bg-slate-50/70 p-6 sm:p-7 relative text-left shadow-2xs">
                      <Quotes size={32} weight="fill" className="text-gold/40 mb-2" />
                      <blockquote className="font-times text-base sm:text-lg italic text-slate-800 leading-relaxed">
                        "{article.quote.text || article.quote}"
                      </blockquote>
                      {(article.quote.author || article.quote.designation) && (
                        <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-sans">
                          <span className="font-bold text-[#0c2340]">{article.quote.author}</span>
                          <span className="text-slate-500">{article.quote.designation}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Multi-Image Photo Gallery Grid (If provided by CMS) */}
                  {Array.isArray(article.gallery) && article.gallery.length > 0 && (
                    <div className="mt-10 pt-8 border-t border-slate-200/80">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="w-1.5 h-4 bg-gold rounded-full" />
                        <h3 className="font-times text-xl sm:text-2xl font-semibold text-[#0c2340]">
                          Event Photo Gallery
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                        {article.gallery.map((gImg, gIdx) => (
                          <div
                            key={gIdx}
                            onClick={() => setLightboxIdx(gIdx)}
                            className="group relative aspect-4/3 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-2xs cursor-pointer transition-all duration-300 hover:shadow-md hover:border-[#0c2340]/40"
                          >
                            <Img
                              src={gImg}
                              alt={`${article.title} gallery photo ${gIdx + 1}`}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0c2340]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2.5">
                              <span className="inline-flex items-center gap-1 text-[11px] font-sans font-medium text-white">
                                <MagnifyingGlassPlus size={14} weight="bold" />
                                View Photo
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Modern Previous / Next Article Navigation */}
                <div className="mt-12 pt-8 border-t border-slate-200/80">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    {prevPost ? (
                      <a
                        href={`/news/${encodeURIComponent(prevPost.id)}`}
                        className="group flex flex-col justify-between py-1 text-left transition-all duration-200"
                      >
                        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-gold-dark mb-1.5">
                          <ArrowLeft size={13} weight="bold" className="transition-transform group-hover:-translate-x-1" />
                          <span>Previous Story</span>
                        </div>
                        <h4 className="font-fraunces text-[15px] sm:text-[15px] font-semibold text-[#0c2340] group-hover:text-cyan-900 group-hover:underline decoration-[#0c2340]/40 transition-colors line-clamp-2 leading-snug">
                          {prevPost.title}
                        </h4>
                        {prevPost.date && (
                          <span className="text-[11px] text-slate-400 font-medium mt-1.5">
                            {prevPost.date}
                          </span>
                        )}
                      </a>
                    ) : (
                      <div className="hidden sm:block" />
                    )}

                    {nextPost ? (
                      <a
                        href={`/news/${encodeURIComponent(nextPost.id)}`}
                        className="group flex flex-col justify-between py-1 text-left sm:text-right transition-all duration-200"
                      >
                        <div className="flex items-center sm:justify-end gap-1.5 text-[11px] font-black uppercase tracking-widest text-gold-dark mb-1.5">
                          <span>Next Story</span>
                          <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-1" />
                        </div>
                        <h4 className="font-fraunces text-[15px] sm:text-[15px] font-semibold text-[#0c2340] group-hover:text-cyan-900 group-hover:underline decoration-[#0c2340]/40 transition-colors line-clamp-2 leading-snug">
                          {nextPost.title}
                        </h4>
                        {nextPost.date && (
                          <span className="text-[11px] text-slate-400 font-medium mt-1.5">
                            {nextPost.date}
                          </span>
                        )}
                      </a>
                    ) : null}
                  </div>
                </div>

                {/* Refined Social Share & Interaction Bar (Merged seamlessly into background) */}
                <div className="mt-10 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {/* <span className="w-1.5 h-4 bg-gold rounded-full" /> */}
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#0c2340]">
                      Share this article
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* WhatsApp */}
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-600 shadow-2xs hover:border-[#0c2340] hover:bg-[#0c2340] hover:text-white transition-all duration-200 cursor-pointer"
                      aria-label="Share on WhatsApp"
                      title="Share on WhatsApp"
                    >
                      <WhatsappLogo size={18} weight="fill" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-600 shadow-2xs hover:border-[#0c2340] hover:bg-[#0c2340] hover:text-white transition-all duration-200 cursor-pointer"
                      aria-label="Share on LinkedIn"
                      title="Share on LinkedIn"
                    >
                      <LinkedinLogo size={18} weight="fill" />
                    </a>

                    {/* Twitter / X */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-600 shadow-2xs hover:border-[#0c2340] hover:bg-[#0c2340] hover:text-white transition-all duration-200 cursor-pointer"
                      aria-label="Share on X"
                      title="Share on X"
                    >
                      <TwitterLogo size={18} weight="fill" />
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200/90 bg-white text-slate-600 shadow-2xs hover:border-[#0c2340] hover:bg-[#0c2340] hover:text-white transition-all duration-200 cursor-pointer"
                      aria-label="Share on Facebook"
                      title="Share on Facebook"
                    >
                      <FacebookLogo size={18} weight="fill" />
                    </a>

                    {/* Copy Link Button */}
                    <button
                      type="button"
                      onClick={() => {
                        if (typeof navigator !== 'undefined' && navigator.clipboard) {
                          navigator.clipboard.writeText(window.location.href);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2500);
                        }
                      }}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200/90 bg-white px-3 text-xs font-semibold font-sans text-slate-600 shadow-2xs hover:border-[#0c2340] hover:bg-[#0c2340] hover:text-white transition-all duration-200 cursor-pointer"
                      aria-label="Copy link"
                      title={copied ? "Link Copied!" : "Copy Link"}
                    >
                      {copied ? (
                        <>
                          <Check size={16} weight="bold" className="text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <LinkSimple size={16} weight="bold" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Leave a Comment or Reply Section */}
                <div className="mt-5 pt-10 border-t border-slate-200/80 text-left">
                  <h3 className="font-times text-2xl sm:text-3xl font-medium text-[#0c2340]">
                    Leave a Reply
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-sans">
                    Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
                  </p>

                  {commentSubmitted ? (
                    <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-5 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check size={18} weight="bold" />
                      </div>
                      <div>
                        <p className="font-bold">Thank you for sharing!</p>
                        <p className="text-xs text-emerald-700 mt-0.5">Your response has been submitted to the editorial desk.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4.5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Your Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dr. A. Sharma"
                            value={commentForm.name}
                            onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                            className="w-full rounded-lg border border-slate-300/80 bg-white px-3.5 py-2.5 text-xs font-sans text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0c2340] focus:ring-1 focus:ring-[#0c2340]/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="name@example.com"
                            value={commentForm.email}
                            onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                            className="w-full rounded-lg border border-slate-300/80 bg-white px-3.5 py-2.5 text-xs font-sans text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0c2340] focus:ring-1 focus:ring-[#0c2340]/20 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                            Designation / Affiliation
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Alumnus, Faculty, Student"
                            value={commentForm.website}
                            onChange={(e) => setCommentForm({ ...commentForm, website: e.target.value })}
                            className="w-full rounded-lg border border-slate-300/80 bg-white px-3.5 py-2.5 text-xs font-sans text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0c2340] focus:ring-1 focus:ring-[#0c2340]/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mt-6 mb-1.5">
                          Your Message / Comment <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Write your constructive message or congratulatory note..."
                          value={commentForm.comment}
                          onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                          className="w-full rounded-lg border border-slate-300/80 bg-white p-3.5 text-xs font-sans text-slate-800 placeholder:text-slate-400 outline-none focus:border-[#0c2340] focus:ring-1 focus:ring-[#0c2340]/20 transition-all"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="saveInfoCheckbox"
                            checked={commentForm.saveInfo}
                            onChange={(e) => setCommentForm({ ...commentForm, saveInfo: e.target.checked })}
                            className="h-4 w-4 rounded border-slate-300 text-[#0c2340] focus:ring-0 cursor-pointer"
                          />
                          <label htmlFor="saveInfoCheckbox" className="text-xs text-slate-600 cursor-pointer select-none">
                            Save my name and email for future updates.
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white brightness-125 shadow-xs transition-all duration-200 hover:brightness-140 hover:shadow-md active:scale-[0.98] cursor-pointer"
                        >
                          <PaperPlaneTilt size={15} weight="bold" />
                          <span>Submit Message</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </article>
            </div>

            {/* RIGHT SIDEBAR COLUMN: TREE STRUCTURE */}
            <aside className="w-full lg:w-[310px] xl:w-[330px] shrink-0 space-y-8 lg:sticky lg:top-28">
              {/* Search Widget */}
              <div>
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search news & events..."
                    className="w-full rounded-lg border border-slate-300/80 bg-white/70 backdrop-blur-xs pl-3.5 pr-22 py-2.5 font-sans text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:outline-none focus-visible:outline-none focus:border-slate-400 focus:bg-white focus:ring-1 focus:ring-slate-300/60 transition-all shadow-2xs"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 rounded-md bg-gradient-to-r from-[#0c2340]/90 via-[#102d52]/90 to-[#163860]/70 px-3.5 font-sans text-[11px] font-bold uppercase tracking-wider text-white brightness-125 transition-all duration-200 hover:brightness-140 hover:shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Recent Posts - Tree Structure Navigation */}
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-5 border-b border-slate-200/80">
                  <h3 className="font-times text-lg font-semibold text-[#0c2340] tracking-tight">
                    Recent Posts
                  </h3>
                  <span className="w-6 h-[2px] bg-gold rounded-full" />
                </div>

                {/* Tree Structure Timeline */}
                <div className="relative pl-5 before:absolute before:left-[7px] before:top-2 before:bottom-4 before:w-[1.5px] before:bg-slate-200">
                  <div className="space-y-6">
                    {recentPosts.map((rPost, rIdx) => {
                      const isSelected = article && ((article.id && article.id === rPost.id) || article.title === rPost.title);
                      return (
                        <a
                          key={rPost.id || rIdx}
                          href={`/news/${encodeURIComponent(rPost.id)}`}
                          className={`group relative cursor-pointer text-left pl-2.5 py-0.5 block transition-colors ${
                            isSelected ? 'opacity-100' : 'opacity-85 hover:opacity-100'
                          }`}
                        >
                          {/* Tree Branch Node & Connector */}
                          <div className="absolute -left-5 top-1.5 flex items-center">
                            <span
                              className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-200 shadow-2xs ${
                                isSelected
                                  ? 'border-cyan-900 bg-cyan-900 scale-125'
                                  : 'border-slate-300 bg-white group-hover:border-cyan-900 group-hover:bg-cyan-900 group-hover:scale-125'
                              }`}
                            />
                            <span
                              className={`w-3.5 h-[1.5px] transition-colors ${
                                isSelected ? 'bg-cyan-900' : 'bg-slate-200 group-hover:bg-cyan-900/50'
                              }`}
                            />
                          </div>

                          <div className="flex flex-col">
                            <h4
                              className={`font-sans text-[12.5px] font-medium leading-[1.4] transition-colors duration-200 line-clamp-2 ${
                                isSelected ? 'text-cyan-900 font-semibold' : 'text-slate-700 group-hover:text-cyan-900'
                              }`}
                            >
                              {rPost.title}
                            </h4>
                            {rPost.date && (
                              <span className="text-[11px] text-slate-400 font-normal mt-1">
                                {rPost.date}
                              </span>
                            )}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Comments - Tree Structure Navigation */}
              <div>
                <div className="flex items-center justify-between pb-2.5 mb-5 border-b border-slate-200/80">
                  <h3 className="font-times text-lg font-semibold text-[#0c2340] tracking-tight">
                    Recent Comments
                  </h3>
                  <span className="w-6 h-[2px] bg-gold rounded-full" />
                </div>

                {/* Tree Structure Timeline */}
                <div className="relative pl-5 before:absolute before:left-[7px] before:top-2 before:bottom-4 before:w-[1.5px] before:bg-slate-200">
                  <div className="space-y-5">
                    {recentComments.map((rc, cIdx) => (
                      <div
                        key={cIdx}
                        className="group relative text-left pl-2.5 py-0.5 block transition-colors opacity-90 hover:opacity-100"
                      >
                        {/* Tree Branch Node & Connector */}
                        <div className="absolute -left-5 top-1.5 flex items-center">
                          <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-300 bg-white transition-all duration-200 shadow-2xs group-hover:border-cyan-900 group-hover:bg-cyan-900 group-hover:scale-125" />
                          <span className="w-3.5 h-[1.5px] bg-slate-200 group-hover:bg-cyan-900/50 transition-colors" />
                        </div>

                        <div className="flex flex-col">
                          <div className="font-sans text-[12px] font-semibold text-slate-800 flex flex-wrap items-center gap-1">
                            <span className="text-[#0c2340]">{rc.author}</span>
                            <span className="text-slate-400 font-normal text-[11px]">on</span>
                          </div>

                          <a
                            href={rc.articleLink}
                            className="font-sans text-[12px] font-medium text-cyan-900 hover:underline line-clamp-1 mt-0.5"
                          >
                            {rc.articleTitle}
                          </a>

                          <p className="font-sans text-[11.5px] text-slate-600 line-clamp-2 mt-1 leading-[1.4] italic">
                            "{rc.comment}"
                          </p>

                          {rc.date && (
                            <span className="text-[10.5px] text-slate-400 font-normal mt-1">
                              {rc.date}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Gallery Images */}
      {lightboxIdx !== null && Array.isArray(article?.gallery) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxIdx(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Close"
            >
              <X size={22} weight="bold" />
            </button>

            <img
              src={article.gallery[lightboxIdx]}
              alt="Enlarged photo"
              className="max-h-[80vh] w-auto mx-auto rounded-lg shadow-2xl object-contain"
            />

            {article.gallery.length > 1 && (
              <>
                <button
                  onClick={() => setLightboxIdx((prev) => (prev > 0 ? prev - 1 : article.gallery.length - 1))}
                  className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 sm:bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <CaretLeft size={24} weight="bold" />
                </button>
                <button
                  onClick={() => setLightboxIdx((prev) => (prev < article.gallery.length - 1 ? prev + 1 : 0))}
                  className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 sm:bg-white/10 text-white hover:bg-white/20 transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <CaretRight size={24} weight="bold" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
