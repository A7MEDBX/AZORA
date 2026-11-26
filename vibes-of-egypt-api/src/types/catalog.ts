export interface PracticalInfoDto {
  bestSeason?: string;
  currency?: string;
  climate?: string;
  airport?: string;
  recommendedStay?: string;
  localTips?: string[];
}

export interface DestinationSummaryDto {
  id: string;
  slug: string;
  name: string;
  category?: string;
  image?: string;
}

export interface DestinationDto {
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
  practicalInfo?: PracticalInfoDto;
  featured: boolean;
}

export interface DestinationDetailDto extends DestinationDto {
  tours: TourDto[];
}

export interface TourItineraryDayDto {
  day?: number;
  title: string;
  desc: string;
  duration?: string;
  activity?: string;
}

export interface TourDto {
  id: string;
  slug: string;
  title: string;
  subheadline?: string;
  category: string;
  city?: string;
  destinationId: string;
  destinationSlug?: string;
  destinationName?: string;
  destination?: DestinationSummaryDto;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  images: string[];
  overview?: string;
  description: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  inclusions: string[];
  itinerary: TourItineraryDayDto[];
  inquiryInfo?: string;
  featured: boolean;
}

export interface PackageItineraryDayDto {
  day: number;
  title: string;
  desc: string;
  meals?: string;
  accommodation?: string;
  destination?: DestinationSummaryDto;
}

export interface PackageDto {
  id: string;
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  durationNights: number;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  images: string[];
  route: string;
  hotels: string;
  destinationsCovered: string[];
  destinations: string[];
  destinationDetails?: DestinationSummaryDto[];
  overview?: string;
  description: string;
  highlights: string[];
  dailyItinerary: PackageItineraryDayDto[];
  itinerary: PackageItineraryDayDto[];
  accommodation: string;
  inclusions: string[];
  exclusions: string[];
  featured: boolean;
}

export interface CruiseItineraryDayDto {
  day: number;
  port: string;
  activity: string;
  desc?: string;
}

export interface CruiseShipInfoDto {
  yearBuilt?: string;
  length?: string;
  decks?: number;
  cabinsCount?: number;
  dining?: string;
  crewRatio?: string;
}

export interface CruiseDto {
  id: string;
  slug: string;
  title: string;
  profileName?: string;
  profileTitle?: string;
  cruiseType: string;
  vesselType: string;
  type: string;
  route: string;
  capacity: string;
  duration: string;
  durationNights: number;
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  images: string[];
  lead?: string;
  description: string;
  highlights: string[];
  cabins: string;
  amenities: string[];
  shipInfo: CruiseShipInfoDto;
  itinerary: CruiseItineraryDayDto[];
  featured: boolean;
}

export interface ExperiencePracticalInfoDto {
  timing?: string;
  dressCode?: string;
  physicalLevel?: string;
  included?: string[];
}

export interface ExperienceDto {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  destinationId?: string;
  destination?: DestinationSummaryDto;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  badge?: string;
  description: string;
  highlights: string[];
  practicalInfo: ExperiencePracticalInfoDto;
  inquiryCta?: string;
  featured: boolean;
}

export interface JournalArticleDto {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  publishedAt: string;
  author: string;
  authorRole?: string;
  authorAvatar?: string;
  content: string[];
  tags: string[];
  featured: boolean;
}

export interface SpecialOfferDto {
  id: string;
  offerSlug: string;
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
  startsAt?: string;
  endsAt?: string;
}

export interface ReviewDto {
  id: string;
  author: string;
  rating: number;
  date: string;
  location: string;
  text: string;
  tourOrCruiseName: string;
  avatar?: string;
  targetType?: 'tour' | 'package' | 'cruise' | 'experience' | 'general';
  targetId?: string;
  featured: boolean;
}
