import React from 'react';
import { Compass, BookmarkCheck, Globe2, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentTab: 'matcher' | 'directory' | 'tracker' | 'admin';
  onSelectTab: (tab: 'matcher' | 'directory' | 'tracker' | 'admin') => void;
  savedCount: number;
  onNewSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  onNewSearch
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand with green logo on far left, title max 2 lines, subtitle clearly underneath */}
        <div 
          onClick={() => {
            onSelectTab('matcher');
            if (onNewSearch) onNewSearch();
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Globe2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-display font-black text-base sm:text-lg lg:text-xl tracking-tight text-white leading-tight">
              GLOBAL SCHOLARSHIP FINDER
            </span>
            <span className="text-[11px] sm:text-xs text-slate-400 font-medium leading-none mt-1">
              Academic Eligibility &amp; Verified Funding Engine
            </span>
          </div>
        </div>

        {/* Right: Navigation Tabs in a single clean non-overlapping horizontal row */}
        <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => onSelectTab('matcher')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'matcher'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Find Matches</span>
          </button>

          <button
            onClick={() => onSelectTab('directory')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'directory'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Globe2 className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">Global</span> Directory
          </button>

          <button
            onClick={() => onSelectTab('tracker')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer relative ${
              currentTab === 'tracker'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <BookmarkCheck className="w-4 h-4 text-sky-400" />
            <span>Tracker</span>
            {savedCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 font-mono-data ml-1">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('admin')}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'admin'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden lg:inline">Sources &amp; Verification</span>
            <span className="lg:hidden">Sources</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
