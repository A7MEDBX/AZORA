import type { NextFunction, Request, Response } from 'express';
import multer, { MulterError } from 'multer';
import { AppError } from '../types/api';

export const ALLOWED_IMAGE_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
]);

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_IMAGE_BYTES,
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_IMAGE_MIMES.has(file.mimetype)) {
      cb(
        new AppError(
          `Unsupported file type "${file.mimetype}". Allowed types: image/jpeg, image/png, image/webp, image/avif.`,
          400,
          'INVALID_FILE_TYPE'
        )
      );
      return;
    }
    cb(null, true);
  },
});

/**
 * Express middleware handling single `image` multipart upload with clean 400 error mapping.
 */
export function uploadSingleImage(req: Request, res: Response, next: NextFunction): void {
  uploader.single('image')(req, res, (err: unknown) => {
    if (!err) {
      next();
      return;
    }

    if (err instanceof AppError) {
      next(err);
      return;
    }

    if (err instanceof MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        next(new AppError('Image file size exceeds the 5 MB limit.', 400, 'FILE_TOO_LARGE'));
        return;
      }
      next(new AppError(`File upload error: ${err.message}`, 400, 'UPLOAD_ERROR'));
      return;
    }

    next(err);
  });
}
