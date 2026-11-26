import { z } from 'zod';
import { ADMIN_STATUSES, slugSchema } from './common.validator';

export const packageDestinationLinkSchema = z.object({
  destinationId: z.string().trim().uuid('destinationId must be a valid UUID'),
  displayOrder: z.coerce.number().int().min(0).default(0),
});

export const packageItineraryDayInputSchema = z.object({
  dayNumber: z.coerce.number().int().min(1, 'dayNumber must be >= 1'),
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().min(1),
  destinationId: z.string().trim().uuid('destinationId must be a valid UUID').optional().nullable(),
  imageUrl: z.string().trim().max(2048).optional().nullable(),
  meals: z.string().trim().max(200).optional().nullable(),
  overnightLocation: z.string().trim().max(200).optional().nullable(),
  accommodation: z.string().trim().max(200).optional().nullable(),
});

export const createPackageSchema = z
  .object({
    slug: slugSchema,
    title: z.string().trim().min(2).max(200),
    category: z.string().trim().max(100).optional().nullable(),
    duration: z.string().trim().min(1).max(100),
    durationDays: z.coerce.number().int().min(1),
    durationNights: z.coerce.number().int().min(0),
    price: z.coerce.number().min(0),
    rating: z.coerce.number().min(0).max(5).default(5),
    reviewsCount: z.coerce.number().int().min(0).default(0),
    badge: z.string().trim().max(80).optional().nullable(),
    image: z.string().trim().min(1).max(2048),
    images: z.array(z.string().trim().min(1)).default([]),
    route: z.string().trim().min(2).max(300),
    hotels: z.string().trim().max(500).optional().nullable(),
    overview: z.string().trim().optional().nullable(),
    description: z.string().trim().min(10),
    highlights: z.array(z.string().trim().min(1)).default([]),
    accommodation: z.string().trim().max(500).optional().nullable(),
    inclusions: z.array(z.string().trim().min(1)).default([]),
    exclusions: z.array(z.string().trim().min(1)).default([]),
    featured: z.boolean().default(false),
    status: z.enum(ADMIN_STATUSES).optional(),
    isPublished: z.boolean().optional(),
    displayOrder: z.coerce.number().int().min(0).default(0),
    packageDestinations: z.array(packageDestinationLinkSchema).optional(),
    packageItineraryDays: z.array(packageItineraryDayInputSchema).optional(),
  })
  .strict();

export const updatePackageSchema = createPackageSchema.partial().strict();

export type CreatePackageInput = z.infer<typeof createPackageSchema>;
export type UpdatePackageInput = z.infer<typeof updatePackageSchema>;
export type PackageDestinationLinkInput = z.infer<typeof packageDestinationLinkSchema>;
export type PackageItineraryDayInput = z.infer<typeof packageItineraryDayInputSchema>;
