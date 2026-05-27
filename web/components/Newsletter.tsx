'use client';

import { useState } from 'react';
import { useCreateEnquiry } from '@/lib/hooks';

export function Newsletter({
  title = 'Keep Traveling All Year Round!',
  sub = 'Subscribe to get exclusive deals, travel tips, and early access to new packages.',
}: {
  title?: string;
  sub?: string;
}) {
  const [email, setEmail] = useState('');
  const { mutate, isPending, isSuccess } = useCreateEnquiry();

  return (
    <section className="newsletter section">
      <div className="container">
        <div className="newsletter-inner">
          <div>
            <h3>{title}</h3>
            <p>{sub}</p>
          </div>
          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              mutate({ name: 'Newsletter Subscriber', phone: 'n/a', email, message: 'Newsletter signup' });
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary" disabled={isPending}>
              {isSuccess ? 'Subscribed ✓' : isPending ? '…' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
