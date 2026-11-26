import { z } from 'zod';

const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine((val) => !Number.isNaN(Date.parse(val)), 'Invalid calendar date')
  .optional();

const phoneSchema = z
  .string()
  .trim()
  .min(6, 'Phone number must be at least 6 characters')
  .max(30, 'Phone number must be at most 30 characters')
  .regex(/^[+\d\s().-]+$/, 'Phone number contains invalid characters')
  .optional()
  .or(z.literal('').transform(() => undefined));

const TRAVEL_STYLES = [
  'Ultra Luxury',
  'Classic Luxury',
  'Family Comfort',
  'Tailor Made',
] as const;

export const createTripPlanSchema = z
  .object({
    fullName: z
      .string({ required_error: 'Full name is required' })
      .trim()
      .min(2, 'Full name must be at least 2 characters')
      .max(120, 'Full name must be at most 120 characters'),
    email: z
      .string({ required_error: 'Email is required' })
      .trim()
      .email('Please provide a valid email address')
      .max(254, 'Email is too long'),
    phone: phoneSchema,
    country: z.string().trim().max(100).optional(),
    travelStartDate: isoDateSchema,
    travelEndDate: isoDateSchema,
    isDatesFlexible: z.boolean().optional(),
    durationDays: z.coerce.number().int().min(1).max(90).optional(),
    adultsCount: z.coerce.number().int().min(1, 'At least 1 adult is required').max(50).default(1),
    childrenCount: z.coerce.number().int().min(0, 'Children count cannot be negative').max(50).default(0),
    preferredDestinations: z
      .array(z.string().trim().min(1).max(100))
      .max(20, 'At most 20 preferred destinations allowed')
      .optional(),
    interests: z
      .array(z.string().trim().min(1).max(100))
      .max(20, 'At most 20 interests allowed')
      .optional(),
    accommodationPreference: z
      .string()
      .trim()
      .max(100, 'Accommodation preference must be at most 100 characters')
      .optional(),
    travelStyle: z.enum(TRAVEL_STYLES).optional(),
    budgetPerPerson: z.string().trim().max(100).optional(),
    additionalNotes: z
      .string()
      .trim()
      .max(3000, 'Additional notes must be at most 3000 characters')
      .optional(),
    preferredLanguage: z.string().trim().min(2).max(10).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.travelStartDate && data.travelEndDate) {
      if (data.travelEndDate < data.travelStartDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['travelEndDate'],
          message: 'travelEndDate must be on or after travelStartDate',
        });
      }
    }
  });

export type CreateTripPlanInput = z.infer<typeof createTripPlanSchema>;
