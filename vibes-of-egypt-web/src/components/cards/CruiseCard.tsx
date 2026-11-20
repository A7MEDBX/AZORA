import React from 'react';
import { Link } from 'react-router-dom';
import { Cruise } from '@/types';
import styles from './Cards.module.css';

export interface CruiseCardProps {
  cruise: Cruise;
  className?: string;
  actionText?: string;
}

export const CruiseCard: React.FC<CruiseCardProps> = ({
  cruise,
  className = '',
  actionText = 'View Details',
}) => {
  const vesselType = cruise.vesselType || cruise.type || 'Luxury Nile Cruise';
  const duration =
    cruise.duration ||
    (cruise.durationNights ? `${cruise.durationNights} Nights` : '4 Nights');
  const route = cruise.route || 'Luxor to Aswan';
  const desc =
    cruise.lead ||
    cruise.description ||
    'Exclusive luxury Nile voyage with private Egyptologist guidance.';
  const amenities = Array.isArray(cruise.amenities) ? cruise.amenities : [];

  return (
    <div className={`${styles.cardShell} ${className}`}>
      <div className={styles.imageWrap}>
        <img
          src={cruise.image}
          alt={cruise.title}
          className={styles.cardImg}
          loading="lazy"
        />
        <span className={styles.badge}>{vesselType}</span>
        {cruise.badge && <span className={styles.tagTopRight}>{cruise.badge}</span>}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.metaRow}>
          <span className={styles.categoryTag}>{route}</span>
          <span>•</span>
          <span>⛵ {duration}</span>
        </div>

        <h3 className={styles.title}>{cruise.title}</h3>
        <p className={styles.description}>{desc}</p>

        {amenities.length > 0 && (
          <div className={styles.highlightsBox}>
            <span className={styles.highlightsLabel}>Vessel Highlights:</span>
            <ul className={styles.highlightsList}>
              {amenities.slice(0, 2).map((item, idx) => (
                <li key={idx} className={styles.highlightItem}>
                  <span className={styles.highlightIcon}>⚓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.cardFooter}>
          <div className={styles.priceGroup}>
            <span className={styles.priceFrom}>From</span>
            <div>
              <span className={styles.priceVal}>${cruise.price}</span>
              <span className={styles.pricePer}> / cabin</span>
            </div>
          </div>
          <Link to={`/nile-cruises/${cruise.id}`} className={styles.cardActionBtn}>
            {actionText}
          </Link>
        </div>
      </div>
    </div>
  );
};
