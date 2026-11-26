import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { USE_MOCK_DATA } from '@/api/client';
import { experiences as mockExperiences } from '@/lib/catalog';
import { fetchExperiences } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { Container, PageBanner, EmptyState } from '@/components/ui';
import { ExperienceCard } from '@/components/cards';
import { FilterBar } from '@/features/filters';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './Experiences.module.css';

export default function ExperiencesPage() {
  const { t } = useLanguage();
  const { data: experiences } = useAsyncData(
    () => fetchExperiences(),
    [],
    USE_MOCK_DATA ? mockExperiences : []
  );

  usePageMeta({
    title: 'Signature Egyptian Experiences & Desert Safaris',
    description:
      'From sunrise hot air ballooning in Luxor to private White Desert stargazing camps, immerse yourself in hand-crafted Egyptian encounters.'
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'All Encounters', value: 'all' },
    { label: 'Aerial Adventures', value: 'Aerial' },
    { label: 'Desert Safaris', value: 'Desert' },
    { label: 'Nile Sailing', value: 'Sailing' },
    { label: 'Marine & Diving', value: 'Marine' },
    { label: 'Cultural & Food', value: 'Cultural' }
  ];

  const filteredExperiences = (experiences || []).filter(exp => {
    if (selectedCategory === 'all') return true;
    const cat = `${exp.category || ''} ${exp.title || ''}`.toLowerCase();
    return cat.includes(selectedCategory.toLowerCase());
  });

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="Unforgettable Sensations"
        title="Bespoke Egyptian Experiences"
        subtitle="Beyond traditional sight-seeing: float in hot air balloons over Luxor at dawn, dive pristine Red Sea coral walls, and savor royal Bedouin dinners under the Sinai stars."
      />

      {/* Grid */}
      <section className={styles.catalogSection}>
        <Container size="standard">
          <FilterBar
            categories={categories}
            activeCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          {filteredExperiences.length > 0 ? (
            <div className={styles.experiencesGrid}>
              {filteredExperiences.map(exp => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="✨"
              title="No Experiences Found"
              description="No bespoke experiences matched your selected category."
              actionText="View All Experiences"
              onAction={() => setSelectedCategory('all')}
            />
          )}
        </Container>
      </section>
    </div>
  );
}
