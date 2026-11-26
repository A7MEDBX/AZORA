import { apiGet, USE_MOCK_DATA } from '@/api/client';
import {
  getArticles,
  getArticleBySlug,
  getCruises,
  getCruiseBySlug,
  getCruisesByType,
  getDestinations,
  getDestinationBySlug,
  getExperiences,
  getExperienceBySlug,
  getExperiencesByCategory,
  getPackages,
  getPackageBySlug,
  getPackagesByCategory,
  getSpecialOffers,
  getTours,
  getTourBySlug,
  getToursByCategory,
  getToursByDestination,
  getAboutData,
  searchCatalog as searchMockCatalog,
  type SearchResultItem,
} from '@/lib/catalog';
import type {
  Cruise,
  Destination,
  Experience,
  JournalArticle,
  PackageTour,
  Review,
  SpecialOffer,
  Tour,
} from '@/types';

interface ListResponse<T> {
  data: T[];
  total: number;
}

interface SingleResponse<T> {
  data: T;
}

interface DestinationDetailResponse extends Destination {
  tours?: Tour[];
}

interface SearchApiResponse {
  query: string;
  type: string;
  total: number;
  results: {
    destinations: Destination[];
    tours: Tour[];
    packages: PackageTour[];
    cruises: Cruise[];
    experiences: Experience[];
    journal: JournalArticle[];
  };
}

export async function fetchDestinations(): Promise<Destination[]> {
  if (USE_MOCK_DATA) return getDestinations();
  const res = await apiGet<ListResponse<Destination>>('/destinations');
  return res.data;
}

export async function fetchDestinationBySlug(
  slug: string
): Promise<{ destination: Destination; relatedTours: Tour[] } | null> {
  if (USE_MOCK_DATA) {
    const dest = getDestinationBySlug(slug);
    if (!dest) return null;
    return { destination: dest, relatedTours: getToursByDestination(dest.slug) };
  }

  try {
    const res = await apiGet<SingleResponse<DestinationDetailResponse>>(`/destinations/${slug}`);
    const { tours: relatedTours = [], ...destination } = res.data;
    return { destination, relatedTours };
  } catch {
    return null;
  }
}

export async function fetchTours(params?: {
  category?: string;
  destination?: string;
  featured?: boolean;
}): Promise<Tour[]> {
  if (USE_MOCK_DATA) {
    let list = getTours();
    if (params?.category && params.category !== 'all') {
      list = getToursByCategory(params.category);
    }
    if (params?.destination && params.destination !== 'all') {
      const destMatches = new Set(getToursByDestination(params.destination).map((t) => t.id));
      list = list.filter((t) => destMatches.has(t.id));
    }
    if (params?.featured !== undefined) {
      list = list.filter((t) => Boolean(t.featured) === params.featured);
    }
    return list;
  }

  const res = await apiGet<ListResponse<Tour>>('/tours', params);
  return res.data;
}

export async function fetchTourBySlug(slug: string): Promise<Tour | null> {
  if (USE_MOCK_DATA) return getTourBySlug(slug) ?? null;
  try {
    const res = await apiGet<SingleResponse<Tour>>(`/tours/${slug}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function fetchPackages(params?: {
  category?: string;
  featured?: boolean;
}): Promise<PackageTour[]> {
  if (USE_MOCK_DATA) {
    let list = params?.category ? getPackagesByCategory(params.category) : getPackages();
    if (params?.featured !== undefined) {
      list = list.filter((p) => Boolean(p.featured) === params.featured);
    }
    return list;
  }

  const res = await apiGet<ListResponse<PackageTour>>('/packages', params);
  return res.data;
}

export async function fetchPackageBySlug(slug: string): Promise<PackageTour | null> {
  if (USE_MOCK_DATA) return getPackageBySlug(slug) ?? null;
  try {
    const res = await apiGet<SingleResponse<PackageTour>>(`/packages/${slug}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function fetchCruises(params?: {
  type?: string;
  featured?: boolean;
}): Promise<Cruise[]> {
  if (USE_MOCK_DATA) {
    let list = params?.type ? getCruisesByType(params.type) : getCruises();
    if (params?.featured !== undefined) {
      list = list.filter((c) => Boolean(c.featured) === params.featured);
    }
    return list;
  }

  const res = await apiGet<ListResponse<Cruise>>('/cruises', params);
  return res.data;
}

export async function fetchCruiseBySlug(slug: string): Promise<Cruise | null> {
  if (USE_MOCK_DATA) return getCruiseBySlug(slug) ?? null;
  try {
    const res = await apiGet<SingleResponse<Cruise>>(`/cruises/${slug}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function fetchExperiences(params?: {
  category?: string;
  destination?: string;
  featured?: boolean;
}): Promise<Experience[]> {
  if (USE_MOCK_DATA) {
    let list = params?.category ? getExperiencesByCategory(params.category) : getExperiences();
    if (params?.featured !== undefined) {
      list = list.filter((e) => Boolean(e.featured) === params.featured);
    }
    return list;
  }

  const res = await apiGet<ListResponse<Experience>>('/experiences', params);
  return res.data;
}

export async function fetchExperienceBySlug(slug: string): Promise<Experience | null> {
  if (USE_MOCK_DATA) return getExperienceBySlug(slug) ?? null;
  try {
    const res = await apiGet<SingleResponse<Experience>>(`/experiences/${slug}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function fetchJournalArticles(params?: {
  category?: string;
}): Promise<JournalArticle[]> {
  if (USE_MOCK_DATA) return getArticles();
  const res = await apiGet<ListResponse<JournalArticle>>('/journal', params);
  return res.data;
}

export async function fetchJournalArticleBySlug(slug: string): Promise<JournalArticle | null> {
  if (USE_MOCK_DATA) return getArticleBySlug(slug) ?? null;
  try {
    const res = await apiGet<SingleResponse<JournalArticle>>(`/journal/${slug}`);
    return res.data;
  } catch {
    return null;
  }
}

export async function fetchSpecialOffers(): Promise<SpecialOffer[]> {
  if (USE_MOCK_DATA) return getSpecialOffers();
  const res = await apiGet<ListResponse<SpecialOffer>>('/special-offers');
  return res.data;
}

export async function fetchReviews(params?: {
  targetType?: string;
  targetId?: string;
}): Promise<Review[]> {
  if (USE_MOCK_DATA) return getAboutData().reviews;
  const res = await apiGet<ListResponse<Review>>('/reviews', params);
  return res.data;
}

export async function searchCatalogApi(
  query: string,
  type: 'all' | 'destination' | 'tour' | 'package' | 'cruise' | 'experience' | 'journal' = 'all'
): Promise<SearchResultItem[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (USE_MOCK_DATA) {
    return searchMockCatalog(trimmed);
  }

  const res = await apiGet<SearchApiResponse>('/search', { q: trimmed, type });
  const items: SearchResultItem[] = [];

  for (const d of res.results.destinations) {
    items.push({
      id: d.id,
      slug: d.slug,
      title: d.name,
      category: d.category,
      snippet: d.shortDescription || d.tagline,
      image: d.image,
      url: `/destinations/${d.slug}`,
      type: 'Destination',
    });
  }

  for (const t of res.results.tours) {
    items.push({
      id: t.id,
      slug: t.slug,
      title: t.title,
      category: t.category,
      snippet: t.subheadline || t.overview || t.description.slice(0, 120),
      image: t.image,
      url: `/tours/${t.slug}`,
      type: 'Tour',
    });
  }

  for (const p of res.results.packages) {
    items.push({
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      snippet: p.route,
      image: p.image,
      url: `/packages/${p.slug}`,
      type: 'Package',
    });
  }

  for (const c of res.results.cruises) {
    items.push({
      id: c.id,
      slug: c.slug,
      title: c.title,
      category: c.cruiseType,
      snippet: `${c.route} • ${c.duration}`,
      image: c.image,
      url: `/nile-cruises/${c.slug}`,
      type: 'Cruise',
    });
  }

  for (const e of res.results.experiences) {
    items.push({
      id: e.id,
      slug: e.slug,
      title: e.title,
      category: e.category,
      snippet: `${e.location} • ${e.duration}`,
      image: e.image,
      url: `/experiences/${e.slug}`,
      type: 'Experience',
    });
  }

  for (const a of res.results.journal) {
    items.push({
      id: a.id,
      slug: a.slug,
      title: a.title,
      category: a.category,
      snippet: a.excerpt,
      image: a.image,
      url: `/journal/${a.slug}`,
      type: 'Article',
    });
  }

  return items;
}
