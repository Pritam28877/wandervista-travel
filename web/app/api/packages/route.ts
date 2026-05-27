import { NextRequest, NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import { paginate, parseIntParam } from '@/lib/query';
import type { Package } from '@/lib/types';

// GET /api/packages?region=&type=&search=&maxPrice=&sort=&page=&pageSize=
export async function GET(req: NextRequest) {
  const db = await readDB();
  const sp = req.nextUrl.searchParams;
  const region = sp.get('region');
  const type = sp.get('type');
  const search = sp.get('search')?.toLowerCase().trim();
  const maxPrice = sp.get('maxPrice');
  const sort = sp.get('sort') ?? 'popularity';

  let items: Package[] = [...db.packages];

  if (region && region !== 'all') items = items.filter((p) => p.region === region);
  if (type && type !== 'all') items = items.filter((p) => p.type === type);
  if (maxPrice) items = items.filter((p) => p.priceFrom <= Number(maxPrice));
  if (search) {
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(search) ||
        p.route.toLowerCase().includes(search) ||
        p.type.toLowerCase().includes(search),
    );
  }

  items.sort((a, b) => {
    switch (sort) {
      case 'price-low': return a.priceFrom - b.priceFrom;
      case 'price-high': return b.priceFrom - a.priceFrom;
      case 'duration': return a.durationDays - b.durationDays;
      case 'rating': return b.rating - a.rating;
      default: return b.reviews - a.reviews; // popularity
    }
  });

  const page = parseIntParam(sp.get('page'), 1);
  const pageSize = parseIntParam(sp.get('pageSize'), 12);
  return NextResponse.json(paginate(items, page, pageSize));
}
