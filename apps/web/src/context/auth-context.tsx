'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { apiRequest, setAuthCookie, clearStoredSession } from '@/lib/api-client';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string | null;
  username: string | null;
  phone: string | null;
  isPlatformAdmin: boolean;
  mustChangePassword?: boolean;
}

export interface TenantInfo {
  id: string;
  name: string;
  slug: string;
}

interface AuthContextType {
  user: UserProfile | null;
  tenant: TenantInfo | null;
  token: string | null;
  isPlatformAdmin: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string, requestedMode?: 'org' | 'platform') => Promise<void>;
  logout: () => void;
  /** Store a session returned by /auth/change-password (new tokens, flag cleared). */
  applySession: (data: any) => UserProfile;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Restore session on mount
    try {
      const storedToken = localStorage.getItem('vyhir_token');
      const storedUser = localStorage.getItem('vyhir_user');
      const storedTenant = localStorage.getItem('vyhir_tenant');

      // Refresh tokens are no longer kept in localStorage (httpOnly cookie instead).
      localStorage.removeItem('vyhir_refresh_token');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setAuthCookie();
        setUser(JSON.parse(storedUser));
        if (storedTenant) {
          setTenant(JSON.parse(storedTenant));
        }
      }
    } catch (e) {
      console.error('Failed to restore auth session', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (identifier: string, password: string, requestedMode: 'org' | 'platform' = 'org') => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });

    const authUser = applySession(data);

    if (authUser.mustChangePassword) {
      router.push('/change-password');
    } else if (authUser.isPlatformAdmin && requestedMode === 'platform') {
      router.push('/platform');
    } else {
      router.push('/org/dashboard');
    }
  };

  const applySession = (data: any): UserProfile => {
    const authToken = data.accessToken;
    const authUser: UserProfile = {
      id: data.user.id,
      fullName: data.user.fullName,
      email: data.user.email,
      username: data.user.username,
      phone: data.user.phone,
      isPlatformAdmin: !!data.user.isPlatformAdmin,
      mustChangePassword: !!data.user.mustChangePassword,
    };

    const authTenant: TenantInfo | null = data.tenant ? {
      id: data.tenant.id,
      name: data.tenant.name,
      slug: data.tenant.slug,
    } : null;

    localStorage.setItem('vyhir_token', authToken);
    setAuthCookie();
    localStorage.setItem('vyhir_user', JSON.stringify(authUser));
    if (authTenant) {
      localStorage.setItem('vyhir_tenant', JSON.stringify(authTenant));
    }

    setToken(authToken);
    setUser(authUser);
    setTenant(authTenant);
    return authUser;
  };

  // Accounts with an admin-set or default password must change it before anything else.
  useEffect(() => {
    if (!isLoading && user?.mustChangePassword && pathname !== '/change-password') {
      router.replace('/change-password');
    }
  }, [isLoading, user, pathname, router]);

  const logout = () => {
    // Clears the httpOnly refresh cookie server-side; ignore network errors.
    apiRequest('/auth/logout', { method: 'POST' }).catch(() => {});
    clearStoredSession();
    setToken(null);
    setUser(null);
    setTenant(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        tenant,
        token,
        isPlatformAdmin: !!user?.isPlatformAdmin,
        isLoading,
        login,
        logout,
        applySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
