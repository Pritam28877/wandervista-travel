'use client';

import Link from 'next/link';
import { usePackages } from '@/lib/hooks';
import { PackageCard } from '../PackageCard';

export function FeaturedPackages() {
  const { data, isLoading } = usePackages({ sort: 'popularity', pageSize: 6 });
  const packages = data?.items ?? [];

  return (
    <section className="section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <div className="section-title">
          <h2>Featured Tour Packages</h2>
          <p>Curated journeys with everything you need for an unforgettable experience</p>
        </div>

        {isLoading ? (
          <p style={{ textAlign: 'center', color: 'var(--gray-500)' }}>Loading packages…</p>
        ) : (
          <div className="packages-grid">
            {packages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        )}

        <div className="text-center" style={{ marginTop: 'var(--space-10)' }}>
          <Link href="/packages" className="btn btn-primary btn-lg">
            View All Packages <i className="fas fa-arrow-right" />
          </Link>
        </div>
      </div>
    </section>
  );
}
