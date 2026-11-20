import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MegaMenuConfig } from '@/data/navigation';
import styles from './Navigation.module.css';

export interface MegaMenuProps {
  config: MegaMenuConfig;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  config,
  isOpen,
  onClose,
  className = '',
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      className={`${styles.megaMenu} ${isOpen ? styles.megaMenuOpen : ''} ${className}`}
      role="region"
      aria-label="Submenu"
    >
      <div className={styles.megaMenuGrid}>
        {config.columns.map((col, idx) => (
          <div key={idx}>
            <span className={styles.menuHeading}>{col.heading}</span>
            <ul className={styles.menuList}>
              {col.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <Link
                    to={item.href}
                    className={styles.menuItem}
                    onClick={onClose}
                  >
                    <span>{item.label}</span>
                    {item.description && (
                      <span className={styles.menuItemDesc}>{item.description}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {config.viewAllLink && (
        <Link
          to={config.viewAllLink.href}
          className={styles.menuViewAll}
          onClick={onClose}
        >
          {config.viewAllLink.label}
        </Link>
      )}
    </div>
  );
};
