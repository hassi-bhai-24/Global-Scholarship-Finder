import React from 'react';
import { X, Heart, ShieldCheck } from 'lucide-react';

interface MemorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemorialModal: React.FC<MemorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative text-left"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Heart className="w-5 h-5 fill-emerald-400/20" />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-white">
              In Memory of Laiba
            </h3>
            <p className="text-xs text-emerald-400 font-medium">
              Verified Funding. Protected Students.
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            This platform is dedicated in loving memory of <strong className="text-white">Laiba</strong>.
          </p>
          <p>
            Her journey inspires our mission: protecting students from deceptive agents and fraudulent claims by verifying authentic international opportunities directly from official ministries, embassies, and universities.
          </p>
          <p>
            No student should ever be exploited while pursuing higher education. Every opportunity indexed here is 100% verified and free to apply.
          </p>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Dedicated to student safety</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
