import { z } from 'zod';
import { ADMIN_STATUSES, slugSchema } from './common.validator';

const OFFER_TARGET_TYPES = ['tour', 'package', 'cruise', 'experience'] as const;

const isoDateTimeSchema = z
  .string()
  .trim()
  .refine((val) => !Number.isNaN(Date.parse(val)), 'Must be a valid ISO date/timestamp')
  .optional()
  .nullable();

const baseOfferFields = z.object({
  slug: slugSchema,
  title: z.string().trim().min(2).max(200),
  discount: z.string().trim().min(1).max(80),
  description: z.string().trim().min(10),
  originalPrice: z.coerce.number().min(0),
  discountedPrice: z.coerce.number().min(0),
  validity: z.string().trim().max(200).optional().nullable(),
  image: z.string().trim().min(1).max(2048),
  category: z.string().trim().min(2).max(100),
  badge: z.string().trim().max(80).optional().nullable(),
  targetType: z.enum(OFFER_TARGET_TYPES),
  targetId: z.string().trim().uuid('targetId must be a valid UUID'),
  startsAt: isoDateTimeSchema,
  endsAt: isoDateTimeSchema,
  isActive: z.boolean().optional(),
  status: z.enum(ADMIN_STATUSES).optional(),
  displayOrder: z.coerce.number().int().min(0).default(0),
});

function validateOfferConstraints(
  data: {
    originalPrice?: number;
    discountedPrice?: number;
    startsAt?: string | null;
    endsAt?: string | null;
  },
  ctx: z.RefinementCtx
): void {
  if (
    data.originalPrice !== undefined &&
    data.discountedPrice !== undefined &&
    data.discountedPrice > data.originalPrice
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ['discountedPrice'],
      message: 'discountedPrice cannot exceed originalPrice',
    });
  }

  if (data.startsAt && data.endsAt) {
    if (Date.parse(data.endsAt) <= Date.parse(data.startsAt)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['endsAt'],
        message: 'endsAt must be strictly after startsAt',
      });
    }
  }
}

export const createOfferSchema = baseOfferFields.strict().superRefine(validateOfferConstraints);

export const updateOfferSchema = baseOfferFields
  .partial()
  .strict()
  .superRefine((data, ctx) => {
    validateOfferConstraints(data, ctx);
    const hasType = data.targetType !== undefined;
    const hasId = data.targetId !== undefined;
    if (hasType !== hasId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: hasType ? ['targetId'] : ['targetType'],
        message: 'targetType and targetId must be provided together when updating the offer target',
      });
    }
  });

export type CreateOfferInput = z.infer<typeof createOfferSchema>;
export type UpdateOfferInput = z.infer<typeof updateOfferSchema>;
