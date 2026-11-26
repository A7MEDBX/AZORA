export interface DestinationRow {
  id: string;
  slug: string;
  name: string;
  arabic_name: string | null;
  tagline: string;
  category: string;
  image_url: string;
  hero_image_url: string;
  starting_price: number | string;
  short_description: string | null;
  description: string;
  highlights: string[] | null;
  gallery: string[] | null;
  best_time_to_visit: string | null;
  practical_info: Record<string, unknown> | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DestinationSummaryRow {
  id: string;
  slug: string;
  name: string;
  category?: string;
  image_url?: string;
  is_published?: boolean;
}

export interface TourRow {
  id: string;
  destination_id: string;
  slug: string;
  title: string;
  subheadline: string | null;
  category: string;
  city: string | null;
  duration: string;
  price: number | string;
  rating: number | string;
  reviews_count: number;
  badge: string | null;
  image_url: string;
  gallery: string[] | null;
  overview: string | null;
  description: string;
  highlights: string[] | null;
  included: string[] | null;
  excluded: string[] | null;
  itinerary: unknown[] | null;
  inquiry_info: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  destination?: DestinationSummaryRow | DestinationSummaryRow[] | null;
}

export interface PackageDestinationJoinRow {
  sort_order: number;
  destination: DestinationSummaryRow | DestinationSummaryRow[] | null;
}

export interface PackageItineraryDayRow {
  id: string;
  package_id: string;
  destination_id: string | null;
  day_number: number;
  title: string;
  description: string;
  meals: string | null;
  accommodation: string | null;
  created_at: string;
  destination?: DestinationSummaryRow | DestinationSummaryRow[] | null;
}

export interface PackageRow {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  duration: string;
  duration_days: number;
  duration_nights: number;
  price: number | string;
  rating: number | string;
  reviews_count: number;
  badge: string | null;
  image_url: string;
  gallery: string[] | null;
  route: string;
  hotels: string | null;
  overview: string | null;
  description: string;
  highlights: string[] | null;
  accommodation: string | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  package_destinations?: PackageDestinationJoinRow[] | null;
  package_itinerary_days?: PackageItineraryDayRow[] | null;
}

export interface CruiseRow {
  id: string;
  slug: string;
  title: string;
  profile_name: string | null;
  profile_title: string | null;
  cruise_type: string;
  vessel_type: string;
  route: string;
  capacity: string;
  duration: string;
  duration_nights: number;
  price: number | string;
  rating: number | string;
  reviews_count: number;
  badge: string | null;
  image_url: string;
  gallery: string[] | null;
  lead: string | null;
  description: string;
  highlights: string[] | null;
  cabins: string | null;
  amenities: string[] | null;
  ship_info: Record<string, unknown> | null;
  itinerary: unknown[] | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ExperienceRow {
  id: string;
  destination_id: string | null;
  slug: string;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: number | string;
  rating: number | string;
  reviews_count: number;
  badge: string | null;
  image_url: string;
  gallery: string[] | null;
  description: string;
  highlights: string[] | null;
  practical_info: Record<string, unknown> | null;
  inquiry_cta: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  destination?: DestinationSummaryRow | DestinationSummaryRow[] | null;
}

export interface JournalArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string;
  category: string;
  read_time: string;
  published_date: string;
  author_name: string;
  author_role: string | null;
  author_avatar_url: string | null;
  content: unknown[] | null;
  tags: string[] | null;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SpecialOfferRow {
  id: string;
  slug: string;
  title: string;
  discount_label: string;
  description: string;
  original_price: number | string;
  discounted_price: number | string;
  validity_label: string | null;
  image_url: string;
  category: string;
  badge: string | null;
  target_type: 'tour' | 'package' | 'cruise' | 'experience';
  target_slug: string;
  starts_at: string | null;
  ends_at: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewRow {
  id: string;
  author_name: string;
  author_location: string | null;
  author_avatar_url: string | null;
  rating: number;
  review_date: string;
  comment: string;
  entity_type: 'tour' | 'package' | 'cruise' | 'experience' | 'general' | null;
  entity_slug: string | null;
  entity_title: string;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}
