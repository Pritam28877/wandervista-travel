import { NextRequest, NextResponse } from 'next/server';
import { readDB, mutateDB, slugify } from '@/lib/db';
import type { Blog } from '@/lib/types';

type Ctx = { params: Promise<{ slug: string }> };

// Resolve by slug OR id (admin edits use id).
function match(b: Blog, key: string) {
  return b.slug === key || b.id === key;
}

// GET /api/blogs/:slug  (increments view count for published posts)
export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const blog = await mutateDB((db) => {
    const found = db.blogs.find((b) => match(b, slug));
    if (found && found.status === 'published') found.views += 1;
    return found;
  });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const db = await readDB();
  const related = db.blogs
    .filter((b) => b.id !== blog.id && b.status === 'published' && (b.category === blog.category || b.tags.some((t) => blog.tags.includes(t))))
    .slice(0, 3);

  return NextResponse.json({ blog, related });
}

// PUT /api/blogs/:slug — update
export async function PUT(req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const patch = (await req.json()) as Partial<Blog>;
  const updated = await mutateDB((db) => {
    const blog = db.blogs.find((b) => match(b, slug));
    if (!blog) return null;
    Object.assign(blog, patch, {
      slug: patch.slug?.trim() || (patch.title ? slugify(patch.title) : blog.slug),
      updatedAt: new Date().toISOString(),
      publishedAt:
        patch.status === 'published' && !blog.publishedAt
          ? new Date().toISOString()
          : patch.publishedAt ?? blog.publishedAt,
    });
    return blog;
  });
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE /api/blogs/:slug
export async function DELETE(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const ok = await mutateDB((db) => {
    const i = db.blogs.findIndex((b) => match(b, slug));
    if (i === -1) return false;
    db.blogs.splice(i, 1);
    return true;
  });
  if (!ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
