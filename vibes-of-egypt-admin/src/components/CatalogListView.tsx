import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import type { AdminStatus } from '@/types/admin';

export interface CatalogListItem {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  image?: string;
  meta?: string;
  status: AdminStatus;
}

interface CatalogListViewProps {
  heading: string;
  subtitle: string;
  createPath: string;
  createLabel: string;
  editBasePath: string;
  items: CatalogListItem[];
  isLoading: boolean;
  onToggleStatus: (item: CatalogListItem) => Promise<void>;
  onDelete: (item: CatalogListItem) => Promise<void>;
}

const STATUS_TABS: ('all' | AdminStatus)[] = ['all', 'published', 'draft', 'archived'];

export const CatalogListView: React.FC<CatalogListViewProps> = ({
  heading,
  subtitle,
  createPath,
  createLabel,
  editBasePath,
  items,
  isLoading,
  onToggleStatus,
  onDelete,
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | AdminStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<CatalogListItem | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return items.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        (item.subtitle ?? '').toLowerCase().includes(q)
      );
    });
  }, [items, statusFilter, searchTerm]);

  const handleToggle = async (item: CatalogListItem) => {
    setBusyId(item.id);
    try {
      await onToggleStatus(item);
    } finally {
      setBusyId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDelete) return;
    setBusyId(confirmDelete.id);
    setDeleteError(null);
    try {
      await onDelete(confirmDelete);
      setConfirmDelete(null);
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete item.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{heading}</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
        <Link to={createPath} className="btn btn-primary">
          <Plus size={16} />
          {createLabel}
        </Link>
      </div>

      <div className="card">
        <div className="toolbar">
          <div className="tabs">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`tab-btn${statusFilter === tab ? ' active' : ''}`}
                onClick={() => setStatusFilter(tab)}
              >
                {tab === 'all' ? `All (${items.length})` : tab}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: 240 }}>
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
              placeholder="Filter by title or slug..."
            />
          </div>
        </div>

        <div className="table-wrap">
          {isLoading ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Loading records...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No records match the current filter.
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Slug</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {item.image && (
                          <img src={item.image} alt={item.title} className="table-thumb" />
                        )}
                        <div>
                          <div style={{ fontWeight: 600 }}>{item.title}</div>
                          {item.subtitle && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                              {item.subtitle}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        {item.slug}
                      </code>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                      {item.meta || '—'}
                    </td>
                    <td>
                      <span className={`badge badge-${item.status}`}>{item.status}</span>
                    </td>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: '0.4rem',
                        }}
                      >
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          disabled={busyId === item.id}
                          onClick={() => handleToggle(item)}
                        >
                          {item.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>
                        <Link
                          to={`${editBasePath}/${item.id}/edit`}
                          className="btn btn-secondary btn-sm"
                        >
                          <Pencil size={13} />
                          Edit
                        </Link>
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          style={{ color: 'var(--danger)' }}
                          disabled={busyId === item.id}
                          onClick={() => {
                            setDeleteError(null);
                            setConfirmDelete(item);
                          }}
                          aria-label={`Delete ${item.title}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {confirmDelete && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>Confirm Deletion</h3>
            <p style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Are you sure you want to permanently delete <strong>{confirmDelete.title}</strong>?
              This action cannot be undone.
            </p>
            {deleteError && <div className="alert alert-danger">{deleteError}</div>}
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
                onClick={handleConfirmDelete}
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
