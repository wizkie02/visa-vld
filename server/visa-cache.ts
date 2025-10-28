/**
 * VISA TYPES CACHE
 *
 * Simple in-memory cache for visa types responses
 * Reduces API calls and improves response time
 */

interface CachedVisaTypes {
  data: any;
  timestamp: number;
  source: string;
  confidence: number;
}

class VisaTypesCache {
  private cache = new Map<string, CachedVisaTypes>();
  private readonly CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

  set(country: string, data: any, source: string, confidence: number): void {
    this.cache.set(country.toLowerCase(), {
      data,
      timestamp: Date.now(),
      source,
      confidence
    });
  }

  get(country: string): CachedVisaTypes | null {
    const cached = this.cache.get(country.toLowerCase());
    if (!cached) return null;

    // Check if cache is still valid
    if (Date.now() - cached.timestamp > this.CACHE_TTL) {
      this.cache.delete(country.toLowerCase());
      return null;
    }

    return cached;
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.CACHE_TTL) {
        this.cache.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats(): { size: number; hitRate: number } {
    return {
      size: this.cache.size,
      hitRate: 0 // Would need tracking to implement hit rate
    };
  }
}

export const visaTypesCache = new VisaTypesCache();

// Clean up cache every hour
setInterval(() => {
  visaTypesCache.cleanup();
}, 60 * 60 * 1000);