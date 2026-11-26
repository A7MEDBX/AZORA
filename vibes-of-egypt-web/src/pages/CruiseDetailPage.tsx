import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { USE_MOCK_DATA } from '@/api/client';
import { getCruiseBySlug, getCruisesByType } from '@/lib/catalog';
import { fetchCruiseBySlug, fetchCruises } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { CruiseDetailTemplate } from '@/templates';

export default function CruiseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const fallbackCruise = USE_MOCK_DATA ? (getCruiseBySlug(slug) ?? null) : null;
  const { data: cruise, isLoading } = useAsyncData(
    () => (slug ? fetchCruiseBySlug(slug) : Promise.resolve(null)),
    [slug],
    fallbackCruise
  );
  const { data: relatedList } = useAsyncData(
    () => (cruise ? fetchCruises({ type: cruise.cruiseType }) : Promise.resolve([])),
    [cruise?.cruiseType],
    USE_MOCK_DATA && cruise ? getCruisesByType(cruise.cruiseType) : []
  );

  if (!cruise && !isLoading) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
          Cruise Vessel Not Found
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
          The requested river vessel or sailing itinerary could not be found.
        </p>
        <Link
          to="/nile-cruises"
          style={{
            display: 'inline-block',
            background: 'var(--color-egyptian-gold)',
            color: 'var(--color-midnight-black)',
            fontWeight: 700,
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px'
          }}
        >
          ← Return to All Nile Cruises
        </Link>
      </div>
    );
  }

  if (!cruise) return null;

  const relatedCruises = relatedList.filter(c => c.id !== cruise.id);

  return <CruiseDetailTemplate cruise={cruise} relatedCruises={relatedCruises} />;
}
