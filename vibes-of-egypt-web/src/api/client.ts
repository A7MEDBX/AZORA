export interface ApiErrorPayload {
  error?: {
    code?: string;
    message?: string;
    details?: {
      formErrors?: string[];
      fieldErrors?: Record<string, string[] | undefined>;
    };
  };
}

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly fieldErrors: Record<string, string>;
  public readonly isRateLimited: boolean;

  constructor(
    message: string,
    status: number,
    code = 'API_ERROR',
    fieldErrors: Record<string, string> = {}
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
    this.isRateLimited = status === 429 || code === 'TOO_MANY_REQUESTS';
  }
}

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
).replace(/\/+$/, '');

export const USE_MOCK_DATA =
  String(import.meta.env.VITE_USE_MOCK_DATA || 'false').toLowerCase() === 'true';

function buildUrl(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== '' && value !== 'all') {
        url.searchParams.set(key, String(value));
      }
    }
  }

  return url.toString();
}

function extractFieldErrors(payload?: ApiErrorPayload): Record<string, string> {
  const rawFields = payload?.error?.details?.fieldErrors;
  if (!rawFields || typeof rawFields !== 'object') {
    return {};
  }

  const mapped: Record<string, string> = {};
  for (const [field, messages] of Object.entries(rawFields)) {
    if (Array.isArray(messages) && messages.length > 0 && typeof messages[0] === 'string') {
      mapped[field] = messages[0];
    }
  }
  return mapped;
}

async function parseErrorResponse(response: Response): Promise<ApiClientError> {
  let payload: ApiErrorPayload | undefined;
  try {
    payload = (await response.json()) as ApiErrorPayload;
  } catch {
    payload = undefined;
  }

  const code = payload?.error?.code || `HTTP_${response.status}`;
  const fieldErrors = extractFieldErrors(payload);

  if (response.status === 429) {
    return new ApiClientError(
      payload?.error?.message ||
        'Too many requests. Please wait a few minutes before trying again.',
      429,
      'TOO_MANY_REQUESTS',
      fieldErrors
    );
  }

  const formErrors = payload?.error?.details?.formErrors;
  const firstFormError =
    Array.isArray(formErrors) && formErrors.length > 0 ? formErrors[0] : undefined;

  const message =
    firstFormError ||
    payload?.error?.message ||
    `Request failed with status ${response.status}`;

  return new ApiClientError(message, response.status, code, fieldErrors);
}

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> {
  let response: Response;
  try {
    response = await fetch(buildUrl(path, params), {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
  } catch {
    throw new ApiClientError(
      'Unable to reach the server. Please check your internet connection and try again.',
      0,
      'NETWORK_ERROR'
    );
  }

  if (!response.ok) {
    throw await parseErrorResponse(response);
  }

  return (await response.json()) as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(buildUrl(path), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiClientError(
      'Unable to connect to the concierge server. Please check your network and try again.',
      0,
      'NETWORK_ERROR'
    );
  }

  if (!response.ok) {
    throw await parseErrorResponse(response);
  }

  return (await response.json()) as T;
}
