import React, { useState } from 'react';
import { Compass, BookmarkCheck, Globe2, ShieldCheck, Menu, X, ChevronRight } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'matcher' as const,
      label: 'Find Matches',
      icon: Compass,
      iconColor: 'text-emerald-400',
      badge: null,
      desc: 'Smart eligibility matcher & course audit'
    },
    {
      id: 'directory' as const,
      label: 'Global Directory',
      icon: Globe2,
      iconColor: 'text-teal-400',
      badge: null,
      desc: 'Browse 50+ verified world opportunities'
    },
    {
      id: 'tracker' as const,
      label: 'Application Tracker',
      icon: BookmarkCheck,
      iconColor: 'text-sky-400',
      badge: savedCount > 0 ? savedCount : null,
      desc: 'Saved awards & deadline tracking'
    },
    {
      id: 'admin' as const,
      label: 'Sources & Verification',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      badge: null,
      desc: 'Audit trail, official links & criteria checks'
    }
  ];

  const handleSelect = (tab: 'matcher' | 'directory' | 'tracker' | 'admin') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Brand with green logo on far left, title max 2 lines, subtitle clearly underneath */}
        <div 
          onClick={() => {
            onSelectTab('matcher');
            if (onNewSearch) onNewSearch();
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Globe2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-display font-black text-sm sm:text-lg lg:text-xl tracking-tight text-white leading-tight">
              GLOBAL SCHOLARSHIP FINDER
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium leading-none mt-1">
              Academic Eligibility &amp; Verified Funding Engine
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs: clean non-overlapping horizontal row (visible on md+) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => onSelectTab('matcher')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              currentTab === 'directory'
                ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Globe2 className="w-4 h-4 text-teal-400" />
            <span>Global Directory</span>
          </button>

          <button
            onClick={() => onSelectTab('tracker')}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer relative ${
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
            className={`flex items-center gap-1.5 sm:gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
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

        {/* Mobile View: Hamburger Menu Button (shown only on mobile < md) */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:bg-slate-850 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/40 cursor-pointer shadow-sm"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <Menu className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span className="text-xs font-semibold tracking-wide">Menu</span>
            {savedCount > 0 && !mobileMenuOpen && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 font-mono-data">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Expandable Drawer / Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800/90 bg-slate-950/98 backdrop-blur-xl px-4 py-3 space-y-1.5 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between px-2 pt-1 pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-mono-data">
              Navigation Menu
            </span>
            <span className="text-[10px] text-emerald-400/80 font-medium">
              Tap option to visit
            </span>
          </div>

          <div className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-850 border border-emerald-500/50 text-white shadow-md shadow-emerald-950/40'
                      : 'bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold truncate ${isActive ? 'text-emerald-300' : 'text-slate-100'}`}>
                          {item.label}
                        </span>
                        {item.badge !== null && (
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 font-mono-data">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-emerald-400 translate-x-0.5' : 'text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Quick search shortcut if already matching */}
          {currentTab === 'matcher' && onNewSearch && (
            <div className="pt-2">
              <button
                onClick={() => {
                  onNewSearch();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Reset to New Search Form</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

