import React, { useState } from 'react';
import { Compass, BookmarkCheck, Globe2, ShieldCheck, Menu, X, Heart, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  currentTab: 'matcher' | 'directory' | 'tracker' | 'admin';
  onSelectTab: (tab: 'matcher' | 'directory' | 'tracker' | 'admin') => void;
  savedCount: number;
  onNewSearch?: () => void;
  onOpenMemorial: () => void;
  onOpenScamSafety: (tab?: 'guide' | 'report') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  savedCount,
  onNewSearch,
  onOpenMemorial,
  onOpenScamSafety
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'matcher' as const,
      label: 'Find Matches',
      icon: Compass
    },
    {
      id: 'directory' as const,
      label: 'Directory',
      icon: Globe2
    },
    {
      id: 'tracker' as const,
      label: 'Tracker',
      icon: BookmarkCheck,
      badge: savedCount > 0 ? savedCount : null
    },
    {
      id: 'admin' as const,
      label: 'Sources',
      icon: ShieldCheck
    }
  ];

  const handleSelect = (tab: 'matcher' | 'directory' | 'tracker' | 'admin') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Brand Name & Subtitle (strict adherence to requirements) */}
        <div 
          onClick={() => {
            onSelectTab('matcher');
            if (onNewSearch) onNewSearch();
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0 text-left"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Globe2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-display font-black text-sm sm:text-base lg:text-lg tracking-tight text-white leading-tight">
              Laiba Global Scholarship Finder
            </span>
            <span className="text-[11px] text-emerald-400 font-medium leading-none mt-1">
              Verified Funding. Protected Students.
            </span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 shrink-0">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700 shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{item.label}</span>
                {item.badge !== null && item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 font-mono-data ml-0.5">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Quick Memorial & Safety menu buttons */}
          <button
            onClick={onOpenMemorial}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-300 hover:bg-slate-900 transition-colors cursor-pointer"
            title="In Memory of Laiba"
          >
            <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
            <span className="hidden lg:inline">In Memory</span>
          </button>

          <button
            onClick={() => onOpenScamSafety('guide')}
            className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-emerald-300 hover:bg-slate-900 transition-colors cursor-pointer"
            title="Student Scam Safety Guide"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Scam Safety</span>
          </button>
        </nav>

        {/* Mobile View: Hamburger Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <Menu className="w-5 h-5 text-emerald-400 shrink-0" />
            )}
            <span className="text-xs font-semibold">Menu</span>
            {savedCount > 0 && !mobileMenuOpen && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 font-mono-data">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/98 px-4 py-3 space-y-2 shadow-2xl animate-fade-in text-left">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-850 border border-emerald-500/50 text-white'
                      : 'bg-slate-900/60 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 font-mono-data">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-1">
            <button
              onClick={() => {
                onOpenMemorial();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              <span>In Memory of Laiba</span>
            </button>

            <button
              onClick={() => {
                onOpenScamSafety('guide');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/60 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Scam Safety Guide</span>
            </button>

            <button
              onClick={() => {
                onOpenScamSafety('report');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-200 bg-rose-950/20 border border-rose-900/40 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Report Scam</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
