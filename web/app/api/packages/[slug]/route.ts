import { NextRequest, NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

type Ctx = { params: Promise<{ slug: string }> };

// GET /api/packages/:slug
export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const db = await readDB();
  const pkg = db.packages.find((p) => p.slug === slug || p.id === slug);
  if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const related = db.packages.filter((p) => p.id !== pkg.id && p.region === pkg.region).slice(0, 3);
  return NextResponse.json({ pkg, related });
}
