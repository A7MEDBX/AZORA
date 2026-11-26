import { expect, test } from '@playwright/test';
import { E2E_CONFIG } from './helpers/e2eContext';

test.describe('01 — API Health, Security Boundaries & Public Catalog Contracts', () => {
  test('GET /api/health returns 200 OK with status and timestamp', async ({ request }) => {
    const res = await request.get(`${E2E_CONFIG.apiBaseUrl}/health`);
    expect(res.status()).toBe(200);
    const body = (await res.json()) as { status: string; timestamp: string };
    expect(body.status).toBe('ok');
    expect(typeof body.timestamp).toBe('string');
  });

  test('Unauthenticated requests to /api/admin/* return 401 Unauthorized', async ({ request }) => {
    const protectedEndpoints = [
      '/admin/me',
      '/admin/stats',
      '/admin/inquiries',
      '/admin/destinations',
    ];

    for (const endpoint of protectedEndpoints) {
      const res = await request.get(`${E2E_CONFIG.apiBaseUrl}${endpoint}`);
      expect(res.status(), `Expected 401 on ${endpoint}`).toBe(401);
    }
  });

  test('Public GET routes for /api/inquiries and /api/trip-plans do not exist (404)', async ({
    request,
  }) => {
    const inquiriesGet = await request.get(`${E2E_CONFIG.apiBaseUrl}/inquiries`);
    expect(inquiriesGet.status()).toBe(404);

    const tripPlansGet = await request.get(`${E2E_CONFIG.apiBaseUrl}/trip-plans`);
    expect(tripPlansGet.status()).toBe(404);
  });

  test('All public catalog endpoints return 200 OK with published PostgreSQL data and never leak drafts', async ({
    request,
  }) => {
    const listEndpoints = [
      '/destinations',
      '/tours',
      '/packages',
      '/cruises',
      '/experiences',
      '/journal',
      '/special-offers',
      '/reviews',
    ];

    for (const endpoint of listEndpoints) {
      const res = await request.get(`${E2E_CONFIG.apiBaseUrl}${endpoint}`);
      expect(res.status(), `Expected 200 OK on ${endpoint}`).toBe(200);

      const body = (await res.json()) as { data: Record<string, unknown>[]; total: number };
      expect(Array.isArray(body.data)).toBe(true);
      expect(typeof body.total).toBe('number');

      for (const item of body.data) {
        if ('status' in item) {
          expect(item.status).not.toBe('draft');
          expect(item.status).not.toBe('archived');
        }
        if ('isPublished' in item) {
          expect(item.isPublished).toBe(true);
        }
      }
    }

    const searchRes = await request.get(`${E2E_CONFIG.apiBaseUrl}/search?q=Cairo`);
    expect(searchRes.status()).toBe(200);
    const searchBody = (await searchRes.json()) as {
      query: string;
      total: number;
      results: Record<string, unknown[]>;
    };
    expect(searchBody.query).toBe('Cairo');
    expect(typeof searchBody.total).toBe('number');
    expect(Array.isArray(searchBody.results.destinations)).toBe(true);
  });
});
