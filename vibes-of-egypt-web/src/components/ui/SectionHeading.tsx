import React from 'react';
import styles from './UI.module.css';

export interface SectionHeadingProps {
  overline?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
  className?: string;
  children?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  overline,
  title,
  subtitle,
  align = 'left',
  theme = 'dark',
  className = '',
  children,
}) => {
  const alignClass = align === 'center' ? styles.alignCenter : styles.alignLeft;
  const isLight = theme === 'light';

  return (
    <div className={`${styles.sectionHeadingWrap} ${alignClass} ${className}`}>
      {overline && <span className={styles.sectionOverline}>{overline}</span>}
      <h2 className={`${styles.sectionTitle} ${isLight ? styles.sectionTitleLight : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`${styles.sectionSubtitle} ${isLight ? styles.sectionSubtitleLight : ''}`}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
};
