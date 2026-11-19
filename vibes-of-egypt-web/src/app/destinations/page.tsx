'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import { destinations } from '@/lib/catalog';
import styles from './Destinations.module.css';

export default function DestinationsPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.pageWrap}>
      {/* Editorial Header Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>Visual Atlas of Antiquity</span>
          <h1 className={styles.bannerTitle}>{t('nav_destinations', 'Destinations')} of Egypt</h1>
          <p className={styles.bannerSubtitle}>
            From the monumental Pyramids of Giza to the tranquil Nile cataracts of Aswan and the azure coral sanctuaries of the Red Sea.
          </p>
        </div>
      </section>

      {/* Grid of all destinations */}
      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.destinationsGrid}>
            {destinations.map((dest) => (
              <Link href={`/destinations/${dest.id}`} key={dest.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={dest.image} alt={dest.name} className={styles.cardImg} />
                  <div className={styles.cardOverlay}></div>
                  <span className={styles.categoryBadge}>{dest.category}</span>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.nameRow}>
                    <h2 className={styles.destName}>{dest.name}</h2>
                    {dest.arabicName && <span className={styles.arabicName}>{dest.arabicName}</span>}
                  </div>
                  <p className={styles.tagline}>{dest.tagline}</p>
                  <p className={styles.description}>{dest.description}</p>
                  
                  <div className={styles.highlightsWrap}>
                    <span className={styles.highlightsLabel}>Key Highlights:</span>
                    <ul className={styles.highlightsList}>
                      {dest.highlights.slice(0, 3).map((h, idx) => (
                        <li key={idx}>• {h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.cardFooter}>
                    <div>
                      <span className={styles.metaLabel}>Best Season:</span>
                      <span className={styles.metaValue}>{dest.bestTimeToVisit}</span>
                    </div>
                    <span className={styles.exploreLink}>
                      {dest.tourCount} Tours Available →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

