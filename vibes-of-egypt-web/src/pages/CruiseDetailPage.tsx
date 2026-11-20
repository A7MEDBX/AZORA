import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCruiseBySlug, getCruisesByType } from '@/lib/catalog';
import { CruiseDetailTemplate } from '@/templates';

export default function CruiseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const cruise = getCruiseBySlug(slug);

  if (!cruise) {
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

  const relatedCruises = getCruisesByType(cruise.cruiseType).filter(c => c.id !== cruise.id);

  return <CruiseDetailTemplate cruise={cruise} relatedCruises={relatedCruises} />;
}
