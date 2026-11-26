import { z } from 'zod';

export const ALLOWED_UPLOAD_FOLDERS = [
  'destinations',
  'tours',
  'packages',
  'cruises',
  'experiences',
  'journal',
  'offers',
  'general',
] as const;

export type UploadFolder = (typeof ALLOWED_UPLOAD_FOLDERS)[number];

export const uploadFolderSchema = z.enum(ALLOWED_UPLOAD_FOLDERS).default('general');

export const CLOUDINARY_NAMESPACE = 'vibes-of-egypt';

export const deleteUploadSchema = z
  .object({
    path: z
      .string({ required_error: 'Image public_id / path is required' })
      .trim()
      .min(3, 'Invalid image public_id')
      .max(500, 'Image public_id is too long')
      .refine((val) => !val.includes('..') && !val.startsWith('/') && !val.includes('\\'), {
        message: 'Invalid image path (path traversal is not allowed)',
      })
      .refine(
        (val) => {
          const parts = val.split('/');
          // Accept either "vibes-of-egypt/<folder>/<asset>" or "<folder>/<asset>"
          if (parts.length === 3 && parts[0] === CLOUDINARY_NAMESPACE) {
            return (
              (ALLOWED_UPLOAD_FOLDERS as readonly string[]).includes(parts[1]) &&
              parts[2].length > 0
            );
          }
          if (parts.length === 2) {
            return (
              (ALLOWED_UPLOAD_FOLDERS as readonly string[]).includes(parts[0]) &&
              parts[1].length > 0
            );
          }
          return false;
        },
        {
          message: `Path must be in format "vibes-of-egypt/<folder>/<name>" where folder is one of: ${ALLOWED_UPLOAD_FOLDERS.join(', ')}`,
        }
      ),
  })
  .strict();

export type DeleteUploadInput = z.infer<typeof deleteUploadSchema>;
