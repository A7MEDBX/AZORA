import { z } from 'zod';
import { ADMIN_STATUSES, slugSchema } from './common.validator';

const practicalInfoSchema = z
  .object({
    bestSeason: z.string().trim().optional(),
    currency: z.string().trim().optional(),
    climate: z.string().trim().optional(),
    airport: z.string().trim().optional(),
    recommendedStay: z.string().trim().optional(),
    localTips: z.array(z.string().trim().min(1)).optional(),
  })
  .passthrough();

export const createDestinationSchema = z
  .object({
    slug: slugSchema,
    name: z.string().trim().min(2).max(150),
    arabicName: z.string().trim().max(150).optional().nullable(),
    tagline: z.string().trim().min(2).max(300),
    category: z.string().trim().min(2).max(100),
    image: z.string().trim().min(1).max(2048),
    heroImage: z.string().trim().min(1).max(2048),
    startingPrice: z.coerce.number().min(0).default(0),
    shortDescription: z.string().trim().max(500).optional().nullable(),
    description: z.string().trim().min(10),
    highlights: z.array(z.string().trim().min(1)).default([]),
    gallery: z.array(z.string().trim().min(1)).default([]),
    bestTimeToVisit: z.string().trim().max(200).optional().nullable(),
    practicalInfo: practicalInfoSchema.optional(),
    featured: z.boolean().default(false),
    status: z.enum(ADMIN_STATUSES).optional(),
    isPublished: z.boolean().optional(),
    displayOrder: z.coerce.number().int().min(0).default(0),
  })
  .strict();

export const updateDestinationSchema = createDestinationSchema.partial().strict();

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>;
