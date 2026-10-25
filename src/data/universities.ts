import rawUniversities from './universities.json';

export interface UniversityItem {
  name: string;
  country: string;
  city?: string;
  aliases?: string[];
}

// Global directory of 4,500+ verified universities from 200+ countries
export const UNIVERSITIES: UniversityItem[] = rawUniversities as UniversityItem[];

export function searchUniversities(query: string, country?: string): UniversityItem[] {
  if (!query || query.trim() === '') {
    if (country) {
      const countryMatches = UNIVERSITIES.filter(u => u.country.toLowerCase() === country.toLowerCase());
      return countryMatches.slice(0, 15);
    }
    return UNIVERSITIES.slice(0, 15);
  }

  const q = query.toLowerCase().trim();
  const normalizedQ = q.replace(/[^a-z0-9]/g, '');

  const matches = UNIVERSITIES.filter(u => {
    // 1. Direct name match
    if (u.name.toLowerCase().includes(q)) return true;
    
    // 2. City match
    if (u.city && u.city.toLowerCase().includes(q)) return true;

    // 3. Country match
    if (u.country.toLowerCase().includes(q)) return true;

    // 4. Alias / Acronym match (e.g. mit, lums, iub, nust, ucla, caltech, tum, epfl)
    if (u.aliases && u.aliases.some(alias => {
      const normAlias = alias.toLowerCase().replace(/[^a-z0-9]/g, '');
      return alias.toLowerCase().includes(q) || q.includes(alias.toLowerCase()) || normAlias.includes(normalizedQ);
    })) {
      return true;
    }

    return false;
  });

  return matches.sort((a, b) => {
    // Prioritize country match if provided
    if (country) {
      const aCountry = a.country.toLowerCase() === country.toLowerCase() ? 1 : 0;
      const bCountry = b.country.toLowerCase() === country.toLowerCase() ? 1 : 0;
      if (bCountry !== aCountry) return bCountry - aCountry;
    }
    // Starts with query in name gets highest ranking
    const aStarts = a.name.toLowerCase().startsWith(q) ? 1 : 0;
    const bStarts = b.name.toLowerCase().startsWith(q) ? 1 : 0;
    if (bStarts !== aStarts) return bStarts - aStarts;

    // Direct acronym equality
    const aAcronym = (a.aliases || []).some(al => al.toLowerCase() === q) ? 1 : 0;
    const bAcronym = (b.aliases || []).some(al => al.toLowerCase() === q) ? 1 : 0;
    return bAcronym - aAcronym;
  }).slice(0, 30);
}
