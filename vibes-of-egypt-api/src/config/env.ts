import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  CORS_ORIGIN: z.string().min(1).default('http://localhost:3000'),
  SUPABASE_URL: z
    .string()
    .url('SUPABASE_URL must be a valid URL')
    .optional()
    .or(z.literal('')),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().or(z.literal('')),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET must be at least 32 characters')
    .default('voe-dev-jwt-secret-change-in-production-min-32-chars'),
  JWT_EXPIRES_IN: z.string().min(2).default('7d'),
  ADMIN_EMAIL: z.string().email().optional().or(z.literal('')),
  ADMIN_PASSWORD: z.string().optional().or(z.literal('')),
  CLOUDINARY_CLOUD_NAME: z.string().trim().optional().or(z.literal('')),
  CLOUDINARY_API_KEY: z.string().trim().optional().or(z.literal('')),
  CLOUDINARY_API_SECRET: z.string().trim().optional().or(z.literal('')),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

if (
  parsed.data.NODE_ENV === 'production' &&
  parsed.data.JWT_SECRET === 'voe-dev-jwt-secret-change-in-production-min-32-chars'
) {
  console.error('FATAL: Set a strong custom JWT_SECRET in production.');
  process.exit(1);
}

export const env = {
  ...parsed.data,
  CORS_ORIGINS: parsed.data.CORS_ORIGIN.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};

export type Env = typeof env;
