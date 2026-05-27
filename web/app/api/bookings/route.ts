import { NextRequest, NextResponse } from 'next/server';
import { readDB, mutateDB, genId } from '@/lib/db';
import type { Booking } from '@/lib/types';

// GET /api/bookings (admin)
export async function GET() {
  const db = await readDB();
  const sorted = [...db.bookings].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  return NextResponse.json({ items: sorted, total: sorted.length });
}

// POST /api/bookings — public booking submission
export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Booking>;
  if (!body.name || !body.phone || !body.packageId) {
    return NextResponse.json({ error: 'name, phone and packageId are required' }, { status: 400 });
  }
  const booking = await mutateDB((db) => {
    const pkg = db.packages.find((p) => p.id === body.packageId);
    const travellers = body.travellers ?? 1;
    const record: Booking = {
      id: genId('bkg'),
      packageId: body.packageId!,
      packageTitle: pkg?.title ?? body.packageTitle ?? 'Custom Trip',
      name: body.name!,
      email: body.email ?? '',
      phone: body.phone!,
      travellers,
      date: body.date ?? '',
      status: 'pending',
      amount: (pkg?.priceFrom ?? 0) * travellers,
      createdAt: new Date().toISOString(),
    };
    db.bookings.unshift(record);
    return record;
  });
  return NextResponse.json(booking, { status: 201 });
}
