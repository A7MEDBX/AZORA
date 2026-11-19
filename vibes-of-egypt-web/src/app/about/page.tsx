'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import styles from './About.module.css';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>The Story of Vibes of Egypt</span>
          <h1 className={styles.bannerTitle}>{t('nav_about', 'About Us')} & Our Heritage</h1>
          <p className={styles.bannerSubtitle}>
            Founded on a passion for ancient Egyptian history and contemporary ultra-luxury hospitality, we bridge centuries of civilization with tailored white-glove traveler care.
          </p>
        </div>
      </section>

      {/* Main Narrative */}
      <section className={styles.contentSection}>
        <div className={`container ${styles.narrativeGrid}`}>
          <div className={styles.narrativeText}>
            <span className={styles.sectionOverline}>Who We Are</span>
            <h2 className={styles.sectionHeading}>Guardians of Egyptian Hospitality</h2>
            <p className={styles.paragraph}>
              At Vibes of Egypt, we believe travel should not merely be about ticking off monuments. It is an emotional dialogue with humanity’s earliest architects, astronomers, and artists.
            </p>
            <p className={styles.paragraph}>
              Our founders—a collective of distinguished Egyptologists and veteran bespoke travel architects—set out to craft a platform where every single itinerary is entirely private, culturally enriching, and executed with uncompromising precision.
            </p>
            <p className={styles.paragraph}>
              From accessing the private chamber beneath the Great Pyramid to chartering traditional twin-masted Dahabiyas away from mass-tourism routes, our guests encounter Egypt the way kings and scholars once did.
            </p>
          </div>

          <div className={styles.statsCard}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Licensed Egyptologists</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>19+</span>
              <span className={styles.statLabel}>Egyptian Destinations</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>4.9/5</span>
              <span className={styles.statLabel}>Traveler Satisfaction</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>24/7</span>
              <span className={styles.statLabel}>Concierge Availability</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <span className={styles.sectionOverline}>Our Core Values</span>
            <h2 className={styles.sectionHeading}>The Vibes of Egypt Distinction</h2>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💎</div>
              <h3 className={styles.valueTitle}>Authentic Luxury</h3>
              <p className={styles.valueDesc}>
                True luxury is access, privacy, and time. We create spaces for contemplative wonder without the rush of commercial tour buses.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>📜</div>
              <h3 className={styles.valueTitle}>Academic Rigor</h3>
              <p className={styles.valueDesc}>
                Every guide holds university credentials in Egyptology. We bring hieroglyphs and tomb frescoes alive with accurate storytelling.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌍</div>
              <h3 className={styles.valueTitle}>Sustainable Heritage</h3>
              <p className={styles.valueDesc}>
                We empower local artisans, Nubian community cooperatives, and support monument conservation projects across Upper Egypt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

