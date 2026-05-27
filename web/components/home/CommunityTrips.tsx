'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCommunityTrips } from '@/lib/hooks';
import { Carousel } from '../Carousel';

const MONTHS = ["MAY '26", "JUN '26", "JUL '26", "AUG '26", "SEP '26", "OCT '26", "NOV '26", "DEC '26", "JAN '27", "FEB '27", "MAR '27"];

export function CommunityTrips() {
  const [month, setMonth] = useState(MONTHS[0]);
  const { data, isLoading } = useCommunityTrips(month);
  const trips = data?.items ?? [];

  return (
    <section className="section community-section" id="community">
      <div className="container">
        <div className="community-header">
          <div>
            <h2 className="community-title">Upcoming Community Trips</h2>
            <p className="community-sub">Pre-curated departures with like-minded travellers</p>
          </div>
          <Link href="/packages" className="community-view-all">
            View All <span className="community-view-all__arrow"><i className="fas fa-arrow-right" /></span>
          </Link>
        </div>

        <div className="month-chips" role="tablist">
          {MONTHS.map((m) => (
            <button
              key={m}
              className={`month-chip${m === month ? ' is-active' : ''}`}
              onClick={() => setMonth(m)}
            >
              {m}
            </button>
          ))}
        </div>

        {isLoading ? (
          <p style={{ color: 'var(--gray-500)', padding: 'var(--space-6)' }}>Loading trips…</p>
        ) : trips.length === 0 ? (
          <p style={{ color: 'var(--gray-500)', padding: 'var(--space-6)' }}>
            No departures for {month} yet — check the next month.
          </p>
        ) : (
          <Carousel
            scrollerClass="community-scroller"
            trackClass="community-track"
            arrowClass="community-arrow"
            prevClass="community-arrow--prev"
            nextClass="community-arrow--next"
          >
            {trips.map((t) => (
              <article className="trip-card" key={t.id}>
                <div className="trip-card__media">
                  <img src={t.image} alt={t.title} loading="lazy" />
                  <span className="trip-card__price-tag">
                    <s>₹{t.priceWas.toLocaleString('en-IN')}/-</s>{' '}
                    <strong>₹{t.priceFrom.toLocaleString('en-IN')}/-</strong> Onwards
                  </span>
                </div>
                <div className="trip-card__overlay">
                  <h3 className="trip-card__title">{t.title}</h3>
                  <div className="trip-card__meta">
                    <span><i className="far fa-clock" /> {t.durationLabel}</span>
                    <span><i className="fas fa-location-dot" /> {t.location}</span>
                    <span><i className="far fa-calendar" /> {t.dates}</span>
                  </div>
                </div>
              </article>
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
}
