import { Router, type Request, type Response } from 'express';
import type { ZodSchema } from 'zod';
import * as adminController from '../../controllers/admin/catalog.admin.controller';
import { requireAdmin } from '../../middleware/requireAdmin';
import { validate } from '../../middleware/validate';
import { asyncHandler } from '../../utils/asyncHandler';
import {
  adminListQuerySchema,
  uuidParamSchema,
} from '../../validators/admin/common.validator';
import {
  createCruiseSchema,
  updateCruiseSchema,
} from '../../validators/admin/cruise.validator';
import {
  createDestinationSchema,
  updateDestinationSchema,
} from '../../validators/admin/destination.validator';
import {
  createExperienceSchema,
  updateExperienceSchema,
} from '../../validators/admin/experience.validator';
import {
  createJournalSchema,
  updateJournalSchema,
} from '../../validators/admin/journal.validator';
import { createOfferSchema, updateOfferSchema } from '../../validators/admin/offer.validator';
import {
  createPackageSchema,
  updatePackageSchema,
} from '../../validators/admin/package.validator';
import { createTourSchema, updateTourSchema } from '../../validators/admin/tour.validator';

interface CrudHandlers {
  list: (req: Request, res: Response) => Promise<void>;
  get: (req: Request, res: Response) => Promise<void>;
  create: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
  remove: (req: Request, res: Response) => Promise<void>;
  createSchema: ZodSchema;
  updateSchema: ZodSchema;
}

function buildCrudRouter(handlers: CrudHandlers): Router {
  const r = Router();

  r.get('/', validate({ query: adminListQuerySchema }), asyncHandler(handlers.list));
  r.get('/:id', validate({ params: uuidParamSchema }), asyncHandler(handlers.get));
  r.post('/', validate({ body: handlers.createSchema }), asyncHandler(handlers.create));
  r.patch(
    '/:id',
    validate({ params: uuidParamSchema, body: handlers.updateSchema }),
    asyncHandler(handlers.update)
  );
  r.delete('/:id', validate({ params: uuidParamSchema }), asyncHandler(handlers.remove));

  return r;
}

const adminRouter = Router();

// Enforce Supabase JWT + app_metadata.role === 'admin' on every /api/admin/* route
adminRouter.use(requireAdmin);

adminRouter.use(
  '/destinations',
  buildCrudRouter({
    list: adminController.listDestinations,
    get: adminController.getDestination,
    create: adminController.createDestination,
    update: adminController.updateDestination,
    remove: adminController.deleteDestination,
    createSchema: createDestinationSchema,
    updateSchema: updateDestinationSchema,
  })
);

adminRouter.use(
  '/tours',
  buildCrudRouter({
    list: adminController.listTours,
    get: adminController.getTour,
    create: adminController.createTour,
    update: adminController.updateTour,
    remove: adminController.deleteTour,
    createSchema: createTourSchema,
    updateSchema: updateTourSchema,
  })
);

adminRouter.use(
  '/packages',
  buildCrudRouter({
    list: adminController.listPackages,
    get: adminController.getPackage,
    create: adminController.createPackage,
    update: adminController.updatePackage,
    remove: adminController.deletePackage,
    createSchema: createPackageSchema,
    updateSchema: updatePackageSchema,
  })
);

adminRouter.use(
  '/cruises',
  buildCrudRouter({
    list: adminController.listCruises,
    get: adminController.getCruise,
    create: adminController.createCruise,
    update: adminController.updateCruise,
    remove: adminController.deleteCruise,
    createSchema: createCruiseSchema,
    updateSchema: updateCruiseSchema,
  })
);

adminRouter.use(
  '/experiences',
  buildCrudRouter({
    list: adminController.listExperiences,
    get: adminController.getExperience,
    create: adminController.createExperience,
    update: adminController.updateExperience,
    remove: adminController.deleteExperience,
    createSchema: createExperienceSchema,
    updateSchema: updateExperienceSchema,
  })
);

adminRouter.use(
  '/special-offers',
  buildCrudRouter({
    list: adminController.listOffers,
    get: adminController.getOffer,
    create: adminController.createOffer,
    update: adminController.updateOffer,
    remove: adminController.deleteOffer,
    createSchema: createOfferSchema,
    updateSchema: updateOfferSchema,
  })
);

adminRouter.use(
  '/journal',
  buildCrudRouter({
    list: adminController.listJournal,
    get: adminController.getJournal,
    create: adminController.createJournal,
    update: adminController.updateJournal,
    remove: adminController.deleteJournal,
    createSchema: createJournalSchema,
    updateSchema: updateJournalSchema,
  })
);

export default adminRouter;
