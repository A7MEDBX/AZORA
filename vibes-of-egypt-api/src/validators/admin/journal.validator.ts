import { z } from 'zod';
import { ADMIN_STATUSES, slugSchema } from './common.validator';

const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'publishedAt must be YYYY-MM-DD')
  .optional()
  .nullable();

export const createJournalSchema = z
  .object({
    slug: slugSchema,
    title: z.string().trim().min(2).max(250),
    excerpt: z.string().trim().min(10).max(600),
    image: z.string().trim().min(1).max(2048),
    category: z.string().trim().min(2).max(100),
    readTime: z.string().trim().min(1).max(60),
    publishedAt: isoDateSchema,
    author: z.string().trim().min(2).max(120),
    authorRole: z.string().trim().max(120).optional().nullable(),
    authorAvatar: z.string().trim().max(2048).optional().nullable(),
    content: z.array(z.string().trim().min(1)).min(1, 'At least one content paragraph is required'),
    tags: z.array(z.string().trim().min(1)).default([]),
    featured: z.boolean().default(false),
    status: z.enum(ADMIN_STATUSES).optional(),
    isPublished: z.boolean().optional(),
  })
  .strict();

export const updateJournalSchema = createJournalSchema.partial().strict();

export type CreateJournalInput = z.infer<typeof createJournalSchema>;
export type UpdateJournalInput = z.infer<typeof updateJournalSchema>;
