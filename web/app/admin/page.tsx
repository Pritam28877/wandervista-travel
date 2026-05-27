'use client';

import Link from 'next/link';
import { AdminShell } from '@/components/admin/AdminShell';
import { useBlogs, useBookings } from '@/lib/hooks';

export default function AdminDashboard() {
  const { data: blogs } = useBlogs({ pageSize: 100 });
  const { data: bookings } = useBookings();

  const published = blogs?.items.filter((b) => b.status === 'published').length ?? 0;
  const drafts = blogs?.items.filter((b) => b.status === 'draft').length ?? 0;
  const totalViews = blogs?.items.reduce((s, b) => s + b.views, 0) ?? 0;
  const revenue = bookings?.items.reduce((s, b) => s + (b.status !== 'cancelled' ? b.amount : 0), 0) ?? 0;

  const stats = [
    { icon: 'fa-calendar-check', cls: 'blue', value: bookings?.total ?? 0, label: 'Total Bookings' },
    { icon: 'fa-indian-rupee-sign', cls: 'green', value: `₹${(revenue / 100000).toFixed(1)}L`, label: 'Revenue (lifetime)' },
    { icon: 'fa-newspaper', cls: 'orange', value: published, label: 'Published Posts' },
    { icon: 'fa-eye', cls: 'blue', value: totalViews.toLocaleString('en-IN'), label: 'Blog Views' },
  ];

  return (
    <AdminShell title="Dashboard" breadcrumb="Welcome back, Arjun! Here's what's happening today.">
      <div className="admin-stats">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card-header">
              <div className={`stat-card-icon ${s.cls}`}><i className={`fas ${s.icon}`} /></div>
            </div>
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="admin-card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="admin-card-header">
          <h3>Recent Bookings</h3>
          <Link href="/admin/bookings" className="link-action">View all</Link>
        </div>
        <div className="admin-card-body" style={{ padding: 0 }}>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr><th>Booking</th><th>Customer</th><th>Travellers</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {(bookings?.items ?? []).slice(0, 6).map((b) => (
                  <tr key={b.id}>
                    <td><strong>{b.packageTitle}</strong></td>
                    <td>{b.name}</td>
                    <td>{b.travellers}</td>
                    <td>₹{b.amount.toLocaleString('en-IN')}</td>
                    <td><span className={`status-pill st-${b.status === 'confirmed' ? 'published' : b.status === 'pending' ? 'scheduled' : 'draft'}`}><i className="fas fa-circle" /> {b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="admin-card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="admin-card-header">
          <h3>Content overview</h3>
          <Link href="/admin/blogs" className="link-action">Manage blog</Link>
        </div>
        <div className="admin-card-body">
          <p style={{ color: 'var(--gray-600)' }}>
            {published} published · {drafts} drafts · {totalViews.toLocaleString('en-IN')} total views across all articles.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
