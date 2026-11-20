import { Tour } from '@/types';

export const tours: Tour[] = [
  {
    id: 'cairo-pyramids-gem',
    slug: 'cairo-pyramids-gem',
    title: 'Giza Pyramids, Sphinx & Grand Egyptian Museum VIP Tour',
    subheadline: 'Exclusive Egyptologist-led access to the Seven Wonders & Tutankhamun’s treasures',
    category: 'Daily',
    city: 'Cairo & Giza',
    destinationSlug: 'cairo-giza',
    destinationName: 'Cairo & Giza',
    duration: 'Full Day (8 Hours)',
    price: 135,
    rating: 5,
    reviewsCount: 642,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Experience the iconic Giza Plateau and the legendary Grand Egyptian Museum in unparalleled comfort. Stand before the Great Pyramid of Khufu, uncover the enigmatic Great Sphinx, and explore King Tutankhamun’s complete tomb collection with your private accredited Egyptologist.',
    description: 'Begin your journey with private chauffeur pick-up from your Cairo or Giza hotel in a climate-controlled luxury vehicle. Arrive at the Giza Plateau before the mid-day heat. Your personal Egyptologist will unravel the engineering genius and cosmological secrets behind Khufu, Khafre, and Menkaure. Enjoy an optional panoramic camel ride with the trio of pyramids rising on the horizon. Afterward, savor an authentic Egyptian gourmet lunch overlooking the plateau. In the afternoon, proceed with skip-the-line VIP entry to the Grand Egyptian Museum (GEM) to behold Tutankhamun’s gilded chariots, royal thrones, and golden death mask.',
    highlights: [
      'Private accredited Egyptologist guide throughout the day',
      'Skip-the-line VIP entrance to the Grand Egyptian Museum (GEM)',
      'Up-close access to the Great Sphinx and Valley Temple of Khafre',
      'Gourmet lunch with sweeping views of the Giza Plateau',
      'Door-to-door private Mercedes or luxury van transfers'
    ],
    included: [
      'Private licensed Egyptologist guide',
      'All monument and museum entry tickets with VIP lane access',
      'Chauffeured luxury air-conditioned transport',
      'Gourmet lunch at 9 Pyramids Lounge or Mena House',
      'Bottled mineral water, cold Egyptian hibiscus, and towels'
    ],
    excluded: [
      'Entry inside the burial chamber of the Great Pyramid (optional add-on)',
      'Personal gratuities / tipping for guide and driver'
    ],
    inclusions: [
      'Private licensed Egyptologist guide',
      'All monument and museum entry tickets with VIP lane access',
      'Chauffeured luxury air-conditioned transport',
      'Gourmet lunch at 9 Pyramids Lounge or Mena House'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Morning: Giza Plateau & Great Sphinx',
        desc: 'Depart hotel at 08:30 AM. Arrive at the plateau for an in-depth private tour of Khufu and Khafre, followed by the Valley Temple and Sphinx enclosure.',
        duration: '3.5 Hours',
        activity: 'Plateau Exploration & Camel Trek'
      },
      {
        day: 1,
        title: 'Midday: Egyptian Gourmet Lunch',
        desc: 'Savor traditional grilled meats, fresh mezze, and Egyptian dips with uninterrupted panoramic vistas of the nine pyramids.',
        duration: '1.5 Hours',
        activity: 'Panoramic Dining'
      },
      {
        day: 1,
        title: 'Afternoon: The Grand Egyptian Museum (GEM)',
        desc: 'Step into the colossal atrium beneath Ramesses the Great colossus. Tour the Grand Staircase and Tutankhamun’s complete 5,000-piece royal treasure galleries.',
        duration: '3 Hours',
        activity: 'Museum Curated Tour'
      }
    ],
    inquiryInfo: 'Available daily with flexible morning start times. Special private sunrise openings can be arranged upon request.',
    featured: true
  },
  {
    id: 'pyramid-trail-saqqara',
    slug: 'pyramid-trail-saqqara',
    title: 'The Royal Pyramid Evolution: Saqqara, Dahshur & Memphis',
    subheadline: 'Walk inside the Bent and Red Pyramids and explore Djoser’s Step Pyramid complex',
    category: 'Historical & Cultural',
    city: 'Giza & Saqqara',
    destinationSlug: 'cairo-giza',
    destinationName: 'Cairo & Giza',
    duration: 'Full Day (7 Hours)',
    price: 125,
    rating: 4.9,
    reviewsCount: 310,
    badge: 'Archaeology Focus',
    image: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Before Giza existed, pharaonic master builders perfected the art of pyramid construction at Saqqara and Dahshur. This connoisseur tour takes you deep inside the tranquil royal necropolises of the Old Kingdom.',
    description: 'Travel south of Cairo through peaceful date palm groves to Saqqara, where architect Imhotep constructed the world’s first stone monument: the Step Pyramid of King Djoser. Venture inside the subterranean tomb of Mehu and the Pyramid of Unas, adorned with the earliest known Pyramid Texts. Continue to Dahshur to descend inside Pharaoh Sneferu’s Red Pyramid and marvel at the angle-shifting Bent Pyramid, concluding with Memphis, the ancient pharaonic capital.',
    highlights: [
      'Explore Djoser’s Step Pyramid Complex & Imhotep Museum',
      'Descend directly inside the burial chamber of the Red Pyramid',
      'Marvel at the mysterious architectural angle of the Bent Pyramid',
      'View the colossal fallen statue of Ramesses II at ancient Memphis'
    ],
    included: [
      'Private accredited Egyptologist guide',
      'All entrance fees to Saqqara, Dahshur, and Memphis',
      'Interior entry to the Red Pyramid and Pyramid of Unas',
      'Air-conditioned private vehicle and hotel transfers',
      'Farm-to-table countryside lunch'
    ],
    excluded: [
      'Gratuities for guide and driver'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Saqqara Necropolis & Step Pyramid',
        desc: 'Explore Djoser’s limestone enclosure, the Serapeum bull vaults, and high-relief Noble Mastaba tombs.',
        duration: '3.5 Hours'
      },
      {
        day: 1,
        title: 'Dahshur Royal Pyramids',
        desc: 'Climb inside the peaceful Red Pyramid and inspect the unique casing of the Bent Pyramid.',
        duration: '2 Hours'
      },
      {
        day: 1,
        title: 'Open-Air Museum of Memphis',
        desc: 'Visit the first capital of unified Egypt and gaze upon the 10-meter limestone colossus of Ramesses II.',
        duration: '1.5 Hours'
      }
    ],
    featured: true
  },
  {
    id: 'islamic-cairo-citadel',
    slug: 'islamic-cairo-citadel',
    title: 'Historic Cairo, Saladin Citadel & Khan El Khalili Walking Tour',
    subheadline: 'Medieval minarets, Mamluk palaces, and bustling artisanal alleyways',
    category: 'Historical & Cultural',
    city: 'Cairo & Old Town',
    destinationSlug: 'cairo-giza',
    destinationName: 'Cairo & Giza',
    duration: 'Half Day (5 Hours)',
    price: 90,
    rating: 4.8,
    reviewsCount: 280,
    badge: 'Cultural Immersion',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Discover why medieval Cairo was crowned the "City of a Thousand Minarets". Trace centuries of Islamic architecture from the hilltop Citadel down to the vibrant brass and spice quarters of Khan El Khalili.',
    description: 'Ascend to the 12th-century Citadel of Saladin, offering commanding vistas over Cairo’s skyline. Step inside the soaring domes of the Great Mosque of Muhammad Ali, lined with alabaster stone. Stroll down historic Al-Mu’izz Street, the greatest concentration of medieval Islamic architecture in the world, and conclude with mint tea and pastries at the historic El Fishawy Cafe in Khan El Khalili bazaar.',
    highlights: [
      'Citadel of Saladin and the magnificent Alabaster Mosque',
      'Walking tour of Al-Mu’izz Street (UNESCO World Heritage)',
      'Sultan Hassan & Al-Rifa’i monumental mosque architecture',
      'Mint tea and aromatic shisha stop at historic El Fishawy Cafe'
    ],
    included: [
      'Private expert cultural guide',
      'All entry tickets to Citadel, Alabaster Mosque, and historic complexes',
      'Private air-conditioned transfers',
      'Traditional tea and sweets at El Fishawy'
    ],
    excluded: [
      'Personal purchases and tips'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Saladin Citadel & Muhammad Ali Mosque',
        desc: 'Tour the fortress ramparts and grand Ottoman-style alabaster dome.',
        duration: '2 Hours'
      },
      {
        day: 1,
        title: 'Al-Mu’izz Street & Khan El Khalili Souks',
        desc: 'Stroll past Mamluk madrasas, gates, and browse copper craft workshops.',
        duration: '3 Hours'
      }
    ],
    featured: false
  },
  {
    id: 'luxor-east-west-bank',
    slug: 'luxor-east-west-bank',
    title: 'Full-Day Luxor Masterpiece: Valley of the Kings, Karnak & Hatshepsut',
    subheadline: 'The complete Theban royal journey covering both banks of the Nile',
    category: 'Daily',
    city: 'Luxor',
    destinationSlug: 'luxor',
    destinationName: 'Luxor',
    duration: 'Full Day (8 Hours)',
    price: 145,
    rating: 5,
    reviewsCount: 520,
    badge: 'Iconic',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Experience the crown jewels of ancient Thebes in one seamless, private day. Enter subterranean royal tombs in the Valley of the Kings and stand amidst the 134 towering columns of Karnak.',
    description: 'Cross the Nile in the gentle morning light to explore the West Bank. Walk deep into three royal tombs in the Valley of the Kings with your Egyptologist, admiring murals that look freshly painted after 3,000 years. Marvel at the dramatic colonnaded terraces of Queen Hatshepsut’s Temple set against towering limestone cliffs, and pause before the massive Colossi of Memnon. After a leisurely lunch, explore Karnak’s Hypostyle Hall and the grand Luxor Temple.',
    highlights: [
      '3 royal tombs in the Valley of the Kings (Tutankhamun permit available)',
      'Queen Hatshepsut’s Mortuary Temple at Deir el-Bahari',
      'Colossal Hypostyle Hall at Karnak Temple',
      'Luxor Temple connected via the newly restored Avenue of Sphinxes'
    ],
    included: [
      'Private licensed Egyptologist guide',
      'All monument entrance fees',
      'Private luxury air-conditioned vehicle throughout the day',
      'Nile-side gourmet lunch',
      'Cold bottled water and refreshments'
    ],
    excluded: [
      'King Tutankhamun & Seti I special tomb tickets (available as add-ons)',
      'Gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Morning: West Bank Royal Necropolis',
        desc: 'Explore the Valley of the Kings, Hatshepsut Temple, and Colossi of Memnon.',
        duration: '4 Hours'
      },
      {
        day: 1,
        title: 'Midday: Riverside Lunch',
        desc: 'Relax at a traditional riverside restaurant on the Nile bank.',
        duration: '1 Hour'
      },
      {
        day: 1,
        title: 'Afternoon: East Bank Temples',
        desc: 'Walk the majestic halls of Karnak and the Avenue of Sphinxes at Luxor Temple.',
        duration: '3 Hours'
      }
    ],
    featured: true
  },
  {
    id: 'abu-simbel-private-tour',
    slug: 'abu-simbel-private-tour',
    title: 'Abu Simbel Sun Temples: Private Day Expedition',
    subheadline: 'Stand in awe before Ramesses II’s monumental cliff temple on Lake Nasser',
    category: 'Daily',
    city: 'Aswan',
    destinationSlug: 'abu-simbel',
    destinationName: 'Abu Simbel',
    duration: 'Half Day (7 Hours)',
    price: 180,
    rating: 5,
    reviewsCount: 380,
    badge: 'Must See',
    image: 'https://images.unsplash.com/photo-1566192091743-5966a6079984?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1566192091743-5966a6079984?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Journey south across the Nubian desert to Egypt’s most spectacular architectural feat. Behold the four 20-meter seated colossi of Ramesses the Great and the elegant temple dedicated to Queen Nefertari.',
    description: 'Depart Aswan early in a private luxury limousine or SUV across the golden Nubian Sahara. As dawn breaks over Lake Nasser, you will arrive at the colossal cliffside temples of Abu Simbel. Your private Egyptologist will guide you through the intricate battle scenes of Kadesh carved on the inner walls, the astronomical alignment of the inner sanctum, and the miraculous 1960s UNESCO operation that moved the entire mountain 65 meters above the rising floodwaters.',
    highlights: [
      'The Great Temple of Ramesses II with its four mammoth statues',
      'The Temple of Hathor and Queen Nefertari',
      'Fascinating UNESCO engineering salvage exhibition',
      'Scenic private drive across the serene Nubian desert landscape'
    ],
    included: [
      'Private accredited Egyptologist guide',
      'All entry tickets to Abu Simbel complex',
      'Private luxury vehicle with professional chauffeur and police permits',
      'Breakfast box and cold refreshments'
    ],
    excluded: [
      'Tipping and personal expenses'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Desert Drive from Aswan',
        desc: 'Relax in air-conditioned comfort as you travel across the southern desert.',
        duration: '3 Hours'
      },
      {
        day: 1,
        title: 'Private Exploration of Abu Simbel',
        desc: 'In-depth tour of both temples and the UNESCO rescue documentation center.',
        duration: '2.5 Hours'
      },
      {
        day: 1,
        title: 'Return to Aswan',
        desc: 'Return to your Aswan hotel or cruise ship in time for lunch.',
        duration: '3 Hours'
      }
    ],
    featured: true
  },
  {
    id: 'white-desert-safari-overnight',
    slug: 'white-desert-safari-overnight',
    title: 'White & Black Desert 4x4 Wilderness Safari & Bedouin Camp',
    subheadline: 'Surreal chalk sculptures, crystal mountains, and starlit glamping',
    category: 'Adventure & Safari',
    city: 'White Desert',
    destinationSlug: 'white-desert',
    destinationName: 'White Desert',
    duration: '2 Days / 1 Night',
    price: 240,
    rating: 4.9,
    reviewsCount: 195,
    badge: 'Adventure',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Leave civilization behind and venture deep into the surreal landscapes of the Western Desert. Gaze at volcanic peaks in the Black Desert, marvel at sparkling Crystal Mountain, and camp in luxury under the stars in the White Desert.',
    description: 'Depart Cairo by private vehicle to Bahariya Oasis, where your high-clearance 4WD expedition team awaits. Traverse the dramatic basalt cones of the Black Desert, sandboard down towering dunes in the Agabat Valley, and wander among glowing calcite crystals. At twilight, enter the White Desert National Park, where wind-carved chalk monoliths resemble surreal modern art. Gather around a crackling Bedouin campfire for a freshly roasted lamb dinner before sleeping under a diamond canopy of stars.',
    highlights: [
      '4x4 Dune driving and sandboarding in the Agabat Valley',
      'Sunset among the mushroom and sphinx chalk formations',
      'Bedouin campfire barbecue feast with fresh desert bread',
      'Luxury tented desert camp with comfortable bedding and blankets'
    ],
    included: [
      'Roundtrip private transport from Cairo and 4x4 desert vehicle',
      'Experienced Bedouin desert navigators and English-speaking guide',
      'All camping gear (tents, mattresses, warm sleeping bags)',
      'All meals, barbecue dinner, snacks, and unlimited mineral water',
      'National park permits and conservation fees'
    ],
    excluded: [
      'Personal items and tips'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Cairo to Bahariya & Black Desert',
        desc: 'Drive to the oasis, transition to 4x4, and explore volcanic peaks and Crystal Mountain.',
        duration: 'Day 1'
      },
      {
        day: 2,
        title: 'White Desert Sunrise & Return',
        desc: 'Watch the sunrise turn chalk towers pink and gold. Morning tea, exploration, and drive back to Cairo.',
        duration: 'Day 2'
      }
    ],
    featured: true
  },
  {
    id: 'alexandria-greco-roman-day-tour',
    slug: 'alexandria-greco-roman-day-tour',
    title: 'Alexandria Day Tour: Bibliotheca, Catacombs & Qaitbay Citadel',
    subheadline: 'The Mediterranean soul and classical antiquity of Alexander’s city',
    category: 'Daily',
    city: 'Alexandria',
    destinationSlug: 'alexandria',
    destinationName: 'Alexandria',
    duration: 'Full Day (9 Hours)',
    price: 130,
    rating: 4.8,
    reviewsCount: 220,
    badge: 'Coastal Heritage',
    image: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'A scenic coastal day excursion from Cairo to Alexandria. Discover the Greco-Roman synthesis through Roman catacombs, Pompey’s Pillar, the seaside Citadel of Qaitbay, and the ultra-modern Bibliotheca Alexandrina.',
    description: 'Travel in private luxury along the desert highway to Alexandria. Descend into the multi-level Roman Catacombs of Kom El Shoqafa, where Roman, Greek, and Egyptian funerary art unite. View Pompey’s Pillar, stand where the ancient Lighthouse of Alexandria once guided Mediterranean mariners at the Citadel of Qaitbay, and enjoy a fresh seafood lunch overlooking the harbor. Conclude with a guided tour of the stunning modern Bibliotheca Alexandrina.',
    highlights: [
      'Bibliotheca Alexandrina guided tour and manuscript museum',
      'Subterranean Catacombs of Kom El Shoqafa Roman tombs',
      '15th-century seaside fortress Citadel of Qaitbay',
      'Mediterranean seafood lunch right on the waterfront'
    ],
    included: [
      'Private licensed tour guide',
      'All entrance fees and museum admissions',
      'Private chauffeured luxury vehicle from Cairo and back',
      'Seafood lunch overlooking the Mediterranean'
    ],
    excluded: [
      'Gratuities and personal souvenirs'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Morning: Drive & Catacombs',
        desc: 'Depart Cairo at 07:30 AM. Arrive in Alexandria and tour the Roman Catacombs and Pompey’s Pillar.',
        duration: '4 Hours'
      },
      {
        day: 1,
        title: 'Midday: Citadel & Seafood Lunch',
        desc: 'Tour Qaitbay Fortress followed by a harbor-view Mediterranean lunch.',
        duration: '2.5 Hours'
      },
      {
        day: 1,
        title: 'Afternoon: Bibliotheca Alexandrina',
        desc: 'Visit the world-renowned library complex before returning to Cairo.',
        duration: '2.5 Hours'
      }
    ],
    featured: false
  },
  {
    id: 'cairo-sunset-felucca-food',
    slug: 'cairo-sunset-felucca-food',
    title: 'Sunset Nile Felucca & Old Cairo Culinary Street Food Safari',
    subheadline: 'Taste authentic Egyptian cuisine and sail the Nile during golden hour',
    category: 'Historical & Cultural',
    city: 'Cairo / Nile',
    destinationSlug: 'cairo-giza',
    destinationName: 'Cairo & Giza',
    duration: '4 Hours',
    price: 75,
    rating: 4.9,
    reviewsCount: 260,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85',
    images: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80'
    ],
    overview: 'Glide along the tranquil Nile aboard a private wooden felucca at sunset, then dive into the historic culinary quarters of downtown Cairo to sample Egypt’s most beloved street delicacies.',
    description: 'Begin late in the afternoon with a private sailing aboard a traditional canvas-sailed felucca as Cairo’s skyscrapers and river islands are bathed in amber light. Fresh mint tea and dates are served on deck. Afterward, your foodie host leads you on an insider walk through bustling neighborhoods to savor crispy falafel made with fava beans, authentic koshari, hawawshi spiced flatbreads, and warm honey-drizzled zalabia.',
    highlights: [
      'Private 1-hour sunset felucca sailing on the Nile',
      '6+ authentic food tastings with a dedicated local foodie guide',
      'Discover secret local eateries in downtown Cairo & Bab El Louk',
      'All food and non-alcoholic drinks included'
    ],
    included: [
      'Private felucca boat and skipper',
      'Local foodie guide',
      'All food tastings and beverages',
      'Hotel pickup and drop-off'
    ],
    excluded: [
      'Gratuities'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Sunset Felucca Sailing',
        desc: 'Board your private sailboat on the Nile for twilight views and tea.',
        duration: '1.5 Hours'
      },
      {
        day: 1,
        title: 'Culinary Walking Tour',
        desc: 'Taste local specialties through hidden street food gems.',
        duration: '2.5 Hours'
      }
    ],
    featured: false
  }
];
