import { z } from 'zod';

export const SEARCH_TYPES = [
  'all',
  'destination',
  'tour',
  'package',
  'cruise',
  'experience',
  'journal',
] as const;

export const searchQuerySchema = z.object({
  q: z
    .string({ required_error: 'Search query "q" is required' })
    .trim()
    .min(1, 'Search query "q" must be at least 1 character')
    .max(100, 'Search query "q" must be at most 100 characters'),
  type: z.enum(SEARCH_TYPES).default('all'),
});

export type SearchType = (typeof SEARCH_TYPES)[number];
export type SearchQuery = z.infer<typeof searchQuerySchema>;
