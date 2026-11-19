'use client';

import React from 'react';
import Link from '@/lib/next-shim';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        {/* Brand & Mission Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoRow}>
            <div className={styles.logoBadge}>
              <svg className={styles.sphinxSvg} viewBox="0 0 24 24">
                <path d="M12 2L15 8H9L12 2Z" fill="#C99A43"/>
                <path d="M4 14C4 10 7 7 12 7C17 7 20 10 20 14V17H4V14Z" fill="#C99A43" opacity="0.9"/>
                <path d="M2 18H22V20H2V18Z" fill="#C99A43"/>
                <circle cx="12" cy="11" r="2" fill="#171714"/>
              </svg>
            </div>
            <div>
              <div className={styles.brandTitle}>VIBES OF EGYPT</div>
              <div className={styles.brandTagline}>Curated Egyptian Luxury</div>
            </div>
          </div>
          <p className={styles.brandDescription}>
            {t('footer_about_text', 'Vibes of Egypt is a premier inbound travel brand offering curated, private, luxury, and multi-day bespoke journeys across Egypt.')}
          </p>
          <div className={styles.trustBadges}>
            <span className={styles.badgeItem}>🏛️ Egyptian Ministry of Tourism Lic. #2948</span>
            <span className={styles.badgeItem}>⭐ 4.9/5 from 1,850+ Travelers</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>{t('footer_destinations', 'Destinations')}</h4>
          <ul className={styles.linkList}>
            <li><Link href="/destinations/cairo-giza">Cairo & Giza</Link></li>
            <li><Link href="/destinations/luxor">Luxor Temples</Link></li>
            <li><Link href="/destinations/aswan">Aswan & Philae</Link></li>
            <li><Link href="/destinations/abu-simbel">Abu Simbel</Link></li>
            <li><Link href="/destinations/alexandria">Alexandria</Link></li>
            <li><Link href="/destinations/hurghada">Hurghada (Red Sea)</Link></li>
            <li><Link href="/destinations/sharm-el-sheikh">Sharm El Sheikh</Link></li>
          </ul>
        </div>

        {/* Tours & Experiences Column */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>{t('footer_tours_packages', 'Tours & Packages')}</h4>
          <ul className={styles.linkList}>
            <li><Link href="/tours">Curated Private Tours</Link></li>
            <li><Link href="/packages">Multi-Day Packages</Link></li>
            <li><Link href="/nile-cruises">Luxury Nile Cruises</Link></li>
            <li><Link href="/nile-cruises">Historic Dahabiyas</Link></li>
            <li><Link href="/experiences">Hot Air Balloon Luxor</Link></li>
            <li><Link href="/experiences">Bedouin Desert Safari</Link></li>
            <li><Link href="/special-offers">Seasonal Special Offers</Link></li>
          </ul>
        </div>

        {/* Legal & Trust Column */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>{t('footer_legal', 'Legal & Trust')}</h4>
          <ul className={styles.linkList}>
            <li><Link href="/about">About Us & Our Story</Link></li>
            <li><Link href="/journal">Travel Journal & Magazine</Link></li>
            <li><Link href="/faq">Frequently Asked Questions</Link></li>
            <li><Link href="/contact">Contact Our Concierge</Link></li>
            <li><Link href="/plan-your-trip">Custom Trip Planner</Link></li>
            <li><Link href="/faq">Privacy Policy</Link></li>
            <li><Link href="/faq">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.copyrightBar}>
        <div className={`container ${styles.copyrightInner}`}>
          <span>© {new Date().getFullYear()} Vibes of Egypt. {t('footer_rights', 'All Rights Reserved. Licensed by the Egyptian Ministry of Tourism.')}</span>
          <div className={styles.paymentMethods}>
            <span>🔒 256-bit SSL Secure Booking</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>MasterCard</span>
            <span>•</span>
            <span>Amex</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

