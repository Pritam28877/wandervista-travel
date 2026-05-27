'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { api } from '@/lib/api';
import { useCreateBooking } from '@/lib/hooks';

function BookingInner() {
  const sp = useSearchParams();
  const presetSlug = sp.get('package') ?? '';
  const { data } = useQuery({ queryKey: ['packages', 'booking'], queryFn: () => api.listPackages({ pageSize: 50 }) });
  const packages = data?.items ?? [];

  const booking = useCreateBooking();
  const [form, setForm] = useState({ packageId: '', name: '', email: '', phone: '', travellers: 2, date: '' });

  const selected = packages.find((p) => p.slug === presetSlug);
  const packageId = form.packageId || selected?.id || '';

  return (
    <div className="page-inner">
      <Header variant="solid" />
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span className="separator"><i className="fas fa-chevron-right" /></span><span>Book Now</span></div>
          <h1>Book Your Trip</h1>
          <p>Tell us where you want to go — our team confirms within 30 minutes.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 640 }}>
          {booking.isSuccess ? (
            <div className="admin-card" style={{ padding: 'var(--space-10)', textAlign: 'center' }}>
              <i className="fas fa-circle-check" style={{ fontSize: '3rem', color: 'var(--success)' }} />
              <h3 style={{ margin: 'var(--space-4) 0 var(--space-2)' }}>Booking received!</h3>
              <p style={{ color: 'var(--gray-500)' }}>Reference: {booking.data?.id}. We&apos;ll call you shortly.</p>
            </div>
          ) : (
            <form
              className="admin-card"
              style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
              onSubmit={(e) => { e.preventDefault(); booking.mutate({ ...form, packageId }); }}
            >
              <div className="form-group">
                <label className="form-label">Choose a package</label>
                <select className="form-input" value={packageId} onChange={(e) => setForm({ ...form, packageId: e.target.value })} required>
                  <option value="">Select…</option>
                  {packages.map((p) => (<option key={p.id} value={p.id}>{p.title} — ₹{p.priceFrom.toLocaleString('en-IN')}</option>))}
                </select>
              </div>
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <input className="form-input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className="form-input" type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
              </div>
              <input className="form-input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <input className="form-input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                <input className="form-input" type="number" min={1} max={20} value={form.travellers} onChange={(e) => setForm({ ...form, travellers: Number(e.target.value) })} />
              </div>
              <button className="btn btn-primary" disabled={booking.isPending}>{booking.isPending ? 'Submitting…' : 'Confirm Booking'}</button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={null}>
      <BookingInner />
    </Suspense>
  );
}
