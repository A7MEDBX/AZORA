import { z } from 'zod';
import { ADMIN_STATUSES, slugSchema } from './common.validator';

const experiencePracticalInfoSchema = z
  .object({
    timing: z.string().trim().optional(),
    dressCode: z.string().trim().optional(),
    physicalLevel: z.string().trim().optional(),
    included: z.array(z.string().trim().min(1)).optional(),
  })
  .passthrough();

export const createExperienceSchema = z
  .object({
    destinationId: z.string().trim().uuid('destinationId must be a valid UUID').optional().nullable(),
    slug: slugSchema,
    title: z.string().trim().min(2).max(200),
    location: z.string().trim().min(2).max(150),
    category: z.string().trim().min(2).max(100),
    duration: z.string().trim().min(1).max(100),
    price: z.coerce.number().min(0),
    rating: z.coerce.number().min(0).max(5).default(5),
    reviewsCount: z.coerce.number().int().min(0).default(0),
    badge: z.string().trim().max(80).optional().nullable(),
    image: z.string().trim().min(1).max(2048),
    gallery: z.array(z.string().trim().min(1)).default([]),
    description: z.string().trim().min(10),
    highlights: z.array(z.string().trim().min(1)).default([]),
    practicalInfo: experiencePracticalInfoSchema.optional(),
    inquiryCta: z.string().trim().max(150).optional().nullable(),
    featured: z.boolean().default(false),
    status: z.enum(ADMIN_STATUSES).optional(),
    isPublished: z.boolean().optional(),
    displayOrder: z.coerce.number().int().min(0).default(0),
  })
  .strict();

export const updateExperienceSchema = createExperienceSchema.partial().strict();

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof updateExperienceSchema>;
