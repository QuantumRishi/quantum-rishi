# Phase 16 Deployment Checklist

Quick reference checklist for deploying Quantum Rishi to Cloudflare Pages.

## Pre-Deployment Verification

### Technical Requirements

- [x] SvelteKit project configured
- [x] `@sveltejs/adapter-cloudflare` installed and configured
- [x] Build command works: `pnpm run build`
- [x] Preview works: `pnpm run preview`
- [x] Cache headers configured in `_headers` file
- [x] Security headers configured
- [x] No console errors in development

### Repository Status

- [x] All changes committed to Git
- [x] Repository pushed to GitHub
- [x] Main/production branch is clean
- [x] `.gitignore` properly configured

## Cloudflare Pages Setup

### Task 1: Connect Repository

- [ ] Log in to Cloudflare Dashboard
- [ ] Navigate to Pages > Create a project
- [ ] Connect to Git (GitHub)
- [ ] Authorize Cloudflare Pages
- [ ] Select `Quantum-Rishi/Quantum-Rishi` repository

### Task 2: Configure Build Settings

- [ ] Set project name: `quantum-rishi`
- [ ] Set production branch: `main` (or appropriate branch)
- [ ] Set build command: `pnpm run build`
- [ ] Set build output directory: `.svelte-kit/cloudflare`
- [ ] Set root directory: `/` (default)
- [ ] Add environment variables (if needed)

### Task 3: Initial Deployment

- [ ] Click "Save and Deploy"
- [ ] Wait for build to complete (2-5 minutes)
- [ ] Check build logs for errors
- [ ] Note the `*.pages.dev` URL

## Routing Verification

### Core Routes Testing

- [ ] Homepage loads: `https://*.pages.dev/`
- [ ] Division pages load: `https://*.pages.dev/divisions/qr-ai`
- [ ] Module pages load: `https://*.pages.dev/divisions/qr-ai/modules/llm-fine-tuning`
- [ ] Sitemap accessible: `https://*.pages.dev/sitemap.xml`
- [ ] 404 page works for invalid routes

### Static Assets

- [ ] CSS files load correctly
- [ ] JavaScript chunks load correctly
- [ ] Images display properly
- [ ] Fonts render correctly
- [ ] Three.js animations work
- [ ] GSAP animations work

### Navigation

- [ ] Click through all navigation links
- [ ] Test division category navigation
- [ ] Test module navigation
- [ ] Verify back/forward browser buttons work
- [ ] Check mobile navigation menu

## Domain Configuration

### Task 4: Add Custom Domain

- [ ] Go to Pages project > Custom domains
- [ ] Click "Set up a custom domain"
- [ ] Enter domain: `quantum-rishi.com`
- [ ] Click Continue

### DNS Configuration

- [ ] Add CNAME record for apex domain:
  - Type: `CNAME`
  - Name: `@`
  - Target: `your-project.pages.dev`
  - Proxy: Enabled (orange cloud)
- [ ] Add CNAME record for www subdomain:
  - Type: `CNAME`
  - Name: `www`
  - Target: `your-project.pages.dev`
  - Proxy: Enabled (orange cloud)

### DNS Propagation

- [ ] Wait for DNS propagation (5-30 minutes)
- [ ] Check DNS with: `dig quantum-rishi.com`
- [ ] Verify DNS globally: https://dnschecker.org/
- [ ] Cloudflare shows "Active" status for domain

## HTTPS & Redirects

### Task 5: SSL/TLS Configuration

- [ ] SSL certificate auto-provisioned (wait 15-20 min)
- [ ] Visit `https://quantum-rishi.com`
- [ ] Verify padlock icon in browser
- [ ] Check certificate details (issued by Cloudflare)
- [ ] Set SSL/TLS mode to "Full" or "Full (strict)"

### Redirect Testing

- [ ] Test HTTP to HTTPS redirect:

  ```bash
  curl -I http://quantum-rishi.com
  # Should return 301 to https://quantum-rishi.com
  ```

- [ ] Test WWW redirect (if configured):

  ```bash
  curl -I http://www.quantum-rishi.com
  curl -I https://www.quantum-rishi.com
  # Should redirect to preferred format
  ```

- [ ] Configure Page Rules for WWW redirect (if needed):
  - Pattern: `www.quantum-rishi.com/*`
  - Action: Forwarding URL
  - Status: 301
  - Destination: `https://quantum-rishi.com/$1`

## Security Verification

### Headers Check

- [ ] Open DevTools > Network tab
- [ ] Load a page and check response headers:
  - [ ] `X-Frame-Options: DENY`
  - [ ] `X-Content-Type-Options: nosniff`
  - [ ] `X-XSS-Protection: 1; mode=block`
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin`
  - [ ] `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Cache Headers

- [ ] Check CSS file headers:
  - [ ] `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`
- [ ] Check JS file headers:
  - [ ] `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`
- [ ] Check immutable assets:
  - [ ] `Cache-Control: public, max-age=31536000, immutable`

## Performance Testing

### Lighthouse Audit

- [ ] Run Lighthouse on homepage
- [ ] Performance score > 85 (target: 90+)
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

### Core Web Vitals

- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Total Blocking Time (TBT) < 300ms
- [ ] Cumulative Layout Shift (CLS) < 0.1

### Manual Testing

- [ ] Page load feels fast on desktop
- [ ] Page load feels fast on mobile
- [ ] Animations are smooth (60fps)
- [ ] No visual layout shifts
- [ ] No console errors or warnings

## Cross-Browser Testing

### Desktop Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers

- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet (Android)

### Test Points

- [ ] Layout renders correctly
- [ ] Navigation works
- [ ] Animations play smoothly
- [ ] Forms work (if applicable)
- [ ] Touch interactions work on mobile

## Monitoring Setup

### Cloudflare Analytics

- [ ] Enable Cloudflare Web Analytics
- [ ] Set up Real User Monitoring (RUM)
- [ ] Configure Core Web Vitals tracking

### Notifications

- [ ] Set up deployment notifications
- [ ] Configure downtime alerts
- [ ] Set up build failure notifications

## Post-Deployment

### Documentation

- [ ] Update README.md with live URL
- [ ] Document deployment process
- [ ] Update project status to "Live"
- [ ] Share URL with stakeholders

### Continuous Deployment

- [ ] Verify automatic deployments on push
- [ ] Test preview deployments for PRs
- [ ] Document rollback procedure

### Backup & Recovery

- [ ] Document rollback process
- [ ] Test rollback to previous deployment
- [ ] Verify deployment history is accessible

## Phase 16 Completion Criteria

All tasks from qr_build_plan.json Phase 16:

- [ ] ✅ Connect repo to Cloudflare Pages project
- [ ] ✅ Set build command: `pnpm run build`
- [ ] ✅ Verify base path routing works correctly
- [ ] ✅ Connect domain: quantum-rishi.com
- [ ] ✅ Verify HTTPS + redirects

## Sign-Off

- [ ] All checklist items completed
- [ ] Website accessible at https://quantum-rishi.com
- [ ] No critical errors or warnings
- [ ] Performance meets targets
- [ ] Security headers in place
- [ ] Monitoring configured

**Deployed By:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
**Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
**Production URL:** https://quantum-rishi.com
**Pages URL:** https://[project-name].pages.dev

---

## Quick Commands Reference

```bash
# Local build
pnpm run build

# Local preview
pnpm run preview

# Check DNS
dig quantum-rishi.com

# Test HTTPS redirect
curl -I http://quantum-rishi.com

# Test WWW redirect
curl -I https://www.quantum-rishi.com

# Check headers
curl -I https://quantum-rishi.com

# Run Lighthouse
lighthouse https://quantum-rishi.com --only-categories=performance
```

## Troubleshooting Quick Links

- [Build Failures](#build-failures) - See DEPLOYMENT.md
- [DNS Issues](#dns-not-resolving) - See DEPLOYMENT.md
- [SSL Issues](#ssl-certificate-not-provisioning) - See DEPLOYMENT.md
- [404 Errors](#404-errors-on-routes) - See DEPLOYMENT.md

---

**Status:** Ready for deployment
**Phase:** 16 of 17
**Next Phase:** Phase 17 - Future Sub-Domain Preparation
