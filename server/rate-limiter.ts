import rateLimit from 'express-rate-limit';

/**
 * Rate limiting configuration for API endpoints
 * Prevents abuse and controls OpenAI API costs
 */

// General API rate limiter - applies to all /api/* routes
export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 60, // Max 60 requests per minute per IP
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Skip successful requests for some routes
  skipSuccessfulRequests: false,
});

// Stricter rate limit for file uploads (expensive OpenAI operations)
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 upload sessions per 15 minutes
  message: 'Too many file uploads. Please wait before uploading more documents.',
  standardHeaders: true,
  legacyHeaders: false,
  // Use custom key generator if you want to rate limit per user instead of IP
  // keyGenerator: (req) => req.user?.id || req.ip,
});

// Rate limit for validation requests (also expensive)
export const validationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10, // Max 10 validation requests per 10 minutes
  message: 'Too many validation requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limit for requirements fetching (moderate cost)
export const requirementsLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Max 100 requirements checks per 5 minutes (increased for development)
  message: 'Too many requirements requests. Please slow down.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limit for auth endpoints (prevent brute force)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 login/register attempts per 15 minutes
  message: 'Too many authentication attempts. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful logins
});
