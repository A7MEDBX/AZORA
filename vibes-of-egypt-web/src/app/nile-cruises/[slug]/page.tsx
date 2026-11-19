'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getCruiseById } from '@/lib/catalog';
import styles from './CruiseDetail.module.css';

export default function CruiseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const cruise: any = slug ? getCruiseById(slug) : undefined;

  if (!cruise) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2>Cruise Not Found</h2>
        <Link href="/nile-cruises" style={{ color: '#C99A43', fontWeight: 'bold' }}>
          ← Back to Nile Cruises
        </Link>
      </div>
    );
  }

  const vesselTypeName = cruise.vesselType || cruise.type || 'Luxury Nile Cruise';
  const durationStr = cruise.duration || (cruise.durationNights ? `${cruise.durationNights} Nights Sailing` : '5 Days / 4 Nights');
  const routeStr = cruise.route || 'Luxor to Aswan';
  const descriptionText = cruise.description || cruise.lead || 'Exclusive river voyage along the Nile.';
  const amenitiesList = Array.isArray(cruise.amenities) ? cruise.amenities : [];
  const highlightsList = Array.isArray(cruise.highlights) ? cruise.highlights : [
    'Private Balcony Suites',
    'Full-Board Fine Dining by Master Chef',
    'Private Guided Shore Excursions',
    'Sunset Cocktails on Handcrafted Teak Deck'
  ];

  return (
    <div className={styles.pageWrap}>
      {/* Hero Header */}
      <section 
        className={styles.heroSection}
        style={{ backgroundImage: `url(${cruise.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.breadcrumb}>
            <Link href="/nile-cruises">Nile Cruises</Link>
            <span>/</span>
            <span>{cruise.title}</span>
          </div>

          <div className={styles.metaBadges}>
            <span className={styles.vesselBadge}>{vesselTypeName}</span>
            <span className={styles.durationBadge}>{durationStr}</span>
            <span className={styles.ratingBadge}>⭐ {cruise.rating || 5} ({cruise.reviewsCount || 120} reviews)</span>
          </div>

          <h1 className={styles.cruiseTitle}>{cruise.title}</h1>
          <p className={styles.routeText}>Route: {routeStr}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.contentSection}>
        <div className={`container ${styles.layout}`}>
          <div className={styles.mainCol}>
            <div className={styles.card}>
              <h2 className={styles.cardHeading}>About This Voyage</h2>
              <p className={styles.overviewText}>{descriptionText}</p>

              <h3 className={styles.subHeading}>Sailing & Temple Highlights</h3>
              <div className={styles.highlightsGrid}>
                {highlightsList.map((h: string, i: number) => (
                  <div key={i} className={styles.highlightItem}>
                    <span className={styles.goldAnchor}>⚓</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {Array.isArray(cruise.itinerary) && cruise.itinerary.length > 0 && (
                <>
                  <h3 className={styles.subHeading}>Port-by-Port Itinerary</h3>
                  <div className={styles.timeline}>
                    {cruise.itinerary.map((step: any, idx: number) => (
                      <div key={idx} className={styles.portCard}>
                        <div className={styles.portHeader}>
                          <span className={styles.portBadge}>Day {step.day || idx + 1}</span>
                          <h4 className={styles.portName}>{step.port || `Port Stop ${idx + 1}`}</h4>
                        </div>
                        <p className={styles.portActivity}>{step.activity || step.desc}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {amenitiesList.length > 0 && (
                <>
                  <h3 className={styles.subHeading}>Vessel Amenities</h3>
                  <div className={styles.amenitiesList}>
                    {amenitiesList.map((item: string, idx: number) => (
                      <div key={idx} className={styles.amenityItem}>
                        <span className={styles.check}>✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.bookingCard}>
              <div className={styles.priceRow}>
                <div>
                  <span className={styles.priceFrom}>{t('from_price', 'From')}</span>
                  <span className={styles.priceVal}>${cruise.price}</span>
                  <span className={styles.pricePer}> / cabin</span>
                </div>
                <span className={styles.allInclusiveTag}>Full Board</span>
              </div>

              <div className={styles.formGroup}>
                <label>Sailing Date</label>
                <input type="date" className={styles.formInput} defaultValue="2026-11-25" />
              </div>
              <div className={styles.formGroup}>
                <label>Cabin Selection</label>
                <select className={styles.formSelect} defaultValue="deluxe">
                  <option value="deluxe">Deluxe Nile View Suite</option>
                  <option value="royal">Royal Terrace Suite</option>
                  <option value="presidential">Presidential Panoramic Suite</option>
                </select>
              </div>

              <Link href="/plan-your-trip" className={styles.inquireBtn}>
                Check Cabin Availability
              </Link>

              <p className={styles.policyNote}>
                🌊 Includes gourmet dining, daily temple excursions, and private airport transfers.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
