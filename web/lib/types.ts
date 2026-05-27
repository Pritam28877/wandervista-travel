// Shared domain types used across API, data layer and UI.

export type BlogStatus = 'published' | 'draft' | 'scheduled';

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // markdown-ish
  category: string; // matches a BlogCategory key
  tags: string[];
  coverImage: string;
  author: { name: string; role: string; avatar: string };
  status: BlogStatus;
  readMinutes: number;
  views: number;
  featured: boolean;
  publishedAt: string | null; // ISO
  createdAt: string;
  updatedAt: string;
}

export interface Package {
  id: string;
  slug: string;
  title: string;
  route: string;
  region: 'india' | 'international' | 'weekend';
  type: string; // family | honeymoon | adventure | roadtrip | ...
  durationDays: number;
  durationNights: number;
  priceFrom: number;
  rating: number;
  reviews: number;
  image: string;
  badge: string;
  highlights: string[];
}

export interface CommunityTrip {
  id: string;
  title: string;
  image: string;
  priceFrom: number;
  priceWas: number;
  durationLabel: string; // "5N/6D"
  location: string;
  dates: string;
  month: string; // "MAY '26"
}

export interface Booking {
  id: string;
  packageId: string;
  packageTitle: string;
  name: string;
  email: string;
  phone: string;
  travellers: number;
  date: string; // travel date
  status: 'pending' | 'confirmed' | 'cancelled';
  amount: number;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  trip: string;
  date: string;
  rating: number;
  text: string;
}

export interface Database {
  blogs: Blog[];
  packages: Package[];
  communityTrips: CommunityTrip[];
  bookings: Booking[];
  enquiries: Enquiry[];
  testimonials: Testimonial[];
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
