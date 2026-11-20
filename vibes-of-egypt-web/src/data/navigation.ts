export interface NavLinkItem {
  label: string;
  href: string;
  badge?: string;
  description?: string;
}

export interface NavMenuColumn {
  heading: string;
  items: NavLinkItem[];
}

export interface MegaMenuConfig {
  columns: NavMenuColumn[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
    ctaText?: string;
  };
  viewAllLink?: {
    label: string;
    href: string;
  };
}

export const MAIN_NAV_ITEMS: {
  id: string;
  labelKey: string;
  defaultLabel: string;
  href: string;
  hasDropdown?: boolean;
}[] = [
  { id: 'home', labelKey: 'nav_home', defaultLabel: 'Home', href: '/' },
  { id: 'destinations', labelKey: 'nav_destinations', defaultLabel: 'Destinations', href: '/destinations', hasDropdown: true },
  { id: 'tours', labelKey: 'nav_tours', defaultLabel: 'Tours & Packages', href: '/tours', hasDropdown: true },
  { id: 'cruises', labelKey: 'nav_cruises', defaultLabel: 'Nile Cruises', href: '/nile-cruises' },
  { id: 'experiences', labelKey: 'nav_experiences', defaultLabel: 'Experiences', href: '/experiences' },
  { id: 'about', labelKey: 'nav_about', defaultLabel: 'About Us', href: '/about' },
];

export const DESTINATIONS_MEGA_MENU: MegaMenuConfig = {
  columns: [
    {
      heading: 'Ancient Wonders',
      items: [
        { label: 'Cairo & Pyramids of Giza', href: '/destinations/cairo-giza', description: 'Great Pyramids, Sphinx & Grand Egyptian Museum' },
        { label: 'Luxor Valley of the Kings', href: '/destinations/luxor', description: 'Karnak, Hatshepsut & Royal Theban Tombs' },
        { label: 'Aswan & Philae Island', href: '/destinations/aswan', description: 'Isis Sanctuary, Old Cataract & Nubian Villages' },
        { label: 'Abu Simbel Colossal Temples', href: '/destinations/abu-simbel', description: 'Sun Temples of Ramesses II & Nefertari' },
      ],
    },
    {
      heading: 'Red Sea, Desert & Oasis',
      items: [
        { label: 'Hurghada Coral Reefs', href: '/destinations/hurghada', description: 'Private Marine Yacht Charters & Diving' },
        { label: 'Sharm El Sheikh & Sinai', href: '/destinations/sharm-el-sheikh', description: 'Ras Mohammed & St. Catherine Monastery' },
        { label: 'Alexandria Mediterranean', href: '/destinations/alexandria', description: 'Bibliotheca Alexandrina & Qaitbay Citadel' },
        { label: 'Siwa Oasis & Great Sand Sea', href: '/destinations/siwa-oasis', description: 'Cleopatra Spring & Salt Lakes' },
      ],
    },
  ],
  viewAllLink: {
    label: 'View All 19 Destinations Atlas →',
    href: '/destinations',
  },
};

export const TOURS_MEGA_MENU: MegaMenuConfig = {
  columns: [
    {
      heading: 'Private Day Excursions',
      items: [
        { label: 'VIP Cairo & Giza Plateau', href: '/tours/cairo-pyramids-gem', description: 'Private Egyptologist & VIP Access' },
        { label: 'Exclusive Luxor West & East Bank', href: '/tours/luxor-east-west-bank', description: 'Valley of Kings & Karnak' },
        { label: 'Abu Simbel Sun Temples', href: '/tours/abu-simbel-sun-temple', description: 'Colossal Temples of Ramesses II' },
        { label: 'Alexandria Day Expedition', href: '/tours/alexandria-greco-roman-day-tour', description: 'Catacombs & Coastal Citadel' },
      ],
    },
    {
      heading: 'Multi-Day Bespoke Packages',
      items: [
        { label: 'Classic Egypt Wonders (8 Days)', href: '/packages/classic-egypt-wonders-8-days', description: 'Cairo, Luxor, Aswan & 5-Star Nile Cruise' },
        { label: 'Luxury Pharaohs Dahabiya (10 Days)', href: '/packages/luxury-pharaohs-dahabiya-10-days', description: 'Cairo & Private Dahabiya River Voyage' },
        { label: 'Nile & Red Sea Escape (11 Days)', href: '/packages/nile-and-red-sea-escape-11-days', description: 'Cairo, Nile Cruise & Hurghada Coral Retreat' },
      ],
    },
  ],
  viewAllLink: {
    label: 'Explore All Handcrafted Tours & Packages →',
    href: '/tours',
  },
};

export const FOOTER_SECTIONS = [
  {
    titleKey: 'footer_destinations',
    titleDefault: 'Destinations',
    links: [
      { label: 'Cairo & Pyramids of Giza', href: '/destinations/cairo-giza' },
      { label: 'Luxor Valley of the Kings', href: '/destinations/luxor' },
      { label: 'Aswan & Philae Temple', href: '/destinations/aswan' },
      { label: 'Abu Simbel Colossal Temples', href: '/destinations/abu-simbel' },
      { label: 'Alexandria Mediterranean', href: '/destinations/alexandria' },
      { label: 'Hurghada Red Sea Riviera', href: '/destinations/hurghada' },
      { label: 'Sharm El Sheikh & Sinai', href: '/destinations/sharm-el-sheikh' },
    ],
  },
  {
    titleKey: 'footer_tours_packages',
    titleDefault: 'Tours & Journeys',
    links: [
      { label: 'Curated Private Day Tours', href: '/tours' },
      { label: 'Multi-Day Signature Packages', href: '/packages' },
      { label: 'Luxury Nile Cruises', href: '/nile-cruises' },
      { label: 'Historic Sailing Dahabiyas', href: '/nile-cruises' },
      { label: 'Sunrise Luxor Hot Air Balloon', href: '/experiences' },
      { label: 'Bedouin Desert Safari & Stargazing', href: '/experiences' },
      { label: 'Seasonal Promotional Offers', href: '/special-offers' },
    ],
  },
  {
    titleKey: 'footer_legal',
    titleDefault: 'Concierge & Trust',
    links: [
      { label: 'About Us & Heritage', href: '/about' },
      { label: 'Travel Journal & Stories', href: '/journal' },
      { label: 'Frequently Asked Questions', href: '/faq' },
      { label: 'Contact Private Concierge', href: '/contact' },
      { label: 'Custom Trip Atelier', href: '/plan-your-trip' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms-and-conditions' },
      { label: 'Cancellation Policy', href: '/cancellation-policy' },
    ],
  },
];
