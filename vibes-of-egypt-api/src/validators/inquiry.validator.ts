import { z } from 'zod';

export const POLYMORPHIC_TARGET_TYPES = [
  'destination',
  'tour',
  'package',
  'cruise',
  'experience',
] as const;

export type PolymorphicTargetType = (typeof POLYMORPHIC_TARGET_TYPES)[number];

const phoneSchema = z
  .string()
  .trim()
  .min(6, 'Phone number must be at least 6 characters')
  .max(30, 'Phone number must be at most 30 characters')
  .regex(/^[+\d\s().-]+$/, 'Phone number contains invalid characters')
  .optional()
  .or(z.literal('').transform(() => undefined));

const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine((val) => !Number.isNaN(Date.parse(val)), 'Invalid calendar date')
  .optional();

export const createInquirySchema = z
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
    country: z
      .string()
      .trim()
      .max(100, 'Country must be at most 100 characters')
      .optional(),
    subject: z
      .string()
      .trim()
      .max(200, 'Subject must be at most 200 characters')
      .optional(),
    message: z
      .string({ required_error: 'Message is required' })
      .trim()
      .min(10, 'Message must be at least 10 characters')
      .max(3000, 'Message must be at most 3000 characters'),
    inquiryType: z
      .string()
      .trim()
      .max(50, 'Inquiry type must be at most 50 characters')
      .optional(),
    targetType: z.enum(POLYMORPHIC_TARGET_TYPES).optional(),
    targetId: z.string().trim().uuid('targetId must be a valid UUID').optional(),
    preferredTravelDate: isoDateSchema,
    travelersCount: z.coerce.number().int().min(1).max(100).optional(),
    preferredLanguage: z.string().trim().min(2).max(10).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    const hasType = data.targetType !== undefined;
    const hasId = data.targetId !== undefined;

    if (hasType !== hasId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: hasType ? ['targetId'] : ['targetType'],
        message: 'Both targetType and targetId must be provided together',
      });
    }
  });

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
