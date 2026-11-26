import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { cruises as mockCruises } from '@/lib/catalog';
import { fetchCruises } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { Container, PageBanner, EmptyState } from '@/components/ui';
import { CruiseCard } from '@/components/cards';
import { FilterBar } from '@/features/filters';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './Cruises.module.css';

export default function NileCruisesPage() {
  const { t } = useLanguage();
  const { data: cruises } = useAsyncData(() => fetchCruises(), [], mockCruises);

  usePageMeta({
    title: 'Luxury Nile Cruises & Boutique Dahabiya Charters',
    description:
      'Sail the timeless Nile in utmost refinement. Choose between private traditional Dahabiya sailboats and ultra-luxury boutique cruisers.'
  });
  const [selectedType, setSelectedType] = useState<string>('all');

  const categories = [
    { label: 'All Vessels', value: 'all' },
    { label: 'Private Dahabiya', value: 'Dahabiya' },
    { label: '5-Star River Cruisers', value: 'Luxury' },
    { label: 'Lake Nasser Expeditions', value: 'Expedition' }
  ];

  const filteredCruises = (cruises || []).filter(cruise => {
    if (selectedType === 'all') return true;
    const typeStr = `${cruise.cruiseType || ''} ${cruise.vesselType || ''} ${cruise.type || ''}`.toLowerCase();
    return typeStr.includes(selectedType.toLowerCase());
  });

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="The Eternal River Voyage"
        title="Nile & Dahabiya Cruises"
        subtitle="Drift silently between Luxor and Aswan on handcrafted private Dahabiyas and five-star luxury cruisers, exploring ancient riverbank temples at sunrise and sunset."
      />

      {/* Cruises Grid */}
      <section className={styles.catalogSection}>
        <Container size="standard">
          <FilterBar
            categories={categories}
            activeCategory={selectedType}
            onSelectCategory={setSelectedType}
            categoryLabel="Vessel Style:"
          />

          {filteredCruises.length > 0 ? (
            <div className={styles.cruisesGrid}>
              {filteredCruises.map(cruise => (
                <CruiseCard key={cruise.id} cruise={cruise} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="⛵"
              title="No Cruises Found"
              description="No river vessels match this category filter."
              actionText="View All Cruises"
              onAction={() => setSelectedType('all')}
            />
          )}
        </Container>
      </section>
    </div>
  );
}
