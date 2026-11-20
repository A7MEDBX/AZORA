import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Container, BrandLogo } from '@/components/ui';
import { FOOTER_SECTIONS } from '@/data/navigation';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <Container size="standard" className={styles.footerInner}>
        {/* Brand & Mission Column */}
        <div className={styles.brandCol}>
          <BrandLogo tagline={t('hero_badge', 'Curated Egyptian Luxury')} />
          <p className={styles.brandDescription}>
            {t(
              'footer_about_text',
              'Vibes of Egypt is a premier inbound travel brand offering curated, private, luxury, and multi-day bespoke journeys across Egypt.'
            )}
          </p>
          <div className={styles.trustBadges}>
            <span className={styles.badgeItem}>🏛️ Egyptian Ministry of Tourism Lic. #2948</span>
            <span className={styles.badgeItem}>⭐ 4.9/5 from 1,850+ Discerning Travelers</span>
          </div>
        </div>

        {/* Dynamic Footer Sections from navigation.ts */}
        {FOOTER_SECTIONS.map((section, idx) => (
          <div key={idx} className={styles.col}>
            <h4 className={styles.colHeading}>{t(section.titleKey, section.titleDefault)}</h4>
            <ul className={styles.linkList}>
              {section.links.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      {/* Copyright Bar */}
      <div className={styles.copyrightBar}>
        <Container size="standard" className={styles.copyrightInner}>
          <span>
            © {new Date().getFullYear()} Vibes of Egypt.{' '}
            {t('footer_rights', 'All Rights Reserved. Licensed by the Egyptian Ministry of Tourism.')}
          </span>
          <div className={styles.paymentMethods}>
            <span>🔒 256-bit SSL Secure Inquiries</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>MasterCard</span>
            <span>•</span>
            <span>Amex</span>
          </div>
        </Container>
      </div>
    </footer>
  );
};
