/**
 * 🗄️ VISA DATA MANAGER
 *
 * Central management system for scraped visa data
 * Features:
 * - Automatic updates and scheduling
 * - Data validation and quality checks
 * - Backup and recovery
 * - API integration
 * - Monitoring and alerts
 */

import { promises as fs, mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { logger } from './logger';
import { visaScraperEngine, ScrapedVisaData } from './visa-scraper-engine';

interface VisaDataEntry {
  country: string;
  code: string;
  data: ScrapedVisaData;
  lastUpdated: string;
  quality: {
    completeness: number; // 0-100
    accuracy: number;    // 0-100
    freshness: number;   // 0-100
    overall: number;     // 0-100
  };
  metadata: {
    source: string;
    updateFrequency: string;
    lastCheck: string;
    nextCheck: string;
    errorCount: number;
    lastError?: string;
  };
}

interface DataUpdateConfig {
  schedule: {
    daily: string[];    // Country codes
    weekly: string[];   // Country codes
    monthly: string[];  // Country codes
  };
  batch: {
    size: number;       // Countries per batch
    delay: number;      // Seconds between batches
  };
  quality: {
    minimumCompleteness: number;
    minimumAccuracy: number;
    staleAfterHours: number;
  };
  backup: {
    enabled: boolean;
    frequency: 'daily' | 'weekly';
    retainCount: number;
  };
}

/**
 * 🎯 MAIN DATA MANAGER CLASS
 */
export class VisaDataManager {
  private readonly dataDir = path.join(process.cwd(), 'visa-data');
  private readonly backupDir = path.join(process.cwd(), 'visa-data-backups');
  private readonly configPath = path.join(process.cwd(), 'visa-data-config.json');

  private config: DataUpdateConfig;
  private updateIntervals: NodeJS.Timeout[] = [];

  constructor() {
    this.config = this.getDefaultConfig();
    this.ensureDirectories();
    // Note: loadConfig is called in initialize() to make it async
  }

  /**
   * 🗂️ Initialize data manager
   */
  async initialize(): Promise<void> {
    logger.info('[DATA-MANAGER] Initializing Visa Data Manager');

    try {
      // Load configuration
      await this.loadConfig();

      // Load existing data
      await this.loadAllData();

      // Start scheduled updates
      this.startScheduledUpdates();

      // Perform initial validation
      await this.validateDataQuality();

      logger.info('[DATA-MANAGER] ✅ Initialization completed');
    } catch (error) {
      logger.error('[DATA-MANAGER] ❌ Initialization failed', error as Error);
      throw error;
    }
  }

  /**
   * 📊 Get data for a specific country
   */
  async getCountryData(country: string): Promise<VisaDataEntry | null> {
    try {
      const dataPath = path.join(this.dataDir, `${country}.json`);
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      logger.warn(`[DATA-MANAGER] No data found for ${country}`);
      return null;
    }
  }

  /**
   * 🌍 Get all available countries data
   */
  async getAllCountriesData(): Promise<VisaDataEntry[]> {
    try {
      const files = await fs.readdir(this.dataDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      const countriesData: VisaDataEntry[] = [];

      for (const file of jsonFiles) {
        try {
          const data = await fs.readFile(path.join(this.dataDir, file), 'utf-8');
          const countryData = JSON.parse(data);
          countriesData.push(countryData);
        } catch (error) {
          logger.warn(`[DATA-MANAGER] Error reading ${file}`, error);
        }
      }

      return countriesData.sort((a, b) => a.country.localeCompare(b.country));

    } catch (error) {
      logger.error('[DATA-MANAGER] Error reading all countries data', error);
      return [];
    }
  }

  /**
   * 🔄 Update country data
   */
  async updateCountryData(country: string, force = false): Promise<boolean> {
    try {
      logger.info(`[DATA-MANAGER] Updating data for ${country}`);

      // Scrape latest data
      const scrapedData = await visaScraperEngine.scrapeCountry(country, force);

      if (!scrapedData || !scrapedData.success) {
        logger.error(`[DATA-MANAGER] Failed to scrape data for ${country}`);
        return false;
      }

      // Create data entry
      const dataEntry: VisaDataEntry = {
        country,
        code: scrapedData.code,
        data: scrapedData,
        lastUpdated: new Date().toISOString(),
        quality: this.calculateDataQuality(scrapedData),
        metadata: {
          source: scrapedData.sourceUrl,
          updateFrequency: this.getUpdateFrequency(country),
          lastCheck: new Date().toISOString(),
          nextCheck: this.calculateNextCheck(country),
          errorCount: 0
        }
      };

      // Save data
      await this.saveCountryData(country, dataEntry);

      // Validate quality
      if (dataEntry.quality.overall < this.config.quality.minimumCompleteness) {
        logger.warn(`[DATA-MANAGER] Low quality data for ${country}: ${dataEntry.quality.overall}%`);
      }

      logger.info(`[DATA-MANAGER] ✅ Updated data for ${country} (${dataEntry.quality.overall}% quality)`);
      return true;

    } catch (error) {
      logger.error(`[DATA-MANAGER] Error updating data for ${country}`, error);
      return false;
    }
  }

  /**
   * 🌊 Batch update multiple countries
   */
  async batchUpdateCountries(countries: string[]): Promise<{ success: number; failed: number }> {
    logger.info(`[DATA-MANAGER] Starting batch update for ${countries.length} countries`);

    const results = { success: 0, failed: 0 };
    const batchSize = this.config.batch.size;

    for (let i = 0; i < countries.length; i += batchSize) {
      const batch = countries.slice(i, i + batchSize);

      logger.info(`[DATA-MANAGER] Processing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(countries.length/batchSize)}`);

      const batchPromises = batch.map(country =>
        this.updateCountryData(country).catch(error => {
          logger.error(`[DATA-MANAGER] Failed to update ${country}`, error);
          results.failed++;
          return false;
        })
      );

      const batchResults = await Promise.all(batchPromises);

      batchResults.forEach(success => {
        if (success) results.success++;
      });

      // Delay between batches
      if (i + batchSize < countries.length) {
        await this.sleep(this.config.batch.delay * 1000);
      }
    }

    logger.info(`[DATA-MANAGER] Batch update completed: ${results.success}/${countries.length} successful`);
    return results;
  }

  /**
   * ⏰ Start scheduled updates
   */
  private startScheduledUpdates(): void {
    logger.info('[DATA-MANAGER] Starting scheduled updates');

    // Daily updates
    if (this.config.schedule.daily.length > 0) {
      const dailyInterval = setInterval(async () => {
        logger.info(`[DATA-MANAGER] Running daily updates for ${this.config.schedule.daily.length} countries`);
        await this.batchUpdateCountries(this.config.schedule.daily);
        await this.performBackup();
      }, 24 * 60 * 60 * 1000); // Every 24 hours

      this.updateIntervals.push(dailyInterval);
    }

    // Weekly updates
    if (this.config.schedule.weekly.length > 0) {
      const weeklyInterval = setInterval(async () => {
        logger.info(`[DATA-MANAGER] Running weekly updates for ${this.config.schedule.weekly.length} countries`);
        await this.batchUpdateCountries(this.config.schedule.weekly);
        await this.performBackup();
      }, 7 * 24 * 60 * 60 * 1000); // Every 7 days

      this.updateIntervals.push(weeklyInterval);
    }

    // Monthly updates
    if (this.config.schedule.monthly.length > 0) {
      const monthlyInterval = setInterval(async () => {
        logger.info(`[DATA-MANAGER] Running monthly updates for ${this.config.schedule.monthly.length} countries`);
        await this.batchUpdateCountries(this.config.schedule.monthly);
        await this.performBackup();
      }, 30 * 24 * 60 * 60 * 1000); // Every 30 days

      this.updateIntervals.push(monthlyInterval);
    }

    logger.info(`[DATA-MANAGER] Scheduled ${this.updateIntervals.length} update jobs`);
  }

  /**
   * ✅ Validate data quality
   */
  private async validateDataQuality(): Promise<void> {
    logger.info('[DATA-MANAGER] Validating data quality');

    const allData = await this.getAllCountriesData();
    const issues: string[] = [];

    for (const entry of allData) {
      // Check freshness
      const hoursSinceUpdate = (Date.now() - new Date(entry.lastUpdated).getTime()) / (1000 * 60 * 60);

      if (hoursSinceUpdate > this.config.quality.staleAfterHours) {
        issues.push(`${entry.country}: Data is ${Math.round(hoursSinceUpdate)} hours old (stale)`);
      }

      // Check completeness
      if (entry.quality.completeness < this.config.quality.minimumCompleteness) {
        issues.push(`${entry.country}: Low completeness (${entry.quality.completeness}%)`);
      }

      // Check accuracy
      if (entry.quality.accuracy < this.config.quality.minimumAccuracy) {
        issues.push(`${entry.country}: Low accuracy (${entry.quality.accuracy}%)`);
      }
    }

    if (issues.length > 0) {
      logger.warn(`[DATA-MANAGER] Found ${issues.length} quality issues:`);
      issues.forEach(issue => logger.warn(`[DATA-MANAGER] - ${issue}`));
    } else {
      logger.info('[DATA-MANAGER] ✅ All data passed quality validation');
    }
  }

  /**
   * 💾 Save country data
   */
  private async saveCountryData(country: string, data: VisaDataEntry): Promise<void> {
    try {
      const dataPath = path.join(this.dataDir, `${country}.json`);
      await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    } catch (error) {
      logger.error(`[DATA-MANAGER] Error saving data for ${country}`, error);
      throw error;
    }
  }

  /**
   * 📂 Load all existing data
   */
  private async loadAllData(): Promise<void> {
    try {
      if (!await this.directoryExists(this.dataDir)) {
        logger.info('[DATA-MANAGER] No existing data directory, starting fresh');
        return;
      }

      const files = await fs.readdir(this.dataDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      logger.info(`[DATA-MANAGER] Found ${jsonFiles.length} existing country data files`);

    } catch (error) {
      logger.error('[DATA-MANAGER] Error loading existing data', error);
    }
  }

  /**
   * 📊 Calculate data quality metrics
   */
  private calculateDataQuality(data: ScrapedVisaData): any {
    const completeness = Math.min(100, (data.visaTypes.length / 3) * 100); // Expect at least 3 visa types
    const accuracy = data.visaTypes.reduce((sum, vt) => sum + vt.confidence, 0) / Math.max(1, data.visaTypes.length);
    const freshness = 100; // Fresh when scraped
    const overall = (completeness + accuracy + freshness) / 3;

    return {
      completeness: Math.round(completeness),
      accuracy: Math.round(accuracy),
      freshness: Math.round(freshness),
      overall: Math.round(overall)
    };
  }

  /**
   * 📅 Get update frequency for country
   */
  private getUpdateFrequency(country: string): string {
    // High priority countries get daily updates
    const highPriority = ['usa', 'uk', 'canada', 'australia', 'germany', 'france', 'japan'];
    if (highPriority.includes(country)) return 'daily';

    // Medium priority countries get weekly updates
    const mediumPriority = ['italy', 'spain', 'netherlands', 'sweden', 'norway', 'switzerland', 'singapore', 'south-korea'];
    if (mediumPriority.includes(country)) return 'weekly';

    return 'monthly';
  }

  /**
   * 📅 Calculate next check time
   */
  private calculateNextCheck(country: string): string {
    const now = new Date();
    const frequency = this.getUpdateFrequency(country);

    const hoursToAdd = {
      daily: 24,
      weekly: 24 * 7,
      monthly: 24 * 30
    };

    const nextCheck = new Date(now.getTime() + hoursToAdd[frequency] * 60 * 60 * 1000);
    return nextCheck.toISOString();
  }

  /**
   * 💾 Perform backup
   */
  private async performBackup(): Promise<void> {
    if (!this.config.backup.enabled) {
      return;
    }

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(this.backupDir, `backup-${timestamp}.json`);

      // Create backup of all data
      const allData = await this.getAllCountriesData();
      await fs.writeFile(backupPath, JSON.stringify(allData, null, 2));

      // Clean old backups
      await this.cleanOldBackups();

      logger.info(`[DATA-MANAGER] ✅ Backup created: backup-${timestamp}.json`);

    } catch (error) {
      logger.error('[DATA-MANAGER] ❌ Backup failed', error);
    }
  }

  /**
   * 🧹 Clean old backups
   */
  private async cleanOldBackups(): Promise<void> {
    try {
      const files = await fs.readdir(this.backupDir);
      const backupFiles = files.filter(file => file.startsWith('backup-') && file.endsWith('.json'));

      if (backupFiles.length <= this.config.backup.retainCount) {
        return;
      }

      // Sort by date (newest first)
      backupFiles.sort((a, b) => b.localeCompare(a));

      // Delete old backups
      const filesToDelete = backupFiles.slice(this.config.backup.retainCount);
      for (const file of filesToDelete) {
        await fs.unlink(path.join(this.backupDir, file));
      }

      logger.info(`[DATA-MANAGER] Cleaned ${filesToDelete.length} old backups`);

    } catch (error) {
      logger.error('[DATA-MANAGER] Error cleaning old backups', error);
    }
  }

  /**
   * ⚙️ Get default configuration
   */
  private getDefaultConfig(): DataUpdateConfig {
    return {
      schedule: {
        daily: ['usa', 'uk', 'canada', 'australia', 'germany', 'france', 'japan'],
        weekly: ['italy', 'spain', 'netherlands', 'sweden', 'norway', 'switzerland', 'singapore', 'south-korea', 'new-zealand', 'ireland'],
        monthly: [] // Will be populated with remaining countries
      },
      batch: {
        size: 5,
        delay: 10
      },
      quality: {
        minimumCompleteness: 60,
        minimumAccuracy: 70,
        staleAfterHours: 24 * 7 // 1 week
      },
      backup: {
        enabled: true,
        frequency: 'weekly',
        retainCount: 5
      }
    };
  }

  /**
   * 📄 Load configuration
   */
  private async loadConfig(): Promise<void> {
    try {
      const configData = await fs.readFile(this.configPath, 'utf-8');
      this.config = { ...this.config, ...JSON.parse(configData) };
      logger.info('[DATA-MANAGER] Configuration loaded from file');
    } catch {
      logger.info('[DATA-MANAGER] Using default configuration');
      await this.saveConfig();
    }
  }

  /**
   * 💾 Save configuration
   */
  private async saveConfig(): Promise<void> {
    try {
      await fs.writeFile(this.configPath, JSON.stringify(this.config, null, 2));
      logger.info('[DATA-MANAGER] Configuration saved');
    } catch (error) {
      logger.error('[DATA-MANAGER] Error saving configuration', error);
    }
  }

  /**
   * 📁 Ensure directories exist
   */
  private ensureDirectories(): void {
    try {
      mkdirSync(this.dataDir, { recursive: true });
      mkdirSync(this.backupDir, { recursive: true });
      logger.info('[DATA-MANAGER] Directories created/verified');
    } catch (error) {
      logger.error('[DATA-MANAGER] Error creating directories', error);
    }
  }

  /**
   * 📁 Check if directory exists
   */
  private async directoryExists(dir: string): Promise<boolean> {
    try {
      await fs.access(dir);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 💤 Sleep utility
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 🛑 Stop scheduled updates
   */
  stop(): void {
    logger.info('[DATA-MANAGER] Stopping scheduled updates');
    this.updateIntervals.forEach(interval => clearInterval(interval));
    this.updateIntervals = [];
  }

  /**
   * 📊 Get system status
   */
  async getStatus(): Promise<any> {
    const allData = await this.getAllCountriesData();
    const scraperStats = await visaScraperEngine.getScrapingStats();

    return {
      totalCountries: allData.length,
      activeCountries: allData.filter(d => d.quality.overall >= 70).length,
      averageQuality: Math.round(allData.reduce((sum, d) => sum + d.quality.overall, 0) / Math.max(1, allData.length)),
      lastBackup: await this.getLastBackupTime(),
      nextScheduledUpdate: this.getNextScheduledUpdate(),
      config: {
        dailyUpdates: this.config.schedule.daily.length,
        weeklyUpdates: this.config.schedule.weekly.length,
        monthlyUpdates: this.config.schedule.monthly.length
      },
      scraperStats
    };
  }

  /**
   * 📅 Get last backup time
   */
  private async getLastBackupTime(): Promise<string | null> {
    try {
      const files = await fs.readdir(this.backupDir);
      const backupFiles = files.filter(file => file.startsWith('backup-') && file.endsWith('.json'));

      if (backupFiles.length === 0) return null;

      // Get the latest backup
      backupFiles.sort((a, b) => b.localeCompare(a));
      const latestBackup = backupFiles[0];

      // Extract timestamp from filename
      const timestamp = latestBackup.replace('backup-', '').replace('.json', '');
      return new Date(timestamp.replace(/-/g, ':')).toISOString();

    } catch {
      return null;
    }
  }

  /**
   * 📅 Get next scheduled update
   */
  private getNextScheduledUpdate(): string {
    const now = new Date();
    const nextDay = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return nextDay.toISOString();
  }
}

export const visaDataManager = new VisaDataManager();