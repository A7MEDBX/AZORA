import { expect, type APIRequestContext, type Page } from '@playwright/test';

export const E2E_CONFIG = {
  apiBaseUrl: (process.env.API_BASE_URL || 'http://localhost:4000/api').replace(/\/+$/, ''),
  webBaseUrl: (process.env.WEB_BASE_URL || 'http://localhost:3000').replace(/\/+$/, ''),
  adminBaseUrl: (process.env.ADMIN_BASE_URL || 'http://localhost:5174').replace(/\/+$/, ''),
  adminEmail: (process.env.ADMIN_EMAIL || 'admin@vibesofegypt.com').trim(),
  adminPassword: (process.env.ADMIN_PASSWORD || '').trim(),
};

/**
 * Valid 1x1 Egyptian-gold pixel PNG image buffer for real Supabase Storage upload tests.
 */
export const TINY_PNG_BUFFER = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64'
);

export type TrackedEntityEndpoint =
  | 'special-offers'
  | 'reviews'
  | 'tours'
  | 'experiences'
  | 'packages'
  | 'cruises'
  | 'journal'
  | 'destinations'
  | 'inquiries'
  | 'trip-plans';

const CLEANUP_DEPENDENCY_ORDER: TrackedEntityEndpoint[] = [
  'special-offers',
  'reviews',
  'tours',
  'experiences',
  'packages',
  'cruises',
  'journal',
  'destinations',
  'inquiries',
  'trip-plans',
];

export class E2ERunTracker {
  public readonly runId: string;
  public readonly slugPrefix: string;
  private adminToken: string | null = null;
  private readonly entities = new Map<TrackedEntityEndpoint, Set<string>>();
  private readonly uploadedPaths = new Set<string>();

  constructor(suiteTag: string) {
    const stamp = `${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    this.runId = `E2E-${suiteTag}-${stamp}`;
    this.slugPrefix = `e2e-${suiteTag.toLowerCase()}-${stamp}`;

    for (const key of CLEANUP_DEPENDENCY_ORDER) {
      this.entities.set(key, new Set<string>());
    }
  }

  public setAdminToken(token: string): void {
    if (token) {
      this.adminToken = token;
    }
  }

  public getAdminToken(): string | null {
    return this.adminToken;
  }

  public trackEntity(endpoint: TrackedEntityEndpoint, id: string): void {
    if (id) {
      this.entities.get(endpoint)?.add(id);
    }
  }

  public untrackEntity(endpoint: TrackedEntityEndpoint, id: string): void {
    this.entities.get(endpoint)?.delete(id);
  }

  public trackUploadedPath(storagePath: string): void {
    if (storagePath) {
      this.uploadedPaths.add(storagePath);
    }
  }

  public untrackUploadedPath(storagePath: string): void {
    this.uploadedPaths.delete(storagePath);
  }

  /**
   * Logs into vibes-of-egypt-admin via the browser UI, verifies redirect to `/`,
   * and extracts the active Supabase JWT from localStorage for guaranteed API cleanup.
   */
  public async loginViaAdminUi(page: Page): Promise<string> {
    if (!E2E_CONFIG.adminPassword) {
      throw new Error(
        'ADMIN_PASSWORD is empty. Set ADMIN_EMAIL and ADMIN_PASSWORD in e2e/.env before running E2E tests.'
      );
    }

    await page.goto(`${E2E_CONFIG.adminBaseUrl}/login`);
    await page.locator('input[type="email"]').fill(E2E_CONFIG.adminEmail);
    await page.locator('input[type="password"]').fill(E2E_CONFIG.adminPassword);
    await page.getByRole('button', { name: /Sign In to Admin Portal/i }).click();

    await expect(page).toHaveURL(new RegExp(`^${E2E_CONFIG.adminBaseUrl}/?$`));
    await expect(page.getByRole('heading', { name: 'Dashboard Overview' })).toBeVisible();

    const token = await extractSupabaseTokenFromPage(page);
    if (token) {
      this.adminToken = token;
    }
    return token ?? '';
  }

  /**
   * Sweeps all tracked entities (and scans by slugPrefix/runId as fallback) in strict FK order,
   * plus deletes any tracked Supabase Storage uploads. Never throws so afterAll always finishes.
   */
  public async cleanupAll(request: APIRequestContext): Promise<void> {
    if (!this.adminToken) {
      return;
    }

    const headers = {
      Authorization: `Bearer ${this.adminToken}`,
      Accept: 'application/json',
    };

    // Discover any items matching our runId/slugPrefix that may have been created via UI
    await this.discoverCreatedEntities(request, headers);

    for (const endpoint of CLEANUP_DEPENDENCY_ORDER) {
      const ids = Array.from(this.entities.get(endpoint) ?? []);
      for (const id of ids) {
        try {
          await request.delete(`${E2E_CONFIG.apiBaseUrl}/admin/${endpoint}/${id}`, { headers });
        } catch {
          // Ignore individual cleanup errors so remaining resources are still cleaned
        }
      }
      this.entities.get(endpoint)?.clear();
    }

    for (const storagePath of Array.from(this.uploadedPaths)) {
      try {
        await request.delete(`${E2E_CONFIG.apiBaseUrl}/admin/uploads/image`, {
          headers: { ...headers, 'Content-Type': 'application/json' },
          data: { path: storagePath },
        });
      } catch {
        // Ignore storage cleanup errors
      }
    }
    this.uploadedPaths.clear();
  }

  private async discoverCreatedEntities(
    request: APIRequestContext,
    headers: Record<string, string>
  ): Promise<void> {
    const catalogEndpoints: TrackedEntityEndpoint[] = [
      'special-offers',
      'tours',
      'experiences',
      'packages',
      'cruises',
      'journal',
      'destinations',
    ];

    for (const ep of catalogEndpoints) {
      try {
        const res = await request.get(`${E2E_CONFIG.apiBaseUrl}/admin/${ep}`, { headers });
        if (!res.ok()) continue;
        const body = (await res.json()) as {
          data?: { id: string; slug?: string; offerSlug?: string; title?: string; name?: string }[];
        };
        for (const item of body.data ?? []) {
          const text = `${item.slug ?? ''} ${item.offerSlug ?? ''} ${item.title ?? ''} ${item.name ?? ''}`;
          if (text.includes(this.runId) || text.includes(this.slugPrefix)) {
            this.trackEntity(ep, item.id);
          }
        }
      } catch {
        // Ignore discovery failure
      }
    }

    // Also discover inquiries, trip-plans, and reviews tagged with runId
    for (const ep of ['inquiries', 'trip-plans', 'reviews'] as const) {
      try {
        const res = await request.get(`${E2E_CONFIG.apiBaseUrl}/admin/${ep}`, { headers });
        if (!res.ok()) continue;
        const body = (await res.json()) as { data?: Record<string, unknown>[] };
        for (const row of body.data ?? []) {
          const serialized = JSON.stringify(row);
          if (serialized.includes(this.runId) && typeof row.id === 'string') {
            this.trackEntity(ep, row.id);
          }
        }
      } catch {
        // Ignore discovery failure
      }
    }
  }
}

export async function extractSupabaseTokenFromPage(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    const backendJwt = window.localStorage.getItem('voe_admin_jwt');
    if (backendJwt) return backendJwt;

    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith('sb-') && key.endsWith('-auth-token')) {
        try {
          const raw = window.localStorage.getItem(key);
          if (!raw) continue;
          const parsed = JSON.parse(raw) as { access_token?: string };
          if (parsed.access_token) return parsed.access_token;
        } catch {
          // Ignore malformed entry
        }
      }
    }
    return null;
  });
}
