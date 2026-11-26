import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { env } from '../config/env';
import { AppError, type ApiErrorResponse } from '../types/api';
import { mapDbError, type PostgrestLikeError } from '../utils/dbError';

const PG_ERROR_CODES = new Set(['23505', '23503', '22P02', '23514']);

function isPostgresConstraintError(err: unknown): err is PostgrestLikeError {
  return (
    typeof err === 'object' &&
    err !== null &&
    'code' in err &&
    typeof (err as { code?: unknown }).code === 'string' &&
    PG_ERROR_CODES.has((err as { code: string }).code)
  );
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response<ApiErrorResponse>,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Request validation failed',
        details: err.flatten(),
      },
    });
    return;
  }

  if (isPostgresConstraintError(err)) {
    const mapped = mapDbError(err, 'Database operation failed');
    res.status(mapped.statusCode).json({
      error: {
        code: mapped.code,
        message: mapped.message,
        ...(mapped.details !== undefined ? { details: mapped.details } : {}),
      },
    });
    return;
  }

  if (err instanceof SyntaxError && 'status' in err && (err as { status?: number }).status === 400) {
    res.status(400).json({
      error: {
        code: 'INVALID_JSON',
        message: 'Malformed JSON payload',
      },
    });
    return;
  }

  if (env.NODE_ENV !== 'test') {
    console.error('[Unhandled Error]', err);
  }

  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message:
        env.NODE_ENV === 'production'
          ? 'An unexpected error occurred'
          : err instanceof Error
            ? err.message
            : 'An unexpected error occurred',
    },
  });
}
