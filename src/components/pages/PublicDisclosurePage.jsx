import Navbar from '../Navbar';
import Footer from '../Footer';
import PublicDisclosureExplorer from './PublicDisclosureExplorer';

export default function PublicDisclosurePage({ onBack }) {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-gold selection:text-[#0c2340]">
      {/* Top University Navigation */}
      <Navbar />

      {/* Main Interactive Table & Header Section */}
      <main>
        <PublicDisclosureExplorer onBack={onBack} />
      </main>

      {/* University Footer */}
      <Footer />
    </div>
  );
}
