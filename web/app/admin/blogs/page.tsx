'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { useBlogs, useDeleteBlog } from '@/lib/hooks';

const catClass: Record<string, string> = {
  adventure: 'cat-adventure', india: 'cat-india', international: 'cat-international',
  honeymoon: 'cat-honeymoon', budget: 'cat-budget', weekend: 'cat-weekend', food: 'cat-food', tips: 'cat-tips',
};
const statusClass: Record<string, string> = { published: 'st-published', draft: 'st-draft', scheduled: 'st-scheduled' };

function fmt(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
}

export default function AdminBlogsPage() {
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const { data, isLoading } = useBlogs({ status, search, pageSize: 100 });
  const del = useDeleteBlog();

  const items = data?.items ?? [];
  const counts = {
    all: items.length,
    published: items.filter((b) => b.status === 'published').length,
    draft: items.filter((b) => b.status === 'draft').length,
    scheduled: items.filter((b) => b.status === 'scheduled').length,
  };

  return (
    <AdminShell
      title="Blog Posts"
      breadcrumb="Write, edit and publish your travel stories"
      actions={
        <>
          <div className="admin-search">
            <i className="fas fa-search" />
            <input placeholder="Search posts…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Link href="/admin/blogs/new" className="btn btn-primary"><i className="fas fa-plus" /> New Post</Link>
        </>
      }
    >
      <div className="admin-stats">
        <div className="stat-card"><div className="stat-card-header"><div className="stat-card-icon blue"><i className="fas fa-newspaper" /></div></div><div className="stat-card-value">{counts.published}</div><div className="stat-card-label">Published</div></div>
        <div className="stat-card"><div className="stat-card-header"><div className="stat-card-icon orange"><i className="fas fa-pencil" /></div></div><div className="stat-card-value">{counts.draft}</div><div className="stat-card-label">Drafts</div></div>
        <div className="stat-card"><div className="stat-card-header"><div className="stat-card-icon green"><i className="fas fa-clock" /></div></div><div className="stat-card-value">{counts.scheduled}</div><div className="stat-card-label">Scheduled</div></div>
        <div className="stat-card"><div className="stat-card-header"><div className="stat-card-icon blue"><i className="fas fa-eye" /></div></div><div className="stat-card-value">{items.reduce((s, b) => s + b.views, 0).toLocaleString('en-IN')}</div><div className="stat-card-label">Total Views</div></div>
      </div>

      <div className="admin-card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="admin-card-header" style={{ gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          <h3>All Posts</h3>
          <div className="blog-admin-filters">
            <div className="filter-tabs">
              {(['all', 'published', 'draft', 'scheduled'] as const).map((s) => (
                <button key={s} className={`filter-tab${status === s ? ' is-active' : ''}`} onClick={() => setStatus(s)}>
                  {s[0].toUpperCase() + s.slice(1)} <span>{counts[s]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-card-body" style={{ padding: 0 }}>
          <div className="admin-table-wrapper">
            <table className="admin-table blog-admin-table">
              <thead>
                <tr><th>Post</th><th>Category</th><th>Author</th><th>Status</th><th>Views</th><th>Published</th><th style={{ textAlign: 'right' }}>Actions</th></tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--gray-500)' }}>Loading…</td></tr>
                ) : items.length === 0 ? (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--gray-500)' }}>No posts found.</td></tr>
                ) : items.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <div className="post-row">
                        <img src={b.coverImage} alt="" />
                        <div>
                          <strong>{b.title}</strong>
                          <small>{b.featured ? "Editor's Pick · " : ''}{b.readMinutes} min read</small>
                        </div>
                      </div>
                    </td>
                    <td><span className={`cat-pill ${catClass[b.category] ?? 'cat-tips'}`}>{b.category}</span></td>
                    <td>{b.author.name}</td>
                    <td><span className={`status-pill ${statusClass[b.status]}`}><i className="fas fa-circle" /> {b.status}</span></td>
                    <td>{b.views ? b.views.toLocaleString('en-IN') : '—'}</td>
                    <td>{fmt(b.publishedAt)}</td>
                    <td className="row-actions">
                      <Link href={`/blogs/${b.slug}`} title="View"><i className="fas fa-eye" /></Link>
                      <Link href={`/admin/blogs/${b.id}`} title="Edit"><i className="fas fa-pen" /></Link>
                      <button
                        title="Delete"
                        className="danger"
                        onClick={() => { if (confirm(`Delete “${b.title}”?`)) del.mutate(b.id); }}
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
