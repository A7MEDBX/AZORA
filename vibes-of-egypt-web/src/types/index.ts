export interface Destination {
  id: string;
  name: string;
  arabicName?: string;
  tagline: string;
  category: string;
  image: string;
  heroImage?: string;
  tourCount: number;
  startingPrice: number;
  description: string;
  highlights: string[];
  bestTimeToVisit: string;
  featured?: boolean;
}

export interface Tour {
  id: string;
  title: string;
  slug?: string;
  destinationId: string;
  destinationName: string;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  badge?: string;
  overview: string;
  highlights: string[];
  included: string[];
  excluded?: string[];
  itinerary?: { title: string; desc: string }[];
  featured?: boolean;
}

export interface PackageTour {
  id: string;
  title: string;
  durationDays: number;
  durationNights: number;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  destinationsCovered: string[];
  overview: string;
  highlights: string[];
  itinerary: { day: number; title: string; desc: string; meals?: string }[];
  featured?: boolean;
}

export interface Cruise {
  id: string;
  title: string;
  vesselType: 'Luxury Nile Cruise' | 'Historic Steamship' | 'Private Dahabiya';
  route: string;
  durationNights: number;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  description: string;
  highlights: string[];
  cabins?: string;
  amenities: string[];
  itinerary: { day: number; port: string; activity: string }[];
  featured?: boolean;
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  badge?: string;
  featured?: boolean;
}

export type SupportedLanguage = 'en' | 'de' | 'fr' | 'es' | 'ja' | 'ru';
