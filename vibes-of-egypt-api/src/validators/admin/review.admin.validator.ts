import { z } from 'zod';
import { POLYMORPHIC_TARGET_TYPES } from '../inquiry.validator';

const booleanQueryParam = z
  .enum(['true', 'false'])
  .transform((v) => v === 'true')
  .optional();

export const adminReviewsQuerySchema = z.object({
  approved: booleanQueryParam,
  targetType: z.enum(['tour', 'package', 'cruise', 'experience', 'general']).optional(),
});

export const createAdminReviewSchema = z
  .object({
    reviewerName: z.string().trim().min(2).max(120),
    reviewerCountry: z.string().trim().max(120).optional().nullable(),
    reviewerAvatar: z.string().trim().max(2048).optional().nullable(),
    rating: z.coerce.number().int().min(1).max(5),
    title: z.string().trim().min(2).max(200),
    content: z.string().trim().min(5).max(3000),
    targetType: z.enum(POLYMORPHIC_TARGET_TYPES).optional(),
    targetId: z.string().trim().uuid('targetId must be a valid UUID').optional(),
    isApproved: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
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

export const updateAdminReviewSchema = z
  .object({
    reviewerName: z.string().trim().min(2).max(120).optional(),
    reviewerCountry: z.string().trim().max(120).optional().nullable(),
    reviewerAvatar: z.string().trim().max(2048).optional().nullable(),
    rating: z.coerce.number().int().min(1).max(5).optional(),
    title: z.string().trim().min(2).max(200).optional(),
    content: z.string().trim().min(5).max(3000).optional(),
    isApproved: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
  })
  .strict();

export type AdminReviewsQuery = z.infer<typeof adminReviewsQuerySchema>;
export type CreateAdminReviewInput = z.infer<typeof createAdminReviewSchema>;
export type UpdateAdminReviewInput = z.infer<typeof updateAdminReviewSchema>;
