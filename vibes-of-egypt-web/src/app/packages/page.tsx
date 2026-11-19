'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import { packages } from '@/lib/catalog';
import styles from './Packages.module.css';

export default function PackagesPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>Seamless Multi-Day Expeditions</span>
          <h1 className={styles.bannerTitle}>Comprehensive Tour Packages</h1>
          <p className={styles.bannerSubtitle}>
            End-to-end luxury itineraries combining Cairo, Nile Cruises, Abu Simbel, and Red Sea resorts with five-star accommodations and private Egyptologist guides.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.packagesGrid}>
            {packages.map((pkg: any) => (
              <div key={pkg.id} className={styles.pkgCard}>
                <div className={styles.imageWrap}>
                  <img src={pkg.image} alt={pkg.title} className={styles.pkgImg} />
                  {pkg.badge && <span className={styles.badge}>{pkg.badge}</span>}
                  <span className={styles.durationTag}>
                    {pkg.duration || `${pkg.durationDays || 8} Days`}
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.destList}>
                    {pkg.route || (Array.isArray(pkg.destinationsCovered) ? pkg.destinationsCovered.join(' • ') : 'Cairo • Luxor • Aswan')}
                  </div>
                  <h2 className={styles.pkgTitle}>{pkg.title}</h2>
                  <p className={styles.overview}>{pkg.description || pkg.overview}</p>

                  {Array.isArray(pkg.highlights) && pkg.highlights.length > 0 && (
                    <div className={styles.highlightsBox}>
                      <span className={styles.highlightsHeader}>Package Highlights:</span>
                      <ul className={styles.highlightsList}>
                        {pkg.highlights.map((h: string, i: number) => (
                          <li key={i}>✓ {h}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className={styles.cardFooter}>
                    <div>
                      <span className={styles.priceFrom}>{t('from_price', 'From')}</span>
                      <span className={styles.priceVal}>${pkg.price}</span>
                      <span className={styles.pricePer}> / person</span>
                    </div>
                    <Link href={`/packages/${pkg.id}`} className={styles.detailsBtn}>
                      {t('btn_view_details', 'View Details')}
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
