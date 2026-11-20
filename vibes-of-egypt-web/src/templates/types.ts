import type {
  Destination,
  Tour,
  PackageTour,
  Cruise,
  Experience,
  JournalArticle
} from '@/types';

export interface DestinationDetailTemplateProps {
  destination: Destination;
  relatedTours?: Tour[];
}

export interface TourDetailTemplateProps {
  tour: Tour;
  relatedTours?: Tour[];
}

export interface PackageDetailTemplateProps {
  packageData: PackageTour;
  relatedPackages?: PackageTour[];
}

export interface CruiseDetailTemplateProps {
  cruise: Cruise;
  relatedCruises?: Cruise[];
}

export interface ExperienceDetailTemplateProps {
  experience: Experience;
  relatedExperiences?: Experience[];
}

export interface ArticleDetailTemplateProps {
  article: JournalArticle;
  relatedArticles?: JournalArticle[];
}
