import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTourBySlug, getToursByCategory } from '@/lib/catalog';
import { TourDetailTemplate } from '@/templates';

export default function TourDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const tour = getTourBySlug(slug);

  if (!tour) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
          Tour Not Found
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
          This tour route may have been updated or moved.
        </p>
        <Link
          to="/tours"
          style={{
            display: 'inline-block',
            background: 'var(--color-egyptian-gold)',
            color: 'var(--color-midnight-black)',
            fontWeight: 700,
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px'
          }}
        >
          ← Return to All Tours
        </Link>
      </div>
    );
  }

  const relatedTours = getToursByCategory(tour.category).filter(t => t.id !== tour.id);

  return <TourDetailTemplate tour={tour} relatedTours={relatedTours} />;
}
