import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { adminClient, AdminApiError } from '@/api/adminClient';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
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
        await supabase.auth.signOut();
        setAdminUser(null);
        setAuthError(
          err.status === 403
            ? 'Access denied. This account does not have administrator privileges.'
            : 'Your session expired or is invalid. Please sign in again.'
        );
        return null;
      }
      setAdminUser(null);
      setAuthError(err instanceof Error ? err.message : 'Unable to verify admin privileges.');
      return null;
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function restore() {
      if (!isSupabaseConfigured) {
        if (active) {
          setIsLoading(false);
        }
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!active) return;

      if (data.session) {
        await verifyAdminSession();
      }
      if (active) {
        setIsLoading(false);
      }
    }

    void restore();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setAdminUser(null);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [verifyAdminSession]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setAuthError(null);

      if (!isSupabaseConfigured) {
        const msg =
          'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.';
        setAuthError(msg);
        throw new Error(msg);
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setAuthError(error.message);
        throw new Error(error.message);
      }

      const verified = await verifyAdminSession();
      if (!verified) {
        throw new Error('Admin verification failed.');
      }
    },
    [verifyAdminSession]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
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
