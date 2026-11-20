import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import {
  MAIN_NAV_ITEMS,
  DESTINATIONS_MEGA_MENU,
  TOURS_MEGA_MENU,
} from '@/data/navigation';
import { MegaMenu } from './MegaMenu';
import styles from './Navigation.module.css';

export interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  const [activeMenu, setActiveMenu] = useState<'destinations' | 'tours' | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (menu: 'destinations' | 'tours') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav ref={navRef} className={`${styles.navDesktop} ${className}`} aria-label="Main Navigation">
      {MAIN_NAV_ITEMS.map(item => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(item.href);

        if (item.id === 'destinations') {
          const isMenuOpen = activeMenu === 'destinations';
          return (
            <div
              key={item.id}
              className={styles.dropdownGroup}
              onMouseEnter={() => handleMouseEnter('destinations')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={() => setActiveMenu(null)}
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <span>{t(item.labelKey, item.defaultLabel)}</span>
                <svg
                  className={`${styles.chevron} ${isMenuOpen ? styles.chevronOpen : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <MegaMenu
                config={DESTINATIONS_MEGA_MENU}
                isOpen={isMenuOpen}
                onClose={() => setActiveMenu(null)}
              />
            </div>
          );
        }

        if (item.id === 'tours') {
          const isMenuOpen = activeMenu === 'tours';
          return (
            <div
              key={item.id}
              className={styles.dropdownGroup}
              onMouseEnter={() => handleMouseEnter('tours')}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={() => setActiveMenu(null)}
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <span>{t(item.labelKey, item.defaultLabel)}</span>
                <svg
                  className={`${styles.chevron} ${isMenuOpen ? styles.chevronOpen : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <MegaMenu
                config={TOURS_MEGA_MENU}
                isOpen={isMenuOpen}
                onClose={() => setActiveMenu(null)}
              />
            </div>
          );
        }

        return (
          <Link
            key={item.id}
            to={item.href}
            className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            {t(item.labelKey, item.defaultLabel)}
          </Link>
        );
      })}
    </nav>
  );
};
