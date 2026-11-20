import { Cruise } from '@/types';

export const cruises: Cruise[] = [
  {
    id: 'dahabiya-cleopatra',
    slug: 'dahabiya-cleopatra',
    title: 'Dahabiya Cleopatra: Exclusive Private Nile Sailing',
    profileName: 'Dahabiya Cleopatra • Traditional Handcrafted Teakwood',
    profileTitle: 'Bespoke River Architecture & Timeless Character',
    cruiseType: 'Dahabiya',
    vesselType: 'Handcrafted Teak Dahabiya',
    type: 'Dahabiya',
    route: 'Luxor to Aswan',
    capacity: 'Max 12 Guests (6 Deluxe Suites)',
    duration: '5 Days / 4 Nights',
    durationNights: 4,
    cabins: '6 Deluxe Panoramic Suites with Private Teak Balconies',
    price: 1450,
    rating: 5,
    reviewsCount: 164,
    badge: 'Exclusive Teak Sailing',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80'
    ],
    lead: 'Discover timeless riverside temples, intimate character, secluded sandbank moorings, and an affectionate culinary journey aboard a private 6-suite Dahabiya.',
    description: 'Authentic wooden sailing vessel featuring handcrafted teak decks, fine Egyptian linen canopy shading, farm-to-table organic dining prepared by your private chef, and visits to ancient monuments unreachable by large cruise ships. With zero engine noise when sails are raised, enjoy peaceful, wind-driven passage along the eternal Nile.',
    highlights: [
      'Private 6-suite boutique vessel catering to maximum 12 guests',
      'Wind-driven authentic sailing with zero engine vibration or noise',
      'Dedicated onboard master chef preparing fresh farm-to-table cuisine',
      'Mooring at secluded islands and untouched sandstone monument quarries',
      'Private Egyptologist providing intimate lectures and guided walks'
    ],
    shipInfo: {
      yearBuilt: '2023 (Refitted 2025)',
      length: '46 Meters',
      decks: 2,
      cabinsCount: 6,
      dining: 'Open-Air Shaded Teak Deck Salon & Indoor Dining Room',
      crewRatio: '1.5 Crew Members per Guest'
    },
    amenities: [
      'Private Balcony Panoramic Suites with Egyptian Cotton Linens',
      'Onboard Master Chef with Customized Dietary Menus',
      'Full-Board Fine Dining with Organic Local Ingredients',
      'Private Egyptologist Escort for all Excursions',
      'All Shore Excursions and Temple Entrance Tickets Included',
      'Complimentary Wi-Fi and Espresso Bar'
    ],
    itinerary: [
      {
        day: 1,
        port: 'Luxor (West Bank & East Bank)',
        activity: 'Embarkation & Karnak Temple Tour',
        desc: 'Board your Dahabiya in Luxor for a welcome champagne luncheon. Visit Karnak Temple and embark on an evening stroll through illuminated Luxor Temple.'
      },
      {
        day: 2,
        port: 'Esna to El Hegz Island',
        activity: 'Esna Lock Crossing & Peaceful River Sailing',
        desc: 'Cross the historic Esna Lock. Raise the twin canvas sails and glide past palm orchards and riverside hamlets. Moor at El Hegz Island for an evening barbecue under the stars.'
      },
      {
        day: 3,
        port: 'Edfu & Bassawa Island',
        activity: 'Temple of Horus & Village Walk',
        desc: 'Horse carriage excursion to the Temple of Horus in Edfu. Afternoon sailing to Bassawa Island; walk through tranquil date groves and meet local village farmers.'
      },
      {
        day: 4,
        port: 'Gebel el-Silsila & Kom Ombo',
        activity: 'Pharaonic Stone Quarries & Sobek Temple',
        desc: 'Explore the ancient cliff shrines and sandstone quarries of Gebel el-Silsila. Twilight visit to the dual temple of Kom Ombo, followed by candlelit dinner.'
      },
      {
        day: 5,
        port: 'Aswan',
        activity: 'Philae Temple & Disembarkation',
        desc: 'Sail into Aswan. Private launch to the Island Temple of Philae. Farewell gourmet breakfast on deck before disembarkation.'
      }
    ],
    featured: true
  },
  {
    id: 'sanctuary-sun-boat-luxury',
    slug: 'sanctuary-sun-boat-luxury',
    title: 'Sanctuary Sun Boat IV: Five-Star Nile Elegance',
    profileName: 'Sanctuary Sun Boat IV • Five-Star Floating Boutique Resort',
    profileTitle: 'Five-Star Floating Elegance & Panoramic Sun Deck Suites',
    cruiseType: 'Luxury Nile Cruiser',
    vesselType: 'Five-Star River Cruiser',
    type: 'Luxury Nile Cruiser',
    route: 'Aswan to Luxor',
    capacity: '40 Luxury Cabins (80 Guests)',
    duration: '4 Days / 3 Nights',
    durationNights: 3,
    cabins: '40 River-View Cabins & 2 Presidential Suites with Floor-to-Ceiling Windows',
    price: 1200,
    rating: 4.9,
    reviewsCount: 310,
    badge: 'Ultra-Luxury',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566192091743-5966a6079984?auto=format&fit=crop&w=1200&q=80'
    ],
    lead: 'Award-winning river sanctuary with a rooftop heated pool, sun deck bar, French-Egyptian fusion restaurant, and spacious panoramic suites.',
    description: 'The pinnacle of contemporary river elegance, offering state-of-the-art hospitality, marble bathrooms, Michelin-inspired dining, and daily private excursions with senior Egyptologists to the Nile’s grandest temples.',
    highlights: [
      'Heated plunge pool and teak sun loungers on the observation deck',
      'Spacious cabins with floor-to-ceiling French panoramic windows',
      'Gourmet fine dining blending French culinary artistry with Egyptian flavors',
      'Daily curated excursions avoiding peak crowd hours',
      'Onboard wellness spa, gym, and evening Egyptology salon lectures'
    ],
    shipInfo: {
      yearBuilt: '2021 (Modern Architectural Renovation)',
      length: '72 Meters',
      decks: 4,
      cabinsCount: 40,
      dining: 'Gourmet Restaurant, Sun Deck Bar & Nile Lounge',
      crewRatio: '1:1 Luxury Service Ratio'
    },
    amenities: [
      'Panoramic French Windows with Electric Blackout Drapes',
      'Heated Rooftop Pool & Sun Lounge with Poolside Bar Service',
      'Luxury Spa, Massage Suites & Fully Equipped Fitness Center',
      'Evening Entertainment, Nubian Folk Shows & Curatorial Lectures',
      'Complimentary Laundry Service for Suite Guests',
      'High-Speed Satellite Wi-Fi'
    ],
    itinerary: [
      {
        day: 1,
        port: 'Aswan',
        activity: 'Philae Temple & Welcome Gala',
        desc: 'Embarkation in Aswan. Lunch on board. Private tour of Philae Temple and the Unfinished Obelisk. Captain’s welcome cocktails and four-course dinner.'
      },
      {
        day: 2,
        port: 'Kom Ombo & Edfu',
        activity: 'Sobek Temple & Horus Temple',
        desc: 'Morning cruise to Kom Ombo to visit the dual temple. Sail toward Edfu while enjoying lunch on the sun deck. Tour the grand Temple of Horus.'
      },
      {
        day: 3,
        port: 'Luxor (West Bank & East Bank)',
        activity: 'Valley of the Kings & Karnak',
        desc: 'Cross Esna Lock and sail into Luxor. Tour the Valley of the Kings, Temple of Hatshepsut, and Karnak Temple. Formal Egyptian dinner on board.'
      },
      {
        day: 4,
        port: 'Luxor',
        activity: 'Disembarkation',
        desc: 'Gourmet buffet breakfast. Morning disembarkation in Luxor with transfer to Luxor Airport or hotel.'
      }
    ],
    featured: true
  },
  {
    id: 'lake-nasser-expedition',
    slug: 'lake-nasser-expedition',
    title: 'Lake Nasser Wilderness Cruiser: Abu Simbel Route',
    profileName: 'Lake Nasser Wilderness Cruiser • Remote Desert Waters',
    profileTitle: 'Secluded Desert Lake Sanctuary & Monumental Cliff Temples',
    cruiseType: 'Lake Nasser Expedition',
    vesselType: 'Expedition Cruiser',
    type: 'Lake Nasser Expedition',
    route: 'Aswan to Abu Simbel',
    capacity: '24 Luxury Cabins',
    duration: '5 Days / 4 Nights',
    durationNights: 4,
    cabins: '24 Deluxe Lake-View Staterooms with Private Bathrooms',
    price: 980,
    rating: 4.8,
    reviewsCount: 140,
    badge: 'Wilderness Expedition',
    image: 'https://images.unsplash.com/photo-1566192091743-5966a6079984?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1566192091743-5966a6079984?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80'
    ],
    lead: 'Cruise across the immense desert waters south of the High Dam to remote temples and arrive directly before the colossal statues of Abu Simbel.',
    description: 'Traverse the tranquil waters of Lake Nasser to secluded pharaonic sanctuaries like Kalabsha and Wadi El Seboua, offering tranquil desert stargazing, migratory birdlife, and dramatic sunrise views of Ramesses II’s cliff temple.',
    highlights: [
      'Arrive directly before the colossal statues of Abu Simbel from the water',
      'Explore secluded desert temples inaccessible to standard tour buses',
      'Spectacular dark-sky stargazing over tranquil desert lake waters',
      'Full-board expedition luxury with licensed Egyptologist guide'
    ],
    shipInfo: {
      yearBuilt: '2022',
      length: '65 Meters',
      decks: 3,
      cabinsCount: 24,
      dining: 'Panoramic View Dining Room & Starlight Deck',
      crewRatio: 'Personalized Expedition Attention'
    },
    amenities: [
      'Spacious Outer Cabins with Sliding Windows overlooking Lake Nasser',
      'Nubian Sunset Lounge & Panoramic Stargazing Deck',
      'All Shore Excursions and Desert Temple Permits Included',
      'Private Abu Simbel Sightseeing with Sound & Light Show Admission',
      'Plunge Pool & Shaded Observation Lounges'
    ],
    itinerary: [
      {
        day: 1,
        port: 'Aswan (Lake Nasser)',
        activity: 'Embarkation & Kalabsha Temple',
        desc: 'Board your vessel south of the High Dam. Visit the relocated Temple of Kalabsha and Beit el-Wali. Welcome dinner on board.'
      },
      {
        day: 2,
        port: 'Wadi El Seboua',
        activity: 'Valley of the Lions Desert Temple',
        desc: 'Cruise across peaceful desert waters to Wadi El Seboua. Walk along the avenue of sphinxes guarding the desert temple of Ramesses II.'
      },
      {
        day: 3,
        port: 'Amada & Kasr Ibrim',
        activity: '18th Dynasty Reliefs & Sunken Citadel',
        desc: 'Tour the temple of Amada, the oldest Egyptian monument on Lake Nasser, featuring fine painted reliefs. Gaze upon the fortress of Kasr Ibrim.'
      },
      {
        day: 4,
        port: 'Abu Simbel',
        activity: 'Waterfront Arrival & Night Sound & Light Show',
        desc: 'Sail towards Abu Simbel. Experience the breathtaking sight of Ramesses II’s temple rising from the water. Evening VIP attendance at the Sound & Light show.'
      },
      {
        day: 5,
        port: 'Abu Simbel',
        activity: 'Morning Temple Exploration & Disembarkation',
        desc: 'Morning tour of the twin temples of Ramesses II and Nefertari before crowds arrive. Disembarkation with transfer to Abu Simbel Airport.'
      }
    ],
    featured: true
  }
];
