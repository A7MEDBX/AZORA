import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container, Button, BrandLogo } from '@/components/ui';
import { Navigation } from './Navigation';
import { LanguageSelector } from './LanguageSelector';
import { SearchOverlay } from './SearchOverlay';
import { MobileNavigation } from './MobileNavigation';
import styles from './Navigation.module.css';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
        <Container size="standard" className={styles.headerInner}>
          {/* Brand Logo with Egyptian Emblem */}
          <BrandLogo tagline={t('hero_badge', 'Curated Egyptian Luxury')} />

          {/* Modular Desktop Navigation */}
          <Navigation />

          {/* Right Header Actions */}
          <div className={styles.headerActions}>
            {/* Global Search Trigger */}
            <button
              type="button"
              className={styles.searchTriggerBtn}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Language Selector Dropdown */}
            <LanguageSelector />

            {/* Plan Journey Primary CTA */}
            <Button to="/plan-your-trip" variant="primary" size="sm" className={styles.planBtnDesktop}>
              {t('btn_plan_trip', 'Plan Your Journey')}
            </Button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
            >
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
              <span className={styles.hamburgerBar} />
            </button>
          </div>
        </Container>
      </header>

      {/* Accessible Mobile Drawer Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Full-screen Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
