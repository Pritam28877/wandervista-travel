'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdminShell } from './AdminShell';
import { useCreateBlog, useUpdateBlog } from '@/lib/hooks';
import type { Blog, BlogStatus } from '@/lib/types';

const CATEGORIES = ['adventure', 'india', 'international', 'honeymoon', 'budget', 'weekend', 'food', 'tips'];
const catClass: Record<string, string> = {
  adventure: 'cat-adventure', india: 'cat-india', international: 'cat-international',
  honeymoon: 'cat-honeymoon', budget: 'cat-budget', weekend: 'cat-weekend', food: 'cat-food', tips: 'cat-tips',
};

export function BlogEditor({ existing }: { existing?: Blog }) {
  const router = useRouter();
  const create = useCreateBlog();
  const update = useUpdateBlog();
  const isEdit = !!existing;

  const [form, setForm] = useState({
    title: existing?.title ?? '',
    slug: existing?.slug ?? '',
    excerpt: existing?.excerpt ?? '',
    content: existing?.content ?? '',
    category: existing?.category ?? 'adventure',
    coverImage: existing?.coverImage ?? 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=900&q=80',
    status: (existing?.status ?? 'draft') as BlogStatus,
    featured: existing?.featured ?? false,
    tags: existing?.tags ?? [],
  });
  const [tagInput, setTagInput] = useState('');

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = (status: BlogStatus) => {
    const payload = { ...form, status };
    if (isEdit) {
      update.mutate({ slug: existing!.id, data: payload }, { onSuccess: () => router.push('/admin/blogs') });
    } else {
      create.mutate(payload, { onSuccess: () => router.push('/admin/blogs') });
    }
  };

  const busy = create.isPending || update.isPending;

  return (
    <AdminShell
      title={isEdit ? 'Edit Post' : 'New Post'}
      breadcrumb={<><a href="/admin/blogs">Blog Posts</a> &nbsp;/&nbsp; {isEdit ? form.title || 'Untitled' : 'New Post'}</>}
      actions={
        <>
          <button className="btn btn-secondary" disabled={busy} onClick={() => save('draft')}>Save Draft</button>
          <button className="btn btn-primary" disabled={busy} onClick={() => save('published')}>
            <i className="fas fa-paper-plane" /> {busy ? 'Saving…' : 'Publish'}
          </button>
        </>
      }
    >
      <div className="editor-grid">
        <div className="editor-main">
          <div className="admin-card">
            <div className="admin-card-body">
              <div className="form-group">
                <label className="form-label">Post Title</label>
                <input className="form-input editor-title" placeholder="Catchy headline…" value={form.title} onChange={(e) => set('title', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Slug <small className="form-hint">Leave blank to auto-generate from title</small></label>
                <div className="slug-input">
                  <span className="slug-prefix">wandervista.com/blogs/</span>
                  <input value={form.slug} placeholder="auto" onChange={(e) => set('slug', e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Excerpt</label>
                <textarea className="form-input" rows={3} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header"><h3>Featured Image</h3></div>
            <div className="admin-card-body">
              <div className="upload-preview">
                {form.coverImage && <img src={form.coverImage} alt="" />}
              </div>
              <div className="form-group" style={{ marginTop: 'var(--space-4)' }}>
                <label className="form-label">Image URL</label>
                <input className="form-input" value={form.coverImage} onChange={(e) => set('coverImage', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header"><h3>Content</h3></div>
            <div className="admin-card-body" style={{ padding: 0 }}>
              <textarea
                className="editor-content"
                placeholder="Write in markdown — ## heading, - list, > quote, **bold**"
                value={form.content}
                onChange={(e) => set('content', e.target.value)}
              />
            </div>
            <div className="admin-card-footer" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--gray-500)', fontSize: '0.85rem' }}>
              <span>{form.content.trim() ? form.content.trim().split(/\s+/).length : 0} words · ~{Math.max(1, Math.round((form.content.split(/\s+/).length || 0) / 200))} min read</span>
            </div>
          </div>
        </div>

        <aside className="editor-side">
          <div className="admin-card">
            <div className="admin-card-header"><h3>Publish</h3></div>
            <div className="admin-card-body">
              <div className="publish-row">
                <span><i className="fas fa-circle st-published" /> Status</span>
                <select className="form-input" value={form.status} onChange={(e) => set('status', e.target.value as BlogStatus)}>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
              <div className="publish-row">
                <span><i className="fas fa-star" /> Featured</span>
                <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
              </div>
              <div className="publish-actions">
                <button className="btn btn-secondary" style={{ flex: 1 }} disabled={busy} onClick={() => save('draft')}>Save Draft</button>
                <button className="btn btn-primary" style={{ flex: 1 }} disabled={busy} onClick={() => save('published')}><i className="fas fa-paper-plane" /> Publish</button>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header"><h3>Category</h3></div>
            <div className="admin-card-body">
              {CATEGORIES.map((c) => (
                <label className="cat-radio" key={c}>
                  <input type="radio" name="cat" checked={form.category === c} onChange={() => set('category', c)} />{' '}
                  <span className={`cat-pill ${catClass[c]}`}>{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header"><h3>Tags</h3></div>
            <div className="admin-card-body">
              <div className="tag-input">
                {form.tags.map((t) => (
                  <span className="tag-chip" key={t}>
                    {t} <button onClick={() => set('tags', form.tags.filter((x) => x !== t))}>×</button>
                  </span>
                ))}
                <input
                  placeholder="Add a tag…"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && tagInput.trim()) {
                      e.preventDefault();
                      if (!form.tags.includes(tagInput.trim())) set('tags', [...form.tags, tagInput.trim()]);
                      setTagInput('');
                    }
                  }}
                />
              </div>
              <small className="form-hint">Press Enter after each tag</small>
            </div>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}
