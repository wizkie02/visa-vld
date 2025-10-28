import axios from 'axios';
import { parse } from 'csv-parse/sync';
import { logger } from './logger';
import { OfficialVisaData } from './visa-api-service';

const CSV_URL =
  'https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso2.csv';

interface PassportIndexRow {
  Passport: string;
  Destination: string;
  Requirement: string; // "visa free", "e-visa", "visa required", "21" (days), etc.
}

class PassportIndexCache {
  private cache: Map<string, PassportIndexRow> = new Map();
  private lastUpdate: Date | null = null;
  private readonly CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  async init() {
    logger.info('[CSV-LOADER] Initializing Passport Index cache...');
    await this.refresh();

    // Auto-refresh every 7 days
    setInterval(() => {
      logger.info('[CSV-LOADER] Auto-refresh triggered (7 days elapsed)');
      this.refresh();
    }, this.CACHE_DURATION);
  }

  async refresh() {
    try {
      logger.info('[CSV-LOADER] Downloading Passport Index dataset from GitHub...');

      const response = await axios.get(CSV_URL, { timeout: 10000 });
      const rows: PassportIndexRow[] = parse(response.data, {
        columns: true,
        skip_empty_lines: true,
      });

      this.cache.clear();
      for (const row of rows) {
        const key = `${row.Passport}-${row.Destination}`;
        this.cache.set(key, row);
      }

      this.lastUpdate = new Date();
      logger.info(
        `[CSV-LOADER] ✅ Loaded ${rows.length} entries (last updated: ${this.lastUpdate.toISOString()})`
      );
    } catch (error: any) {
      logger.error('[CSV-LOADER] ❌ Failed to download CSV dataset', error);
    }
  }

  lookup(passport: string, destination: string): OfficialVisaData | null {
    const key = `${passport.toUpperCase()}-${destination.toUpperCase()}`;
    const row = this.cache.get(key);

    if (!row) {
      logger.warn(`[CSV-LOADER] No data found for ${passport} → ${destination}`);
      return null;
    }

    // Parse requirement string
    const { category, duration } = this.parseRequirement(row.Requirement);

    return {
      passport: { name: passport, code: passport },
      destination: { name: destination, code: destination },
      category,
      duration,
      lastUpdated: this.lastUpdate?.toISOString() || new Date().toISOString(),
    };
  }

  private parseRequirement(requirement: string): {
    category: OfficialVisaData['category'];
    duration: number | null;
  } {
    const req = requirement.toLowerCase().trim();

    // Check for visa-free with duration (e.g., "21", "90", "180")
    const durationMatch = req.match(/^(\d+)$/);
    if (durationMatch) {
      return {
        category: { name: 'Visa Free', code: 'VF' },
        duration: parseInt(durationMatch[1], 10),
      };
    }

    // Map requirement string to category
    if (req.includes('visa free')) {
      return { category: { name: 'Visa Free', code: 'VF' }, duration: null };
    }
    if (req.includes('visa on arrival')) {
      return { category: { name: 'Visa on Arrival', code: 'VOA' }, duration: null };
    }
    if (req.includes('e-visa') || req.includes('evisa')) {
      return { category: { name: 'eVisa', code: 'EV' }, duration: null };
    }
    if (req.includes('eta')) {
      return { category: { name: 'eVisa', code: 'EV' }, duration: null }; // ETA treated as eVisa
    }
    if (req.includes('visa required')) {
      return { category: { name: 'Visa Required', code: 'VR' }, duration: null };
    }
    if (req.includes('no admission')) {
      return { category: { name: 'No Admission', code: 'NA' }, duration: null };
    }

    // Default to visa required if unknown
    logger.warn(`[CSV-LOADER] Unknown requirement: "${requirement}", defaulting to Visa Required`);
    return { category: { name: 'Visa Required', code: 'VR' }, duration: null };
  }

  isStale(): boolean {
    if (!this.lastUpdate) return true;
    return Date.now() - this.lastUpdate.getTime() > this.CACHE_DURATION;
  }

  getStats(): { entries: number; lastUpdate: string | null; isStale: boolean } {
    return {
      entries: this.cache.size,
      lastUpdate: this.lastUpdate?.toISOString() || null,
      isStale: this.isStale(),
    };
  }
}

// Export singleton instance
export const passportIndexCache = new PassportIndexCache();
