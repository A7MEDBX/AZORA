import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Container, PageBanner } from '@/components/ui';
import { ArticleCard } from '@/components/cards';
import { USE_MOCK_DATA } from '@/api/client';
import { articles as mockArticles } from '@/lib/catalog';
import { fetchJournalArticles } from '@/services/catalogService';
import { useAsyncData } from '@/hooks/useAsyncData';
import { usePageMeta } from '@/hooks/usePageMeta';
import styles from './Journal.module.css';

export default function JournalPage() {
  const { t } = useLanguage();
  const { data: articles } = useAsyncData(
    () => fetchJournalArticles(),
    [],
    USE_MOCK_DATA ? mockArticles : []
  );

  usePageMeta({
    title: 'The Egyptian Travel Journal — Insights & Travel Guides',
    description:
      'Essays, historical explorations, seasonal guides, and insider tips authored by resident Egyptologists and luxury travel designers.'
  });

  return (
    <div className={styles.pageWrap}>
      <PageBanner
        overline="Stories & Insights"
        title={`${t('nav_journal', 'Travel Journal')} & Magazine`}
        subtitle="Essays, historical explorations, and insider guides authored by resident Egyptologists and bespoke travel curators."
      />

      {/* Articles Grid */}
      <section className={styles.catalogSection}>
        <Container size="standard">
          <div className={styles.articlesGrid}>
            {(articles || []).map(art => (
              <ArticleCard key={art.id} article={art} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
