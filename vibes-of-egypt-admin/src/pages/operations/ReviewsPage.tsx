import React, { useCallback, useEffect, useState } from 'react';
import { CheckCircle2, Pencil, Plus, Star, Trash2, X, XCircle } from 'lucide-react';
import { adminClient, AdminApiError } from '@/api/adminClient';
import { useToast } from '@/context/ToastContext';
import type { AdminReview, ReviewTargetType } from '@/types/admin';

type ApprovedFilter = 'all' | 'false' | 'true';

type CreatableTargetType = '' | 'destination' | 'tour' | 'package' | 'cruise' | 'experience';

interface TargetOption {
  id: string;
  title?: string;
  name?: string;
  slug: string;
}

const TARGET_ENDPOINTS: Record<Exclude<CreatableTargetType, ''>, string> = {
  destination: '/destinations',
  tour: '/tours',
  package: '/packages',
  cruise: '/cruises',
  experience: '/experiences',
};

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<AdminReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [approvedFilter, setApprovedFilter] = useState<ApprovedFilter>('all');
  const [targetTypeFilter, setTargetTypeFilter] = useState<'all' | ReviewTargetType>('all');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<AdminReview | null>(null);

  // Create / Edit Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<AdminReview | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCountry, setReviewerCountry] = useState('');
  const [rating, setRating] = useState('5');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetType, setTargetType] = useState<CreatableTargetType>('');
  const [targetId, setTargetId] = useState('');
  const [targetOptions, setTargetOptions] = useState<TargetOption[]>([]);
  const [isApproved, setIsApproved] = useState(true);

  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminReview[] }>('/reviews', {
        approved: approvedFilter === 'all' ? undefined : approvedFilter,
        targetType: targetTypeFilter === 'all' ? undefined : targetTypeFilter,
      });
      setReviews(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load reviews.');
    } finally {
      setIsLoading(false);
    }
  }, [approvedFilter, targetTypeFilter, showError]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!targetType || editingReview) {
      setTargetOptions([]);
      return;
    }
    let active = true;
    adminClient
      .get<{ data: TargetOption[] }>(TARGET_ENDPOINTS[targetType])
      .then((res) => {
        if (!active) return;
        setTargetOptions(res.data);
        if (res.data.length > 0) setTargetId(res.data[0].id);
      })
      .catch(() => {
        if (active) setTargetOptions([]);
      });
    return () => {
      active = false;
    };
  }, [targetType, editingReview]);

  const openCreateModal = () => {
    setEditingReview(null);
    setReviewerName('');
    setReviewerCountry('');
    setRating('5');
    setTitle('');
    setContent('');
    setTargetType('');
    setTargetId('');
    setIsApproved(true);
    setFormError(null);
    setFieldErrors({});
    setModalOpen(true);
  };

  const openEditModal = (review: AdminReview) => {
    setEditingReview(review);
    setReviewerName(review.reviewerName);
    setReviewerCountry(review.reviewerCountry ?? '');
    setRating(String(review.rating));
    setTitle(review.title);
    setContent(review.content);
    setIsApproved(review.isApproved);
    setFormError(null);
    setFieldErrors({});
    setModalOpen(true);
  };

  const handleToggleApprove = async (review: AdminReview) => {
    setBusyId(review.id);
    try {
      const nextApproved = !review.isApproved;
      await adminClient.patch(`/reviews/${review.id}`, { isApproved: nextApproved });
      showSuccess(nextApproved ? 'Review approved and published.' : 'Review moved to pending.');
      await load();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to update review approval.');
    } finally {
      setBusyId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    setFieldErrors({});

    try {
      if (editingReview) {
        await adminClient.patch(`/reviews/${editingReview.id}`, {
          reviewerName: reviewerName.trim(),
          reviewerCountry: reviewerCountry.trim() || null,
          rating: Number(rating),
          title: title.trim(),
          content: content.trim(),
          isApproved,
        });
        showSuccess('Review updated.');
      } else {
        await adminClient.post('/reviews', {
          reviewerName: reviewerName.trim(),
          reviewerCountry: reviewerCountry.trim() || null,
          rating: Number(rating),
          title: title.trim(),
          content: content.trim(),
          ...(targetType && targetId ? { targetType, targetId } : {}),
          isApproved,
        });
        showSuccess('Verified review created.');
      }
      setModalOpen(false);
      await load();
    } catch (err: unknown) {
      if (err instanceof AdminApiError) {
        setFieldErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError(err instanceof Error ? err.message : 'Failed to save review.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setBusyId(confirmDelete.id);
    try {
      await adminClient.delete(`/reviews/${confirmDelete.id}`);
      setConfirmDelete(null);
      showSuccess('Review deleted.');
      await load();
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to delete review.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Customer Reviews Moderation</h1>
          <p className="page-subtitle">
            Approve traveler testimonials, edit submissions, or publish verified reviews.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openCreateModal}>
          <Plus size={16} /> Add Verified Review
        </button>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="tabs">
            <button
              type="button"
              className={`tab-btn${approvedFilter === 'all' ? ' active' : ''}`}
              onClick={() => setApprovedFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`tab-btn${approvedFilter === 'false' ? ' active' : ''}`}
              onClick={() => setApprovedFilter('false')}
            >
              Pending Approval
            </button>
            <button
              type="button"
              className={`tab-btn${approvedFilter === 'true' ? ' active' : ''}`}
              onClick={() => setApprovedFilter('true')}
            >
              Approved
            </button>
          </div>

          <select
            className="select"
            style={{ width: 'auto', minWidth: 180 }}
            value={targetTypeFilter}
            onChange={(e) => setTargetTypeFilter(e.target.value as 'all' | ReviewTargetType)}
          >
            <option value="all">All Target Types</option>
            <option value="tour">Tour</option>
            <option value="package">Package</option>
            <option value="cruise">Cruise</option>
            <option value="experience">Experience</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="card-body">
          {isLoading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No reviews match the selected filters.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reviews.map((review) => (
                <div
                  key={review.id}
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.15rem 1.25rem',
                    background: 'var(--bg-page)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      marginBottom: '0.6rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <strong>{review.reviewerName}</strong>
                        {review.reviewerCountry && (
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                            • {review.reviewerCountry}
                          </span>
                        )}
                        <span
                          className={`badge ${review.isApproved ? 'badge-published' : 'badge-draft'}`}
                        >
                          {review.isApproved ? 'Approved' : 'Pending'}
                        </span>
                        {review.targetType && (
                          <span
                            className="badge"
                            style={{ background: 'var(--gold-soft)', color: '#854d0e' }}
                          >
                            {review.targetType}
                            {review.targetId ? `: ${review.targetId}` : ''}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 3,
                          marginTop: 4,
                          color: 'var(--gold)',
                        }}
                      >
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={14}
                            fill={idx < review.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: 6 }}>
                          {review.date}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        disabled={busyId === review.id}
                        onClick={() => handleToggleApprove(review)}
                      >
                        {review.isApproved ? (
                          <>
                            <XCircle size={14} /> Unapprove
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={14} /> Approve
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => openEditModal(review)}
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--danger)' }}
                        onClick={() => setConfirmDelete(review)}
                        aria-label="Delete review"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.35rem' }}>
                    {review.title}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Review Modal */}
      {modalOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="modal-card"
            style={{ maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <h2 style={{ margin: 0, fontSize: '1.15rem' }}>
                {editingReview ? 'Edit Review' : 'Add Verified Review'}
              </h2>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setModalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            {formError && <div className="alert alert-danger">{formError}</div>}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <div className="form-grid">
                <div className="field">
                  <label className="field-label">
                    Reviewer Name <span className="field-required">*</span>
                  </label>
                  <input
                    className={`input${fieldErrors.reviewerName ? ' input-error' : ''}`}
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    required
                  />
                  {fieldErrors.reviewerName && (
                    <span className="field-error">{fieldErrors.reviewerName}</span>
                  )}
                </div>

                <div className="field">
                  <label className="field-label">Country / Location</label>
                  <input
                    className="input"
                    value={reviewerCountry}
                    onChange={(e) => setReviewerCountry(e.target.value)}
                    placeholder="e.g. London, UK"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="field">
                  <label className="field-label">
                    Rating (1–5) <span className="field-required">*</span>
                  </label>
                  <select className="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                <div className="field" style={{ justifyContent: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={isApproved}
                      onChange={(e) => setIsApproved(e.target.checked)}
                    />
                    <span className="field-label">Approved (Public)</span>
                  </label>
                </div>
              </div>

              {!editingReview && (
                <div className="form-grid">
                  <div className="field">
                    <label className="field-label">Linked Target Type (Optional)</label>
                    <select
                      className="select"
                      value={targetType}
                      onChange={(e) => {
                        setTargetType(e.target.value as CreatableTargetType);
                        setTargetId('');
                      }}
                    >
                      <option value="">General / None</option>
                      <option value="destination">Destination</option>
                      <option value="tour">Tour</option>
                      <option value="package">Package</option>
                      <option value="cruise">Cruise</option>
                      <option value="experience">Experience</option>
                    </select>
                  </div>

                  {targetType && (
                    <div className="field">
                      <label className="field-label">Linked Item</label>
                      <select
                        className="select"
                        value={targetId}
                        onChange={(e) => setTargetId(e.target.value)}
                        required
                      >
                        <option value="">Select {targetType}...</option>
                        {targetOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.title || opt.name} ({opt.slug})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              <div className="field">
                <label className="field-label">
                  Title / Tour or Cruise Name <span className="field-required">*</span>
                </label>
                <input
                  className={`input${fieldErrors.title ? ' input-error' : ''}`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                {fieldErrors.title && <span className="field-error">{fieldErrors.title}</span>}
              </div>

              <div className="field">
                <label className="field-label">
                  Review Content <span className="field-required">*</span>
                </label>
                <textarea
                  rows={4}
                  className={`textarea${fieldErrors.content ? ' input-error' : ''}`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
                {fieldErrors.content && <span className="field-error">{fieldErrors.content}</span>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: 8 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingReview ? 'Save Changes' : 'Create Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3 style={{ margin: '0 0 0.5rem' }}>Delete Review?</h3>
            <p style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Permanently delete the review by <strong>{confirmDelete.reviewerName}</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={busyId === confirmDelete.id}
                onClick={handleDelete}
              >
                {busyId === confirmDelete.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
