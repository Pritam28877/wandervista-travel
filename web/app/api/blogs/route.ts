import { NextRequest, NextResponse } from 'next/server';
import { readDB, mutateDB, genId, slugify } from '@/lib/db';
import { paginate, parseIntParam } from '@/lib/query';
import type { Blog } from '@/lib/types';

// GET /api/blogs?category=&status=&search=&featured=&page=&pageSize=
export async function GET(req: NextRequest) {
  const db = await readDB();
  const sp = req.nextUrl.searchParams;
  const category = sp.get('category');
  const status = sp.get('status');
  const search = sp.get('search')?.toLowerCase().trim();
  const featured = sp.get('featured');
  const sort = sp.get('sort') ?? 'newest';

  let items: Blog[] = [...db.blogs];

  if (category && category !== 'all') items = items.filter((b) => b.category === category);
  if (status && status !== 'all') items = items.filter((b) => b.status === status);
  if (featured === 'true') items = items.filter((b) => b.featured);
  if (search) {
    items = items.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.excerpt.toLowerCase().includes(search) ||
        b.tags.some((t) => t.toLowerCase().includes(search)) ||
        b.author.name.toLowerCase().includes(search),
    );
  }

  items.sort((a, b) => {
    if (sort === 'most-read') return b.views - a.views;
    const da = a.publishedAt ?? a.createdAt;
    const dbb = b.publishedAt ?? b.createdAt;
    return sort === 'oldest'
      ? new Date(da).getTime() - new Date(dbb).getTime()
      : new Date(dbb).getTime() - new Date(da).getTime();
  });

  const page = parseIntParam(sp.get('page'), 1);
  const pageSize = parseIntParam(sp.get('pageSize'), 9);
  return NextResponse.json(paginate(items, page, pageSize));
}

// POST /api/blogs — create
export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<Blog>;
  if (!body.title) {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }
  const nowIso = new Date().toISOString();
  const blog: Blog = {
    id: genId('blg'),
    slug: body.slug?.trim() || slugify(body.title),
    title: body.title,
    excerpt: body.excerpt ?? '',
    content: body.content ?? '',
    category: body.category ?? 'tips',
    tags: body.tags ?? [],
    coverImage: body.coverImage ?? 'https://picsum.photos/seed/blog/1200/800',
    author: body.author ?? { name: 'Arjun Mehta', role: 'Editor', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&q=80' },
    status: body.status ?? 'draft',
    readMinutes: body.readMinutes ?? Math.max(1, Math.round((body.content?.split(/\s+/).length ?? 0) / 200)),
    views: 0,
    featured: body.featured ?? false,
    publishedAt: (body.status ?? 'draft') === 'published' ? nowIso : body.publishedAt ?? null,
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  await mutateDB((db) => {
    db.blogs.unshift(blog);
  });
  return NextResponse.json(blog, { status: 201 });
}
