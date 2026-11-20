import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPackageBySlug, getPackagesByCategory } from '@/lib/catalog';
import { PackageDetailTemplate } from '@/templates';

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const pkg = getPackageBySlug(slug);

  if (!pkg) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
          Package Expedition Not Found
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
          This multi-day package itinerary could not be located.
        </p>
        <Link
          to="/packages"
          style={{
            display: 'inline-block',
            background: 'var(--color-egyptian-gold)',
            color: 'var(--color-midnight-black)',
            fontWeight: 700,
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px'
          }}
        >
          ← Return to All Packages
        </Link>
      </div>
    );
  }

  const relatedPackages = getPackagesByCategory(pkg.category).filter(p => p.id !== pkg.id);

  return <PackageDetailTemplate packageData={pkg} relatedPackages={relatedPackages} />;
}
