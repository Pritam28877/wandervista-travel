import { NextRequest, NextResponse } from 'next/server';
import { readDB, mutateDB, genId } from '@/lib/db';
import type { Enquiry } from '@/lib/types';

export async function GET() {
  const db = await readDB();
  return NextResponse.json({ items: db.enquiries, total: db.enquiries.length });
}

// POST /api/enquiries — quick enquiry / callback / newsletter
export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Enquiry>;
  if (!body.name || !body.phone) {
    return NextResponse.json({ error: 'name and phone are required' }, { status: 400 });
  }
  const enquiry = await mutateDB((db) => {
    const record: Enquiry = {
      id: genId('enq'),
      name: body.name!,
      email: body.email ?? '',
      phone: body.phone!,
      destination: body.destination ?? '',
      message: body.message ?? '',
      createdAt: new Date().toISOString(),
    };
    db.enquiries.unshift(record);
    return record;
  });
  return NextResponse.json(enquiry, { status: 201 });
}
