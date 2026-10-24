import { ApplicationStatus, ApplicationTrackerItem, Scholarship } from '../types/scholarship';

const STORAGE_KEY = 'global_scholarship_finder_tracker_v1';
const PROFILE_KEY = 'global_scholarship_finder_profile_v1';

export function getSavedTrackerItems(): ApplicationTrackerItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read tracker items from localStorage", e);
    return [];
  }
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
