'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiRequest, setAuthCookie, clearAuthCookie } from '@/lib/api-client';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string | null;
  username: string | null;
  phone: string | null;
  isPlatformAdmin: boolean;
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tenant, setTenant] = useState<TenantInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Restore session on mount
    try {
      const storedToken = localStorage.getItem('vyhir_token');
      const storedUser = localStorage.getItem('vyhir_user');
      const storedTenant = localStorage.getItem('vyhir_tenant');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setAuthCookie(storedToken);
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

    const authToken = data.accessToken;
    const authUser: UserProfile = {
      id: data.user.id,
      fullName: data.user.fullName,
      email: data.user.email,
      username: data.user.username,
      phone: data.user.phone,
      isPlatformAdmin: !!data.user.isPlatformAdmin,
    };

    const authTenant: TenantInfo | null = data.tenant ? {
      id: data.tenant.id,
      name: data.tenant.name,
      slug: data.tenant.slug,
    } : null;

    localStorage.setItem('vyhir_token', authToken);
    if (data.refreshToken) {
      localStorage.setItem('vyhir_refresh_token', data.refreshToken);
    }
    setAuthCookie(authToken);
    localStorage.setItem('vyhir_user', JSON.stringify(authUser));
    if (authTenant) {
      localStorage.setItem('vyhir_tenant', JSON.stringify(authTenant));
    }

    setToken(authToken);
    setUser(authUser);
    setTenant(authTenant);

    if (authUser.isPlatformAdmin && requestedMode === 'platform') {
      router.push('/platform');
    } else {
      router.push('/org/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('vyhir_token');
    localStorage.removeItem('vyhir_refresh_token');
    localStorage.removeItem('vyhir_user');
    localStorage.removeItem('vyhir_tenant');
    clearAuthCookie();
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
