import type {
  Blog,
  Package,
  CommunityTrip,
  Booking,
  Enquiry,
  Testimonial,
  Paginated,
} from './types';

// Works both on server (absolute URL via env) and client (relative).
const BASE =
  typeof window === 'undefined'
    ? process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:${process.env.PORT ?? 4000}`
    : '';

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    ...init,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status}: ${msg}`);
  }
  return res.json() as Promise<T>;
}

const qs = (params: Record<string, string | number | boolean | undefined>) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== '' && v !== 'all') sp.set(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : '';
};

export interface BlogFilters {
  category?: string;
  status?: string;
  search?: string;
  featured?: boolean;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export interface PackageFilters {
  region?: string;
  type?: string;
  search?: string;
  maxPrice?: number;
  sort?: string;
  page?: number;
  pageSize?: number;
}

export const api = {
  // Blogs
  listBlogs: (f: BlogFilters = {}) => http<Paginated<Blog>>(`/api/blogs${qs(f as never)}`),
  getBlog: (slug: string) => http<{ blog: Blog; related: Blog[] }>(`/api/blogs/${slug}`),
  createBlog: (data: Partial<Blog>) => http<Blog>(`/api/blogs`, { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (slug: string, data: Partial<Blog>) =>
    http<Blog>(`/api/blogs/${slug}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (slug: string) => http<{ ok: true }>(`/api/blogs/${slug}`, { method: 'DELETE' }),

  // Packages
  listPackages: (f: PackageFilters = {}) => http<Paginated<Package>>(`/api/packages${qs(f as never)}`),
  getPackage: (slug: string) => http<{ pkg: Package; related: Package[] }>(`/api/packages/${slug}`),

  // Community trips
  listCommunityTrips: (month?: string) =>
    http<{ items: CommunityTrip[]; total: number }>(`/api/community-trips${qs({ month })}`),

  // Bookings
  listBookings: () => http<{ items: Booking[]; total: number }>(`/api/bookings`),
  createBooking: (data: Partial<Booking>) =>
    http<Booking>(`/api/bookings`, { method: 'POST', body: JSON.stringify(data) }),

  // Enquiries
  createEnquiry: (data: Partial<Enquiry>) =>
    http<Enquiry>(`/api/enquiries`, { method: 'POST', body: JSON.stringify(data) }),

  // Testimonials
  listTestimonials: () => http<{ items: Testimonial[]; total: number }>(`/api/testimonials`),
};
