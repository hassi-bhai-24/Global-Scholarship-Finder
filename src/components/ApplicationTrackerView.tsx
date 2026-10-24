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
        return { label: 'Accepted 🎉', color: 'bg-emerald-950/60 text-emerald-400 border-emerald-800' };
      case 'closed':
        return { label: 'Closed', color: 'bg-rose-950/40 text-rose-400 border-rose-900' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
            Application Tracker & Saved Portals
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track your pipeline from research to submission. All notes are saved securely in your browser.
          </p>
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-slate-800 text-emerald-400 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {items.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl">
          <BookmarkCheck className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-white mb-1">
            No scholarships saved yet
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-5">
            When you explore matches in the scholarship search, click "Add to Tracker" to organize your deadlines and notes.
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-2xl text-xs text-slate-400">
          No scholarships found under status "{selectedFilter}".
        </div>
      ) : (
        /* Items List / Cards */
        <div className="space-y-4">
          {filteredItems.map(item => {
            const badge = getStatusBadge(item.status);
            const isEditing = editingNotesId === item.scholarshipId;

            return (
              <div
                key={item.scholarshipId}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
              >
                {/* Left Column: Scholarship Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">{item.scholarship.provider}</span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span>{item.scholarship.destinationCountry}</span>
                    <span aria-hidden="true" className="text-slate-700">·</span>
                    <span className="capitalize">{item.scholarship.degreeLevels.join(" / ")}</span>
                  </div>

                  <h3
                    onClick={() => onOpenDetails(item.scholarship)}
                    className="font-display font-bold text-lg text-white hover:text-emerald-300 transition-colors cursor-pointer"
                  >
                    {item.scholarship.name}
                  </h3>

                  {/* Deadline & Funding info */}
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Deadline: {item.scholarship.deadline}</span>
                    </div>

                    <div className="text-emerald-400 font-medium">
                      {item.scholarship.fundingType.replace(/_/g, ' ')}
                    </div>

                    <span aria-hidden="true" className="text-slate-700 hidden sm:inline">·</span>

                    <a
                      href={item.scholarship.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Notes Area */}
                  <div className="pt-2 text-xs">
                    {isEditing ? (
                      <div className="space-y-2 max-w-xl">
                        <textarea
                          rows={2}
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                          placeholder="Add your application notes, deadlines, draft references..."
                          className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSaveNotes(item.scholarshipId)}
                            className="px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs"
                          >
                            Save Note
                          </button>
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-3 py-1 text-slate-400 hover:text-white text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group">
                        <p className="text-slate-400 italic">
                          {item.notes ? `"${item.notes}"` : 'No personal notes added yet.'}
                        </p>
                        <button
                          onClick={() => handleStartEditNotes(item)}
                          className="p-1 text-slate-500 hover:text-emerald-400 transition-colors"
                          title="Edit note"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Status Selector & Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-slate-400 hidden sm:inline">Status:</label>
                    <select
                      value={item.status}
                      onChange={(e) => onUpdateStatus(item.scholarshipId, e.target.value as ApplicationStatus)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold focus:outline-none bg-slate-950 ${badge.color}`}
                    >
                      <option value="saved">Saved</option>
                      <option value="researching">Researching</option>
                      <option value="applying">Applying</option>
                      <option value="applied">Applied</option>
                      <option value="accepted">Accepted 🎉</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenDetails(item.scholarship)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => onRemoveItem(item.scholarshipId)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Remove from tracker"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
