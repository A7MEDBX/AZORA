'use client';

import React, { useState, useEffect } from 'react';
import Link from '@/lib/next-shim';
import { usePathname } from '@/lib/next-shim';
import { useLanguage, LANGUAGES } from '@/context/LanguageContext';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={`container ${styles.headerInner}`}>
        {/* Brand Logo with Egyptian Emblem */}
        <Link href="/" className={styles.brand}>
          <div className={styles.logoBadge}>
            <svg className={styles.sphinxSvg} viewBox="0 0 24 24">
              <path d="M12 2L15 8H9L12 2Z" fill="#C99A43"/>
              <path d="M4 14C4 10 7 7 12 7C17 7 20 10 20 14V17H4V14Z" fill="#C99A43" opacity="0.9"/>
              <path d="M2 18H22V20H2V18Z" fill="#C99A43"/>
              <circle cx="12" cy="11" r="2" fill="#171714"/>
            </svg>
          </div>
          <div className={styles.brandText}>
            <span className={styles.brandTitle}>VIBES OF EGYPT</span>
            <span className={styles.brandTagline}>{t('hero_badge', 'Curated Egyptian Luxury')}</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={styles.navDesktop}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}
          >
            {t('nav_home', 'Home')}
          </Link>

          {/* Destinations Menu */}
          <div className={styles.dropdownGroup}>
            <Link 
              href="/destinations" 
              className={`${styles.navLink} ${pathname.startsWith('/destinations') ? styles.navLinkActive : ''}`}
            >
              <span>{t('nav_destinations', 'Destinations')}</span>
              <svg className={styles.chevron} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <div className={styles.megaMenu}>
              <div className={styles.megaMenuGrid}>
                <div>
                  <div className={styles.menuHeading}>Ancient Wonders</div>
                  <Link href="/destinations/cairo-giza" className={styles.menuItem}>Cairo & Pyramids of Giza</Link>
                  <Link href="/destinations/luxor" className={styles.menuItem}>Luxor Valley of the Kings</Link>
                  <Link href="/destinations/aswan" className={styles.menuItem}>Aswan & Philae Temple</Link>
                  <Link href="/destinations/abu-simbel" className={styles.menuItem}>Abu Simbel Colossal Temples</Link>
                </div>
                <div>
                  <div className={styles.menuHeading}>Red Sea & Oasis</div>
                  <Link href="/destinations/hurghada" className={styles.menuItem}>Hurghada Coral Reefs</Link>
                  <Link href="/destinations/sharm-el-sheikh" className={styles.menuItem}>Sharm El Sheikh & Sinai</Link>
                  <Link href="/destinations/alexandria" className={styles.menuItem}>Alexandria Mediterranean</Link>
                  <Link href="/destinations" className={`${styles.menuItem} ${styles.menuViewAll}`}>
                    View All 19 Destinations →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tours Link */}
          <Link 
            href="/tours" 
            className={`${styles.navLink} ${pathname.startsWith('/tours') ? styles.navLinkActive : ''}`}
          >
            {t('nav_tours', 'Tours')}
          </Link>

          {/* Packages Link */}
          <Link 
            href="/packages" 
            className={`${styles.navLink} ${pathname.startsWith('/packages') ? styles.navLinkActive : ''}`}
          >
            {t('nav_packages', 'Packages')}
          </Link>

          {/* Nile Cruises Link */}
          <Link 
            href="/nile-cruises" 
            className={`${styles.navLink} ${pathname.startsWith('/nile-cruises') ? styles.navLinkActive : ''}`}
          >
            {t('nav_cruises', 'Nile Cruises')}
          </Link>

          {/* Experiences Link */}
          <Link 
            href="/experiences" 
            className={`${styles.navLink} ${pathname.startsWith('/experiences') ? styles.navLinkActive : ''}`}
          >
            {t('nav_experiences', 'Experiences')}
          </Link>

          {/* About Us Link */}
          <Link 
            href="/about" 
            className={`${styles.navLink} ${pathname.startsWith('/about') ? styles.navLinkActive : ''}`}
          >
            {t('nav_about', 'About')}
          </Link>
        </nav>

        {/* Right Actions: Language Switcher & Plan CTA */}
        <div className={styles.headerActions}>
          {/* Language Selector Dropdown */}
          <div className={styles.langSelector}>
            <button 
              className={styles.langBtn} 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              aria-label="Select Language"
            >
              <span className={styles.langFlag}>{currentLangObj.flag}</span>
              <span className={styles.langCode}>{currentLangObj.code.toUpperCase()}</span>
              <svg className={styles.chevron} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {langDropdownOpen && (
              <div className={styles.langMenu}>
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    className={`${styles.langMenuItem} ${language === lang.code ? styles.langMenuItemActive : ''}`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setLangDropdownOpen(false);
                    }}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                    <span className={styles.langNameEn}>({lang.name})</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Plan Your Journey CTA Button */}
          <Link href="/plan-your-trip" className={styles.planBtn}>
            {t('btn_plan_trip', 'Plan Your Journey')}
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button 
            className={styles.mobileToggle} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
            <span className={styles.hamburgerBar}></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileNavLinks}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>{t('nav_home', 'Home')}</Link>
            <Link href="/destinations" onClick={() => setMobileMenuOpen(false)}>{t('nav_destinations', 'Destinations')}</Link>
            <Link href="/tours" onClick={() => setMobileMenuOpen(false)}>{t('nav_tours', 'Tours')}</Link>
            <Link href="/packages" onClick={() => setMobileMenuOpen(false)}>{t('nav_packages', 'Packages')}</Link>
            <Link href="/nile-cruises" onClick={() => setMobileMenuOpen(false)}>{t('nav_cruises', 'Nile Cruises')}</Link>
            <Link href="/experiences" onClick={() => setMobileMenuOpen(false)}>{t('nav_experiences', 'Experiences')}</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>{t('nav_about', 'About')}</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>{t('nav_contact', 'Contact')}</Link>
            <Link href="/plan-your-trip" className={styles.mobilePlanBtn} onClick={() => setMobileMenuOpen(false)}>
              {t('btn_plan_trip', 'Plan Your Journey')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

