'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getPackageById } from '@/lib/catalog';
import styles from './PackageDetail.module.css';

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const pkg: any = slug ? getPackageById(slug) : undefined;

  if (!pkg) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2>Package Not Found</h2>
        <Link href="/packages" style={{ color: '#C99A43', fontWeight: 'bold' }}>
          ← Back to Packages
        </Link>
      </div>
    );
  }

  const routeStr = pkg.route || (Array.isArray(pkg.destinationsCovered) ? pkg.destinationsCovered.join(' ➔ ') : 'Cairo ➔ Luxor ➔ Aswan');

  return (
    <div className={styles.pageWrap}>
      <section 
        className={styles.heroSection}
        style={{ backgroundImage: `url(${pkg.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.breadcrumb}>
            <Link href="/packages">Packages</Link>
            <span>/</span>
            <span>{pkg.title}</span>
          </div>
          <div className={styles.metaBadges}>
            <span className={styles.durationBadge}>{pkg.duration || `${pkg.durationDays || 8} Days`}</span>
            {pkg.badge && <span className={styles.badge}>{pkg.badge}</span>}
            <span className={styles.ratingBadge}>⭐ {pkg.rating} ({pkg.reviewsCount || 420} reviews)</span>
          </div>
          <h1 className={styles.pkgTitle}>{pkg.title}</h1>
          <p className={styles.routeText}>Destinations: {routeStr}</p>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.mainCol}>
            <div className={styles.card}>
              <h2 className={styles.cardHeading}>Expedition Overview</h2>
              <p className={styles.overviewText}>{pkg.description || pkg.overview}</p>
              
              {Array.isArray(pkg.highlights) && pkg.highlights.length > 0 && (
                <>
                  <h3 className={styles.subHeading}>Circuit Highlights</h3>
                  <div className={styles.highlightsGrid}>
                    {pkg.highlights.map((h: string, i: number) => (
                      <div key={i} className={styles.highlightItem}>
                        <span className={styles.goldStar}>★</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {Array.isArray(pkg.itinerary) && pkg.itinerary.length > 0 ? (
                <>
                  <h3 className={styles.subHeading}>Day-by-Day Master Itinerary</h3>
                  <div className={styles.timeline}>
                    {pkg.itinerary.map((step: any, idx: number) => (
                      <div key={idx} className={styles.dayCard}>
                        <div className={styles.dayHeader}>
                          <span className={styles.dayBadge}>Day {step.day || idx + 1}</span>
                          <h4 className={styles.dayTitle}>{step.title}</h4>
                          {step.meals && <span className={styles.mealsBadge}>🍽️ {step.meals}</span>}
                        </div>
                        <p className={styles.dayDesc}>{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className={styles.subHeading}>Included Accommodations & Perks</h3>
                  <div className={styles.highlightsGrid}>
                    <div className={styles.highlightItem}>
                      <span className={styles.goldStar}>★</span>
                      <span>Hotels: {pkg.hotels || '5-Star Luxury Nile Resort & Spa'}</span>
                    </div>
                    <div className={styles.highlightItem}>
                      <span className={styles.goldStar}>★</span>
                      <span>Domestic Flights: Cairo ⇄ Luxor/Aswan included</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <aside className={styles.sidebar}>
            <div className={styles.bookingCard}>
              <div className={styles.priceRow}>
                <div>
                  <span className={styles.priceFrom}>{t('from_price', 'From')}</span>
                  <span className={styles.priceVal}>${pkg.price}</span>
                  <span className={styles.pricePer}> / person</span>
                </div>
                <span className={styles.allInclusiveTag}>Luxury All-Inclusive</span>
              </div>
              <Link href="/plan-your-trip" className={styles.inquireBtn}>
                Request Bespoke Quotation
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
