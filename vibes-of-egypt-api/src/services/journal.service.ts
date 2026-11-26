import { getSupabaseClient } from '../config/supabase';
import { mapJournalArticle } from '../mappers/journal.mapper';
import { AppError } from '../types/api';
import type { JournalArticleDto } from '../types/catalog';
import type { JournalArticleRow } from '../types/database';
import type { JournalQuery } from '../validators/catalog.validator';

export async function listJournalArticles(filters: JournalQuery): Promise<JournalArticleDto[]> {
  const supabase = getSupabaseClient();

  let query = supabase
    .from('journal_articles')
    .select('*')
    .eq('is_published', true);

  if (filters.category && filters.category.toLowerCase() !== 'all') {
    query = query.ilike('category', `%${filters.category}%`);
  }

  const { data, error } = await query
    .order('published_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    throw new AppError(`Failed to fetch journal articles: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  return ((data ?? []) as JournalArticleRow[]).map(mapJournalArticle);
}

export async function getJournalArticleBySlug(slug: string): Promise<JournalArticleDto> {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('journal_articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .maybeSingle();

  if (error) {
    throw new AppError(`Failed to fetch journal article: ${error.message}`, 500, 'DATABASE_ERROR');
  }

  if (!data) {
    throw new AppError(`Journal article "${slug}" not found`, 404, 'NOT_FOUND');
  }

  return mapJournalArticle(data as JournalArticleRow);
}
