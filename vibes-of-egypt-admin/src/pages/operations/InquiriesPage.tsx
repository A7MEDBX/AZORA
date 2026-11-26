import React, { useCallback, useEffect, useState } from 'react';
import { Mail, Search, Trash2, X } from 'lucide-react';
import { adminClient } from '@/api/adminClient';
import { useToast } from '@/context/ToastContext';
import type { AdminInquiry, InquiryStatus } from '@/types/admin';

const STATUS_TABS: { label: string; value: 'all' | InquiryStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Responded', value: 'responded' },
  { label: 'Closed', value: 'closed' },
];

const STATUS_BADGE_STYLE: Record<InquiryStatus, React.CSSProperties> = {
  new: { background: 'var(--info-bg)', color: 'var(--info-text)' },
  in_progress: { background: 'var(--warning-bg)', color: 'var(--warning-text)' },
  responded: { background: 'var(--success-bg)', color: 'var(--success-text)' },
  closed: { background: '#e2e8f0', color: '#475569' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const InquiriesPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | InquiryStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<AdminInquiry | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<AdminInquiry | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { showSuccess, showError } = useToast();

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await adminClient.get<{ data: AdminInquiry[] }>('/inquiries', {
        status: statusFilter === 'all' ? undefined : statusFilter,
        q: searchTerm.trim() || undefined,
      });
      setInquiries(res.data);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to load inquiries.');
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

  const handleStatusChange = async (inquiry: AdminInquiry, nextStatus: InquiryStatus) => {
    setUpdatingStatus(true);
    try {
      const res = await adminClient.patch<{ data: AdminInquiry }>(`/inquiries/${inquiry.id}`, {
        status: nextStatus,
      });
      setSelected(res.data);
      setInquiries((prev) => prev.map((item) => (item.id === res.data.id ? res.data : item)));
      showSuccess(`Inquiry status updated to "${nextStatus.replace('_', ' ')}".`);
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to update inquiry status.');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await adminClient.delete(`/inquiries/${confirmDelete.id}`);
      setInquiries((prev) => prev.filter((item) => item.id !== confirmDelete.id));
      if (selected?.id === confirmDelete.id) setSelected(null);
      setConfirmDelete(null);
      showSuccess('Inquiry deleted.');
    } catch (err: unknown) {
      showError(err instanceof Error ? err.message : 'Failed to delete inquiry.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Inquiries Inbox</h1>
          <p className="page-subtitle">
            Review incoming concierge inquiries, update workflow status, and respond via email.
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

          <div style={{ position: 'relative', minWidth: 260 }}>
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
              placeholder="Search name, email, or subject..."
            />
          </div>
        </div>

        <div className="table-wrap">
          {isLoading ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading inquiries...
            </div>
          ) : inquiries.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No inquiries match the current filter.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Subject / Type</th>
                  <th>Linked Target</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelected(inq)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>
                      <div style={{ fontWeight: 600 }}>{inq.fullName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {inq.email}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{inq.subject || 'General Concierge Inquiry'}</div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          textTransform: 'capitalize',
                        }}
                      >
                        {inq.inquiryType}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {inq.targetTitle || inq.targetSlug || '—'}
                    </td>
                    <td>
                      <span className="badge" style={STATUS_BADGE_STYLE[inq.status]}>
                        {inq.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {formatDate(inq.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selected && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-card"
            style={{ maxWidth: 620, maxHeight: '90vh', overflowY: 'auto' }}
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
                  Submitted {formatDate(selected.createdAt)} • Type: {selected.inquiryType}
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
                  Country
                </strong>
                <span>{selected.country || '—'}</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>
                  Linked Target
                </strong>
                <span>{selected.targetTitle || selected.targetSlug || '—'}</span>
              </div>
            </div>

            {selected.subject && (
              <div style={{ marginBottom: '0.85rem' }}>
                <strong style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>
                  Subject
                </strong>
                <div style={{ fontWeight: 600 }}>{selected.subject}</div>
              </div>
            )}

            <div
              style={{
                background: 'var(--bg-subtle)',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                whiteSpace: 'pre-wrap',
                fontSize: '0.88rem',
                lineHeight: 1.6,
              }}
            >
              {selected.message}
            </div>

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
                  onChange={(e) => handleStatusChange(selected, e.target.value as InquiryStatus)}
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="responded">Responded</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(
                    `Re: ${selected.subject || 'Your Vibes of Egypt Inquiry'}`
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
            <h3 style={{ margin: '0 0 0.5rem' }}>Delete Inquiry?</h3>
            <p style={{ margin: '0 0 1.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Permanently remove the inquiry from <strong>{confirmDelete.fullName}</strong>?
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
