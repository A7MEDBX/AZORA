import { expect, test } from '@playwright/test';
import { fieldByLabel, findCatalogRow, uploadPngViaField } from './helpers/adminUi';
import { E2E_CONFIG, E2ERunTracker } from './helpers/e2eContext';

test.describe('03 — Public Web Real API Network Audit & Admin-to-Web Live Round-Trip', () => {
  const tracker = new E2ERunTracker('ROUNDTRIP');

  test.afterAll(async ({ request }) => {
    await tracker.cleanupAll(request);
  });

  test('Asserts every public catalog page fetches live 200 OK API responses with zero failures', async ({
    page,
  }) => {
    const pageExpectations: { path: string; expectedApiPath: string }[] = [
      { path: '/', expectedApiPath: '/api/destinations' },
      { path: '/destinations', expectedApiPath: '/api/destinations' },
      { path: '/tours', expectedApiPath: '/api/tours' },
      { path: '/packages', expectedApiPath: '/api/packages' },
      { path: '/nile-cruises', expectedApiPath: '/api/cruises' },
      { path: '/experiences', expectedApiPath: '/api/experiences' },
      { path: '/special-offers', expectedApiPath: '/api/special-offers' },
      { path: '/journal', expectedApiPath: '/api/journal' },
      { path: '/about', expectedApiPath: '/api/reviews' },
      { path: '/search?q=Luxor', expectedApiPath: '/api/search' },
    ];

    for (const check of pageExpectations) {
      const apiStatuses: { url: string; status: number }[] = [];
      const listener = (res: { url: () => string; status: () => number }) => {
        if (res.url().includes(E2E_CONFIG.apiBaseUrl)) {
          apiStatuses.push({ url: res.url(), status: res.status() });
        }
      };
      page.on('response', listener);

      const matchedResponsePromise = page.waitForResponse(
        (res) => res.url().includes(check.expectedApiPath) && res.status() === 200
      );

      await page.goto(`${E2E_CONFIG.webBaseUrl}${check.path}`);
      await matchedResponsePromise;
      page.off('response', listener);

      const failedCalls = apiStatuses.filter((c) => c.status >= 400);
      expect(
        failedCalls,
        `Expected zero failed API calls on ${check.path}, got: ${JSON.stringify(failedCalls)}`
      ).toHaveLength(0);
    }
  });

  test('Publishes Destination, Tour, Package (2 days), & Offer in Admin -> verifies on Web -> unpublishes -> verifies immediate removal', async ({
    browser,
  }) => {
    const adminContext = await browser.newContext();
    const webContext = await browser.newContext();
    const adminPage = await adminContext.newPage();
    const webPage = await webContext.newPage();

    try {
      await tracker.loginViaAdminUi(adminPage);

      const destName = `${tracker.runId} Oasis`;
      const destSlug = `${tracker.slugPrefix}-oasis`;
      const tourTitle = `${tracker.runId} Temple Walk`;
      const tourSlug = `${tracker.slugPrefix}-tour`;
      const pkgTitle = `${tracker.runId} Royal Odyssey`;
      const pkgSlug = `${tracker.slugPrefix}-pkg`;
      const day1Title = `${tracker.runId} Day One Giza Dawn`;
      const day2Title = `${tracker.runId} Day Two Karnak Sanctuary`;
      const offerTitle = `${tracker.runId} Privilege Offer`;
      const offerSlug = `${tracker.slugPrefix}-offer`;

      // 1. Create & Publish Destination with uploaded Supabase Storage image
      await adminPage.goto(`${E2E_CONFIG.adminBaseUrl}/destinations/new`);
      await fieldByLabel(adminPage, /^Name/).locator('input').fill(destName);
      await fieldByLabel(adminPage, 'URL Slug').locator('input').fill(destSlug);
      await fieldByLabel(adminPage, /^Category/).locator('input').fill('Desert Oasis');
      await fieldByLabel(adminPage, /^Tagline/).locator('input').fill(`${tracker.runId} Tagline`);
      const uploadedImageUrl = await uploadPngViaField(
        adminPage,
        'Card Image',
        tracker,
        'roundtrip.png'
      );
      await fieldByLabel(adminPage, 'Hero Banner Image')
        .locator('input[type="text"]')
        .fill(uploadedImageUrl);
      await fieldByLabel(adminPage, /^Full Description/)
        .locator('textarea')
        .fill(`Live round-trip destination description for ${tracker.runId}.`);
      await fieldByLabel(adminPage, 'Status').locator('select').selectOption('published');
      await adminPage.getByRole('button', { name: 'Create Destination' }).click();
      await expect(adminPage).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/destinations`);

      // 2. Create & Publish Tour
      await adminPage.goto(`${E2E_CONFIG.adminBaseUrl}/tours/new`);
      await fieldByLabel(adminPage, /^Title/).locator('input').fill(tourTitle);
      await fieldByLabel(adminPage, 'URL Slug').locator('input').fill(tourSlug);
      await fieldByLabel(adminPage, /^Destination/)
        .locator('select')
        .selectOption({ label: `${destName} (published)` });
      await fieldByLabel(adminPage, 'Main Image')
        .locator('input[type="text"]')
        .fill(uploadedImageUrl);
      await fieldByLabel(adminPage, /^Description/)
        .locator('textarea')
        .fill(`Live round-trip private tour description for ${tracker.runId}.`);
      await fieldByLabel(adminPage, 'Status').locator('select').selectOption('published');
      await adminPage.getByRole('button', { name: 'Create Tour' }).click();
      await expect(adminPage).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/tours`);

      // 3. Create & Publish Package with 2 Itinerary Days
      await adminPage.goto(`${E2E_CONFIG.adminBaseUrl}/packages/new`);
      await fieldByLabel(adminPage, /^Title/).locator('input').fill(pkgTitle);
      await fieldByLabel(adminPage, 'URL Slug').locator('input').fill(pkgSlug);
      await fieldByLabel(adminPage, /^Route Summary/).locator('input').fill('Cairo → Oasis');
      await fieldByLabel(adminPage, 'Main Cover Image')
        .locator('input[type="text"]')
        .fill(uploadedImageUrl);
      await fieldByLabel(adminPage, /^Description/)
        .locator('textarea')
        .fill(`Live round-trip multi-day package for ${tracker.runId}.`);
      await fieldByLabel(adminPage, 'Status').locator('select').selectOption('published');

      const destPickerCard = adminPage
        .locator('.card')
        .filter({ hasText: 'Linked Destinations (Ordered)' });
      await destPickerCard.locator('select').selectOption({ label: `${destName} (${destSlug})` });
      await destPickerCard.getByRole('button', { name: /Add Destination/i }).click();

      const itineraryCard = adminPage
        .locator('.card')
        .filter({ hasText: 'Day-by-Day Itinerary Builder' });
      await itineraryCard.getByRole('button', { name: /Add Day/i }).click();
      await itineraryCard.getByRole('button', { name: /Add Day/i }).click();
      const dayBlocks = itineraryCard.locator('div[style*="border: 1px solid"]');
      await dayBlocks.nth(0).locator('input').first().fill(day1Title);
      await dayBlocks.nth(0).locator('textarea').fill('Private dawn arrival at Giza plateau.');
      await dayBlocks.nth(1).locator('input').first().fill(day2Title);
      await dayBlocks.nth(1).locator('textarea').fill('Evening torchlight walk in Karnak.');

      await adminPage.getByRole('button', { name: 'Create Package' }).click();
      await expect(adminPage).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/packages`);

      // 4. Create Active Special Offer linked to E2E Package
      await adminPage.goto(`${E2E_CONFIG.adminBaseUrl}/special-offers/new`);
      await fieldByLabel(adminPage, /^Title/).locator('input').fill(offerTitle);
      await fieldByLabel(adminPage, 'URL Slug').locator('input').fill(offerSlug);
      await fieldByLabel(adminPage, /^Target Type/).locator('select').selectOption('package');
      await fieldByLabel(adminPage, /^Target Item/)
        .locator('select')
        .selectOption({ label: `${pkgTitle} (${pkgSlug})` });
      await fieldByLabel(adminPage, 'Offer Banner Image')
        .locator('input[type="text"]')
        .fill(uploadedImageUrl);
      await fieldByLabel(adminPage, /^Description/)
        .locator('textarea')
        .fill(`Exclusive seasonal privilege for ${tracker.runId}.`);
      await adminPage.getByRole('button', { name: 'Create Offer' }).click();
      await expect(adminPage).toHaveURL(`${E2E_CONFIG.adminBaseUrl}/special-offers`);

      // 5. Verify live rendering on Public Web (:3000)
      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/destinations`);
      await expect(webPage.getByText(destName)).toBeVisible();
      await expect(webPage.locator(`img[src="${uploadedImageUrl}"]`).first()).toBeVisible();

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/destinations/${destSlug}`);
      await expect(webPage.getByRole('heading', { name: destName, exact: true })).toBeVisible();
      await expect(webPage.getByText(tourTitle)).toBeVisible();

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/tours`);
      await expect(webPage.getByText(tourTitle)).toBeVisible();

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/tours/${tourSlug}`);
      await expect(webPage.getByRole('heading', { name: tourTitle, exact: true })).toBeVisible();

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/packages`);
      await expect(webPage.getByText(pkgTitle)).toBeVisible();

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/packages/${pkgSlug}`);
      await expect(webPage.getByRole('heading', { name: pkgTitle, exact: true })).toBeVisible();
      await expect(webPage.getByText(day1Title)).toBeVisible();
      await expect(webPage.getByText(day2Title)).toBeVisible();

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/special-offers`);
      await expect(webPage.getByText(offerTitle)).toBeVisible();
      await expect(webPage.locator(`img[src="${uploadedImageUrl}"]`).first()).toBeVisible();

      await webPage.goto(
        `${E2E_CONFIG.webBaseUrl}/search?q=${encodeURIComponent(tracker.runId)}`
      );
      await expect(webPage.getByText(destName)).toBeVisible();
      await expect(webPage.getByText(tourTitle)).toBeVisible();
      await expect(webPage.getByText(pkgTitle)).toBeVisible();

      // 6. Unpublish all 4 items in Admin -> Verify immediate disappearance & Not Found on Web
      for (const item of [
        { path: '/special-offers', title: offerTitle },
        { path: '/packages', title: pkgTitle },
        { path: '/tours', title: tourTitle },
        { path: '/destinations', title: destName },
      ]) {
        await adminPage.goto(`${E2E_CONFIG.adminBaseUrl}${item.path}`);
        const row = await findCatalogRow(adminPage, item.title);
        await row.getByRole('button', { name: 'Unpublish' }).click();
        await expect(row.locator('.badge')).toHaveText(/draft/i);
      }

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/destinations`);
      await expect(webPage.getByText(destName)).toHaveCount(0);

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/destinations/${destSlug}`);
      await expect(webPage.getByText(/Destination Lost Among the Sands/i)).toBeVisible();

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/tours/${tourSlug}`);
      await expect(webPage.getByText(/Tour Not Found/i)).toBeVisible();

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/packages/${pkgSlug}`);
      await expect(webPage.getByText(/Package Expedition Not Found/i)).toBeVisible();

      await webPage.goto(`${E2E_CONFIG.webBaseUrl}/special-offers`);
      await expect(webPage.getByText(offerTitle)).toHaveCount(0);
    } finally {
      await adminContext.close();
      await webContext.close();
    }
  });
});
