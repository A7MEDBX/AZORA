import { PackageTour } from '@/types';

export const packages: PackageTour[] = [
  {
    id: 'classic-egypt-wonders-8-days',
    slug: 'classic-egypt-wonders-8-days',
    title: 'The Classic Egypt: Cairo, Pyramids & Luxury Nile Cruise',
    duration: '8 Days / 7 Nights',
    durationDays: 8,
    durationNights: 7,
    category: 'Classic',
    price: 1350,
    rating: 4.9,
    reviewsCount: 420,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'
    ],
    route: 'Cairo (3N) → Luxor (Cruise 4N) → Aswan',
    destinationsCovered: ['Cairo', 'Giza', 'Luxor', 'Edfu', 'Kom Ombo', 'Aswan'],
    destinations: ['Cairo', 'Giza', 'Luxor', 'Edfu', 'Kom Ombo', 'Aswan'],
    overview: 'The definitive introduction to Egypt. Combines 5-star hotel accommodations in Cairo, private Giza Plateau explorations, internal domestic flights, and a 4-night full-board luxury Nile cruise from Luxor to Aswan.',
    description: 'Immerse yourself in 5,000 years of splendor. Begin in Cairo with private visits to the Great Pyramids, Sphinx, and the Grand Egyptian Museum. Fly to Luxor to embark on a 5-star luxury Nile cruiser. Over four blissful nights, drift between the colossal temples of Karnak, Luxor, Edfu, and Kom Ombo, concluding in the tranquil cataract waters of Aswan and the island sanctuary of Philae.',
    hotels: 'Four Seasons Cairo / Marriott Mena House + Steigenberger Luxury Nile Cruise',
    accommodation: '5-Star Luxury Hotels (3 Nights) & 5-Star Deluxe River Cruiser (4 Nights)',
    highlights: [
      'Private Egyptologist guide for all sightseeing and excursions',
      'Giza Pyramids, Great Sphinx & Grand Egyptian Museum (GEM)',
      '4-Night Full-Board Luxury Nile Cruise with panoramic river-view cabin',
      'Valley of the Kings, Karnak, Edfu, Kom Ombo & Philae Temples',
      'Domestic flights included (Cairo – Luxor / Aswan – Cairo)'
    ],
    inclusions: [
      '3 Nights 5-star luxury hotel in Cairo with daily gourmet breakfast',
      '4 Nights 5-star deluxe Nile cruise on full-board basis (all meals)',
      'Domestic round-trip flight tickets (Cairo/Luxor & Aswan/Cairo)',
      'All private sightseeing tours with accredited Egyptologist guide',
      'All monument entrance fees according to the itinerary',
      'All airport and port transfers in private air-conditioned vehicles'
    ],
    exclusions: [
      'International flights and Egyptian entry visa',
      'Optional tours (Hot Air Balloon in Luxor or Abu Simbel excursion)',
      'Personal expenditures, laundry, and guide/crew tipping'
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Arrival in Cairo — Welcome to the Land of Pharaohs',
        desc: 'Meet-and-assist service before passport control at Cairo Airport. VIP transfer to your 5-star hotel. Evening welcome briefing and dinner at leisure.',
        meals: 'Dinner at hotel',
        accommodation: 'Marriott Mena House or Four Seasons Cairo'
      },
      {
        day: 2,
        title: 'The Great Pyramids, Sphinx & Grand Egyptian Museum',
        desc: 'Private tour of the Giza Plateau, the Great Sphinx, and the new Grand Egyptian Museum. Enjoy a panoramic lunch overlooking the pyramids.',
        meals: 'Breakfast & Lunch',
        accommodation: 'Marriott Mena House or Four Seasons Cairo'
      },
      {
        day: 3,
        title: 'Fly to Luxor & Board 5-Star Luxury Nile Cruise',
        desc: 'Morning flight to Luxor. Embarkation on your luxury river cruiser. Lunch on board, followed by afternoon tours of Karnak and Luxor Temples.',
        meals: 'Breakfast, Lunch & Dinner',
        accommodation: 'Deluxe Nile Cruiser (Panoramic Cabin)'
      },
      {
        day: 4,
        title: 'Valley of the Kings & Hatshepsut Temple — Sail to Edfu',
        desc: 'Cross to the West Bank to explore the royal tombs in the Valley of the Kings and Hatshepsut’s mortuary temple. Sail towards Edfu through the Esna Lock.',
        meals: 'Breakfast, Lunch & Dinner',
        accommodation: 'Deluxe Nile Cruiser'
      },
      {
        day: 5,
        title: 'Edfu Horus Temple & Kom Ombo Crocodile Temple',
        desc: 'Visit the remarkably intact Temple of Horus in Edfu by horse carriage. Sail to Kom Ombo to visit the unique dual temple dedicated to Sobek and Haroeris.',
        meals: 'Breakfast, Lunch & Dinner',
        accommodation: 'Deluxe Nile Cruiser'
      },
      {
        day: 6,
        title: 'Aswan High Dam, Philae Island & Sunset Felucca',
        desc: 'Arrive in Aswan. Take a boat to the romantic Island Temple of Isis at Philae and visit the High Dam. Afternoon sunset felucca sailing around Elephantine Island.',
        meals: 'Breakfast, Lunch & Dinner',
        accommodation: 'Deluxe Nile Cruiser'
      },
      {
        day: 7,
        title: 'Disembarkation — Optional Abu Simbel & Fly to Cairo',
        desc: 'Disembark after breakfast. Optional morning excursion to Abu Simbel by air or road. Fly back to Cairo for a final farewell dinner.',
        meals: 'Breakfast & Farewell Dinner',
        accommodation: 'Luxury Hotel in Cairo'
      },
      {
        day: 8,
        title: 'Departure from Cairo',
        desc: 'Breakfast at hotel. Private luxury transfer to Cairo International Airport for your homebound flight.',
        meals: 'Breakfast',
        accommodation: 'Departure'
      }
    ],
    featured: true
  },
  {
    id: 'luxury-pharaohs-dahabiya-10-days',
    slug: 'luxury-pharaohs-dahabiya-10-days',
    title: 'The Pharaoh’s Sanctuary: Cairo & Private Dahabiya Voyage',
    duration: '10 Days / 9 Nights',
    durationDays: 10,
    durationNights: 9,
    category: 'Luxury',
    price: 3200,
    rating: 5,
    reviewsCount: 180,
    badge: 'VIP Luxury',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80'
    ],
    route: 'Cairo (3N) → Luxor to Aswan (Private Dahabiya 5N) → Abu Simbel',
    destinationsCovered: ['Cairo', 'Giza', 'Luxor', 'Esna', 'Edfu', 'Gebel el-Silsila', 'Kom Ombo', 'Aswan', 'Abu Simbel'],
    destinations: ['Cairo', 'Giza', 'Luxor', 'Esna', 'Edfu', 'Gebel el-Silsila', 'Kom Ombo', 'Aswan', 'Abu Simbel'],
    overview: 'Unrivaled river elegance. Sail the Nile aboard an intimate private twin-sailed Dahabiya with a dedicated chef and Egyptologist, paired with premier hotel suites in Cairo and the legendary Old Cataract in Aswan.',
    description: 'Experience Egypt as royalty did in the golden age of travel. Stay at Cairo’s most prestigious suites before boarding a private 6-suite Dahabiya for a 5-night wind-powered journey down the Nile. Stop at secluded sandstone quarries and untouched island villages that large cruise liners cannot reach. Dine on candlelit sandbanks under desert skies, accompanied by your private Egyptologist.',
    hotels: 'The St. Regis Cairo + Private Boutique Dahabiya + Sofitel Legend Old Cataract Palace',
    accommodation: 'Boutique Teakwood Dahabiya (5 Nights) & Palace Hotel Suites (4 Nights)',
    highlights: [
      'Private twin-masted Dahabiya limited to 12 discerning guests',
      'VIP opening permits to King Tutankhamun & Queen Nefertari Tombs',
      'Candlelit dinners on secluded Nile river sandbanks under the stars',
      'Private flight excursion to the Sun Temples of Abu Simbel',
      'Palace Suite at Sofitel Legend Old Cataract Aswan overlooking the cataracts'
    ],
    inclusions: [
      '3 Nights at The St. Regis Cairo (Nile View Suite) with breakfast',
      '5 Nights private Dahabiya sailing with all gourmet meals prepared by master chef',
      '1 Night at Sofitel Legend Old Cataract Aswan (Palace Suite)',
      'Domestic flights in Business/Premium class (Cairo–Luxor & Aswan–Cairo)',
      'Private flight to Abu Simbel with VIP tour',
      'All private tours and VIP tomb entries with dedicated senior Egyptologist'
    ],
    exclusions: [
      'International flights',
      'Personal alcoholic beverages and discretionary gratuities'
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'VIP Welcome in Cairo',
        desc: 'Private tarmac escort and fast-track immigration at CAI. Chauffeur transfer to The St. Regis Cairo.',
        meals: 'Welcome Cocktails',
        accommodation: 'The St. Regis Cairo'
      },
      {
        day: 2,
        title: 'Giza Plateau & Grand Egyptian Museum Curatorial Tour',
        desc: 'Private early-hours access to the pyramids. Curated museum tour of Tutankhamun’s complete royal hoard.',
        meals: 'Breakfast & Gourmet Lunch',
        accommodation: 'The St. Regis Cairo'
      },
      {
        day: 3,
        title: 'Fly to Luxor & Board Private Dahabiya',
        desc: 'Board your handcrafted teak Dahabiya. Afternoon visit to Karnak’s Hypostyle Hall and Luxor Temple.',
        meals: 'Breakfast, Lunch & Dinner',
        accommodation: 'Private Luxury Dahabiya'
      },
      {
        day: 4,
        title: 'Valley of the Kings with Nefertari Special Access',
        desc: 'VIP entrance to Queen Nefertari’s tomb (QV66). Cast off and raise sails to cruise past Esna under gentle winds.',
        meals: 'Full Board on Dahabiya',
        accommodation: 'Private Luxury Dahabiya'
      },
      {
        day: 5,
        title: 'Edfu Temple & Quiet Island Mooring',
        desc: 'Morning visit to Horus Temple at Edfu. Afternoon peaceful sailing; moor at an uninhabited river island for dinner.',
        meals: 'Full Board on Dahabiya',
        accommodation: 'Private Luxury Dahabiya'
      },
      {
        day: 6,
        title: 'Gebel el-Silsila Sandstone Quarries & Kom Ombo',
        desc: 'Explore the ancient pharaonic stone quarries of Gebel el-Silsila accessible only by small boat. Sunset at Kom Ombo.',
        meals: 'Full Board on Dahabiya',
        accommodation: 'Private Luxury Dahabiya'
      },
      {
        day: 7,
        title: 'Sail into Aswan & Romantic Philae Sanctuary',
        desc: 'Arrive at the first cataract of Aswan. Private launch to Philae Island. Check-in to Sofitel Legend Old Cataract.',
        meals: 'Breakfast & High Tea',
        accommodation: 'Sofitel Legend Old Cataract'
      },
      {
        day: 8,
        title: 'Abu Simbel Flight & Nubian Sunset',
        desc: 'Private flight to Abu Simbel to marvel at Ramesses II colossi. Afternoon private felucca sailing in Aswan.',
        meals: 'Breakfast & Dinner',
        accommodation: 'Sofitel Legend Old Cataract'
      },
      {
        day: 9,
        title: 'Return to Cairo & Khan El Khalili Private Walk',
        desc: 'Fly to Cairo. Private walking tour of historic palaces and an intimate farewell gala dinner.',
        meals: 'Breakfast & Gala Dinner',
        accommodation: 'The St. Regis Cairo'
      },
      {
        day: 10,
        title: 'Farewell Egypt',
        desc: 'Chauffeur transfer to Cairo International Airport with VIP departure lounge access.',
        meals: 'Breakfast',
        accommodation: 'Departure'
      }
    ],
    featured: true
  },
  {
    id: 'nile-and-red-sea-escape-11-days',
    slug: 'nile-and-red-sea-escape-11-days',
    title: 'Nile Splendors & Red Sea Azure: Cairo, Cruise & Hurghada',
    duration: '11 Days / 10 Nights',
    durationDays: 11,
    durationNights: 10,
    category: 'Nile & Red Sea',
    price: 1850,
    rating: 4.9,
    reviewsCount: 290,
    badge: 'Family & Honeymoon',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    route: 'Cairo (3N) → Nile Cruise (4N) → Hurghada (3N)',
    destinationsCovered: ['Cairo', 'Giza', 'Luxor', 'Edfu', 'Kom Ombo', 'Aswan', 'Hurghada'],
    destinations: ['Cairo', 'Giza', 'Luxor', 'Edfu', 'Kom Ombo', 'Aswan', 'Hurghada'],
    overview: 'The ideal balance of monumental world wonder and tropical coastal leisure. Explore Cairo and ancient Upper Egypt by deluxe river cruiser, then unwind in an all-inclusive Red Sea beach resort.',
    description: 'Begin with three nights in Cairo touring the Pyramids and GEM. Board a 4-night 5-star Nile cruise from Luxor to Aswan, marveling at the Valley of the Kings and riverside temples. Then transition by private scenic transfer to Hurghada on the Red Sea for three nights of all-inclusive relaxation, coral reef snorkeling, and beachfront serenity.',
    hotels: '5★ Deluxe Properties throughout (Cairo, Cruise & All-Inclusive Red Sea Resort)',
    accommodation: '5-Star Cairo Hotel (3N), 5-Star Nile Cruiser (4N), 5-Star Red Sea Resort (3N)',
    highlights: [
      'Cairo Pyramids, Sphinx, Saqqara & Grand Egyptian Museum',
      '4-Night 5-Star Nile Cruise with full-board dining and shore excursions',
      '3-Night All-Inclusive Red Sea beach stay in Hurghada or El Gouna',
      'Private yacht snorkeling trip to Giftun Island coral reefs',
      'All private ground transfers and domestic flights included'
    ],
    inclusions: [
      '3 Nights in Cairo with daily breakfast',
      '4 Nights full-board Nile Cruise',
      '3 Nights all-inclusive Red Sea Beach Resort in Hurghada',
      'Domestic flights: Cairo–Luxor and Hurghada–Cairo',
      'All guided excursions with private licensed Egyptologist'
    ],
    exclusions: [
      'International flights and Egyptian entry visa',
      'Scuba diving certifications or motorized watersports',
      'Gratuities'
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Arrival in Cairo',
        desc: 'Meet and assist at airport, transfer to hotel.',
        meals: 'Welcome Dinner',
        accommodation: '5★ Cairo Hotel'
      },
      {
        day: 2,
        title: 'Pyramids, Sphinx & GEM',
        desc: 'Full day private tour of Giza Plateau and Grand Egyptian Museum.',
        meals: 'Breakfast & Lunch',
        accommodation: '5★ Cairo Hotel'
      },
      {
        day: 3,
        title: 'Saqqara & Old Cairo',
        desc: 'Explore Djoser Step Pyramid and Khan El Khalili market.',
        meals: 'Breakfast & Lunch',
        accommodation: '5★ Cairo Hotel'
      },
      {
        day: 4,
        title: 'Fly to Luxor & Cruise Embarkation',
        desc: 'Fly to Luxor, board luxury cruise ship, tour Karnak and Luxor temples.',
        meals: 'Full Board',
        accommodation: '5★ Nile Cruiser'
      },
      {
        day: 5,
        title: 'West Bank & Sail to Edfu',
        desc: 'Valley of the Kings, Hatshepsut Temple, Colossi of Memnon.',
        meals: 'Full Board',
        accommodation: '5★ Nile Cruiser'
      },
      {
        day: 6,
        title: 'Edfu & Kom Ombo Temples',
        desc: 'Horse carriage to Horus Temple, sail to Kom Ombo dual temple.',
        meals: 'Full Board',
        accommodation: '5★ Nile Cruiser'
      },
      {
        day: 7,
        title: 'Aswan Philae Temple & High Dam',
        desc: 'Boat to Island of Philae, High Dam, afternoon felucca ride.',
        meals: 'Full Board',
        accommodation: '5★ Nile Cruiser'
      },
      {
        day: 8,
        title: 'Disembark & Transfer to Hurghada Red Sea',
        desc: 'Scenic drive across Eastern Desert mountains to your Red Sea resort.',
        meals: 'All-Inclusive',
        accommodation: '5★ Red Sea Resort'
      },
      {
        day: 9,
        title: 'Red Sea Relaxation & Giftun Island Snorkel',
        desc: 'Private boat excursion to coral reefs and turquoise lagoons.',
        meals: 'All-Inclusive',
        accommodation: '5★ Red Sea Resort'
      },
      {
        day: 10,
        title: 'Beach Day at Leisure',
        desc: 'Free day for spa treatments, water sports, or poolside relaxation.',
        meals: 'All-Inclusive',
        accommodation: '5★ Red Sea Resort'
      },
      {
        day: 11,
        title: 'Fly to Cairo & International Departure',
        desc: 'Short flight from Hurghada to Cairo for your connecting flight home.',
        meals: 'Breakfast',
        accommodation: 'Departure'
      }
    ],
    featured: true
  }
];
