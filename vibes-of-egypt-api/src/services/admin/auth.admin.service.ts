import { timingSafeEqual } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env';
import { AppError } from '../../types/api';
import type { AdminUser } from '../../types/express';
import type { AdminLoginInput } from '../../validators/admin/auth.admin.validator';

interface AdminJwtPayload {
  sub: string;
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export interface AdminLoginResult {
  token: string;
  user: AdminUser;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function signAdminToken(user: AdminUser): string {
  const payload: AdminJwtPayload = {
    sub: user.id,
    email: user.email,
    role: 'admin',
  };

  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, env.JWT_SECRET, options);
}

/**
 * Authenticates admin credentials on the backend and issues a signed HS256 JWT.
 * Supports:
 *  1. Direct env-configured admin (`ADMIN_EMAIL` + `ADMIN_PASSWORD`), and/or
 *  2. Admin users created via `npm run create-admin` in Supabase (`app_metadata.role === 'admin'`).
 */
export async function loginAdmin(input: AdminLoginInput): Promise<AdminLoginResult> {
  const normalizedEmail = input.email.trim().toLowerCase();

  // 1. Check direct env-configured admin credentials if both are set
  if (env.ADMIN_EMAIL && env.ADMIN_PASSWORD) {
    const emailMatches = safeEqual(normalizedEmail, env.ADMIN_EMAIL.trim().toLowerCase());
    const passwordMatches = safeEqual(input.password, env.ADMIN_PASSWORD);

    if (emailMatches && passwordMatches) {
      const user: AdminUser = {
        id: '00000000-0000-0000-0000-000000000001',
        email: normalizedEmail,
      };
      return { token: signAdminToken(user), user };
    }
  }

  // 2. Verify against Supabase Auth server-side (stateless ephemeral client)
  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
    const authClient = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await authClient.auth.signInWithPassword({
      email: normalizedEmail,
      password: input.password,
    });

    if (!error && data.user) {
      const appMetadata = data.user.app_metadata as Record<string, unknown> | undefined;
      if (appMetadata?.role !== 'admin') {
        throw new AppError(
          'Access denied. This account does not have administrator privileges.',
          403,
          'FORBIDDEN'
        );
      }

      const user: AdminUser = {
        id: data.user.id,
        email: data.user.email ?? normalizedEmail,
      };
      return { token: signAdminToken(user), user };
    }
  }

  throw new AppError('Invalid administrator email or password', 401, 'INVALID_CREDENTIALS');
}

/**
 * Verifies a backend-issued HS256 Admin JWT and returns `{ id, email }`.
 */
export function verifyAdminJwt(token: string): AdminUser {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ['HS256'],
    }) as AdminJwtPayload;

    if (!decoded || typeof decoded !== 'object' || decoded.role !== 'admin' || !decoded.sub) {
      throw new AppError('Admin privileges are required to access this resource', 403, 'FORBIDDEN');
    }

    return {
      id: decoded.sub,
      email: decoded.email ?? '',
    };
  } catch (err: unknown) {
    if (err instanceof AppError) {
      throw err;
    }
    throw new AppError('Invalid or expired authentication token', 401, 'UNAUTHORIZED');
  }
}
