import { v2 as cloudinary } from 'cloudinary';
import { AppError } from '../types/api';
import { env } from './env';

let isConfigured = false;

if (env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  isConfigured = true;
}

export function getCloudinary() {
  if (!isConfigured) {
    throw new AppError(
      'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in vibes-of-egypt-api/.env.',
      500,
      'STORAGE_NOT_CONFIGURED'
    );
  }
  return cloudinary;
}
