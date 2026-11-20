import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticleBySlug, getArticles } from '@/lib/catalog';
import { ArticleDetailTemplate } from '@/templates';

export default function JournalDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>
          Dispatch Not Found
        </h2>
        <p style={{ color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
          This journal article could not be located in our archives.
        </p>
        <Link
          to="/journal"
          style={{
            display: 'inline-block',
            background: 'var(--color-egyptian-gold)',
            color: 'var(--color-midnight-black)',
            fontWeight: 700,
            padding: '0.75rem 1.75rem',
            borderRadius: '9999px'
          }}
        >
          ← Return to Journal
        </Link>
      </div>
    );
  }

  const relatedArticles = getArticles().filter(a => a.id !== article.id);

  return <ArticleDetailTemplate article={article} relatedArticles={relatedArticles} />;
}
