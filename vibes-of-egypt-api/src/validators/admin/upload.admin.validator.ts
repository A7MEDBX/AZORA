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

export const deleteUploadSchema = z
  .object({
    path: z
      .string({ required_error: 'Image path is required' })
      .trim()
      .min(3, 'Invalid storage path')
      .max(500, 'Storage path is too long')
      .refine((val) => !val.includes('..') && !val.startsWith('/') && !val.includes('\\'), {
        message: 'Invalid storage path (path traversal is not allowed)',
      })
      .refine(
        (val) => {
          const [folder, ...rest] = val.split('/');
          return (
            rest.length === 1 &&
            rest[0].length > 0 &&
            (ALLOWED_UPLOAD_FOLDERS as readonly string[]).includes(folder)
          );
        },
        {
          message: `Path must be in the format "<folder>/<filename>" where folder is one of: ${ALLOWED_UPLOAD_FOLDERS.join(', ')}`,
        }
      ),
  })
  .strict();

export type DeleteUploadInput = z.infer<typeof deleteUploadSchema>;
