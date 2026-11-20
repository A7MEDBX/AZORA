import React from 'react';
import { Button } from './Button';
import styles from './UI.module.css';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  actionTo?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '🔍',
  title,
  description,
  actionText,
  actionTo,
  onAction,
  className = '',
}) => {
  return (
    <div className={`${styles.emptyState} ${className}`}>
      <span className={styles.emptyIcon}>{icon}</span>
      <h3 className={styles.emptyTitle}>{title}</h3>
      <p className={styles.emptyDescription}>{description}</p>
      {actionText && (
        <Button to={actionTo} onClick={onAction} variant="primary">
          {actionText}
        </Button>
      )}
    </div>
  );
};
