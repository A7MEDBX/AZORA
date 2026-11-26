import type { Request, Response } from 'express';
import * as cruiseAdminService from '../../services/admin/cruise.admin.service';
import * as destinationAdminService from '../../services/admin/destination.admin.service';
import * as experienceAdminService from '../../services/admin/experience.admin.service';
import * as journalAdminService from '../../services/admin/journal.admin.service';
import * as offerAdminService from '../../services/admin/offer.admin.service';
import * as packageAdminService from '../../services/admin/package.admin.service';
import * as tourAdminService from '../../services/admin/tour.admin.service';
import type { AdminListQuery, UuidParams } from '../../validators/admin/common.validator';
import type {
  CreateCruiseInput,
  UpdateCruiseInput,
} from '../../validators/admin/cruise.validator';
import type {
  CreateDestinationInput,
  UpdateDestinationInput,
} from '../../validators/admin/destination.validator';
import type {
  CreateExperienceInput,
  UpdateExperienceInput,
} from '../../validators/admin/experience.validator';
import type {
  CreateJournalInput,
  UpdateJournalInput,
} from '../../validators/admin/journal.validator';
import type { CreateOfferInput, UpdateOfferInput } from '../../validators/admin/offer.validator';
import type {
  CreatePackageInput,
  UpdatePackageInput,
} from '../../validators/admin/package.validator';
import type { CreateTourInput, UpdateTourInput } from '../../validators/admin/tour.validator';

function getQuery(res: Response): AdminListQuery {
  return ((res.locals.validated as { query?: AdminListQuery } | undefined)?.query ?? {});
}

function getId(req: Request, res: Response): string {
  const params = (res.locals.validated as { params?: UuidParams } | undefined)?.params;
  return params?.id ?? String(req.params.id ?? '');
}

function getBody<T>(req: Request, res: Response): T {
  const validatedBody = (res.locals.validated as { body?: T } | undefined)?.body;
  return (validatedBody ?? req.body) as T;
}

// Destinations
export async function listDestinations(_req: Request, res: Response): Promise<void> {
  const data = await destinationAdminService.listAdminDestinations(getQuery(res));
  res.status(200).json({ data, total: data.length });
}
export async function getDestination(req: Request, res: Response): Promise<void> {
  const data = await destinationAdminService.getAdminDestinationById(getId(req, res));
  res.status(200).json({ data });
}
export async function createDestination(req: Request, res: Response): Promise<void> {
  const data = await destinationAdminService.createAdminDestination(
    getBody<CreateDestinationInput>(req, res)
  );
  res.status(201).json({ data });
}
export async function updateDestination(req: Request, res: Response): Promise<void> {
  const data = await destinationAdminService.updateAdminDestination(
    getId(req, res),
    getBody<UpdateDestinationInput>(req, res)
  );
  res.status(200).json({ data });
}
export async function deleteDestination(req: Request, res: Response): Promise<void> {
  await destinationAdminService.deleteAdminDestination(getId(req, res));
  res.status(204).send();
}

// Tours
export async function listTours(_req: Request, res: Response): Promise<void> {
  const data = await tourAdminService.listAdminTours(getQuery(res));
  res.status(200).json({ data, total: data.length });
}
export async function getTour(req: Request, res: Response): Promise<void> {
  const data = await tourAdminService.getAdminTourById(getId(req, res));
  res.status(200).json({ data });
}
export async function createTour(req: Request, res: Response): Promise<void> {
  const data = await tourAdminService.createAdminTour(getBody<CreateTourInput>(req, res));
  res.status(201).json({ data });
}
export async function updateTour(req: Request, res: Response): Promise<void> {
  const data = await tourAdminService.updateAdminTour(
    getId(req, res),
    getBody<UpdateTourInput>(req, res)
  );
  res.status(200).json({ data });
}
export async function deleteTour(req: Request, res: Response): Promise<void> {
  await tourAdminService.deleteAdminTour(getId(req, res));
  res.status(204).send();
}

// Packages
export async function listPackages(_req: Request, res: Response): Promise<void> {
  const data = await packageAdminService.listAdminPackages(getQuery(res));
  res.status(200).json({ data, total: data.length });
}
export async function getPackage(req: Request, res: Response): Promise<void> {
  const data = await packageAdminService.getAdminPackageById(getId(req, res));
  res.status(200).json({ data });
}
export async function createPackage(req: Request, res: Response): Promise<void> {
  const data = await packageAdminService.createAdminPackage(getBody<CreatePackageInput>(req, res));
  res.status(201).json({ data });
}
export async function updatePackage(req: Request, res: Response): Promise<void> {
  const data = await packageAdminService.updateAdminPackage(
    getId(req, res),
    getBody<UpdatePackageInput>(req, res)
  );
  res.status(200).json({ data });
}
export async function deletePackage(req: Request, res: Response): Promise<void> {
  await packageAdminService.deleteAdminPackage(getId(req, res));
  res.status(204).send();
}

// Cruises
export async function listCruises(_req: Request, res: Response): Promise<void> {
  const data = await cruiseAdminService.listAdminCruises(getQuery(res));
  res.status(200).json({ data, total: data.length });
}
export async function getCruise(req: Request, res: Response): Promise<void> {
  const data = await cruiseAdminService.getAdminCruiseById(getId(req, res));
  res.status(200).json({ data });
}
export async function createCruise(req: Request, res: Response): Promise<void> {
  const data = await cruiseAdminService.createAdminCruise(getBody<CreateCruiseInput>(req, res));
  res.status(201).json({ data });
}
export async function updateCruise(req: Request, res: Response): Promise<void> {
  const data = await cruiseAdminService.updateAdminCruise(
    getId(req, res),
    getBody<UpdateCruiseInput>(req, res)
  );
  res.status(200).json({ data });
}
export async function deleteCruise(req: Request, res: Response): Promise<void> {
  await cruiseAdminService.deleteAdminCruise(getId(req, res));
  res.status(204).send();
}

// Experiences
export async function listExperiences(_req: Request, res: Response): Promise<void> {
  const data = await experienceAdminService.listAdminExperiences(getQuery(res));
  res.status(200).json({ data, total: data.length });
}
export async function getExperience(req: Request, res: Response): Promise<void> {
  const data = await experienceAdminService.getAdminExperienceById(getId(req, res));
  res.status(200).json({ data });
}
export async function createExperience(req: Request, res: Response): Promise<void> {
  const data = await experienceAdminService.createAdminExperience(
    getBody<CreateExperienceInput>(req, res)
  );
  res.status(201).json({ data });
}
export async function updateExperience(req: Request, res: Response): Promise<void> {
  const data = await experienceAdminService.updateAdminExperience(
    getId(req, res),
    getBody<UpdateExperienceInput>(req, res)
  );
  res.status(200).json({ data });
}
export async function deleteExperience(req: Request, res: Response): Promise<void> {
  await experienceAdminService.deleteAdminExperience(getId(req, res));
  res.status(204).send();
}

// Special Offers
export async function listOffers(_req: Request, res: Response): Promise<void> {
  const data = await offerAdminService.listAdminOffers(getQuery(res));
  res.status(200).json({ data, total: data.length });
}
export async function getOffer(req: Request, res: Response): Promise<void> {
  const data = await offerAdminService.getAdminOfferById(getId(req, res));
  res.status(200).json({ data });
}
export async function createOffer(req: Request, res: Response): Promise<void> {
  const data = await offerAdminService.createAdminOffer(getBody<CreateOfferInput>(req, res));
  res.status(201).json({ data });
}
export async function updateOffer(req: Request, res: Response): Promise<void> {
  const data = await offerAdminService.updateAdminOffer(
    getId(req, res),
    getBody<UpdateOfferInput>(req, res)
  );
  res.status(200).json({ data });
}
export async function deleteOffer(req: Request, res: Response): Promise<void> {
  await offerAdminService.deleteAdminOffer(getId(req, res));
  res.status(204).send();
}

// Journal
export async function listJournal(_req: Request, res: Response): Promise<void> {
  const data = await journalAdminService.listAdminJournalArticles(getQuery(res));
  res.status(200).json({ data, total: data.length });
}
export async function getJournal(req: Request, res: Response): Promise<void> {
  const data = await journalAdminService.getAdminJournalArticleById(getId(req, res));
  res.status(200).json({ data });
}
export async function createJournal(req: Request, res: Response): Promise<void> {
  const data = await journalAdminService.createAdminJournalArticle(
    getBody<CreateJournalInput>(req, res)
  );
  res.status(201).json({ data });
}
export async function updateJournal(req: Request, res: Response): Promise<void> {
  const data = await journalAdminService.updateAdminJournalArticle(
    getId(req, res),
    getBody<UpdateJournalInput>(req, res)
  );
  res.status(200).json({ data });
}
export async function deleteJournal(req: Request, res: Response): Promise<void> {
  await journalAdminService.deleteAdminJournalArticle(getId(req, res));
  res.status(204).send();
}
