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
  PinterestLogo
} from '@phosphor-icons/react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Img from '../Img';

export default function NewsDetailPage({
  article,
  allPosts = []
}) {
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentForm.name || !commentForm.email || !commentForm.comment) return;
    setCommentSubmitted(true);
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
                <div className="flex flex-wrap items-center gap-y-2 gap-x-5 py-3 border-b border-slate-200/90 text-slate-500 font-sans text-xs sm:text-[12.5px] font-semibold uppercase tracking-wider mb-6">
                  {article.date && (
                    <div className="flex items-center gap-1.5 text-red-600">
                      <Calendar size={16} weight="fill" />
                      <span className="text-slate-700">{article.date}</span>
                    </div>
                  )}
                  {article.category && (
                    <div className="flex items-center gap-1.5 text-red-600">
                      <FolderSimple size={16} weight="fill" />
                      <span className="text-slate-700">
                        {article.category}, ROHILKHAND MEDICAL COLLEGE & HOSPITAL
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-red-600">
                    <User size={16} weight="fill" />
                    <span className="text-slate-700">BY BIU</span>
                  </div>
                </div>

                {/* Article Main Story Content */}
                <div className="font-sans text-[15px] sm:text-[16px] leading-[1.75] text-slate-700 space-y-4.5 font-normal">
                  <p>
                    We are delighted to share that{' '}
                    <strong className="font-semibold text-slate-900">
                      {article.title.split(':')[0] || 'the honoured recipient'}
                    </strong>{' '}
                    has achieved remarkable recognition for exemplary dedication, compassionate leadership, and pioneering service towards the healthcare community and academic society.
                  </p>

                  <p>
                    {article.content || article.excerpt}
                  </p>

                  <p>
                    The university leadership, faculty members, resident doctors, and student bodies extend their heartfelt congratulations and applaud this prestigious honour that reflects the core ethos of Bareilly International University in fostering clinical excellence, progressive medical research, and compassionate community care.
                  </p>
                </div>

                {/* Previous / Next Article Navigation Bar */}
                <div className="mt-12 pt-6 border-t border-b border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6">
                  {prevPost ? (
                    <a
                      href={`/news/${encodeURIComponent(prevPost.id)}`}
                      className="group flex flex-col text-left cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-red-600 flex items-center gap-1.5 mb-1">
                        <ArrowLeft size={13} weight="bold" className="transition-transform group-hover:-translate-x-1" />
                        <span>PREVIOUS</span>
                      </span>
                      <h4 className="font-sans text-xs sm:text-[13px] font-medium text-slate-800 group-hover:text-cyan-900 transition-colors line-clamp-2 leading-snug">
                        {prevPost.title}
                      </h4>
                    </a>
                  ) : (
                    <div />
                  )}

                  {nextPost && (
                    <a
                      href={`/news/${encodeURIComponent(nextPost.id)}`}
                      className="group flex flex-col text-left sm:text-right cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-red-600 flex items-center sm:justify-end gap-1.5 mb-1">
                        <span>NEXT</span>
                        <ArrowRight size={13} weight="bold" className="transition-transform group-hover:translate-x-1" />
                      </span>
                      <h4 className="font-sans text-xs sm:text-[13px] font-medium text-slate-800 group-hover:text-cyan-900 transition-colors line-clamp-2 leading-snug">
                        {nextPost.title}
                      </h4>
                    </a>
                  )}
                </div>

                {/* Social Share Bar */}
                <div className="flex items-center gap-3 py-4 text-slate-500 text-sm">
                  <span className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                    Share This:
                  </span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#1877f2] hover:text-white transition-all cursor-pointer"
                    aria-label="Share on Facebook"
                  >
                    <FacebookLogo size={16} weight="fill" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#1da1f2] hover:text-white transition-all cursor-pointer"
                    aria-label="Share on Twitter"
                  >
                    <TwitterLogo size={16} weight="fill" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&title=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#0a66c2] hover:text-white transition-all cursor-pointer"
                    aria-label="Share on LinkedIn"
                  >
                    <LinkedinLogo size={16} weight="fill" />
                  </a>
                  <a
                    href={`https://pinterest.com/pin/create/button/?description=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-[#bd081c] hover:text-white transition-all cursor-pointer"
                    aria-label="Share on Pinterest"
                  >
                    <PinterestLogo size={16} weight="fill" />
                  </a>
                </div>

                {/* Leave a Reply Section */}
                <div className="mt-10 pt-8 border-t border-slate-200/90 text-left">
                  <h3 className="font-times text-2xl font-semibold text-[#0c2340]">
                    Leave a Reply
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 font-sans">
                    Your email address will not be published. Required fields are marked <span className="text-red-500">*</span>
                  </p>

                  {commentSubmitted ? (
                    <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-xs sm:text-sm font-medium">
                      ✓ Thank you! Your comment has been submitted for moderation.
                    </div>
                  ) : (
                    <form onSubmit={handleCommentSubmit} className="mt-6 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={commentForm.name}
                            onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                            className="w-full rounded-md border border-slate-200 bg-slate-100/70 px-3.5 py-2 text-xs font-sans text-slate-800 focus:bg-white focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={commentForm.email}
                            onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                            className="w-full rounded-md border border-slate-200 bg-slate-100/70 px-3.5 py-2 text-xs font-sans text-slate-800 focus:bg-white focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Website
                          </label>
                          <input
                            type="text"
                            value={commentForm.website}
                            onChange={(e) => setCommentForm({ ...commentForm, website: e.target.value })}
                            className="w-full rounded-md border border-slate-200 bg-slate-100/70 px-3.5 py-2 text-xs font-sans text-slate-800 focus:bg-white focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="saveInfoCheckbox"
                          checked={commentForm.saveInfo}
                          onChange={(e) => setCommentForm({ ...commentForm, saveInfo: e.target.checked })}
                          className="h-3.5 w-3.5 rounded border-slate-300 text-[#0c2340] focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="saveInfoCheckbox" className="text-[11.5px] text-slate-600 cursor-pointer select-none">
                          Save my name, email, and website in this browser for the next time I comment.
                        </label>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Comment <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={commentForm.comment}
                          onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                          className="w-full rounded-md border border-slate-200 bg-slate-100/70 p-3 text-xs font-sans text-slate-800 focus:bg-white focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all"
                        />
                      </div>

                      <button
                        type="submit"
                        className="rounded-md bg-[#00a3c4] hover:bg-[#008ba8] px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                      >
                        POST COMMENT
                      </button>
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
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
