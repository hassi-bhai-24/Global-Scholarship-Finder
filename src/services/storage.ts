import { ApplicationStatus, ApplicationTrackerItem, Scholarship } from '../types/scholarship';
import { VERIFIED_SCHOLARSHIPS } from '../data/scholarships';
import { withRuntimeDeadline } from './matchingEngine';

const STORAGE_KEY = 'global_scholarship_finder_tracker_v1';

// F23: saved items are refreshed from the catalog on every read, so a
// saved scholarship never shows a stale deadline, benefit or link status.
// Items not in the catalog (e.g. live-discovered) fall back to the stored
// snapshot, which is the only copy that exists for them.
export function getSavedTrackerItems(): ApplicationTrackerItem[] {
  let items: ApplicationTrackerItem[];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    items = JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read tracker items from localStorage", e);
    return [];
  }
  return items.map((item) => {
    const current = VERIFIED_SCHOLARSHIPS.find((entry) => entry.id === item.scholarshipId);
    if (current) return { ...item, scholarship: withRuntimeDeadline(current) };
    return item;
  });
}

export function saveTrackerItem(scholarship: Scholarship, status: ApplicationStatus = 'saved', notes = ''): ApplicationTrackerItem[] {
  const items = getSavedTrackerItems();
  const existingIdx = items.findIndex(i => i.scholarshipId === scholarship.id);
  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    items[existingIdx].status = status;
    items[existingIdx].notes = notes || items[existingIdx].notes;
    items[existingIdx].updatedAt = now;
  } else {
    items.unshift({
      scholarshipId: scholarship.id,
      scholarship,
      status,
      notes,
      savedAt: now,
      updatedAt: now
    });
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save tracker item", e);
  }

  return items;
}

export function updateTrackerStatus(scholarshipId: string, status: ApplicationStatus): ApplicationTrackerItem[] {
  const items = getSavedTrackerItems();
  const item = items.find(i => i.scholarshipId === scholarshipId);
  if (item) {
    item.status = status;
    item.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }
  return items;
}

export function updateTrackerNotes(scholarshipId: string, notes: string): ApplicationTrackerItem[] {
  const items = getSavedTrackerItems();
  const item = items.find(i => i.scholarshipId === scholarshipId);
  if (item) {
    item.notes = notes;
    item.updatedAt = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }
  return items;
}

export function removeTrackerItem(scholarshipId: string): ApplicationTrackerItem[] {
  const items = getSavedTrackerItems().filter(i => i.scholarshipId !== scholarshipId);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error(e);
  }
  return items;
}

export function isScholarshipSaved(scholarshipId: string): boolean {
  const items = getSavedTrackerItems();
  return items.some(i => i.scholarshipId === scholarshipId);
}

const SCAM_REPORTS_KEY = 'global_scholarship_finder_scam_reports_local_v1';

export interface LocalScamReport {
  urlOrName: string;
  details: string;
  reportedAt: string;
}

// Scam reports are stored ONLY in this browser's localStorage. This site has
// no inbox, no verification team and no server endpoint for reports, so
// nothing is sent anywhere. The modal must say so plainly (F10).
export function saveScamReportLocally(report: Omit<LocalScamReport, 'reportedAt'>): LocalScamReport[] {
  let existing: LocalScamReport[] = [];
  try {
    const raw = localStorage.getItem(SCAM_REPORTS_KEY);
    if (raw) existing = JSON.parse(raw);
  } catch {
    existing = [];
  }
  const entry: LocalScamReport = { ...report, reportedAt: new Date().toISOString() };
  const updated = [entry, ...existing].slice(0, 50);
  try {
    localStorage.setItem(SCAM_REPORTS_KEY, JSON.stringify(updated));
  } catch {
    // Storage full or unavailable: the caller still shows the honest
    // "not sent anywhere" message; the report simply is not kept.
  }
  return updated;
}
