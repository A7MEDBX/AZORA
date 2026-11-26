import type { Request, Response } from 'express';
import * as inquiryAdminService from '../../services/admin/inquiry.admin.service';
import * as reviewAdminService from '../../services/admin/review.admin.service';
import { getAdminStats } from '../../services/admin/stats.admin.service';
import * as tripPlanAdminService from '../../services/admin/tripPlan.admin.service';
import * as uploadAdminService from '../../services/admin/upload.admin.service';
import { AppError } from '../../types/api';
import type { UuidParams } from '../../validators/admin/common.validator';
import type {
  AdminInquiriesQuery,
  UpdateInquiryStatusInput,
} from '../../validators/admin/inquiry.admin.validator';
import type {
  AdminReviewsQuery,
  CreateAdminReviewInput,
  UpdateAdminReviewInput,
} from '../../validators/admin/review.admin.validator';
import type {
  AdminTripPlansQuery,
  UpdateTripPlanStatusInput,
} from '../../validators/admin/tripPlan.admin.validator';
import {
  uploadFolderSchema,
  type DeleteUploadInput,
} from '../../validators/admin/upload.admin.validator';

function getId(req: Request, res: Response): string {
  const params = (res.locals.validated as { params?: UuidParams } | undefined)?.params;
  return params?.id ?? String(req.params.id ?? '');
}

function getQuery<T>(res: Response): T {
  return ((res.locals.validated as { query?: T } | undefined)?.query ?? {}) as T;
}

function getBody<T>(req: Request, res: Response): T {
  const validatedBody = (res.locals.validated as { body?: T } | undefined)?.body;
  return (validatedBody ?? req.body) as T;
}

// Admin Profile & Stats
export async function getAdminMe(req: Request, res: Response): Promise<void> {
  res.status(200).json({ data: req.adminUser });
}

export async function getStats(_req: Request, res: Response): Promise<void> {
  const data = await getAdminStats();
  res.status(200).json({ data });
}

// Inquiries
export async function listInquiries(_req: Request, res: Response): Promise<void> {
  const data = await inquiryAdminService.listAdminInquiries(getQuery<AdminInquiriesQuery>(res));
  res.status(200).json({ data, total: data.length });
}

export async function getInquiry(req: Request, res: Response): Promise<void> {
  const data = await inquiryAdminService.getAdminInquiryById(getId(req, res));
  res.status(200).json({ data });
}

export async function updateInquiry(req: Request, res: Response): Promise<void> {
  const data = await inquiryAdminService.updateAdminInquiryStatus(
    getId(req, res),
    getBody<UpdateInquiryStatusInput>(req, res)
  );
  res.status(200).json({ data });
}

export async function deleteInquiry(req: Request, res: Response): Promise<void> {
  await inquiryAdminService.deleteAdminInquiry(getId(req, res));
  res.status(204).send();
}

// Trip Plans
export async function listTripPlans(_req: Request, res: Response): Promise<void> {
  const data = await tripPlanAdminService.listAdminTripPlans(getQuery<AdminTripPlansQuery>(res));
  res.status(200).json({ data, total: data.length });
}

export async function getTripPlan(req: Request, res: Response): Promise<void> {
  const data = await tripPlanAdminService.getAdminTripPlanById(getId(req, res));
  res.status(200).json({ data });
}

export async function updateTripPlan(req: Request, res: Response): Promise<void> {
  const data = await tripPlanAdminService.updateAdminTripPlanStatus(
    getId(req, res),
    getBody<UpdateTripPlanStatusInput>(req, res)
  );
  res.status(200).json({ data });
}

export async function deleteTripPlan(req: Request, res: Response): Promise<void> {
  await tripPlanAdminService.deleteAdminTripPlan(getId(req, res));
  res.status(204).send();
}

// Reviews Moderation
export async function listReviews(_req: Request, res: Response): Promise<void> {
  const data = await reviewAdminService.listAdminReviews(getQuery<AdminReviewsQuery>(res));
  res.status(200).json({ data, total: data.length });
}

export async function createReview(req: Request, res: Response): Promise<void> {
  const data = await reviewAdminService.createAdminReview(
    getBody<CreateAdminReviewInput>(req, res)
  );
  res.status(201).json({ data });
}

export async function updateReview(req: Request, res: Response): Promise<void> {
  const data = await reviewAdminService.updateAdminReview(
    getId(req, res),
    getBody<UpdateAdminReviewInput>(req, res)
  );
  res.status(200).json({ data });
}

export async function deleteReview(req: Request, res: Response): Promise<void> {
  await reviewAdminService.deleteAdminReview(getId(req, res));
  res.status(204).send();
}

// Image Uploads (Supabase Storage)
export async function uploadImage(req: Request, res: Response): Promise<void> {
  if (!req.file) {
    throw new AppError(
      'Missing image file. Provide a multipart/form-data field named "image".',
      400,
      'MISSING_FILE'
    );
  }

  const rawFolder =
    (typeof req.query.folder === 'string' && req.query.folder.trim()) ||
    (typeof (req.body as { folder?: unknown })?.folder === 'string' &&
      String((req.body as { folder?: string }).folder).trim()) ||
    undefined;

  const folder = uploadFolderSchema.parse(rawFolder);
  const data = await uploadAdminService.uploadImageToStorage(req.file, folder);

  res.status(201).json({ data });
}

export async function deleteImage(req: Request, res: Response): Promise<void> {
  const { path } = getBody<DeleteUploadInput>(req, res);
  await uploadAdminService.deleteImageFromStorage(path);
  res.status(200).json({ success: true });
}
