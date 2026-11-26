import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  adminClient,
  AdminApiError,
  clearStoredAdminToken,
  getStoredAdminToken,
  setStoredAdminToken,
} from '@/api/adminClient';
import type { AdminUser } from '@/types/admin';

interface AuthContextValue {
  adminUser: AdminUser | null;
  isLoading: boolean;
  authError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const verifyAdminSession = useCallback(async (): Promise<AdminUser | null> => {
    try {
      const res = await adminClient.get<{ data: AdminUser }>('/me');
      setAdminUser(res.data);
      setAuthError(null);
      return res.data;
    } catch (err: unknown) {
      if (err instanceof AdminApiError && (err.status === 401 || err.status === 403)) {
        clearStoredAdminToken();
        setAdminUser(null);
        setAuthError(
          err.status === 403
            ? 'Access denied. This account does not have administrator privileges.'
            : 'Your session expired or is invalid. Please sign in again.'
        );
        return null;
      }
      setAdminUser(null);
      setAuthError(err instanceof Error ? err.message : 'Unable to verify admin session.');
      return null;
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function restore() {
      const existingToken = getStoredAdminToken();
      if (existingToken) {
        await verifyAdminSession();
      }
      if (active) {
        setIsLoading(false);
      }
    }

    void restore();

    return () => {
      active = false;
    };
  }, [verifyAdminSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    setAuthError(null);

    try {
      const res = await adminClient.login(email.trim(), password);
      setStoredAdminToken(res.data.token);
      setAdminUser(res.data.user);
    } catch (err: unknown) {
      clearStoredAdminToken();
      setAdminUser(null);
      const msg = err instanceof Error ? err.message : 'Invalid administrator credentials.';
      setAuthError(msg);
      throw err;
    }
  }, []);

  const signOut = useCallback(async () => {
    clearStoredAdminToken();
    setAdminUser(null);
    setAuthError(null);
  }, []);

  const clearAuthError = useCallback(() => setAuthError(null), []);

  return (
    <AuthContext.Provider
      value={{ adminUser, isLoading, authError, signIn, signOut, clearAuthError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
