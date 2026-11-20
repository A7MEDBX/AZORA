import React from 'react';
import styles from './FilterBar.module.css';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterBarProps {
  categories: FilterOption[];
  activeCategory: string;
  onSelectCategory: (value: string) => void;
  categoryLabel?: string;
  dropdownOptions?: FilterOption[];
  dropdownValue?: string;
  onDropdownChange?: (value: string) => void;
  dropdownLabel?: string;
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryLabel = 'Category:',
  dropdownOptions,
  dropdownValue,
  onDropdownChange,
  dropdownLabel = 'Destination:',
  className = ''
}) => {
  return (
    <div className={`${styles.filterBar} ${className}`}>
      <div className={styles.filterPills}>
        <span className={styles.filterLabel}>{categoryLabel}</span>
        {categories.map(cat => (
          <button
            key={cat.value}
            type="button"
            className={`${styles.filterPill} ${
              activeCategory === cat.value ? styles.filterPillActive : ''
            }`}
            onClick={() => onSelectCategory(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {dropdownOptions && dropdownOptions.length > 0 && onDropdownChange && (
        <div className={styles.dropdownWrap}>
          <span className={styles.filterLabel}>{dropdownLabel}</span>
          <select
            value={dropdownValue}
            onChange={e => onDropdownChange(e.target.value)}
            className={styles.selectInput}
          >
            {dropdownOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
