import { useState, useEffect } from 'react';
import NewsDetailPage from './NewsDetailPage';
import journalData from '../../data/news.json';
import { Eye, ArrowSquareOut, FloppyDisk, ArrowsClockwise, Code } from '@phosphor-icons/react';

export default function NewsPreviewPage() {
  const allPosts = journalData.posts || [];
  const defaultArticle = allPosts[0] || {
    id: 'draft-preview',
    title: 'Draft Post Title - Live Preview',
    date: 'Today',
    category: 'Campus Update',
    author: 'BIU Editorial Desk',
    excerpt: 'This is a live draft preview. Edit fields or paste JSON below to preview your article before publishing.',
    img: '/news/news1.jpg.jpeg',
    content: 'Write your story paragraphs here...'
  };

  const [draftArticle, setDraftArticle] = useState(defaultArticle);
  const [showEditor, setShowEditor] = useState(false);
  const [jsonText, setJsonText] = useState(JSON.stringify(defaultArticle, null, 2));
  const [jsonError, setJsonError] = useState('');

  // Load from localStorage or URL query on initial mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Check if draft is passed via URL query param (e.g. ?data=base64...)
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('data');
    if (encodedData) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(encodedData)));
        setDraftArticle(decoded);
        setJsonText(JSON.stringify(decoded, null, 2));
        return;
      } catch (err) {
        console.error('Failed to parse URL draft:', err);
      }
    }

    // 2. Check localStorage
    const saved = localStorage.getItem('biu_cms_draft_preview');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDraftArticle(parsed);
        setJsonText(JSON.stringify(parsed, null, 2));
      } catch (err) {
        console.error('Failed to load saved draft:', err);
      }
    }

    // 3. Listen to postMessage from CMS parent iframe/window
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'PAGES_CMS_PREVIEW' && event.data.post) {
        setDraftArticle(event.data.post);
        setJsonText(JSON.stringify(event.data.post, null, 2));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleApplyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setDraftArticle(parsed);
      setJsonError('');
      if (typeof window !== 'undefined') {
        localStorage.setItem('biu_cms_draft_preview', JSON.stringify(parsed));
      }
    } catch (err) {
      setJsonError('Invalid JSON format: ' + err.message);
    }
  };

  const handleLoadSample = (samplePost) => {
    setDraftArticle(samplePost);
    setJsonText(JSON.stringify(samplePost, null, 2));
    setJsonError('');
    if (typeof window !== 'undefined') {
      localStorage.setItem('biu_cms_draft_preview', JSON.stringify(samplePost));
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* FLOATING TOP CMS DRAFT PREVIEW BAR */}
      <div className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 bg-[#0c2340] px-4 py-2.5 text-white shadow-md font-sans text-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold tracking-wider uppercase text-gold">CMS Live Draft Preview</span>
          <span className="hidden sm:inline text-slate-300">| In-Memory Preview (0 Git Commits Made)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="inline-flex items-center gap-1.5 rounded bg-white/10 px-3 py-1 text-xs font-medium text-white hover:bg-white/20 transition-all cursor-pointer"
          >
            <Code size={15} weight="bold" />
            <span>{showEditor ? 'Hide JSON Editor' : 'Edit Draft JSON'}</span>
          </button>
        </div>
      </div>

      {/* COLLAPSIBLE LIVE JSON DRAWER */}
      {showEditor && (
        <div className="sticky top-10 z-40 border-b border-slate-300 bg-slate-900 p-4 text-white shadow-xl">
          <div className="mx-auto max-w-[1440px] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-300">
                Paste or edit your draft article JSON below to preview instant changes:
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Load sample:</span>
                <button
                  onClick={() => handleLoadSample(allPosts[0])}
                  className="rounded bg-slate-800 px-2 py-0.5 text-slate-200 hover:bg-slate-700 cursor-pointer"
                >
                  Endo-Spine (With Gallery)
                </button>
                <button
                  onClick={() => handleLoadSample(allPosts[1])}
                  className="rounded bg-slate-800 px-2 py-0.5 text-slate-200 hover:bg-slate-700 cursor-pointer"
                >
                  World Heart Day
                </button>
              </div>
            </div>

            <textarea
              rows={8}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full rounded bg-slate-950 p-3 font-mono text-xs text-emerald-400 outline-none border border-slate-700 focus:border-gold"
            />

            {jsonError && <p className="text-xs font-semibold text-red-400">{jsonError}</p>}

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={handleApplyJson}
                className="inline-flex items-center gap-1.5 rounded bg-gold px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0c2340] hover:bg-gold-light transition-all cursor-pointer"
              >
                <ArrowsClockwise size={14} weight="bold" />
                <span>Update Preview Now</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RENDER THE ACTUAL NEWS DETAIL PAGE */}
      <NewsDetailPage article={draftArticle} allPosts={allPosts} />
    </div>
  );
}
