import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Breadcrumbs, ImageGallery } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import type { DestinationDetailTemplateProps } from './types';
import styles from './DestinationDetailTemplate.module.css';

export const DestinationDetailTemplate: React.FC<DestinationDetailTemplateProps> = ({
  destination,
  relatedTours = []
}) => {
  usePageMeta({
    title: `${destination.name} — Luxury Guide & Private Itineraries`,
    description: destination.shortDescription || destination.description,
    image: destination.heroImage || destination.image
  });

  const highlights = Array.isArray(destination.highlights) ? destination.highlights : [];
  const gallery = Array.isArray(destination.gallery) && destination.gallery.length > 0
    ? destination.gallery
    : [destination.image];

  return (
    <div className={styles.pageWrap}>
      {/* Hero Section */}
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url(${destination.heroImage || destination.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <Breadcrumbs
            items={[
              { label: 'Destinations', path: '/destinations' },
              { label: destination.name }
            ]}
          />
          <span className={styles.categoryBadge}>{destination.category}</span>
          <h1 className={styles.destTitle}>{destination.name}</h1>
          <p className={styles.tagline}>{destination.tagline}</p>
        </div>
      </section>

      {/* Main Content & Itineraries */}
      <section className={styles.contentSection}>
        <Container size="standard">
          <div className={styles.contentLayout}>
            {/* Left Column: Story & Highlights */}
            <div className={styles.mainCol}>
              <div className={styles.storyCard}>
                <h2 className={styles.sectionHeading}>The Essence of {destination.name}</h2>
                <p className={styles.descriptionText}>{destination.description}</p>

                {highlights.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Unmissable Highlights</h3>
                    <div className={styles.highlightsGrid}>
                      {highlights.map((highlight, index) => (
                        <div key={index} className={styles.highlightItem}>
                          <span className={styles.highlightIcon}>✨</span>
                          <span className={styles.highlightText}>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Gallery */}
                {gallery.length > 0 && (
                  <div className={styles.gallerySection}>
                    <h3 className={styles.subHeading}>Visual Journey</h3>
                    <ImageGallery images={gallery} alt={destination.name} />
                  </div>
                )}
              </div>

              {/* Related Tours */}
              {relatedTours.length > 0 && (
                <div className={styles.toursSection}>
                  <h2 className={styles.sectionHeading}>
                    Available Private Tours in {destination.name} ({relatedTours.length})
                  </h2>

                  <div className={styles.toursList}>
                    {relatedTours.map(tour => {
                      const tourDesc = tour.overview || tour.description || tour.subheadline || '';
                      return (
                        <div key={tour.id} className={styles.tourCard}>
                          <img
                            src={tour.image}
                            alt={tour.title}
                            className={styles.tourImg}
                            loading="lazy"
                          />
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
                              <Link to={`/tours/${tour.slug || tour.id}`} className={styles.bookBtn}>
                                Explore Tour
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Destination Intelligence */}
            <aside className={styles.sidebarCol}>
              <div className={styles.factsCard}>
                <h3 className={styles.factsHeading}>Destination Intelligence</h3>

                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Region & Classification</span>
                  <span className={styles.factValue}>{destination.category}</span>
                </div>

                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Optimal Visiting Season</span>
                  <span className={styles.factValue}>
                    {destination.practicalInfo?.bestSeason || destination.bestTimeToVisit}
                  </span>
                </div>

                {destination.practicalInfo?.climate && (
                  <div className={styles.factItem}>
                    <span className={styles.factLabel}>Climate & Terrain</span>
                    <span className={styles.factValue}>{destination.practicalInfo.climate}</span>
                  </div>
                )}

                {destination.practicalInfo?.airport && (
                  <div className={styles.factItem}>
                    <span className={styles.factLabel}>Arrival Hub</span>
                    <span className={styles.factValue}>{destination.practicalInfo.airport}</span>
                  </div>
                )}

                {destination.practicalInfo?.recommendedStay && (
                  <div className={styles.factItem}>
                    <span className={styles.factLabel}>Recommended Stay</span>
                    <span className={styles.factValue}>{destination.practicalInfo.recommendedStay}</span>
                  </div>
                )}

                {destination.practicalInfo?.localTips && destination.practicalInfo.localTips.length > 0 && (
                  <div className={styles.factItem}>
                    <span className={styles.factLabel}>Curator’s Insider Tips</span>
                    <ul className={styles.localTipsList}>
                      {destination.practicalInfo.localTips.map((tip, idx) => (
                        <li key={idx} className={styles.localTipItem}>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.factItem}>
                  <span className={styles.factLabel}>Curated Experiences</span>
                  <span className={styles.factValue}>{destination.tourCount || relatedTours.length}+ Private Itineraries</span>
                </div>

                <Link
                  to={`/plan-your-trip?destination=${encodeURIComponent(destination.slug)}`}
                  className={styles.customPlanBtn}
                >
                  Plan Bespoke {destination.name} Journey
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
};
