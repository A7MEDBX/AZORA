import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container, PageBanner } from '@/components/ui';
import { USE_MOCK_DATA } from '@/api/client';
import { teamMembers, reviews as mockReviews } from '@/data/about';
import { fetchReviews } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './About.module.css';

export default function AboutPage() {
  const { t } = useLanguage();
  const { data: reviews } = useAsyncData(
    () => fetchReviews(),
    [],
    USE_MOCK_DATA ? mockReviews : []
  );

  usePageMeta({
    title: 'About Vibes of Egypt — Heritage, Expertise & Concierge Team',
    description:
      'Learn about our story, our licensed Egyptologist guides, and our mission to bridge five millennia of civilization with bespoke luxury hospitality.'
  });

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="The Story of Vibes of Egypt"
        title={`${t('nav_about', 'About Us')} & Our Heritage`}
        subtitle="Founded on a passion for ancient Egyptian history and contemporary ultra-luxury hospitality, we bridge centuries of civilization with tailored white-glove traveler care."
      />

      {/* Main Narrative */}
      <section className={styles.contentSection}>
        <Container size="standard" className={styles.narrativeGrid}>
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
        </Container>
      </section>

      {/* Pillars / Values Section */}
      <section className={styles.valuesSection}>
        <Container size="standard">
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
        </Container>
      </section>

      {/* Curatorial & Flotilla Team */}
      <section className={styles.teamSection}>
        <Container size="standard">
          <div className={styles.teamHeader}>
            <span className={styles.sectionOverline}>The Curators</span>
            <h2 className={styles.sectionHeading}>Leadership & Egyptology Directorate</h2>
            <p className={styles.paragraph}>
              Our leadership team combines academic scholarship, fluvial navigation mastery, and Swiss-grade luxury concierge expertise.
            </p>
          </div>

          <div className={styles.teamGrid}>
            {teamMembers.map(member => (
              <div key={member.id} className={styles.teamCard}>
                <img src={member.image} alt={member.name} className={styles.teamImg} loading="lazy" />
                <div className={styles.teamBody}>
                  <h3 className={styles.teamName}>{member.name}</h3>
                  <span className={styles.teamRole}>{member.role}</span>
                  <p className={styles.teamBio}>{member.bio}</p>
                  <div className={styles.qualList}>
                    {member.qualifications.map((q, idx) => (
                      <span key={idx} className={styles.qualItem}>
                        ✦ {q}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Guest Reviews & Endorsements */}
      <section className={styles.reviewsSection}>
        <Container size="standard">
          <div className={styles.reviewsHeader}>
            <span className={styles.sectionOverline} style={{ color: 'var(--color-egyptian-gold)' }}>
              Traveler Testimonials
            </span>
            <h2 className={styles.reviewsTitle}>Acclaim from Discerning Travelers</h2>
            <p className={styles.reviewsSubtitle}>
              Reflections from international guests who journeyed through Egypt with our private curators.
            </p>
          </div>

          <div className={styles.reviewsGrid}>
            {reviews.map(review => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.stars}>{'★'.repeat(review.rating)}</div>
                <blockquote className={styles.reviewQuote}>&ldquo;{review.text}&rdquo;</blockquote>
                <div>
                  <div className={styles.reviewAuthor}>{review.author}</div>
                  <div className={styles.reviewMeta}>
                    {review.location} • {review.date}
                  </div>
                  <div className={styles.reviewTrip}>Expedition: {review.tourOrCruiseName}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
