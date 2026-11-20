import React from 'react';
import { Container, PageBanner } from '@/components/ui';
import { SearchFeature } from '@/features/search';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function SearchPage() {
  usePageMeta({
    title: 'Search Our Catalog of Journeys & Sanctuaries',
    description:
      'Search across all 19 Egyptian destinations, private tours, luxury Nile cruises, packages, and curatorial dispatches.'
  });

  return (
    <div>
      <PageBanner
        overline="Universal Catalog Search"
        title="Discover Egypt"
        subtitle="Search across all destinations, private tours, luxury Nile cruises, packages, and curatorial dispatches."
      />

      <section style={{ padding: '4rem 0 6rem', background: 'var(--color-bg-primary)' }}>
        <Container size="standard">
          <SearchFeature />
        </Container>
      </section>
    </div>
  );
}
