import { randomUUID } from 'node:crypto';
import { getSupabaseClient } from '../../config/supabase';
import { AppError } from '../../types/api';
import type { UploadFolder } from '../../validators/admin/upload.admin.validator';

export const MEDIA_BUCKET = 'vibes-of-egypt-media';

const MIME_TO_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};

export interface UploadedImageDto {
  url: string;
  path: string;
}

async function ensurePublicMediaBucket(): Promise<void> {
  const supabase = getSupabaseClient();
  const { data: bucket, error: getError } = await supabase.storage.getBucket(MEDIA_BUCKET);

  if (bucket) {
    return;
  }

  // Create bucket as public if it does not exist yet
  const isNotFound =
    getError &&
    (/not found/i.test(getError.message) ||
      ('statusCode' in getError && String((getError as { statusCode?: unknown }).statusCode) === '404'));

  if (!isNotFound && getError) {
    throw new AppError(
      `Failed to check storage bucket "${MEDIA_BUCKET}": ${getError.message}`,
      500,
      'STORAGE_ERROR'
    );
  }

  const { error: createError } = await supabase.storage.createBucket(MEDIA_BUCKET, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedMimeTypes: Object.keys(MIME_TO_EXT),
  });

  if (createError && !/already exists/i.test(createError.message)) {
    throw new AppError(
      `Failed to create storage bucket "${MEDIA_BUCKET}": ${createError.message}`,
      500,
      'STORAGE_ERROR'
    );
  }
}

export async function uploadImageToStorage(
  file: Express.Multer.File,
  folder: UploadFolder
): Promise<UploadedImageDto> {
  const ext = MIME_TO_EXT[file.mimetype];
  if (!ext) {
    throw new AppError(
      `Unsupported image MIME type "${file.mimetype}".`,
      400,
      'INVALID_FILE_TYPE'
    );
  }

  await ensurePublicMediaBucket();

  const objectPath = `${folder}/${Date.now()}-${randomUUID()}.${ext}`;
  const supabase = getSupabaseClient();

  const { error: uploadError } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(objectPath, file.buffer, {
      contentType: file.mimetype,
      cacheControl: '31536000',
      upsert: false,
    });

  if (uploadError) {
    throw new AppError(
      `Failed to upload image to storage: ${uploadError.message}`,
      500,
      'STORAGE_UPLOAD_ERROR'
    );
  }

  const { data: publicUrlData } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(objectPath);

  return {
    url: publicUrlData.publicUrl,
    path: objectPath,
  };
}

export async function deleteImageFromStorage(objectPath: string): Promise<void> {
  const supabase = getSupabaseClient();

  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([objectPath]);
  if (error) {
    throw new AppError(
      `Failed to delete image from storage: ${error.message}`,
      500,
      'STORAGE_DELETE_ERROR'
    );
  }
}
