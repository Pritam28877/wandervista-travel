import Link from 'next/link';
import type { Package } from '@/lib/types';

const badgeClass: Record<string, string> = {
  'Road Trip': 'badge-secondary',
  Family: 'badge-success',
  Honeymoon: 'badge-primary',
  Heritage: 'badge-warning',
  Adventure: 'badge-secondary',
  Luxury: 'badge-primary',
  Weekend: 'badge-success',
};

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link href={`/packages/${pkg.slug}`} className="package-card">
      <div className="package-card-image">
        <img src={pkg.image} alt={pkg.title} loading="lazy" />
        <span className={`package-card-badge badge ${badgeClass[pkg.badge] ?? 'badge-secondary'}`}>{pkg.badge}</span>
        <span className="package-card-duration">
          <i className="far fa-clock" /> {pkg.durationDays}D / {pkg.durationNights}N
        </span>
      </div>
      <div className="package-card-body">
        <div className="package-card-route">
          <i className="fas fa-route" />
          <span>{pkg.route}</span>
        </div>
        <h3 className="package-card-title">{pkg.title}</h3>
        <div className="package-card-highlights">
          {pkg.highlights.map((h) => (
            <span key={h}>{h}</span>
          ))}
        </div>
        <div className="package-card-footer">
          <div className="package-card-price">
            <span className="label">Starting from</span>
            <span className="amount">₹{pkg.priceFrom.toLocaleString('en-IN')}</span>
            <span className="per-person">per person</span>
          </div>
          <div className="package-card-rating">
            <i className="fas fa-star" />
            <strong>{pkg.rating}</strong>
            <span>({pkg.reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
