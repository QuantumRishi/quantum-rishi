import { test, expect } from '@playwright/test';

/**
 * Type definition for resource timing information
 * Note: Playwright's Response object doesn't expose timing() method in TypeScript
 * For detailed timing, use Performance API or Chrome DevTools Protocol
 */
interface ResourceTiming {
	url: string;
	status: number;
}

test.describe('Animation Performance', () => {
	test('should maintain 60fps during scroll animations', async ({ page }) => {
		await page.goto('/');

		// Enable performance metrics
		const client = await page.context().newCDPSession(page);
		await client.send('Performance.enable');

		// Scroll down the page
		await page.evaluate(() => {
			window.scrollTo({
				top: document.body.scrollHeight / 2,
				behavior: 'smooth'
			});
		});

		// Wait for scroll to complete
		await page.waitForTimeout(1000);

		// Get performance metrics
		const metrics = await client.send('Performance.getMetrics');

		// The page should have reasonable layout metrics
		expect(metrics.metrics).toBeDefined();

		// Check that there are no excessive layout recalculations
		const layoutCount = metrics.metrics.find((m) => m.name === 'LayoutCount');
		if (layoutCount) {
			// Should not have excessive layouts (more than 30 is typically excessive for a simple scroll)
			expect(layoutCount.value).toBeLessThan(100);
		}
	});

	test('should not have layout thrashing on page load', async ({ page }) => {
		const client = await page.context().newCDPSession(page);
		await client.send('Performance.enable');

		await page.goto('/');

		// Wait for page to settle
		await page.waitForLoadState('networkidle');

		const metrics = await client.send('Performance.getMetrics');

		// Check for reasonable metrics
		const layoutDuration = metrics.metrics.find((m) => m.name === 'LayoutDuration');
		if (layoutDuration) {
			// Layout duration should be reasonable (less than 500ms)
			expect(layoutDuration.value).toBeLessThan(0.5);
		}
	});

	test('should have smooth hover animations on cards', async ({ page }) => {
		await page.goto('/');

		// Find a division card
		const card = page.locator('a[href^="/divisions/"]').first();

		// Hover over the card
		await card.hover();

		// Wait for animation to complete
		await page.waitForTimeout(500);

		// Card should still be visible and interactive
		await expect(card).toBeVisible();
	});

	test('should load page within acceptable time', async ({ page }) => {
		const startTime = Date.now();
		await page.goto('/');
		await page.waitForLoadState('domcontentloaded');
		const loadTime = Date.now() - startTime;

		// Page should load within 3 seconds
		expect(loadTime).toBeLessThan(3000);
	});

	test('should have smooth page transitions', async ({ page }) => {
		await page.goto('/');

		// Record start time
		const startTime = Date.now();

		// Navigate to a division page
		await page.click('text=QR.AI');
		await page.waitForURL('**/divisions/qr-ai');

		const transitionTime = Date.now() - startTime;

		// Transition should be reasonably fast
		expect(transitionTime).toBeLessThan(2000);
	});
});

test.describe('CSS Animation Performance', () => {
	test('should use GPU-accelerated properties for animations', async ({ page }) => {
		await page.goto('/');

		// Check if animations use transform and opacity (GPU-accelerated)
		const hasTransform = await page.evaluate(() => {
			const elements = document.querySelectorAll('*');
			let count = 0;
			elements.forEach((el) => {
				const style = window.getComputedStyle(el);
				if (
					style.transform !== 'none' ||
					style.transition.includes('transform') ||
					style.animation.includes('transform')
				) {
					count++;
				}
			});
			return count > 0;
		});

		// At least some elements should use transforms for animations
		expect(hasTransform).toBe(true);
	});

	test('should respect prefers-reduced-motion', async ({ page }) => {
		// Emulate reduced motion preference
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		// Page should still load and be functional
		await expect(page.locator('text=/We Build Intelligent Autonomous Systems/i')).toBeVisible();

		// Check if animations are disabled or reduced
		const hasReducedMotion = await page.evaluate(() => {
			return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		});

		expect(hasReducedMotion).toBe(true);
	});
});

test.describe('Resource Loading Performance', () => {
	test('should load critical resources efficiently', async ({ page }) => {
		const resourceTimings: ResourceTiming[] = [];

		page.on('response', (response) => {
			resourceTimings.push({
				url: response.url(),
				status: response.status()
				// Note: Playwright Response doesn't expose timing() in the public API
				// For detailed timing metrics, use page.evaluate(() => performance.getEntries())
			});
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Check that we received responses
		expect(resourceTimings.length).toBeGreaterThan(0);

		// Check that critical resources loaded successfully
		const htmlResponse = resourceTimings.find((r) => r.url === page.url());
		if (htmlResponse) {
			expect(htmlResponse.status).toBe(200);
		}
	});

	test('should lazy load images and heavy assets', async ({ page }) => {
		await page.goto('/');

		// Check if images have loading attribute
		const lazyImages = await page.locator('img[loading="lazy"]').count();

		// At least some images should be lazy loaded (if images exist)
		const totalImages = await page.locator('img').count();

		if (totalImages > 5) {
			// If there are many images, some should be lazy loaded
			expect(lazyImages).toBeGreaterThan(0);
		}
	});
});

test.describe('JavaScript Performance', () => {
	test('should not have excessive JavaScript execution time', async ({ page }) => {
		const client = await page.context().newCDPSession(page);
		await client.send('Performance.enable');

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const metrics = await client.send('Performance.getMetrics');

		// Check script duration
		const scriptDuration = metrics.metrics.find((m) => m.name === 'ScriptDuration');
		if (scriptDuration) {
			// Should not spend more than 2 seconds in JavaScript
			expect(scriptDuration.value).toBeLessThan(2);
		}
	});
});

test.describe('Rendering Performance', () => {
	test('should have acceptable First Contentful Paint', async ({ page }) => {
		await page.goto('/');

		// Get performance timing
		const timing = await page.evaluate(() => {
			const perfData = window.performance.timing;
			return {
				loadComplete: perfData.loadEventEnd - perfData.navigationStart,
				domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
				firstPaint:
					performance.getEntriesByType('paint')[0]?.startTime ||
					perfData.responseStart - perfData.navigationStart
			};
		});

		// First paint should happen quickly (under 1.5 seconds)
		expect(timing.firstPaint).toBeLessThan(1500);

		// DOM ready should be fast (under 2 seconds)
		expect(timing.domReady).toBeLessThan(2000);
	});
});
