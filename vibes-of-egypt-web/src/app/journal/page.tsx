'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Journal.module.css';

export default function JournalPage() {
  const { t } = useLanguage();

  const articles = [
    {
      id: 'grand-egyptian-museum-guide',
      title: 'The Ultimate Guide to the Grand Egyptian Museum (GEM)',
      excerpt: 'Step inside the largest archaeological museum in the world, home to the complete treasures of King Tutankhamun and thousands of royal artifacts.',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
      category: 'Archaeology & Culture',
      readTime: '6 min read',
      date: 'November 2026'
    },
    {
      id: 'sailing-nile-dahabiya-experience',
      title: 'Why a Private Dahabiya Is the Purest Way to Sail the Nile',
      excerpt: 'Discover why twin-masted sailing vessels offer an intimate, wind-driven voyage impossible to match on larger commercial cruise liners.',
      image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
      category: 'Luxury Sailing',
      readTime: '5 min read',
      date: 'October 2026'
    },
    {
      id: 'hidden-tombs-valley-of-the-kings',
      title: 'Beyond Tutankhamun: Secret Tombs of Luxor’s West Bank',
      excerpt: 'Explore the vivid astronomical ceilings of Seti I and the subterranean masterpieces tucked away in the Valley of the Nobles.',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
      category: 'Egyptology Notes',
      readTime: '8 min read',
      date: 'September 2026'
    }
  ];

  return (
    <div className={styles.pageWrap}>
      {/* Banner */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerOverlay}></div>
        <div className={`container ${styles.bannerContent}`}>
          <span className={styles.bannerOverline}>Stories & Insights</span>
          <h1 className={styles.bannerTitle}>{t('nav_journal', 'Travel Journal')} & Magazine</h1>
          <p className={styles.bannerSubtitle}>
            Essays, historical explorations, and insider guides authored by resident Egyptologists and bespoke travel curators.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className={styles.catalogSection}>
        <div className="container">
          <div className={styles.articlesGrid}>
            {articles.map((art) => (
              <article key={art.id} className={styles.card}>
                <div className={styles.imageWrap}>
                  <img src={art.image} alt={art.title} className={styles.artImg} />
                  <span className={styles.categoryBadge}>{art.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.metaRow}>
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h2 className={styles.artTitle}>{art.title}</h2>
                  <p className={styles.artExcerpt}>{art.excerpt}</p>
                  <div className={styles.readMore}>
                    Read Article →
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

