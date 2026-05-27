import type { Database } from './types';

// Initial dataset written to data/db.json on first run.
// This is seed *data* — the API does real filtering/search/pagination/CRUD
// against the persisted store, never returns hardcoded responses.

const now = new Date('2026-05-20T09:00:00Z').toISOString();

export const seedData: Database = {
  blogs: [
    {
      id: 'blg_ladakh_2026',
      slug: 'ladakh-2026-complete-guide-first-time-riders',
      title: 'Ladakh in 2026: The Complete Guide for First-Time Riders',
      excerpt:
        "From altitude acclimatisation to permits, from Pangong to Nubra — the only itinerary you'll need for a safe and unforgettable Leh-Manali highway run.",
      content: `## When to go

The road season runs roughly mid-May to mid-October. If you want both Manali–Leh *and* Srinagar–Leh open, aim for late June to early September.

- **May:** Pangong is iced over. Some passes still closed.
- **June–Aug:** Peak season. Everything open, everything booked.
- **September:** Quiet, cool, gorgeous light.
- **October onwards:** Highway closures begin.

## Acclimatise. Properly.

Leh sits at 3,500m. Spend at least 48 hours doing nothing strenuous — walk the market, eat thukpa, drink water. Skip alcohol completely for the first three days.

> Half the bad Ladakh stories I've heard start with someone landing at Leh and driving to Khardung La the next morning.

## A safe 9-day itinerary

This is the most-tested itinerary I run for first-timers. It builds altitude gradually and keeps drive days under 6 hours.`,
      category: 'adventure',
      tags: ['Ladakh', 'Bike Trip', 'Himalayas', 'Adventure', 'India'],
      coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80',
      author: {
        name: 'Arjun Mehta',
        role: 'Senior Editor',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80',
      },
      status: 'published',
      readMinutes: 7,
      views: 12408,
      featured: true,
      publishedAt: '2026-05-18T09:00:00Z',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'blg_bali_beaches',
      slug: '10-hidden-beaches-in-bali',
      title: '10 Hidden Beaches in Bali Most Tourists Miss',
      excerpt: "Skip the Kuta crowd. These six coves on Bali's east coast are where locals actually swim.",
      content: '## The east coast secret\n\nWhile everyone fights for towel space in Seminyak...',
      category: 'honeymoon',
      tags: ['Bali', 'Beaches', 'Honeymoon'],
      coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80',
      author: { name: 'Priya Mehta', role: 'Writer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80' },
      status: 'published',
      readMinutes: 5,
      views: 8210,
      featured: false,
      publishedAt: '2026-05-12T09:00:00Z',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'blg_kerala_kids',
      slug: 'kerala-with-kids-7-day-itinerary',
      title: 'Kerala with Kids: A 7-Day Itinerary That Actually Works',
      excerpt: "Houseboats, tea estates, and a beach day — pacing that won't fry a 6-year-old.",
      content: '## Day-by-day\n\nKochi, Munnar, Alleppey, Kovalam...',
      category: 'india',
      tags: ['Kerala', 'Family', 'India'],
      coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
      author: { name: 'Rahul Sharma', role: 'Writer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80' },
      status: 'published',
      readMinutes: 6,
      views: 6742,
      featured: false,
      publishedAt: '2026-05-06T09:00:00Z',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'blg_vietnam_budget',
      slug: 'vietnam-under-35k-2026',
      title: "Vietnam Under ₹35K: Yes, It's Actually Possible in 2026",
      excerpt: 'A frank breakdown of flights, hostels and street-food meals across Hanoi, Hoi An and Da Nang.',
      content: '## The numbers\n\nFlights from ₹14k return if you book early...',
      category: 'budget',
      tags: ['Vietnam', 'Budget', 'Backpacking'],
      coverImage: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80',
      author: { name: 'Shruti Gupta', role: 'Writer', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80' },
      status: 'published',
      readMinutes: 4,
      views: 5103,
      featured: false,
      publishedAt: '2026-05-02T09:00:00Z',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'blg_bir_billing',
      slug: 'paragliding-bir-billing-guide',
      title: 'Paragliding at Bir Billing: What Nobody Tells You',
      excerpt: 'Weather, weight limits and what to actually pack — straight from a tandem pilot with 1,200 flights.',
      content: '## Before you fly\n\nThe window is morning or late afternoon...',
      category: 'adventure',
      tags: ['Bir Billing', 'Paragliding', 'Himachal', 'Adventure'],
      coverImage: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=600&q=80',
      author: { name: 'Vikram Khanna', role: 'Contributor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80' },
      status: 'draft',
      readMinutes: 8,
      views: 0,
      featured: false,
      publishedAt: null,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'blg_schengen',
      slug: 'schengen-visa-indians-2026-checklist',
      title: 'Schengen Visa for Indians: 2026 Checklist (Updated)',
      excerpt: 'Embassy timelines, the new financial proof rule, and the appointments hack everyone misses.',
      content: '## Documents\n\nStart 8 weeks out...',
      category: 'international',
      tags: ['Visa', 'Europe', 'How-to'],
      coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80',
      author: { name: 'Ankit Kapoor', role: 'Writer', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&q=80' },
      status: 'scheduled',
      readMinutes: 9,
      views: 0,
      featured: false,
      publishedAt: '2026-05-25T09:00:00Z',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'blg_weekend_delhi',
      slug: '5-weekend-getaways-from-delhi',
      title: "5 Weekend Getaways from Delhi You Haven't Done Yet",
      excerpt: 'Skip Mussoorie. These under-the-radar spots are 4–6 hrs out and still feel like a real escape.',
      content: '## The shortlist\n\n...',
      category: 'weekend',
      tags: ['Weekend', 'Delhi', 'Short trips'],
      coverImage: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80',
      author: { name: 'Neha Singh', role: 'Writer', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&q=80' },
      status: 'published',
      readMinutes: 5,
      views: 3891,
      featured: false,
      publishedAt: '2026-04-18T09:00:00Z',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'blg_bangkok_food',
      slug: 'bangkok-street-food-crawl',
      title: 'A Bangkok Street-Food Crawl for First-Timers',
      excerpt: '12 stalls across Yaowarat and Bang Rak — what to order, what to skip, and how much it actually costs.',
      content: '## Yaowarat after dark\n\n...',
      category: 'food',
      tags: ['Thailand', 'Food', 'Bangkok'],
      coverImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80',
      author: { name: 'Ananya Iyer', role: 'Writer', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&q=80' },
      status: 'published',
      readMinutes: 6,
      views: 4560,
      featured: false,
      publishedAt: '2026-04-12T09:00:00Z',
      createdAt: now,
      updatedAt: now,
    },
  ],

  packages: [
    { id: 'pkg_spiti', slug: 'lahaul-spiti-chandrataal-road-trip', title: 'Lahaul Spiti Chandrataal Road Trip Adventure', route: 'Shimla • Manali • Spiti • Chandrataal', region: 'india', type: 'roadtrip', durationDays: 12, durationNights: 11, priceFrom: 65000, rating: 4.9, reviews: 402, image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=500&q=80', badge: 'Road Trip', highlights: ['All Meals', '4x4 Vehicle', 'Camping', 'Guide'] },
    { id: 'pkg_kerala', slug: 'kerala-backwaters-hills-family-retreat', title: 'Kerala Backwaters & Hills Family Retreat', route: 'Kochi • Munnar • Alleppey • Kovalam', region: 'india', type: 'family', durationDays: 7, durationNights: 6, priceFrom: 32500, rating: 4.8, reviews: 318, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&q=80', badge: 'Family', highlights: ['Houseboat', 'Tea Plantation', 'Ayurveda'] },
    { id: 'pkg_bali', slug: 'bali-romantic-honeymoon-getaway', title: 'Bali Romantic Honeymoon Getaway', route: 'Ubud • Kintamani • Seminyak • Nusa Dua', region: 'international', type: 'honeymoon', durationDays: 6, durationNights: 5, priceFrom: 48999, rating: 4.9, reviews: 256, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80', badge: 'Honeymoon', highlights: ['Private Pool Villa', 'Sunset Cruise', 'Spa'] },
    { id: 'pkg_rajasthan', slug: 'royal-rajasthan-heritage-desert-safari', title: 'Royal Rajasthan Heritage & Desert Safari', route: 'Jaipur • Jodhpur • Udaipur • Jaisalmer', region: 'india', type: 'family', durationDays: 9, durationNights: 8, priceFrom: 38500, rating: 4.7, reviews: 189, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=80', badge: 'Heritage', highlights: ['Palace Stay', 'Camel Safari', 'Cultural Shows'] },
    { id: 'pkg_ladakh', slug: 'ladakh-manali-highway-bike-expedition', title: 'Ladakh Manali Highway Bike Expedition', route: 'Manali • Keylong • Leh • Pangong • Nubra', region: 'india', type: 'adventure', durationDays: 10, durationNights: 9, priceFrom: 34999, rating: 4.8, reviews: 445, image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&q=80', badge: 'Adventure', highlights: ['Royal Enfield', 'Camping', '5 Passes'] },
    { id: 'pkg_thailand', slug: 'thailand-complete-family-holiday', title: 'Thailand Complete Family Holiday Package', route: 'Bangkok • Pattaya • Krabi • Phuket', region: 'international', type: 'family', durationDays: 8, durationNights: 7, priceFrom: 42500, rating: 4.7, reviews: 267, image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&q=80', badge: 'Family', highlights: ['Island Hopping', 'Snorkeling', 'Night Market'] },
    { id: 'pkg_maldives', slug: 'maldives-overwater-luxury', title: 'Maldives Overwater Luxury Escape', route: 'Malé • Maafushi • Private Island', region: 'international', type: 'honeymoon', durationDays: 5, durationNights: 4, priceFrom: 60599, rating: 4.9, reviews: 211, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80', badge: 'Luxury', highlights: ['Overwater Villa', 'Seaplane', 'All Inclusive'] },
    { id: 'pkg_goa', slug: 'goa-weekend-beach-break', title: 'Goa Weekend Beach Break', route: 'North Goa • South Goa', region: 'weekend', type: 'weekend', durationDays: 3, durationNights: 2, priceFrom: 12499, rating: 4.5, reviews: 530, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80', badge: 'Weekend', highlights: ['Beachfront', 'Water Sports', 'Nightlife'] },
  ],

  communityTrips: [
    { id: 'ct_vietnam', title: '6 Days Vietnam Backpacking | Hanoi, Ha Long Bay, Da Nang & Hoi An', image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80', priceFrom: 34999, priceWas: 39999, durationLabel: '5N/6D', location: 'Hanoi Airport', dates: '24 May', month: "MAY '26" },
    { id: 'ct_spiti', title: "8 Days Spiti Bike Trip: Ride to Tibet's Edge via Lepcha La", image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', priceFrom: 27999, priceWas: 32999, durationLabel: '7N/8D', location: 'Delhi - Delhi', dates: '30 May', month: "MAY '26" },
    { id: 'ct_bir', title: '3D Bir Billing Escape: Paragliding, Rajgundha Valley & Prashar Lake', image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?w=600&q=80', priceFrom: 11499, priceWas: 13499, durationLabel: '2N/3D', location: 'Delhi - Delhi', dates: '22 May, 29 May', month: "MAY '26" },
    { id: 'ct_triund', title: '3 Days Triund Trek From Delhi: Dharamkot & McLeodGanj', image: 'https://images.unsplash.com/photo-1597149471895-aaedba48bd9b?w=600&q=80', priceFrom: 7499, priceWas: 9999, durationLabel: '2N/3D', location: 'Delhi - Delhi', dates: '29 May', month: "MAY '26" },
    { id: 'ct_kerala', title: '7 Days Kerala Backwaters & Munnar Tea Hills Experience', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80', priceFrom: 24499, priceWas: 28999, durationLabel: '6N/7D', location: 'Kochi - Trivandrum', dates: '18 May, 25 May', month: "MAY '26" },
  ],

  bookings: [
    { id: 'bkg_1001', packageId: 'pkg_ladakh', packageTitle: 'Ladakh Manali Highway Bike Expedition', name: 'Rahul S.', email: 'rahul@example.com', phone: '+919876543210', travellers: 2, date: '2026-06-12', status: 'confirmed', amount: 69998, createdAt: now },
    { id: 'bkg_1002', packageId: 'pkg_kerala', packageTitle: 'Kerala Backwaters & Hills Family Retreat', name: 'Priya M.', email: 'priya@example.com', phone: '+919812345678', travellers: 4, date: '2026-05-28', status: 'pending', amount: 130000, createdAt: now },
  ],

  enquiries: [],

  testimonials: [
    { id: 'tst_1', name: 'Ankit Kapoor', initials: 'AK', trip: 'Spiti Valley Road Trip', date: 'June 2026', rating: 5, text: 'The Spiti Valley road trip was absolutely life-changing. The itinerary was perfectly paced and every campsite was a slice of heaven.' },
    { id: 'tst_2', name: 'Priya Mehta', initials: 'PM', trip: 'Kerala Family Retreat', date: 'April 2026', rating: 5, text: 'Took my parents on the Kerala backwaters tour for their anniversary. Everything was beyond expectations. Thank you WanderVista!' },
    { id: 'tst_3', name: 'Rahul & Neha', initials: 'RN', trip: 'Bali Honeymoon', date: 'March 2026', rating: 5, text: 'Our Bali honeymoon was a dream come true! Private pool villa, sunset at Tanah Lot, and a surprise dinner. 10/10 would recommend!' },
    { id: 'tst_4', name: 'Vikram Khanna', initials: 'VK', trip: 'Ladakh Bike Expedition', date: 'May 2026', rating: 5, text: 'Did the Ladakh bike expedition with 5 friends. Great bikes, backup vehicle always following. Camping at Pangong was surreal!' },
    { id: 'tst_5', name: 'Shruti Gupta', initials: 'SG', trip: "Women's Special Rajasthan", date: 'Feb 2026', rating: 5, text: 'As a solo female traveler, safety was my priority. The women-only Rajasthan tour exceeded all expectations.' },
  ],
};
