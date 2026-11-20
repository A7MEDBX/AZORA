import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Breadcrumbs, ImageGallery } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import type { TourDetailTemplateProps } from './types';
import styles from './TourDetailTemplate.module.css';

export const TourDetailTemplate: React.FC<TourDetailTemplateProps> = ({ tour }) => {
  const desc = tour.description || tour.overview || tour.subheadline || '';

  usePageMeta({
    title: `${tour.title} — Private Luxury Tour`,
    description: desc,
    image: tour.image
  });

  const [partySize, setPartySize] = useState('2');
  const [preferredDate, setPreferredDate] = useState('');

  const cityName = tour.destinationName || tour.city || 'Egypt';
  const inclusionsList = tour.inclusions || tour.included || [];
  const exclusionsList = tour.excluded || [];
  const highlightsList = tour.highlights || [];
  const itineraryList = tour.itinerary || [];
  const gallery = Array.isArray(tour.images) && tour.images.length > 0
    ? tour.images
    : [tour.image];

  const reservationUrl = `/plan-your-trip?tour=${encodeURIComponent(tour.slug || tour.id)}${
    preferredDate ? `&date=${encodeURIComponent(preferredDate)}` : ''
  }&travelers=${encodeURIComponent(partySize)}`;

  return (
    <div className={styles.pageWrap}>
      {/* Hero Header */}
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <Breadcrumbs
            items={[
              { label: 'Tours', path: '/tours' },
              { label: cityName, path: tour.destinationSlug ? `/destinations/${tour.destinationSlug}` : undefined },
              { label: tour.title }
            ]}
          />

          <div className={styles.metaBadges}>
            <span className={styles.categoryBadge}>{tour.category}</span>
            {tour.badge && <span className={styles.featuredBadge}>{tour.badge}</span>}
            <span className={styles.ratingBadge}>
              ⭐ {tour.rating} ({tour.reviewsCount || 640} reviews)
            </span>
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
        <Container size="standard">
          <div className={styles.layout}>
            {/* Left Column: Details & Itinerary */}
            <div className={styles.mainCol}>
              <div className={styles.card}>
                <h2 className={styles.cardHeading}>Tour Overview</h2>
                <p className={styles.overviewText}>{desc}</p>

                {highlightsList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Curated Highlights</h3>
                    <div className={styles.highlightsGrid}>
                      {highlightsList.map((highlight, index) => (
                        <div key={index} className={styles.highlightItem}>
                          <span className={styles.checkIcon}>✓</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Visual Gallery */}
                {gallery.length > 0 && (
                  <div className={styles.gallerySection}>
                    <h3 className={styles.subHeading}>Tour Imagery</h3>
                    <ImageGallery images={gallery} alt={tour.title} />
                  </div>
                )}

                {/* Full Itinerary Timeline */}
                {itineraryList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Itinerary Timeline</h3>
                    <div className={styles.timeline}>
                      {itineraryList.map((step, idx) => (
                        <div key={idx} className={styles.timelineStep}>
                          <div className={styles.stepMarker}>{idx + 1}</div>
                          <div className={styles.stepContent}>
                            <h4 className={styles.stepTitle}>{step.title}</h4>
                            <p className={styles.stepDesc}>{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* What's Included */}
                {inclusionsList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>What’s Included</h3>
                    <div className={styles.inclusionsList}>
                      {inclusionsList.map((item, index) => (
                        <div key={index} className={styles.inclusionItem}>
                          <span className={styles.checkIcon}>✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* What's Excluded */}
                {exclusionsList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>What’s Excluded</h3>
                    <div className={styles.inclusionsList}>
                      {exclusionsList.map((item, index) => (
                        <div key={index} className={styles.exclusionItem}>
                          <span className={styles.crossIcon}>✕</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Sticky Booking Widget */}
            <aside className={styles.sidebarCol}>
              <div className={styles.bookingCard}>
                <div className={styles.priceRow}>
                  <div>
                    <span className={styles.priceFrom}>From</span>
                    <span className={styles.priceVal}>${tour.price}</span>
                    <span className={styles.pricePer}> / person</span>
                  </div>
                  <span className={styles.guaranteeTag}>Best Price Guarantee</span>
                </div>

                <div className={styles.bookingForm}>
                  <div className={styles.formGroup}>
                    <label>Select Preferred Date</label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={e => setPreferredDate(e.target.value)}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Party Size</label>
                    <select
                      value={partySize}
                      onChange={e => setPartySize(e.target.value)}
                      className={styles.formSelect}
                    >
                      <option value="1">1 Traveler (Solo)</option>
                      <option value="2">2 Travelers (Couples)</option>
                      <option value="3">3 Travelers</option>
                      <option value="4">4 Travelers (Small Group)</option>
                      <option value="5+">5+ Travelers (Private Group)</option>
                    </select>
                  </div>

                  <Link to={reservationUrl} className={styles.reserveBtn}>
                    Book This Tour
                  </Link>

                  <p className={styles.policyNote}>
                    🔒 Free cancellation up to 48 hours prior. No deposit needed for initial reservation inquiry.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
};
