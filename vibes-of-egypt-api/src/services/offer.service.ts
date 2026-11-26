import { getSupabaseClient } from '../config/supabase';
import { mapSpecialOffer } from '../mappers/offer.mapper';
import { AppError } from '../types/api';
import type { SpecialOfferDto } from '../types/catalog';
import type { SpecialOfferRow } from '../types/database';

export async function listActiveSpecialOffers(): Promise<SpecialOfferDto[]> {
  const supabase = getSupabaseClient();
  const nowMs = Date.now();

  const { data, error } = await supabase
    .from('special_offers')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) {
    throw new AppError(`Failed to fetch special offers: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  const activeRows = ((data ?? []) as SpecialOfferRow[]).filter((offer) => {
    if (offer.starts_at && new Date(offer.starts_at).getTime() > nowMs) {
      return false;
    }
    if (offer.ends_at && new Date(offer.ends_at).getTime() <= nowMs) {
      return false;
    }
    return true;
  });

  return activeRows.map(mapSpecialOffer);
}
