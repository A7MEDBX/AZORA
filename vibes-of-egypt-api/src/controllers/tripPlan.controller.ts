import type { Request, Response } from 'express';
import { createTripPlan } from '../services/tripPlan.service';
import type { CreateTripPlanInput } from '../validators/tripPlan.validator';

export async function handleCreateTripPlan(_req: Request, res: Response): Promise<void> {
  const body = (res.locals.validated as { body: CreateTripPlanInput }).body;
  const confirmation = await createTripPlan(body);
  res.status(201).json({ data: confirmation });
}
