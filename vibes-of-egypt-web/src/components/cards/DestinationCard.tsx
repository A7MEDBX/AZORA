import React from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '@/types';
import styles from './Cards.module.css';

export interface DestinationCardProps {
  destination: Destination;
  variant?: 'atlas' | 'editorial';
  className?: string;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  variant = 'editorial',
  className = '',
}) => {
  const highlights = Array.isArray(destination.highlights) ? destination.highlights : [];

  if (variant === 'atlas') {
    return (
      <Link
        to={`/destinations/${destination.slug || destination.id}`}
        className={`${styles.destinationOverlayCard} ${className}`}
      >
        <img
          src={destination.image}
          alt={destination.name}
          className={styles.destBgImg}
          loading="lazy"
        />
        <div className={styles.destGradientOverlay} />
        <div className={styles.destContent}>
          <span className={styles.destCategory}>{destination.category}</span>
          <h3 className={styles.destTitle}>{destination.name}</h3>
          <div className={styles.destMeta}>
            <span>{destination.tourCount || 0} Curated Tours</span>
            <span>•</span>
            <span>From ${destination.startingPrice}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/destinations/${destination.slug || destination.id}`}
      className={`${styles.cardShell} ${className}`}
    >
      <div className={styles.imageWrap}>
        <img
          src={destination.image}
          alt={destination.name}
          className={styles.cardImg}
          loading="lazy"
        />
        <div className={styles.cardOverlay} />
        <span className={styles.badge}>{destination.category}</span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.metaRow}>
          <span className={styles.categoryTag}>{destination.category}</span>
          {destination.arabicName && (
            <>
              <span>•</span>
              <span>{destination.arabicName}</span>
            </>
          )}
        </div>

        <h3 className={styles.title}>{destination.name}</h3>
        <p className={styles.description}>{destination.description || destination.tagline}</p>

        {highlights.length > 0 && (
          <div className={styles.highlightsBox}>
            <span className={styles.highlightsLabel}>Key Highlights:</span>
            <ul className={styles.highlightsList}>
              {highlights.slice(0, 3).map((h, idx) => (
                <li key={idx} className={styles.highlightItem}>
                  <span className={styles.highlightIcon}>•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.cardFooter}>
          <div className={styles.priceGroup}>
            <span className={styles.priceFrom}>Best Season</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{destination.bestTimeToVisit}</span>
          </div>
          <span className={styles.cardActionBtn}>
            {destination.tourCount || 0} Tours Available →
          </span>
        </div>
      </div>
    </Link>
  );
};
