'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { getDestinationById, tours } from '@/lib/catalog';
import styles from './DestinationDetail.module.css';

export default function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const destination: any = slug ? getDestinationById(slug) : undefined;

  if (!destination) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <h2>Destination Not Found</h2>
        <Link href="/destinations" style={{ color: '#C99A43', fontWeight: 'bold' }}>
          ← Back to Destinations
        </Link>
      </div>
    );
  }

  const destinationTours = (tours || []).filter((tour: any) => {
    const destId = (destination.id || '').toLowerCase();
    const tourCity = (tour.city || tour.destinationId || tour.destinationName || '').toLowerCase();
    return tourCity.includes(destId) || destId.includes(tourCity);
  });

  const highlightsList = Array.isArray(destination.highlights) ? destination.highlights : [];

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section 
        className={styles.heroSection}
        style={{ backgroundImage: `url(${destination.heroImage || destination.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.breadcrumb}>
            <Link href="/destinations">Destinations</Link>
            <span>/</span>
            <span>{destination.name}</span>
          </div>
          <span className={styles.categoryBadge}>{destination.category}</span>
          <h1 className={styles.destTitle}>{destination.name}</h1>
          <p className={styles.tagline}>{destination.tagline}</p>
        </div>
      </section>

      {/* Main Content & Itineraries */}
      <section className={styles.contentSection}>
        <div className={`container ${styles.contentLayout}`}>
          {/* Left Column: Story & Highlights */}
          <div className={styles.mainCol}>
            <div className={styles.storyCard}>
              <h2 className={styles.sectionHeading}>The Essence of {destination.name}</h2>
              <p className={styles.descriptionText}>{destination.description}</p>

              {highlightsList.length > 0 && (
                <>
                  <h3 className={styles.subHeading}>Unmissable Highlights</h3>
                  <div className={styles.highlightsGrid}>
                    {highlightsList.map((highlight: string, index: number) => (
                      <div key={index} className={styles.highlightItem}>
                        <span className={styles.highlightIcon}>✨</span>
                        <span className={styles.highlightText}>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Tours available for this destination */}
            <div className={styles.toursSection}>
              <h2 className={styles.sectionHeading}>
                Available Private Tours in {destination.name} ({destinationTours.length})
              </h2>

              <div className={styles.toursList}>
                {destinationTours.map((tour: any) => {
                  const tourDesc = tour.overview || tour.description || tour.subheadline || '';
                  return (
                    <div key={tour.id} className={styles.tourCard}>
                      <img src={tour.image} alt={tour.title} className={styles.tourImg} />
                      <div className={styles.tourDetails}>
                        <div className={styles.tourHeader}>
                          <span className={styles.tourCategory}>{tour.category || 'Private Tour'}</span>
                          <span className={styles.tourDuration}>⏱️ {tour.duration || 'Full Day'}</span>
                        </div>
                        <h3 className={styles.tourTitle}>{tour.title}</h3>
                        <p className={styles.tourOverview}>{tourDesc}</p>
                        <div className={styles.tourFooter}>
                          <div>
                            <span className={styles.priceLabel}>From</span>
                            <span className={styles.priceVal}>${tour.price}</span>
                            <span className={styles.pricePer}> / person</span>
                          </div>
                          <Link href={`/tours/${tour.id}`} className={styles.bookBtn}>
                            {t('btn_view_details', 'View Details')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Key Travel Facts & Booking Widget */}
          <aside className={styles.sidebar}>
            <div className={styles.factsCard}>
              <h3 className={styles.factsHeading}>Destination Intelligence</h3>
              <div className={styles.factItem}>
                <span className={styles.factLabel}>Best Season to Visit:</span>
                <span className={styles.factValue}>{destination.bestTimeToVisit || 'October to April'}</span>
              </div>
              <div className={styles.factItem}>
                <span className={styles.factLabel}>Starting Price:</span>
                <span className={styles.factValue}>From ${destination.startingPrice || 45} USD</span>
              </div>
              <div className={styles.factItem}>
                <span className={styles.factLabel}>Curated Private Tours:</span>
                <span className={styles.factValue}>{destination.tourCount || 10} Handcrafted Experiences</span>
              </div>
              <div className={styles.factItem}>
                <span className={styles.factLabel}>Guided Language:</span>
                <span className={styles.factValue}>EN, DE, FR, ES, JA, RU</span>
              </div>
              <Link href="/plan-your-trip" className={styles.customPlanBtn}>
                Customize a {destination.name} Journey
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
