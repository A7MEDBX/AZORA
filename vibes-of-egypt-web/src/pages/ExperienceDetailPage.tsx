import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExperienceBySlug, getExperiencesByCategory } from '@/lib/catalog';
import { ExperienceDetailTemplate } from '@/templates';

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const experience = getExperienceBySlug(slug);

  if (!experience) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
          Experience Not Found
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
          This curated encounter could not be located.
        </p>
        <Link
          to="/experiences"
          style={{
            display: 'inline-block',
            background: 'var(--color-egyptian-gold)',
            color: 'var(--color-midnight-black)',
            fontWeight: 700,
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px'
          }}
        >
          ← Return to All Experiences
        </Link>
      </div>
    );
  }

  const relatedExperiences = getExperiencesByCategory(experience.category).filter(
    e => e.id !== experience.id
  );

  return (
    <ExperienceDetailTemplate
      experience={experience}
      relatedExperiences={relatedExperiences}
    />
  );
}
