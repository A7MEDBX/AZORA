import React from 'react';
import { Link } from 'react-router-dom';
import { Tour } from '@/types';
import styles from './Cards.module.css';

export interface TourCardProps {
  tour: Tour;
  className?: string;
  actionText?: string;
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  className = '',
  actionText = 'View Details',
}) => {
  const cityName = tour.destinationName || tour.city || 'Egypt';
  const desc = tour.overview || tour.description || tour.subheadline || '';
  const highlights = Array.isArray(tour.highlights)
    ? tour.highlights
    : Array.isArray(tour.inclusions)
    ? tour.inclusions
    : [];

  return (
    <div className={`${styles.cardShell} ${className}`}>
      <div className={styles.imageWrap}>
        <img
          src={tour.image}
          alt={tour.title}
          className={styles.cardImg}
          loading="lazy"
        />
        {tour.badge && <span className={styles.badge}>{tour.badge}</span>}
        <span className={styles.tagTopRight}>⏱️ {tour.duration}</span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.metaRow}>
          <span className={styles.categoryTag}>{tour.category || 'Private Tour'}</span>
          <span>•</span>
          <span>📍 {cityName}</span>
          {tour.rating && (
            <>
              <span>•</span>
              <span>⭐ {tour.rating}</span>
            </>
          )}
        </div>

        <h3 className={styles.title}>{tour.title}</h3>
        <p className={styles.description}>{desc}</p>

        {highlights.length > 0 && (
          <div className={styles.highlightsBox}>
            <span className={styles.highlightsLabel}>Curated Highlights:</span>
            <ul className={styles.highlightsList}>
              {highlights.slice(0, 2).map((h, i) => (
                <li key={i} className={styles.highlightItem}>
                  <span className={styles.highlightIcon}>✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.cardFooter}>
          <div className={styles.priceGroup}>
            <span className={styles.priceFrom}>From</span>
            <div>
              <span className={styles.priceVal}>${tour.price}</span>
              <span className={styles.pricePer}> / person</span>
            </div>
          </div>
          <Link to={`/tours/${tour.slug || tour.id}`} className={styles.cardActionBtn}>
            {actionText}
          </Link>
        </div>
      </div>
    </div>
  );
};
