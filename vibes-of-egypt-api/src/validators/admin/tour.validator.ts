import { z } from 'zod';
import { ADMIN_STATUSES, slugSchema } from './common.validator';

const tourItineraryItemSchema = z.object({
  day: z.coerce.number().int().min(1).optional(),
  title: z.string().trim().min(1).max(200),
  desc: z.string().trim().min(1),
  duration: z.string().trim().max(100).optional(),
  activity: z.string().trim().max(200).optional(),
});

export const createTourSchema = z
  .object({
    destinationId: z.string().trim().uuid('destinationId must be a valid UUID'),
    slug: slugSchema,
    title: z.string().trim().min(2).max(200),
    subheadline: z.string().trim().max(300).optional().nullable(),
    category: z.string().trim().min(2).max(100),
    city: z.string().trim().max(120).optional().nullable(),
    duration: z.string().trim().min(1).max(100),
    price: z.coerce.number().min(0),
    rating: z.coerce.number().min(0).max(5).default(5),
    reviewsCount: z.coerce.number().int().min(0).default(0),
    badge: z.string().trim().max(80).optional().nullable(),
    image: z.string().trim().min(1).max(2048),
    images: z.array(z.string().trim().min(1)).default([]),
    overview: z.string().trim().optional().nullable(),
    description: z.string().trim().min(10),
    highlights: z.array(z.string().trim().min(1)).default([]),
    included: z.array(z.string().trim().min(1)).default([]),
    excluded: z.array(z.string().trim().min(1)).default([]),
    itinerary: z.array(tourItineraryItemSchema).default([]),
    inquiryInfo: z.string().trim().max(500).optional().nullable(),
    featured: z.boolean().default(false),
    status: z.enum(ADMIN_STATUSES).optional(),
    isPublished: z.boolean().optional(),
    displayOrder: z.coerce.number().int().min(0).default(0),
  })
  .strict();

export const updateTourSchema = createTourSchema.partial().strict();

export type CreateTourInput = z.infer<typeof createTourSchema>;
export type UpdateTourInput = z.infer<typeof updateTourSchema>;
