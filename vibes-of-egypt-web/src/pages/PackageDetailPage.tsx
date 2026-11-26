import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { USE_MOCK_DATA } from '@/api/client';
import { getPackageBySlug, getPackagesByCategory } from '@/lib/catalog';
import { fetchPackageBySlug, fetchPackages } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { PackageDetailTemplate } from '@/templates';

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const fallbackPkg = USE_MOCK_DATA ? (getPackageBySlug(slug) ?? null) : null;
  const { data: pkg, isLoading } = useAsyncData(
    () => (slug ? fetchPackageBySlug(slug) : Promise.resolve(null)),
    [slug],
    fallbackPkg
  );
  const { data: categoryPackages } = useAsyncData(
    () => (pkg ? fetchPackages({ category: pkg.category }) : Promise.resolve([])),
    [pkg?.category],
    USE_MOCK_DATA && pkg ? getPackagesByCategory(pkg.category) : []
  );

  if (!pkg && !isLoading) {
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

  if (!pkg) return null;

  const relatedPackages = categoryPackages.filter(p => p.id !== pkg.id);

  return <PackageDetailTemplate packageData={pkg} relatedPackages={relatedPackages} />;
}
