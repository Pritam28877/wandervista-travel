'use client';

import { AdminShell } from '@/components/admin/AdminShell';
import { useBookings } from '@/lib/hooks';

const stClass: Record<string, string> = { confirmed: 'st-published', pending: 'st-scheduled', cancelled: 'st-draft' };

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function AdminBookingsPage() {
  const { data, isLoading } = useBookings();
  const items = data?.items ?? [];
  const revenue = items.reduce((s, b) => s + (b.status !== 'cancelled' ? b.amount : 0), 0);

  return (
    <AdminShell title="Bookings" breadcrumb="All trip bookings and their status">
      <div className="admin-stats">
        <div className="stat-card"><div className="stat-card-header"><div className="stat-card-icon blue"><i className="fas fa-calendar-check" /></div></div><div className="stat-card-value">{items.length}</div><div className="stat-card-label">Total Bookings</div></div>
        <div className="stat-card"><div className="stat-card-header"><div className="stat-card-icon green"><i className="fas fa-circle-check" /></div></div><div className="stat-card-value">{items.filter((b) => b.status === 'confirmed').length}</div><div className="stat-card-label">Confirmed</div></div>
        <div className="stat-card"><div className="stat-card-header"><div className="stat-card-icon orange"><i className="fas fa-clock" /></div></div><div className="stat-card-value">{items.filter((b) => b.status === 'pending').length}</div><div className="stat-card-label">Pending</div></div>
        <div className="stat-card"><div className="stat-card-header"><div className="stat-card-icon green"><i className="fas fa-indian-rupee-sign" /></div></div><div className="stat-card-value">₹{(revenue / 100000).toFixed(1)}L</div><div className="stat-card-label">Revenue</div></div>
      </div>

      <div className="admin-card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="admin-card-header"><h3>All Bookings</h3></div>
        <div className="admin-card-body" style={{ padding: 0 }}>
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr><th>ID</th><th>Package</th><th>Customer</th><th>Travel Date</th><th>Travellers</th><th>Amount</th><th>Status</th></tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-8)', color: 'var(--gray-500)' }}>Loading…</td></tr>
                ) : items.map((b) => (
                  <tr key={b.id}>
                    <td><code style={{ fontSize: '0.8rem' }}>{b.id}</code></td>
                    <td><strong>{b.packageTitle}</strong></td>
                    <td>{b.name}<br /><small style={{ color: 'var(--gray-500)' }}>{b.phone}</small></td>
                    <td>{b.date ? fmt(b.date) : '—'}</td>
                    <td>{b.travellers}</td>
                    <td>₹{b.amount.toLocaleString('en-IN')}</td>
                    <td><span className={`status-pill ${stClass[b.status]}`}><i className="fas fa-circle" /> {b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
