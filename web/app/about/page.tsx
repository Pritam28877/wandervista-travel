import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Newsletter } from '@/components/Newsletter';

export const metadata = { title: 'About Us — WanderVista' };

export default function AboutPage() {
  return (
    <div className="page-inner">
      <Header variant="solid" />
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span className="separator"><i className="fas fa-chevron-right" /></span><span>About Us</span></div>
          <h1>About WanderVista</h1>
          <p>We craft unforgettable journeys across India and the world.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--gray-700)', marginBottom: 'var(--space-6)' }}>
            Founded by travellers for travellers, WanderVista has taken 15,000+ guests across 120+ destinations.
            We design every itinerary in-house, partner only with vetted local operators, and back every trip
            with 24/7 on-ground support.
          </p>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
            {[['15K+', 'Happy Travelers'], ['500+', 'Curated Packages'], ['4.8', 'Average Rating']].map(([n, l]) => (
              <div className="admin-card" key={l} style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{n}</div>
                <div style={{ color: 'var(--gray-500)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
