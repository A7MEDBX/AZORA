import type { Request, Response } from 'express';
import { createInquiry } from '../services/inquiry.service';
import type { CreateInquiryInput } from '../validators/inquiry.validator';

export async function handleCreateInquiry(_req: Request, res: Response): Promise<void> {
  const body = (res.locals.validated as { body: CreateInquiryInput }).body;
  const confirmation = await createInquiry(body);
  res.status(201).json({ data: confirmation });
}
