import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Breadcrumbs, ImageGallery } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import type { ExperienceDetailTemplateProps } from './types';
import styles from './ExperienceDetailTemplate.module.css';

export const ExperienceDetailTemplate: React.FC<ExperienceDetailTemplateProps> = ({ experience }) => {
  usePageMeta({
    title: `${experience.title} — Signature Experience`,
    description: experience.description,
    image: experience.image
  });

  const highlightsList = experience.highlights || [];
  const gallery = Array.isArray(experience.gallery) && experience.gallery.length > 0
    ? experience.gallery
    : [experience.image];
  const includedList = experience.practicalInfo?.included || [];

  return (
    <div className={styles.pageWrap}>
      {/* Hero Header */}
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url(${experience.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <Breadcrumbs
            items={[
              { label: 'Experiences', path: '/experiences' },
              { label: experience.category, path: '/experiences' },
              { label: experience.title }
            ]}
          />

          <div className={styles.metaBadges}>
            <span className={styles.categoryBadge}>{experience.category}</span>
            {experience.badge && <span className={styles.badge}>{experience.badge}</span>}
            <span className={styles.ratingBadge}>
              ⭐ {experience.rating || 4.9} ({experience.reviewsCount || 240} reviews)
            </span>
          </div>

          <h1 className={styles.expTitle}>{experience.title}</h1>
          <p className={styles.quickDetails}>
            <span>📍 {experience.location}</span>
            <span>•</span>
            <span>⏱️ {experience.duration}</span>
            <span>•</span>
            <span>✨ Curated Luxury Encounter</span>
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className={styles.contentSection}>
        <Container size="standard">
          <div className={styles.layout}>
            {/* Left Column: Details */}
            <div className={styles.mainCol}>
              <div className={styles.card}>
                <h2 className={styles.cardHeading}>Experience Essence</h2>
                <p className={styles.overviewText}>{experience.description}</p>

                {highlightsList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Signature Highlights</h3>
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
                    <h3 className={styles.subHeading}>Experience Visuals</h3>
                    <ImageGallery images={gallery} alt={experience.title} />
                  </div>
                )}

                {/* Included Services */}
                {includedList.length > 0 && (
                  <>
                    <h3 className={styles.subHeading}>Included in this Experience</h3>
                    <div className={styles.inclusionsList}>
                      {includedList.map((item, index) => (
                        <div key={index} className={styles.inclusionItem}>
                          <span className={styles.goldStar}>✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Booking Widget */}
            <aside className={styles.sidebarCol}>
              <div className={styles.bookingCard}>
                <div className={styles.priceRow}>
                  <div>
                    <span className={styles.priceFrom}>From</span>
                    <span className={styles.priceVal}>${experience.price}</span>
                    <span className={styles.pricePer}> / person</span>
                  </div>
                </div>

                <div className={styles.factsList}>
                  <div className={styles.factRow}>
                    <span className={styles.factLabel}>Location</span>
                    <span className={styles.factVal}>{experience.location}</span>
                  </div>
                  <div className={styles.factRow}>
                    <span className={styles.factLabel}>Duration</span>
                    <span className={styles.factVal}>{experience.duration}</span>
                  </div>
                  {experience.practicalInfo?.timing && (
                    <div className={styles.factRow}>
                      <span className={styles.factLabel}>Timing</span>
                      <span className={styles.factVal}>{experience.practicalInfo.timing}</span>
                    </div>
                  )}
                  {experience.practicalInfo?.physicalLevel && (
                    <div className={styles.factRow}>
                      <span className={styles.factLabel}>Difficulty</span>
                      <span className={styles.factVal}>{experience.practicalInfo.physicalLevel}</span>
                    </div>
                  )}
                  {experience.practicalInfo?.dressCode && (
                    <div className={styles.factRow}>
                      <span className={styles.factLabel}>Dress Code</span>
                      <span className={styles.factVal}>{experience.practicalInfo.dressCode}</span>
                    </div>
                  )}
                </div>

                <Link
                  to={`/plan-your-trip?experience=${encodeURIComponent(experience.slug || experience.id)}`}
                  className={styles.bookBtn}
                >
                  {experience.inquiryCta || 'Reserve Experience'}
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
};
