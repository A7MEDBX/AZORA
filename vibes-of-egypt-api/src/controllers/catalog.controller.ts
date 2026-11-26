import type { Request, Response } from 'express';
import * as cruiseService from '../services/cruise.service';
import * as destinationService from '../services/destination.service';
import * as experienceService from '../services/experience.service';
import * as journalService from '../services/journal.service';
import * as offerService from '../services/offer.service';
import * as packageService from '../services/package.service';
import * as reviewService from '../services/review.service';
import * as tourService from '../services/tour.service';
import type {
  CruisesQuery,
  ExperiencesQuery,
  JournalQuery,
  PackagesQuery,
  ReviewsQuery,
  SlugParams,
  ToursQuery,
} from '../validators/catalog.validator';

function getValidatedQuery<T>(res: Response): T {
  return ((res.locals.validated as { query?: T } | undefined)?.query ?? {}) as T;
}

function getValidatedSlug(req: Request, res: Response): string {
  const params = (res.locals.validated as { params?: SlugParams } | undefined)?.params;
  return params?.slug ?? String(req.params.slug ?? '');
}

export async function getDestinations(_req: Request, res: Response): Promise<void> {
  const data = await destinationService.listDestinations();
  res.status(200).json({ data, total: data.length });
}

export async function getDestinationBySlug(req: Request, res: Response): Promise<void> {
  const slug = getValidatedSlug(req, res);
  const data = await destinationService.getDestinationBySlug(slug);
  res.status(200).json({ data });
}

export async function getTours(_req: Request, res: Response): Promise<void> {
  const query = getValidatedQuery<ToursQuery>(res);
  const data = await tourService.listTours(query);
  res.status(200).json({ data, total: data.length });
}

export async function getTourBySlug(req: Request, res: Response): Promise<void> {
  const slug = getValidatedSlug(req, res);
  const data = await tourService.getTourBySlug(slug);
  res.status(200).json({ data });
}

export async function getPackages(_req: Request, res: Response): Promise<void> {
  const query = getValidatedQuery<PackagesQuery>(res);
  const data = await packageService.listPackages(query);
  res.status(200).json({ data, total: data.length });
}

export async function getPackageBySlug(req: Request, res: Response): Promise<void> {
  const slug = getValidatedSlug(req, res);
  const data = await packageService.getPackageBySlug(slug);
  res.status(200).json({ data });
}

export async function getCruises(_req: Request, res: Response): Promise<void> {
  const query = getValidatedQuery<CruisesQuery>(res);
  const data = await cruiseService.listCruises(query);
  res.status(200).json({ data, total: data.length });
}

export async function getCruiseBySlug(req: Request, res: Response): Promise<void> {
  const slug = getValidatedSlug(req, res);
  const data = await cruiseService.getCruiseBySlug(slug);
  res.status(200).json({ data });
}

export async function getExperiences(_req: Request, res: Response): Promise<void> {
  const query = getValidatedQuery<ExperiencesQuery>(res);
  const data = await experienceService.listExperiences(query);
  res.status(200).json({ data, total: data.length });
}

export async function getExperienceBySlug(req: Request, res: Response): Promise<void> {
  const slug = getValidatedSlug(req, res);
  const data = await experienceService.getExperienceBySlug(slug);
  res.status(200).json({ data });
}

export async function getJournalArticles(_req: Request, res: Response): Promise<void> {
  const query = getValidatedQuery<JournalQuery>(res);
  const data = await journalService.listJournalArticles(query);
  res.status(200).json({ data, total: data.length });
}

export async function getJournalArticleBySlug(req: Request, res: Response): Promise<void> {
  const slug = getValidatedSlug(req, res);
  const data = await journalService.getJournalArticleBySlug(slug);
  res.status(200).json({ data });
}

export async function getSpecialOffers(_req: Request, res: Response): Promise<void> {
  const data = await offerService.listActiveSpecialOffers();
  res.status(200).json({ data, total: data.length });
}

export async function getReviews(_req: Request, res: Response): Promise<void> {
  const query = getValidatedQuery<ReviewsQuery>(res);
  const data = await reviewService.listApprovedReviews(query);
  res.status(200).json({ data, total: data.length });
}
