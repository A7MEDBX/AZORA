import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { destinations, tours, packages, cruises } from '@/lib/catalog';
import styles from './Navigation.module.css';

export interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
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

  const normalizedQuery = query.toLowerCase().trim();

  const matchingDestinations = normalizedQuery
    ? destinations.filter(d => d.name.toLowerCase().includes(normalizedQuery)).slice(0, 3)
    : [];

  const matchingTours = normalizedQuery
    ? tours.filter(t => t.title.toLowerCase().includes(normalizedQuery)).slice(0, 3)
    : [];

  const matchingPackages = normalizedQuery
    ? packages.filter(p => p.title.toLowerCase().includes(normalizedQuery)).slice(0, 2)
    : [];

  const matchingCruises = normalizedQuery
    ? cruises.filter(c => c.title.toLowerCase().includes(normalizedQuery)).slice(0, 2)
    : [];

  const totalResults =
    matchingDestinations.length +
    matchingTours.length +
    matchingPackages.length +
    matchingCruises.length;

  return (
    <div
      className={styles.searchOverlay}
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.searchContainer}>
        <div className={styles.searchBox}>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pyramids, Luxor, Nile cruises, or private tours..."
            className={styles.searchInput}
            aria-label="Search catalog"
          />
          <button
            type="button"
            className={styles.searchCloseBtn}
            onClick={onClose}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        {normalizedQuery && (
          <div className={styles.searchResultsBox}>
            {totalResults === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-gray-400)' }}>
                No sanctuary or expedition found for "{query}".
              </div>
            ) : (
              <div>
                {matchingDestinations.map(d => (
                  <Link
                    key={`dest-${d.id}`}
                    to={`/destinations/${d.id}`}
                    className={styles.searchResultItem}
                    onClick={onClose}
                  >
                    <span>{d.name}</span>
                    <span className={styles.searchResultCategory}>Destination</span>
                  </Link>
                ))}

                {matchingTours.map(t => (
                  <Link
                    key={`tour-${t.id}`}
                    to={`/tours/${t.id}`}
                    className={styles.searchResultItem}
                    onClick={onClose}
                  >
                    <span>{t.title}</span>
                    <span className={styles.searchResultCategory}>Private Tour</span>
                  </Link>
                ))}

                {matchingPackages.map(p => (
                  <Link
                    key={`pkg-${p.id}`}
                    to={`/packages/${p.id}`}
                    className={styles.searchResultItem}
                    onClick={onClose}
                  >
                    <span>{p.title}</span>
                    <span className={styles.searchResultCategory}>Package</span>
                  </Link>
                ))}

                {matchingCruises.map(c => (
                  <Link
                    key={`cruise-${c.id}`}
                    to={`/nile-cruises/${c.id}`}
                    className={styles.searchResultItem}
                    onClick={onClose}
                  >
                    <span>{c.title}</span>
                    <span className={styles.searchResultCategory}>Nile Cruise</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
