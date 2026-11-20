import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDestinationBySlug, getToursByDestination } from '@/lib/catalog';
import { DestinationDetailTemplate } from '@/templates';

export default function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
          Destination Lost Among the Sands
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
          We could not find the sanctuary or ancient site you were searching for.
        </p>
        <Link
          to="/destinations"
          style={{
            display: 'inline-block',
            background: 'var(--color-egyptian-gold)',
            color: 'var(--color-midnight-black)',
            fontWeight: 700,
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px'
          }}
        >
          ← Return to All Destinations
        </Link>
      </div>
    );
  }

  const relatedTours = getToursByDestination(destination.slug);

  return (
    <DestinationDetailTemplate
      destination={destination}
      relatedTours={relatedTours}
    />
  );
}
