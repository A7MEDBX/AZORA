import { AppError } from '../types/api';

export interface PostgrestLikeError {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
}

/**
 * Maps PostgreSQL / PostgREST error codes to clean HTTP AppError instances.
 */
export function mapDbError(error: PostgrestLikeError, fallbackContext: string): AppError {
  switch (error.code) {
    case '23505':
      return new AppError(
        'A record with this unique value (e.g., slug or day number) already exists.',
        409,
        'CONFLICT',
        error.details ?? undefined
      );
    case '23503':
      return new AppError(
        'Cannot complete operation because this record is referenced by other items. Reassign or remove linked items first.',
        409,
        'FOREIGN_KEY_CONFLICT',
        error.details ?? undefined
      );
    case '22P02':
      return new AppError(
        'Invalid identifier or input syntax (expected a valid UUID).',
        400,
        'INVALID_INPUT',
        error.details ?? undefined
      );
    case '23514':
      return new AppError(
        error.message || 'Database check constraint violated.',
        400,
        'CONSTRAINT_VIOLATION',
        error.details ?? undefined
      );
    default:
      return new AppError(
        `${fallbackContext}: ${error.message ?? 'Unexpected database error'}`,
        500,
        'DATABASE_ERROR'
      );
  }
}

export function throwDbError(error: PostgrestLikeError, fallbackContext: string): never {
  throw mapDbError(error, fallbackContext);
}
