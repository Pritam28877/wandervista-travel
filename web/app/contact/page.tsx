'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCreateEnquiry } from '@/lib/hooks';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', message: '' });
  const { mutate, isPending, isSuccess } = useCreateEnquiry();

  return (
    <div className="page-inner">
      <Header variant="solid" />

      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="separator"><i className="fas fa-chevron-right" /></span>
            <span>Contact</span>
          </div>
          <h1>Get in Touch</h1>
          <p>Have a question or ready to plan your next escape? We reply within 30 minutes.</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--space-10)', alignItems: 'start' }}>
          <div className="contact-info-cards" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            {[
              ['fa-phone', 'Call us', '1800-123-4567'],
              ['fa-envelope', 'Email', 'hello@wandervista.com'],
              ['fa-location-dot', 'Office', 'Connaught Place, New Delhi'],
              ['fa-clock', 'Hours', 'Mon–Sat, 9am–8pm'],
            ].map(([icon, label, val]) => (
              <div className="admin-card" key={label} style={{ padding: 'var(--space-5)', display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: 'rgba(13,116,144,0.1)', color: 'var(--primary-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  <i className={`fas ${icon}`} />
                </div>
                <div>
                  <small style={{ color: 'var(--gray-500)' }}>{label}</small>
                  <strong style={{ display: 'block' }}>{val}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-card" style={{ padding: 'var(--space-8)' }}>
            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                <i className="fas fa-circle-check" style={{ fontSize: '3rem', color: 'var(--success)' }} />
                <h3 style={{ margin: 'var(--space-4) 0 var(--space-2)' }}>Message sent!</h3>
                <p style={{ color: 'var(--gray-500)' }}>Our travel expert will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); mutate(form); }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <h3>Send us a message</h3>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <input className="form-input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  <input className="form-input" type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                </div>
                <input className="form-input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="form-input" placeholder="Destination of interest" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
                <textarea className="form-input" rows={4} placeholder="Tell us about your travel plans…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                <button className="btn btn-primary" disabled={isPending} style={{ alignSelf: 'flex-start' }}>
                  {isPending ? 'Sending…' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
