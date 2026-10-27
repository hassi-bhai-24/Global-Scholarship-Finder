import React, { useState } from 'react';
import { BookmarkCheck, Clock, Trash2, Edit3, ExternalLink, Calendar, Check, AlertCircle } from 'lucide-react';
import { ApplicationStatus, ApplicationTrackerItem, Scholarship } from '../types/scholarship';

interface ApplicationTrackerViewProps {
  items: ApplicationTrackerItem[];
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onRemoveItem: (id: string) => void;
  onOpenDetails: (scholarship: Scholarship) => void;
}

export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  items,
  onUpdateStatus,
  onUpdateNotes,
  onRemoveItem,
  onOpenDetails
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  const filteredItems = selectedFilter === 'all'
    ? items
    : items.filter(i => i.status === selectedFilter);

  const handleStartEditNotes = (item: ApplicationTrackerItem) => {
    setEditingNotesId(item.scholarshipId);
    setTempNotes(item.notes);
  };

  const handleSaveNotes = (id: string) => {
    onUpdateNotes(id, tempNotes);
    setEditingNotesId(null);
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'saved':
        return { label: 'Saved', color: 'bg-slate-800 text-slate-300 border-slate-700' };
      case 'researching':
        return { label: 'Researching', color: 'bg-sky-950/60 text-sky-400 border-sky-800' };
      case 'applying':
        return { label: 'Applying', color: 'bg-amber-950/60 text-amber-400 border-amber-800' };
      case 'applied':
        return { label: 'Applied', color: 'bg-purple-950/60 text-purple-400 border-purple-800' };
      case 'accepted':
        return { label: 'Accepted', color: 'bg-emerald-950/60 text-emerald-400 border-emerald-800' };
      case 'closed':
        return { label: 'Closed', color: 'bg-rose-950/40 text-rose-400 border-rose-900' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Application Tracker
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {[
            { id: 'all', label: `All (${items.length})` },
            { id: 'saved', label: 'Saved' },
            { id: 'researching', label: 'Researching' },
            { id: 'applying', label: 'Applying' },
            { id: 'applied', label: 'Applied' },
            { id: 'accepted', label: 'Accepted' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
          <BookmarkCheck className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-white mb-1">
            No Saved Scholarships
          </h3>
          <p className="text-xs text-slate-400">
            Bookmark scholarships to track application deadlines and progress.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map(item => {
            const badge = getStatusBadge(item.status);
            const isEditingNotes = editingNotesId === item.scholarshipId;

            return (
              <div
                key={item.scholarshipId}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-slate-400">{item.scholarship.provider}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-400">{item.scholarship.destinationCountry}</span>
                    <span className="text-slate-700">·</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenDetails(item.scholarship)}
                    className="font-display font-bold text-base text-white hover:text-emerald-300 transition-colors cursor-pointer truncate mb-2"
                  >
                    {item.scholarship.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.scholarship.deadline}</span>
                    </div>

                    {item.notes && !isEditingNotes && (
                      <span className="text-slate-300 truncate max-w-xs font-mono-data">
                        "{item.notes}"
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <select
                    value={item.status}
                    onChange={(e) => onUpdateStatus(item.scholarshipId, e.target.value as ApplicationStatus)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="saved">Saved</option>
                    <option value="researching">Researching</option>
                    <option value="applying">Applying</option>
                    <option value="applied">Applied</option>
                    <option value="accepted">Accepted</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => onOpenDetails(item.scholarship)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => onRemoveItem(item.scholarshipId)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
