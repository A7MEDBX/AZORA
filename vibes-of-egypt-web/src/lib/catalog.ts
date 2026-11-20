import { destinations as staticDestinations } from '@/data/destinations';
import { tours as staticTours } from '@/data/tours';
import { packages as staticPackages } from '@/data/packages';
import { cruises as staticCruises } from '@/data/cruises';
import { experiences as staticExperiences } from '@/data/experiences';
import { articles as staticArticles } from '@/data/journal';
import { faqs as staticFaqs } from '@/data/faq';
import { specialOffers as staticOffers } from '@/data/offers';
import { teamMembers, reviews, companyValues } from '@/data/about';

import type {
  Destination,
  Tour,
  PackageTour,
  Cruise,
  Experience,
  JournalArticle,
  FaqItem,
  SpecialOffer,
  TeamMember,
  Review
} from '@/types';

// Backwards-compatible aliases
export type Article = JournalArticle;
export type Package = PackageTour;

// Re-export arrays for direct list consumption
export const destinations: Destination[] = staticDestinations;
export const tours: Tour[] = staticTours;
export const packages: PackageTour[] = staticPackages;
export const cruises: Cruise[] = staticCruises;
export const experiences: Experience[] = staticExperiences;
export const articles: JournalArticle[] = staticArticles;
export const faqs: FaqItem[] = staticFaqs;
export const specialOffers: SpecialOffer[] = staticOffers;

/* =========================================================================
   DESTINATIONS API HELPERS
   ========================================================================= */

export const getDestinations = (): Destination[] => {
  return destinations;
};

export const getDestinationBySlug = (slug?: string): Destination | undefined => {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return (
    destinations.find(d => d.slug.toLowerCase() === normalized || d.id.toLowerCase() === normalized) ||
    destinations.find(d => {
      const dSlug = d.slug.toLowerCase();
      const dName = d.name.toLowerCase();
      return dSlug.includes(normalized) || normalized.includes(dSlug) || dName.includes(normalized);
    })
  );
};

export const getDestinationById = (id?: string): Destination => {
  const match = getDestinationBySlug(id);
  return match || destinations[0];
};

/* =========================================================================
   TOURS API HELPERS
   ========================================================================= */

export const getTours = (): Tour[] => {
  return tours;
};

export const getTourBySlug = (slug?: string): Tour | undefined => {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return (
    tours.find(t => t.slug.toLowerCase() === normalized || t.id.toLowerCase() === normalized) ||
    tours.find(t => {
      const tId = t.id.toLowerCase();
      const tTitle = t.title.toLowerCase();
      return tId.includes(normalized) || normalized.includes(tId) || tTitle.includes(normalized);
    })
  );
};

export const getTourById = (id?: string): Tour => {
  const match = getTourBySlug(id);
  return match || tours[0];
};

export const getToursByCategory = (category: string): Tour[] => {
  if (!category || category === 'all') return tours;
  const norm = category.toLowerCase();
  return tours.filter(t => t.category.toLowerCase().includes(norm));
};

export const getToursByDestination = (destinationSlug: string): Tour[] => {
  if (!destinationSlug || destinationSlug === 'all') return tours;
  const norm = destinationSlug.toLowerCase();
  return tours.filter(t => {
    const destSlug = (t.destinationSlug || '').toLowerCase();
    const city = (t.city || '').toLowerCase();
    const destName = (t.destinationName || '').toLowerCase();
    return destSlug === norm || city.includes(norm) || norm.includes(city) || destName.includes(norm);
  });
};

/* =========================================================================
   PACKAGES API HELPERS
   ========================================================================= */

export const getPackages = (): PackageTour[] => {
  return packages;
};

export const getPackageBySlug = (slug?: string): PackageTour | undefined => {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return (
    packages.find(p => p.slug.toLowerCase() === normalized || p.id.toLowerCase() === normalized) ||
    packages.find(p => {
      const pId = p.id.toLowerCase();
      const pTitle = p.title.toLowerCase();
      return pId.includes(normalized) || normalized.includes(pId) || pTitle.includes(normalized);
    })
  );
};

export const getPackageById = (id?: string): PackageTour => {
  const match = getPackageBySlug(id);
  return match || packages[0];
};

export const getPackagesByCategory = (category: string): PackageTour[] => {
  if (!category || category === 'all') return packages;
  const norm = category.toLowerCase();
  return packages.filter(p => p.category.toLowerCase().includes(norm));
};

/* =========================================================================
   CRUISES API HELPERS
   ========================================================================= */

export const getCruises = (): Cruise[] => {
  return cruises;
};

export const getCruiseBySlug = (slug?: string): Cruise | undefined => {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return (
    cruises.find(c => c.slug.toLowerCase() === normalized || c.id.toLowerCase() === normalized) ||
    cruises.find(c => {
      const cId = c.id.toLowerCase();
      const cTitle = c.title.toLowerCase();
      return cId.includes(normalized) || normalized.includes(cId) || cTitle.includes(normalized);
    })
  );
};

export const getCruiseById = (id?: string): Cruise => {
  const match = getCruiseBySlug(id);
  return match || cruises[0];
};

export const getCruisesByType = (type: string): Cruise[] => {
  if (!type || type === 'all') return cruises;
  const norm = type.toLowerCase();
  return cruises.filter(
    c =>
      c.cruiseType.toLowerCase().includes(norm) ||
      c.vesselType.toLowerCase().includes(norm) ||
      (c.type && c.type.toLowerCase().includes(norm))
  );
};

/* =========================================================================
   EXPERIENCES API HELPERS
   ========================================================================= */

export const getExperiences = (): Experience[] => {
  return experiences;
};

export const getExperienceBySlug = (slug?: string): Experience | undefined => {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return (
    experiences.find(e => e.slug.toLowerCase() === normalized || e.id.toLowerCase() === normalized) ||
    experiences.find(e => {
      const eId = e.id.toLowerCase();
      const eTitle = e.title.toLowerCase();
      return eId.includes(normalized) || normalized.includes(eId) || eTitle.includes(normalized);
    })
  );
};

export const getExperienceById = (id?: string): Experience => {
  const match = getExperienceBySlug(id);
  return match || experiences[0];
};

export const getExperiencesByCategory = (category: string): Experience[] => {
  if (!category || category === 'all') return experiences;
  const norm = category.toLowerCase();
  return experiences.filter(e => e.category.toLowerCase().includes(norm));
};

/* =========================================================================
   JOURNAL / ARTICLE API HELPERS
   ========================================================================= */

export const getArticles = (): JournalArticle[] => {
  return articles;
};

export const getArticleBySlug = (slug?: string): JournalArticle | undefined => {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return (
    articles.find(a => a.slug.toLowerCase() === normalized || a.id.toLowerCase() === normalized) ||
    articles.find(a => {
      const aId = a.id.toLowerCase();
      const aTitle = a.title.toLowerCase();
      return aId.includes(normalized) || normalized.includes(aId) || aTitle.includes(normalized);
    })
  );
};

export const getArticleById = (id?: string): JournalArticle => {
  const match = getArticleBySlug(id);
  return match || articles[0];
};

/* =========================================================================
   FAQ & SPECIAL OFFERS & ABOUT HELPERS
   ========================================================================= */

export const getFaqs = (category?: string): FaqItem[] => {
  if (!category || category === 'all') return faqs;
  const norm = category.toLowerCase();
  return faqs.filter(f => f.category.toLowerCase().includes(norm));
};

export const getSpecialOffers = (): SpecialOffer[] => {
  return specialOffers;
};

export const getAboutData = (): {
  team: TeamMember[];
  reviews: Review[];
  values: { title: string; description: string }[];
} => {
  return {
    team: teamMembers,
    reviews,
    values: companyValues
  };
};

/* =========================================================================
   CATALOG UNIVERSAL SEARCH
   ========================================================================= */

export interface SearchResultItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  snippet: string;
  image: string;
  url: string;
  type: 'Destination' | 'Tour' | 'Package' | 'Cruise' | 'Experience' | 'Article';
}

export const searchCatalog = (query: string): SearchResultItem[] => {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();
  const results: SearchResultItem[] = [];

  // Search Destinations
  destinations.forEach(d => {
    if (
      d.name.toLowerCase().includes(q) ||
      d.tagline.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.highlights.some(h => h.toLowerCase().includes(q))
    ) {
      results.push({
        id: d.id,
        slug: d.slug,
        title: d.name,
        category: d.category,
        snippet: d.shortDescription || d.tagline,
        image: d.image,
        url: `/destinations/${d.slug}`,
        type: 'Destination'
      });
    }
  });

  // Search Tours
  tours.forEach(t => {
    if (
      t.title.toLowerCase().includes(q) ||
      (t.subheadline && t.subheadline.toLowerCase().includes(q)) ||
      t.description.toLowerCase().includes(q) ||
      t.highlights.some(h => h.toLowerCase().includes(q))
    ) {
      results.push({
        id: t.id,
        slug: t.slug,
        title: t.title,
        category: t.category,
        snippet: t.subheadline || t.overview || t.description.slice(0, 120),
        image: t.image,
        url: `/tours/${t.slug}`,
        type: 'Tour'
      });
    }
  });

  // Search Packages
  packages.forEach(p => {
    if (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.route.toLowerCase().includes(q)
    ) {
      results.push({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        snippet: p.route,
        image: p.image,
        url: `/packages/${p.slug}`,
        type: 'Package'
      });
    }
  });

  // Search Cruises
  cruises.forEach(c => {
    if (
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.route.toLowerCase().includes(q)
    ) {
      results.push({
        id: c.id,
        slug: c.slug,
        title: c.title,
        category: c.cruiseType,
        snippet: `${c.route} • ${c.duration}`,
        image: c.image,
        url: `/nile-cruises/${c.slug}`,
        type: 'Cruise'
      });
    }
  });

  // Search Experiences
  experiences.forEach(e => {
    if (
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q)
    ) {
      results.push({
        id: e.id,
        slug: e.slug,
        title: e.title,
        category: e.category,
        snippet: `${e.location} • ${e.duration}`,
        image: e.image,
        url: `/experiences/${e.slug}`,
        type: 'Experience'
      });
    }
  });

  // Search Articles
  articles.forEach(a => {
    if (
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.content.some(paragraph => paragraph.toLowerCase().includes(q))
    ) {
      results.push({
        id: a.id,
        slug: a.slug,
        title: a.title,
        category: a.category,
        snippet: a.excerpt,
        image: a.image,
        url: `/journal/${a.slug}`,
        type: 'Article'
      });
    }
  });

  return results;
};
