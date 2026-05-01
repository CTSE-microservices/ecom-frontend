 const SERVICES = {
  user:    process.env.NEXT_PUBLIC_USER_SERVICE_URL    ?? '',
  product: process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL ?? '',
  order:   process.env.NEXT_PUBLIC_ORDER_SERVICE_URL   ?? '',
  payment: process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL ?? '',
} as const;

type Service = keyof typeof SERVICES;

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

async function request<T>(
  service: Service,
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = SERVICES[service];
  if (!base) throw new Error(`Service URL for "${service}" is not configured`);

  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const res = await fetch(`${base}${path}`, { ...options, headers });

  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const body = await res.json();
      message = body.message ?? body.error ?? message;
    } catch { /* ignore */ }
    throw new Error(message);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  get:    <T>(service: Service, path: string) =>
    request<T>(service, path, { method: 'GET' }),

  post:   <T>(service: Service, path: string, body: unknown) =>
    request<T>(service, path, { method: 'POST', body: JSON.stringify(body) }),

  patch:  <T>(service: Service, path: string, body: unknown) =>
    request<T>(service, path, { method: 'PATCH', body: JSON.stringify(body) }),

  delete: <T>(service: Service, path: string) =>
    request<T>(service, path, { method: 'DELETE' }),

  /** Like get, but also returns the HTTP status code. Used for polling endpoints that use 202/200 to signal readiness. */
  getWithStatus: async <T>(service: Service, path: string): Promise<{ status: number; data: T }> => {
    const base = SERVICES[service];
    if (!base) throw new Error(`Service URL for "${service}" is not configured`);
    const token = getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    const res = await fetch(`${base}${path}`, { method: 'GET', headers });
    if (!res.ok) {
      let message = `Request failed: ${res.status}`;
      try { const b = await res.json(); message = b.message ?? b.error ?? message; } catch { /* ignore */ }
      throw new Error(message);
    }
    const data: T = res.status === 204 ? undefined as T : await res.json();
    return { status: res.status, data };
  },
};