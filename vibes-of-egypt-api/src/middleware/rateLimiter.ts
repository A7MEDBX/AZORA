import rateLimit from 'express-rate-limit';

/**
 * General API rate limiter applied to /api/* (100 requests per 15 minutes per IP).
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many requests from this IP, please try again after 15 minutes.',
    },
  },
});

/**
 * Stricter rate limiter applied to customer submission endpoints
 * (POST /api/inquiries, POST /api/trip-plans): 5 requests per 15 minutes per IP.
 */
export const submissionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message:
        'Submission rate limit exceeded. Please wait 15 minutes before submitting another request.',
    },
  },
});

/**
 * Brute-force protection on POST /api/admin/auth/login (10 attempts per 15 minutes per IP).
 */
export const adminLoginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many login attempts. Please wait 15 minutes before trying again.',
    },
  },
});
