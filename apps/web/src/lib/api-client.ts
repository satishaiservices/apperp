export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';
    if (!isLocalHost) {
      return `${window.location.origin}/api/v1`;
    }
  }
  return 'http://localhost:3001';
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public data?: any) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * `vyhir_token` is only a "signed in" marker read by middleware.ts for routing.
 * It never contains a credential. The access token lives in memory/localStorage
 * (15 min lifetime); the refresh token is an httpOnly cookie set by the API.
 */
export function setAuthCookie(_token?: string) {
  if (typeof document !== 'undefined') {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `vyhir_token=1; path=/; max-age=604800; SameSite=Lax${secure}`;
  }
}

export function clearAuthCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = 'vyhir_token=; path=/; max-age=0; SameSite=Lax';
  }
}

/** Ask the API to put the refresh token in an httpOnly cookie instead of the body. */
export const SESSION_MODE_HEADER = { 'X-Session-Mode': 'cookie' } as const;

export function clearStoredSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('vyhir_token');
  localStorage.removeItem('vyhir_refresh_token'); // legacy key from older releases
  localStorage.removeItem('vyhir_user');
  localStorage.removeItem('vyhir_tenant');
  clearAuthCookie();
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('vyhir_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...SESSION_MODE_HEADER,
    ...(options.headers as Record<string, string>),
  };

  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const apiBase = getApiBaseUrl();
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (apiBase.endsWith('/api/v1') && cleanEndpoint.startsWith('/api/v1/')) {
    cleanEndpoint = cleanEndpoint.substring('/api/v1'.length);
  }
  const url = endpoint.startsWith('http') ? endpoint : `${apiBase}${cleanEndpoint}`;

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    // If unauthorized, attempt silent refresh before clearing credentials
    if (
      response.status === 401 &&
      typeof window !== 'undefined' &&
      !endpoint.includes('/auth/login') &&
      !endpoint.includes('/auth/refresh')
    ) {
      try {
        // The refresh token travels only as an httpOnly cookie.
        const refreshRes = await fetch(`${apiBase}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...SESSION_MODE_HEADER },
          credentials: 'include',
          body: '{}',
        });

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          if (data.accessToken) {
            localStorage.setItem('vyhir_token', data.accessToken);
            setAuthCookie();

            // Replay original request with renewed access token
            headers['Authorization'] = `Bearer ${data.accessToken}`;
            const retryResponse = await fetch(url, {
              ...options,
              headers,
              credentials: 'include',
            });

            if (retryResponse.ok) {
              if (retryResponse.status === 204) return {} as T;
              return retryResponse.json();
            }
          }
        }
      } catch {
        // Token refresh attempt failed
      }

      // If refresh failed or unavailable, clear stale session
      clearStoredSession();
    }

    let errorDetail = 'An unexpected error occurred';
    let responseData = null;
    try {
      responseData = await response.json();
      errorDetail = responseData.message || responseData.error || errorDetail;
      if (Array.isArray(errorDetail)) {
        errorDetail = errorDetail.join(', ');
      }
    } catch {
      errorDetail = response.statusText || errorDetail;
    }

    throw new ApiError(response.status, errorDetail, responseData);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}
