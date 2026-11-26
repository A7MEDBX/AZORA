import type { NextFunction, Request, Response } from 'express';
import { verifyAdminJwt } from '../services/admin/auth.admin.service';
import { AppError } from '../types/api';

/**
 * Verifies a backend-issued HS256 JWT from `Authorization: Bearer <token>`
 * and enforces `role === 'admin'`.
 */
export function requireAdmin(req: Request, _res: Response, next: NextFunction): void {
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

    req.adminUser = verifyAdminJwt(token);
    next();
  } catch (err) {
    next(err);
  }
}
