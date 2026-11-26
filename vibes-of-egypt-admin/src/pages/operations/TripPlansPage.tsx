import React, { useCallback, useEffect, useState } from 'react';
import { Mail, Search, Trash2, X } from 'lucide-react';
import { adminClient } from '@/api/adminClient';
import { useToast } from '@/context/ToastContext';
import type { AdminTripPlan, TripPlanStatus } from '@/types/admin';

const STATUS_TABS: { label: string; value: 'all' | TripPlanStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Reviewing', value: 'reviewing' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

const STATUS_BADGE_STYLE: Record<string, React.CSSProperties> = {
  new: { background: 'var(--info-bg)', color: 'var(--info-text)' },
  reviewing: { background: 'var(--warning-bg)', color: 'var(--warning-text)' },
  contacted: { background: 'var(--gold-soft)', color: '#854d0e' },
  completed: { background: 'var(--success-bg)', color: 'var(--success-text)' },
  cancelled: { background: 'var(--danger-bg)', color: 'var(--danger-text)' },
};

function formatDate(iso: string | null): string {
  if (!iso) return 'Flexible';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const TripPlansPage: React.FC = () => {
  const [plans, setPlans] = useState<AdminTripPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | TripPlanStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<AdminTripPlan | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<AdminTripPlan | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminTripPlan[] }>('/trip-plans', {
        status: statusFilter === 'all' ? undefined : statusFilter,
        q: searchTerm.trim() || undefined,
      });
      setPlans(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load trip plans.');
    } finally {
      setIsLoading(false);
    }
  }, [statusFilter, searchTerm, showError]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void load();
    }, 200);
    return () => window.clearTimeout(timer);
  }, [load]);

  const handleStatusChange = async (plan: AdminTripPlan, nextStatus: TripPlanStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await adminClient.patch<{ data: AdminTripPlan }>(`/trip-plans/${plan.id}`, {
        status: nextStatus,
      });
      setSelected(res.data);
      setPlans((prev) => prev.map((item) => (item.id === res.data.id ? res.data : item)));
      showSuccess(`Trip plan status updated to "${nextStatus}".`);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to update trip plan status.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await adminClient.delete(`/trip-plans/${confirmDelete.id}`);
      setPlans((prev) => prev.filter((item) => item.id !== confirmDelete.id));
      if (selected?.id === confirmDelete.id) setSelected(null);
      setConfirmDelete(null);
      showSuccess('Trip plan deleted.');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to delete trip plan.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Custom Trip Plans</h1>
          <p className="page-subtitle">
            Manage bespoke itinerary requests, travel windows, and traveler preferences.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="tabs">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                className={`tab-btn${statusFilter === tab.value ? ' active' : ''}`}
                onClick={() => setStatusFilter(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: 250 }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
              }}
            />
            <input
              type="text"
              className="input"
              style={{ paddingLeft: '2rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search traveler name or email..."
            />
          </div>
        </div>

        <div className="table-wrap">
          {isLoading ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading trip plans...
            </div>
          ) : plans.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No trip plans match the current filter.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Traveler</th>
                  <th>Travel Window</th>
                  <th>Party</th>
                  <th>Destinations</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr
                    key={plan.id}
                    onClick={() => setSelected(plan)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ fontWeight: 600 }}>{plan.fullName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {plan.email}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem' }}>
                      {plan.travelStartDate
                        ? `${formatDate(plan.travelStartDate)}${
                            plan.travelEndDate ? ` → ${formatDate(plan.travelEndDate)}` : ''
                          }`
                        : `Flexible (${plan.durationDays} days)`}
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {plan.adultsCount} adult{plan.adultsCount === 1 ? '' : 's'}
                      {plan.childrenCount > 0 ? `, ${plan.childrenCount} child` : ''}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      {plan.preferredDestinations.length > 0
                        ? plan.preferredDestinations.slice(0, 3).join(', ') +
                          (plan.preferredDestinations.length > 3
                            ? ` +${plan.preferredDestinations.length - 3}`
                            : '')
                        : '—'}
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={
                          STATUS_BADGE_STYLE[plan.status] ?? {
                            background: '#e2e8f0',
                            color: '#475569',
                          }
                        }
                      >
                        {plan.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {formatDate(plan.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Trip Plan Detail Modal */}
      {selected && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-card"
            style={{ maxWidth: 660, maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem',
              }}
            >
              <div>
                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{selected.fullName}</h2>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>
                  Submitted {formatDate(selected.createdAt)} • {selected.durationDays} days
                </div>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="form-grid" style={{ marginBottom: '1rem', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>
                  Email
                </strong>
                <span>{selected.email}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>
                  Phone
                </strong>
                <span>{selected.phone || '—'}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>
                  Travel Window
                </strong>
                <span>
                  {formatDate(selected.travelStartDate)} → {formatDate(selected.travelEndDate)}
                </span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>
                  Party Size
                </strong>
                <span>
                  {selected.adultsCount} Adults, {selected.childrenCount} Children
                </span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>
                  Accommodation / Travel Style
                </strong>
                <span>{selected.travelStyle}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>
                  Budget Per Person
                </strong>
                <span>{selected.budgetPerPerson}</span>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', marginBottom: 6 }}>
                Preferred Destinations
              </strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {selected.preferredDestinations.length > 0 ? (
                  selected.preferredDestinations.map((dest) => (
                    <span
                      key={dest}
                      className="badge"
                      style={{ background: 'var(--gold-soft)', color: '#854d0e' }}
                    >
                      {dest}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>None specified</span>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem', marginBottom: 6 }}>
                Interests
              </strong>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {selected.interests.length > 0 ? (
                  selected.interests.map((interest) => (
                    <span
                      key={interest}
                      className="badge"
                      style={{ background: 'var(--bg-subtle)', color: 'var(--text-primary)' }}
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>None specified</span>
                )}
              </div>
            </div>

            {selected.additionalNotes && (
              <div
                style={{
                  background: 'var(--bg-subtle)',
                  padding: '0.9rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1.25rem',
                  whiteSpace: 'pre-wrap',
                  fontSize: '0.86rem',
                  lineHeight: 1.55,
                }}
              >
                {selected.additionalNotes}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label className="field-label" style={{ margin: 0 }}>
                  Status:
                </label>
                <select
                  className="select"
                  style={{ width: 'auto' }}
                  disabled={updatingStatus}
                  value={selected.status}
                  onChange={(e) => handleStatusChange(selected, e.target.value as TripPlanStatus)}
                >
                  <option value="new">New</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="contacted">Contacted</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(
                    'Your Bespoke Vibes of Egypt Itinerary Proposal'
                  )}`}
                  className="btn btn-primary btn-sm"
                >
                  <Mail size={14} /> Quick Reply
                </a>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => setConfirmDelete(selected)}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3 style={{ margin: '0 0 0.5rem' }}>Delete Trip Plan?</h3>
            <p style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Permanently remove the trip plan request from <strong>{confirmDelete.fullName}</strong>?
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
                disabled={deleting}
                onClick={handleDelete}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
