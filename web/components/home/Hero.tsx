'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DESTINATIONS = [
  { name: 'Bali, Indonesia', tag: 'International', emoji: '🏝️' },
  { name: 'Maldives', tag: 'International', emoji: '🏖️' },
  { name: 'Thailand', tag: 'International', emoji: '🛕' },
  { name: 'Vietnam', tag: 'International', emoji: '⛵' },
  { name: 'Leh Ladakh', tag: 'India', emoji: '🏍️' },
  { name: 'Spiti Valley', tag: 'India', emoji: '🏔️' },
  { name: 'Kashmir', tag: 'India', emoji: '❄️' },
  { name: 'Kerala', tag: 'India', emoji: '🛶' },
  { name: 'Rajasthan', tag: 'India', emoji: '🐪' },
  { name: 'Goa', tag: 'Weekend', emoji: '🏖️' },
  { name: 'Coorg', tag: 'Weekend', emoji: '☕' },
];

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);

  const go = (term: string) => {
    if (!term.trim()) return;
    router.push(`/packages?search=${encodeURIComponent(term.trim())}`);
  };

  const matches = (q ? DESTINATIONS.filter(
    (d) => d.name.toLowerCase().includes(q.toLowerCase()) || d.tag.toLowerCase().includes(q.toLowerCase()),
  ) : DESTINATIONS).slice(0, 6);

  return (
    <section className="hero">
      <div className="hero-bg">
        <video autoPlay muted loop playsInline poster="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80">
          <source src="/hero-video.mp4" type="video/mp4" />
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" alt="Mountain landscape" />
        </video>
      </div>
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>Explore the World, Your Way</h1>
        <p>
          Discover handcrafted journeys to the most breathtaking destinations. From serene valleys to
          vibrant cities, your perfect adventure awaits.
        </p>

        <form
          className="search-pill"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            go(q);
          }}
        >
          <i className="fas fa-search search-pill__icon" />
          <input
            type="text"
            value={q}
            placeholder="Search destinations, e.g. Bali, Ladakh..."
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
          />
          <button type="submit" className="search-pill__btn">Search</button>

          {open && (
            <ul className="search-suggest" role="listbox">
              {matches.length === 0 ? (
                <li className="search-suggest__empty">No matches — try “Bali” or “Ladakh”</li>
              ) : (
                matches.map((d) => (
                  <li
                    key={d.name}
                    role="option"
                    aria-selected={false}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      go(d.name);
                    }}
                  >
                    <span className="search-suggest__emoji">{d.emoji}</span>
                    <span className="search-suggest__name">{d.name}</span>
                    <span className="search-suggest__tag">{d.tag}</span>
                  </li>
                ))
              )}
            </ul>
          )}
        </form>

        <div className="traveler-pills">
          <span className="traveler-pills__label">I&apos;m travelling as</span>
          {['Couple', 'Family', 'Friends', 'Solo'].map((t) => (
            <a key={t} href={`/packages?type=${t.toLowerCase()}`} className="traveler-pill">{t}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
