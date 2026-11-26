import React from 'react';
import { Link } from 'react-router-dom';
import { USE_MOCK_DATA } from '@/api/client';
import { specialOffers as mockOffers } from '@/lib/catalog';
import { fetchSpecialOffers } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { Container, PageBanner, EmptyState } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import type { SpecialOffer } from '@/types';
import styles from './SpecialOffers.module.css';

function getOfferTargetUrl(offer: SpecialOffer): string {
  switch (offer.targetType) {
    case 'tour':
      return `/tours/${offer.slug}`;
    case 'package':
      return `/packages/${offer.slug}`;
    case 'cruise':
      return `/nile-cruises/${offer.slug}`;
    default:
      return `/experiences/${offer.slug}`;
  }
}

export default function SpecialOffersPage() {
  usePageMeta({
    title: 'Exclusive Special Offers & Seasonal Privileges',
    description:
      'Curated promotional opportunities for early bookings, seasonal Dahabiya charters, and complimentary domestic flights.'
  });

  const { data: offers, isLoading } = useAsyncData(
    fetchSpecialOffers,
    [],
    USE_MOCK_DATA ? mockOffers : []
  );

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
          {offers.length > 0 ? (
            <div className={styles.grid}>
              {offers.map(offer => (
                <article key={offer.id} className={styles.card}>
                  <div className={styles.imageWrap}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className={styles.cardImg}
                      loading="lazy"
                    />
                    <span className={styles.promoBadge}>
                      {offer.discount || offer.badge || 'Special Offer'}
                    </span>
                  </div>
                  <div className={styles.cardBody}>
                    <span className={styles.categoryTag}>{offer.category}</span>
                    <h3 className={styles.title}>{offer.title}</h3>
                    <p className={styles.overview}>{offer.description}</p>
                    <div className={styles.cardFooter}>
                      <div>
                        <span className={styles.originalPrice}>${offer.originalPrice}</span>
                        <span className={styles.currentPrice}>${offer.discountedPrice}</span>
                      </div>
                      <Link to={getOfferTargetUrl(offer)} className={styles.btn}>
                        Claim Offer
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : !isLoading ? (
            <EmptyState
              icon="✨"
              title="No Active Special Offers"
              description="Our seasonal privileges are currently being refreshed. Explore our curated packages and private tours."
              actionText="Explore Packages"
              actionTo="/packages"
            />
          ) : null}
        </Container>
      </section>
    </div>
  );
}
