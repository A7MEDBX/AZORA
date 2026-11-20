import { Destination } from '@/types';

export const destinations: Destination[] = [
  {
    id: 'cairo-giza',
    slug: 'cairo-giza',
    name: 'Cairo & Giza',
    arabicName: 'القاهرة والجيزة',
    tagline: 'Cradle of Antiquity, Pyramids & Grand Metropolises',
    category: 'Ancient Wonders & Metropolis',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1920&q=85',
    tourCount: 14,
    startingPrice: 120,
    shortDescription: 'Marvel at the Great Pyramids of Giza, the Sphinx, and the treasures of King Tutankhamun inside the world-class Grand Egyptian Museum.',
    description: 'A vibrant tapestry where five millennia of world history seamlessly converge with dynamic modern elegance. From the monumental Giza Plateau guarding the Great Pyramids and the Sphinx to the newly unveiled Grand Egyptian Museum, Cairo offers unscripted wonder at every turn. Wander through the medieval minarets of Islamic Cairo, browse spice-laden alleys in Khan El Khalili bazaar, and savor refined gastronomy overlooking the Nile.',
    highlights: [
      'Private VIP Access to the Grand Egyptian Museum (GEM)',
      'Sunset Camel & Horseback Safari across Giza Plateau',
      'Curated Islamic & Coptic Cairo Heritage Alleys',
      'Exclusive Dinner Cruising along the Nile River'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April (Mild, sunny daytime & crisp desert evenings)',
      currency: 'EGP (Egyptian Pound) / USD widely accepted',
      climate: 'Arid desert climate with comfortable winter temperatures (18°C - 25°C)',
      airport: 'Cairo International Airport (CAI) & Sphinx International (SPX)',
      recommendedStay: '3 - 4 Days',
      localTips: [
        'Book Grand Egyptian Museum VIP permits in advance for private hall entry.',
        'Early morning visits to the Pyramids avoid both crowds and midday heat.',
        'Private chauffeur service is essential for seamless metropolis navigation.'
      ]
    },
    featured: true
  },
  {
    id: 'luxor',
    slug: 'luxor',
    name: 'Luxor',
    arabicName: 'الأقصر',
    tagline: 'The World’s Greatest Open-Air Archaeological Museum',
    category: 'Archaeological Capital',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85',
    tourCount: 11,
    startingPrice: 95,
    shortDescription: 'Unveil the Valley of the Kings, the monumental Karnak Temple, and Queen Hatshepsut’s terraced sanctuary on the West Bank.',
    description: 'Built on the ancient capital of Thebes, Luxor holds an unmatched concentration of monumental architecture. Sail the peaceful Nile to the West Bank to enter subterranean royal tombs adorned with vibrant 3,000-year-old hieroglyphic frescoes in the Valley of the Kings. Gaze in awe at the colossal Hypostyle Hall of Karnak Temple and soar silently in a sunrise hot air balloon over Hatshepsut’s mortuary monument.',
    highlights: [
      'Exclusive Private Opening of Queen Nefertari’s Tomb',
      'Sunrise Hot Air Balloon Flight over Ancient Thebes',
      'Torchlight Night Tour of Illuminated Luxor Temple',
      'Avenue of Sphinxes Walk connecting Karnak to Luxor'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'November to March',
    practicalInfo: {
      bestSeason: 'November to March (Pleasantly warm days, cool starry nights)',
      currency: 'EGP / USD',
      climate: 'Subtropical desert; dry warmth year-round',
      airport: 'Luxor International Airport (LXR)',
      recommendedStay: '2 - 3 Days',
      localTips: [
        'Visit the Valley of the Kings early at 06:00 AM for undisturbed stillness.',
        'Don’t miss Nefertari’s tomb (QV66) in the Valley of the Queens.',
        'Take a private sunset felucca ride around Banana Island.'
      ]
    },
    featured: true
  },
  {
    id: 'aswan',
    slug: 'aswan',
    name: 'Aswan',
    arabicName: 'أسوان',
    tagline: 'Timeless Nile Tranquility & Rich Nubian Soul',
    category: 'Nile & Nubian Heritage',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1566192091743-5966a6079984?auto=format&fit=crop&w=1920&q=85',
    tourCount: 8,
    startingPrice: 85,
    shortDescription: 'Discover the romantic island temple of Philae, emerald granite cataracts, and colorful Nubian traditions on the shores of Lake Nasser.',
    description: 'Egypt’s sunniest southern outpost where the Nile flows at its most poetic, weaving past massive pink granite boulders and emerald islands. Aswan invites unhurried contemplation. Explore the sacred island sanctuary of Goddess Isis at Philae Temple, sip afternoon high tea on the historic terrace of the Sofitel Legend Old Cataract, and sail by private felucca into authentic painted Nubian settlements.',
    highlights: [
      'Boat Crossing to the Sacred Island Temple of Philae',
      'High Tea on the Historic Old Cataract Terrace where Agatha Christie wrote',
      'Private Felucca Cruise around Elephantine Island & Botanical Gardens',
      'Nubian Village Cultural Immersion & Artisanal Spice Markets'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566192091743-5966a6079984?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April',
      currency: 'EGP / USD',
      climate: 'Hyper-arid warm desert sunshine',
      airport: 'Aswan International Airport (ASW)',
      recommendedStay: '2 - 3 Days',
      localTips: [
        'Sunset views from the Old Cataract terrace are unparalleled.',
        'Combine Aswan with an early morning excursion to Abu Simbel.',
        'Purchase authentic hibiscus flowers and Nile spices in the local souk.'
      ]
    },
    featured: true
  },
  {
    id: 'abu-simbel',
    slug: 'abu-simbel',
    name: 'Abu Simbel',
    arabicName: 'أبو سمبل',
    tagline: 'Monumental Colossi of Ramesses II on Lake Nasser',
    category: 'Monumental Archaeology',
    image: 'https://images.unsplash.com/photo-1566192091743-5966a6079984?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1920&q=85',
    tourCount: 4,
    startingPrice: 160,
    shortDescription: 'Witness the four colossal seated statues of Ramesses II carved into the cliff face, rescued from the rising waters of Lake Nasser.',
    description: 'Rising majestically from the tranquil desert waters of southern Lake Nasser, Abu Simbel stands as the supreme testament to pharaonic ambition and modern UNESCO engineering. Carved into a sandstone mountain in the 13th century BC, the twin temples honor Ramesses the Great and his beloved Queen Nefertari, aligned with mathematical precision to illuminate the inner sanctuary during the Sun Festival.',
    highlights: [
      'Twin Mountain-Carved Temples of Ramesses II and Queen Nefertari',
      'Biannual Solar Alignment Phenomenon in the Inner Sanctum',
      'UNESCO Architectural Miracle: Relocation of the Entire Mountain',
      'Desert Flight or Private Lake Nasser Expedition Cruise Arrival'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1566192091743-5966a6079984?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to March (Special Sun Festival in Oct & Feb)',
    practicalInfo: {
      bestSeason: 'October to March',
      currency: 'EGP / USD',
      climate: 'Warm sunny desert climate',
      airport: 'Abu Simbel Airport (ABS) with daily flights from Aswan/Cairo',
      recommendedStay: '1 Day or Overnight for Sound & Light Show',
      localTips: [
        'Fly in on the early morning flight or stay overnight to witness sunrise before day-tripper coaches arrive.',
        'Don’t miss the subtle love poetry inscribed inside Nefertari’s temple.'
      ]
    },
    featured: true
  },
  {
    id: 'alexandria',
    slug: 'alexandria',
    name: 'Alexandria',
    arabicName: 'الإسكندرية',
    tagline: 'Pearl of the Mediterranean & Greco-Roman Legacy',
    category: 'Greco-Roman Coastal',
    image: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?auto=format&fit=crop&w=1920&q=85',
    tourCount: 5,
    startingPrice: 110,
    shortDescription: 'Walk the legendary Corniche, explore the Bibliotheca Alexandrina, and uncover Roman catacombs beneath the Mediterranean waves.',
    description: 'Founded by Alexander the Great in 331 BC, Alexandria balances Mediterranean charm with profound classical legacy. Fanned by sea breezes along its sweeping seaside Corniche, Alexandria reveals subterranean treasures like the Catacombs of Kom El Shoqafa, the historic Citadel of Qaitbay overlooking the ancient Pharos Lighthouse site, and the striking contemporary Bibliotheca Alexandrina.',
    highlights: [
      'Bibliotheca Alexandrina: World-Famous Modern Revival of the Ancient Library',
      'Subterranean Catacombs of Kom El Shoqafa Roman Burial Galleries',
      'Citadel of Qaitbay Standing on the Site of the Ancient Pharos Lighthouse',
      'Fresh Mediterranean Seafood Dining on the Waterfront Corniche'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'April to October',
    practicalInfo: {
      bestSeason: 'Spring through Autumn (Moderate Mediterranean sea breezes)',
      currency: 'EGP / USD',
      climate: 'Mediterranean coastal climate; mild winters and refreshing coastal summers',
      airport: 'Borg El Arab Airport (HBE) or 2.5 hrs luxury transfer from Cairo',
      recommendedStay: '1 - 2 Days',
      localTips: [
        'Pair your visit with an authentic Greek-Alexandrian seafood lunch.',
        'A stroll down the historic Corniche at sunset captures the city’s nostalgic elegance.'
      ]
    },
    featured: false
  },
  {
    id: 'hurghada',
    slug: 'hurghada',
    name: 'Hurghada',
    arabicName: 'الغردقة',
    tagline: 'Red Sea Riviera, Pristine Reefs & Luxury Resorts',
    category: 'Beach & Marine Sanctuary',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
    tourCount: 7,
    startingPrice: 65,
    shortDescription: 'Dive into turquoise waters, lounge on private coral sandbanks, and experience world-class all-inclusive coastal hospitality.',
    description: 'Stretching along the azure coast of the Red Sea, Hurghada is Egypt’s premier beach haven for travelers seeking sublime relaxation, vibrant coral reefs, and year-round sunshine. From private yacht charters to Giftun Island to desert quad biking across rolling Eastern Desert dunes, Hurghada pairs effortless leisure with thrilling outdoor escapades.',
    highlights: [
      'Private Yacht Excursion to Giftun Island and Orange Bay',
      'Scuba Diving & Snorkeling in World-Renowned Coral Gardens',
      'Sunset Quad Biking & Bedouin Dinner in the Eastern Desert',
      'Luxury Waterfront Promenade at Hurghada Marina'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'All Year Round (Prime in Autumn & Spring)',
    practicalInfo: {
      bestSeason: 'Year-round sunshine; March–May and Sept–Nov offer ideal waters',
      currency: 'EGP / EUR / USD',
      climate: 'Subtropical marine desert; dry warm weather',
      airport: 'Hurghada International Airport (HRG)',
      recommendedStay: '3 - 5 Days',
      localTips: [
        'Take a private catamaran to secluded reef drop-offs away from the crowds.',
        'El Gouna, just 25 minutes north, offers high-end lagoons, golf, and dining.'
      ]
    },
    featured: true
  },
  {
    id: 'sharm-el-sheikh',
    slug: 'sharm-el-sheikh',
    name: 'Sharm El Sheikh',
    arabicName: 'شرم الشيخ',
    tagline: 'Sinai’s Crown Jewel & World-Class Diving Capital',
    category: 'Luxury Coastal & Diving',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=85',
    tourCount: 6,
    startingPrice: 75,
    shortDescription: 'Explore the marine biodiversity of Ras Mohammed National Park, luxurious cliffside resorts, and vibrant Sinai nightlife.',
    description: 'Perched on the southern tip of the Sinai Peninsula between the Gulf of Suez and the Gulf of Aqaba, Sharm El Sheikh is celebrated globally for its pristine marine reserves. Ras Mohammed National Park boasts towering coral walls dropping thousands of feet into crystal waters teeming with tropical marine life, while luxury 5-star resorts offer cliffside infinity pools and fine dining.',
    highlights: [
      'Ras Mohammed National Park World-Class Marine Sanctuary',
      'Straits of Tiran Scuba Diving & Dolphin Sightings',
      'Exclusive Sunset Yacht Cruises with Gourmet Seafood',
      'Gateway to Mount Sinai and St. Catherine Monastery Excursions'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'September to May',
    practicalInfo: {
      bestSeason: 'September to May',
      currency: 'EGP / USD',
      climate: 'Arid coastal desert with warm sea temperatures',
      airport: 'Sharm El Sheikh International Airport (SSH)',
      recommendedStay: '3 - 6 Days',
      localTips: [
        'Dive Shark and Yolanda Reefs for peak marine biodiversity.',
        'Consider an overnight extension to climb Mount Sinai for sunrise.'
      ]
    },
    featured: false
  },
  {
    id: 'dahab',
    slug: 'dahab',
    name: 'Dahab',
    arabicName: 'دهب',
    tagline: 'Bohemian Coastal Haven, Blue Hole & Windsurfing',
    category: 'Bohemian Adventure',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1920&q=85',
    tourCount: 4,
    startingPrice: 50,
    shortDescription: 'Relax in relaxed seafront cafes, snorkel the world-famous Blue Hole, and trek the majestic canyons of the Sinai desert.',
    description: 'With its bohemian soul, golden sand beaches, and rugged mountain backdrop, Dahab provides a tranquil, laid-back antidote to bustling resort cities. Renowned worldwide for the underwater abyss of the Blue Hole and the sheltered lagoon of Blue Lagoon, Dahab draws free-divers, kitesurfers, and wellness seekers looking for authenticity and natural peace.',
    highlights: [
      'Snorkeling & Freediving the World-Famous Blue Hole',
      'Boat or Camel Safari to the Remote Ras Abu Galum Nature Reserve',
      'Kite-surfing and Wind-surfing in Dahab Lagoon',
      'Seaside Bedouin Lounges with Fresh Juices and Shisha'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April',
      currency: 'EGP / USD',
      climate: 'Sunny desert seaside with consistent coastal breezes',
      airport: 'Sharm El Sheikh (SSH) + 1 hr private scenic mountain transfer',
      recommendedStay: '2 - 4 Days',
      localTips: [
        'Stay in an eco-boutique hotel along the Lighthouse reef.',
        'Experience dinner under the stars at Wadi Qnai Bedouin camp.'
      ]
    },
    featured: false
  },
  {
    id: 'marsa-alam',
    slug: 'marsa-alam',
    name: 'Marsa Alam',
    arabicName: 'مرسى علم',
    tagline: 'Pristine Southern Reefs, Dugongs & Sea Turtles',
    category: 'Pristine Marine Nature',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
    tourCount: 4,
    startingPrice: 90,
    shortDescription: 'Swim alongside gentle sea turtles and wild dugongs in Abu Dabbab Bay, surrounded by intact virgin coral atolls.',
    description: 'Egypt’s southern frontier on the Red Sea remains an untouched paradise for marine enthusiasts and discerning eco-travelers. Here, crystal turquoise lagoons host resident green sea turtles, rare dugongs (sea cows), and spinning dolphins at Sataya Reef. Far removed from commercial crowds, Marsa Alam offers peaceful eco-luxury resorts nestled between golden desert and crystal sea.',
    highlights: [
      'Swim with Wild Dugongs and Giant Sea Turtles at Abu Dabbab',
      'Sataya Reef (Dolphin House) Snorkeling Expedition',
      'Elphinstone Reef Diving for Advanced Divers & Oceanic Whitetips',
      'Wadi El Gemal National Park Desert & Mangrove Safari'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'September to May',
    practicalInfo: {
      bestSeason: 'Autumn and Spring for crystal underwater visibility',
      currency: 'EGP / EUR / USD',
      climate: 'Warm sunny maritime climate',
      airport: 'Marsa Alam International Airport (RMF)',
      recommendedStay: '3 - 5 Days',
      localTips: [
        'Visit Abu Dabbab Bay early in the morning for calm waters and active feeding turtles.',
        'Wadi El Gemal is a sanctuary for migratory birds and ancient Roman emerald mines.'
      ]
    },
    featured: false
  },
  {
    id: 'siwa-oasis',
    slug: 'siwa-oasis',
    name: 'Siwa Oasis',
    arabicName: 'واحة سيوة',
    tagline: 'Mystic Desert Sanctuary, Salt Lakes & Alexander’s Oracle',
    category: 'Desert Oasis & Eco-Luxury',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85',
    tourCount: 3,
    startingPrice: 180,
    shortDescription: 'Float weightlessly in hyper-saline turquoise pools, explore the mud-brick fortress of Shali, and consult the Oracle of Amun.',
    description: 'Deep in the Western Desert near the Libyan border, Siwa Oasis is an enchanting world unto itself. Famous for its mud-brick fortress of Shali, hundreds of thermal freshwater springs, crystalline turquoise salt lakes where you float effortlessly, and the historic Temple of the Oracle where Alexander the Great was confirmed as the son of Amun.',
    highlights: [
      'Floating in Surreal High-Salinity Turquoise Salt Pools',
      'Sunset at the 13th-Century Mud-Brick Citadel of Shali',
      'Temple of the Oracle of Amun visited by Alexander the Great',
      'Great Sand Sea 4x4 Dune Bashing & Desert Camping'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April (Warm pleasant days, cool desert nights)',
      currency: 'EGP cash preferred in oasis markets',
      climate: 'Continental desert climate',
      airport: 'Private charter flight or scenic overland private vehicle from Cairo / Alexandria',
      recommendedStay: '3 - 4 Days',
      localTips: [
        'Stay at an authentic Kershef eco-lodge built from local clay and salt rock.',
        'Bathe in Cleopatra’s Spring and sample fresh Siwan dates and olive oil.'
      ]
    },
    featured: true
  },
  {
    id: 'white-desert',
    slug: 'white-desert',
    name: 'White Desert',
    arabicName: 'الصحراء البيضاء',
    tagline: 'Surreal Chalk Sculptures & Star-Drenched Wilderness',
    category: 'Wilderness Adventure',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=85',
    tourCount: 3,
    startingPrice: 195,
    shortDescription: 'Camp under billions of stars amidst chalk monoliths shaped like mushrooms, eagles, and surreal towers by desert winds.',
    description: 'A landscape of hypnotic alien beauty in the heart of Egypt’s Western Desert. Millions of years of wind and sand erosion have carved blindingly white calcium-chalk formations into surreal sculptures that resemble colossal mushrooms, sphinxes, and icebergs rising out of golden dunes. An overnight Bedouin camp here under the pristine Milky Way is a transformative travel experience.',
    highlights: [
      'Glamping under the Starlit Sky at the White Desert National Park',
      'Surreal Chalk Formations: The Mushroom, Chicken & Giant Sphinx',
      'Crystal Mountain Sparkle and Agabat Valley Panoramic Dunes',
      'Authentic Campfire Dinner prepared fresh by Bedouin Guides'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April',
      currency: 'EGP',
      climate: 'Desert extremes: warm sunny days, chilly star-filled nights',
      airport: 'Accessible by 4x4 expedition vehicle via Bahariya Oasis from Cairo',
      recommendedStay: '2 Days / 1 Night Camping',
      localTips: [
        'Pack warm thermal layers for nighttime desert stargazing.',
        'High-clearance 4WD vehicles and licensed desert navigators are mandatory.'
      ]
    },
    featured: true
  },
  {
    id: 'black-desert',
    slug: 'black-desert',
    name: 'Black Desert',
    arabicName: 'الصحراء السوداء',
    tagline: 'Volcanic Basalt Cones & Martian Desert Vistas',
    category: 'Geological Wonder',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=85',
    tourCount: 2,
    startingPrice: 150,
    shortDescription: 'Witness dramatic volcanic peaks capped in black dolerite rock contrasting vividly against the golden desert floor.',
    description: 'Formed by ancient volcanic activity millions of years ago, the Black Desert presents an extraordinary geological contrast to the neighboring White Desert. Black dolerite-capped cones rise out of the ochre sands, creating a cinematic, almost Martian panorama. Climbing the English Mountain offers breathtaking 360-degree views across the surreal volcanic valley.',
    highlights: [
      'Climb English Mountain for Epic 360° Volcanic Valley Vistas',
      'Stark Visual Contrast between Dark Basalt Cones and Golden Sands',
      'Ancient Prehistoric Iron & Volcanic Formations',
      'Seamless Connection on the Safari Trail to Bahariya & White Desert'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April',
      currency: 'EGP',
      climate: 'Dry continental desert',
      airport: 'Overland expedition from Cairo via Bahariya Oasis',
      recommendedStay: '1 Day (often paired with White Desert overnight)',
      localTips: [
        'Wear sturdy footwear with grip if you plan to climb the volcanic mounds.',
        'Combine with the nearby hot mineral springs of Bahariya Oasis.'
      ]
    },
    featured: false
  },
  {
    id: 'fayoum',
    slug: 'fayoum',
    name: 'Fayoum Oasis',
    arabicName: 'الفيوم',
    tagline: 'Wadi El Hitan Whales, Magic Lake & Pottery Villages',
    category: 'Nature & Paleontology',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1920&q=85',
    tourCount: 4,
    startingPrice: 95,
    shortDescription: 'Explore the UNESCO fossil valley of prehistoric whales, sandboard giant dunes into Magic Lake, and visit Tunis pottery village.',
    description: 'Located just 90 minutes southwest of Cairo, Fayoum Oasis is an oasis of prehistoric wonders, tranquil lakes, and artistic heritage. Wadi El Hitan (Valley of the Whales), a UNESCO World Heritage site, displays intact 40-million-year-old walking whale skeletons embedded in desert sandstone. Nearby, Tunis Village charms with artisanal terracotta ceramics, boutique eco-lodges, and views over Lake Qarun.',
    highlights: [
      'Wadi El Hitan UNESCO Prehistoric Whale Skeleton Valley',
      'Sandboarding and 4x4 Dune Adventures at Magic Lake',
      'Artisanal Pottery Workshops in Bohemian Tunis Village',
      'Waterfalls of Wadi El Rayan & Bird Watching at Lake Qarun'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to May',
    practicalInfo: {
      bestSeason: 'October to May',
      currency: 'EGP',
      climate: 'Pleasant oasis microclimate with fresh lake breezes',
      airport: '1.5 hrs private chauffeur transfer from Cairo',
      recommendedStay: '1 - 2 Days',
      localTips: [
        'Tunis Village is the premier destination in Egypt for bespoke pottery.',
        'Plan sunset at Magic Lake to watch the water shift colors against the dunes.'
      ]
    },
    featured: false
  },
  {
    id: 'edfu',
    slug: 'edfu',
    name: 'Edfu',
    arabicName: 'إدفو',
    tagline: 'The Monumental Temple of the Falcon God Horus',
    category: 'Nile Shore Archaeology',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1920&q=85',
    tourCount: 3,
    startingPrice: 70,
    shortDescription: 'Step through the towering pylon of Egypt’s best-preserved Ptolemaic temple dedicated to Horus the Falcon.',
    description: 'Positioned midway between Luxor and Aswan along the banks of the Nile, Edfu is home to the Temple of Horus—universally recognized as the most completely preserved ancient temple in Egypt. Shielded by desert sand for two millennia, its mammoth 36-meter-high entrance pylon, intact roofed hypostyle chambers, and sacred golden barque chamber reveal ancient temple liturgy in vivid detail.',
    highlights: [
      'Colossal Black Granite Falcon Statues Guarding the Main Portal',
      'Inscriptions of the Sacred Drama: Mythological Battle of Horus & Seth',
      'Intact Roofed Hypostyle Halls and Royal Sacrificial Chambers',
      'Classic Horse Carriage Ride through the Riverside Town'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April (Standard port of call on Nile Cruises)',
      currency: 'EGP / USD',
      climate: 'Warm Upper Egypt sunshine',
      airport: 'Luxor (LXR) or Aswan (ASW) + Nile Cruise or private vehicle transfer',
      recommendedStay: 'Half Day (Ideal shore excursion)',
      localTips: [
        'Arrive at dawn with your cruise Egyptologist before mid-day heat and large tour parties.',
        'Inspect the walls of the outer corridor for the fascinating Nilometer records.'
      ]
    },
    featured: false
  },
  {
    id: 'kom-ombo',
    slug: 'kom-ombo',
    name: 'Kom Ombo',
    arabicName: 'كوم أمبو',
    tagline: 'Dual Sanctuary of Sobek the Crocodile & Horus the Falcon',
    category: 'Nile Shore Archaeology',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1920&q=85',
    tourCount: 3,
    startingPrice: 65,
    shortDescription: 'Perched on a dramatic bend of the Nile, this unique symmetrical temple honors two rival gods and houses mummified crocodiles.',
    description: 'Dramatically perched on a picturesque promontory overlooking a sweeping bend of the Nile, Kom Ombo is unique in Egyptian architecture. The complex is completely symmetrical, with twin entrances, twin sanctuaries, and paired halls honoring two opposing deities: Sobek the crocodile god of fertility and Horus the Elder the winged falcon god. The site includes ancient medical instrument reliefs and an adjacent Crocodile Mummy Museum.',
    highlights: [
      'Unique Symmetrical Dual Temple Dedicated to Sobek & Horus',
      'Ancient Carved Surgical & Medical Instruments Reliefs',
      'Crocodile Mummy Museum displaying Intact Ancient Reptilian Relics',
      'Spectacular Sunset Moorings directly at the Temple Steps'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April',
      currency: 'EGP / USD',
      climate: 'Upper Egypt sunny dry climate',
      airport: 'Aswan International Airport (45 km south)',
      recommendedStay: 'Half Day (Nile cruise stop)',
      localTips: [
        'Visiting at twilight when the sandstone is lit up against the Nile is unforgettable.',
        'Examine the ancient calendar carvings near the rear sanctuary.'
      ]
    },
    featured: false
  },
  {
    id: 'saint-catherine',
    slug: 'saint-catherine',
    name: 'Saint Catherine',
    arabicName: 'سانت كاترين',
    tagline: 'Mount Sinai Sunrise Trek & Sacred Burning Bush Sanctuary',
    category: 'Spiritual & Pilgrimage',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=85',
    tourCount: 2,
    startingPrice: 120,
    shortDescription: 'Ascend the biblical Mount Sinai for sunrise and visit the world’s oldest continuously inhabited Christian monastery.',
    description: 'Nestled in a remote granite canyon at the foot of Mount Sinai (Jabal Musa), Saint Catherine’s Monastery is a UNESCO World Heritage sanctuary of profound spiritual and historical importance. Founded by Emperor Justinian in the 6th century, it protects the Living Burning Bush, priceless early Christian icons, and one of the world’s oldest libraries. The night trek up Mount Sinai rewards travelers with a sunrise across jagged red peaks.',
    highlights: [
      'Overnight Ascent of Mount Sinai for a Radiant Desert Sunrise',
      'St. Catherine Monastery: The Oldest Continually Inhabited Monastery',
      'The Sacred Relic of the Living Burning Bush',
      'UNESCO-Listed Collection of 6th-Century Encaustic Icons & Manuscripts'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'September to May',
    practicalInfo: {
      bestSeason: 'September to November and March to May',
      currency: 'EGP',
      climate: 'Alpine high-elevation desert: warm days, freezing mountain nights in winter',
      airport: 'Transfers from Sharm El Sheikh (2.5 hrs) or Dahab (1.5 hrs)',
      recommendedStay: '1 - 2 Days',
      localTips: [
        'Dress in warm windproof layers for the summit sunrise.',
        'Local Bedouin guides accompany every mountain trek for safety.'
      ]
    },
    featured: false
  },
  {
    id: 'wadi-el-natrun',
    slug: 'wadi-el-natrun',
    name: 'Wadi El Natrun',
    arabicName: 'وادي النطرون',
    tagline: 'Cradle of Christian Monasticism in the Western Desert',
    category: 'Heritage & Monasteries',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1920&q=85',
    tourCount: 2,
    startingPrice: 100,
    shortDescription: 'Visit the four fortified 4th-century Coptic desert monasteries that preserved monastic scholarship across the millennia.',
    description: 'Located in a natural depression northwest of Cairo along the desert highway to Alexandria, Wadi El Natrun is the historic birthplace of Christian monastic asceticism. Since the 4th century AD, holy hermits and scholars have sought solitude here. Today, four majestic fortified desert monasteries—Deir Anba Bishoy, Deir al-Suryan, Deir al-Baramus, and Deir Abu Maqar—still practice continuous prayer, surrounded by lush date palms.',
    highlights: [
      'Fortified 4th-Century Coptic Monasteries in the Desert',
      'Historic Wall Frescoes & Ancient Syriac Christian Manuscripts',
      'Peaceful Contemplation and Meeting Resident Monks',
      'Ancient Natron Salt Lakes used in Pharaonic Mummification'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April',
      currency: 'EGP',
      climate: 'Temperate desert climate',
      airport: '1 hr luxury private vehicle transfer from Cairo or Alexandria',
      recommendedStay: '1 Day Excursion',
      localTips: [
        'Modest dress covering shoulders and knees is strictly required inside the monasteries.',
        'A wonderful cultural stopover when traveling between Cairo and Alexandria.'
      ]
    },
    featured: false
  },
  {
    id: 'nuweiba',
    slug: 'nuweiba',
    name: 'Nuweiba',
    arabicName: 'نويبع',
    tagline: 'Sinai Eco-Lodges, Colored Canyon & Gulf of Aqaba Serenity',
    category: 'Eco-Lodge & Canyon Trek',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85',
    tourCount: 2,
    startingPrice: 60,
    shortDescription: 'Unwind in beachfront bamboo huts, trek through the kaleidoscopic Colored Canyon, and gaze across the Gulf of Aqaba.',
    description: 'Nuweiba is the peaceful soul of the Sinai coast. Situated between the red-hued granite mountains of the Sinai and the serene blue waters of the Gulf of Aqaba, Nuweiba is legendary for simple eco-chic bamboo camps where the sand meets the sea. Nearby, the famous Colored Canyon presents a hiker’s paradise of winding sandstone narrows glowing with violet, copper, and magenta ribbons.',
    highlights: [
      'Hiking the Prismatic Rock Formations of the Colored Canyon',
      'Beachfront Bamboo Hut Eco-Resorts right on the Coral Sand',
      'Gazing Across the Gulf of Aqaba toward the Mountains of Jordan & Saudi Arabia',
      'Quiet Coral Reef Snorkeling with Zero Boat Crowds'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'October to April',
    practicalInfo: {
      bestSeason: 'October to April',
      currency: 'EGP / USD',
      climate: 'Warm coastal breezes and sunny skies',
      airport: 'Taba Airport or transfer from Sharm El Sheikh / Dahab',
      recommendedStay: '2 - 3 Days',
      localTips: [
        'Hike the Colored Canyon with an experienced local Bedouin guide.',
        'Ideal retreat for digital detox, yoga, and contemplative coastal relaxation.'
      ]
    },
    featured: false
  },
  {
    id: 'ain-sokhna',
    slug: 'ain-sokhna',
    name: 'Ain Sokhna',
    arabicName: 'العين السخنة',
    tagline: 'Warm Gulf Waters & Mount Galala Coastal Luxury',
    category: 'Quick Coastal Getaway',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=85',
    tourCount: 3,
    startingPrice: 85,
    shortDescription: 'Egypt’s closest Red Sea beach to Cairo, featuring warm mineral springs, upscale resorts, and Mount Galala cable car.',
    description: 'Meaning "The Hot Spring" after the thermal sulfuric springs bubbling nearby at Mount Ataka, Ain Sokhna is Cairo’s premier coastal retreat, situated just an hour’s drive from the capital on the Gulf of Suez. With calm swimmable waters year-round, dolphin-watching boat trips, and the state-of-the-art Galala resort city and cable car perched 700 meters above sea level, it provides the ultimate seaside getaway.',
    highlights: [
      'Fast 1-Hour Private Highway Connection from Cairo',
      'Galala Mountain Cable Car with Panoramic Red Sea Views',
      'Private Yacht Charters for Deep-Sea Fishing and Dolphin Watching',
      'Thermal Sulfur Springs and Mountain Spas'
    ],
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
    ],
    bestTimeToVisit: 'Year-Round (Best Oct–May)',
    practicalInfo: {
      bestSeason: 'Year-round; spring and autumn are perfection',
      currency: 'EGP / USD',
      climate: 'Warm sunny maritime climate with tranquil gulf waters',
      airport: '1 hr private transfer from Cairo International Airport (CAI)',
      recommendedStay: '1 - 3 Days',
      localTips: [
        'Perfect coastal weekend addition before or after a cultural Cairo itinerary.',
        'Visit the historic St. Anthony and St. Paul monasteries located in the nearby Galala mountains.'
      ]
    },
    featured: false
  }
];
