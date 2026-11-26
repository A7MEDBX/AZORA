import { expect, test } from '@playwright/test';
import {
  deleteCatalogRowViaModal,
  fieldByLabel,
  findCatalogRow,
  uploadPngViaField,
} from './helpers/adminUi';
import { E2E_CONFIG, E2ERunTracker } from './helpers/e2eContext';

test.describe('02 — Admin Dashboard Full CRUD, Image Uploads & 409 FK Protection', () => {
  const tracker = new E2ERunTracker('ADMINCRUD');

  test.afterAll(async ({ request }) => {
    await tracker.cleanupAll(request);
  });

  test('Exercises Login, KPI Stats, Storage Image Upload, all 7 Catalog CRUDs, and 409 FK handling', async ({
    page,
  }) => {
    // 1. Login & Verify Dashboard KPIs
    await tracker.loginViaAdminUi(page);
    const kpiValues = page.locator('.kpi-card .kpi-value');
    await expect(kpiValues.first()).toBeVisible();
    const kpiCount = await kpiValues.count();
    expect(kpiCount).toBeGreaterThanOrEqual(8);

    const destTitle = `${tracker.runId} Sanctuary`;
    const destSlug = `${tracker.slugPrefix}-dest`;
    const tourTitle = `${tracker.runId} VIP Tour`;
    const tourSlug = `${tracker.slugPrefix}-tour`;
    const pkgTitle = `${tracker.runId} Grand Package`;
    const pkgSlug = `${tracker.slugPrefix}-pkg`;
    const cruiseTitle = `${tracker.runId} Royal Dahabiya`;
    const cruiseSlug = `${tracker.slugPrefix}-cruise`;
    const expTitle = `${tracker.runId} Desert Stargazing`;
    const expSlug = `${tracker.slugPrefix}-exp`;
    const offerTitle = `${tracker.runId} Early Bird Offer`;
    const offerSlug = `${tracker.slugPrefix}-offer`;
    const journalTitle = `${tracker.runId} Curatorial Essay`;
    const journalSlug = `${tracker.slugPrefix}-journal`;

    // 2. DESTINATIONS: Create + Upload PNG to Supabase Storage + Edit + Toggle Status
    await page.goto(`${E2E_CONFIG.adminBaseUrl}/destinations/new`);
    await fieldByLabel(page, /^Name/).locator('input').fill(destTitle);
    await fieldByLabel(page, 'URL Slug').locator('input').fill(destSlug);
    await fieldByLabel(page, /^Category/).locator('input').fill('E2E Heritage');
    await fieldByLabel(page, /^Tagline/).locator('input').fill('Timeless E2E Sanctuary on the Nile');
    const uploadedImageUrl = await uploadPngViaField(page, 'Card Image', tracker, 'dest-card.png');
    await fieldByLabel(page, 'Hero Banner Image').locator('input[type="text"]').fill(uploadedImageUrl);
    await fieldByLabel(page, /^Full Description/).locator('textarea').fill(
      'Comprehensive E2E archaeological sanctuary description verifying full CRUD persistence.'
    );
    await page.getByRole('button', { name: 'Create Destination' }).click();
    await expect(page).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/destinations`);

    let destRow = await findCatalogRow(page, destTitle);
    await expect(destRow.locator('.badge')).toHaveText(/draft/i);
    await destRow.getByRole('button', { name: 'Publish' }).click();
    await expect(destRow.locator('.badge')).toHaveText(/published/i);

    await destRow.getByRole('link', { name: 'Edit' }).click();
    await fieldByLabel(page, 'Best Time to Visit').locator('input').fill('October to March');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/destinations`);

    // 3. TOURS (linked to E2E Destination)
    await page.goto(`${E2E_CONFIG.adminBaseUrl}/tours/new`);
    await fieldByLabel(page, /^Title/).locator('input').fill(tourTitle);
    await fieldByLabel(page, 'URL Slug').locator('input').fill(tourSlug);
    await fieldByLabel(page, /^Destination/).locator('select').selectOption({ label: `${destTitle} (published)` });
    await fieldByLabel(page, 'Main Image').locator('input[type="text"]').fill(uploadedImageUrl);
    await fieldByLabel(page, /^Description/).locator('textarea').fill(
      'Private Egyptologist-led tour linked directly to our E2E destination.'
    );
    await page.getByRole('button', { name: 'Create Tour' }).click();
    await expect(page).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/tours`);

    let tourRow = await findCatalogRow(page, tourTitle);
    await tourRow.getByRole('button', { name: 'Publish' }).click();
    await expect(tourRow.locator('.badge')).toHaveText(/published/i);
    await tourRow.getByRole('link', { name: 'Edit' }).click();
    await fieldByLabel(page, 'Badge').locator('input').fill('E2E Exclusive');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // 4. PACKAGES (with linked destination + 2 itinerary days added & reordered)
    await page.goto(`${E2E_CONFIG.adminBaseUrl}/packages/new`);
    await fieldByLabel(page, /^Title/).locator('input').fill(pkgTitle);
    await fieldByLabel(page, 'URL Slug').locator('input').fill(pkgSlug);
    await fieldByLabel(page, /^Route Summary/).locator('input').fill('Cairo → Luxor → Aswan');
    await fieldByLabel(page, 'Main Cover Image').locator('input[type="text"]').fill(uploadedImageUrl);
    await fieldByLabel(page, /^Description/).locator('textarea').fill(
      'Bespoke multi-day E2E expedition featuring linked destinations and ordered itinerary days.'
    );

    // Link E2E Destination
    const destPickerCard = page.locator('.card').filter({ hasText: 'Linked Destinations (Ordered)' });
    await destPickerCard.locator('select').selectOption({ label: `${destTitle} (${destSlug})` });
    await destPickerCard.getByRole('button', { name: /Add Destination/i }).click();
    await expect(destPickerCard).toContainText(`1. ${destTitle}`);

    // Add 2 itinerary days and reorder them
    const itineraryCard = page.locator('.card').filter({ hasText: 'Day-by-Day Itinerary Builder' });
    await itineraryCard.getByRole('button', { name: /Add Day/i }).click();
    await itineraryCard.getByRole('button', { name: /Add Day/i }).click();

    const dayBlocks = itineraryCard.locator('div[style*="border: 1px solid"]');
    await expect(dayBlocks).toHaveCount(2);

    await dayBlocks.nth(0).locator('input').first().fill('Initial Day A');
    await dayBlocks.nth(0).locator('textarea').fill('Exploring ancient temples on Day A.');
    await dayBlocks.nth(1).locator('input').first().fill('Initial Day B');
    await dayBlocks.nth(1).locator('textarea').fill('Sailing on a private Dahabiya on Day B.');

    // Move Day 2 up to Day 1
    await dayBlocks.nth(1).locator('button').first().click();
    await expect(dayBlocks.nth(0).locator('input').first()).toHaveValue('Initial Day B');

    await page.getByRole('button', { name: 'Create Package' }).click();
    await expect(page).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/packages`);

    let pkgRow = await findCatalogRow(page, pkgTitle);
    await pkgRow.getByRole('button', { name: 'Publish' }).click();
    await expect(pkgRow.locator('.badge')).toHaveText(/published/i);
    await pkgRow.getByRole('link', { name: 'Edit' }).click();
    await fieldByLabel(page, 'Badge').locator('input').fill('E2E Signature');
    await page.getByRole('button', { name: 'Save Package' }).click();

    // 5. CRUISES
    await page.goto(`${E2E_CONFIG.adminBaseUrl}/cruises/new`);
    await fieldByLabel(page, /^Title/).locator('input').fill(cruiseTitle);
    await fieldByLabel(page, 'URL Slug').locator('input').fill(cruiseSlug);
    await fieldByLabel(page, 'Main Vessel Image').locator('input[type="text"]').fill(uploadedImageUrl);
    await fieldByLabel(page, /^Description/).locator('textarea').fill(
      'Handcrafted teakwood E2E Nile Dahabiya sailing peacefully between Luxor and Aswan.'
    );
    await page.getByRole('button', { name: 'Create Cruise' }).click();
    await expect(page).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/cruises`);

    let cruiseRow = await findCatalogRow(page, cruiseTitle);
    await cruiseRow.getByRole('button', { name: 'Publish' }).click();
    await expect(cruiseRow.locator('.badge')).toHaveText(/published/i);
    await cruiseRow.getByRole('link', { name: 'Edit' }).click();
    await fieldByLabel(page, 'Badge').locator('input').fill('Teak Charter');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // 6. EXPERIENCES (linked to E2E Destination)
    await page.goto(`${E2E_CONFIG.adminBaseUrl}/experiences/new`);
    await fieldByLabel(page, /^Title/).locator('input').fill(expTitle);
    await fieldByLabel(page, 'URL Slug').locator('input').fill(expSlug);
    await fieldByLabel(page, 'Linked Destination').locator('select').selectOption({ label: destTitle });
    await fieldByLabel(page, /^Location/).locator('input').fill('Western Desert');
    await fieldByLabel(page, /^Category/).locator('input').fill('Desert Safari');
    await fieldByLabel(page, /^Duration/).locator('input').fill('Overnight');
    await fieldByLabel(page, 'Main Image').locator('input[type="text"]').fill(uploadedImageUrl);
    await fieldByLabel(page, /^Description/).locator('textarea').fill(
      'Private Bedouin astronomer camp beneath the Milky Way.'
    );
    await page.getByRole('button', { name: 'Create Experience' }).click();
    await expect(page).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/experiences`);

    let expRow = await findCatalogRow(page, expTitle);
    await expRow.getByRole('button', { name: 'Publish' }).click();
    await expect(expRow.locator('.badge')).toHaveText(/published/i);
    await expRow.getByRole('link', { name: 'Edit' }).click();
    await fieldByLabel(page, 'Badge').locator('input').fill('Stargazing');
    await page.getByRole('button', { name: 'Save Changes' }).click();

    // 7. SPECIAL OFFERS (polymorphically linked to E2E Package)
    await page.goto(`${E2E_CONFIG.adminBaseUrl}/special-offers/new`);
    await fieldByLabel(page, /^Title/).locator('input').fill(offerTitle);
    await fieldByLabel(page, 'URL Slug').locator('input').fill(offerSlug);
    await fieldByLabel(page, /^Target Type/).locator('select').selectOption('package');
    await fieldByLabel(page, /^Target Item/).locator('select').selectOption({ label: `${pkgTitle} (${pkgSlug})` });
    await fieldByLabel(page, 'Offer Banner Image').locator('input[type="text"]').fill(uploadedImageUrl);
    await fieldByLabel(page, /^Description/).locator('textarea').fill(
      'Complimentary suite upgrade on our bespoke E2E package.'
    );
    await page.getByRole('button', { name: 'Create Offer' }).click();
    await expect(page).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/special-offers`);

    let offerRow = await findCatalogRow(page, offerTitle);
    await offerRow.getByRole('button', { name: 'Unpublish' }).click();
    await expect(offerRow.locator('.badge')).toHaveText(/draft/i);
    await offerRow.getByRole('button', { name: 'Publish' }).click();
    await expect(offerRow.locator('.badge')).toHaveText(/published/i);
    await offerRow.getByRole('link', { name: 'Edit' }).click();
    await fieldByLabel(page, 'Discount Label').locator('input').fill('20% Off');
    await page.getByRole('button', { name: 'Save Offer' }).click();

    // 8. JOURNAL ARTICLES
    await page.goto(`${E2E_CONFIG.adminBaseUrl}/journal/new`);
    await fieldByLabel(page, /^Title/).locator('input').fill(journalTitle);
    await fieldByLabel(page, 'URL Slug').locator('input').fill(journalSlug);
    await fieldByLabel(page, /^Author Name/).locator('input').fill('Dr. E2E Curator');
    await fieldByLabel(page, 'Featured Article Image').locator('input[type="text"]').fill(uploadedImageUrl);
    await fieldByLabel(page, /^Excerpt/).locator('textarea').fill(
      'An archaeological dispatch exploring newly conserved sanctuaries along the Nile.'
    );
    await fieldByLabel(page, /^Article Content/).locator('textarea').fill(
      'Paragraph one of the E2E curatorial essay.\n\nParagraph two detailing royal reliefs.'
    );
    await page.getByRole('button', { name: 'Create Article' }).click();
    await expect(page).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/journal`);

    let journalRow = await findCatalogRow(page, journalTitle);
    await journalRow.getByRole('button', { name: 'Publish' }).click();
    await expect(journalRow.locator('.badge')).toHaveText(/published/i);
    await journalRow.getByRole('link', { name: 'Edit' }).click();
    await fieldByLabel(page, 'Author Role').locator('input').fill('Chief Field Egyptologist');
    await page.getByRole('button', { name: 'Save Article' }).click();

    // 9. Verify 409 Conflict when deleting a Destination still referenced by Tour & Package
    await page.goto(`${E2E_CONFIG.adminBaseUrl}/destinations`);
    destRow = await findCatalogRow(page, destTitle);
    await destRow.locator('button[aria-label^="Delete "]').click();
    const modal = page.locator('.modal-card');
    await expect(modal).toBeVisible();

    const fkConflictPromise = page.waitForResponse(
      (res) =>
        res.url().includes('/api/admin/destinations/') && res.request().method() === 'DELETE'
    );
    await modal.getByRole('button', { name: /^Delete$/ }).click();
    const fkConflictRes = await fkConflictPromise;
    expect(fkConflictRes.status()).toBe(409);
    await expect(modal.locator('.alert-danger')).toContainText(/referenced|linked/i);
    await modal.getByRole('button', { name: 'Cancel' }).click();

    // 10. Clean up in dependency order via UI
    const deletions: { path: string; title: string }[] = [
      { path: '/special-offers', title: offerTitle },
      { path: '/tours', title: tourTitle },
      { path: '/experiences', title: expTitle },
      { path: '/packages', title: pkgTitle },
      { path: '/cruises', title: cruiseTitle },
      { path: '/journal', title: journalTitle },
      { path: '/destinations', title: destTitle },
    ];

    for (const item of deletions) {
      await page.goto(`${E2E_CONFIG.adminBaseUrl}${item.path}`);
      const row = await findCatalogRow(page, item.title);
      await deleteCatalogRowViaModal(page, row);
      await expect(
        page.locator('table.data-table tbody tr').filter({ hasText: item.title })
      ).toHaveCount(0);
    }
  });
});
