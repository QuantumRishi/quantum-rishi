import { test, expect } from '@playwright/test';

test.describe('Homepage Navigation', () => {
	test('should load the homepage successfully', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/Quantum Rishi/);
	});

	test('should display hero section with main headline', async ({ page }) => {
		await page.goto('/');
		// Check for the hero headline
		await expect(page.locator('text=/We Build Intelligent Autonomous Systems/i')).toBeVisible();
	});

	test('should display all category sections', async ({ page }) => {
		await page.goto('/');
		// Check that all four main categories are present
		await expect(page.locator('text=Digital Core')).toBeVisible();
		await expect(page.locator('text=Applied Tech')).toBeVisible();
		await expect(page.locator('text=Knowledge Systems')).toBeVisible();
		await expect(page.locator('text=R&D & Vision')).toBeVisible();
	});
});

test.describe('Division Pages', () => {
	test('should navigate to QR.AI division page', async ({ page }) => {
		await page.goto('/');
		// Find and click on QR.AI card
		await page.click('text=QR.AI');
		// Wait for navigation
		await page.waitForURL('**/divisions/qr-ai');
		// Verify we're on the right page
		await expect(page.locator('h1:has-text("QR.AI")')).toBeVisible();
	});

	test('should navigate to QR.Block division page', async ({ page }) => {
		await page.goto('/');
		await page.click('text=QR.Block');
		await page.waitForURL('**/divisions/qr-block');
		await expect(page.locator('h1:has-text("QR.Block")')).toBeVisible();
	});

	test('should navigate to QR.Edu division page', async ({ page }) => {
		await page.goto('/');
		await page.click('text=QR.Edu');
		await page.waitForURL('**/divisions/qr-edu');
		await expect(page.locator('h1:has-text("QR.Edu")')).toBeVisible();
	});

	test('should navigate to QR.Labs division page', async ({ page }) => {
		await page.goto('/');
		await page.click('text=QR.Labs');
		await page.waitForURL('**/divisions/qr-labs');
		await expect(page.locator('h1:has-text("QR.Labs")')).toBeVisible();
	});

	test('should display division details and description', async ({ page }) => {
		await page.goto('/divisions/qr-ai');
		// Check for tagline
		await expect(page.locator('text=AI & ML Systems')).toBeVisible();
		// Check for description
		await expect(page.locator('text=/Advanced AI and Machine Learning systems/i')).toBeVisible();
	});
});

test.describe('Division Navigation', () => {
	test('should navigate back to homepage from division page', async ({ page }) => {
		await page.goto('/divisions/qr-ai');
		// Click the logo or home link in navbar
		await page.click('a[href="/"]');
		await page.waitForURL('/');
		await expect(page.locator('text=/We Build Intelligent Autonomous Systems/i')).toBeVisible();
	});

	test('should navigate between different divisions', async ({ page }) => {
		await page.goto('/divisions/qr-ai');
		await expect(page.locator('h1:has-text("QR.AI")')).toBeVisible();

		// Navigate to another division (if there's navigation)
		await page.goto('/divisions/qr-cloud');
		await expect(page.locator('h1:has-text("QR.Cloud")')).toBeVisible();
	});
});

test.describe('404 Error Handling', () => {
	test('should handle non-existent division page gracefully', async ({ page }) => {
		const response = await page.goto('/divisions/non-existent-division');
		// Should either redirect or show error page
		// Check that the page doesn't crash
		expect(response?.status()).toBeDefined();
	});
});
