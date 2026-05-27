'use client';

import { useEffect, useState } from 'react';

const MSGS = [
  <><strong>Rahul S.</strong> from Mumbai just booked <strong>Ladakh Adventure</strong> — 2 min ago</>,
  <><strong>New launch:</strong> Bhutan 7N package now live with early-bird ₹6,000 off</>,
  <><strong>Priya M.</strong> from Bangalore booked <strong>Kerala Backwaters</strong> — 5 min ago</>,
  <><strong>Trending:</strong> Spiti Bike Trip — 92% sold for May departures</>,
  <><strong>Aarav K.</strong> from Delhi booked <strong>Bali Honeymoon</strong> — 8 min ago</>,
];

export function LatestUpdates() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % MSGS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="live-feed section-sm" id="latestUpdates">
      <div className="container">
        <div className="feed-items">
          <div className="feed-ticker">
            <span className="feed-label"><span className="feed-dot" /> Latest Updates</span>
            <div className="feed-rotator">
              {MSGS.map((m, idx) => (
                <span key={idx} className={`feed-msg${idx === i ? ' is-active' : ''}`}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
