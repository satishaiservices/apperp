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

export function setAuthCookie(token: string) {
  if (typeof document !== 'undefined') {
    document.cookie = `vyhir_token=${encodeURIComponent(token)}; path=/; max-age=604800; SameSite=Lax`;
  }
}

export function clearAuthCookie() {
  if (typeof document !== 'undefined') {
    document.cookie = 'vyhir_token=; path=/; max-age=0; SameSite=Lax';
  }
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('vyhir_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
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
  });

  if (!response.ok) {
    // If unauthorized, attempt silent refresh before clearing credentials
    if (
      response.status === 401 &&
      typeof window !== 'undefined' &&
      !endpoint.includes('/auth/login') &&
      !endpoint.includes('/auth/refresh')
    ) {
      const refreshToken = localStorage.getItem('vyhir_refresh_token');
      if (refreshToken) {
        try {
          const refreshRes = await fetch(`${apiBase}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshRes.ok) {
            const data = await refreshRes.json();
            if (data.accessToken) {
              localStorage.setItem('vyhir_token', data.accessToken);
              setAuthCookie(data.accessToken);
              if (data.refreshToken) {
                localStorage.setItem('vyhir_refresh_token', data.refreshToken);
              }

              // Replay original request with renewed access token
              headers['Authorization'] = `Bearer ${data.accessToken}`;
              const retryResponse = await fetch(url, {
                ...options,
                headers,
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
      }

      // If refresh failed or unavailable, clear stale session
      localStorage.removeItem('vyhir_token');
      localStorage.removeItem('vyhir_refresh_token');
      localStorage.removeItem('vyhir_user');
      localStorage.removeItem('vyhir_tenant');
      clearAuthCookie();
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
