import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodSchema } from 'zod';

interface ValidationSchemas {
  body?: ZodSchema;
  query?: AnyZodObject | ZodSchema;
  params?: AnyZodObject | ZodSchema;
}

export interface ValidatedRequestData {
  body?: unknown;
  query?: unknown;
  params?: unknown;
}

/**
 * Validates request body, query, and/or params against Zod schemas.
 * Stores parsed, coerced values on res.locals.validated for type-safe access.
 */
export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const validated: ValidatedRequestData = {};

      if (schemas.params) {
        const parsedParams = schemas.params.parse(req.params);
        validated.params = parsedParams;
        req.params = parsedParams;
      }

      if (schemas.query) {
        validated.query = schemas.query.parse(req.query);
      }

      if (schemas.body) {
        const parsedBody = schemas.body.parse(req.body);
        validated.body = parsedBody;
        req.body = parsedBody;
      }

      res.locals.validated = validated;
      next();
    } catch (error) {
      next(error);
    }
  };
}
