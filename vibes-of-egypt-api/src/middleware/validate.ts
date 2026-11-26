import type { NextFunction, Request, Response } from 'express';
import type { AnyZodObject, ZodSchema } from 'zod';

interface ValidationSchemas {
  body?: ZodSchema;
  query?: AnyZodObject | ZodSchema;
  params?: AnyZodObject | ZodSchema;
}

/**
 * Validates request body, query, and/or params against Zod schemas.
 * Parsed values replace the raw properties on the request object.
 */
export function validate(schemas: ValidationSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
