import { randomUUID } from 'node:crypto';
import type { UploadApiResponse } from 'cloudinary';
import { getCloudinary } from '../../config/cloudinary';
import { getSupabaseClient } from '../../config/supabase';
import { AppError } from '../../types/api';
import {
  CLOUDINARY_NAMESPACE,
  type UploadFolder,
} from '../../validators/admin/upload.admin.validator';

export interface UploadedImageDto {
  url: string;
  path: string;
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

function streamBufferToCloudinary(
  buffer: Buffer,
  folder: string,
  publicIdName: string
): Promise<UploadApiResponse> {
  const cloudinary = getCloudinary();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicIdName,
        resource_type: 'image',
        overwrite: false,
      },
      (err, result) => {
        if (err || !result) {
          reject(
            new AppError(
              `Cloudinary upload failed: ${err?.message ?? 'No upload response received'}`,
              500,
              'STORAGE_UPLOAD_ERROR'
            )
          );
          return;
        }
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });
}

async function recordMediaAsset(params: {
  publicId: string;
  secureUrl: string;
  folder: UploadFolder;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  uploadedBy?: string;
}): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from('media_assets').upsert(
      {
        public_id: params.publicId,
        secure_url: params.secureUrl,
        folder: params.folder,
        format: params.format ?? null,
        width: params.width ?? null,
        height: params.height ?? null,
        bytes: params.bytes ?? null,
        uploaded_by: params.uploadedBy ?? null,
      },
      { onConflict: 'public_id' }
    );

    // If 003_media_assets.sql hasn't been executed yet (PGRST205), don't fail the upload
    if (error && error.code !== 'PGRST205') {
      console.warn('[media_assets] Failed to record uploaded image metadata:', error.message);
    }
  } catch {
    // Non-fatal metadata logging fallback
  }
}

async function removeMediaAssetRecord(publicId: string): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    await supabase.from('media_assets').delete().eq('public_id', publicId);
  } catch {
    // Ignore if media_assets table has not been migrated yet
  }
}

export async function uploadImageToStorage(
  file: Express.Multer.File,
  folder: UploadFolder,
  uploadedBy?: string
): Promise<UploadedImageDto> {
  const targetFolder = `${CLOUDINARY_NAMESPACE}/${folder}`;
  const publicIdName = `${Date.now()}-${randomUUID()}`;

  const result = await streamBufferToCloudinary(file.buffer, targetFolder, publicIdName);

  await recordMediaAsset({
    publicId: result.public_id,
    secureUrl: result.secure_url,
    folder,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    uploadedBy,
  });

  return {
    url: result.secure_url,
    path: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  };
}

export async function deleteImageFromStorage(publicId: string): Promise<void> {
  const cloudinary = getCloudinary();
  const normalizedPublicId = publicId.startsWith(`${CLOUDINARY_NAMESPACE}/`)
    ? publicId
    : `${CLOUDINARY_NAMESPACE}/${publicId}`;

  try {
    await cloudinary.uploader.destroy(normalizedPublicId, {
      resource_type: 'image',
      invalidate: true,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown Cloudinary error';
    throw new AppError(
      `Failed to delete image from Cloudinary: ${message}`,
      500,
      'STORAGE_DELETE_ERROR'
    );
  }

  await removeMediaAssetRecord(normalizedPublicId);
}
