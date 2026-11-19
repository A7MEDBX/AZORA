'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getTourById } from '@/lib/catalog';
import styles from './TourDetail.module.css';

export default function TourDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const tour: any = slug ? getTourById(slug) : undefined;

  if (!tour) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2>Tour Not Found</h2>
        <Link href="/tours" style={{ color: '#C99A43', fontWeight: 'bold' }}>
          ← Back to Tours
        </Link>
      </div>
    );
  }

  const cityName = tour.destinationName || tour.city || 'Egypt';
  const desc = tour.description || tour.overview || tour.subheadline || '';
  const inclusionsList = tour.inclusions || tour.included || [];
  const highlightsList = tour.highlights || [];

  return (
    <div className={styles.pageWrap}>
      {/* Hero Header */}
      <section 
        className={styles.heroSection}
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.breadcrumb}>
            <Link href="/tours">Tours</Link>
            <span>/</span>
            <span>{cityName}</span>
            <span>/</span>
            <span>{tour.title}</span>
          </div>

          <div className={styles.metaBadges}>
            <span className={styles.categoryBadge}>{tour.category}</span>
            {tour.badge && <span className={styles.featuredBadge}>{tour.badge}</span>}
            <span className={styles.ratingBadge}>⭐ {tour.rating} ({tour.reviewsCount || 840} reviews)</span>
          </div>

          <h1 className={styles.tourTitle}>{tour.title}</h1>
          <p className={styles.quickDetails}>
            <span>📍 {cityName}</span>
            <span>•</span>
            <span>⏱️ {tour.duration}</span>
            <span>•</span>
            <span>👥 100% Private Guided Tour</span>
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className={styles.contentSection}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.mainCol}>
            <div className={styles.card}>
              <h2 className={styles.cardHeading}>Tour Overview</h2>
              <p className={styles.overviewText}>{desc}</p>

              {Array.isArray(highlightsList) && highlightsList.length > 0 && (
                <>
                  <h3 className={styles.subHeading}>Curated Highlights</h3>
                  <div className={styles.highlightsGrid}>
                    {highlightsList.map((highlight: string, idx: number) => (
                      <div key={idx} className={styles.highlightItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {Array.isArray(inclusionsList) && inclusionsList.length > 0 && (
                <>
                  <h3 className={styles.subHeading}>What is Included</h3>
                  <div className={styles.inclusionsList}>
                    {inclusionsList.map((item: string, idx: number) => (
                      <div key={idx} className={styles.inclusionItem}>
                        <span className={styles.includeIcon}>✅</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.bookingCard}>
              <div className={styles.priceRow}>
                <div>
                  <span className={styles.priceFrom}>{t('from_price', 'From')}</span>
                  <span className={styles.priceVal}>${tour.price}</span>
                  <span className={styles.pricePer}> / person</span>
                </div>
                <span className={styles.guaranteeTag}>Best Rate Guaranteed</span>
              </div>

              <div className={styles.bookingForm}>
                <div className={styles.formGroup}>
                  <label>Select Tour Date</label>
                  <input type="date" className={styles.formInput} defaultValue="2026-11-20" />
                </div>
                <div className={styles.formGroup}>
                  <label>Number of Guests</label>
                  <select className={styles.formSelect} defaultValue="2">
                    <option value="1">1 Traveler (Private)</option>
                    <option value="2">2 Travelers (Private)</option>
                    <option value="3">3 Travelers (Private)</option>
                    <option value="4">4 Travelers (Private)</option>
                    <option value="5+">5+ Travelers (Group Quote)</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Preferred Guide Language</label>
                  <select className={styles.formSelect} defaultValue="en">
                    <option value="en">English (Accredited Egyptologist)</option>
                    <option value="de">German / Deutsch</option>
                    <option value="fr">French / Français</option>
                    <option value="es">Spanish / Español</option>
                    <option value="ja">Japanese / 日本語</option>
                    <option value="ru">Russian / Русский</option>
                  </select>
                </div>

                <Link href="/plan-your-trip" className={styles.reserveBtn}>
                  Reserve This Tour
                </Link>

                <p className={styles.policyNote}>
                  🛡️ Free cancellation up to 48 hours before departure. No hidden charges.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
