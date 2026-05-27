import { NextRequest, NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

// GET /api/community-trips?month=MAY '26
export async function GET(req: NextRequest) {
  const db = await readDB();
  const month = req.nextUrl.searchParams.get('month');
  let items = [...db.communityTrips];
  if (month) items = items.filter((t) => t.month === month);
  return NextResponse.json({ items, total: items.length });
}
