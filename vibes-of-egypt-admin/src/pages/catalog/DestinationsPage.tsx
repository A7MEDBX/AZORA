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
import type { AdminDestination, AdminStatus } from '@/types/admin';

export const DestinationsListPage: React.FC = () => {
  const [items, setItems] = useState<AdminDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminDestination[] }>('/destinations');
      setItems(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load destinations.');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    void load();
  }, [load]);

  const listItems: CatalogListItem[] = items.map((d) => ({
    id: d.id,
    title: d.name,
    subtitle: d.category,
    slug: d.slug,
    image: d.image,
    meta: `From $${d.startingPrice}`,
    status: d.status,
  }));

  return (
    <CatalogListView
      heading="Destinations"
      subtitle="Manage Egyptian cities, sanctuaries, and regional guides."
      createPath="/destinations/new"
      createLabel="New Destination"
      editBasePath="/destinations"
      items={listItems}
      isLoading={isLoading}
      onToggleStatus={async (item) => {
        const nextStatus: AdminStatus = item.status === 'published' ? 'draft' : 'published';
        await adminClient.patch(`/destinations/${item.id}`, { status: nextStatus });
        showSuccess(`Destination set to ${nextStatus}.`);
        await load();
      }}
      onDelete={async (item) => {
        await adminClient.delete(`/destinations/${item.id}`);
        showSuccess(`Deleted destination "${item.title}".`);
        await load();
      }}
    />
  );
};

export const DestinationFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [name, setName] = useState('');
  const [arabicName, setArabicName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState('');
  const [startingPrice, setStartingPrice] = useState('0');
  const [bestTimeToVisit, setBestTimeToVisit] = useState('');
  const [image, setImage] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [gallery, setGallery] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<AdminStatus>('draft');
  const [displayOrder, setDisplayOrder] = useState('0');

  useEffect(() => {
    if (!id) return;
    adminClient
      .get<{ data: AdminDestination }>(`/destinations/${id}`)
      .then((res) => {
        const d = res.data;
        setName(d.name);
        setArabicName(d.arabicName ?? '');
        setSlug(d.slug);
        setTagline(d.tagline);
        setCategory(d.category);
        setStartingPrice(String(d.startingPrice));
        setBestTimeToVisit(d.bestTimeToVisit ?? '');
        setImage(d.image);
        setHeroImage(d.heroImage);
        setShortDescription(d.shortDescription ?? '');
        setDescription(d.description);
        setHighlights(d.highlights ?? []);
        setGallery(d.gallery ?? []);
        setFeatured(d.featured);
        setStatus(d.status);
        setDisplayOrder(String(d.displayOrder));
      })
      .catch((err: unknown) => {
        showError(err instanceof Error ? err.message : 'Failed to load destination.');
      })
      .finally(() => setLoading(false));
  }, [id, showError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});

    const payload = {
      name: name.trim(),
      arabicName: arabicName.trim() || null,
      slug: slug.trim(),
      tagline: tagline.trim(),
      category: category.trim(),
      startingPrice: Number(startingPrice) || 0,
      bestTimeToVisit: bestTimeToVisit.trim() || null,
      image: image.trim(),
      heroImage: heroImage.trim() || image.trim(),
      shortDescription: shortDescription.trim() || null,
      description: description.trim(),
      highlights,
      gallery,
      featured,
      status,
      displayOrder: Number(displayOrder) || 0,
    };

    try {
      if (isEdit && id) {
        await adminClient.patch(`/destinations/${id}`, payload);
        showSuccess('Destination updated successfully.');
      } else {
        await adminClient.post('/destinations', payload);
        showSuccess('Destination created successfully.');
      }
      navigate('/destinations');
    } catch (err: unknown) {
      if (err instanceof AdminApiError) {
        setFieldErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError(err instanceof Error ? err.message : 'Failed to save destination.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="card card-body">Loading destination...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/destinations" className="btn btn-ghost btn-sm" style={{ marginBottom: 6 }}>
            <ArrowLeft size={14} /> Back to Destinations
          </Link>
          <h1 className="page-title">{isEdit ? 'Edit Destination' : 'Create Destination'}</h1>
        </div>
      </div>

      <div className="card">
        <form className="card-body" onSubmit={handleSubmit}>
          {formError && <div className="alert alert-danger">{formError}</div>}

          <div className="form-grid">
            <div className="field">
              <label className="field-label">
                Name <span className="field-required">*</span>
              </label>
              <input
                className={`input${fieldErrors.name ? ' input-error' : ''}`}
                value={name}
                onChange={(e) => {
                  const val = e.target.value;
                  setName(val);
                  if (!isEdit && !slugTouched) setSlug(slugify(val));
                }}
                required
              />
              {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
            </div>

            <SlugField
              value={slug}
              onChange={(val) => {
                setSlugTouched(true);
                setSlug(val);
              }}
              sourceText={name}
              isEditMode={isEdit}
              error={fieldErrors.slug}
            />

            <div className="field">
              <label className="field-label">Arabic Name</label>
              <input className="input" value={arabicName} onChange={(e) => setArabicName(e.target.value)} />
            </div>

            <div className="field">
              <label className="field-label">
                Category <span className="field-required">*</span>
              </label>
              <input
                className={`input${fieldErrors.category ? ' input-error' : ''}`}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Archaeological Capital"
                required
              />
              {fieldErrors.category && <span className="field-error">{fieldErrors.category}</span>}
            </div>

            <div className="field form-col-full">
              <label className="field-label">
                Tagline <span className="field-required">*</span>
              </label>
              <input
                className={`input${fieldErrors.tagline ? ' input-error' : ''}`}
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                required
              />
              {fieldErrors.tagline && <span className="field-error">{fieldErrors.tagline}</span>}
            </div>

            <div className="field">
              <label className="field-label">Starting Price (USD)</label>
              <input
                type="number"
                min="0"
                className="input"
                value={startingPrice}
                onChange={(e) => setStartingPrice(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label">Best Time to Visit</label>
              <input
                className="input"
                value={bestTimeToVisit}
                onChange={(e) => setBestTimeToVisit(e.target.value)}
                placeholder="e.g. October to April"
              />
            </div>

            <ImageUploadField
              label="Card Image"
              value={image}
              onChange={setImage}
              folder="destinations"
              required
              error={fieldErrors.image}
            />

            <ImageUploadField
              label="Hero Banner Image"
              value={heroImage}
              onChange={setHeroImage}
              folder="destinations"
              required
              error={fieldErrors.heroImage}
            />

            <div className="field form-col-full">
              <label className="field-label">Short Description</label>
              <textarea
                rows={2}
                className="textarea"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
            </div>

            <div className="field form-col-full">
              <label className="field-label">
                Full Description <span className="field-required">*</span>
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
              <StringListInput
                label="Highlights"
                values={highlights}
                onChange={setHighlights}
                placeholder="Add highlight..."
              />
            </div>

            <div className="form-col-full">
              <GalleryUploadField
                values={gallery}
                onChange={setGallery}
                folder="destinations"
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
                <span className="field-label">Featured on Homepage</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/destinations" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Destination'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
