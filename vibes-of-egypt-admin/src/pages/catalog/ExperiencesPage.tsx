import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { adminClient, AdminApiError } from '@/api/adminClient';
import { CatalogListView, type CatalogListItem } from '@/components/CatalogListView';
import { GalleryUploadField } from '@/components/GalleryUploadField';
import { ImageUploadField } from '@/components/ImageUploadField';
import { SlugField, slugify } from '@/components/SlugField';
import { StringListInput } from '@/components/StringListInput';
import { useToast } from '@/context/ToastContext';
import type { AdminDestination, AdminExperience, AdminStatus } from '@/types/admin';

export const ExperiencesListPage: React.FC = () => {
  const [items, setItems] = useState<AdminExperience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminExperience[] }>('/experiences');
      setItems(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load experiences.');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    void load();
  }, [load]);

  const listItems: CatalogListItem[] = items.map((e) => ({
    id: e.id,
    title: e.title,
    subtitle: `${e.category} • ${e.location}`,
    slug: e.slug,
    image: e.image,
    meta: `${e.duration} • $${e.price}`,
    status: e.status,
  }));

  return (
    <CatalogListView
      heading="Bespoke Experiences"
      subtitle="Manage hot air balloons, desert safaris, sailing, and cultural immersions."
      createPath="/experiences/new"
      createLabel="New Experience"
      editBasePath="/experiences"
      items={listItems}
      isLoading={isLoading}
      onToggleStatus={async (item) => {
        const nextStatus: AdminStatus = item.status === 'published' ? 'draft' : 'published';
        await adminClient.patch(`/experiences/${item.id}`, { status: nextStatus });
        showSuccess(`Experience set to ${nextStatus}.`);
        await load();
      }}
      onDelete={async (item) => {
        await adminClient.delete(`/experiences/${item.id}`);
        showSuccess(`Deleted experience "${item.title}".`);
        await load();
      }}
    />
  );
};

export const ExperienceFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [destinations, setDestinations] = useState<AdminDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [destinationId, setDestinationId] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('90');
  const [badge, setBadge] = useState('');
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [inquiryCta, setInquiryCta] = useState('');
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<AdminStatus>('draft');
  const [displayOrder, setDisplayOrder] = useState('0');

  useEffect(() => {
    async function init() {
      try {
        const destRes = await adminClient.get<{ data: AdminDestination[] }>('/destinations');
        setDestinations(destRes.data);

        if (id) {
          const expRes = await adminClient.get<{ data: AdminExperience }>(`/experiences/${id}`);
          const e = expRes.data;
          setDestinationId(e.destinationId ?? '');
          setTitle(e.title);
          setSlug(e.slug);
          setLocation(e.location);
          setCategory(e.category);
          setDuration(e.duration);
          setPrice(String(e.price));
          setBadge(e.badge ?? '');
          setImage(e.image);
          setGallery(e.gallery ?? []);
          setDescription(e.description);
          setHighlights(e.highlights ?? []);
          setInquiryCta(e.inquiryCta ?? '');
          setFeatured(e.featured);
          setStatus(e.status);
          setDisplayOrder(String(e.displayOrder));
        }
      } catch (err: unknown) {
        showError(err instanceof Error ? err.message : 'Failed to load experience.');
      } finally {
        setLoading(false);
      }
    }
    void init();
  }, [id, showError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});

    const payload = {
      destinationId: destinationId || null,
      title: title.trim(),
      slug: slug.trim(),
      location: location.trim(),
      category: category.trim(),
      duration: duration.trim(),
      price: Number(price) || 0,
      badge: badge.trim() || null,
      image: image.trim(),
      gallery,
      description: description.trim(),
      highlights,
      inquiryCta: inquiryCta.trim() || null,
      featured,
      status,
      displayOrder: Number(displayOrder) || 0,
    };

    try {
      if (isEdit && id) {
        await adminClient.patch(`/experiences/${id}`, payload);
        showSuccess('Experience updated successfully.');
      } else {
        await adminClient.post('/experiences', payload);
        showSuccess('Experience created successfully.');
      }
      navigate('/experiences');
    } catch (err: unknown) {
      if (err instanceof AdminApiError) {
        setFieldErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError(err instanceof Error ? err.message : 'Failed to save experience.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card card-body">Loading experience...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/experiences" className="btn btn-ghost btn-sm" style={{ marginBottom: 6 }}>
            <ArrowLeft size={14} /> Back to Experiences
          </Link>
          <h1 className="page-title">{isEdit ? 'Edit Experience' : 'Create Experience'}</h1>
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
              <label className="field-label">Linked Destination</label>
              <select
                className="select"
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
              >
                <option value="">None / General</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label className="field-label">
                Location <span className="field-required">*</span>
              </label>
              <input
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

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
                Duration <span className="field-required">*</span>
              </label>
              <input
                className="input"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">Price (USD)</label>
              <input
                type="number"
                min="0"
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">Badge</label>
              <input className="input" value={badge} onChange={(e) => setBadge(e.target.value)} />
            </div>

            <div className="form-col-full">
              <ImageUploadField
                label="Main Image"
                value={image}
                onChange={setImage}
                folder="experiences"
                required
                error={fieldErrors.image}
              />
            </div>

            <div className="form-col-full">
              <GalleryUploadField values={gallery} onChange={setGallery} folder="experiences" />
            </div>

            <div className="field form-col-full">
              <label className="field-label">
                Description <span className="field-required">*</span>
              </label>
              <textarea
                rows={4}
                className="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-col-full">
              <StringListInput label="Highlights" values={highlights} onChange={setHighlights} />
            </div>

            <div className="field">
              <label className="field-label">Inquiry CTA Label</label>
              <input
                className="input"
                value={inquiryCta}
                onChange={(e) => setInquiryCta(e.target.value)}
              />
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

            <div className="field">
              <label className="field-label">Display Order</label>
              <input
                type="number"
                min="0"
                className="input"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
              />
            </div>

            <div className="field">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                />
                <span className="field-label">Featured Experience</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/experiences" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Experience'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
