export type SupportedLanguage = 'en' | 'de' | 'fr' | 'es' | 'ja' | 'ru';

export interface PracticalInfo {
  bestSeason?: string;
  currency?: string;
  climate?: string;
  airport?: string;
  recommendedStay?: string;
  localTips?: string[];
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  arabicName?: string;
  tagline: string;
  category: string;
  image: string;
  heroImage: string;
  tourCount: number;
  startingPrice: number;
  shortDescription?: string;
  description: string;
  highlights: string[];
  gallery: string[];
  bestTimeToVisit: string;
  practicalInfo?: PracticalInfo;
  featured?: boolean;
}

export interface TourItineraryDay {
  day?: number;
  title: string;
  desc: string;
  duration?: string;
  activity?: string;
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  subheadline?: string;
  category: string;
  city?: string;
  destinationSlug?: string;
  destinationName?: string;
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
  inclusions?: string[];
  itinerary: TourItineraryDay[];
  inquiryInfo?: string;
  featured?: boolean;
}

export interface PackageItineraryDay {
  day: number;
  title: string;
  desc: string;
  meals?: string;
  accommodation?: string;
}

export interface PackageTour {
  id: string;
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  durationNights: number;
  category: string;
  price: number;
  rating: number;
  reviewsCount?: number;
  badge?: string;
  image: string;
  images?: string[];
  route: string;
  hotels: string;
  destinationsCovered: string[];
  destinations?: string[];
  overview?: string;
  description: string;
  highlights: string[];
  dailyItinerary: PackageItineraryDay[];
  itinerary?: PackageItineraryDay[];
  accommodation: string;
  inclusions: string[];
  exclusions: string[];
  featured?: boolean;
}

export type Package = PackageTour;

export interface CruiseItineraryDay {
  day: number;
  port: string;
  activity: string;
  desc?: string;
}

export interface CruiseShipInfo {
  yearBuilt?: string;
  length?: string;
  decks?: number;
  cabinsCount?: number;
  dining?: string;
  crewRatio?: string;
}

export interface Cruise {
  id: string;
  slug: string;
  title: string;
  profileName?: string;
  profileTitle?: string;
  cruiseType: string;
  vesselType: string;
  type?: string;
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
  cabins: string;
  amenities: string[];
  shipInfo: CruiseShipInfo;
  itinerary: CruiseItineraryDay[];
  featured?: boolean;
}

export interface ExperiencePracticalInfo {
  timing?: string;
  dressCode?: string;
  physicalLevel?: string;
  included?: string[];
}

export interface Experience {
  id: string;
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
  practicalInfo: ExperiencePracticalInfo;
  inquiryCta?: string;
  featured?: boolean;
}

export interface JournalArticle {
  id: string;
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

export type Article = JournalArticle;

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SpecialOffer {
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
  targetType: 'tour' | 'package' | 'cruise';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  qualifications: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  location: string;
  text: string;
  tourOrCruiseName: string;
  avatar?: string;
}

export interface TripInquiryPayload {
  destinations: string[];
  travelDates: {
    startDate?: string;
    endDate?: string;
    flexible?: boolean;
  };
  durationDays: number;
  travelers: {
    adults: number;
    children: number;
  };
  interests: string[];
  travelStyle: 'Ultra Luxury' | 'Classic Luxury' | 'Family Comfort' | 'Tailor Made';
  budgetPerPerson: string;
  contactDetails: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
  };
  additionalNotes?: string;
}

export interface NavLinkItem {
  label: string;
  path: string;
  description?: string;
  badge?: string;
  image?: string;
}

export interface MegaMenuCategory {
  title: string;
  links: NavLinkItem[];
}

export interface NavigationConfig {
  destinationsMenu: MegaMenuCategory[];
  toursMenu: MegaMenuCategory[];
  mainLinks: NavLinkItem[];
}
