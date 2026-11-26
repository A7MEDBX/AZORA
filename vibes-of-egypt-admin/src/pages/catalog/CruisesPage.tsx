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
import type { AdminCruise, AdminStatus } from '@/types/admin';

export const CruisesListPage: React.FC = () => {
  const [items, setItems] = useState<AdminCruise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminCruise[] }>('/cruises');
      setItems(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load cruises.');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    void load();
  }, [load]);

  const listItems: CatalogListItem[] = items.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: `${c.cruiseType} • ${c.route}`,
    slug: c.slug,
    image: c.image,
    meta: `${c.duration} • $${c.price}`,
    status: c.status,
  }));

  return (
    <CatalogListView
      heading="Nile & Dahabiya Cruises"
      subtitle="Manage luxury river cruisers, private Dahabiyas, and Lake Nasser vessels."
      createPath="/cruises/new"
      createLabel="New Cruise"
      editBasePath="/cruises"
      items={listItems}
      isLoading={isLoading}
      onToggleStatus={async (item) => {
        const nextStatus: AdminStatus = item.status === 'published' ? 'draft' : 'published';
        await adminClient.patch(`/cruises/${item.id}`, { status: nextStatus });
        showSuccess(`Cruise set to ${nextStatus}.`);
        await load();
      }}
      onDelete={async (item) => {
        await adminClient.delete(`/cruises/${item.id}`);
        showSuccess(`Deleted cruise "${item.title}".`);
        await load();
      }}
    />
  );
};

export const CruiseFormPage: React.FC = () => {
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
  const [cruiseType, setCruiseType] = useState('Dahabiya');
  const [vesselType, setVesselType] = useState('Handcrafted Teak Dahabiya');
  const [route, setRoute] = useState('Luxor to Aswan');
  const [capacity, setCapacity] = useState('Max 12 Guests');
  const [duration, setDuration] = useState('5 Days / 4 Nights');
  const [durationNights, setDurationNights] = useState('4');
  const [price, setPrice] = useState('1450');
  const [badge, setBadge] = useState('');
  const [cabins, setCabins] = useState('');
  const [lead, setLead] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<AdminStatus>('draft');
  const [displayOrder, setDisplayOrder] = useState('0');

  useEffect(() => {
    if (!id) return;
    adminClient
      .get<{ data: AdminCruise }>(`/cruises/${id}`)
      .then((res) => {
        const c = res.data;
        setTitle(c.title);
        setSlug(c.slug);
        setCruiseType(c.cruiseType);
        setVesselType(c.vesselType);
        setRoute(c.route);
        setCapacity(c.capacity);
        setDuration(c.duration);
        setDurationNights(String(c.durationNights));
        setPrice(String(c.price));
        setBadge(c.badge ?? '');
        setCabins(c.cabins ?? '');
        setLead(c.lead ?? '');
        setDescription(c.description);
        setImage(c.image);
        setImages(c.images ?? []);
        setHighlights(c.highlights ?? []);
        setAmenities(c.amenities ?? []);
        setFeatured(c.featured);
        setStatus(c.status);
        setDisplayOrder(String(c.displayOrder));
      })
      .catch((err: unknown) => showError(err instanceof Error ? err.message : 'Failed to load cruise.'))
      .finally(() => setLoading(false));
  }, [id, showError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      cruiseType: cruiseType.trim(),
      vesselType: vesselType.trim(),
      route: route.trim(),
      capacity: capacity.trim(),
      duration: duration.trim(),
      durationNights: Number(durationNights) || 1,
      price: Number(price) || 0,
      badge: badge.trim() || null,
      cabins: cabins.trim() || null,
      lead: lead.trim() || null,
      description: description.trim(),
      image: image.trim(),
      images,
      highlights,
      amenities,
      featured,
      status,
      displayOrder: Number(displayOrder) || 0,
    };

    try {
      if (isEdit && id) {
        await adminClient.patch(`/cruises/${id}`, payload);
        showSuccess('Cruise updated successfully.');
      } else {
        await adminClient.post('/cruises', payload);
        showSuccess('Cruise created successfully.');
      }
      navigate('/cruises');
    } catch (err: unknown) {
      if (err instanceof AdminApiError) {
        setFieldErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError(err instanceof Error ? err.message : 'Failed to save cruise.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card card-body">Loading cruise...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/cruises" className="btn btn-ghost btn-sm" style={{ marginBottom: 6 }}>
            <ArrowLeft size={14} /> Back to Cruises
          </Link>
          <h1 className="page-title">{isEdit ? 'Edit Cruise' : 'Create Cruise'}</h1>
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
                Cruise Type <span className="field-required">*</span>
              </label>
              <input
                className="input"
                value={cruiseType}
                onChange={(e) => setCruiseType(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">
                Vessel Type <span className="field-required">*</span>
              </label>
              <input
                className="input"
                value={vesselType}
                onChange={(e) => setVesselType(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">
                Route <span className="field-required">*</span>
              </label>
              <input className="input" value={route} onChange={(e) => setRoute(e.target.value)} required />
            </div>

            <div className="field">
              <label className="field-label">
                Capacity <span className="field-required">*</span>
              </label>
              <input
                className="input"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
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
              <label className="field-label">Duration Nights</label>
              <input
                type="number"
                min="1"
                className="input"
                value={durationNights}
                onChange={(e) => setDurationNights(e.target.value)}
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

            <div className="field form-col-full">
              <label className="field-label">Cabins Summary</label>
              <input className="input" value={cabins} onChange={(e) => setCabins(e.target.value)} />
            </div>

            <div className="form-col-full">
              <ImageUploadField
                label="Main Vessel Image"
                value={image}
                onChange={setImage}
                folder="cruises"
                required
                error={fieldErrors.image}
              />
            </div>

            <div className="form-col-full">
              <GalleryUploadField values={images} onChange={setImages} folder="cruises" />
            </div>

            <div className="field form-col-full">
              <label className="field-label">Lead Summary</label>
              <textarea rows={2} className="textarea" value={lead} onChange={(e) => setLead(e.target.value)} />
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

            <StringListInput label="Highlights" values={highlights} onChange={setHighlights} />
            <StringListInput label="Onboard Amenities" values={amenities} onChange={setAmenities} />

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
                <span className="field-label">Featured Cruise</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/cruises" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Cruise'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
