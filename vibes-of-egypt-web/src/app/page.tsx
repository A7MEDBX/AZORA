'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import { destinations, tours, packages, cruises } from '@/lib/catalog';
import styles from './Home.module.css';

export default function HomePage() {
  const { t } = useLanguage();

  const featuredDestinations = destinations.slice(0, 6);
  const featuredTours = tours.slice(0, 4);
  const featuredPackages = packages.slice(0, 3);
  const featuredCruises = cruises.slice(0, 3);

  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <span className={styles.goldDot}></span>
            <span>{t('hero_badge', 'Curated Egyptian Luxury')}</span>
          </div>
          <h1 className={styles.heroTitle}>
            {t('hero_title', 'Journey Through the Cradle of Civilization')}
          </h1>
          <p className={styles.heroSubtitle}>
            {t('hero_subtitle', 'Bespoke private tours, majestic Nile Dahabiyas, and timeless desert sanctuaries guided by master Egyptologists.')}
          </p>

          <div className={styles.heroCtaGroup}>
            <Link href="/plan-your-trip" className={styles.primaryBtn}>
              {t('btn_plan_trip', 'Plan Your Journey')}
            </Link>
            <Link href="/tours" className={styles.secondaryBtn}>
              {t('btn_explore_tours', 'Explore Tours')}
            </Link>
          </div>

          {/* Quick Search Bar */}
          <div className={styles.searchBar}>
            <div className={styles.searchField}>
              <label>{t('search_city', 'Destination')}</label>
              <select defaultValue="all">
                <option value="all">{t('search_all_cities', 'All Destinations')}</option>
                <option value="cairo">Cairo & Giza</option>
                <option value="luxor">Luxor</option>
                <option value="aswan">Aswan</option>
                <option value="nile">Nile River</option>
                <option value="red-sea">Red Sea</option>
              </select>
            </div>
            <div className={styles.searchDivider}></div>
            <div className={styles.searchField}>
              <label>{t('search_category', 'Experience Type')}</label>
              <select defaultValue="all">
                <option value="all">{t('search_all_categories', 'All Experiences')}</option>
                <option value="private-tours">Private Tours</option>
                <option value="packages">Multi-Day Packages</option>
                <option value="cruises">Nile & Dahabiya</option>
              </select>
            </div>
            <div className={styles.searchDivider}></div>
            <div className={styles.searchField}>
              <label>{t('search_duration', 'Duration')}</label>
              <select defaultValue="any">
                <option value="any">{t('search_any_duration', 'Any Duration')}</option>
                <option value="1">1 Day</option>
                <option value="2-4">2 - 4 Days</option>
                <option value="5-8">5 - 8 Days</option>
                <option value="9+">9+ Days</option>
              </select>
            </div>
            <Link href="/tours" className={styles.searchBtn}>
              {t('search_btn', 'Find Experiences')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionOverline}>The Living Canvas</span>
              <h2 className={styles.sectionTitle}>{t('sec_destinations_title', 'Iconic Destinations')}</h2>
            </div>
            <Link href="/destinations" className={styles.viewAllLink}>
              View All Destinations →
            </Link>
          </div>

          <div className={styles.destinationsGrid}>
            {featuredDestinations.map((dest) => (
              <Link href={`/destinations/${dest.id}`} key={dest.id} className={styles.destinationCard}>
                <div className={styles.destinationImageWrap}>
                  <img src={dest.image} alt={dest.name} className={styles.cardImage} />
                  <div className={styles.destinationOverlay}></div>
                </div>
                <div className={styles.destinationInfo}>
                  <span className={styles.destinationCategory}>{dest.category}</span>
                  <h3 className={styles.destinationName}>{dest.name}</h3>
                  <div className={styles.destinationMeta}>
                    <span>{dest.tourCount} Curated Tours</span>
                    <span>•</span>
                    <span>From ${dest.startingPrice}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Private Tours Section */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionOverline}>Handcrafted Itineraries</span>
              <h2 className={styles.sectionTitle}>{t('sec_tours_title', 'Curated Private Tours')}</h2>
            </div>
            <Link href="/tours" className={styles.viewAllLink}>
              View All Tours →
            </Link>
          </div>

          <div className={styles.toursGrid}>
            {featuredTours.map((tour) => (
              <div key={tour.id} className={styles.tourCard}>
                <div className={styles.tourImageWrap}>
                  <img src={tour.image} alt={tour.title} className={styles.cardImage} />
                  {tour.badge && <span className={styles.tourBadge}>{tour.badge}</span>}
                </div>
                <div className={styles.tourBody}>
                  <div className={styles.tourDestination}>{tour.destinationName}</div>
                  <h3 className={styles.tourTitle}>{tour.title}</h3>
                  <p className={styles.tourOverview}>{tour.overview}</p>
                  <div className={styles.tourFooter}>
                    <div>
                      <span className={styles.priceFrom}>{t('from_price', 'From')}</span>
                      <span className={styles.priceAmount}>${tour.price}</span>
                      <span className={styles.pricePer}> / person</span>
                    </div>
                    <Link href={`/tours/${tour.id}`} className={styles.tourDetailBtn}>
                      {t('btn_view_details', 'View Details')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nile Cruises Spotlight */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <span className={styles.sectionOverline}>Sail in Royalty</span>
              <h2 className={styles.sectionTitle}>{t('sec_cruises_title', 'Nile & Dahabiya Cruises')}</h2>
            </div>
            <Link href="/nile-cruises" className={styles.viewAllLink}>
              View All Cruises →
            </Link>
          </div>

          <div className={styles.cruisesGrid}>
            {featuredCruises.map((cruise) => (
              <div key={cruise.id} className={styles.cruiseCard}>
                <div className={styles.cruiseImageWrap}>
                  <img src={cruise.image} alt={cruise.title} className={styles.cardImage} />
                  <span className={styles.cruiseVessel}>{cruise.vesselType}</span>
                </div>
                <div className={styles.cruiseBody}>
                  <div className={styles.cruiseRoute}>{cruise.route} • {cruise.durationNights} Nights</div>
                  <h3 className={styles.cruiseTitle}>{cruise.title}</h3>
                  <p className={styles.cruiseDesc}>{cruise.description}</p>
                  <div className={styles.cruiseFooter}>
                    <div>
                      <span className={styles.priceFrom}>{t('from_price', 'From')}</span>
                      <span className={styles.priceAmount}>${cruise.price}</span>
                    </div>
                    <Link href={`/nile-cruises/${cruise.id}`} className={styles.tourDetailBtn}>
                      {t('btn_view_details', 'View Details')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`${styles.section} ${styles.whySection}`}>
        <div className="container">
          <div className={styles.whyHeader}>
            <span className={styles.sectionOverline}>The Gold Standard</span>
            <h2 className={styles.sectionTitle}>{t('sec_why_title', 'Why Vibes of Egypt?')}</h2>
            <p className={styles.whySubtitle}>{t('sec_why_subtitle', 'The gold standard of inbound Egyptian luxury travel')}</p>
          </div>

          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>🏛️</div>
              <h3 className={styles.pillarTitle}>100% Licensed Egyptologists</h3>
              <p className={styles.pillarText}>Every private tour is accompanied by accredited, passionate scholars of ancient Egyptian civilization.</p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>✨</div>
              <h3 className={styles.pillarTitle}>Tailored Bespoke Circuits</h3>
              <p className={styles.pillarText}>We do not believe in cookie-cutter tours. Every minute is customized to your pace, passions, and style.</p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>🛡️</div>
              <h3 className={styles.pillarTitle}>VIP Skip-the-Line Access</h3>
              <p className={styles.pillarText}>Direct private transfers, private feluccas, and priority entrance to the Pyramids and Valley of the Kings.</p>
            </div>
            <div className={styles.pillarCard}>
              <div className={styles.pillarIcon}>⭐</div>
              <h3 className={styles.pillarTitle}>24/7 Dedicated Concierge</h3>
              <p className={styles.pillarText}>From pre-trip planning to airport departure, our guest experience managers ensure total tranquility.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

