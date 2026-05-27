// Static homepage sections that need no data/interactivity.

export function WhyChooseUs() {
  const items = [
    { icon: 'fa-shield-halved', color: 'var(--secondary)', bg: 'rgba(244,132,95,0.12)', title: '100% Safe Travel', text: 'Every trip is backed by comprehensive travel insurance and 24/7 on-ground support.' },
    { icon: 'fa-hand-holding-dollar', color: 'var(--accent)', bg: 'rgba(95,180,156,0.18)', title: 'Best Price Guarantee', text: 'We match any comparable itinerary price. No hidden charges, complete transparency.' },
    { icon: 'fa-users-gear', color: 'var(--primary-teal)', bg: 'rgba(13,116,144,0.12)', title: 'Expert Tour Managers', text: 'Trained professionals accompany every group to ensure seamless, enriching experiences.' },
    { icon: 'fa-credit-card', color: 'var(--secondary)', bg: 'rgba(244,132,95,0.12)', title: 'Easy EMI Options', text: 'Flexible payment plans starting at just ₹2,999/month. Travel now, pay later.' },
  ];
  return (
    <section className="section">
      <div className="container">
        <div className="section-title">
          <h2>Why Travel With WanderVista?</h2>
          <p>We don&apos;t just plan trips, we craft experiences that stay with you forever</p>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-8)' }}>
          {items.map((it) => (
            <div className="text-center" key={it.title}>
              <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-xl)', background: it.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-5)', fontSize: '2rem', color: it.color }}>
                <i className={`fas ${it.icon}`} />
              </div>
              <h4 style={{ marginBottom: 'var(--space-2)' }}>{it.title}</h4>
              <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const logos = [
    ['fa-certificate', 'IATA Certified'],
    ['fa-award', 'IATO Member'],
    ['fa-shield-halved', 'TAAI Approved'],
    ['fa-globe', 'TAFI Member'],
    ['fa-lock', 'Secure Payments'],
    ['fa-newspaper', 'Featured in TOI'],
  ];
  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-logos">
          {logos.map(([icon, label]) => (
            <div className="trust-logo" key={label}>
              <i className={`fas ${icon}`} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
