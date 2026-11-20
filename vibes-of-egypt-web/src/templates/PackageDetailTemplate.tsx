import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Breadcrumbs, ImageGallery } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import type { PackageDetailTemplateProps } from './types';
import styles from './PackageDetailTemplate.module.css';

export const PackageDetailTemplate: React.FC<PackageDetailTemplateProps> = ({ packageData }) => {
  usePageMeta({
    title: `${packageData.title} — Luxury Package`,
    description: packageData.overview || packageData.description,
    image: packageData.image
  });

  const highlightsList = packageData.highlights || [];
  const dailyItinerary = packageData.dailyItinerary || packageData.itinerary || [];
  const inclusionsList = packageData.inclusions || [];
  const exclusionsList = packageData.exclusions || [];
  const gallery = Array.isArray(packageData.images) && packageData.images.length > 0
    ? packageData.images
    : [packageData.image];

  return (
    <div className={styles.pageWrap}>
      {/* Hero Header */}
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url(${packageData.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <Breadcrumbs
            items={[
              { label: 'Packages', path: '/packages' },
              { label: packageData.category, path: '/packages' },
              { label: packageData.title }
            ]}
          />

          <div className={styles.metaBadges}>
            <span className={styles.durationBadge}>
              ⏳ {packageData.duration || `${packageData.durationDays} Days / ${packageData.durationNights} Nights`}
            </span>
            {packageData.badge && <span className={styles.badge}>{packageData.badge}</span>}
            <span className={styles.ratingBadge}>
              ⭐ {packageData.rating} ({packageData.reviewsCount || 420} verified reviews)
            </span>
          </div>

          <h1 className={styles.pkgTitle}>{packageData.title}</h1>
          <p className={styles.routeText}>📍 {packageData.route}</p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className={styles.contentSection}>
        <Container size="standard">
          <div className={styles.layout}>
            {/* Left Column: Details & Master Timeline */}
            <div className={styles.mainCol}>
              <div className={styles.card}>
                <h2 className={styles.cardHeading}>Expedition Overview</h2>
                <p className={styles.overviewText}>{packageData.description}</p>

                {highlightsList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Master Itinerary Highlights</h3>
                    <div className={styles.highlightsGrid}>
                      {highlightsList.map((highlight, index) => (
                        <div key={index} className={styles.highlightItem}>
                          <span className={styles.goldStar}>★</span>
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Gallery */}
                {gallery.length > 0 && (
                  <div className={styles.gallerySection}>
                    <h3 className={styles.subHeading}>Journey Gallery</h3>
                    <ImageGallery images={gallery} alt={packageData.title} />
                  </div>
                )}

                {/* Day-by-Day Timeline */}
                {dailyItinerary.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Day-by-Day Program</h3>
                    <div className={styles.timeline}>
                      {dailyItinerary.map((step, idx) => (
                        <div key={idx} className={styles.dayCard}>
                          <div className={styles.dayHeader}>
                            <span className={styles.dayBadge}>Day {step.day || idx + 1}</span>
                            <h4 className={styles.dayTitle}>{step.title}</h4>
                          </div>
                          <p className={styles.dayDesc}>{step.desc}</p>
                          {(step.meals || step.accommodation) && (
                            <div className={styles.dayMeta}>
                              {step.meals && <span>🍽️ Meals: {step.meals}</span>}
                              {step.accommodation && <span>🏨 Stay: {step.accommodation}</span>}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Inclusions */}
                {inclusionsList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Comprehensive Inclusions</h3>
                    <div className={styles.inclusionsList}>
                      {inclusionsList.map((item, index) => (
                        <div key={index} className={styles.inclusionItem}>
                          <span className={styles.goldStar}>✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Exclusions */}
                {exclusionsList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Package Exclusions</h3>
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

            {/* Right Column: Quotation Request Widget */}
            <aside className={styles.sidebarCol}>
              <div className={styles.bookingCard}>
                <div className={styles.priceRow}>
                  <div>
                    <span className={styles.priceFrom}>Starting from</span>
                    <span className={styles.priceVal}>${packageData.price}</span>
                    <span className={styles.pricePer}> / person</span>
                  </div>
                </div>

                <div className={styles.featuresList}>
                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🏛️</span>
                    <div>
                      <span className={styles.featureTitle}>Accredited Guidance</span>
                      <span className={styles.featureSubtitle}>Private Egyptologist on every tour</span>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>🏨</span>
                    <div>
                      <span className={styles.featureTitle}>Curated Luxury Hotels</span>
                      <span className={styles.featureSubtitle}>{packageData.hotels}</span>
                    </div>
                  </div>

                  <div className={styles.featureItem}>
                    <span className={styles.featureIcon}>✈️</span>
                    <div>
                      <span className={styles.featureTitle}>Domestic Flights Included</span>
                      <span className={styles.featureSubtitle}>Seamless private airport transfers</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/plan-your-trip?package=${encodeURIComponent(packageData.slug || packageData.id)}`}
                  className={styles.quoteBtn}
                >
                  Request Bespoke Quotation
                </Link>

                <p className={styles.customNote}>
                  ✦ 100% customizable. You can adjust duration, hotel tiers, and route pacing to your exact preferences.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
};
