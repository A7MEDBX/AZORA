import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UI.module.css';

export interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark';
  tagline?: string;
  className?: string;
  to?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  theme = 'light',
  tagline = 'Curated Egyptian Luxury',
  className = '',
  to = '/',
}) => {
  const badgeSizeClass = size === 'sm' ? styles.badgeSm : size === 'lg' ? styles.badgeLg : styles.badgeMd;
  const isDark = theme === 'dark';

  return (
    <Link to={to} className={`${styles.brandLogo} ${className}`}>
      <div className={`${styles.logoBadge} ${badgeSizeClass}`}>
        <svg className={styles.sphinxSvg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 8H9L12 2Z" fill="#C99A43" />
          <path d="M4 14C4 10 7 7 12 7C17 7 20 10 20 14V17H4V14Z" fill="#C99A43" opacity="0.9" />
          <path d="M2 18H22V20H2V18Z" fill="#C99A43" />
          <circle cx="12" cy="11" r="2" fill={isDark ? '#F5F0E6' : '#171714'} />
        </svg>
      </div>
      <div className={styles.brandText}>
        <span className={`${styles.brandTitle} ${isDark ? styles.brandTitleDark : ''}`}>
          VIBES OF EGYPT
        </span>
        {tagline && <span className={styles.brandTagline}>{tagline}</span>}
      </div>
    </Link>
  );
};
