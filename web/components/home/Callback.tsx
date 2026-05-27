'use client';

import { useState } from 'react';
import { useCreateEnquiry } from '@/lib/hooks';

export function Callback() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const { mutate, isPending, isSuccess } = useCreateEnquiry();

  return (
    <section className="section-sm">
      <div className="container">
        <div className="callback-section">
          <div className="callback-content">
            <h3>
              <i className="fas fa-phone-volume" style={{ color: 'var(--secondary)', marginRight: 'var(--space-2)' }} />{' '}
              Want us to call you?
            </h3>
            <p>Leave your details and our travel expert will reach out within 30 minutes</p>
          </div>
          <form
            className="callback-form"
            onSubmit={(e) => {
              e.preventDefault();
              mutate({ ...form, message: 'Callback request' });
            }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="+91 Mobile Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={isPending}>
              {isSuccess ? 'Requested ✓' : 'Request Callback'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
