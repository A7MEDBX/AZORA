import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { USE_MOCK_DATA } from '@/api/client';
import { getTourBySlug, getToursByCategory } from '@/lib/catalog';
import { fetchTourBySlug, fetchTours } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { TourDetailTemplate } from '@/templates';

export default function TourDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const fallbackTour = USE_MOCK_DATA ? (getTourBySlug(slug) ?? null) : null;
  const { data: tour, isLoading } = useAsyncData(
    () => (slug ? fetchTourBySlug(slug) : Promise.resolve(null)),
    [slug],
    fallbackTour
  );
  const { data: categoryTours } = useAsyncData(
    () => (tour ? fetchTours({ category: tour.category }) : Promise.resolve([])),
    [tour?.category],
    USE_MOCK_DATA && tour ? getToursByCategory(tour.category) : []
  );

  if (!tour && !isLoading) {
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

  if (!tour) return null;

  const relatedTours = categoryTours.filter(t => t.id !== tour.id);

  return <TourDetailTemplate tour={tour} relatedTours={relatedTours} />;
}
