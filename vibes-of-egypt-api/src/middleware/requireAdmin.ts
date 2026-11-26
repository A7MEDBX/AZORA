import type { NextFunction, Request, Response } from 'express';
import { getSupabaseClient } from '../config/supabase';
import { AppError } from '../types/api';

/**
 * Verifies a Supabase JWT from `Authorization: Bearer <token>` server-side
 * and strictly enforces `user.app_metadata.role === 'admin'` (never user_metadata).
 */
export async function requireAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next(new AppError('Missing or malformed Authorization Bearer token', 401, 'UNAUTHORIZED'));
      return;
    }

    const token = authHeader.slice('Bearer '.length).trim();
    if (!token) {
      next(new AppError('Empty Authorization Bearer token', 401, 'UNAUTHORIZED'));
      return;
    }

    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      next(new AppError('Invalid or expired authentication token', 401, 'UNAUTHORIZED'));
      return;
    }

    const appMetadata = data.user.app_metadata as Record<string, unknown> | undefined;
    if (appMetadata?.role !== 'admin') {
      next(new AppError('Admin privileges are required to access this resource', 403, 'FORBIDDEN'));
      return;
    }

    req.adminUser = {
      id: data.user.id,
      email: data.user.email ?? '',
    };

    next();
  } catch (err) {
    next(err);
  }
}
