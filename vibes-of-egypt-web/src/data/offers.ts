import { SpecialOffer } from '@/types';

export const specialOffers: SpecialOffer[] = [
  {
    id: 'early-bird-nile-2027',
    title: 'Early Bird Luxury: 2026/2027 Nile Cruise Privilege',
    discount: '15% Off',
    description: 'Book your 2026 or 2027 private Dahabiya or 5-Star river cruise at least 90 days in advance and receive a 15% booking credit plus complimentary domestic flights.',
    originalPrice: 1450,
    discountedPrice: 1230,
    validity: 'Valid for bookings made before Dec 31, 2026',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
    category: 'Cruise Privilege',
    badge: 'Limited Availability',
    slug: 'dahabiya-cleopatra',
    targetType: 'cruise'
  },
  {
    id: 'honeymoon-red-sea-cairo',
    title: 'Honeymoon Romance Package: Suite Upgrades & Champagne',
    discount: '$350 Savings',
    description: 'Celebrate your union with complimentary suite upgrades in Cairo, private candlelit dinner on the Nile bank, and couples massage at our Red Sea resort.',
    originalPrice: 1850,
    discountedPrice: 1500,
    validity: 'Year-Round Booking Privilege',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    category: 'Romantic Escape',
    badge: 'Honeymoon Special',
    slug: 'nile-and-red-sea-escape-11-days',
    targetType: 'package'
  },
  {
    id: 'family-gem-adventure',
    title: 'Family Pharaoh Expedition: Kids Go Free on Sightseeing',
    discount: 'Kids Free',
    description: 'Children under 12 receive complimentary entry tickets and private child-friendly Egyptologist treasure hunts on all Cairo and Luxor packages.',
    originalPrice: 1350,
    discountedPrice: 1190,
    validity: 'Valid for Travel in 2026 - 2027',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80',
    category: 'Family Friendly',
    badge: 'Family Offer',
    slug: 'classic-egypt-wonders-8-days',
    targetType: 'package'
  }
];
