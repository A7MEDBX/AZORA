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
import type { AdminDestination, AdminStatus, AdminTour } from '@/types/admin';

export const ToursListPage: React.FC = () => {
  const [items, setItems] = useState<AdminTour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminTour[] }>('/tours');
      setItems(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load tours.');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    void load();
  }, [load]);

  const listItems: CatalogListItem[] = items.map((t) => ({
    id: t.id,
    title: t.title,
    subtitle: `${t.category}${t.destinationName ? ` • ${t.destinationName}` : ''}`,
    slug: t.slug,
    image: t.image,
    meta: `${t.duration} • $${t.price}`,
    status: t.status,
  }));

  return (
    <CatalogListView
      heading="Private Tours"
      subtitle="Manage day tours and Egyptologist-led excursions."
      createPath="/tours/new"
      createLabel="New Tour"
      editBasePath="/tours"
      items={listItems}
      isLoading={isLoading}
      onToggleStatus={async (item) => {
        const nextStatus: AdminStatus = item.status === 'published' ? 'draft' : 'published';
        await adminClient.patch(`/tours/${item.id}`, { status: nextStatus });
        showSuccess(`Tour set to ${nextStatus}.`);
        await load();
      }}
      onDelete={async (item) => {
        await adminClient.delete(`/tours/${item.id}`);
        showSuccess(`Deleted tour "${item.title}".`);
        await load();
      }}
    />
  );
};

export const TourFormPage: React.FC = () => {
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
  const [subheadline, setSubheadline] = useState('');
  const [category, setCategory] = useState('Daily');
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState('Full Day (8 Hours)');
  const [price, setPrice] = useState('120');
  const [badge, setBadge] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [overview, setOverview] = useState('');
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [included, setIncluded] = useState<string[]>([]);
  const [excluded, setExcluded] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<AdminStatus>('draft');
  const [displayOrder, setDisplayOrder] = useState('0');

  useEffect(() => {
    async function init() {
      try {
        const destRes = await adminClient.get<{ data: AdminDestination[] }>('/destinations');
        setDestinations(destRes.data);
        if (!isEdit && destRes.data.length > 0) {
          setDestinationId(destRes.data[0].id);
        }

        if (id) {
          const tourRes = await adminClient.get<{ data: AdminTour }>(`/tours/${id}`);
          const t = tourRes.data;
          setDestinationId(t.destinationId);
          setTitle(t.title);
          setSlug(t.slug);
          setSubheadline(t.subheadline ?? '');
          setCategory(t.category);
          setCity(t.city ?? '');
          setDuration(t.duration);
          setPrice(String(t.price));
          setBadge(t.badge ?? '');
          setImage(t.image);
          setImages(t.images ?? []);
          setOverview(t.overview ?? '');
          setDescription(t.description);
          setHighlights(t.highlights ?? []);
          setIncluded(t.included ?? []);
          setExcluded(t.excluded ?? []);
          setFeatured(t.featured);
          setStatus(t.status);
          setDisplayOrder(String(t.displayOrder));
        }
      } catch (err: unknown) {
        showError(err instanceof Error ? err.message : 'Failed to load tour data.');
      } finally {
        setLoading(false);
      }
    }
    void init();
  }, [id, isEdit, showError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});

    const payload = {
      destinationId,
      title: title.trim(),
      slug: slug.trim(),
      subheadline: subheadline.trim() || null,
      category: category.trim(),
      city: city.trim() || null,
      duration: duration.trim(),
      price: Number(price) || 0,
      badge: badge.trim() || null,
      image: image.trim(),
      images,
      overview: overview.trim() || null,
      description: description.trim(),
      highlights,
      included,
      excluded,
      featured,
      status,
      displayOrder: Number(displayOrder) || 0,
    };

    try {
      if (isEdit && id) {
        await adminClient.patch(`/tours/${id}`, payload);
        showSuccess('Tour updated successfully.');
      } else {
        await adminClient.post('/tours', payload);
        showSuccess('Tour created successfully.');
      }
      navigate('/tours');
    } catch (err: unknown) {
      if (err instanceof AdminApiError) {
        setFieldErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError(err instanceof Error ? err.message : 'Failed to save tour.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card card-body">Loading tour...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/tours" className="btn btn-ghost btn-sm" style={{ marginBottom: 6 }}>
            <ArrowLeft size={14} /> Back to Tours
          </Link>
          <h1 className="page-title">{isEdit ? 'Edit Tour' : 'Create Tour'}</h1>
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
                className={`input${fieldErrors.title ? ' input-error' : ''}`}
                value={title}
                onChange={(e) => {
                  const val = e.target.value;
                  setTitle(val);
                  if (!isEdit && !slugTouched) setSlug(slugify(val));
                }}
                required
              />
              {fieldErrors.title && <span className="field-error">{fieldErrors.title}</span>}
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
                Destination <span className="field-required">*</span>
              </label>
              <select
                className={`select${fieldErrors.destinationId ? ' input-error' : ''}`}
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                required
              >
                <option value="">Select destination...</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.status})
                  </option>
                ))}
              </select>
              {fieldErrors.destinationId && (
                <span className="field-error">{fieldErrors.destinationId}</span>
              )}
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
              <label className="field-label">
                Price (USD) <span className="field-required">*</span>
              </label>
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
              <label className="field-label">City Label</label>
              <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className="field">
              <label className="field-label">Badge</label>
              <input
                className="input"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Best Seller"
              />
            </div>

            <div className="field form-col-full">
              <label className="field-label">Subheadline</label>
              <input
                className="input"
                value={subheadline}
                onChange={(e) => setSubheadline(e.target.value)}
              />
            </div>

            <div className="form-col-full">
              <ImageUploadField
                label="Main Image"
                value={image}
                onChange={setImage}
                folder="tours"
                required
                error={fieldErrors.image}
              />
            </div>

            <div className="form-col-full">
              <GalleryUploadField values={images} onChange={setImages} folder="tours" />
            </div>

            <div className="field form-col-full">
              <label className="field-label">Overview</label>
              <textarea
                rows={2}
                className="textarea"
                value={overview}
                onChange={(e) => setOverview(e.target.value)}
              />
            </div>

            <div className="field form-col-full">
              <label className="field-label">
                Description <span className="field-required">*</span>
              </label>
              <textarea
                rows={4}
                className={`textarea${fieldErrors.description ? ' input-error' : ''}`}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              {fieldErrors.description && (
                <span className="field-error">{fieldErrors.description}</span>
              )}
            </div>

            <div className="form-col-full">
              <StringListInput label="Highlights" values={highlights} onChange={setHighlights} />
            </div>
            <StringListInput label="Included" values={included} onChange={setIncluded} />
            <StringListInput label="Excluded" values={excluded} onChange={setExcluded} />

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
                <span className="field-label">Featured Tour</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/tours" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Tour'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
