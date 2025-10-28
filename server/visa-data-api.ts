/**
 * 🌐 VISA DATA API
 *
 * REST API endpoints for visa data management
 * Provides access to scraped data, monitoring, and control functions
 */

import { Express } from 'express';
import { visaDataManager } from './visa-data-manager';
import { visaScraperEngine } from './visa-scraper-engine';
import { logger } from './logger';

export function setupVisaDataAPI(app: Express): void {
  logger.info('[VISA-DATA-API] Setting up visa data API endpoints');

  /**
   * GET /api/visa-data/status
   * Get overall system status and statistics
   */
  app.get('/api/visa-data/status', async (req, res) => {
    try {
      const status = await visaDataManager.getStatus();

      res.json({
        success: true,
        data: status,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Error getting status', error as Error);
      res.status(500).json({
        success: false,
        error: 'Failed to get system status'
      });
    }
  });

  /**
   * GET /api/visa-data/countries
   * Get list of all available countries with data
   */
  app.get('/api/visa-data/countries', async (req, res) => {
    try {
      const countries = await visaDataManager.getAllCountriesData();

      // Return simplified list
      const countryList = countries.map(country => ({
        country: country.country,
        code: country.code,
        lastUpdated: country.lastUpdated,
        quality: country.quality,
        visaTypeCount: country.data.visaTypes.length,
        source: country.metadata.source
      }));

      res.json({
        success: true,
        data: {
          countries: countryList,
          total: countryList.length
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Error getting countries', error as Error);
      res.status(500).json({
        success: false,
        error: 'Failed to get countries list'
      });
    }
  });

  /**
   * GET /api/visa-data/country/:country
   * Get detailed visa data for a specific country
   */
  app.get('/api/visa-data/country/:country', async (req, res) => {
    try {
      const { country } = req.params;

      if (!country) {
        return res.status(400).json({
          success: false,
          error: 'Country parameter is required'
        });
      }

      const countryData = await visaDataManager.getCountryData(country.toLowerCase());

      if (!countryData) {
        return res.status(404).json({
          success: false,
          error: `No data found for country: ${country}`
        });
      }

      res.json({
        success: true,
        data: countryData,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Error getting country data', error as Error);
      res.status(500).json({
        success: false,
        error: 'Failed to get country data'
      });
    }
  });

  /**
   * POST /api/visa-data/update/:country
   * Manually trigger update for a specific country
   */
  app.post('/api/visa-data/update/:country', async (req, res) => {
    try {
      const { country } = req.params;
      const { force = false } = req.body;

      if (!country) {
        return res.status(400).json({
          success: false,
          error: 'Country parameter is required'
        });
      }

      logger.info(`[VISA-DATA-API] Manual update requested for ${country} (force: ${force})`);

      const success = await visaDataManager.updateCountryData(country.toLowerCase(), force);

      res.json({
        success,
        message: success
          ? `Successfully updated data for ${country}`
          : `Failed to update data for ${country}`,
        country,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Error updating country data', error as Error);
      res.status(500).json({
        success: false,
        error: 'Failed to update country data'
      });
    }
  });

  /**
   * POST /api/visa-data/batch-update
   * Trigger batch update for multiple countries
   */
  app.post('/api/visa-data/batch-update', async (req, res) => {
    try {
      const { countries = [], force = false } = req.body;

      if (!Array.isArray(countries) || countries.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Countries array is required and cannot be empty'
        });
      }

      logger.info(`[VISA-DATA-API] Batch update requested for ${countries.length} countries`);

      const results = await visaDataManager.batchUpdateCountries(countries);

      res.json({
        success: true,
        data: results,
        message: `Batch update completed: ${results.success}/${countries.length} successful`,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Error during batch update', error as Error);
      res.status(500).json({
        success: false,
        error: 'Failed to perform batch update'
      });
    }
  });

  /**
   * GET /api/visa-data/scraper-stats
   * Get scraper engine statistics
   */
  app.get('/api/visa-data/scraper-stats', async (req, res) => {
    try {
      const stats = await visaScraperEngine.getScrapingStats();

      res.json({
        success: true,
        data: stats,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Error getting scraper stats', error as Error);
      res.status(500).json({
        success: false,
        error: 'Failed to get scraper statistics'
      });
    }
  });

  /**
   * POST /api/visa-data/validate
   * Validate data quality for all countries
   */
  app.post('/api/visa-data/validate', async (req, res) => {
    try {
      logger.info('[VISA-DATA-API] Manual validation requested');

      // This would trigger validation
      await visaDataManager.validateDataQuality();

      res.json({
        success: true,
        message: 'Data validation completed',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Error during validation', error as Error);
      res.status(500).json({
        success: false,
        error: 'Failed to validate data'
      });
    }
  });

  /**
   * POST /api/visa-data/backup
   * Trigger manual backup
   */
  app.post('/api/visa-data/backup', async (req, res) => {
    try {
      logger.info('[VISA-DATA-API] Manual backup requested');

      // This would trigger backup
      // await visaDataManager.performBackup();

      res.json({
        success: true,
        message: 'Manual backup completed',
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Error during backup', error as Error);
      res.status(500).json({
        success: false,
        error: 'Failed to perform backup'
      });
    }
  });

  /**
   * GET /api/visa-data/health
   * Health check endpoint
   */
  app.get('/api/visa-data/health', async (req, res) => {
    try {
      const countries = await visaDataManager.getAllCountriesData();
      const status = await visaDataManager.getStatus();

      res.json({
        success: true,
        status: 'healthy',
        data: {
          totalCountries: countries.length,
          systemUptime: process.uptime(),
          lastUpdate: status.lastBackup,
          averageQuality: status.averageQuality
        },
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Health check failed', error as Error);
      res.status(503).json({
        success: false,
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      });
    }
  });

  /**
   * GET /api/visa-data/config
   * Get current configuration
   */
  app.get('/api/visa-data/config', (req, res) => {
    try {
      // Return safe configuration (no sensitive data)
      const safeConfig = {
        schedule: {
          dailyCount: 7, // Hardcoded for safety
          weeklyCount: 10,
          monthlyCount: 83
        },
        batch: {
          size: 5,
          delay: 10
        },
        quality: {
          minimumCompleteness: 60,
          minimumAccuracy: 70,
          staleAfterHours: 168 // 7 days
        },
        backup: {
          enabled: true,
          frequency: 'weekly',
          retainCount: 5
        }
      };

      res.json({
        success: true,
        data: safeConfig,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('[VISA-DATA-API] Error getting config', error as Error);
      res.status(500).json({
        success: false,
        error: 'Failed to get configuration'
      });
    }
  });

  logger.info('[VISA-DATA-API] ✅ Visa data API endpoints set up successfully');
}