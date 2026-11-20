import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Cards.module.css';

export interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  date: string;
  slug?: string;
}

export interface ArticleCardProps {
  article: ArticleItem;
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, className = '' }) => {
  return (
    <article className={`${styles.articleCard} ${className}`}>
      <div className={styles.articleImgWrap}>
        <img
          src={article.image}
          alt={article.title}
          className={styles.articleImg}
          loading="lazy"
        />
        <span className={styles.badge}>{article.category}</span>
      </div>

      <div className={styles.articleBody}>
        <div className={styles.articleMeta}>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <h3 className={styles.articleTitle}>{article.title}</h3>
        <p className={styles.articleExcerpt}>{article.excerpt}</p>

        <Link
          to={`/journal/${article.slug || article.id}`}
          className={styles.readMoreLink}
        >
          Read Article →
        </Link>
      </div>
    </article>
  );
};
