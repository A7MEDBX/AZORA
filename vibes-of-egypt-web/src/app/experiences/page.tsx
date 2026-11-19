'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import { experiences } from '@/lib/catalog';
import styles from './Experiences.module.css';

export default function ExperiencesPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>Unforgettable Sensations</span>
          <h1 className={styles.bannerTitle}>Bespoke Egyptian Experiences</h1>
          <p className={styles.bannerSubtitle}>
            Beyond traditional sight-seeing: float in hot air balloons over Luxor at dawn, dive pristine Red Sea coral walls, and savor royal Bedouin dinners under the Sinai stars.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.experiencesGrid}>
            {(experiences || []).map((exp: any) => {
              const highlightsList = Array.isArray(exp.highlights) ? exp.highlights : [];
              const categoryName = exp.category || 'Bespoke Experience';
              const durationStr = exp.duration || 'Flexible';
              const descriptionText = exp.description || 'An exclusive handcrafted Egyptian travel experience.';

              return (
                <div key={exp.id} className={styles.card}>
                  <div className={styles.imageWrap}>
                    <img src={exp.image} alt={exp.title} className={styles.expImg} />
                    {exp.badge && <span className={styles.badge}>{exp.badge}</span>}
                    <span className={styles.durationTag}>⏱️ {durationStr}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.locCat}>
                      <span className={styles.loc}>📍 {exp.location || 'Egypt'}</span>
                      <span>•</span>
                      <span className={styles.cat}>{categoryName}</span>
                    </div>

                    <h2 className={styles.expTitle}>{exp.title}</h2>
                    <p className={styles.description}>{descriptionText}</p>

                    {highlightsList.length > 0 && (
                      <div className={styles.highlightsBox}>
                        <span className={styles.boxTitle}>Included Highlights:</span>
                        <ul className={styles.highlightsList}>
                          {highlightsList.map((h: string, i: number) => (
                            <li key={i}>✓ {h}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className={styles.cardFooter}>
                      <div>
                        <span className={styles.priceFrom}>{t('from_price', 'From')}</span>
                        <span className={styles.priceVal}>${exp.price}</span>
                        <span className={styles.pricePer}> / person</span>
                      </div>
                      <Link href="/plan-your-trip" className={styles.bookBtn}>
                        Book Experience
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
