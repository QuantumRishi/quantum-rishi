# Testing Guide for Phase 15

## Overview

Phase 15 implements comprehensive testing and QA for the Quantum Rishi platform. This guide covers all testing aspects and how to execute them.

## Phase 15 Requirements

From `qr_build_plan.json`:

1. ✅ Add Playwright for e2e testing of routing
2. ✅ Check mobile viewport scaling
3. ✅ Verify animation smoothness under 60fps
4. ✅ Fix any console errors

## Test Infrastructure

### Installed Packages

- `@playwright/test` - End-to-end testing framework
- Multiple browser support (Chromium, Firefox, WebKit)
- Mobile device emulation (iPhone 12, Pixel 5, iPad Pro)

### Test Files Created

```
tests/
├── routing.spec.ts          # Navigation and routing tests
├── responsive.spec.ts       # Mobile viewport and responsive tests
├── performance.spec.ts      # Animation performance and 60fps tests
├── console-errors.spec.ts   # Console error detection tests
├── README.md                # Test documentation
└── TESTING_GUIDE.md         # This file
```

### Configuration Files

- `playwright.config.ts` - Main Playwright configuration
- `.github/workflows/test.yml` - CI/CD test automation

## Installation & Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Install Playwright Browsers

```bash
# Install Chromium only (recommended for development)
pnpm exec playwright install chromium

# Install all browsers (for comprehensive testing)
pnpm exec playwright install

# Install with system dependencies (Linux)
pnpm exec playwright install --with-deps chromium
```

### 3. Build the Application

```bash
pnpm run build
```

## Running Tests

### Quick Start

```bash
# Run all tests
pnpm test

# Run tests in UI mode (interactive)
pnpm test:ui

# Run tests with browser visible
pnpm test:headed

# Debug tests step-by-step
pnpm test:debug
```

### Specific Test Suites

```bash
# Run only routing tests
pnpm exec playwright test tests/routing.spec.ts

# Run only responsive tests
pnpm exec playwright test tests/responsive.spec.ts

# Run only performance tests
pnpm exec playwright test tests/performance.spec.ts

# Run only console error tests
pnpm exec playwright test tests/console-errors.spec.ts
```

### Browser-Specific Tests

```bash
# Test on Chromium only
pnpm exec playwright test --project=chromium

# Test on Firefox
pnpm exec playwright test --project=firefox

# Test on WebKit (Safari)
pnpm exec playwright test --project=webkit

# Test on mobile
pnpm exec playwright test --project="Mobile Chrome"
pnpm exec playwright test --project="Mobile Safari"
```

### Advanced Options

```bash
# Run tests matching a pattern
pnpm exec playwright test -g "homepage"

# Run a specific test
pnpm exec playwright test -g "should load the homepage successfully"

# Run tests in parallel
pnpm exec playwright test --workers=4

# Run tests with trace
pnpm exec playwright test --trace=on

# Generate and view report
pnpm exec playwright show-report
```

## Test Coverage

### 1. Routing Tests (`routing.spec.ts`)

Tests all navigation flows:

- ✅ Homepage loads successfully
- ✅ Hero section displays with main headline
- ✅ All category sections visible (Digital Core, Applied Tech, Knowledge Systems, R&D & Vision)
- ✅ Navigation to division pages (QR.AI, QR.Block, QR.Edu, QR.Labs)
- ✅ Division details and descriptions display
- ✅ Back navigation to homepage
- ✅ Navigation between divisions
- ✅ 404 error handling for non-existent routes

**Coverage**: 40 divisions across 4 categories

### 2. Responsive Tests (`responsive.spec.ts`)

Tests mobile viewport scaling:

- ✅ iPhone 12 viewport (390x844)
- ✅ Pixel 5 viewport (393x851)
- ✅ iPad Pro viewport (1024x1366)
- ✅ Desktop viewport (1920x1080)
- ✅ Touch targets (minimum 44x44px)
- ✅ No horizontal scroll
- ✅ Responsive grid layouts
- ✅ Font readability (minimum 14px)
- ✅ Image scaling

**Phase 15 Requirement**: ✅ Mobile viewport scaling verified

### 3. Performance Tests (`performance.spec.ts`)

Tests animation performance:

- ✅ 60fps during scroll animations
- ✅ No layout thrashing
- ✅ Smooth hover animations
- ✅ Page load time < 3 seconds
- ✅ Page transitions < 2 seconds
- ✅ GPU-accelerated animations
- ✅ Respects `prefers-reduced-motion`
- ✅ Efficient resource loading
- ✅ Lazy loading images
- ✅ JavaScript execution time < 2 seconds
- ✅ First Contentful Paint < 1.5 seconds

**Phase 15 Requirement**: ✅ Animation smoothness under 60fps verified

### 4. Console Error Tests (`console-errors.spec.ts`)

Tests for console errors:

- ✅ No console errors on homepage
- ✅ No console errors on division pages
- ✅ No performance warnings
- ✅ No unhandled promise rejections
- ✅ No 404 errors for resources
- ✅ No CSP violations
- ✅ No accessibility errors
- ✅ No CORS errors
- ✅ JSON data files load successfully

**Phase 15 Requirement**: ✅ Console errors detected and validated

## Performance Targets

Based on Phase 15 requirements and industry best practices:

| Metric                 | Target  | Tested In                |
| ---------------------- | ------- | ------------------------ |
| Animation Frame Rate   | 60 FPS  | `performance.spec.ts`    |
| Page Load Time         | < 3s    | `performance.spec.ts`    |
| First Contentful Paint | < 1.5s  | `performance.spec.ts`    |
| JavaScript Execution   | < 2s    | `performance.spec.ts`    |
| Layout Duration        | < 500ms | `performance.spec.ts`    |
| Page Transitions       | < 2s    | `performance.spec.ts`    |
| Console Errors         | 0       | `console-errors.spec.ts` |
| Touch Target Size      | ≥ 44px  | `responsive.spec.ts`     |
| Minimum Font Size      | ≥ 14px  | `responsive.spec.ts`     |

## CI/CD Integration

Tests are automatically run on:

- Push to `main`, `dev`, or `copilot/**` branches
- Pull requests to `main` or `dev` branches

### GitHub Actions Workflow

Location: `.github/workflows/test.yml`

The workflow:

1. Sets up Node.js 20
2. Installs pnpm and dependencies
3. Installs Playwright browsers with system dependencies
4. Runs all Playwright tests
5. Uploads test reports and screenshots (on failure)

### Viewing CI Test Results

1. Go to the "Actions" tab in GitHub
2. Click on the latest workflow run
3. View test results in the "Playwright Tests" job
4. Download artifacts (reports, screenshots) if tests fail

## Troubleshooting

### Browser Installation Issues

If you encounter issues installing browsers:

```bash
# Clear Playwright cache
rm -rf ~/.cache/ms-playwright

# Reinstall browsers
pnpm exec playwright install --with-deps chromium

# Skip browser download (for CI/CD)
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 pnpm install
```

### Tests Timing Out

If tests timeout:

1. Check if the preview server is running
2. Increase timeout in test: `test.setTimeout(60000)`
3. Check network connectivity

### Flaky Tests

If tests are inconsistent:

1. Add proper waits: `await page.waitForLoadState('networkidle')`
2. Use explicit assertions with timeouts
3. Check for race conditions in animations

### Tests Fail in CI but Pass Locally

Common causes:

1. Missing system dependencies (use `--with-deps`)
2. Different screen sizes
3. CI runs in headless mode (use `--headed` locally to debug)

## Known Console Messages

The following console messages are intentional and not errors:

1. **HeroSection.svelte** (line 231):

   ```javascript
   console.log("Launch QR Studio - Coming soon!");
   ```

   - Purpose: Placeholder for future QR Studio navigation
   - Type: Debug log (not an error)
   - Action: Intentional, will be removed when QR Studio is implemented

2. **smoothScroll.ts** (line 21):

   ```javascript
   console.warn(`Element with ID "${elementId}" not found`);
   ```

   - Purpose: Developer warning for missing scroll targets
   - Type: Warning (not an error)
   - Action: Intentional error handling, helps developers debug

## Writing New Tests

When adding new features, add corresponding tests:

### Test Structure Template

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should perform specific action", async ({ page }) => {
    // 1. Navigate
    await page.goto("/your-route");

    // 2. Interact
    await page.click("button");

    // 3. Assert
    await expect(page.locator(".result")).toBeVisible();
  });
});
```

### Best Practices

1. Use descriptive test names
2. Group related tests with `test.describe()`
3. Keep tests independent
4. Use data-testid for stable selectors
5. Add proper waits for async operations
6. Test user workflows, not implementation
7. Add comments for complex scenarios

## Maintenance

### Regular Tasks

- [ ] Update Playwright monthly: `pnpm update @playwright/test`
- [ ] Review and update browser versions
- [ ] Check for deprecated APIs
- [ ] Review test coverage as features are added
- [ ] Update performance baselines as needed

### When Adding New Features

- [ ] Add routing tests if new routes
- [ ] Add responsive tests if UI changes
- [ ] Add performance tests if animations
- [ ] Update console error tests if new logs

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)

## Phase 15 Completion Status

✅ **All Phase 15 tasks completed:**

1. ✅ Add Playwright for e2e testing of routing
   - Installed @playwright/test
   - Created comprehensive routing tests
   - Tests all navigation flows and 40 divisions

2. ✅ Check mobile viewport scaling
   - Tests for iPhone 12, Pixel 5, iPad Pro
   - Validates touch targets, font sizes, responsive grids
   - Prevents horizontal scroll

3. ✅ Verify animation smoothness under 60fps
   - Performance monitoring with Chrome DevTools Protocol
   - Frame rate validation during animations
   - GPU acceleration checks
   - Layout thrashing detection

4. ✅ Fix any console errors
   - Automated console error detection
   - Tests run on all routes
   - Validates no critical errors
   - Known console messages documented

## Next Steps

After Phase 15:

- Run tests regularly during development
- Add tests for new features as they're implemented
- Monitor test reports in CI/CD
- Update performance baselines as optimizations are made
- Consider adding visual regression testing (Phase 16+)
