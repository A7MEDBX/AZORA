import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { tours, packages } from '@/lib/catalog';
import { Container, PageBanner } from '@/components/ui';
import { TourCard, PackageCard } from '@/components/cards';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './SpecialOffers.module.css';

export default function SpecialOffersPage() {
  const { t } = useLanguage();

  usePageMeta({
    title: 'Exclusive Special Offers & Seasonal Privileges',
    description:
      'Curated promotional opportunities for early bookings, seasonal Dahabiya charters, and complimentary domestic flights.'
  });

  const discountedTours = (tours || []).slice(0, 3);
  const discountedPackages = (packages || []).slice(0, 2);

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="Limited Availability"
        title="Special Seasonal Offers"
        subtitle="Curated promotional opportunities for early bookings, seasonal Dahabiya charters, and complementary domestic flights."
      />

      {/* Offers Grid */}
      <section className={styles.catalogSection}>
        <Container size="standard">
          <div className={styles.grid}>
            {discountedPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} actionText="Claim Offer" />
            ))}

            {discountedTours.map(tour => (
              <TourCard key={tour.id} tour={tour} actionText="Claim Offer" />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
