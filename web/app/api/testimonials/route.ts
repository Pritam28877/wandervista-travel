import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export async function GET() {
  const db = await readDB();
  return NextResponse.json({ items: db.testimonials, total: db.testimonials.length });
}
