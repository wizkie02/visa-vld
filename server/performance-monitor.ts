/**
 * 📊 PERFORMANCE MONITORING SERVICE
 *
 * Real-time performance monitoring for enhanced RAG services
 * Tracks API response times, cache hit rates, and system health
 */

import { logger } from "./logger";
import { visaRequirementsCache, visaTypesCache, officialDataCache } from "./enhanced-cache-service";

interface PerformanceMetrics {
  endpoint: string;
  totalRequests: number;
  averageResponseTime: number;
  slowRequests: number;
  errorRate: number;
  lastRequest: Date;
}

interface SystemHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: number;
  memoryUsage: NodeJS.MemoryUsage;
  cacheHitRate: number;
  activeConnections: number;
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceMetrics> = new Map();
  private startTime: Date = new Date();
  private requestCounts: Map<string, number> = new Map();

  private constructor() {
    // Initialize metrics for key endpoints
    this.initializeMetrics();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeMetrics(): void {
    const endpoints = [
      '/api/visa-types',
      '/api/visa-requirements',
      '/api/upload',
      '/api/validate',
      '/api/create-validation-session'
    ];

    endpoints.forEach(endpoint => {
      this.metrics.set(endpoint, {
        endpoint,
        totalRequests: 0,
        averageResponseTime: 0,
        slowRequests: 0,
        errorRate: 0,
        lastRequest: new Date()
      });
    });

    logger.info('[PERF] Performance monitor initialized');
  }

  /**
   * Initialize metrics for a specific endpoint
   */
  private initializeEndpointMetric(endpoint: string): void {
    this.metrics.set(endpoint, {
      endpoint,
      totalRequests: 0,
      averageResponseTime: 0,
      slowRequests: 0,
      errorRate: 0,
      lastRequest: new Date()
    });
    logger.debug(`[PERF] Initialized metric for endpoint: ${endpoint}`);
  }

  /**
   * Record a request for performance tracking
   */
  recordRequest(endpoint: string, responseTime: number, statusCode: number): void {
    if (!this.metrics.has(endpoint)) {
      this.initializeEndpointMetric(endpoint);
    }

    const metric = this.metrics.get(endpoint)!;
    const requestCount = this.requestCounts.get(endpoint) || 0;

    // Update metrics
    metric.totalRequests++;
    metric.lastRequest = new Date();

    // Update average response time
    metric.averageResponseTime = (metric.averageResponseTime * requestCount + responseTime) / (requestCount + 1);

    // Track slow requests (>3 seconds)
    if (responseTime > 3000) {
      metric.slowRequests++;
      logger.warn(`[PERF] Slow request detected: ${endpoint} took ${responseTime}ms`);
    }

    // Track errors
    if (statusCode >= 400) {
      const errorCount = this.requestCounts.get(`${endpoint}_errors`) || 0;
      this.requestCounts.set(`${endpoint}_errors`, errorCount + 1);
      metric.errorRate = (errorCount + 1) / metric.totalRequests;
    }

    this.requestCounts.set(endpoint, requestCount + 1);

    // Log performance warnings
    if (responseTime > 5000) {
      logger.error(`[PERF] Very slow request: ${endpoint} took ${responseTime}ms`);
    } else if (responseTime > 3000) {
      logger.warn(`[PERF] Slow request: ${endpoint} took ${responseTime}ms`);
    }
  }

  /**
   * Get performance metrics for all endpoints
   */
  getMetrics(): PerformanceMetrics[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Get metrics for specific endpoint
   */
  getEndpointMetrics(endpoint: string): PerformanceMetrics | null {
    return this.metrics.get(endpoint) || null;
  }

  /**
   * Get system health status
   */
  getSystemHealth(): SystemHealth {
    const memoryUsage = process.memoryUsage();
    const uptime = Date.now() - this.startTime.getTime();

    // Calculate overall cache hit rate
    const reqCacheStats = visaRequirementsCache.getStats();
    const typesCacheStats = visaTypesCache.getStats();
    const officialCacheStats = officialDataCache.getStats();

    const totalRequests = reqCacheStats.totalRequests + typesCacheStats.totalRequests + officialCacheStats.totalRequests;
    const totalCacheHits = reqCacheStats.cacheHits + typesCacheStats.cacheHits + officialCacheStats.cacheHits;
    const cacheHitRate = totalRequests > 0 ? totalCacheHits / totalRequests : 0;

    // Determine health status
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

    // Check for slow response times
    const slowEndpoints = Array.from(this.metrics.values()).filter(m => m.averageResponseTime > 3000);
    if (slowEndpoints.length > 0) {
      status = 'degraded';
    }

    // Check for high error rates
    const highErrorEndpoints = Array.from(this.metrics.values()).filter(m => m.errorRate > 0.1);
    if (highErrorEndpoints.length > 0) {
      status = 'unhealthy';
    }

    // Check memory usage
    const memoryUsagePercent = memoryUsage.heapUsed / memoryUsage.heapTotal;
    if (memoryUsagePercent > 0.9) {
      status = 'unhealthy';
    } else if (memoryUsagePercent > 0.7) {
      status = 'degraded';
    }

    return {
      status,
      uptime,
      memoryUsage,
      cacheHitRate,
      activeConnections: this.getActiveConnections()
    };
  }

  /**
   * Get performance summary for logging
   */
  getPerformanceSummary(): string {
    const health = this.getSystemHealth();
    const metrics = this.getMetrics();

    const totalRequests = metrics.reduce((sum, m) => sum + m.totalRequests, 0);
    const avgResponseTime = metrics.reduce((sum, m) => sum + m.averageResponseTime, 0) / metrics.length;
    const slowRequests = metrics.reduce((sum, m) => sum + m.slowRequests, 0);
    const highErrorEndpoints = metrics.filter(m => m.errorRate > 0.05).length;

    return `
Performance Summary:
- Status: ${health.status.toUpperCase()}
- Uptime: ${Math.round(health.uptime / 1000 / 60)} minutes
- Total Requests: ${totalRequests}
- Average Response Time: ${Math.round(avgResponseTime)}ms
- Slow Requests: ${slowRequests} (${((slowRequests / totalRequests) * 100).toFixed(1)}%)
- High Error Endpoints: ${highErrorEndpoints}
- Cache Hit Rate: ${(health.cacheHitRate * 100).toFixed(1)}%
- Memory Usage: ${Math.round((health.memoryUsage.heapUsed / health.memoryUsage.heapTotal) * 100)}%
    `.trim();
  }

  /**
   * Log performance statistics
   */
  logStats(): void {
    const summary = this.getPerformanceSummary();
    logger.info(`[PERF] ${summary}`);
  }

  /**
   * Get active connections (simplified estimation)
   */
  private getActiveConnections(): number {
    // This is a simplified estimation
    // In a real implementation, you'd track actual connections
    return this.requestCounts.size;
  }

  /**
   * Reset metrics
   */
  resetMetrics(): void {
    this.initializeMetrics();
    this.requestCounts.clear();
    logger.info('[PERF] Metrics reset');
  }

  /**
   * Get slowest endpoints
   */
  getSlowestEndpoints(limit: number = 5): PerformanceMetrics[] {
    return Array.from(this.metrics.values())
      .sort((a, b) => b.averageResponseTime - a.averageResponseTime)
      .slice(0, limit);
  }

  /**
   * Get endpoints with highest error rates
   */
  getHighestErrorEndpoints(limit: number = 5): PerformanceMetrics[] {
    return Array.from(this.metrics.values())
      .filter(m => m.errorRate > 0)
      .sort((a, b) => b.errorRate - a.errorRate)
      .slice(0, limit);
  }
}

// Express middleware for automatic performance tracking
export function performanceTracking(req: any, res: any, next: any) {
  const startTime = Date.now();
  const endpoint = req.path;

  // Override res.json to track completion
  const originalJson = res.json;
  res.json = function(data: any) {
    const responseTime = Date.now() - startTime;
    const statusCode = res.statusCode;

    // Record performance metric
    const monitor = PerformanceMonitor.getInstance();
    monitor.recordRequest(endpoint, responseTime, statusCode);

    // Call original method
    return originalJson.call(this, data);
  };

  // Override res.end to track completion
  const originalEnd = res.end;
  res.end = function(data?: any) {
    const responseTime = Date.now() - startTime;
    const statusCode = res.statusCode;

    // Record performance metric
    const monitor = PerformanceMonitor.getInstance();
    monitor.recordRequest(endpoint, responseTime, statusCode);

    // Call original method
    return originalEnd.call(this, data);
  };

  next();
}

// Background performance monitoring
export class BackgroundMonitor {
  private static instance: BackgroundMonitor;
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {}

  static getInstance(): BackgroundMonitor {
    if (!BackgroundMonitor.instance) {
      BackgroundMonitor.instance = new BackgroundMonitor();
    }
    return BackgroundMonitor.instance;
  }

  start(): void {
    if (this.intervalId) return;

    this.intervalId = setInterval(() => {
      const monitor = PerformanceMonitor.getInstance();
      monitor.logStats();
    }, 300000); // Log every 5 minutes

    logger.info('[PERF] Background monitoring started');
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      logger.info('[PERF] Background monitoring stopped');
    }
  }
}

export default PerformanceMonitor;