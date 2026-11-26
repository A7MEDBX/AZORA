import { z } from 'zod';

const booleanQueryParam = z
  .enum(['true', 'false'])
  .transform((val) => val === 'true')
  .optional();

export const slugParamSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required')
    .max(150, 'Slug is too long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
});

export const toursQuerySchema = z.object({
  category: z.string().trim().min(1).max(80).optional(),
  destination: z.string().trim().min(1).max(150).optional(),
  featured: booleanQueryParam,
});

export const packagesQuerySchema = z.object({
  category: z.string().trim().min(1).max(80).optional(),
  featured: booleanQueryParam,
});

export const cruisesQuerySchema = z.object({
  type: z.string().trim().min(1).max(80).optional(),
  featured: booleanQueryParam,
});

export const experiencesQuerySchema = z.object({
  category: z.string().trim().min(1).max(80).optional(),
  destination: z.string().trim().min(1).max(150).optional(),
  featured: booleanQueryParam,
});

export const journalQuerySchema = z.object({
  category: z.string().trim().min(1).max(80).optional(),
});

export const reviewsQuerySchema = z.object({
  targetType: z.enum(['tour', 'package', 'cruise', 'experience', 'general']).optional(),
  targetId: z.string().trim().min(1).max(150).optional(),
});

export type SlugParams = z.infer<typeof slugParamSchema>;
export type ToursQuery = z.infer<typeof toursQuerySchema>;
export type PackagesQuery = z.infer<typeof packagesQuerySchema>;
export type CruisesQuery = z.infer<typeof cruisesQuerySchema>;
export type ExperiencesQuery = z.infer<typeof experiencesQuerySchema>;
export type JournalQuery = z.infer<typeof journalQuerySchema>;
export type ReviewsQuery = z.infer<typeof reviewsQuerySchema>;
