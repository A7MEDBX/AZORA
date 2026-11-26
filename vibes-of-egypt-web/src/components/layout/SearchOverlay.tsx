import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import type { SearchResultItem } from '@/lib/catalog';
import { searchCatalogApi } from '@/services/catalogService';
import styles from './Navigation.module.css';

export interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
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

  useEffect(() => {
    const trimmed = query.trim();
    if (!isOpen || !trimmed) {
      setResults([]);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      searchCatalogApi(trimmed)
        .then(items => {
          if (!cancelled) setResults(items.slice(0, 10));
        })
        .catch(() => {
          if (!cancelled) setResults([]);
        });
    }, 150);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, isOpen]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

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
            {results.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-gray-400)' }}>
                No sanctuary or expedition found for "{query}".
              </div>
            ) : (
              <div>
                {results.map(item => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    to={item.url}
                    className={styles.searchResultItem}
                    onClick={onClose}
                  >
                    <span>{item.title}</span>
                    <span className={styles.searchResultCategory}>{item.type}</span>
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
