import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { apiRateLimiter } from './middleware/rateLimiter';
import apiRoutes from './routes';

const app = express();

// Trust first proxy when deployed behind reverse proxy / load balancer
app.set('trust proxy', 1);

// Security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: env.CORS_ORIGINS.includes('*') ? true : env.CORS_ORIGINS,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsers with strict 50kb payload limits to prevent oversized payload abuse
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Mount API routes with general API rate limiter
app.use('/api', apiRateLimiter, apiRoutes);

// 404 & centralized error handling
app.use(notFound);
app.use(errorHandler);

export default app;
