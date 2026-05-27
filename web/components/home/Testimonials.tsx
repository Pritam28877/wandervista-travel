'use client';

import { useTestimonials } from '@/lib/hooks';

export function Testimonials() {
  const { data } = useTestimonials();
  const items = data?.items ?? [];

  return (
    <section className="testimonials section">
      <div className="container">
        <div className="section-title">
          <h2>What Our Travelers Say</h2>
          <p>Real stories from real travelers who explored the world with us</p>
        </div>

        <div className="testimonials-slider">
          {items.map((t) => (
            <div className="testimonial-card" key={t.id}>
              <div className="testimonial-stars">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <i className="fas fa-star" key={i} />
                ))}
              </div>
              <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div className="testimonial-author-info">
                  <h5>{t.name}</h5>
                  <span>{t.trip} &bull; {t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
