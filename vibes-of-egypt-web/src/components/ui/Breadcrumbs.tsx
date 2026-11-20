import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UI.module.css';

export interface CrumbItem {
  label: string;
  href?: string;
  path?: string;
}

export interface BreadcrumbsProps {
  items: CrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`${styles.breadcrumbs} ${className}`}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const linkTarget = item.href || item.path;
        return (
          <React.Fragment key={index}>
            {linkTarget && !isLast ? (
              <Link to={linkTarget} className={styles.crumbLink}>
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? styles.crumbCurrent : undefined} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!isLast && <span className={styles.crumbSeparator}>/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
