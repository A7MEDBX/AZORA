import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowUp, Plus, Trash2 } from 'lucide-react';
import { adminClient, AdminApiError } from '@/api/adminClient';
import { CatalogListView, type CatalogListItem } from '@/components/CatalogListView';
import { GalleryUploadField } from '@/components/GalleryUploadField';
import { ImageUploadField } from '@/components/ImageUploadField';
import { SlugField, slugify } from '@/components/SlugField';
import { StringListInput } from '@/components/StringListInput';
import { useToast } from '@/context/ToastContext';
import type { AdminDestination, AdminPackage, AdminStatus } from '@/types/admin';

interface ItineraryDayDraft {
  dayNumber: number;
  title: string;
  description: string;
  destinationId: string;
  imageUrl: string;
  meals: string;
  overnightLocation: string;
}

export const PackagesListPage: React.FC = () => {
  const [items, setItems] = useState<AdminPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminPackage[] }>('/packages');
      setItems(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load packages.');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    void load();
  }, [load]);

  const listItems: CatalogListItem[] = items.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: `${p.category} • ${p.route}`,
    slug: p.slug,
    image: p.image,
    meta: `${p.duration} • $${p.price}`,
    status: p.status,
  }));

  return (
    <CatalogListView
      heading="Tour Packages"
      subtitle="Manage multi-day circuits, linked destinations, and day-by-day itineraries."
      createPath="/packages/new"
      createLabel="New Package"
      editBasePath="/packages"
      items={listItems}
      isLoading={isLoading}
      onToggleStatus={async (item) => {
        const nextStatus: AdminStatus = item.status === 'published' ? 'draft' : 'published';
        await adminClient.patch(`/packages/${item.id}`, { status: nextStatus });
        showSuccess(`Package set to ${nextStatus}.`);
        await load();
      }}
      onDelete={async (item) => {
        await adminClient.delete(`/packages/${item.id}`);
        showSuccess(`Deleted package "${item.title}".`);
        await load();
      }}
    />
  );
};

export const PackageFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [allDestinations, setAllDestinations] = useState<AdminDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Classic');
  const [duration, setDuration] = useState('8 Days / 7 Nights');
  const [durationDays, setDurationDays] = useState('8');
  const [durationNights, setDurationNights] = useState('7');
  const [price, setPrice] = useState('1350');
  const [badge, setBadge] = useState('');
  const [route, setRoute] = useState('');
  const [hotels, setHotels] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [image, setImage] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [overview, setOverview] = useState('');
  const [description, setDescription] = useState('');
  const [highlights, setHighlights] = useState<string[]>([]);
  const [inclusions, setInclusions] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<AdminStatus>('draft');
  const [displayOrder, setDisplayOrder] = useState('0');

  // Ordered linked destinations
  const [selectedDestIds, setSelectedDestIds] = useState<string[]>([]);
  const [destPickerId, setDestPickerId] = useState('');

  // Day-by-Day Itinerary Builder
  const [itineraryDays, setItineraryDays] = useState<ItineraryDayDraft[]>([]);

  useEffect(() => {
    async function init() {
      try {
        const destRes = await adminClient.get<{ data: AdminDestination[] }>('/destinations');
        setAllDestinations(destRes.data);
        if (destRes.data.length > 0) setDestPickerId(destRes.data[0].id);

        if (id) {
          const pkgRes = await adminClient.get<{ data: AdminPackage }>(`/packages/${id}`);
          const p = pkgRes.data;
          setTitle(p.title);
          setSlug(p.slug);
          setCategory(p.category ?? 'Classic');
          setDuration(p.duration);
          setDurationDays(String(p.durationDays));
          setDurationNights(String(p.durationNights));
          setPrice(String(p.price));
          setBadge(p.badge ?? '');
          setRoute(p.route);
          setHotels(p.hotels ?? '');
          setAccommodation(p.accommodation ?? '');
          setImage(p.image);
          setImages(p.images ?? []);
          setOverview(p.overview ?? '');
          setDescription(p.description);
          setHighlights(p.highlights ?? []);
          setInclusions(p.inclusions ?? []);
          setExclusions(p.exclusions ?? []);
          setFeatured(p.featured);
          setStatus(p.status);
          setDisplayOrder(String(p.displayOrder));
          setSelectedDestIds((p.destinationDetails ?? []).map((d) => d.id));
          setItineraryDays(
            (p.dailyItinerary ?? []).map((day, idx) => ({
              dayNumber: day.day ?? idx + 1,
              title: day.title,
              description: day.desc,
              destinationId: day.destination?.id ?? '',
              imageUrl: '',
              meals: day.meals ?? '',
              overnightLocation: day.accommodation ?? '',
            }))
          );
        }
      } catch (err: unknown) {
        showError(err instanceof Error ? err.message : 'Failed to load package.');
      } finally {
        setLoading(false);
      }
    }
    void init();
  }, [id, showError]);

  const moveDestination = (index: number, delta: -1 | 1) => {
    const next = [...selectedDestIds];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setSelectedDestIds(next);
  };

  const renumberDays = (days: ItineraryDayDraft[]): ItineraryDayDraft[] =>
    days.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));

  const addDay = () => {
    setItineraryDays((prev) =>
      renumberDays([
        ...prev,
        {
          dayNumber: prev.length + 1,
          title: '',
          description: '',
          destinationId: '',
          imageUrl: '',
          meals: '',
          overnightLocation: '',
        },
      ])
    );
  };

  const moveDay = (index: number, delta: -1 | 1) => {
    const next = [...itineraryDays];
    const target = index + delta;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setItineraryDays(renumberDays(next));
  };

  const updateDay = (index: number, patch: Partial<ItineraryDayDraft>) => {
    setItineraryDays((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  };

  const removeDay = (index: number) => {
    setItineraryDays((prev) => renumberDays(prev.filter((_, i) => i !== index)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim() || null,
      duration: duration.trim(),
      durationDays: Number(durationDays) || 1,
      durationNights: Number(durationNights) || 0,
      price: Number(price) || 0,
      badge: badge.trim() || null,
      route: route.trim(),
      hotels: hotels.trim() || null,
      accommodation: accommodation.trim() || null,
      image: image.trim(),
      images,
      overview: overview.trim() || null,
      description: description.trim(),
      highlights,
      inclusions,
      exclusions,
      featured,
      status,
      displayOrder: Number(displayOrder) || 0,
      packageDestinations: selectedDestIds.map((destinationId, idx) => ({
        destinationId,
        displayOrder: idx + 1,
      })),
      packageItineraryDays: itineraryDays.map((day, idx) => ({
        dayNumber: idx + 1,
        title: day.title.trim(),
        description: day.description.trim(),
        destinationId: day.destinationId || null,
        imageUrl: day.imageUrl.trim() || null,
        meals: day.meals.trim() || null,
        overnightLocation: day.overnightLocation.trim() || null,
      })),
    };

    try {
      if (isEdit && id) {
        await adminClient.patch(`/packages/${id}`, payload);
        showSuccess('Package updated successfully.');
      } else {
        await adminClient.post('/packages', payload);
        showSuccess('Package created successfully.');
      }
      navigate('/packages');
    } catch (err: unknown) {
      if (err instanceof AdminApiError) {
        setFieldErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError(err instanceof Error ? err.message : 'Failed to save package.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card card-body">Loading package...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/packages" className="btn btn-ghost btn-sm" style={{ marginBottom: 6 }}>
            <ArrowLeft size={14} /> Back to Packages
          </Link>
          <h1 className="page-title">{isEdit ? 'Edit Package' : 'Create Package'}</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {formError && <div className="alert alert-danger">{formError}</div>}

        <div className="card">
          <div className="card-body">
            <h2 className="form-section-title">Core Details</h2>
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
                <label className="field-label">Category</label>
                <input
                  className="input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Classic / Luxury / Nile & Red Sea"
                />
              </div>

              <div className="field">
                <label className="field-label">
                  Route Summary <span className="field-required">*</span>
                </label>
                <input
                  className="input"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  placeholder="Cairo (3N) → Luxor (4N) → Aswan"
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">
                  Duration Label <span className="field-required">*</span>
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
                <label className="field-label">Duration Days</label>
                <input
                  type="number"
                  min="1"
                  className="input"
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Duration Nights</label>
                <input
                  type="number"
                  min="0"
                  className="input"
                  value={durationNights}
                  onChange={(e) => setDurationNights(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label className="field-label">Hotels</label>
                <input className="input" value={hotels} onChange={(e) => setHotels(e.target.value)} />
              </div>

              <div className="field">
                <label className="field-label">Accommodation Summary</label>
                <input
                  className="input"
                  value={accommodation}
                  onChange={(e) => setAccommodation(e.target.value)}
                />
              </div>

              <div className="field">
                <label className="field-label">Badge</label>
                <input className="input" value={badge} onChange={(e) => setBadge(e.target.value)} />
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

              <div className="field" style={{ justifyContent: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  <span className="field-label">Featured Package</span>
                </label>
              </div>

              <div className="form-col-full">
                <ImageUploadField
                  label="Main Cover Image"
                  value={image}
                  onChange={setImage}
                  folder="packages"
                  required
                  error={fieldErrors.image}
                />
              </div>

              <div className="form-col-full">
                <GalleryUploadField values={images} onChange={setImages} folder="packages" />
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
                  className="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="form-col-full">
                <StringListInput label="Highlights" values={highlights} onChange={setHighlights} />
              </div>
              <StringListInput label="Inclusions" values={inclusions} onChange={setInclusions} />
              <StringListInput label="Exclusions" values={exclusions} onChange={setExclusions} />
            </div>
          </div>
        </div>

        {/* Ordered Multi-Destination Picker */}
        <div className="card">
          <div className="card-body">
            <h2 className="form-section-title">Linked Destinations (Ordered)</h2>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <select
                className="select"
                value={destPickerId}
                onChange={(e) => setDestPickerId(e.target.value)}
              >
                {allDestinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.slug})
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  if (destPickerId && !selectedDestIds.includes(destPickerId)) {
                    setSelectedDestIds((prev) => [...prev, destPickerId]);
                  }
                }}
              >
                <Plus size={15} /> Add Destination
              </button>
            </div>

            {selectedDestIds.length === 0 ? (
              <p className="field-hint">No destinations linked yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {selectedDestIds.map((destId, idx) => {
                  const dest = allDestinations.find((d) => d.id === destId);
                  return (
                    <div
                      key={destId}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.55rem 0.85rem',
                        background: 'var(--bg-subtle)',
                        borderRadius: 'var(--radius-sm)',
                      }}
                    >
                      <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>
                        {idx + 1}. {dest?.name ?? destId}
                      </span>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          disabled={idx === 0}
                          onClick={() => moveDestination(idx, -1)}
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          disabled={idx === selectedDestIds.length - 1}
                          onClick={() => moveDestination(idx, 1)}
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          style={{ color: 'var(--danger)' }}
                          onClick={() =>
                            setSelectedDestIds((prev) => prev.filter((item) => item !== destId))
                          }
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Day-by-Day Itinerary Builder */}
        <div className="card">
          <div className="card-body">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
              }}
            >
              <h2 className="form-section-title" style={{ margin: 0, border: 'none', padding: 0 }}>
                Day-by-Day Itinerary Builder
              </h2>
              <button type="button" className="btn btn-secondary btn-sm" onClick={addDay}>
                <Plus size={14} /> Add Day
              </button>
            </div>

            {itineraryDays.length === 0 ? (
              <p className="field-hint">
                Click "Add Day" to build this package's day-by-day itinerary.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {itineraryDays.map((day, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1rem',
                      background: 'var(--bg-page)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem',
                      }}
                    >
                      <strong style={{ color: 'var(--sand)' }}>Day {idx + 1}</strong>
                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          disabled={idx === 0}
                          onClick={() => moveDay(idx, -1)}
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          disabled={idx === itineraryDays.length - 1}
                          onClick={() => moveDay(idx, 1)}
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          style={{ color: 'var(--danger)' }}
                          onClick={() => removeDay(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="form-grid">
                      <div className="field">
                        <label className="field-label">
                          Day Title <span className="field-required">*</span>
                        </label>
                        <input
                          className="input"
                          value={day.title}
                          onChange={(e) => updateDay(idx, { title: e.target.value })}
                          required
                        />
                      </div>

                      <div className="field">
                        <label className="field-label">Destination</label>
                        <select
                          className="select"
                          value={day.destinationId}
                          onChange={(e) => updateDay(idx, { destinationId: e.target.value })}
                        >
                          <option value="">None / Multiple</option>
                          {allDestinations.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="field form-col-full">
                        <label className="field-label">
                          Description <span className="field-required">*</span>
                        </label>
                        <textarea
                          rows={2}
                          className="textarea"
                          value={day.description}
                          onChange={(e) => updateDay(idx, { description: e.target.value })}
                          required
                        />
                      </div>

                      <div className="field">
                        <label className="field-label">Meals</label>
                        <input
                          className="input"
                          value={day.meals}
                          onChange={(e) => updateDay(idx, { meals: e.target.value })}
                          placeholder="Breakfast, Lunch & Dinner"
                        />
                      </div>

                      <div className="field">
                        <label className="field-label">Overnight Location / Accommodation</label>
                        <input
                          className="input"
                          value={day.overnightLocation}
                          onChange={(e) => updateDay(idx, { overnightLocation: e.target.value })}
                          placeholder="Marriott Mena House / Nile Cruiser"
                        />
                      </div>

                      <div className="form-col-full">
                        <ImageUploadField
                          label="Day Image (Optional)"
                          value={day.imageUrl}
                          onChange={(url) => updateDay(idx, { imageUrl: url })}
                          folder="packages"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="form-actions">
              <Link to="/packages" className="btn btn-secondary">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? 'Saving...' : isEdit ? 'Save Package' : 'Create Package'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
