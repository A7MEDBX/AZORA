import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { tours } from '@/lib/catalog';
import type { Tour } from '@/types';
import { Container, PageBanner, EmptyState } from '@/components/ui';
import { TourCard } from '@/components/cards';
import { FilterBar } from '@/features/filters';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './Tours.module.css';

export default function ToursPage() {
  const { t } = useLanguage();

  usePageMeta({
    title: 'Curated Private Tours & Expeditions',
    description:
      'Immerse yourself in world history with private day excursions and multi-day guided expeditions led by licensed Egyptologist historians.'
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');

  const categories = [
    { label: 'All Types', value: 'all' },
    { label: 'Daily Tours', value: 'Daily' },
    { label: 'Historical & Cultural', value: 'Historical' },
    { label: 'Adventure & Safari', value: 'Adventure' }
  ];

  const destinationOptions = [
    { label: 'All Destinations', value: 'all' },
    { label: 'Cairo & Giza', value: 'cairo' },
    { label: 'Luxor', value: 'luxor' },
    { label: 'Aswan & Abu Simbel', value: 'aswan' },
    { label: 'Alexandria', value: 'alexandria' },
    { label: 'White Desert', value: 'white-desert' }
  ];

  const filteredTours = (tours || []).filter((tour: Tour) => {
    const tourCategory = (tour.category || '').toLowerCase();
    const tourCity = (tour.city || tour.destinationSlug || tour.destinationName || '').toLowerCase();

    const matchesCategory =
      selectedCategory === 'all' || tourCategory.includes(selectedCategory.toLowerCase());
    const matchesDest =
      selectedDestination === 'all' || tourCity.includes(selectedDestination.toLowerCase());
    return matchesCategory && matchesDest;
  });

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="Accredited Egyptologist Guidance"
        title="Curated Private Tours"
        subtitle="Immerse yourself in monumental history with bespoke private journeys led by Egyptologist guides, featuring climate-controlled transport and skip-the-line VIP privileges."
      />

      {/* Filter and Tours List */}
      <section className={styles.catalogSection}>
        <Container size="standard">
          <FilterBar
            categories={categories}
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            dropdownOptions={destinationOptions}
            dropdownValue={selectedDestination}
            onDropdownChange={setSelectedDestination}
          />

          {filteredTours.length > 0 ? (
            <div className={styles.toursGrid}>
              {filteredTours.map(tour => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🗺️"
              title="No Private Tours Found"
              description="No tours matched your selected category and destination criteria. Try selecting 'All Types' or another region."
              actionText="Reset Filters"
              onAction={() => {
                setSelectedCategory('all');
                setSelectedDestination('all');
              }}
            />
          )}
        </Container>
      </section>
    </div>
  );
}
