/**
 * Logger utility to replace console.log throughout the application
 * Prevents sensitive information from being logged in production
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogMeta {
  [key: string]: any;
}

class Logger {
  private isProduction = process.env.NODE_ENV === 'production';

  /**
   * Log informational messages (only in development)
   */
  info(message: string, meta?: LogMeta): void {
    if (!this.isProduction) {
      console.log(`[INFO] ${message}`, meta || '');
    }
  }

  /**
   * Log warnings (shown in all environments)
   */
  warn(message: string, meta?: LogMeta): void {
    console.warn(`[WARN] ${message}`, meta || '');
  }

  /**
   * Log errors (always shown)
   */
  error(message: string, error?: Error | LogMeta): void {
    if (error instanceof Error) {
      console.error(`[ERROR] ${message}`, {
        message: error.message,
        stack: this.isProduction ? undefined : error.stack
      });
    } else {
      console.error(`[ERROR] ${message}`, error || '');
    }
  }

  /**
   * Log debug messages (only in development)
   */
  debug(message: string, meta?: LogMeta): void {
    if (!this.isProduction) {
      console.debug(`[DEBUG] ${message}`, meta || '');
    }
  }

  /**
   * Log API requests (sanitized)
   */
  request(method: string, path: string, statusCode: number, duration: number): void {
    if (!this.isProduction) {
      console.log(`[REQ] ${method} ${path} ${statusCode} in ${duration}ms`);
    }
  }
}

export const logger = new Logger();
