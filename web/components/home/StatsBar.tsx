export function StatsBar() {
  const stats = [
    ['15K+', 'Happy Travelers'],
    ['500+', 'Tour Packages'],
    ['120+', 'Destinations'],
    ['4.8', 'Average Rating'],
  ];
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map(([n, l]) => (
            <div className="stat-item" key={l}>
              <span className="stat-number">{n}</span>
              <span className="stat-label">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
