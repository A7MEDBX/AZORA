import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, LANGUAGES } from '@/context/LanguageContext';
import styles from './Navigation.module.css';

export interface LanguageSelectorProps {
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`${styles.langSelector} ${className}`}>
      <button
        type="button"
        className={styles.langBtn}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select Language"
      >
        <span className={styles.langFlag}>{currentLang.flag}</span>
        <span>{currentLang.code.toUpperCase()}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.langMenu} role="listbox">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              type="button"
              className={`${styles.langMenuItem} ${
                language === lang.code ? styles.langMenuItemActive : ''
              }`}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              role="option"
              aria-selected={language === lang.code}
            >
              <span>{lang.flag}</span>
              <span>{lang.nativeName}</span>
              <span className={styles.langNameEn}>({lang.name})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
