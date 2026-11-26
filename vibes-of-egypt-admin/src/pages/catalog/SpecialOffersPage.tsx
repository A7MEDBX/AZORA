import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { adminClient, AdminApiError } from '@/api/adminClient';
import { CatalogListView, type CatalogListItem } from '@/components/CatalogListView';
import { ImageUploadField } from '@/components/ImageUploadField';
import { SlugField, slugify } from '@/components/SlugField';
import { useToast } from '@/context/ToastContext';
import type { AdminSpecialOffer, OfferTargetType } from '@/types/admin';

interface TargetOption {
  id: string;
  slug: string;
  title: string;
}

const TARGET_ENDPOINT_MAP: Record<OfferTargetType, string> = {
  tour: '/tours',
  package: '/packages',
  cruise: '/cruises',
  experience: '/experiences',
};

export const SpecialOffersListPage: React.FC = () => {
  const [items, setItems] = useState<AdminSpecialOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminSpecialOffer[] }>('/special-offers');
      setItems(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load special offers.');
    } finally {
      setIsLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    void load();
  }, [load]);

  const listItems: CatalogListItem[] = items.map((o) => ({
    id: o.id,
    title: o.title,
    subtitle: `${o.discount} • ${o.targetType}: ${o.slug}`,
    slug: o.offerSlug,
    image: o.image,
    meta: `$${o.discountedPrice} (was $${o.originalPrice})`,
    status: o.status,
  }));

  return (
    <CatalogListView
      heading="Special Offers"
      subtitle="Manage seasonal promotions and discounted catalog privileges."
      createPath="/special-offers/new"
      createLabel="New Special Offer"
      editBasePath="/special-offers"
      items={listItems}
      isLoading={isLoading}
      onToggleStatus={async (item) => {
        const nextActive = item.status !== 'published';
        await adminClient.patch(`/special-offers/${item.id}`, { isActive: nextActive });
        showSuccess(`Offer ${nextActive ? 'activated' : 'deactivated'}.`);
        await load();
      }}
      onDelete={async (item) => {
        await adminClient.delete(`/special-offers/${item.id}`);
        showSuccess(`Deleted offer "${item.title}".`);
        await load();
      }}
    />
  );
};

export const SpecialOfferFormPage: React.FC = () => {
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
  const [discount, setDiscount] = useState('15% Off');
  const [category, setCategory] = useState('Seasonal Privilege');
  const [badge, setBadge] = useState('Limited Availability');
  const [originalPrice, setOriginalPrice] = useState('1500');
  const [discountedPrice, setDiscountedPrice] = useState('1250');
  const [validity, setValidity] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [targetType, setTargetType] = useState<OfferTargetType>('package');
  const [targetId, setTargetId] = useState('');
  const [targetSlugToMatch, setTargetSlugToMatch] = useState<string | null>(null);
  const [targetOptions, setTargetOptions] = useState<TargetOption[]>([]);
  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [displayOrder, setDisplayOrder] = useState('0');

  useEffect(() => {
    if (!id) return;
    adminClient
      .get<{ data: AdminSpecialOffer }>(`/special-offers/${id}`)
      .then((res) => {
        const o = res.data;
        setTitle(o.title);
        setSlug(o.offerSlug);
        setDiscount(o.discount);
        setCategory(o.category);
        setBadge(o.badge ?? '');
        setOriginalPrice(String(o.originalPrice));
        setDiscountedPrice(String(o.discountedPrice));
        setValidity(o.validity ?? '');
        setImage(o.image);
        setDescription(o.description);
        setTargetType(o.targetType);
        setTargetSlugToMatch(o.slug);
        setStartsAt(o.startsAt ? o.startsAt.slice(0, 16) : '');
        setEndsAt(o.endsAt ? o.endsAt.slice(0, 16) : '');
        setIsActive(o.isActive);
        setDisplayOrder(String(o.displayOrder));
      })
      .catch((err: unknown) => showError(err instanceof Error ? err.message : 'Failed to load offer.'))
      .finally(() => setLoading(false));
  }, [id, showError]);

  useEffect(() => {
    let active = true;
    adminClient
      .get<{ data: TargetOption[] }>(TARGET_ENDPOINT_MAP[targetType])
      .then((res) => {
        if (!active) return;
        setTargetOptions(res.data);
        if (targetSlugToMatch) {
          const matched = res.data.find((item) => item.slug === targetSlugToMatch);
          if (matched) {
            setTargetId(matched.id);
            setTargetSlugToMatch(null);
            return;
          }
        }
        if (res.data.length > 0 && !res.data.some((item) => item.id === targetId)) {
          setTargetId(res.data[0].id);
        }
      })
      .catch(() => {
        if (active) setTargetOptions([]);
      });
    return () => {
      active = false;
    };
  }, [targetType, targetSlugToMatch, targetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});

    const payload = {
      slug: slug.trim(),
      title: title.trim(),
      discount: discount.trim(),
      description: description.trim(),
      originalPrice: Number(originalPrice) || 0,
      discountedPrice: Number(discountedPrice) || 0,
      validity: validity.trim() || null,
      image: image.trim(),
      category: category.trim(),
      badge: badge.trim() || null,
      targetType,
      targetId,
      startsAt: startsAt ? new Date(startsAt).toISOString() : null,
      endsAt: endsAt ? new Date(endsAt).toISOString() : null,
      isActive,
      displayOrder: Number(displayOrder) || 0,
    };

    try {
      if (isEdit && id) {
        await adminClient.patch(`/special-offers/${id}`, payload);
        showSuccess('Special offer updated.');
      } else {
        await adminClient.post('/special-offers', payload);
        showSuccess('Special offer created.');
      }
      navigate('/special-offers');
    } catch (err: unknown) {
      if (err instanceof AdminApiError) {
        setFieldErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError(err instanceof Error ? err.message : 'Failed to save special offer.');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="card card-body">Loading special offer...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <Link to="/special-offers" className="btn btn-ghost btn-sm" style={{ marginBottom: 6 }}>
            <ArrowLeft size={14} /> Back to Special Offers
          </Link>
          <h1 className="page-title">{isEdit ? 'Edit Special Offer' : 'Create Special Offer'}</h1>
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
                Target Type <span className="field-required">*</span>
              </label>
              <select
                className="select"
                value={targetType}
                onChange={(e) => {
                  setTargetType(e.target.value as OfferTargetType);
                  setTargetId('');
                }}
              >
                <option value="package">Package</option>
                <option value="tour">Tour</option>
                <option value="cruise">Cruise</option>
                <option value="experience">Experience</option>
              </select>
            </div>

            <div className="field">
              <label className="field-label">
                Target Item <span className="field-required">*</span>
              </label>
              <select
                className={`select${fieldErrors.targetId ? ' input-error' : ''}`}
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                required
              >
                <option value="">Select {targetType}...</option>
                {targetOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.title} ({opt.slug})
                  </option>
                ))}
              </select>
              {fieldErrors.targetId && <span className="field-error">{fieldErrors.targetId}</span>}
            </div>

            <div className="field">
              <label className="field-label">Discount Label</label>
              <input className="input" value={discount} onChange={(e) => setDiscount(e.target.value)} required />
            </div>

            <div className="field">
              <label className="field-label">Category</label>
              <input className="input" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </div>

            <div className="field">
              <label className="field-label">Original Price (USD)</label>
              <input
                type="number"
                min="0"
                className="input"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="field-label">Discounted Price (USD)</label>
              <input
                type="number"
                min="0"
                className={`input${fieldErrors.discountedPrice ? ' input-error' : ''}`}
                value={discountedPrice}
                onChange={(e) => setDiscountedPrice(e.target.value)}
                required
              />
              {fieldErrors.discountedPrice && (
                <span className="field-error">{fieldErrors.discountedPrice}</span>
              )}
            </div>

            <div className="field">
              <label className="field-label">Starts At (Optional)</label>
              <input
                type="datetime-local"
                className="input"
                value={startsAt}
                onChange={(e) => setStartsAt(e.target.value)}
              />
            </div>

            <div className="field">
              <label className="field-label">Ends At (Optional)</label>
              <input
                type="datetime-local"
                className={`input${fieldErrors.endsAt ? ' input-error' : ''}`}
                value={endsAt}
                onChange={(e) => setEndsAt(e.target.value)}
              />
              {fieldErrors.endsAt && <span className="field-error">{fieldErrors.endsAt}</span>}
            </div>

            <div className="field">
              <label className="field-label">Validity Label</label>
              <input className="input" value={validity} onChange={(e) => setValidity(e.target.value)} />
            </div>

            <div className="field">
              <label className="field-label">Badge</label>
              <input className="input" value={badge} onChange={(e) => setBadge(e.target.value)} />
            </div>

            <div className="form-col-full">
              <ImageUploadField
                label="Offer Banner Image"
                value={image}
                onChange={setImage}
                folder="offers"
                required
                error={fieldErrors.image}
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
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <span className="field-label">Offer is Active</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/special-offers" className="btn btn-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Save Offer' : 'Create Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
