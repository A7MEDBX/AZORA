import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from '@/lib/next-shim';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '6rem 2rem',
          textAlign: 'center',
          background: 'var(--color-bg-primary)',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'var(--color-egyptian-gold)',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}>
            Vibes of Egypt Concierge
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '2rem',
            color: 'var(--color-midnight-black)',
            marginBottom: '1rem'
          }}>
            Something interrupted this view
          </h2>
          <p style={{
            color: 'var(--color-gray-600)',
            maxWidth: '28rem',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Our guest experience team is refreshing the sanctuary records.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => this.setState({ hasError: false })}
              style={{
                background: 'var(--color-egyptian-gold)',
                color: 'var(--color-midnight-black)',
                fontWeight: 700,
                padding: '0.75rem 1.75rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
            <Link
              href="/"
              style={{
                background: 'var(--color-midnight-black)',
                color: 'var(--color-desert-ivory)',
                fontWeight: 600,
                padding: '0.75rem 1.75rem',
                borderRadius: '9999px',
                textDecoration: 'none'
              }}
            >
              Return Home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
