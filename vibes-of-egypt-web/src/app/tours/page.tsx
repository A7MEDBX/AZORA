'use client';

import React, { useState } from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import { tours } from '@/lib/catalog';
import styles from './Tours.module.css';

export default function ToursPage() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDestination, setSelectedDestination] = useState<string>('all');

  const categories = ['all', 'Daily Tours', 'Multi-Day', 'Nile Cruise', 'Private'];
  const destinationList = ['all', 'cairo', 'luxor', 'aswan', 'alexandria', 'hurghada'];

  const filteredTours = tours.filter((tour: any) => {
    const tourCategory = tour.category || '';
    const tourCity = (tour.city || tour.destinationId || tour.destinationName || '').toLowerCase();
    
    const matchesCategory = selectedCategory === 'all' || tourCategory.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesDest = selectedDestination === 'all' || tourCity.includes(selectedDestination.toLowerCase());
    return matchesCategory && matchesDest;
  });

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>Accredited Egyptologist Guidance</span>
          <h1 className={styles.bannerTitle}>Curated Private Tours</h1>
          <p className={styles.bannerSubtitle}>
            Immerse yourself in monumental history with bespoke private journeys led by Egyptologist guides, featuring climate-controlled transport and skip-the-line VIP privileges.
          </p>
        </div>
      </section>

      {/* Filter and Tours List */}
      <section className={styles.catalogSection}>
        <div className="container">
          {/* Filter Bar */}
          <div className={styles.filterBar}>
            <div className={styles.filterPills}>
              <span className={styles.filterLabel}>Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filterPill} ${selectedCategory === cat ? styles.filterPillActive : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? 'All Types' : cat}
                </button>
              ))}
            </div>

            <div className={styles.destFilter}>
              <span className={styles.filterLabel}>Destination:</span>
              <select 
                value={selectedDestination} 
                onChange={(e) => setSelectedDestination(e.target.value)}
                className={styles.destSelect}
              >
                <option value="all">All Destinations</option>
                <option value="cairo">Cairo & Giza</option>
                <option value="luxor">Luxor</option>
                <option value="aswan">Aswan</option>
                <option value="alexandria">Alexandria</option>
                <option value="hurghada">Hurghada</option>
              </select>
            </div>
          </div>

          {/* Tours Grid */}
          <div className={styles.toursGrid}>
            {filteredTours.map((tour: any) => {
              const highlightsList = tour.highlights || tour.inclusions || [];
              const desc = tour.overview || tour.description || tour.subheadline || '';
              const cityName = tour.destinationName || tour.city || 'Egypt';

              return (
                <div key={tour.id} className={styles.tourCard}>
                  <div className={styles.imageWrap}>
                    <img src={tour.image} alt={tour.title} className={styles.tourImg} />
                    {tour.badge && <span className={styles.badge}>{tour.badge}</span>}
                    <span className={styles.durationTag}>⏱️ {tour.duration}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.destinationName}>{cityName}</div>
                    <h3 className={styles.tourTitle}>{tour.title}</h3>
                    <p className={styles.overview}>{desc}</p>

                    {Array.isArray(highlightsList) && highlightsList.length > 0 && (
                      <div className={styles.highlightsPreview}>
                        {highlightsList.slice(0, 2).map((h: string, i: number) => (
                          <span key={i} className={styles.highlightPill}>✓ {h}</span>
                        ))}
                      </div>
                    )}

                    <div className={styles.cardFooter}>
                      <div>
                        <span className={styles.priceFrom}>{t('from_price', 'From')}</span>
                        <span className={styles.priceVal}>${tour.price}</span>
                        <span className={styles.pricePer}> / person</span>
                      </div>
                      <Link href={`/tours/${tour.id}`} className={styles.detailsBtn}>
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
