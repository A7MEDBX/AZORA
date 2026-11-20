import React from 'react';
import { Link } from 'react-router-dom';
import { PackageTour } from '@/types';
import styles from './Cards.module.css';

export interface PackageCardProps {
  pkg: PackageTour;
  className?: string;
  actionText?: string;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  className = '',
  actionText = 'View Details',
}) => {
  const route =
    pkg.route ||
    (Array.isArray(pkg.destinationsCovered)
      ? pkg.destinationsCovered.join(' • ')
      : 'Cairo • Luxor • Aswan');
  const duration = pkg.duration || `${pkg.durationDays || 8} Days`;
  const highlights = Array.isArray(pkg.highlights) ? pkg.highlights : [];

  return (
    <div className={`${styles.cardShell} ${className}`}>
      <div className={styles.imageWrap}>
        <img
          src={pkg.image}
          alt={pkg.title}
          className={styles.cardImg}
          loading="lazy"
        />
        {pkg.badge && <span className={styles.badge}>{pkg.badge}</span>}
        <span className={styles.tagTopRight}>🗓️ {duration}</span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.metaRow}>
          <span className={styles.categoryTag}>Comprehensive Package</span>
          <span>•</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {route}
          </span>
        </div>

        <h3 className={styles.title}>{pkg.title}</h3>
        <p className={styles.description}>{pkg.description || pkg.overview}</p>

        {highlights.length > 0 && (
          <div className={styles.highlightsBox}>
            <span className={styles.highlightsLabel}>Package Inclusions:</span>
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
              <span className={styles.priceVal}>${pkg.price}</span>
              <span className={styles.pricePer}> / person</span>
            </div>
          </div>
          <Link to={`/packages/${pkg.id}`} className={styles.cardActionBtn}>
            {actionText}
          </Link>
        </div>
      </div>
    </div>
  );
};
