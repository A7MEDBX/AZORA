import { supabase } from '@/lib/supabase';

export interface AdminApiErrorPayload {
  error?: {
    code?: string;
    message?: string;
    details?: {
      formErrors?: string[];
      fieldErrors?: Record<string, string[] | undefined>;
    };
  };
}

export class AdminApiError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly fieldErrors: Record<string, string>;

  constructor(
    message: string,
    status: number,
    code = 'API_ERROR',
    fieldErrors: Record<string, string> = {}
  ) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
).replace(/\/+$/, '');

async function getAccessToken(): Promise<string> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (!token) {
    throw new AdminApiError('No active session. Please sign in again.', 401, 'UNAUTHORIZED');
  }
  return token;
}

function buildAdminUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}/admin${normalized}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '') {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

function extractFieldErrors(payload?: AdminApiErrorPayload): Record<string, string> {
  const raw = payload?.error?.details?.fieldErrors;
  if (!raw || typeof raw !== 'object') return {};

  const out: Record<string, string> = {};
  for (const [field, messages] of Object.entries(raw)) {
    if (Array.isArray(messages) && messages.length > 0 && typeof messages[0] === 'string') {
      out[field] = messages[0];
    }
  }
  return out;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    payload = undefined;
  }

  if (!response.ok) {
    const errPayload = payload as AdminApiErrorPayload | undefined;
    const fieldErrors = extractFieldErrors(errPayload);
    const formErrors = errPayload?.error?.details?.formErrors;
    const firstFormError =
      Array.isArray(formErrors) && formErrors.length > 0 ? formErrors[0] : undefined;

    const message =
      firstFormError ||
      errPayload?.error?.message ||
      `Request failed (${response.status})`;

    throw new AdminApiError(
      message,
      response.status,
      errPayload?.error?.code || `HTTP_${response.status}`,
      fieldErrors
    );
  }

  return payload as T;
}

async function request<T>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  path: string,
  options?: {
    params?: Record<string, string | number | boolean | undefined>;
    body?: unknown;
    formData?: FormData;
  }
): Promise<T> {
  const token = await getAccessToken();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  let bodyInit: BodyInit | undefined;
  if (options?.formData) {
    bodyInit = options.formData;
  } else if (options?.body !== undefined) {
    headers['Content-Type'] = 'application/json';
    bodyInit = JSON.stringify(options.body);
  }

  let response: Response;
  try {
    response = await fetch(buildAdminUrl(path, options?.params), {
      method,
      headers,
      body: bodyInit,
    });
  } catch {
    throw new AdminApiError(
      'Unable to connect to the backend API. Ensure vibes-of-egypt-api is running.',
      0,
      'NETWORK_ERROR'
    );
  }

  return handleResponse<T>(response);
}

export const adminClient = {
  get: <T>(path: string, params?: Record<string, string | number | boolean | undefined>) =>
    request<T>('GET', path, { params }),
  post: <T>(path: string, body: unknown) => request<T>('POST', path, { body }),
  patch: <T>(path: string, body: unknown) => request<T>('PATCH', path, { body }),
  delete: <T = void>(path: string, body?: unknown) => request<T>('DELETE', path, { body }),
  upload: <T>(path: string, formData: FormData, params?: Record<string, string>) =>
    request<T>('POST', path, { formData, params }),
};
