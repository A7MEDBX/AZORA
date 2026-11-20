import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Breadcrumbs } from '@/components/ui';
import { usePageMeta } from '@/hooks/usePageMeta';
import type { ArticleDetailTemplateProps } from './types';
import styles from './ArticleDetailTemplate.module.css';

export const ArticleDetailTemplate: React.FC<ArticleDetailTemplateProps> = ({
  article,
  relatedArticles = []
}) => {
  usePageMeta({
    title: `${article.title} — The Egyptian Travel Journal`,
    description: article.excerpt,
    image: article.image,
    type: 'article'
  });
  return (
    <div className={styles.pageWrap}>
      {/* Hero Header */}
      <section
        className={styles.heroSection}
        style={{ backgroundImage: `url(${article.image})` }}
      >
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <Breadcrumbs
            items={[
              { label: 'Journal', href: '/journal' },
              { label: article.category, href: '/journal' },
              { label: article.title }
            ]}
          />

          <span className={styles.categoryBadge}>{article.category}</span>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <div className={styles.metaRow}>
            <span>By {article.author}</span>
            <span>•</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>⏱️ {article.readTime}</span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className={styles.contentSection}>
        <Container size="standard">
          <div className={styles.layout}>
            {/* Left Column: Article Body */}
            <article className={styles.mainCol}>
              <div className={styles.articleCard}>
                <p className={styles.excerpt}>{article.excerpt}</p>

                {article.content.map((paragraph, idx) => (
                  <p key={idx} className={styles.bodyParagraph}>
                    {paragraph}
                  </p>
                ))}

                <div className={styles.authorBox}>
                  {article.authorAvatar && (
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className={styles.authorAvatar}
                    />
                  )}
                  <div>
                    <div className={styles.authorName}>{article.author}</div>
                    <div className={styles.authorRole}>{article.authorRole || 'Egyptology Editorial Board'}</div>
                  </div>
                </div>
              </div>
            </article>

            {/* Right Column: Related Articles & Planning CTA */}
            <aside className={styles.sidebarCol}>
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarHeading}>Related Dispatches</h3>

                {relatedArticles.length > 0 && (
                  <div className={styles.relatedList}>
                    {relatedArticles.map(rel => (
                      <Link
                        key={rel.id}
                        to={`/journal/${rel.slug || rel.id}`}
                        className={styles.relatedItem}
                      >
                        <img src={rel.image} alt={rel.title} className={styles.relatedImg} />
                        <div>
                          <h4 className={styles.relatedTitle}>{rel.title}</h4>
                          <span className={styles.relatedDate}>{rel.date}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                <Link to="/plan-your-trip" className={styles.planBtn}>
                  Craft Your Custom Itinerary
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
};
