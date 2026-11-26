import type { Request, Response } from 'express';
import { searchCatalog } from '../services/search.service';
import type { SearchQuery } from '../validators/search.validator';

export async function handleSearch(_req: Request, res: Response): Promise<void> {
  const query = (res.locals.validated as { query: SearchQuery }).query;
  const payload = await searchCatalog(query);
  res.status(200).json(payload);
}
