'use client';

import Link from 'next/link';
import { useBlogs } from '@/lib/hooks';

export function BlogsTeaser() {
  const { data } = useBlogs({ status: 'published', pageSize: 4 });
  const posts = data?.items ?? [];
  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="section blogs-section" id="blogs">
      <div className="container">
        <div className="section-title">
          <h2>Travel Blogs &amp; Guides</h2>
          <p>Stories, itineraries, and tips from our team — read before you go</p>
        </div>

        <div className="blogs-grid">
          <Link href={`/blogs/${featured.slug}`} className="blog-card blog-card--featured">
            <div className="blog-card__media">
              <img src={featured.coverImage} alt={featured.title} loading="lazy" />
              <span className="blog-card__cat">{featured.category}</span>
            </div>
            <div className="blog-card__body">
              <span className="blog-card__date">
                <i className="far fa-calendar" /> {fmt(featured.publishedAt)} &nbsp;·&nbsp;{' '}
                <i className="far fa-clock" /> {featured.readMinutes} min read
              </span>
              <h3 className="blog-card__title">{featured.title}</h3>
              <p className="blog-card__excerpt">{featured.excerpt}</p>
              <span className="blog-card__more">Read More <i className="fas fa-arrow-right" /></span>
            </div>
          </Link>

          {rest.map((p) => (
            <Link href={`/blogs/${p.slug}`} className="blog-card" key={p.id}>
              <div className="blog-card__media">
                <img src={p.coverImage} alt={p.title} loading="lazy" />
                <span className="blog-card__cat">{p.category}</span>
              </div>
              <div className="blog-card__body">
                <span className="blog-card__date">
                  <i className="far fa-calendar" /> {fmt(p.publishedAt)} &nbsp;·&nbsp; {p.readMinutes} min
                </span>
                <h4 className="blog-card__title">{p.title}</h4>
                <span className="blog-card__more">Read More <i className="fas fa-arrow-right" /></span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: 'var(--space-8)' }}>
          <Link href="/blogs" className="btn btn-outline">View All Blogs <i className="fas fa-arrow-right" /></Link>
        </div>
      </div>
    </section>
  );
}

function fmt(iso: string | null) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
