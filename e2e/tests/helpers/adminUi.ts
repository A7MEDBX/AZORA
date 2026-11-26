import { expect, type Locator, type Page } from '@playwright/test';
import { E2ERunTracker, TINY_PNG_BUFFER } from './e2eContext';

/**
 * Locates an Admin `.field` container whose `.field-label` matches `labelText`.
 */
export function fieldByLabel(page: Page, labelText: string | RegExp): Locator {
  return page
    .locator('.field')
    .filter({ has: page.locator('.field-label', { hasText: labelText }) })
    .first();
}

/**
 * Uploads the tiny generated PNG buffer via an `ImageUploadField` and tracks the
 * resulting Supabase Storage object path for guaranteed `afterAll` cleanup.
 */
export async function uploadPngViaField(
  page: Page,
  fieldLabel: string,
  tracker: E2ERunTracker,
  fileName = 'e2e-upload.png'
): Promise<string> {
  const field = fieldByLabel(page, fieldLabel);
  const uploadResponsePromise = page.waitForResponse(
    (res) =>
      res.url().includes('/api/admin/uploads/image') && res.request().method() === 'POST'
  );

  await field.locator('input[type="file"]').setInputFiles({
    name: fileName,
    mimeType: 'image/png',
    buffer: TINY_PNG_BUFFER,
  });

  const uploadRes = await uploadResponsePromise;
  expect(uploadRes.status()).toBe(201);

  const json = (await uploadRes.json()) as { data: { url: string; path: string } };
  expect(json.data.url).toContain('res.cloudinary.com');
  tracker.trackUploadedPath(json.data.path);

  await expect(field.locator('img[alt="Preview"]')).toHaveAttribute('src', json.data.url);
  return json.data.url;
}

/**
 * Filters a `CatalogListView` table by `query` and returns the matching row locator.
 */
export async function findCatalogRow(page: Page, query: string): Promise<Locator> {
  const filterInput = page.getByPlaceholder('Filter by title or slug...');
  await filterInput.fill(query);
  const row = page.locator('table.data-table tbody tr').filter({ hasText: query }).first();
  await expect(row).toBeVisible();
  return row;
}

/**
 * Clicks the delete button on a catalog row and confirms deletion inside the modal.
 */
export async function deleteCatalogRowViaModal(page: Page, row: Locator): Promise<void> {
  await row.locator('button[aria-label^="Delete "]').click();
  const modal = page.locator('.modal-card');
  await expect(modal).toBeVisible();
  await modal.getByRole('button', { name: /^Delete$/ }).click();
  await expect(modal).toBeHidden();
}
