import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { adminClient } from '@/api/adminClient';
import type { AdminStats } from '@/types/admin';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    adminClient
      .get<{ data: AdminStats }>('/stats')
      .then((res) => {
        if (active) setStats(res.data);
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Failed to load dashboard stats.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const quickActions = [
    { label: 'New Destination', to: '/destinations/new' },
    { label: 'New Tour', to: '/tours/new' },
    { label: 'New Package', to: '/packages/new' },
    { label: 'New Cruise', to: '/cruises/new' },
    { label: 'New Experience', to: '/experiences/new' },
    { label: 'New Special Offer', to: '/special-offers/new' },
    { label: 'New Journal Article', to: '/journal/new' },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">
            Live catalog inventory, active promotions, and incoming customer leads.
          </p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {isLoading ? (
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
            Loading dashboard KPIs...
          </div>
        </div>
      ) : stats ? (
        <>
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-label">Destinations</div>
              <div className="kpi-value">{stats.catalog.destinations.total}</div>
              <div className="kpi-meta">{stats.catalog.destinations.published} published</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Private Tours</div>
              <div className="kpi-value">{stats.catalog.tours.total}</div>
              <div className="kpi-meta">{stats.catalog.tours.published} published</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Packages</div>
              <div className="kpi-value">{stats.catalog.packages.total}</div>
              <div className="kpi-meta">{stats.catalog.packages.published} published</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Nile Cruises</div>
              <div className="kpi-value">{stats.catalog.cruises.total}</div>
              <div className="kpi-meta">{stats.catalog.cruises.published} published</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Experiences</div>
              <div className="kpi-value">{stats.catalog.experiences.total}</div>
              <div className="kpi-meta">{stats.catalog.experiences.published} published</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Journal Articles</div>
              <div className="kpi-value">{stats.catalog.journalArticles.total}</div>
              <div className="kpi-meta">{stats.catalog.journalArticles.published} published</div>
            </div>
          </div>

          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-label">Active Special Offers</div>
              <div className="kpi-value">{stats.activeSpecialOffers}</div>
              <div className="kpi-meta">Currently active promotions</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">New Inquiries</div>
              <div className="kpi-value">{stats.newInquiries}</div>
              <div className="kpi-meta">Awaiting concierge response</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">New Trip Plans</div>
              <div className="kpi-value">{stats.newTripPlans}</div>
              <div className="kpi-meta">Bespoke itineraries to design</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-label">Pending Reviews</div>
              <div className="kpi-value">{stats.pendingReviews}</div>
              <div className="kpi-meta">Awaiting moderation approval</div>
            </div>
          </div>
        </>
      ) : null}

      <div className="card">
        <div className="card-body">
          <h2 className="form-section-title">Quick Actions</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
            {quickActions.map((action) => (
              <Link key={action.to} to={action.to} className="btn btn-primary btn-sm">
                <Plus size={14} />
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
