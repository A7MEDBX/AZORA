import { getSupabaseClient } from '../config/supabase';
import seedData from './seed-data.json';

interface RawDestination {
  slug: string;
  name: string;
  arabicName?: string;
  tagline: string;
  category: string;
  image: string;
  heroImage: string;
  startingPrice: number;
  shortDescription?: string;
  description: string;
  highlights: string[];
  gallery: string[];
  bestTimeToVisit?: string;
  practicalInfo?: Record<string, unknown>;
  featured?: boolean;
}

interface RawTour {
  slug: string;
  title: string;
  subheadline?: string;
  category: string;
  city?: string;
  destinationSlug?: string;
  duration: string;
  price: number;
  rating: number;
  reviewsCount?: number;
  badge?: string;
  image: string;
  images?: string[];
  overview?: string;
  description: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: unknown[];
  inquiryInfo?: string;
  featured?: boolean;
}

interface RawPackage {
  slug: string;
  title: string;
  category?: string;
  duration: string;
  durationDays: number;
  durationNights: number;
  price: number;
  rating: number;
  reviewsCount?: number;
  badge?: string;
  image: string;
  images?: string[];
  route: string;
  hotels?: string;
  destinationsCovered?: string[];
  overview?: string;
  description: string;
  highlights: string[];
  dailyItinerary: {
    day: number;
    title: string;
    desc: string;
    meals?: string;
    accommodation?: string;
  }[];
  accommodation?: string;
  inclusions: string[];
  exclusions: string[];
  featured?: boolean;
}

interface RawCruise {
  slug: string;
  title: string;
  profileName?: string;
  profileTitle?: string;
  cruiseType: string;
  vesselType: string;
  route: string;
  capacity: string;
  duration: string;
  durationNights: number;
  price: number;
  rating: number;
  reviewsCount?: number;
  badge?: string;
  image: string;
  images?: string[];
  lead?: string;
  description: string;
  highlights: string[];
  cabins?: string;
  amenities: string[];
  shipInfo: Record<string, unknown>;
  itinerary: unknown[];
  featured?: boolean;
}

interface RawExperience {
  slug: string;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: number;
  rating?: number;
  reviewsCount?: number;
  image: string;
  gallery: string[];
  badge?: string;
  description: string;
  highlights: string[];
  practicalInfo: Record<string, unknown>;
  inquiryCta?: string;
  featured?: boolean;
}

interface RawArticle {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  content: string[];
  tags?: string[];
}

interface RawOffer {
  id: string;
  title: string;
  discount: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  validity: string;
  image: string;
  category: string;
  badge: string;
  slug: string;
  targetType: 'tour' | 'package' | 'cruise' | 'experience';
}

interface RawReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  location: string;
  text: string;
  tourOrCruiseName: string;
  avatar?: string;
}

const DESTINATION_ALIAS_MAP: Record<string, string> = {
  cairo: 'cairo-giza',
  giza: 'cairo-giza',
  'cairo & giza': 'cairo-giza',
  luxor: 'luxor',
  aswan: 'aswan',
  'abu simbel': 'abu-simbel',
  alexandria: 'alexandria',
  hurghada: 'hurghada',
  'sharm el sheikh': 'sharm-el-sheikh',
  dahab: 'dahab',
  'marsa alam': 'marsa-alam',
  'siwa oasis': 'siwa-oasis',
  siwa: 'siwa-oasis',
  'white desert': 'white-desert',
  'black desert': 'black-desert',
  fayoum: 'fayoum',
  'fayoum oasis': 'fayoum',
  edfu: 'edfu',
  'kom ombo': 'kom-ombo',
  'saint catherine': 'saint-catherine',
  'wadi el natrun': 'wadi-el-natrun',
  nuweiba: 'nuweiba',
  'ain sokhna': 'ain-sokhna',
};

const EXPERIENCE_DESTINATION_SLUG_MAP: Record<string, string> = {
  'hot-air-balloon': 'luxor',
  'desert-safari': 'white-desert',
  'felucca-sailing': 'aswan',
  'red-sea-diving': 'hurghada',
  'nubian-village': 'aswan',
  'egyptian-food-tour': 'cairo-giza',
};

const REVIEW_TARGET_MAP: Record<
  string,
  { entity_type: 'tour' | 'package' | 'cruise' | 'experience' | 'general'; entity_slug: string }
> = {
  'review-1': { entity_type: 'package', entity_slug: 'luxury-pharaohs-dahabiya-10-days' },
  'review-2': { entity_type: 'package', entity_slug: 'classic-egypt-wonders-8-days' },
  'review-3': { entity_type: 'experience', entity_slug: 'desert-safari' },
};

function parseMonthYearToIsoDate(label: string): string {
  const parsed = new Date(`1 ${label} UTC`);
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return parsed.toISOString().slice(0, 10);
}

function resolveDestinationSlugFromText(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [alias, slug] of Object.entries(DESTINATION_ALIAS_MAP)) {
    if (lower.includes(alias)) {
      return slug;
    }
  }
  return null;
}

async function seed(): Promise<void> {
  const supabase = getSupabaseClient();
  console.log('[seed] Starting idempotent Vibes of Egypt database seed...');

  // 1. Seed Destinations (19)
  const rawDestinations = seedData.destinations as RawDestination[];
  const destinationRecords = rawDestinations.map((d, index) => ({
    slug: d.slug,
    name: d.name,
    arabic_name: d.arabicName ?? null,
    tagline: d.tagline,
    category: d.category,
    image_url: d.image,
    hero_image_url: d.heroImage,
    starting_price: d.startingPrice,
    short_description: d.shortDescription ?? null,
    description: d.description,
    highlights: d.highlights ?? [],
    gallery: d.gallery ?? [],
    best_time_to_visit: d.bestTimeToVisit ?? null,
    practical_info: d.practicalInfo ?? {},
    is_featured: Boolean(d.featured),
    is_published: true,
    sort_order: index + 1,
  }));

  const { data: upsertedDestinations, error: destError } = await supabase
    .from('destinations')
    .upsert(destinationRecords, { onConflict: 'slug' })
    .select('id, slug');

  if (destError) {
    throw new Error(`Failed seeding destinations: ${destError.message}`);
  }

  const destinationIdBySlug = new Map<string, string>();
  for (const row of upsertedDestinations ?? []) {
    destinationIdBySlug.set(row.slug as string, row.id as string);
  }
  console.log(`[seed] Upserted ${destinationIdBySlug.size} destinations`);

  // 2. Seed Tours (8)
  const rawTours = seedData.tours as RawTour[];
  const tourRecords = rawTours.map((t, index) => {
    const destSlug = t.destinationSlug ?? 'cairo-giza';
    const destinationId = destinationIdBySlug.get(destSlug);
    if (!destinationId) {
      throw new Error(`Tour "${t.slug}" references unknown destination slug "${destSlug}"`);
    }

    return {
      destination_id: destinationId,
      slug: t.slug,
      title: t.title,
      subheadline: t.subheadline ?? null,
      category: t.category,
      city: t.city ?? null,
      duration: t.duration,
      price: t.price,
      rating: t.rating,
      reviews_count: t.reviewsCount ?? 0,
      badge: t.badge ?? null,
      image_url: t.image,
      gallery: t.images ?? [],
      overview: t.overview ?? null,
      description: t.description,
      highlights: t.highlights ?? [],
      included: t.included ?? [],
      excluded: t.excluded ?? [],
      itinerary: t.itinerary ?? [],
      inquiry_info: t.inquiryInfo ?? null,
      is_featured: Boolean(t.featured),
      is_published: true,
      sort_order: index + 1,
    };
  });

  const { data: upsertedTours, error: tourError } = await supabase
    .from('tours')
    .upsert(tourRecords, { onConflict: 'slug' })
    .select('id, slug');

  if (tourError) {
    throw new Error(`Failed seeding tours: ${tourError.message}`);
  }

  const tourSlugs = new Set((upsertedTours ?? []).map((r) => r.slug as string));
  console.log(`[seed] Upserted ${tourSlugs.size} tours`);

  // 3. Seed Packages (3) + package_destinations + package_itinerary_days
  const rawPackages = seedData.packages as RawPackage[];
  const packageRecords = rawPackages.map((p, index) => ({
    slug: p.slug,
    title: p.title,
    category: p.category ?? null,
    duration: p.duration,
    duration_days: p.durationDays,
    duration_nights: p.durationNights,
    price: p.price,
    rating: p.rating,
    reviews_count: p.reviewsCount ?? 0,
    badge: p.badge ?? null,
    image_url: p.image,
    gallery: p.images ?? [],
    route: p.route,
    hotels: p.hotels ?? null,
    overview: p.overview ?? null,
    description: p.description,
    highlights: p.highlights ?? [],
    accommodation: p.accommodation ?? null,
    inclusions: p.inclusions ?? [],
    exclusions: p.exclusions ?? [],
    is_featured: Boolean(p.featured),
    is_published: true,
    sort_order: index + 1,
  }));

  const { data: upsertedPackages, error: pkgError } = await supabase
    .from('packages')
    .upsert(packageRecords, { onConflict: 'slug' })
    .select('id, slug');

  if (pkgError) {
    throw new Error(`Failed seeding packages: ${pkgError.message}`);
  }

  const packageIdBySlug = new Map<string, string>();
  for (const row of upsertedPackages ?? []) {
    packageIdBySlug.set(row.slug as string, row.id as string);
  }
  console.log(`[seed] Upserted ${packageIdBySlug.size} packages`);

  const packageDestinationLinks: {
    package_id: string;
    destination_id: string;
    sort_order: number;
  }[] = [];

  const itineraryDayRecords: {
    package_id: string;
    destination_id: string | null;
    day_number: number;
    title: string;
    description: string;
    meals: string | null;
    accommodation: string | null;
  }[] = [];

  for (const pkg of rawPackages) {
    const packageId = packageIdBySlug.get(pkg.slug);
    if (!packageId) continue;

    const seenDestIds = new Set<string>();
    let destOrder = 1;
    for (const label of pkg.destinationsCovered ?? []) {
      const slug = DESTINATION_ALIAS_MAP[label.trim().toLowerCase()];
      const destId = slug ? destinationIdBySlug.get(slug) : undefined;
      if (destId && !seenDestIds.has(destId)) {
        seenDestIds.add(destId);
        packageDestinationLinks.push({
          package_id: packageId,
          destination_id: destId,
          sort_order: destOrder++,
        });
      }
    }

    for (const day of pkg.dailyItinerary ?? []) {
      const matchedSlug = resolveDestinationSlugFromText(`${day.title} ${day.desc}`);
      const dayDestId = matchedSlug ? (destinationIdBySlug.get(matchedSlug) ?? null) : null;
      itineraryDayRecords.push({
        package_id: packageId,
        destination_id: dayDestId,
        day_number: day.day,
        title: day.title,
        description: day.desc,
        meals: day.meals ?? null,
        accommodation: day.accommodation ?? null,
      });
    }
  }

  if (packageDestinationLinks.length > 0) {
    const { error: pdError } = await supabase
      .from('package_destinations')
      .upsert(packageDestinationLinks, { onConflict: 'package_id,destination_id' });
    if (pdError) {
      throw new Error(`Failed seeding package_destinations: ${pdError.message}`);
    }
  }
  console.log(`[seed] Upserted ${packageDestinationLinks.length} package_destinations links`);

  if (itineraryDayRecords.length > 0) {
    const { error: pidError } = await supabase
      .from('package_itinerary_days')
      .upsert(itineraryDayRecords, { onConflict: 'package_id,day_number' });
    if (pidError) {
      throw new Error(`Failed seeding package_itinerary_days: ${pidError.message}`);
    }
  }
  console.log(`[seed] Upserted ${itineraryDayRecords.length} package_itinerary_days`);

  // 4. Seed Cruises (3)
  const rawCruises = seedData.cruises as RawCruise[];
  const cruiseRecords = rawCruises.map((c, index) => ({
    slug: c.slug,
    title: c.title,
    profile_name: c.profileName ?? null,
    profile_title: c.profileTitle ?? null,
    cruise_type: c.cruiseType,
    vessel_type: c.vesselType,
    route: c.route,
    capacity: c.capacity,
    duration: c.duration,
    duration_nights: c.durationNights,
    price: c.price,
    rating: c.rating,
    reviews_count: c.reviewsCount ?? 0,
    badge: c.badge ?? null,
    image_url: c.image,
    gallery: c.images ?? [],
    lead: c.lead ?? null,
    description: c.description,
    highlights: c.highlights ?? [],
    cabins: c.cabins ?? null,
    amenities: c.amenities ?? [],
    ship_info: c.shipInfo ?? {},
    itinerary: c.itinerary ?? [],
    is_featured: Boolean(c.featured),
    is_published: true,
    sort_order: index + 1,
  }));

  const { data: upsertedCruises, error: cruiseError } = await supabase
    .from('cruises')
    .upsert(cruiseRecords, { onConflict: 'slug' })
    .select('id, slug');

  if (cruiseError) {
    throw new Error(`Failed seeding cruises: ${cruiseError.message}`);
  }

  const cruiseSlugs = new Set((upsertedCruises ?? []).map((r) => r.slug as string));
  console.log(`[seed] Upserted ${cruiseSlugs.size} cruises`);

  // 5. Seed Experiences (6)
  const rawExperiences = seedData.experiences as RawExperience[];
  const experienceRecords = rawExperiences.map((e, index) => {
    const mappedSlug =
      EXPERIENCE_DESTINATION_SLUG_MAP[e.slug] ?? resolveDestinationSlugFromText(e.location);
    const destinationId = mappedSlug ? (destinationIdBySlug.get(mappedSlug) ?? null) : null;

    return {
      destination_id: destinationId,
      slug: e.slug,
      title: e.title,
      location: e.location,
      category: e.category,
      duration: e.duration,
      price: e.price,
      rating: e.rating ?? 5,
      reviews_count: e.reviewsCount ?? 0,
      badge: e.badge ?? null,
      image_url: e.image,
      gallery: e.gallery ?? [],
      description: e.description,
      highlights: e.highlights ?? [],
      practical_info: e.practicalInfo ?? {},
      inquiry_cta: e.inquiryCta ?? null,
      is_featured: Boolean(e.featured),
      is_published: true,
      sort_order: index + 1,
    };
  });

  const { data: upsertedExperiences, error: expError } = await supabase
    .from('experiences')
    .upsert(experienceRecords, { onConflict: 'slug' })
    .select('id, slug');

  if (expError) {
    throw new Error(`Failed seeding experiences: ${expError.message}`);
  }

  const experienceSlugs = new Set((upsertedExperiences ?? []).map((r) => r.slug as string));
  console.log(`[seed] Upserted ${experienceSlugs.size} experiences`);

  // 6. Seed Journal Articles (3)
  const rawArticles = seedData.articles as RawArticle[];
  const articleRecords = rawArticles.map((a, index) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    image_url: a.image,
    category: a.category,
    read_time: a.readTime,
    published_date: parseMonthYearToIsoDate(a.date),
    author_name: a.author,
    author_role: a.authorRole ?? null,
    author_avatar_url: a.authorAvatar ?? null,
    content: a.content ?? [],
    tags: a.tags ?? [],
    is_featured: index === 0,
    is_published: true,
  }));

  const { error: articleError } = await supabase
    .from('journal_articles')
    .upsert(articleRecords, { onConflict: 'slug' });

  if (articleError) {
    throw new Error(`Failed seeding journal_articles: ${articleError.message}`);
  }
  console.log(`[seed] Upserted ${articleRecords.length} journal articles`);

  // 7. Seed Special Offers (3) with polymorphic target validation
  const rawOffers = seedData.specialOffers as RawOffer[];
  const validTargetLookup: Record<RawOffer['targetType'], Set<string>> = {
    tour: tourSlugs,
    package: new Set(packageIdBySlug.keys()),
    cruise: cruiseSlugs,
    experience: experienceSlugs,
  };

  const offerRecords = rawOffers.map((o, index) => {
    const targetSet = validTargetLookup[o.targetType];
    if (!targetSet.has(o.slug)) {
      throw new Error(
        `Special offer "${o.id}" references missing ${o.targetType} slug "${o.slug}"`
      );
    }

    return {
      slug: o.id,
      title: o.title,
      discount_label: o.discount,
      description: o.description,
      original_price: o.originalPrice,
      discounted_price: o.discountedPrice,
      validity_label: o.validity,
      image_url: o.image,
      category: o.category,
      badge: o.badge,
      target_type: o.targetType,
      target_slug: o.slug,
      starts_at: null,
      ends_at: null,
      is_active: true,
      sort_order: index + 1,
    };
  });

  const { error: offerError } = await supabase
    .from('special_offers')
    .upsert(offerRecords, { onConflict: 'slug' });

  if (offerError) {
    throw new Error(`Failed seeding special_offers: ${offerError.message}`);
  }
  console.log(`[seed] Upserted ${offerRecords.length} special offers`);

  // 8. Seed Approved Reviews (3) idempotently without duplicating existing records
  const rawReviews = seedData.reviews as RawReview[];
  const { data: existingReviews, error: fetchReviewsError } = await supabase
    .from('reviews')
    .select('author_name, entity_title');

  if (fetchReviewsError) {
    throw new Error(`Failed reading existing reviews: ${fetchReviewsError.message}`);
  }

  const existingReviewKeys = new Set(
    (existingReviews ?? []).map(
      (r) => `${String(r.author_name).toLowerCase()}::${String(r.entity_title).toLowerCase()}`
    )
  );

  const newReviews = rawReviews
    .filter(
      (r) =>
        !existingReviewKeys.has(`${r.author.toLowerCase()}::${r.tourOrCruiseName.toLowerCase()}`)
    )
    .map((r) => {
      const target = REVIEW_TARGET_MAP[r.id];
      return {
        author_name: r.author,
        author_location: r.location,
        author_avatar_url: r.avatar ?? null,
        rating: r.rating,
        review_date: parseMonthYearToIsoDate(r.date),
        comment: r.text,
        entity_type: target?.entity_type ?? 'general',
        entity_slug: target?.entity_slug ?? null,
        entity_title: r.tourOrCruiseName,
        is_approved: true,
        is_featured: true,
      };
    });

  if (newReviews.length > 0) {
    const { error: insertReviewsError } = await supabase.from('reviews').insert(newReviews);
    if (insertReviewsError) {
      throw new Error(`Failed seeding reviews: ${insertReviewsError.message}`);
    }
  }
  console.log(
    `[seed] Reviews complete (${newReviews.length} inserted, ${rawReviews.length - newReviews.length} already existed)`
  );

  console.log('[seed] All catalog data seeded successfully!');
}

seed().catch((err) => {
  console.error('[seed] Fatal error:', err);
  process.exit(1);
});
