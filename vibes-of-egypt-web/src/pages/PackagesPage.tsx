import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { USE_MOCK_DATA } from '@/api/client';
import { packages as mockPackages } from '@/lib/catalog';
import { fetchPackages } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { Container, PageBanner, EmptyState } from '@/components/ui';
import { PackageCard } from '@/components/cards';
import { FilterBar } from '@/features/filters';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './Packages.module.css';

export default function PackagesPage() {
  const { t } = useLanguage();
  const { data: packages } = useAsyncData(
    () => fetchPackages(),
    [],
    USE_MOCK_DATA ? mockPackages : []
  );

  usePageMeta({
    title: 'Luxury Travel Packages & All-Inclusive Itineraries',
    description:
      'End-to-end luxury itineraries combining Cairo, Nile Cruises, Abu Simbel, and Red Sea resorts with five-star accommodations and private Egyptologist guides.'
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'All Packages', value: 'all' },
    { label: 'Classic Egypt', value: 'Classic' },
    { label: 'VIP Luxury', value: 'Luxury' },
    { label: 'Nile & Red Sea', value: 'Nile & Red Sea' }
  ];

  const filteredPackages = (packages || []).filter(pkg => {
    if (selectedCategory === 'all') return true;
    return (pkg.category || '').toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="Seamless Multi-Day Expeditions"
        title="Comprehensive Tour Packages"
        subtitle="End-to-end luxury itineraries combining Cairo, Nile Cruises, Abu Simbel, and Red Sea resorts with five-star accommodations and private Egyptologist guides."
      />

      {/* Packages Grid */}
      <section className={styles.catalogSection}>
        <Container size="standard">
          <FilterBar
            categories={categories}
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {filteredPackages.length > 0 ? (
            <div className={styles.packagesGrid}>
              {filteredPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🧳"
              title="No Packages Found"
              description="No multi-day itineraries match the selected category filter."
              actionText="View All Packages"
              onAction={() => setSelectedCategory('all')}
            />
          )}
        </Container>
      </section>
    </div>
  );
}
