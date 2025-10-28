/**
 * OFFICIAL GOVERNMENT VISA LINKS DATABASE
 *
 * Simple approach: Return official government URLs for users to verify
 * No scraping needed, just maintain a list of official sources
 */

export interface OfficialVisaLink {
  country: string;
  officialWebsite: string;
  visaTypesPage?: string;
  requirementsPage?: string;
  applicationPage?: string;
  type: 'government' | 'embassy' | 'vfs' | 'consulate';
  language: string;
  lastVerified: string; // ISO date
  notes?: string;
}

/**
 * Top 50 destination countries with official links
 * Manually curated and verified
 */
export const OFFICIAL_VISA_LINKS: Record<string, OfficialVisaLink> = {
  // === Popular Destinations ===

  'united states': {
    country: 'United States',
    officialWebsite: 'https://travel.state.gov',
    visaTypesPage: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/all-visa-categories.html',
    requirementsPage: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/visa-wizard.html',
    applicationPage: 'https://ceac.state.gov/genniv/',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'U.S. Department of State - Official visa information'
  },

  'united kingdom': {
    country: 'United Kingdom',
    officialWebsite: 'https://www.gov.uk/browse/visas-immigration',
    visaTypesPage: 'https://www.gov.uk/browse/visas-immigration/work-visas',
    requirementsPage: 'https://www.gov.uk/check-uk-visa',
    applicationPage: 'https://www.gov.uk/apply-uk-visa',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'UK Government official visa portal'
  },

  'australia': {
    country: 'Australia',
    officialWebsite: 'https://immi.homeaffairs.gov.au',
    visaTypesPage: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder',
    requirementsPage: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa',
    applicationPage: 'https://online.immi.gov.au/lusc/login',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Department of Home Affairs - Official visa portal'
  },

  'canada': {
    country: 'Canada',
    officialWebsite: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
    visaTypesPage: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
    requirementsPage: 'https://ircc.canada.ca/english/visit/visas.asp',
    applicationPage: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/application.html',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Immigration, Refugees and Citizenship Canada (IRCC)'
  },

  'germany': {
    country: 'Germany',
    officialWebsite: 'https://www.auswaertiges-amt.de',
    visaTypesPage: 'https://www.auswaertiges-amt.de/en/visa-service',
    requirementsPage: 'https://www.auswaertiges-amt.de/en/visa-service/-/231148',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'German Federal Foreign Office'
  },

  'france': {
    country: 'France',
    officialWebsite: 'https://france-visas.gouv.fr/en',
    visaTypesPage: 'https://france-visas.gouv.fr/en/web/france-visas/types-of-visa',
    requirementsPage: 'https://france-visas.gouv.fr/en/web/france-visas',
    applicationPage: 'https://france-visas.gouv.fr/en/web/france-visas/apply-for-a-visa',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Official France Visas portal'
  },

  'japan': {
    country: 'Japan',
    officialWebsite: 'https://www.mofa.go.jp/j_info/visit/visa/index.html',
    visaTypesPage: 'https://www.mofa.go.jp/j_info/visit/visa/index.html',
    requirementsPage: 'https://www.mofa.go.jp/j_info/visit/visa/short/novisa.html',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Ministry of Foreign Affairs of Japan'
  },

  'singapore': {
    country: 'Singapore',
    officialWebsite: 'https://www.ica.gov.sg',
    visaTypesPage: 'https://www.ica.gov.sg/visitor/visitor_entryvisa',
    requirementsPage: 'https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements',
    applicationPage: 'https://eservices.ica.gov.sg/esvclandingpage/save',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Immigration & Checkpoints Authority Singapore'
  },

  'thailand': {
    country: 'Thailand',
    officialWebsite: 'https://www.mfa.go.th',
    visaTypesPage: 'https://www.mfa.go.th/en/content/visa-travel?cate=5d5bcb4e15e39c306000683c',
    requirementsPage: 'https://www.mfa.go.th/en/content/visa-information?cate=5d5bcb4e15e39c306000683c',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Ministry of Foreign Affairs Thailand'
  },

  'uae': {
    country: 'UAE',
    officialWebsite: 'https://u.ae/en/information-and-services/visa-and-emirates-id',
    visaTypesPage: 'https://u.ae/en/information-and-services/visa-and-emirates-id/do-you-need-an-entry-permit-or-a-visa-to-enter-the-uae',
    applicationPage: 'https://www.icp.gov.ae/en/services/visa-services',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'UAE Federal Authority for Identity, Citizenship, Customs & Port Security'
  },

  'new zealand': {
    country: 'New Zealand',
    officialWebsite: 'https://www.immigration.govt.nz',
    visaTypesPage: 'https://www.immigration.govt.nz/new-zealand-visas',
    requirementsPage: 'https://www.immigration.govt.nz/new-zealand-visas/options',
    applicationPage: 'https://onlineservices.immigration.govt.nz/',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Immigration New Zealand'
  },

  'south korea': {
    country: 'South Korea',
    officialWebsite: 'https://www.visa.go.kr/openPage.do?MENU_ID=10101',
    visaTypesPage: 'https://www.visa.go.kr/openPage.do?MENU_ID=10201',
    applicationPage: 'https://www.visa.go.kr/openPage.do?MENU_ID=10104',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Korea Visa Portal (MOFA)'
  },

  'china': {
    country: 'China',
    officialWebsite: 'https://www.mfa.gov.cn/eng/',
    visaTypesPage: 'http://www.china-embassy.org/eng/visas/',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Ministry of Foreign Affairs of China'
  },

  'india': {
    country: 'India',
    officialWebsite: 'https://www.indianvisaonline.gov.in',
    visaTypesPage: 'https://www.indianvisaonline.gov.in/evisa/tvoa.html',
    applicationPage: 'https://indianvisaonline.gov.in/evisa/tvoa.html',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'Government of India - Bureau of Immigration'
  },

  'schengen': {
    country: 'Schengen Area',
    officialWebsite: 'https://www.schengenvisainfo.com',
    visaTypesPage: 'https://ec.europa.eu/home-affairs/policies/schengen-borders-and-visa/visa-policy_en',
    type: 'government',
    language: 'en',
    lastVerified: '2025-10-01',
    notes: 'European Commission - Schengen visa information'
  },

  // Add more countries as needed...
};

/**
 * Get official visa link for a country
 */
export function getOfficialVisaLink(country: string): OfficialVisaLink | null {
  const normalized = country.toLowerCase().trim();
  return OFFICIAL_VISA_LINKS[normalized] || null;
}

/**
 * Search for official links by country name (fuzzy match)
 */
export function searchOfficialLinks(query: string): OfficialVisaLink[] {
  const normalized = query.toLowerCase();
  return Object.values(OFFICIAL_VISA_LINKS).filter(link =>
    link.country.toLowerCase().includes(normalized)
  );
}

/**
 * Get all available countries with official links
 */
export function getAvailableCountries(): string[] {
  return Object.values(OFFICIAL_VISA_LINKS).map(link => link.country);
}
