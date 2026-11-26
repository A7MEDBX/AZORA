export type AdminStatus = 'draft' | 'published' | 'archived';

export interface AdminUser {
  id: string;
  email: string;
}

export interface CatalogCountKpi {
  total: number;
  published: number;
}

export interface AdminStats {
  catalog: {
    destinations: CatalogCountKpi;
    tours: CatalogCountKpi;
    packages: CatalogCountKpi;
    cruises: CatalogCountKpi;
    experiences: CatalogCountKpi;
    journalArticles: CatalogCountKpi;
  };
  activeSpecialOffers: number;
  pendingReviews: number;
  newInquiries: number;
  newTripPlans: number;
}

export interface DestinationSummary {
  id: string;
  slug: string;
  name: string;
  category?: string;
  image?: string;
}

export interface AdminDestination {
  id: string;
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
  bestTimeToVisit: string;
  practicalInfo?: {
    bestSeason?: string;
    currency?: string;
    climate?: string;
    airport?: string;
    recommendedStay?: string;
    localTips?: string[];
  };
  featured: boolean;
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminTour {
  id: string;
  destinationId: string;
  destinationSlug?: string;
  destinationName?: string;
  slug: string;
  title: string;
  subheadline?: string;
  category: string;
  city?: string;
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
  itinerary: { day?: number; title: string; desc: string; duration?: string; activity?: string }[];
  inquiryInfo?: string;
  featured: boolean;
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminPackage {
  id: string;
  slug: string;
  title: string;
  category: string;
  duration: string;
  durationDays: number;
  durationNights: number;
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  images: string[];
  route: string;
  hotels: string;
  destinationsCovered: string[];
  destinationDetails?: DestinationSummary[];
  overview?: string;
  description: string;
  highlights: string[];
  dailyItinerary: {
    day: number;
    title: string;
    desc: string;
    meals?: string;
    accommodation?: string;
    destination?: DestinationSummary;
  }[];
  accommodation: string;
  inclusions: string[];
  exclusions: string[];
  featured: boolean;
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminCruise {
  id: string;
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
  reviewsCount: number;
  badge?: string;
  image: string;
  images: string[];
  lead?: string;
  description: string;
  highlights: string[];
  cabins: string;
  amenities: string[];
  shipInfo: {
    yearBuilt?: string;
    length?: string;
    decks?: number;
    cabinsCount?: number;
    dining?: string;
    crewRatio?: string;
  };
  itinerary: { day: number; port: string; activity: string; desc?: string }[];
  featured: boolean;
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminExperience {
  id: string;
  destinationId?: string;
  destination?: DestinationSummary;
  slug: string;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  gallery: string[];
  description: string;
  highlights: string[];
  practicalInfo: {
    timing?: string;
    dressCode?: string;
    physicalLevel?: string;
    included?: string[];
  };
  inquiryCta?: string;
  featured: boolean;
  status: AdminStatus;
  isPublished: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type OfferTargetType = 'tour' | 'package' | 'cruise' | 'experience';

export interface AdminSpecialOffer {
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
  targetType: OfferTargetType;
  startsAt?: string;
  endsAt?: string;
  status: AdminStatus;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminJournalArticle {
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
  status: AdminStatus;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UploadFolder =
  | 'destinations'
  | 'tours'
  | 'packages'
  | 'cruises'
  | 'experiences'
  | 'journal'
  | 'offers'
  | 'general';

export type InquiryStatus = 'new' | 'in_progress' | 'responded' | 'closed';

export interface AdminInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  country: string | null;
  subject: string | null;
  message: string;
  inquiryType: string;
  targetSlug: string | null;
  targetTitle: string | null;
  preferredTravelDate: string | null;
  travelersCount: number | null;
  preferredLanguage: string;
  status: InquiryStatus;
  createdAt: string;
}

export type TripPlanStatus = 'new' | 'reviewing' | 'contacted' | 'completed' | 'cancelled';

export interface AdminTripPlan {
  id: string;
  preferredDestinations: string[];
  travelStartDate: string | null;
  travelEndDate: string | null;
  isDatesFlexible: boolean;
  durationDays: number;
  adultsCount: number;
  childrenCount: number;
  interests: string[];
  travelStyle: string;
  budgetPerPerson: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  additionalNotes: string | null;
  preferredLanguage: string;
  status: TripPlanStatus;
  createdAt: string;
}

export type ReviewTargetType = 'tour' | 'package' | 'cruise' | 'experience' | 'general';

export interface AdminReview {
  id: string;
  reviewerName: string;
  reviewerCountry: string;
  rating: number;
  title: string;
  content: string;
  avatar?: string;
  targetType?: ReviewTargetType;
  targetId?: string;
  isApproved: boolean;
  featured: boolean;
  date: string;
  createdAt: string;
}
