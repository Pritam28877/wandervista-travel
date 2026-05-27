'use client';

import Link from 'next/link';
import { use, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PackageCard } from '@/components/PackageCard';
import { api } from '@/lib/api';
import { keys, useCreateBooking } from '@/lib/hooks';

export default function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { data, isLoading } = useQuery({ queryKey: keys.pkg(slug), queryFn: () => api.getPackage(slug) });
  const booking = useCreateBooking();
  const [form, setForm] = useState({ name: '', email: '', phone: '', travellers: 2, date: '' });

  if (isLoading) {
    return (<><Header variant="solid" /><div className="container" style={{ padding: 'var(--space-20) 0', textAlign: 'center', color: 'var(--gray-500)' }}>Loading…</div><Footer /></>);
  }
  if (!data) {
    return (<><Header variant="solid" /><div className="container" style={{ padding: 'var(--space-20) 0', textAlign: 'center' }}><h2>Package not found</h2><Link href="/packages" className="btn btn-primary">← All packages</Link></div><Footer /></>);
  }

  const { pkg, related } = data;

  return (
    <div className="page-inner">
      <Header variant="solid" />

      <section className="detail-hero">
        <img src={pkg.image} alt={pkg.title} />
        <div className="detail-hero-overlay">
          <div className="detail-hero-content">
            <div className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="separator"><i className="fas fa-chevron-right" /></span>
              <Link href="/packages">Packages</Link>
            </div>
            <h1>{pkg.title}</h1>
            <div className="detail-meta">
              <span className="detail-meta-item"><i className="fas fa-route" /> {pkg.route}</span>
              <span className="detail-meta-item"><i className="far fa-clock" /> {pkg.durationDays}D / {pkg.durationNights}N</span>
              <span className="detail-meta-item"><i className="fas fa-star" /> {pkg.rating} ({pkg.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: 'var(--space-12) 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--space-8)', alignItems: 'start' }} className="detail-layout">
          <div>
            <h2 style={{ marginBottom: 'var(--space-4)' }}>Overview</h2>
            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 'var(--space-6)' }}>
              A handcrafted {pkg.durationDays}-day journey covering {pkg.route}. This {pkg.badge.toLowerCase()} experience includes everything you need for a seamless trip.
            </p>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>Highlights</h3>
            <div className="package-card-highlights" style={{ marginBottom: 'var(--space-6)' }}>
              {pkg.highlights.map((h) => (<span key={h}>{h}</span>))}
            </div>
          </div>

          <aside className="admin-card" style={{ position: 'sticky', top: 100, padding: 'var(--space-6)' }}>
            <div className="package-card-price" style={{ marginBottom: 'var(--space-4)' }}>
              <span className="label">Starting from</span>
              <span className="amount" style={{ fontSize: '1.8rem' }}>₹{pkg.priceFrom.toLocaleString('en-IN')}</span>
              <span className="per-person">per person</span>
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); booking.mutate({ packageId: pkg.id, ...form }); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
            >
              <input className="form-input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input className="form-input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="form-input" type="tel" placeholder="+91 phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              <input className="form-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <input className="form-input" type="number" min={1} max={20} value={form.travellers} onChange={(e) => setForm({ ...form, travellers: Number(e.target.value) })} />
              <button className="btn btn-primary" style={{ width: '100%' }} disabled={booking.isPending}>
                {booking.isSuccess ? 'Booking received ✓' : booking.isPending ? 'Submitting…' : 'Book Now'}
              </button>
              {booking.isSuccess && (
                <p style={{ color: 'var(--success)', fontSize: '0.85rem', textAlign: 'center' }}>
                  We&apos;ll call you within 30 minutes to confirm.
                </p>
              )}
            </form>
          </aside>
        </div>

        {related.length > 0 && (
          <section style={{ marginTop: 'var(--space-12)' }}>
            <div className="section-title" style={{ textAlign: 'left', marginBottom: 'var(--space-6)' }}>
              <h2 style={{ fontSize: '1.6rem' }}>Similar packages</h2>
            </div>
            <div className="packages-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {related.map((p) => (<PackageCard key={p.id} pkg={p} />))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
