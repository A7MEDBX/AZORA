import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

const isProd = env.NODE_ENV === 'production';

/**
 * General API rate limiter applied to /api/*
 * Production: 300 requests / 15 min / IP. Dev/Test: 5000 requests / 15 min / IP.
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 300 : 5000,
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
 * (POST /api/inquiries, POST /api/trip-plans).
 * Production: 5 requests / 15 min / IP. Dev/Test: 100 requests / 15 min / IP.
 */
export const submissionRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 5 : 100,
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
 * Brute-force protection on POST /api/admin/auth/login.
 * Production: 10 attempts / 15 min / IP. Dev/Test: 100 attempts / 15 min / IP.
 */
export const adminLoginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 10 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: {
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many login attempts. Please wait 15 minutes before trying again.',
    },
  },
});
