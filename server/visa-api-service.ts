import axios from 'axios';
import { logger } from './logger';

const PASSPORT_VISA_API = 'https://rough-sun-2523.fly.dev';
const API_TIMEOUT = 5000; // 5 seconds

export interface OfficialVisaData {
  passport: { name: string; code: string };
  destination: { name: string; code: string };
  category: {
    name: 'Visa Free' | 'Visa on Arrival' | 'eVisa' | 'Visa Required' | 'No Admission';
    code: 'VF' | 'VOA' | 'EV' | 'VR' | 'NA';
  };
  duration: number | null; // Visa-free days
  lastUpdated: string;
}

export interface CountryVisaStats {
  passport: { name: string; code: string };
  visaFree: number;
  visaOnArrival: number;
  eVisa: number;
  visaRequired: number;
  noAdmission: number;
  total: number;
}

/**
 * ✅ RAG STEP 1: RETRIEVE
 * Get official visa status from government-sourced API
 * This is the GROUND TRUTH for GPT-4o-mini context
 * 
 * Now using Travel Buddy AI for daily-updated government data!
 */
export async function getOfficialVisaData(
  passportCountry: string,
  destinationCountry: string
): Promise<OfficialVisaData> {
  try {
    logger.info(`[RAG-RETRIEVE] Using Passport Index: ${passportCountry} → ${destinationCountry}`);

    const response = await axios.get(
      `${PASSPORT_VISA_API}/visa/${passportCountry.toUpperCase()}/${destinationCountry.toUpperCase()}`,
      { timeout: API_TIMEOUT }
    );

    logger.info(
      `[RAG-RETRIEVE] ✅ ${passportCountry} → ${destinationCountry}: ${response.data.category.name}`
    );

    return {
      passport: response.data.passport,
      destination: response.data.destination,
      category: response.data.category,
      duration: response.data.dur,
      lastUpdated: response.data.last_updated,
    };
  } catch (error: any) {
    logger.error(`[RAG-RETRIEVE] ❌ API failed for ${passportCountry} → ${destinationCountry}`, error);

    // Try CSV fallback
    try {
      const { passportIndexCache } = await import('./passport-index-loader');
      const csvData = passportIndexCache.lookup(
        passportCountry.toUpperCase(),
        destinationCountry.toUpperCase()
      );

      if (csvData) {
        logger.info(`[RAG-RETRIEVE] ✅ Using CSV fallback for ${passportCountry} → ${destinationCountry}`);
        return csvData;
      }

      logger.warn(`[CSV-LOADER] No data found for ${passportCountry.toUpperCase()} → ${destinationCountry.toUpperCase()}`);
    } catch (csvError) {
      logger.warn(`[CSV-LOADER] Error accessing CSV cache:`, csvError as Error);
    }

    // If all methods fail, throw error for GPT-only fallback
    throw new Error(
      `Failed to retrieve visa data for ${passportCountry} → ${destinationCountry}: ${error.message}`
    );
  }
}

/**
 * Get all visa statistics for a passport
 * Useful for building comprehensive context
 */
export async function getCountryVisaStats(passportCountry: string): Promise<CountryVisaStats> {
  try {
    logger.info(`[RAG-RETRIEVE] Fetching stats for ${passportCountry}`);

    // Use Passport Index API for stats
    logger.info(`[RAG-RETRIEVE] Using Passport Index API for stats: ${passportCountry}`);

    const response = await axios.get(
      `${PASSPORT_VISA_API}/country/${passportCountry.toUpperCase()}`,
      { timeout: API_TIMEOUT }
    );

    const data = response.data;

    // Handle both array and object responses
    const dataArray = Array.isArray(data) ? data : (data.destinations || []);

    // Count by category
    const stats: CountryVisaStats = {
      passport: dataArray[0]?.passport || { name: passportCountry, code: passportCountry },
      visaFree: 0,
      visaOnArrival: 0,
      eVisa: 0,
      visaRequired: 0,
      noAdmission: 0,
      total: dataArray.length,
    };

    for (const item of dataArray) {
      switch (item.category.code) {
        case 'VF':
          stats.visaFree++;
          break;
        case 'VOA':
          stats.visaOnArrival++;
          break;
        case 'EV':
          stats.eVisa++;
          break;
        case 'VR':
          stats.visaRequired++;
          break;
        case 'NA':
          stats.noAdmission++;
          break;
      }
    }

    logger.info(
      `[RAG-RETRIEVE] ✅ Stats for ${passportCountry} (Passport Index): VF=${stats.visaFree} VOA=${stats.visaOnArrival} EV=${stats.eVisa} VR=${stats.visaRequired}`
    );

    return stats;
  } catch (error: any) {
    logger.error(`[RAG-RETRIEVE] ❌ Failed to get stats for ${passportCountry}`, error);
    throw error;
  }
}

/**
 * Map category code to human-readable status
 */
export function mapCategoryToStatus(code: string): string {
  const mapping: Record<string, string> = {
    VF: 'visa free',
    VOA: 'visa on arrival',
    EV: 'e-visa',
    VR: 'visa required',
    NA: 'no admission',
  };
  return mapping[code] || 'unknown';
}



/**
 * Map category code to emoji
 */
export function getCategoryEmoji(code: string): string {
  const mapping: Record<string, string> = {
    VF: '✅',
    VOA: '🛬',
    EV: '💻',
    VR: '📄',
    NA: '⛔',
  };
  return mapping[code] || '❓';
}
