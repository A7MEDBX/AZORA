import { z } from 'zod';
import { ADMIN_STATUSES, slugSchema } from './common.validator';

const cruiseItineraryItemSchema = z.object({
  day: z.coerce.number().int().min(1),
  port: z.string().trim().min(1).max(150),
  activity: z.string().trim().min(1).max(250),
  desc: z.string().trim().optional(),
});

const cruiseShipInfoSchema = z
  .object({
    yearBuilt: z.string().trim().optional(),
    length: z.string().trim().optional(),
    decks: z.coerce.number().int().min(1).optional(),
    cabinsCount: z.coerce.number().int().min(1).optional(),
    dining: z.string().trim().optional(),
    crewRatio: z.string().trim().optional(),
  })
  .passthrough();

export const createCruiseSchema = z
  .object({
    slug: slugSchema,
    title: z.string().trim().min(2).max(200),
    profileName: z.string().trim().max(200).optional().nullable(),
    profileTitle: z.string().trim().max(200).optional().nullable(),
    cruiseType: z.string().trim().min(2).max(100),
    vesselType: z.string().trim().min(2).max(100),
    route: z.string().trim().min(2).max(200),
    capacity: z.string().trim().min(1).max(120),
    duration: z.string().trim().min(1).max(100),
    durationNights: z.coerce.number().int().min(1),
    price: z.coerce.number().min(0),
    rating: z.coerce.number().min(0).max(5).default(5),
    reviewsCount: z.coerce.number().int().min(0).default(0),
    badge: z.string().trim().max(80).optional().nullable(),
    image: z.string().trim().min(1).max(2048),
    images: z.array(z.string().trim().min(1)).default([]),
    lead: z.string().trim().optional().nullable(),
    description: z.string().trim().min(10),
    highlights: z.array(z.string().trim().min(1)).default([]),
    cabins: z.string().trim().max(300).optional().nullable(),
    amenities: z.array(z.string().trim().min(1)).default([]),
    shipInfo: cruiseShipInfoSchema.optional(),
    itinerary: z.array(cruiseItineraryItemSchema).default([]),
    featured: z.boolean().default(false),
    status: z.enum(ADMIN_STATUSES).optional(),
    isPublished: z.boolean().optional(),
    displayOrder: z.coerce.number().int().min(0).default(0),
  })
  .strict();

export const updateCruiseSchema = createCruiseSchema.partial().strict();

export type CreateCruiseInput = z.infer<typeof createCruiseSchema>;
export type UpdateCruiseInput = z.infer<typeof updateCruiseSchema>;
