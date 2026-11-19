'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import { tours, packages } from '@/lib/catalog';
import styles from './SpecialOffers.module.css';

export default function SpecialOffersPage() {
  const { t } = useLanguage();

  const discountedTours = tours.slice(0, 3);
  const discountedPackages = packages.slice(0, 2);

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>Limited Availability</span>
          <h1 className={styles.bannerTitle}>Special Seasonal Offers</h1>
          <p className={styles.bannerSubtitle}>
            Curated promotional opportunities for early bookings, seasonal Dahabiya charters, and complementary domestic flights.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.grid}>
            {discountedPackages.map((pkg) => (
              <div key={pkg.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={pkg.image} alt={pkg.title} className={styles.cardImg} />
                  <span className={styles.promoBadge}>Early Bird 15% Savings</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.categoryTag}>Comprehensive Circuit</span>
                  <h2 className={styles.title}>{pkg.title}</h2>
                  <p className={styles.overview}>{pkg.overview}</p>
                  <div className={styles.cardFooter}>
                    <div>
                      <span className={styles.originalPrice}>${Math.round(pkg.price * 1.18)}</span>
                      <span className={styles.currentPrice}>${pkg.price}</span>
                    </div>
                    <Link href={`/packages/${pkg.id}`} className={styles.btn}>
                      Claim Offer
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {discountedTours.map((tour) => (
              <div key={tour.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={tour.image} alt={tour.title} className={styles.cardImg} />
                  <span className={styles.promoBadge}>VIP Perk Included</span>
                </div>
                <div className={styles.cardBody}>
                  <span className={styles.categoryTag}>Private Day Tour</span>
                  <h2 className={styles.title}>{tour.title}</h2>
                  <p className={styles.overview}>{tour.overview}</p>
                  <div className={styles.cardFooter}>
                    <div>
                      <span className={styles.originalPrice}>${Math.round(tour.price * 1.2)}</span>
                      <span className={styles.currentPrice}>${tour.price}</span>
                    </div>
                    <Link href={`/tours/${tour.id}`} className={styles.btn}>
                      Claim Offer
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

