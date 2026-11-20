import React from 'react';
import { Button } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './NotFound.module.css';

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found — Lost Among the Sands',
    description: 'The ancient tomb or sanctuary you are seeking appears to have shifted with the desert winds.'
  });

  return (
    <div className={styles.notFoundWrap}>
      <span className={styles.overline}>Error 404 — Desert Mirage</span>
      <h1 className={styles.title}>Lost Among the Sands</h1>
      <p className={styles.description}>
        The ancient tomb or sanctuary you are seeking appears to have shifted with the desert winds.
      </p>
      <Button to="/" variant="primary" size="lg">
        Return to the Nile Riverbank
      </Button>
    </div>
  );
}
