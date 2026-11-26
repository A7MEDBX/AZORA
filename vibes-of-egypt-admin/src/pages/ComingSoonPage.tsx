import React from 'react';
import { Clock } from 'lucide-react';

interface ComingSoonPageProps {
  title: string;
  description: string;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ title, description }) => {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{description}</p>
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '14px',
              background: 'var(--gold-soft)',
              color: 'var(--gold)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            <Clock size={24} />
          </div>
          <h2 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem' }}>Coming in Phase 4</h2>
          <p
            style={{
              margin: '0 auto',
              maxWidth: 460,
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
            }}
          >
            The backend APIs for <strong>{title}</strong> are live and verified. This dedicated
            operations management screen will be added in Admin Phase 4.
          </p>
        </div>
      </div>
    </div>
  );
};
