import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { DESTINATIONS_MEGA_MENU, TOURS_MEGA_MENU } from '@/data/navigation';
import { BrandLogo } from '@/components/ui';
import styles from './Navigation.module.css';

export interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
}) => {
  const { t } = useLanguage();
  const [destOpen, setDestOpen] = useState(false);
  const [toursOpen, setToursOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setDestOpen(false);
      setToursOpen(false);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.mobileDrawerOverlay}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.mobileDrawer}>
        <div className={styles.drawerHeader}>
          <BrandLogo size="sm" />
          <button
            type="button"
            className={styles.drawerCloseBtn}
            onClick={onClose}
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        {/* Quick Search in Drawer */}
        <div className={styles.drawerSearch}>
          <button
            type="button"
            className={styles.drawerSearchInput}
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            style={{ textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span>🔍</span>
            <span style={{ color: 'var(--color-gray-400)' }}>Search Egypt journeys...</span>
          </button>
        </div>

        <nav className={styles.drawerNavLinks}>
          <Link to="/" className={styles.drawerLink} onClick={onClose}>
            {t('nav_home', 'Home')}
          </Link>

          {/* Destinations Expandable */}
          <div>
            <button
              type="button"
              className={styles.drawerLink}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setDestOpen(!destOpen)}
              aria-expanded={destOpen}
            >
              <span>{t('nav_destinations', 'Destinations')}</span>
              <span style={{ transform: destOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                ▾
              </span>
            </button>
            {destOpen && (
              <div className={styles.drawerSubmenu}>
                <Link to="/destinations" className={styles.drawerSubItem} onClick={onClose}>
                  ★ All 19 Destinations Atlas
                </Link>
                {DESTINATIONS_MEGA_MENU.columns.flatMap(c => c.items).slice(0, 6).map((item, idx) => (
                  <Link key={idx} to={item.href} className={styles.drawerSubItem} onClick={onClose}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Tours & Packages Expandable */}
          <div>
            <button
              type="button"
              className={styles.drawerLink}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => setToursOpen(!toursOpen)}
              aria-expanded={toursOpen}
            >
              <span>{t('nav_tours', 'Tours & Packages')}</span>
              <span style={{ transform: toursOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                ▾
              </span>
            </button>
            {toursOpen && (
              <div className={styles.drawerSubmenu}>
                <Link to="/tours" className={styles.drawerSubItem} onClick={onClose}>
                  ★ All Private Day Tours
                </Link>
                <Link to="/packages" className={styles.drawerSubItem} onClick={onClose}>
                  ★ Multi-Day Signature Packages
                </Link>
                {TOURS_MEGA_MENU.columns.flatMap(c => c.items).slice(0, 5).map((item, idx) => (
                  <Link key={idx} to={item.href} className={styles.drawerSubItem} onClick={onClose}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/nile-cruises" className={styles.drawerLink} onClick={onClose}>
            {t('nav_cruises', 'Nile Cruises')}
          </Link>

          <Link to="/experiences" className={styles.drawerLink} onClick={onClose}>
            {t('nav_experiences', 'Experiences')}
          </Link>

          <Link to="/about" className={styles.drawerLink} onClick={onClose}>
            {t('nav_about', 'About Us')}
          </Link>

          <Link to="/contact" className={styles.drawerLink} onClick={onClose}>
            {t('nav_contact', 'Contact Concierge')}
          </Link>
        </nav>

        <div className={styles.drawerActions}>
          <Link
            to="/plan-your-trip"
            className={styles.drawerLink}
            style={{
              textAlign: 'center',
              justifyContent: 'center',
              background: 'var(--color-egyptian-gold)',
              color: 'var(--color-midnight-black)',
              borderRadius: '9999px',
              padding: '0.85rem',
              fontWeight: 700,
            }}
            onClick={onClose}
          >
            {t('btn_plan_trip', 'Plan Your Journey')}
          </Link>
        </div>
      </div>
    </div>
  );
};
