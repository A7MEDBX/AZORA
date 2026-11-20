import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { destinations, tours, packages, cruises } from '@/lib/catalog';
import { Container, Button, SectionHeading } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import {
  DestinationCard,
  TourCard,
  PackageCard,
  CruiseCard,
} from '@/components/cards';
import styles from './Home.module.css';

export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  usePageMeta({
    title: 'Curated Luxury Travel & Private Tours',
    description:
      'Experience the timeless majesty of Egypt with bespoke private tours, luxury Nile Dahabiya charters, and curated cultural expeditions.'
  });

  const [searchCity, setSearchCity] = useState('all');
  const [searchCategory, setSearchCategory] = useState('all');
  const [searchDuration, setSearchDuration] = useState('any');

  const featuredDestinations = (destinations || []).slice(0, 6);
  const featuredTours = (tours || []).slice(0, 4);
  const featuredPackages = (packages || []).slice(0, 3);
  const featuredCruises = (cruises || []).slice(0, 3);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCategory === 'cruises') {
      navigate('/nile-cruises');
      return;
    }
    if (searchCategory === 'packages') {
      navigate('/packages');
      return;
    }
    if (searchCity !== 'all') {
      navigate(`/search?q=${encodeURIComponent(searchCity)}`);
      return;
    }
    if (searchCategory === 'private-tours') {
      navigate('/tours');
      return;
    }
    navigate('/search');
  };

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <Container size="standard" className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.goldDot}></span>
            <span>{t('hero_badge', 'Curated Egyptian Luxury')}</span>
          </div>
          <h1 className={styles.heroTitle}>
            {t('hero_title', 'Journey Through the Cradle of Civilization')}
          </h1>
          <p className={styles.heroSubtitle}>
            {t(
              'hero_subtitle',
              'Bespoke private tours, majestic Nile Dahabiyas, and timeless desert sanctuaries guided by master Egyptologists.'
            )}
          </p>

          <div className={styles.heroCtaGroup}>
            <Button to="/plan-your-trip" variant="primary" size="lg">
              {t('btn_plan_trip', 'Plan Your Journey')}
            </Button>
            <Button to="/tours" variant="secondary" size="lg">
              {t('btn_explore_tours', 'Explore Tours')}
            </Button>
          </div>

          {/* Quick Search Bar */}
          <form onSubmit={handleQuickSearch} className={styles.searchBar}>
            <div className={styles.searchField}>
              <label>{t('search_city', 'Destination')}</label>
              <select
                value={searchCity}
                onChange={e => setSearchCity(e.target.value)}
              >
                <option value="all">{t('search_all_cities', 'All Destinations')}</option>
                <option value="cairo">Cairo & Giza</option>
                <option value="luxor">Luxor</option>
                <option value="aswan">Aswan</option>
                <option value="nile">Nile River</option>
                <option value="red sea">Red Sea</option>
              </select>
            </div>
            <div className={styles.searchDivider}></div>
            <div className={styles.searchField}>
              <label>{t('search_category', 'Experience Type')}</label>
              <select
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
              >
                <option value="all">{t('search_all_categories', 'All Experiences')}</option>
                <option value="private-tours">Private Tours</option>
                <option value="packages">Multi-Day Packages</option>
                <option value="cruises">Nile & Dahabiya</option>
              </select>
            </div>
            <div className={styles.searchDivider}></div>
            <div className={styles.searchField}>
              <label>{t('search_duration', 'Duration')}</label>
              <select
                value={searchDuration}
                onChange={e => setSearchDuration(e.target.value)}
              >
                <option value="any">{t('search_any_duration', 'Any Duration')}</option>
                <option value="1">1 Day</option>
                <option value="2-4">2 - 4 Days</option>
                <option value="5-8">5 - 8 Days</option>
                <option value="9+">9+ Days</option>
              </select>
            </div>
            <button type="submit" className={`${styles.searchBtn} btn btn-primary`}>
              {t('search_btn', 'Find Experiences')}
            </button>
          </form>
        </Container>
      </section>

      {/* Featured Destinations Section */}
      <section className={styles.section}>
        <Container size="standard">
          <div className={styles.sectionHeader}>
            <SectionHeading
              overline="The Living Canvas"
              title={t('sec_destinations_title', 'Iconic Destinations')}
            />
            <Link to="/destinations" className={styles.viewAllLink}>
              View All Destinations →
            </Link>
          </div>

          <div className={styles.destinationsGrid}>
            {featuredDestinations.map(dest => (
              <DestinationCard key={dest.id} destination={dest} variant="atlas" />
            ))}
          </div>
        </Container>
      </section>

      {/* Private Tours Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="standard">
          <div className={styles.sectionHeader}>
            <SectionHeading
              overline="Handcrafted Itineraries"
              title={t('sec_tours_title', 'Curated Private Tours')}
            />
            <Link to="/tours" className={styles.viewAllLink}>
              View All Tours →
            </Link>
          </div>

          <div className={styles.toursGrid}>
            {featuredTours.map(tour => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </Container>
      </section>

      {/* Signature Multi-Day Packages Section */}
      <section className={styles.section}>
        <Container size="standard">
          <div className={styles.sectionHeader}>
            <SectionHeading
              overline="Complete Expeditions"
              title="Signature Multi-Day Packages"
            />
            <Link to="/packages" className={styles.viewAllLink}>
              View All Packages →
            </Link>
          </div>

          <div className={styles.packagesGrid}>
            {featuredPackages.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </Container>
      </section>

      {/* Nile Cruises Spotlight */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <Container size="standard">
          <div className={styles.sectionHeader}>
            <SectionHeading
              overline="Sail in Royalty"
              title={t('sec_cruises_title', 'Nile & Dahabiya Cruises')}
            />
            <Link to="/nile-cruises" className={styles.viewAllLink}>
              View All Cruises →
            </Link>
          </div>

          <div className={styles.cruisesGrid}>
            {featuredCruises.map(cruise => (
              <CruiseCard key={cruise.id} cruise={cruise} />
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className={`${styles.section} ${styles.whySection}`}>
        <Container size="standard">
          <div className={styles.whyHeader}>
            <span className={styles.sectionOverline}>The Gold Standard</span>
            <h2 className={styles.sectionTitle}>{t('sec_why_title', 'Why Vibes of Egypt?')}</h2>
            <p className={styles.whySubtitle}>
              {t('sec_why_subtitle', 'The gold standard of inbound Egyptian luxury travel')}
            </p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>🏛️</div>
              <h3 className={styles.pillarTitle}>100% Licensed Egyptologists</h3>
              <p className={styles.pillarText}>
                Every private tour is accompanied by accredited, passionate scholars of ancient Egyptian civilization.
              </p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>✨</div>
              <h3 className={styles.pillarTitle}>Tailored Bespoke Circuits</h3>
              <p className={styles.pillarText}>
                We do not believe in cookie-cutter tours. Every minute is customized to your pace, passions, and style.
              </p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>🛡️</div>
              <h3 className={styles.pillarTitle}>VIP Skip-the-Line Access</h3>
              <p className={styles.pillarText}>
                Direct private transfers, private feluccas, and priority entrance to the Pyramids and Valley of the Kings.
              </p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>⭐</div>
              <h3 className={styles.pillarTitle}>24/7 Dedicated Concierge</h3>
              <p className={styles.pillarText}>
                From pre-trip planning to airport departure, our guest experience managers ensure total tranquility.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
