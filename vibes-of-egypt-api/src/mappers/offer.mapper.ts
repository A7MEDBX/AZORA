import type { SpecialOfferDto } from '../types/catalog';
import type { SpecialOfferRow } from '../types/database';

export function mapSpecialOffer(row: SpecialOfferRow): SpecialOfferDto {
  return {
    id: row.id,
    offerSlug: row.slug,
    title: row.title,
    discount: row.discount_label,
    description: row.description,
    originalPrice: Number(row.original_price),
    discountedPrice: Number(row.discounted_price),
    validity: row.validity_label ?? '',
    image: row.image_url,
    category: row.category,
    badge: row.badge ?? '',
    slug: row.target_slug,
    targetType: row.target_type,
    ...(row.starts_at ? { startsAt: row.starts_at } : {}),
    ...(row.ends_at ? { endsAt: row.ends_at } : {}),
  };
}
