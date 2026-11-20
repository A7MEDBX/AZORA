import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { destinations } from '@/lib/catalog';
import { Container, PageBanner } from '@/components/ui';
import { DestinationCard } from '@/components/cards';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './Destinations.module.css';

export default function DestinationsPage() {
  const { t } = useLanguage();

  usePageMeta({
    title: 'Destinations of Egypt — 19 Ancient & Coastal Sanctuaries',
    description:
      'From the monumental Pyramids of Giza to the tranquil Nile cataracts of Aswan, the Western Desert oases, and the azure coral sanctuaries of the Red Sea.'
  });

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="Visual Atlas of Antiquity"
        title={`${t('nav_destinations', 'Destinations')} of Egypt`}
        subtitle="From the monumental Pyramids of Giza to the tranquil Nile cataracts of Aswan and the azure coral sanctuaries of the Red Sea."
      />

      {/* Grid of all destinations */}
      <section className={styles.catalogSection}>
        <Container size="standard">
          <div className={styles.destinationsGrid}>
            {(destinations || []).map(dest => (
              <DestinationCard key={dest.id} destination={dest} variant="editorial" />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
