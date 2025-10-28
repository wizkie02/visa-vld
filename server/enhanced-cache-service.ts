/**
 * 🚀 ENHANCED CACHE SERVICE
 *
 * Advanced caching system for enhanced RAG services
 * Multi-layer caching with intelligent invalidation
 */

import NodeCache from "node-cache";
import { logger } from "./logger";

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  source: string;
  confidence: number;
}

interface CacheStats {
  hitRate: number;
  totalRequests: number;
  cacheHits: number;
  memoryUsage: number;
  itemCount: number;
}

/**
 * Enhanced cache service with multi-layer support
 */
export class EnhancedCacheService {
  private memoryCache: NodeCache;
  private stats: CacheStats = {
    hitRate: 0,
    totalRequests: 0,
    cacheHits: 0,
    memoryUsage: 0,
    itemCount: 0
  };

  constructor(options: {
    stdTTL?: number;
    checkperiod?: number;
    maxKeys?: number;
  } = {}) {
    this.memoryCache = new NodeCache({
      stdTTL: options.stdTTL || 3600, // 1 hour default
      checkperiod: options.checkperiod || 600, // 10 minutes
      maxKeys: options.maxKeys || 1000,
      useClones: false, // Performance optimization
    });

    // Cache event listeners
    this.memoryCache.on("set", (key, value) => {
      this.stats.itemCount = this.memoryCache.keys().length;
      logger.debug(`[CACHE] Set: ${key}`);
    });

    this.memoryCache.on("del", (key, value) => {
      this.stats.itemCount = this.memoryCache.keys().length;
      logger.debug(`[CACHE] Deleted: ${key}`);
    });

    this.memoryCache.on("expired", (key, value) => {
      this.stats.itemCount = this.memoryCache.keys().length;
      logger.debug(`[CACHE] Expired: ${key}`);
    });

    logger.info("[CACHE] Enhanced cache service initialized");
  }

  /**
   * Get data from cache with metadata
   */
  get<T>(key: string): T | null {
    this.stats.totalRequests++;

    const entry = this.memoryCache.get<CacheEntry<T>>(key);
    if (!entry) {
      return null;
    }

    // Check if entry is still valid
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.memoryCache.del(key);
      return null;
    }

    this.stats.cacheHits++;
    this.stats.hitRate = this.stats.cacheHits / this.stats.totalRequests;

    logger.debug(`[CACHE] Hit: ${key} (${entry.source}, confidence: ${entry.confidence})`);
    return entry.data;
  }

  /**
   * Set data in cache with metadata
   */
  set<T>(key: string, data: T, options: {
    ttl?: number;
    source?: string;
    confidence?: number;
  } = {}): void {
    const ttl = options.ttl || 3600; // 1 hour default
    const source = options.source || 'unknown';
    const confidence = options.confidence || 0.5;

    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttl * 1000, // Convert to milliseconds
      source,
      confidence
    };

    this.memoryCache.set(key, entry, ttl);
    logger.debug(`[CACHE] Set: ${key} (${source}, confidence: ${confidence}, ttl: ${ttl}s)`);
  }

  /**
   * Delete specific key from cache
   */
  del(key: string): void {
    this.memoryCache.del(key);
    logger.debug(`[CACHE] Deleted: ${key}`);
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.flushAll();
    this.stats = {
      hitRate: 0,
      totalRequests: 0,
      cacheHits: 0,
      memoryUsage: 0,
      itemCount: 0
    };
    logger.info("[CACHE] Cache cleared");
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    this.stats.itemCount = this.memoryCache.keys().length;
    return { ...this.stats };
  }

  /**
   * Get cache keys by pattern
   */
  getKeys(pattern?: string): string[] {
    const keys = this.memoryCache.keys();
    if (!pattern) return keys;

    const regex = new RegExp(pattern, 'i');
    return keys.filter(key => regex.test(key));
  }

  /**
   * Clear cache by pattern
   */
  clearByPattern(pattern: string): number {
    const keys = this.getKeys(pattern);
    keys.forEach(key => this.memoryCache.del(key));
    logger.info(`[CACHE] Cleared ${keys.length} keys matching pattern: ${pattern}`);
    return keys.length;
  }

  /**
   * Get cache entries with low confidence
   */
  getLowConfidenceEntries(threshold: number = 0.7): Array<{ key: string; confidence: number; source: string }> {
    const keys = this.memoryCache.keys();
    const lowConfidenceEntries: Array<{ key: string; confidence: number; source: string }> = [];

    keys.forEach(key => {
      const entry = this.memoryCache.get<CacheEntry<any>>(key);
      if (entry && entry.confidence < threshold) {
        lowConfidenceEntries.push({
          key,
          confidence: entry.confidence,
          source: entry.source
        });
      }
    });

    return lowConfidenceEntries;
  }

  /**
   * Refresh expired entries (for background jobs)
   */
  getExpiredEntries(): string[] {
    const keys = this.memoryCache.keys();
    const expiredKeys: string[] = [];

    keys.forEach(key => {
      const entry = this.memoryCache.get<CacheEntry<any>>(key);
      if (entry && Date.now() - entry.timestamp > entry.ttl) {
        expiredKeys.push(key);
      }
    });

    return expiredKeys;
  }
}

// Singleton instances for different cache types
export const visaRequirementsCache = new EnhancedCacheService({
  stdTTL: 86400, // 24 hours for visa requirements
  maxKeys: 500
});

export const visaTypesCache = new EnhancedCacheService({
  stdTTL: 604800, // 7 days for visa types
  maxKeys: 200
});

export const officialDataCache = new EnhancedCacheService({
  stdTTL: 43200, // 12 hours for official data
  maxKeys: 1000
});

/**
 * Cache helper functions
 */
export function buildCacheKey(...parts: string[]): string {
  return parts.join(':').toLowerCase().replace(/[^a-z0-9:]/g, '_');
}

export function isCacheValid<T>(entry: CacheEntry<T>): boolean {
  return Date.now() - entry.timestamp <= entry.ttl;
}

export function getCacheSource<T>(key: string, cache: EnhancedCacheService): string {
  const entry = cache.get<CacheEntry<T>>(key);
  return entry?.source || 'unknown';
}

/**
 * Background cache cleanup and optimization
 */
export class CacheOptimizer {
  private static instance: CacheOptimizer;
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): CacheOptimizer {
    if (!CacheOptimizer.instance) {
      CacheOptimizer.instance = new CacheOptimizer();
    }
    return CacheOptimizer.instance;
  }

  start(): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      this.performOptimization();
    }, 3600000); // Run every hour

    logger.info("[CACHE-OPTIMIZER] Background optimization started");
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      logger.info("[CACHE-OPTIMIZER] Background optimization stopped");
    }
  }

  private performOptimization(): void {
    logger.info("[CACHE-OPTIMIZER] Running optimization...");

    // Clear expired entries
    const expiredRequirements = visaRequirementsCache.getExpiredEntries();
    const expiredTypes = visaTypesCache.getExpiredEntries();
    const expiredOfficial = officialDataCache.getExpiredEntries();

    if (expiredRequirements.length > 0) {
      expiredRequirements.forEach(key => visaRequirementsCache.del(key));
      logger.info(`[CACHE-OPTIMIZER] Cleared ${expiredRequirements.length} expired visa requirements`);
    }

    if (expiredTypes.length > 0) {
      expiredTypes.forEach(key => visaTypesCache.del(key));
      logger.info(`[CACHE-OPTIMIZER] Cleared ${expiredTypes.length} expired visa types`);
    }

    if (expiredOfficial.length > 0) {
      expiredOfficial.forEach(key => officialDataCache.del(key));
      logger.info(`[CACHE-OPTIMIZER] Cleared ${expiredOfficial.length} expired official data`);
    }

    // Log cache statistics
    const reqStats = visaRequirementsCache.getStats();
    const typesStats = visaTypesCache.getStats();
    const officialStats = officialDataCache.getStats();

    logger.info(`[CACHE-OPTIMIZER] Statistics:
      Visa Requirements: ${reqStats.hitRate.toFixed(2)}% hit rate, ${reqStats.itemCount} items
      Visa Types: ${typesStats.hitRate.toFixed(2)}% hit rate, ${typesStats.itemCount} items
      Official Data: ${officialStats.hitRate.toFixed(2)}% hit rate, ${officialStats.itemCount} items
    `);
  }
}

export default CacheOptimizer;