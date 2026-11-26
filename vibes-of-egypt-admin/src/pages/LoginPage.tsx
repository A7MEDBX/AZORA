import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const LoginPage: React.FC = () => {
  const { adminUser, signIn, authError, clearAuthError } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (adminUser) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    clearAuthError();
    try {
      await signIn(email, password);
      navigate('/', { replace: true });
    } catch {
      // authError is set in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 65%, #332717 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div className="card" style={{ maxWidth: 420, width: '100%' }}>
        <div className="card-body" style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: 'var(--bg-sidebar)',
                color: 'var(--gold)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.85rem',
              }}
            >
              <Lock size={22} />
            </div>
            <h1 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 700 }}>
              Vibes of Egypt Admin
            </h1>
            <p style={{ margin: '0.35rem 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Sign in with your administrator credentials
            </p>
          </div>

          {authError && <div className="alert alert-danger">{authError}</div>}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="field">
              <label className="field-label">
                Email Address <span className="field-required">*</span>
              </label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vibesofegypt.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="field">
              <label className="field-label">
                Password <span className="field-required">*</span>
              </label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
              style={{ width: '100%', padding: '0.7rem', marginTop: '0.35rem' }}
            >
              {submitting ? 'Verifying Credentials...' : 'Sign In to Admin Portal'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
