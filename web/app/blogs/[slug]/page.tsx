'use client';

import Link from 'next/link';
import { use } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';
import { useBlog } from '@/lib/hooks';
import { renderMarkdown } from '@/lib/markdown';

function fmt(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data, isLoading, isError } = useBlog(slug);

  if (isLoading) {
    return (
      <div className="page-blog-detail">
        <Header variant="solid" />
        <div className="container" style={{ padding: 'var(--space-20) 0', textAlign: 'center', color: 'var(--gray-500)' }}>
          Loading article…
        </div>
        <Footer />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="page-blog-detail">
        <Header variant="solid" />
        <div className="container" style={{ padding: 'var(--space-20) 0', textAlign: 'center' }}>
          <h2>Article not found</h2>
          <Link href="/blogs" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>← Back to all articles</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { blog, related } = data;

  return (
    <div className="page-blog-detail">
      <Header variant="solid" />

      <section className="article-hero">
        <div className="container article-hero__inner">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="separator"><i className="fas fa-chevron-right" /></span>
            <Link href="/blogs">Blogs</Link>
            <span className="separator"><i className="fas fa-chevron-right" /></span>
            <span>{blog.title.slice(0, 24)}…</span>
          </nav>

          <span className="article-cat">{blog.category}</span>
          <h1 className="article-title">{blog.title}</h1>
          <p className="article-deck">{blog.excerpt}</p>

          <div className="article-meta">
            <a href="#" className="article-author">
              <img src={blog.author.avatar} alt={blog.author.name} />
              <div>
                <strong>{blog.author.name}</strong>
                <small>{blog.author.role}</small>
              </div>
            </a>
            <span className="article-meta__item"><i className="far fa-calendar" /> {fmt(blog.publishedAt)}</span>
            <span className="article-meta__item"><i className="far fa-clock" /> {blog.readMinutes} min read</span>
            <span className="article-meta__item"><i className="far fa-eye" /> {blog.views.toLocaleString('en-IN')} views</span>
          </div>
        </div>

        <div className="article-cover">
          <img src={blog.coverImage} alt={blog.title} />
        </div>
      </section>

      <section className="article-section">
        <div className="container article-grid">
          <aside className="article-share">
            <span className="article-share__label">Share</span>
            <a href="#" aria-label="WhatsApp" className="article-share__btn whatsapp"><i className="fab fa-whatsapp" /></a>
            <a href="#" aria-label="Twitter" className="article-share__btn twitter"><i className="fab fa-x-twitter" /></a>
            <a href="#" aria-label="Facebook" className="article-share__btn facebook"><i className="fab fa-facebook-f" /></a>
            <a href="#" aria-label="Copy link" className="article-share__btn link"><i className="fas fa-link" /></a>
          </aside>

          <article className="article-body">
            {renderMarkdown(blog.content)}
            <div className="article-tags">
              {blog.tags.map((t) => (
                <span className="art-tag" key={t}>#{t.replace(/\s+/g, '-')}</span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section author-section">
        <div className="container">
          <div className="author-card">
            <img src={blog.author.avatar} alt={blog.author.name} />
            <div>
              <span className="author-card__role">Written by</span>
              <h4>{blog.author.name}</h4>
              <p>{blog.author.role} at WanderVista. Tea over coffee, always.</p>
              <div className="author-card__socials">
                <a href="#"><i className="fab fa-instagram" /></a>
                <a href="#"><i className="fab fa-x-twitter" /></a>
                <a href="#"><i className="fab fa-linkedin-in" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>
              <h2 style={{ fontSize: '1.75rem' }}>You might also like</h2>
            </div>
            <div className="blog-list" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {related.map((p) => (
                <Link href={`/blogs/${p.slug}`} className="post-card" key={p.id}>
                  <div className="post-card__media">
                    <img src={p.coverImage} alt={p.title} />
                    <span className="post-card__cat">{p.category}</span>
                  </div>
                  <div className="post-card__body">
                    <span className="post-card__meta"><i className="far fa-calendar" /> {fmt(p.publishedAt)} · {p.readMinutes} min read</span>
                    <h4 className="post-card__title">{p.title}</h4>
                    <span className="post-card__author">By {p.author.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter title="Get a story in your inbox every Sunday" sub="One travel piece, hand-picked. No spam, unsubscribe anytime." />
      <Footer />
    </div>
  );
}
