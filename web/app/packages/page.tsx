'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PackageCard } from '@/components/PackageCard';
import { usePackages } from '@/lib/hooks';

function PackagesInner() {
  const sp = useSearchParams();
  const [region, setRegion] = useState(sp.get('region') ?? 'all');
  const [type, setType] = useState(sp.get('type') ?? 'all');
  const [maxPrice, setMaxPrice] = useState(200000);
  const [sort, setSort] = useState('popularity');
  const search = sp.get('search') ?? '';

  const { data, isLoading } = usePackages({ region, type, maxPrice, sort, search, pageSize: 24 });
  const packages = data?.items ?? [];

  return (
    <div className="page-inner">
      <Header variant="solid" />

      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="separator"><i className="fas fa-chevron-right" /></span>
            <span>Tour Packages</span>
          </div>
          <h1>Explore Tour Packages</h1>
          <p>Discover 500+ handcrafted travel packages across India and the world</p>
        </div>
      </section>

      <div className="container">
        <div className="listing-layout">
          <aside className="filter-sidebar">
            <div className="filter-group">
              <h4><i className="fas fa-sliders" style={{ marginRight: 'var(--space-2)', color: 'var(--secondary)' }} /> Filters</h4>
              <button
                className="btn btn-sm btn-outline"
                style={{ width: '100%', marginTop: 'var(--space-2)' }}
                onClick={() => { setRegion('all'); setType('all'); setMaxPrice(200000); }}
              >
                Clear All
              </button>
            </div>

            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-range">
                <input type="range" min={5000} max={200000} value={maxPrice} step={5000} onChange={(e) => setMaxPrice(Number(e.target.value))} />
                <div className="price-range-values">
                  <span>₹5,000</span>
                  <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="filter-group">
              <h4>Region</h4>
              {[['all', 'All Regions'], ['india', 'India'], ['international', 'International'], ['weekend', 'Weekend']].map(([k, l]) => (
                <label key={k} style={{ display: 'flex', gap: 8, padding: '6px 0', cursor: 'pointer' }}>
                  <input type="radio" name="region" checked={region === k} onChange={() => setRegion(k)} /> {l}
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h4>Trip Type</h4>
              {[['all', 'All Types'], ['family', 'Family'], ['honeymoon', 'Honeymoon'], ['adventure', 'Adventure'], ['roadtrip', 'Road Trip'], ['weekend', 'Weekend']].map(([k, l]) => (
                <label key={k} style={{ display: 'flex', gap: 8, padding: '6px 0', cursor: 'pointer' }}>
                  <input type="radio" name="type" checked={type === k} onChange={() => setType(k)} /> {l}
                </label>
              ))}
            </div>
          </aside>

          <main>
            <div className="sort-bar">
              <span className="results-count">
                Showing <strong>{data?.total ?? 0}</strong> packages{search ? ` for “${search}”` : ''}
              </span>
              <div className="sort-options">
                <label>Sort by:</label>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration">Duration: Short to Long</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
                <div className="view-toggle">
                  <button className="active" aria-label="Grid view"><i className="fas fa-th-large" /></button>
                  <button aria-label="List view"><i className="fas fa-list" /></button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <p style={{ color: 'var(--gray-500)', padding: 'var(--space-8)' }}>Loading packages…</p>
            ) : packages.length === 0 ? (
              <p style={{ color: 'var(--gray-500)', padding: 'var(--space-8)' }}>No packages match your filters.</p>
            ) : (
              <div className="packages-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {packages.map((p) => (
                  <PackageCard key={p.id} pkg={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-16)' }} />
      <Footer />
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={null}>
      <PackagesInner />
    </Suspense>
  );
}
