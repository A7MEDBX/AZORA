import React from 'react';
import { Link } from 'react-router-dom';
import { Experience } from '@/types';
import styles from './Cards.module.css';

export interface ExperienceCardProps {
  experience: Experience;
  className?: string;
  actionText?: string;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  experience,
  className = '',
  actionText = 'Book Experience',
}) => {
  const highlights = Array.isArray(experience.highlights) ? experience.highlights : [];
  const duration = experience.duration || 'Flexible';
  const desc =
    experience.description || 'An exclusive handcrafted Egyptian travel experience.';

  return (
    <div className={`${styles.cardShell} ${className}`}>
      <div className={styles.imageWrap}>
        <img
          src={experience.image}
          alt={experience.title}
          className={styles.cardImg}
          loading="lazy"
        />
        {experience.badge && <span className={styles.badge}>{experience.badge}</span>}
        <span className={styles.tagTopRight}>⏱️ {duration}</span>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.metaRow}>
          <span className={styles.categoryTag}>{experience.category || 'Bespoke Experience'}</span>
          <span>•</span>
          <span>📍 {experience.location || 'Egypt'}</span>
        </div>

        <h3 className={styles.title}>{experience.title}</h3>
        <p className={styles.description}>{desc}</p>

        {highlights.length > 0 && (
          <div className={styles.highlightsBox}>
            <span className={styles.highlightsLabel}>Included Highlights:</span>
            <ul className={styles.highlightsList}>
              {highlights.slice(0, 2).map((h, i) => (
                <li key={i} className={styles.highlightItem}>
                  <span className={styles.highlightIcon}>✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.cardFooter}>
          <div className={styles.priceGroup}>
            <span className={styles.priceFrom}>From</span>
            <div>
              <span className={styles.priceVal}>${experience.price}</span>
              <span className={styles.pricePer}> / person</span>
            </div>
          </div>
          <Link to={`/experiences/${experience.slug || experience.id}`} className={styles.cardActionBtn}>
            {actionText}
          </Link>
        </div>
      </div>
    </div>
  );
};
