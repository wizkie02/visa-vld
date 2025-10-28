/**
 * 🚀 VISA SCRAPER STARTUP SCRIPT
 *
 * Initializes and starts the complete visa data scraping system
 * Includes error handling, monitoring, and graceful shutdown
 */

import { visaDataManager } from './visa-data-manager';
import { visaScraperEngine } from './visa-scraper-engine';
import { logger } from './logger';

interface StartupConfig {
  mode: 'initial' | 'update' | 'monitor';
  countries?: string[];
  parallel?: number;
  force?: boolean;
}

/**
 * 🎯 MAIN STARTUP CLASS
 */
class VisaScraperStartup {
  private isShuttingDown = false;
  private startupTime = new Date();

  /**
   * 🚀 Start the visa scraper system
   */
  async start(config: StartupConfig = { mode: 'initial' }): Promise<void> {
    logger.info('='.repeat(60));
    logger.info('🚀 STARTING VISA SCRAPER SYSTEM');
    logger.info('='.repeat(60));
    logger.info(`📅 Startup Time: ${this.startupTime.toISOString()}`);
    logger.info(`🎯 Mode: ${config.mode}`);
    logger.info(`🌍 Countries: ${config.countries?.length || 'All'}`);
    logger.info(`⚡ Parallel: ${config.parallel || 5}`);
    logger.info(`🔄 Force Update: ${config.force || false}`);
    logger.info('='.repeat(60));

    try {
      // Set up graceful shutdown
      this.setupGracefulShutdown();

      // Initialize data manager
      logger.info('📊 Initializing visa data manager...');
      await visaDataManager.initialize();

      // Perform actions based on mode
      switch (config.mode) {
        case 'initial':
          await this.performInitialScrape(config);
          break;
        case 'update':
          await this.performUpdate(config);
          break;
        case 'monitor':
          await this.startMonitoring();
          break;
      }

      logger.info('✅ Visa scraper system started successfully');
      logger.info(`📊 System ready. Uptime: ${this.getUptime()}`);

    } catch (error) {
      logger.error('❌ Failed to start visa scraper system', error as Error);
      process.exit(1);
    }
  }

  /**
   * 🌍 Perform initial scrape for all countries
   */
  private async performInitialScrape(config: StartupConfig): Promise<void> {
    logger.info('🌍 PERFORMING INITIAL SCRAPE');

    try {
      // Get scraper statistics
      const stats = await visaScraperEngine.getScrapingStats();
      logger.info(`📊 Found ${stats.totalCountries} countries to scrape`);
      logger.info(`🎯 High priority: ${stats.highPriorityCountries}`);
      logger.info(`⭐ High reliability: ${stats.highReliabilitySources}`);

      // Start scraping
      const results = await visaScraperEngine.scrapeAllCountries({
        countries: config.countries,
        forceUpdate: config.force || true,
        parallel: config.parallel || 5
      });

      logger.info(`✅ Initial scrape completed:`);
      logger.info(`   📈 Success: ${results.success}/${results.total} (${Math.round((results.success/results.total) * 100)}%)`);
      logger.info(`   ❌ Failed: ${results.failed}/${results.total}`);

      if (results.failed > 0) {
        logger.warn(`⚠️ ${results.failed} countries failed to scrape. Check logs for details.`);
      }

      // Validate data quality
      await visaDataManager.validateDataQuality();

      logger.info('🎉 Initial scrape process completed');

    } catch (error) {
      logger.error('❌ Initial scrape failed', error as Error);
      throw error;
    }
  }

  /**
   * 🔄 Perform update for specified countries
   */
  private async performUpdate(config: StartupConfig): Promise<void> {
    logger.info('🔄 PERFORMING UPDATE');

    try {
      if (!config.countries || config.countries.length === 0) {
        logger.error('❌ No countries specified for update');
        throw new Error('Countries list is required for update mode');
      }

      logger.info(`🎯 Updating ${config.countries.length} countries`);

      const results = await visaDataManager.batchUpdateCountries(config.countries);

      logger.info(`✅ Update completed:`);
      logger.info(`   📈 Success: ${results.success}/${config.countries.length}`);
      logger.info(`   ❌ Failed: ${results.failed}/${config.countries.length}`);

      // Validate updated data
      await visaDataManager.validateDataQuality();

      logger.info('🎉 Update process completed');

    } catch (error) {
      logger.error('❌ Update failed', error as Error);
      throw error;
    }
  }

  /**
   * 👁️ Start monitoring mode
   */
  private async startMonitoring(): Promise<void> {
    logger.info('👁️ STARTING MONITORING MODE');

    try {
      // Get current status
      const status = await visaDataManager.getStatus();

      logger.info('📊 Current System Status:');
      logger.info(`   🌍 Total Countries: ${status.totalCountries}`);
      logger.info(`   ✅ Active Countries: ${status.activeCountries}`);
      logger.info(`   📈 Average Quality: ${status.averageQuality}%`);
      logger.info(`   📅 Last Backup: ${status.lastBackup || 'Never'}`);
      logger.info(`   ⏰ Next Update: ${status.nextScheduledUpdate}`);

      // Schedule periodic status checks
      setInterval(async () => {
        if (this.isShuttingDown) return;

        try {
          const currentStatus = await visaDataManager.getStatus();
          logger.info(`📊 Status Check (${this.getUptime()}): ${currentStatus.activeCountries}/${currentStatus.totalCountries} active, ${currentStatus.averageQuality}% avg quality`);
        } catch (error) {
          logger.error('Status check failed', error as Error);
        }
      }, 60000); // Every minute

      // Keep process alive
      logger.info('👁️ Monitoring started. Press Ctrl+C to stop.');

      await new Promise((resolve) => {
        // Keep running until shutdown
      });

    } catch (error) {
      logger.error('❌ Monitoring failed', error as Error);
      throw error;
    }
  }

  /**
   * 🛑 Setup graceful shutdown
   */
  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string) => {
      if (this.isShuttingDown) return;

      this.isShuttingDown = true;
      logger.info(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      logger.info(`📊 Total uptime: ${this.getUptime()}`);

      try {
        // Stop scheduled updates
        visaDataManager.stop();
        logger.info('✅ Scheduled updates stopped');

        logger.info('👋 Visa scraper system shut down gracefully');
        process.exit(0);

      } catch (error) {
        logger.error('❌ Error during shutdown', error as Error);
        process.exit(1);
      }
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('uncaughtException', (error) => {
      logger.error('💥 Uncaught Exception', error);
      shutdown('uncaughtException');
    });
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
      shutdown('unhandledRejection');
    });
  }

  /**
   * ⏰ Get uptime
   */
  private getUptime(): string {
    const uptime = Date.now() - this.startupTime.getTime();
    const hours = Math.floor(uptime / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }
}

/**
 * 🎯 Main function - run from command line
 */
async function main(): Promise<void> {
  const startup = new VisaScraperStartup();

  // Parse command line arguments
  const args = process.argv.slice(2);
  const config: StartupConfig = {
    mode: 'initial'
  };

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
      case '--mode':
        config.mode = args[i + 1] as 'initial' | 'update' | 'monitor';
        i++;
        break;
      case '--countries':
        config.countries = args[i + 1].split(',');
        i++;
        break;
      case '--parallel':
        config.parallel = parseInt(args[i + 1]);
        i++;
        break;
      case '--force':
        config.force = true;
        break;
      case '--help':
        console.log(`
🚀 Visa Scraper System

Usage: npm run visa-scraper [options]

Options:
  --mode <mode>        Startup mode (initial|update|monitor)
  --countries <list>    Comma-separated list of countries to process
  --parallel <num>      Number of parallel requests (default: 5)
  --force              Force update even if not needed
  --help               Show this help message

Examples:
  npm run visa-scraper --mode initial
  npm run visa-scraper --mode update --countries usa,uk,canada
  npm run visa-scraper --mode monitor
  npm run visa-scraper --mode initial --parallel 3 --force
        `);
        process.exit(0);
    }
  }

  // Start the system
  await startup.start(config);
}

// Export for use in other modules
export { VisaScraperStartup };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    logger.error('💥 Fatal error during startup', error);
    process.exit(1);
  });
}