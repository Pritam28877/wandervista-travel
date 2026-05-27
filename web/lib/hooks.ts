'use client';

import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { api, type BlogFilters, type PackageFilters } from './api';
import type { Blog, Booking, Enquiry } from './types';

export const keys = {
  blogs: (f: BlogFilters) => ['blogs', f] as const,
  blog: (slug: string) => ['blog', slug] as const,
  packages: (f: PackageFilters) => ['packages', f] as const,
  pkg: (slug: string) => ['package', slug] as const,
  community: (month?: string) => ['community-trips', month] as const,
  bookings: () => ['bookings'] as const,
  testimonials: () => ['testimonials'] as const,
};

/* ---------- Queries ---------- */

export function useBlogs(filters: BlogFilters = {}) {
  return useQuery({
    queryKey: keys.blogs(filters),
    queryFn: () => api.listBlogs(filters),
    placeholderData: keepPreviousData,
  });
}

export function useBlog(slug: string) {
  return useQuery({ queryKey: keys.blog(slug), queryFn: () => api.getBlog(slug), enabled: !!slug });
}

export function usePackages(filters: PackageFilters = {}) {
  return useQuery({
    queryKey: keys.packages(filters),
    queryFn: () => api.listPackages(filters),
    placeholderData: keepPreviousData,
  });
}

export function useCommunityTrips(month?: string) {
  return useQuery({ queryKey: keys.community(month), queryFn: () => api.listCommunityTrips(month) });
}

export function useBookings() {
  return useQuery({ queryKey: keys.bookings(), queryFn: () => api.listBookings() });
}

export function useTestimonials() {
  return useQuery({ queryKey: keys.testimonials(), queryFn: () => api.listTestimonials() });
}

/* ---------- Mutations ---------- */

export function useCreateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Blog>) => api.createBlog(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
}

export function useUpdateBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<Blog> }) => api.updateBlog(slug, data),
    onSuccess: (_d, v) => {
      qc.invalidateQueries({ queryKey: ['blogs'] });
      qc.invalidateQueries({ queryKey: keys.blog(v.slug) });
    },
  });
}

export function useDeleteBlog() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => api.deleteBlog(slug),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
}

export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Booking>) => api.createBooking(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: keys.bookings() }),
  });
}

export function useCreateEnquiry() {
  return useMutation({ mutationFn: (data: Partial<Enquiry>) => api.createEnquiry(data) });
}
