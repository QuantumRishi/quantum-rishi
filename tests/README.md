# E2E Testing Documentation

This directory contains end-to-end tests for the Quantum Rishi platform using Playwright.

## Test Suites

### 1. Routing Tests (`routing.spec.ts`)

Tests navigation and routing functionality:

- Homepage loading and display
- Navigation to division pages
- Back navigation from division pages
- 404 error handling

### 2. Responsive Tests (`responsive.spec.ts`)

Tests mobile viewport scaling and responsive design:

- Mobile viewport (iPhone, Android)
- Tablet viewport (iPad)
- Desktop viewport
- Touch target sizes
- Horizontal scroll prevention
- Text readability
- Image and media scaling

### 3. Performance Tests (`performance.spec.ts`)

Tests animation smoothness and performance:

- 60fps target for animations
- Scroll performance
- Layout thrashing detection
- Page load times
- CSS animation performance (GPU acceleration)
- `prefers-reduced-motion` support
- Resource loading efficiency
- JavaScript execution time
- First Contentful Paint metrics

### 4. Console Error Tests (`console-errors.spec.ts`)

Tests for JavaScript and console errors:

- Console errors on homepage
- Console errors on division pages
- Performance warnings
- Unhandled promise rejections
- 404 errors for resources
- CSP violations
- Accessibility errors
- CORS errors
- JSON data loading

## Running Tests

### Prerequisites

First, install Playwright browsers:

```bash
pnpm exec playwright install chromium
```

### Run All Tests

```bash
pnpm test
```

### Run Tests in UI Mode

```bash
pnpm test:ui
```

### Run Tests in Headed Mode (see browser)

```bash
pnpm test:headed
```

### Debug Tests

```bash
pnpm test:debug
```

### View Test Report

```bash
pnpm test:report
```

### Run Specific Test File

```bash
pnpm exec playwright test tests/routing.spec.ts
```

### Run Tests for Specific Browser

```bash
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
```

### Run Mobile Tests Only

```bash
pnpm exec playwright test --project="Mobile Chrome"
pnpm exec playwright test --project="Mobile Safari"
```

## Test Configuration

The test configuration is defined in `playwright.config.ts`:

- Tests run against `http://localhost:4173` (preview server)
- Automatic server start before tests
- Multiple browser configurations (Chromium, Firefox, WebKit)
- Mobile device emulation (Pixel 5, iPhone 12)
- Trace collection on first retry

## Writing New Tests

When adding new tests:

1. Create a new `.spec.ts` file in the `tests` directory
2. Import from `@playwright/test`
3. Use descriptive test names
4. Group related tests with `test.describe()`
5. Add appropriate assertions with `expect()`

Example:

```typescript
import { test, expect } from "@playwright/test";

test.describe("New Feature", () => {
  test("should do something", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("selector")).toBeVisible();
  });
});
```

## CI/CD Integration

Tests can be integrated into CI/CD pipelines:

- Set `CI=true` environment variable
- Tests will automatically retry on failure (2 times)
- Tests run sequentially (not in parallel)
- HTML report is generated after test run

## Best Practices

1. **Use data-testid for stable selectors** when possible
2. **Wait for elements properly** using `waitForSelector` or `toBeVisible`
3. **Test real user workflows** rather than implementation details
4. **Keep tests independent** - each test should work in isolation
5. **Use descriptive assertions** to make failures clear
6. **Test critical paths first** - homepage, main navigation, key features

## Troubleshooting

### Tests Failing Due to Timeouts

- Increase timeout in test: `test.setTimeout(60000)`
- Check if server is starting correctly
- Ensure network is stable

### Elements Not Found

- Check if selectors are correct
- Verify element is actually rendered
- Add proper waits before assertions

### Flaky Tests

- Add explicit waits for animations
- Wait for network idle: `await page.waitForLoadState('networkidle')`
- Check for race conditions

## Performance Targets

Based on Phase 15 requirements:

- **Animation Performance**: Target 60fps
- **Page Load Time**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Layout Shifts**: Minimal (no layout thrashing)
- **Console Errors**: Zero critical errors

## Phase 15 Checklist

- [x] Add Playwright for e2e testing of routing
- [x] Check mobile viewport scaling
- [x] Verify animation smoothness under 60fps
- [x] Fix any console errors (tested automatically)
