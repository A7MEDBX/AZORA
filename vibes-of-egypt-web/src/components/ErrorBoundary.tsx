import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
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
        <div className={styles.boundaryWrap}>
          <span className={styles.overline}>Vibes of Egypt Concierge</span>
          <h2 className={styles.title}>Something interrupted this view</h2>
          <p className={styles.description}>
            Our guest experience team is refreshing the sanctuary records.
          </p>
          <div className={styles.btnGroup}>
            <Button
              variant="primary"
              onClick={() => this.setState({ hasError: false })}
            >
              Try Again
            </Button>
            <Button variant="secondary" to="/">
              Return Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
