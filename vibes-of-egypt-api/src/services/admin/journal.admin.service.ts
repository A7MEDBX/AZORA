import { getSupabaseClient } from '../../config/supabase';
import { mapJournalArticle } from '../../mappers/journal.mapper';
import { AppError } from '../../types/api';
import type { JournalArticleDto } from '../../types/catalog';
import type { JournalArticleRow } from '../../types/database';
import { throwDbError } from '../../utils/dbError';
import {
  resolveIsPublished,
  type AdminListQuery,
  type AdminStatus,
} from '../../validators/admin/common.validator';
import type {
  CreateJournalInput,
  UpdateJournalInput,
} from '../../validators/admin/journal.validator';

export interface AdminJournalDto extends JournalArticleDto {
  status: AdminStatus;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

function toAdminDto(row: JournalArticleRow): AdminJournalDto {
  return {
    ...mapJournalArticle(row),
    status: row.is_published ? 'published' : 'draft',
    isPublished: row.is_published,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function todayUtcIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function listAdminJournalArticles(query: AdminListQuery): Promise<AdminJournalDto[]> {
  const supabase = getSupabaseClient();
  let req = supabase.from('journal_articles').select('*');

  if (query.status === 'published') {
    req = req.eq('is_published', true);
  } else if (query.status === 'draft' || query.status === 'archived') {
    req = req.eq('is_published', false);
  }

  const { data, error } = await req
    .order('published_date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throwDbError(error, 'Failed to list journal articles');
  return ((data ?? []) as JournalArticleRow[]).map(toAdminDto);
}

export async function getAdminJournalArticleById(id: string): Promise<AdminJournalDto> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('journal_articles')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to fetch journal article');
  if (!data) throw new AppError(`Journal article "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as JournalArticleRow);
}

export async function createAdminJournalArticle(
  input: CreateJournalInput
): Promise<AdminJournalDto> {
  const supabase = getSupabaseClient();
  const isPublished = resolveIsPublished(input) ?? false;
  const publishedDate = input.publishedAt ?? todayUtcIsoDate();

  const { data, error } = await supabase
    .from('journal_articles')
    .insert({
      slug: input.slug,
      title: input.title,
      excerpt: input.excerpt,
      image_url: input.image,
      category: input.category,
      read_time: input.readTime,
      published_date: publishedDate,
      author_name: input.author,
      author_role: input.authorRole ?? null,
      author_avatar_url: input.authorAvatar ?? null,
      content: input.content,
      tags: input.tags,
      is_featured: input.featured,
      is_published: isPublished,
    })
    .select('*')
    .single();

  if (error || !data) {
    throwDbError(error ?? { message: 'Insert failed' }, 'Failed to create journal article');
  }

  return toAdminDto(data as JournalArticleRow);
}

export async function updateAdminJournalArticle(
  id: string,
  input: UpdateJournalInput
): Promise<AdminJournalDto> {
  const existing = await getAdminJournalArticleById(id);
  const updates: Record<string, unknown> = {};

  if (input.slug !== undefined) updates.slug = input.slug;
  if (input.title !== undefined) updates.title = input.title;
  if (input.excerpt !== undefined) updates.excerpt = input.excerpt;
  if (input.image !== undefined) updates.image_url = input.image;
  if (input.category !== undefined) updates.category = input.category;
  if (input.readTime !== undefined) updates.read_time = input.readTime;
  if (input.author !== undefined) updates.author_name = input.author;
  if (input.authorRole !== undefined) updates.author_role = input.authorRole;
  if (input.authorAvatar !== undefined) updates.author_avatar_url = input.authorAvatar;
  if (input.content !== undefined) updates.content = input.content;
  if (input.tags !== undefined) updates.tags = input.tags;
  if (input.featured !== undefined) updates.is_featured = input.featured;

  const isPublished = resolveIsPublished(input);
  if (isPublished !== undefined) {
    updates.is_published = isPublished;
  }

  if (input.publishedAt !== undefined && input.publishedAt !== null) {
    updates.published_date = input.publishedAt;
  } else if (isPublished === true && (!existing.isPublished || !existing.publishedAt)) {
    // Automatically set published_date to NOW (UTC) when transitioning to published
    updates.published_date = todayUtcIsoDate();
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('journal_articles')
    .update(updates)
    .eq('id', id)
    .select('*')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to update journal article');
  if (!data) throw new AppError(`Journal article "${id}" not found`, 404, 'NOT_FOUND');

  return toAdminDto(data as JournalArticleRow);
}

export async function deleteAdminJournalArticle(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('journal_articles')
    .delete()
    .eq('id', id)
    .select('id')
    .maybeSingle();

  if (error) throwDbError(error, 'Failed to delete journal article');
  if (!data) throw new AppError(`Journal article "${id}" not found`, 404, 'NOT_FOUND');
}
