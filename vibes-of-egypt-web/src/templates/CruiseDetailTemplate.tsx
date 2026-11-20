import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Breadcrumbs, ImageGallery } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import type { CruiseDetailTemplateProps } from './types';
import styles from './CruiseDetailTemplate.module.css';

export const CruiseDetailTemplate: React.FC<CruiseDetailTemplateProps> = ({ cruise }) => {
  usePageMeta({
    title: `${cruise.title} — Luxury Nile Charter`,
    description: cruise.lead || cruise.description,
    image: cruise.image
  });

  const highlightsList = cruise.highlights || [];
  const amenitiesList = cruise.amenities || [];
  const itineraryList = cruise.itinerary || [];
  const gallery = Array.isArray(cruise.images) && cruise.images.length > 0
    ? cruise.images
    : [cruise.image];

  return (
    <div className={styles.pageWrap}>
      {/* Hero Header */}
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url(${cruise.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <Breadcrumbs
            items={[
              { label: 'Nile Cruises', path: '/nile-cruises' },
              { label: cruise.cruiseType || 'Cruises', path: '/nile-cruises' },
              { label: cruise.title }
            ]}
          />

          <div className={styles.metaBadges}>
            <span className={styles.vesselBadge}>{cruise.vesselType || cruise.cruiseType}</span>
            <span className={styles.durationBadge}>
              ⛵ {cruise.duration || `${cruise.durationNights} Nights`}
            </span>
            <span className={styles.ratingBadge}>
              ⭐ {cruise.rating} ({cruise.reviewsCount || 160} reviews)
            </span>
          </div>

          <h1 className={styles.cruiseTitle}>{cruise.title}</h1>
          <p className={styles.routeText}>📍 Route: {cruise.route}</p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className={styles.contentSection}>
        <Container size="standard">
          <div className={styles.layout}>
            {/* Left Column: Profile & Ports Itinerary */}
            <div className={styles.mainCol}>
              <div className={styles.card}>
                <h2 className={styles.cardHeading}>Vessel Profile & Character</h2>
                <p className={styles.overviewText}>{cruise.description}</p>

                {highlightsList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>River Voyage Highlights</h3>
                    <div className={styles.highlightsGrid}>
                      {highlightsList.map((highlight, index) => (
                        <div key={index} className={styles.highlightItem}>
                          <span className={styles.goldAnchor}>⚓</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Gallery */}
                {gallery.length > 0 && (
                  <div className={styles.gallerySection}>
                    <h3 className={styles.subHeading}>Vessel & River Scenery</h3>
                    <ImageGallery images={gallery} alt={cruise.title} />
                  </div>
                )}

                {/* Port-by-Port Schedule */}
                {itineraryList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Port-by-Port Sailing Schedule</h3>
                    <div className={styles.timeline}>
                      {itineraryList.map((step, idx) => (
                        <div key={idx} className={styles.portCard}>
                          <div className={styles.portHeader}>
                            <span className={styles.portBadge}>Day {step.day || idx + 1}</span>
                            <h4 className={styles.portName}>{step.port}</h4>
                          </div>
                          <p className={styles.portActivity}>
                            <strong>{step.activity}</strong>
                            {step.desc && ` — ${step.desc}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Vessel Amenities */}
                {amenitiesList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Onboard Amenities & Privileges</h3>
                    <div className={styles.amenitiesGrid}>
                      {amenitiesList.map((amenity, index) => (
                        <div key={index} className={styles.amenityItem}>
                          <span className={styles.goldAnchor}>✓</span>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Cabin Selection & Booking */}
            <aside className={styles.sidebarCol}>
              <div className={styles.bookingCard}>
                <div className={styles.priceRow}>
                  <div>
                    <span className={styles.priceFrom}>From</span>
                    <span className={styles.priceVal}>${cruise.price}</span>
                    <span className={styles.pricePer}> / cabin</span>
                  </div>
                </div>

                <div className={styles.vesselSpecs}>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Vessel Type</span>
                    <span className={styles.specVal}>{cruise.vesselType || cruise.cruiseType}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Sailing Duration</span>
                    <span className={styles.specVal}>{cruise.duration}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Capacity & Suites</span>
                    <span className={styles.specVal}>{cruise.capacity}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Stateroom Class</span>
                    <span className={styles.specVal}>{cruise.cabins}</span>
                  </div>
                  {cruise.shipInfo?.dining && (
                    <div className={styles.specRow}>
                      <span className={styles.specLabel}>Dining</span>
                      <span className={styles.specVal}>{cruise.shipInfo.dining}</span>
                    </div>
                  )}
                  {cruise.shipInfo?.crewRatio && (
                    <div className={styles.specRow}>
                      <span className={styles.specLabel}>Service Level</span>
                      <span className={styles.specVal}>{cruise.shipInfo.crewRatio}</span>
                    </div>
                  )}
                </div>

                <Link
                  to={`/plan-your-trip?cruise=${encodeURIComponent(cruise.slug || cruise.id)}`}
                  className={styles.bookBtn}
                >
                  Reserve Cabin on this Cruise
                </Link>

                <div className={styles.allInclusiveBadge}>
                  ✦ Full-Board Dining & All Temple Excursions Included
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
};
