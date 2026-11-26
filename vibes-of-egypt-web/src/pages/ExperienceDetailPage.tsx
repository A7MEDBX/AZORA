import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getExperienceBySlug, getExperiencesByCategory } from '@/lib/catalog';
import { fetchExperienceBySlug, fetchExperiences } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ExperienceDetailTemplate } from '@/templates';

export default function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const fallbackExp = getExperienceBySlug(slug) ?? null;
  const { data: experience, isLoading } = useAsyncData(
    () => (slug ? fetchExperienceBySlug(slug) : Promise.resolve(null)),
    [slug],
    fallbackExp
  );
  const { data: relatedList } = useAsyncData(
    () => (experience ? fetchExperiences({ category: experience.category }) : Promise.resolve([])),
    [experience?.category],
    experience ? getExperiencesByCategory(experience.category) : []
  );

  if (!experience && !isLoading) {
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

  if (!experience) return null;

  const relatedExperiences = relatedList.filter(e => e.id !== experience.id);

  return (
    <ExperienceDetailTemplate
      experience={experience}
      relatedExperiences={relatedExperiences}
    />
  );
}
