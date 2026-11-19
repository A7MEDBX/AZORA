'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import { cruises } from '@/lib/catalog';
import styles from './Cruises.module.css';

export default function NileCruisesPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>The Eternal River Voyage</span>
          <h1 className={styles.bannerTitle}>Nile & Dahabiya Cruises</h1>
          <p className={styles.bannerSubtitle}>
            Drift silently between Luxor and Aswan on handcrafted private Dahabiyas and five-star luxury cruisers, exploring ancient riverbank temples at sunrise and sunset.
          </p>
        </div>
      </section>

      {/* Cruises Grid */}
      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.cruisesGrid}>
            {(cruises || []).map((cruise: any) => {
              const amenitiesList = Array.isArray(cruise.amenities) ? cruise.amenities : [];
              const vesselTypeName = cruise.vesselType || cruise.type || 'Luxury Nile Cruise';
              const routeStr = cruise.route || 'Luxor to Aswan';
              const durationStr = cruise.duration || (cruise.durationNights ? `${cruise.durationNights} Nights` : '4 Nights');
              const descriptionText = cruise.lead || cruise.description || 'Exclusive luxury Nile voyage with private Egyptologist guidance.';

              return (
                <div key={cruise.id} className={styles.card}>
                  <div className={styles.imageWrap}>
                    <img src={cruise.image} alt={cruise.title} className={styles.cruiseImg} />
                    <span className={styles.vesselBadge}>{vesselTypeName}</span>
                    {cruise.badge && <span className={styles.featureBadge}>{cruise.badge}</span>}
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.routeHeader}>
                      <span>{routeStr}</span>
                      <span>•</span>
                      <span>{durationStr}</span>
                    </div>
                    <h2 className={styles.cruiseTitle}>{cruise.title}</h2>
                    <p className={styles.description}>{descriptionText}</p>

                    {amenitiesList.length > 0 && (
                      <div className={styles.amenitiesWrap}>
                        <span className={styles.amenitiesTitle}>Vessel Highlights:</span>
                        <div className={styles.amenitiesTags}>
                          {amenitiesList.map((item: string, idx: number) => (
                            <span key={idx} className={styles.tag}>⛵ {item}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={styles.cardFooter}>
                      <div>
                        <span className={styles.priceFrom}>{t('from_price', 'From')}</span>
                        <span className={styles.priceVal}>${cruise.price}</span>
                        <span className={styles.pricePer}> / cabin</span>
                      </div>
                      <Link href={`/nile-cruises/${cruise.id}`} className={styles.detailsBtn}>
                        {t('btn_view_details', 'View Details')}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
