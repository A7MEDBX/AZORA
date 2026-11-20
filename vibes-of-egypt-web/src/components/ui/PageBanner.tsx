import React from 'react';
import { Container } from './Container';
import styles from './UI.module.css';

export interface PageBannerProps {
  overline?: string;
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  className?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({
  overline,
  title,
  subtitle,
  backgroundImage,
  children,
  className = '',
}) => {
  const bgStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined;

  return (
    <section className={`${styles.pageBanner} ${className}`} style={bgStyle}>
      <div className={styles.pageBannerOverlay} />
      <Container size="standard" className={styles.pageBannerContent}>
        {overline && <span className={styles.bannerOverline}>{overline}</span>}
        <h1 className={styles.bannerTitle}>{title}</h1>
        {subtitle && <p className={styles.bannerSubtitle}>{subtitle}</p>}
        {children}
      </Container>
    </section>
  );
};
