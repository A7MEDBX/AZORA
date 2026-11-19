import catalog from '@/data/catalog.json';
import { Destination, Tour, PackageTour, Cruise, Experience } from '@/types';

export const destinations: Destination[] = catalog.destinations as Destination[];
export const tours: Tour[] = catalog.tours as Tour[];
export const packages: PackageTour[] = catalog.packages as PackageTour[];
export const cruises: Cruise[] = catalog.cruises as Cruise[];
export const experiences: Experience[] = catalog.experiences as Experience[];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(d => d.id === id);
};

export const getTourById = (id: string): Tour | undefined => {
  return tours.find(t => t.id === id);
};

export const getPackageById = (id: string): PackageTour | undefined => {
  return packages.find(p => p.id === id);
};

export const getCruiseById = (id: string): Cruise | undefined => {
  return cruises.find(c => c.id === id);
};

export const getExperienceById = (id: string): Experience | undefined => {
  return experiences.find(e => e.id === id);
};
