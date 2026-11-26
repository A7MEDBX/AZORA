import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { adminClient, AdminApiError } from '@/api/adminClient';
import { CatalogListView, type CatalogListItem } from '@/components/CatalogListView';
import { ImageUploadField } from '@/components/ImageUploadField';
import { SlugField, slugify } from '@/components/SlugField';
import { StringListInput } from '@/components/StringListInput';
import { useToast } from '@/context/ToastContext';
import type { AdminJournalArticle, AdminStatus } from '@/types/admin';

export const JournalListPage: React.FC = () => {
  const [items, setItems] = useState<AdminJournalArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminJournalArticle[] }>('/journal');
      setItems(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load journal articles.');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    void load();
  }, [load]);

  const listItems: CatalogListItem[] = items.map((a) => ({
    id: a.id,
    title: a.title,
    subtitle: `${a.category} • ${a.author}`,
    slug: a.slug,
    image: a.image,
    meta: `${a.readTime} • ${a.publishedAt}`,
    status: a.status,
  }));

  return (
    <CatalogListView
      heading="Travel Journal"
      subtitle="Publish Egyptology essays, museum guides, and seasonal dispatches."
      createPath="/journal/new"
      createLabel="New Article"
      editBasePath="/journal"
      items={listItems}
      isLoading={isLoading}
      onToggleStatus={async (item) => {
        const nextStatus: AdminStatus = item.status === 'published' ? 'draft' : 'published';
        await adminClient.patch(`/journal/${item.id}`, { status: nextStatus });
        showSuccess(`Article set to ${nextStatus}.`);
        await load();
      }}
      onDelete={async (item) => {
        await adminClient.delete(`/journal/${item.id}`);
        showSuccess(`Deleted article "${item.title}".`);
        await load();
      }}
    />
  );
};

export const JournalFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('Archaeology & Culture');
  const [readTime, setReadTime] = useState('5 min read');
  const [author, setAuthor] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [image, setImage] = useState('');
  const [contentText, setContentText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<AdminStatus>('draft');

  useEffect(() => {
    if (!id) return;
    let active = true;
    adminClient
      .get<{ data: AdminJournalArticle }>(`/journal/${id}`)
      .then((res) => {
        if (!active) return;
        const a = res.data;
        setTitle(a.title);
        setSlug(a.slug);
        setExcerpt(a.excerpt);
        setCategory(a.category);
        setReadTime(a.readTime);
        setAuthor(a.author);
        setAuthorRole(a.authorRole ?? '');
        setImage(a.image);
        setContentText((a.content ?? []).join('\n\n'));
        setTags(a.tags ?? []);
        setFeatured(a.featured);
        setStatus(a.status);
      })
      .catch((err: unknown) => {
        if (active) showError(err instanceof Error ? err.message : 'Failed to load article.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id, showError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});

    const paragraphs = contentText
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      category: category.trim(),
      readTime: readTime.trim(),
      author: author.trim(),
      authorRole: authorRole.trim() || null,
      image: image.trim(),
      content: paragraphs,
      tags,
      featured,
      status,
    };

    try {
      if (isEdit && id) {
        await adminClient.patch(`/journal/${id}`, payload);
        showSuccess('Journal article updated.');
      } else {
        await adminClient.post('/journal', payload);
        showSuccess('Journal article created.');
      }
      navigate('/journal');
    } catch (err: unknown) {
      if (err instanceof AdminApiError) {
        setFieldErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError(err instanceof Error ? err.message : 'Failed to save article.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card card-body">Loading article...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/journal" className="btn btn-ghost btn-sm" style={{ marginBottom: 6 }}>
            <ArrowLeft size={14} /> Back to Journal
          </Link>
          <h1 className="page-title">{isEdit ? 'Edit Article' : 'Create Article'}</h1>
        </div>
      </div>

      <div className="card">
        <form className="card-body" onSubmit={handleSubmit}>
          {formError && <div className="alert alert-danger">{formError}</div>}

          <div className="form-grid">
            <div className="field">
              <label className="field-label">
                Title <span className="field-required">*</span>
              </label>
              <input
                className="input"
                value={title}
                onChange={(e) => {
                  const val = e.target.value;
                  setTitle(val);
                  if (!isEdit && !slugTouched) setSlug(slugify(val));
                }}
                required
              />
            </div>

            <SlugField
              value={slug}
              onChange={(val) => {
                setSlugTouched(true);
                setSlug(val);
              }}
              sourceText={title}
              isEditMode={isEdit}
              error={fieldErrors.slug}
            />

            <div className="field">
              <label className="field-label">
                Category <span className="field-required">*</span>
              </label>
              <input
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">
                Read Time <span className="field-required">*</span>
              </label>
              <input
                className="input"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">
                Author Name <span className="field-required">*</span>
              </label>
              <input
                className="input"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">Author Role</label>
              <input
                className="input"
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
              />
            </div>

            <div className="form-col-full">
              <ImageUploadField
                label="Featured Article Image"
                value={image}
                onChange={setImage}
                folder="journal"
                required
                error={fieldErrors.image}
              />
            </div>

            <div className="field form-col-full">
              <label className="field-label">
                Excerpt <span className="field-required">*</span>
              </label>
              <textarea
                rows={2}
                className={`textarea${fieldErrors.excerpt ? ' input-error' : ''}`}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                required
              />
              {fieldErrors.excerpt && <span className="field-error">{fieldErrors.excerpt}</span>}
            </div>

            <div className="field form-col-full">
              <label className="field-label">
                Article Content (Separate paragraphs with a blank line){' '}
                <span className="field-required">*</span>
              </label>
              <textarea
                rows={10}
                className={`textarea${fieldErrors.content ? ' input-error' : ''}`}
                value={contentText}
                onChange={(e) => setContentText(e.target.value)}
                required
              />
              {fieldErrors.content && <span className="field-error">{fieldErrors.content}</span>}
            </div>

            <div className="form-col-full">
              <StringListInput label="Tags" values={tags} onChange={setTags} placeholder="Add tag..." />
            </div>

            <div className="field">
              <label className="field-label">Status</label>
              <select
                className="select"
                value={status}
                onChange={(e) => setStatus(e.target.value as AdminStatus)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="field" style={{ justifyContent: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <span className="field-label">Featured Article</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/journal" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Article' : 'Create Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
