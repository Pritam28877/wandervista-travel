'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import { useBlogs } from '@/lib/hooks';

const CATS = [
  ['all', 'All Stories'],
  ['india', 'India Trips'],
  ['international', 'International'],
  ['adventure', 'Adventure'],
  ['honeymoon', 'Honeymoon'],
  ['weekend', 'Weekend Getaways'],
  ['budget', 'Budget Travel'],
  ['food', 'Food & Culture'],
  ['tips', 'Tips & How-tos'],
];

function fmt(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
}

export default function BlogsPage() {
  const [cat, setCat] = useState('all');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useBlogs({ category: cat, status: 'published', sort, page, pageSize: 9, search });
  const posts = data?.items ?? [];
  const featured = page === 1 ? posts.find((p) => p.featured) ?? posts[0] : undefined;
  const rest = featured ? posts.filter((p) => p.id !== featured.id) : posts;

  return (
    <div className="page-blogs">
      <Header variant="solid" />

      <section className="blog-hero">
        <div className="container">
          <span className="blog-hero__eyebrow">Stories &amp; Guides</span>
          <h1 className="blog-hero__title">The WanderVista Journal</h1>
          <p className="blog-hero__sub">Itineraries, hidden gems and travel tips from people who&apos;ve actually been there.</p>
          <form
            className="search-pill blog-hero__search"
            autoComplete="off"
            onSubmit={(e) => { e.preventDefault(); setPage(1); }}
          >
            <i className="fas fa-search search-pill__icon" />
            <input
              type="text"
              placeholder="Search articles — try “Ladakh”, “Honeymoon”, “Visa”..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
            <button type="submit" className="search-pill__btn">Search</button>
          </form>
        </div>
      </section>

      <section className="blog-cats-section">
        <div className="container">
          <div className="blog-cats" role="tablist">
            {CATS.map(([key, label]) => (
              <button
                key={key}
                className={`blog-cat${cat === key ? ' is-active' : ''}`}
                onClick={() => { setCat(key); setPage(1); }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="section featured-blog-section">
          <div className="container">
            <Link href={`/blogs/${featured.slug}`} className="featured-blog">
              <div className="featured-blog__media">
                <img src={featured.coverImage} alt={featured.title} />
                <span className="featured-blog__pill">Editor&apos;s Pick</span>
              </div>
              <div className="featured-blog__body">
                <span className="featured-blog__cat">{featured.category}</span>
                <h2 className="featured-blog__title">{featured.title}</h2>
                <p className="featured-blog__excerpt">{featured.excerpt}</p>
                <div className="featured-blog__meta">
                  <span className="meta-author">
                    <img src={featured.author.avatar} alt={featured.author.name} />
                    <span><strong>{featured.author.name}</strong> · {featured.author.role}</span>
                  </span>
                  <span className="meta-dot">·</span>
                  <span><i className="far fa-calendar" /> {fmt(featured.publishedAt)}</span>
                  <span className="meta-dot">·</span>
                  <span><i className="far fa-clock" /> {featured.readMinutes} min read</span>
                </div>
                <span className="featured-blog__more">Read full article <i className="fas fa-arrow-right" /></span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="section blog-list-section">
        <div className="container">
          <div className="blog-list-head">
            <h3>Latest Articles</h3>
            <div className="blog-sort">
              <label>Sort</label>
              <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }}>
                <option value="newest">Newest first</option>
                <option value="most-read">Most read</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <p style={{ color: 'var(--gray-500)' }}>Loading articles…</p>
          ) : rest.length === 0 ? (
            <p style={{ color: 'var(--gray-500)' }}>No articles match your filters.</p>
          ) : (
            <div className="blog-list">
              {rest.map((p) => (
                <Link href={`/blogs/${p.slug}`} className="post-card" key={p.id}>
                  <div className="post-card__media">
                    <img src={p.coverImage} alt={p.title} />
                    <span className="post-card__cat">{p.category}</span>
                  </div>
                  <div className="post-card__body">
                    <span className="post-card__meta"><i className="far fa-calendar" /> {fmt(p.publishedAt)} · {p.readMinutes} min read</span>
                    <h4 className="post-card__title">{p.title}</h4>
                    <p className="post-card__excerpt">{p.excerpt}</p>
                    <span className="post-card__author">By {p.author.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {data && data.totalPages > 1 && (
            <nav className="pagination" aria-label="Pagination">
              <button className="page-btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                <i className="fas fa-chevron-left" />
              </button>
              {Array.from({ length: data.totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  className={`page-btn${page === idx + 1 ? ' is-active' : ''}`}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button className="page-btn" disabled={page >= data.totalPages} onClick={() => setPage((p) => p + 1)}>
                <i className="fas fa-chevron-right" />
              </button>
            </nav>
          )}
        </div>
      </section>

      <Newsletter title="Get a story in your inbox every Sunday" sub="One travel piece, hand-picked. No spam, unsubscribe anytime." />
      <Footer />
    </div>
  );
}
