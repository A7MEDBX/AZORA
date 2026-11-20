import { Experience } from '@/types';

export const experiences: Experience[] = [
  {
    id: 'hot-air-balloon',
    slug: 'hot-air-balloon',
    title: 'Sunrise Hot Air Balloon Flight over Ancient Thebes',
    location: 'Luxor',
    duration: '45 min flight (3 hrs total)',
    price: 90,
    rating: 5,
    reviewsCount: 840,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Aerial Adventure',
    badge: 'Iconic',
    description: 'Drift serenely above the Valley of the Kings, Queen Hatshepsut Temple, and the fertile Nile plain as the morning sun casts a golden glow across ancient Thebes. Enjoy unmatched aerial photography angles and peaceful floating silence high above monumental Egypt.',
    highlights: [
      'Breathtaking 360-degree aerial views of the entire Luxor West Bank',
      'Sunrise flight over Hatshepsut’s mortuary temple and Colossi of Memnon',
      'Licensed master balloon pilots adhering to top international civil aviation safety standards',
      'Personalized commemorative flight certificate and post-flight champagne toast'
    ],
    practicalInfo: {
      timing: 'Pre-dawn pick-up (around 04:30 AM depending on season); return by 08:00 AM',
      dressCode: 'Comfortable layers (morning air can be brisk aloft), flat closed-toe walking shoes',
      physicalLevel: 'Easy (ability to step into balloon basket with pilot assistance)',
      included: [
        'Roundtrip private hotel/cruise ship transfers including motorboat Nile crossing',
        'Pre-flight tea, coffee, and Egyptian pastries at launch field',
        '45–60 minute hot air balloon flight',
        'Official flight certificate signed by chief pilot'
      ]
    },
    inquiryCta: 'Reserve Your Sunrise Flight',
    featured: true
  },
  {
    id: 'desert-safari',
    slug: 'desert-safari',
    title: 'White Desert 4x4 Stargazing & Bedouin Camp',
    location: 'White Desert & Bahariya',
    duration: 'Overnight (2 Days)',
    price: 195,
    rating: 4.9,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Desert Safari',
    badge: 'Wilderness',
    description: 'Venture deep into the surreal chalk rock formations of the White Desert and volcanic mounds of the Black Desert, accompanied by seasoned Bedouin navigators. Sleep under a sky ablaze with billions of stars.',
    highlights: [
      'Surreal wind-carved chalk sculptures at White Desert National Park',
      'Crystal Mountain calcite sparkle and sandboarding in Agabat dunes',
      'Overnight Bedouin camp with crackling campfire and acoustic music',
      'Traditional campfire-roasted dinner and freshly baked bedouin bread'
    ],
    practicalInfo: {
      timing: 'Departs Cairo at 07:00 AM Day 1; returns by 06:00 PM Day 2',
      dressCode: 'Casual desert wear for daytime, warm fleece/jacket for chilly desert nights',
      physicalLevel: 'Moderate (dune walking, 4x4 off-road riding)',
      included: [
        'Private 4x4 expedition vehicle with professional desert driver',
        'Complete camping equipment (spacious tents, thick mattresses, blankets)',
        'All meals, campfire dinner, snacks, and unlimited bottled water',
        'National park entry and environmental permits'
      ]
    },
    inquiryCta: 'Plan Your Desert Safari',
    featured: true
  },
  {
    id: 'felucca-sailing',
    slug: 'felucca-sailing',
    title: 'Sunset Nile Felucca Sailing with Traditional High Tea',
    location: 'Aswan & Cairo',
    duration: '2 Hours',
    price: 35,
    rating: 4.9,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Nile Sailing',
    badge: 'Romantic',
    description: 'Board a handcrafted wooden sailboat with canvas sails for a peaceful, wind-driven passage along the timeless Nile, accompanied by freshly brewed mint tea and oriental dates as golden hour bathes the riverbanks.',
    highlights: [
      'Private traditional Egyptian felucca reserved exclusively for your party',
      'Wind-powered peaceful navigation with zero motor noise',
      'Fresh Egyptian mint tea, hibiscus karkadeh, and local dates served on deck',
      'Unsurpassed golden hour photography of river islands and granite rocks'
    ],
    practicalInfo: {
      timing: 'Departures late afternoon (16:30 in winter, 17:30 in summer)',
      dressCode: 'Smart casual; light wrap or windbreaker for when the sun dips',
      physicalLevel: 'Easy',
      included: [
        'Private felucca and experienced river captain',
        'Freshly brewed mint tea, bottled water, and seasonal fruit/dates',
        'Hotel or cruise ship dock pickup and return'
      ]
    },
    inquiryCta: 'Book Sunset Felucca',
    featured: true
  },
  {
    id: 'red-sea-diving',
    slug: 'red-sea-diving',
    title: 'Red Sea VIP Diving & Coral Reef Snorkeling Yacht Charter',
    location: 'Hurghada & Sharm El Sheikh',
    duration: 'Full Day (7 Hours)',
    price: 75,
    rating: 4.9,
    reviewsCount: 390,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Snorkeling & Diving',
    badge: 'Top Rated',
    description: 'Submerge into the legendary coral gardens of Ras Mohammed and Giftun Island, home to over 1,000 species of marine life, manta rays, and playful wild dolphins, aboard a private luxury sea cruiser.',
    highlights: [
      'Explore pristine coral reef walls with 30+ meter underwater visibility',
      'Guidance by certified PADI Dive Masters & marine biologists',
      'Complimentary top-tier snorkel gear, wetsuits, and flotation devices',
      'Fresh seafood buffet lunch served on the spacious sun deck'
    ],
    practicalInfo: {
      timing: '08:30 AM marina departure; 04:00 PM return',
      dressCode: 'Swimwear, sun hat, UV rashguard, biodegradable reef-safe sunscreen',
      physicalLevel: 'Easy to Moderate (swimming proficiency recommended)',
      included: [
        'Private or small-group yacht cruise to two distinct coral reef sites',
        'All snorkeling gear, fins, masks, and life vests',
        'Chef-prepared buffet lunch and unlimited hot & cold soft drinks',
        'National park marine conservation marine permits'
      ]
    },
    inquiryCta: 'Inquire for Marine Yacht',
    featured: false
  },
  {
    id: 'nubian-village',
    slug: 'nubian-village',
    title: 'Authentic Nubian Village Cultural Encounter',
    location: 'Aswan',
    duration: 'Half Day (4 hrs)',
    price: 50,
    rating: 4.8,
    reviewsCount: 290,
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Cultural',
    badge: 'Authentic',
    description: 'Cross the Nile by private motor launch to the brightly painted villages of Soheil Island. Meet welcoming Nubian families, learn about ancient heritage that predates pharaonic dynasties, and browse handmade aromatic spices and woven palm crafts.',
    highlights: [
      'Scenic boat passage through the Nile’s granite boulders and bird sanctuaries',
      'Visit a traditional domed Nubian home with colorful geometric frescoes',
      'Sip sweet cinnamon and mint tea with village elders',
      'Optional henna tattoo application and spice market discovery'
    ],
    practicalInfo: {
      timing: 'Morning (09:00 AM) or late afternoon (14:30 PM)',
      dressCode: 'Respectful modest clothing covering knees and shoulders',
      physicalLevel: 'Easy (short walking over sandy village paths)',
      included: [
        'Private boat roundtrip from Aswan dock to Soheil Island',
        'Local resident guide sharing oral Nubian history and language',
        'Traditional tea and hospitality in a family home'
      ]
    },
    inquiryCta: 'Experience Nubian Culture',
    featured: false
  },
  {
    id: 'egyptian-food-tour',
    slug: 'egyptian-food-tour',
    title: 'Old Cairo Culinary & Historic Street Food Safari',
    location: 'Cairo',
    duration: '4 Hours',
    price: 55,
    rating: 4.9,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Food',
    badge: 'Popular',
    description: 'Wander through the buzzing culinary alleys of historic Cairo, savoring authentic fava bean falafel, steaming bowls of koshari, freshly baked baladi bread from stone ovens, and artisanal oriental sweets.',
    highlights: [
      '6+ authentic food tastings at revered heritage food stalls',
      'Historic walk through Khan El Khalili alleys and Bab Zuweila',
      'Traditional tea and conversation at the legendary El Fishawy Cafe',
      'Discover secret family recipes handed down across generations'
    ],
    practicalInfo: {
      timing: 'Evening departures (17:00 PM) when food bazaars are most vibrant',
      dressCode: 'Comfortable walking shoes and casual evening attire',
      physicalLevel: 'Easy (slow-paced walking with multiple seated food stops)',
      included: [
        'Dedicated local food specialist guide',
        'All food tastings, street snacks, juices, and tea',
        'Private hotel pickup and return'
      ]
    },
    inquiryCta: 'Taste Historic Cairo',
    featured: false
  }
];
