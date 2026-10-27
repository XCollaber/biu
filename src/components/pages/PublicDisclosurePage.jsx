import Navbar from '../Navbar';
import Footer from '../Footer';
import PublicDisclosureExplorer from './PublicDisclosureExplorer';

export default function PublicDisclosurePage({ onBack }) {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-slate-900 font-sans selection:bg-gold selection:text-[#0c2340] print:min-h-0 print:h-auto print:bg-white">
      {/* Top University Navigation */}
      <div className="print:hidden">
        <Navbar />
      </div>

      {/* Main Interactive Table & Header Section */}
      <main className="print:w-full print:m-0 print:p-0">
        <PublicDisclosureExplorer onBack={onBack} />
      </main>

      {/* University Footer */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
