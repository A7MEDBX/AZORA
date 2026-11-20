import { TeamMember, Review } from '@/types';

export const teamMembers: TeamMember[] = [
  {
    id: 'dr-karim-al-sayed',
    name: 'Dr. Karim Al-Sayed',
    role: 'Chief Egyptology Curator & Founder',
    bio: 'Former senior field researcher at Karnak and Giza with over 25 years of archaeological leadership. Dr. Karim personally crafts our historical routes and trains our elite guide cadre.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    qualifications: ['Ph.D. in Egyptology (Sorbonne / Cairo University)', 'Ministry of Tourism License #1042', '25+ Years Curatorial Guidance']
  },
  {
    id: 'layla-mansour',
    name: 'Layla Mansour',
    role: 'Head of Bespoke Journeys & Hospitality',
    bio: 'With a decade in high-end luxury hospitality between Cairo and Switzerland, Layla oversees our VIP client services, boutique hotel partnerships, and private jet charters.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    qualifications: ['École Hôtelière de Lausanne Graduate', 'Luxury Travel Guild Board Member', 'Fluent in English, French, and Arabic']
  },
  {
    id: 'captain-tarek-rashid',
    name: 'Captain Tarek Rashid',
    role: 'Director of Flotilla & River Navigation',
    bio: 'Born to a generational river-faring family in Aswan, Captain Tarek has commanded sailing craft on the Nile for three decades, overseeing our Dahabiya fleet safety and pristine island moorings.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    qualifications: ['Certified Master River Captain', 'Aswan Navigational Guild Elder', 'Safety & Marine Conservation Officer']
  }
];

export const reviews: Review[] = [
  {
    id: 'review-1',
    author: 'Eleanor & Charles Sterling',
    rating: 5,
    date: 'October 2026',
    location: 'London, United Kingdom',
    text: 'Our 10-day Dahabiya voyage exceeded every dream. Having a private Egyptologist explain the astronomical murals of Seti I with no one else in the tomb was an experience we will cherish for life.',
    tourOrCruiseName: 'The Pharaoh’s Sanctuary: Cairo & Private Dahabiya'
  },
  {
    id: 'review-2',
    author: 'David & Sophia Chen',
    rating: 5,
    date: 'September 2026',
    location: 'San Francisco, USA',
    text: 'From the tarmac meet-and-assist in Cairo to the private sunrise opening of the Grand Egyptian Museum, Vibes of Egypt delivered seamless white-glove service. Truly world-class.',
    tourOrCruiseName: 'The Classic Egypt: Cairo & Luxury Nile Cruise'
  },
  {
    id: 'review-3',
    author: 'Markus & Beatrice Weber',
    rating: 5,
    date: 'November 2026',
    location: 'Zurich, Switzerland',
    text: 'Glamping under the Milky Way in the White Desert with Bedouin hosts was unforgettable. The logistics, the chef-prepared food, and the private 4x4 were impeccable.',
    tourOrCruiseName: 'White Desert 4x4 Wilderness Safari'
  }
];

export const companyValues = [
  {
    title: 'Pure Archaeological Depth',
    description: 'Every journey is led by university-accredited Egyptologists, transforming monuments from stone ruins into living, breathless sagas of human triumph.'
  },
  {
    title: 'Uncompromised Exclusivity',
    description: '100% private ground logistics, early-access permits, and intimate small-vessel sailings ensure you experience monumental Egypt away from the crowds.'
  },
  {
    title: 'Responsible Heritage Guardianship',
    description: 'We actively fund preservation initiatives at Nubian artisanal villages and adhere to rigorous eco-standards across the Western Desert and Red Sea reefs.'
  }
];
