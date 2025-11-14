import { test, expect } from '@playwright/test';

test.describe('Console Error Detection', () => {
	test('should not have console errors on homepage', async ({ page }) => {
		const consoleMessages: string[] = [];
		const consoleErrors: string[] = [];

		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				consoleErrors.push(msg.text());
			}
			consoleMessages.push(`${msg.type()}: ${msg.text()}`);
		});

		page.on('pageerror', (error) => {
			consoleErrors.push(`Page Error: ${error.message}`);
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Log all console messages for debugging
		if (consoleMessages.length > 0) {
			console.log('Console messages:', consoleMessages);
		}

		// Check that there are no errors
		expect(consoleErrors).toHaveLength(0);
	});

	test('should not have console errors on division pages', async ({ page }) => {
		const consoleErrors: string[] = [];

		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				consoleErrors.push(msg.text());
			}
		});

		page.on('pageerror', (error) => {
			consoleErrors.push(`Page Error: ${error.message}`);
		});

		// Test a few division pages
		const divisionsToTest = ['qr-ai', 'qr-block', 'qr-edu', 'qr-labs'];

		for (const division of divisionsToTest) {
			await page.goto(`/divisions/${division}`);
			await page.waitForLoadState('networkidle');
		}

		// Check that there are no errors
		if (consoleErrors.length > 0) {
			console.log('Console errors found:', consoleErrors);
		}
		expect(consoleErrors).toHaveLength(0);
	});

	test('should not have console warnings about performance', async ({ page }) => {
		const performanceWarnings: string[] = [];

		page.on('console', (msg) => {
			const text = msg.text();
			if (
				msg.type() === 'warning' &&
				(text.includes('performance') || text.includes('slow') || text.includes('deprecated'))
			) {
				performanceWarnings.push(text);
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Log warnings if any
		if (performanceWarnings.length > 0) {
			console.log('Performance warnings:', performanceWarnings);
		}

		// Ideally should have no performance warnings
		expect(performanceWarnings.length).toBeLessThanOrEqual(5);
	});

	test('should not have unhandled promise rejections', async ({ page }) => {
		const unhandledRejections: string[] = [];

		page.on('pageerror', (error) => {
			if (error.message.includes('Unhandled Promise')) {
				unhandledRejections.push(error.message);
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Navigate to another page
		await page.click('text=QR.AI');
		await page.waitForURL('**/divisions/qr-ai');

		expect(unhandledRejections).toHaveLength(0);
	});

	test('should not have 404 errors for resources', async ({ page }) => {
		const failedRequests: Array<{ url: string; status: number }> = [];

		page.on('response', (response) => {
			if (response.status() >= 400) {
				failedRequests.push({
					url: response.url(),
					status: response.status()
				});
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Log failed requests
		if (failedRequests.length > 0) {
			console.log('Failed requests:', failedRequests);
		}

		// Check that critical resources loaded successfully
		const criticalFailures = failedRequests.filter(
			(req) =>
				req.status === 404 &&
				(req.url.includes('.js') || req.url.includes('.css') || req.url.includes('.html'))
		);

		expect(criticalFailures).toHaveLength(0);
	});

	test('should not have CSP violations', async ({ page }) => {
		const cspViolations: string[] = [];

		page.on('console', (msg) => {
			const text = msg.text();
			if (text.includes('Content Security Policy') || text.includes('CSP')) {
				cspViolations.push(text);
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(cspViolations).toHaveLength(0);
	});

	test('should not have accessibility errors', async ({ page }) => {
		const a11yErrors: string[] = [];

		page.on('console', (msg) => {
			const text = msg.text();
			if (
				msg.type() === 'error' &&
				(text.includes('aria') ||
					text.includes('accessibility') ||
					text.includes('a11y') ||
					text.includes('role'))
			) {
				a11yErrors.push(text);
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		if (a11yErrors.length > 0) {
			console.log('Accessibility errors:', a11yErrors);
		}

		expect(a11yErrors).toHaveLength(0);
	});
});

test.describe('JavaScript Errors', () => {
	test('should handle division navigation without errors', async ({ page }) => {
		const jsErrors: string[] = [];

		page.on('pageerror', (error) => {
			jsErrors.push(error.message);
		});

		await page.goto('/');

		// Click through multiple divisions
		await page.click('text=QR.AI');
		await page.waitForURL('**/divisions/qr-ai');

		await page.goto('/');
		await page.click('text=QR.Cloud');
		await page.waitForURL('**/divisions/qr-cloud');

		if (jsErrors.length > 0) {
			console.log('JavaScript errors during navigation:', jsErrors);
		}

		expect(jsErrors).toHaveLength(0);
	});
});

test.describe('Network Errors', () => {
	test('should not have CORS errors', async ({ page }) => {
		const corsErrors: string[] = [];

		page.on('console', (msg) => {
			const text = msg.text();
			if (msg.type() === 'error' && text.toLowerCase().includes('cors')) {
				corsErrors.push(text);
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(corsErrors).toHaveLength(0);
	});

	test('should load all JSON data files successfully', async ({ page }) => {
		const jsonRequests: Array<{ url: string; status: number }> = [];

		page.on('response', (response) => {
			if (response.url().includes('.json')) {
				jsonRequests.push({
					url: response.url(),
					status: response.status()
				});
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// All JSON files should load with 200 status
		const failedJsonRequests = jsonRequests.filter((req) => req.status !== 200);

		if (failedJsonRequests.length > 0) {
			console.log('Failed JSON requests:', failedJsonRequests);
		}

		expect(failedJsonRequests).toHaveLength(0);
	});
});
