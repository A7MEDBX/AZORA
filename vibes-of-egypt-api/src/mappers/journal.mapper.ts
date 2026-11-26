import type { JournalArticleDto } from '../types/catalog';
import type { JournalArticleRow } from '../types/database';

function formatDisplayDate(isoDate: string): string {
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return isoDate;
  }
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function mapJournalArticle(row: JournalArticleRow): JournalArticleDto {
  const content = Array.isArray(row.content)
    ? row.content.map((item) => String(item))
    : [];

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    image: row.image_url,
    category: row.category,
    readTime: row.read_time,
    date: formatDisplayDate(row.published_date),
    publishedAt: row.published_date,
    author: row.author_name,
    ...(row.author_role ? { authorRole: row.author_role } : {}),
    ...(row.author_avatar_url ? { authorAvatar: row.author_avatar_url } : {}),
    content,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: Boolean(row.is_featured),
  };
}
