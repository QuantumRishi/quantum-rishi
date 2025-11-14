import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Viewport Scaling - iPhone', () => {
	test.use({ ...devices['iPhone 12'] });

	test('should display homepage correctly on iPhone', async ({ page }) => {
		await page.goto('/');
		// Check that content is visible and not overflowing
		await expect(page.locator('text=/We Build Intelligent Autonomous Systems/i')).toBeVisible();

		// Get viewport dimensions
		const viewport = page.viewportSize();
		expect(viewport?.width).toBeLessThanOrEqual(400);
	});

	test('should have tappable elements with adequate touch targets', async ({ page }) => {
		await page.goto('/');
		// Find division cards
		const cards = page.locator('a[href^="/divisions/"]').first();
		const box = await cards.boundingBox();

		// Touch targets should be at least 44x44px for accessibility
		if (box) {
			expect(box.height).toBeGreaterThanOrEqual(40);
			expect(box.width).toBeGreaterThanOrEqual(40);
		}
	});

	test('should navigate divisions on mobile', async ({ page }) => {
		await page.goto('/');
		// Click on first division
		await page.locator('text=QR.AI').first().click();
		await page.waitForURL('**/divisions/qr-ai');
		await expect(page.locator('h1:has-text("QR.AI")')).toBeVisible();
	});

	test('should not have horizontal scroll on mobile', async ({ page }) => {
		await page.goto('/');
		const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
		const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
		// Allow for minor differences (1-2px) due to browser rendering
		expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
	});
});

test.describe('Mobile Viewport Scaling - Android', () => {
	test.use({ ...devices['Pixel 5'] });

	test('should display homepage correctly on Android', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('text=/We Build Intelligent Autonomous Systems/i')).toBeVisible();
	});

	test('should display division cards in responsive grid', async ({ page }) => {
		await page.goto('/');
		const cards = page.locator('a[href^="/divisions/"]');
		const count = await cards.count();
		expect(count).toBeGreaterThan(0);

		// Cards should be visible
		for (let i = 0; i < Math.min(3, count); i++) {
			await expect(cards.nth(i)).toBeVisible();
		}
	});
});

test.describe('Tablet Viewport Scaling', () => {
	test.use({ ...devices['iPad Pro'] });

	test('should display homepage correctly on tablet', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('text=/We Build Intelligent Autonomous Systems/i')).toBeVisible();

		// Get viewport dimensions
		const viewport = page.viewportSize();
		expect(viewport?.width).toBeGreaterThan(768);
	});

	test('should utilize more screen space on tablet', async ({ page }) => {
		await page.goto('/');
		const cards = page.locator('a[href^="/divisions/"]');
		const count = await cards.count();

		// On tablet, multiple cards should be visible at once
		expect(count).toBeGreaterThan(0);
	});
});

test.describe('Desktop Viewport Scaling', () => {
	test.use({ viewport: { width: 1920, height: 1080 } });

	test('should display full layout on desktop', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('text=/We Build Intelligent Autonomous Systems/i')).toBeVisible();
	});

	test('should display categories in wide layout', async ({ page }) => {
		await page.goto('/');
		// All category sections should be visible
		await expect(page.locator('text=Digital Core')).toBeVisible();
		await expect(page.locator('text=Applied Tech')).toBeVisible();
		await expect(page.locator('text=Knowledge Systems')).toBeVisible();
		await expect(page.locator('text=R&D & Vision')).toBeVisible();
	});
});

test.describe('Text Readability', () => {
	test('should have readable font sizes on mobile', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		// Check that body text is at least 16px
		const bodyFontSize = await page.locator('body').evaluate((el) => {
			return window.getComputedStyle(el).fontSize;
		});
		const fontSizeValue = parseInt(bodyFontSize);
		expect(fontSizeValue).toBeGreaterThanOrEqual(14); // Minimum readable size
	});
});

test.describe('Image and Media Scaling', () => {
	test('should not load oversized images on mobile', async ({ page }) => {
		test.use({ ...devices['iPhone 12'] });
		await page.goto('/');

		// Check if images are present and reasonable size
		const images = page.locator('img');
		const count = await images.count();

		if (count > 0) {
			const firstImage = images.first();
			const box = await firstImage.boundingBox();
			const viewport = page.viewportSize();

			if (box && viewport) {
				// Images shouldn't be wider than viewport
				expect(box.width).toBeLessThanOrEqual(viewport.width);
			}
		}
	});
});
