import { z } from 'zod';

export const ADMIN_STATUSES = ['draft', 'published', 'archived'] as const;
export type AdminStatus = (typeof ADMIN_STATUSES)[number];

export const uuidParamSchema = z.object({
  id: z.string().trim().uuid('Invalid UUID parameter'),
});

export const adminListQuerySchema = z.object({
  status: z.enum(['all', ...ADMIN_STATUSES]).optional(),
});

export const slugSchema = z
  .string()
  .trim()
  .min(2, 'Slug must be at least 2 characters')
  .max(150, 'Slug must be at most 150 characters')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase kebab-case');

export const optionalUrlOrPathSchema = z
  .string()
  .trim()
  .min(1)
  .max(2048)
  .optional()
  .nullable();

export const stringArraySchema = z.array(z.string().trim().min(1)).default([]);

export type UuidParams = z.infer<typeof uuidParamSchema>;
export type AdminListQuery = z.infer<typeof adminListQuerySchema>;

export function resolveIsPublished(input: {
  status?: AdminStatus;
  isPublished?: boolean;
}): boolean | undefined {
  if (input.status !== undefined) {
    return input.status === 'published';
  }
  return input.isPublished;
}
