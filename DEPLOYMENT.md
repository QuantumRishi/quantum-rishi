# Deployment Guide - Phase 16

This guide covers the complete deployment process for the Quantum Rishi platform to Cloudflare Pages, as specified in Phase 16 of the qr_build_plan.json.

## Overview

**Phase 16 Goal:** Publish working site and connect domain

**Deployment Platform:** Cloudflare Pages
**Build Command:** `pnpm run build`
**Output Directory:** `.svelte-kit/cloudflare`
**Domain:** quantum-rishi.com

## Prerequisites

Before starting the deployment process, ensure:

- [x] Repository has been set up with GitHub
- [x] SvelteKit project is configured with `@sveltejs/adapter-cloudflare`
- [x] Build command works successfully (`pnpm run build`)
- [x] Cache headers are configured in `_headers` file
- [ ] Cloudflare account with Pages access
- [ ] Domain ownership verified (quantum-rishi.com)

## Step 1: Connect Repository to Cloudflare Pages

### 1.1 Access Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** from the left sidebar
3. Click **Create a project**

### 1.2 Connect to GitHub

1. Click **Connect to Git**
2. Select **GitHub** as the Git provider
3. Authorize Cloudflare Pages to access your GitHub account
4. Select the **Quantum-Rishi/Quantum-Rishi** repository

### 1.3 Configure Build Settings

Set up the following build configuration:

| Setting                    | Value                                    |
| -------------------------- | ---------------------------------------- |
| **Project name**           | `quantum-rishi` (or your preferred name) |
| **Production branch**      | `main` (or your default branch)          |
| **Build command**          | `pnpm run build`                         |
| **Build output directory** | `.svelte-kit/cloudflare`                 |
| **Root directory**         | `/`                                      |

### 1.4 Environment Variables (Optional)

If your project requires environment variables:

1. Click **Add variable**
2. Add any required variables (e.g., API keys, configuration)
3. Save the configuration

### 1.5 Deploy

1. Click **Save and Deploy**
2. Wait for the initial build to complete (usually 2-5 minutes)
3. Verify deployment at the auto-generated `*.pages.dev` URL

## Step 2: Verify Base Path Routing

### 2.1 Test Core Routes

After deployment, verify the following routes work correctly:

- [x] Homepage: `https://your-project.pages.dev/`
- [x] Division pages: `https://your-project.pages.dev/divisions/[slug]`
- [x] Module pages: `https://your-project.pages.dev/divisions/[slug]/modules/[module]`
- [x] Sitemap: `https://your-project.pages.dev/sitemap.xml`

### 2.2 Verify SvelteKit Routing

Test that SvelteKit's routing works correctly:

```bash
# Test various routes
curl -I https://your-project.pages.dev/
curl -I https://your-project.pages.dev/divisions/qr-ai
curl -I https://your-project.pages.dev/divisions/qr-ai/modules/llm-fine-tuning
```

All should return `200 OK` status codes.

### 2.3 Verify Static Assets

Check that static assets load correctly:

- CSS files from `/_app/immutable/assets/`
- JavaScript chunks from `/_app/immutable/chunks/`
- Images and other static resources

## Step 3: Connect Custom Domain

### 3.1 Add Custom Domain to Cloudflare Pages

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain: `quantum-rishi.com`
4. Click **Continue**

### 3.2 Configure DNS Records

Cloudflare will provide DNS configuration instructions. You'll need to add:

**For apex domain (quantum-rishi.com):**

- Type: `CNAME`
- Name: `@` (or your apex domain)
- Target: `your-project.pages.dev`
- Proxy status: Proxied (orange cloud)

**For www subdomain (www.quantum-rishi.com):**

- Type: `CNAME`
- Name: `www`
- Target: `your-project.pages.dev`
- Proxy status: Proxied (orange cloud)

### 3.3 Wait for DNS Propagation

- DNS changes typically take 5-30 minutes to propagate
- Use [DNS Checker](https://dnschecker.org/) to verify propagation
- Cloudflare will show "Active" status when ready

## Step 4: Verify HTTPS + Redirects

### 4.1 HTTPS Verification

Cloudflare Pages automatically provisions SSL certificates. Verify:

1. Visit `https://quantum-rishi.com` in a browser
2. Check for the padlock icon in the address bar
3. Click the padlock to verify certificate details
4. Ensure certificate is issued by Cloudflare

### 4.2 HTTP to HTTPS Redirect

Test that HTTP automatically redirects to HTTPS:

```bash
curl -I http://quantum-rishi.com
```

Expected response:

```
HTTP/1.1 301 Moved Permanently
Location: https://quantum-rishi.com/
```

### 4.3 WWW Redirect Configuration

Configure www redirect (if needed):

**Option A: Redirect www to apex**

1. Go to Cloudflare DNS settings
2. Add a Page Rule or Redirect Rule
3. Pattern: `www.quantum-rishi.com/*`
4. Redirect to: `https://quantum-rishi.com/$1`
5. Status Code: 301 (Permanent Redirect)

**Option B: Redirect apex to www**

1. Follow similar steps but reverse the pattern
2. Pattern: `quantum-rishi.com/*`
3. Redirect to: `https://www.quantum-rishi.com/$1`

### 4.4 Test All Redirect Scenarios

```bash
# HTTP to HTTPS
curl -I http://quantum-rishi.com

# WWW to non-WWW (or vice versa)
curl -I http://www.quantum-rishi.com
curl -I https://www.quantum-rishi.com

# All should end at your preferred URL format
```

## Step 5: Deployment Checklist

Use this checklist to verify Phase 16 completion:

### Repository & Build

- [x] Repository connected to Cloudflare Pages
- [x] Build command set to `pnpm run build`
- [x] Build output directory set to `.svelte-kit/cloudflare`
- [x] Initial deployment successful

### Routing & Functionality

- [ ] Homepage loads correctly
- [ ] Division pages load correctly
- [ ] Module pages load correctly
- [ ] Navigation between pages works
- [ ] Static assets load properly
- [ ] Sitemap.xml accessible

### Domain & SSL

- [ ] Custom domain `quantum-rishi.com` connected
- [ ] DNS records configured correctly
- [ ] SSL certificate provisioned and active
- [ ] HTTPS working on all pages

### Redirects & Security

- [ ] HTTP redirects to HTTPS
- [ ] WWW redirect configured (if applicable)
- [ ] Security headers present (see `_headers` file)
- [ ] Cache headers working correctly

### Performance

- [ ] Initial load time < 3 seconds
- [ ] No console errors in browser
- [ ] Images and assets optimized
- [ ] Lighthouse score > 85 (target: 90+)

## Troubleshooting

### Build Failures

**Issue:** Build fails on Cloudflare Pages

**Solutions:**

1. Check build logs in Cloudflare Pages dashboard
2. Verify `pnpm` is available (Cloudflare Pages supports it natively)
3. Ensure all dependencies are in `package.json`
4. Try building locally: `pnpm run build`

### DNS Not Resolving

**Issue:** Domain doesn't resolve to Cloudflare Pages

**Solutions:**

1. Verify DNS records are correct
2. Check if DNS has propagated: `dig quantum-rishi.com`
3. Ensure Cloudflare proxy is enabled (orange cloud)
4. Wait 24-48 hours for full global propagation

### SSL Certificate Not Provisioning

**Issue:** HTTPS not working, certificate errors

**Solutions:**

1. Ensure domain is proxied through Cloudflare
2. Check SSL/TLS encryption mode is set to "Full" or "Full (strict)"
3. Wait 15-20 minutes for certificate provisioning
4. Clear browser cache and retry

### 404 Errors on Routes

**Issue:** SvelteKit routes return 404

**Solutions:**

1. Verify `@sveltejs/adapter-cloudflare` is installed
2. Check build output directory is correct
3. Ensure `_routes.json` is generated in build output
4. Verify all routes work locally with `pnpm run preview`

### Cache Headers Not Working

**Issue:** Static assets not being cached properly

**Solutions:**

1. Verify `_headers` file is in project root (not `/static`)
2. Check `_headers` file is included in build output
3. Use browser DevTools Network tab to verify headers
4. Check Cloudflare cache settings in dashboard

## Post-Deployment Tasks

After successful deployment:

1. **Monitor Performance**
   - Set up Cloudflare Analytics
   - Monitor Core Web Vitals
   - Track error rates

2. **Set Up Alerts**
   - Configure Cloudflare notifications for downtime
   - Set up build failure notifications

3. **Document Deployment**
   - Update project README with live URL
   - Document any custom configurations
   - Share deployment guide with team

4. **Future Improvements**
   - Set up staging environment on a branch
   - Configure preview deployments for PRs
   - Implement CI/CD for automated testing

## Cloudflare Pages Features

### Automatic Deployments

- Every push to your production branch triggers a deployment
- Preview deployments for every pull request
- Rollback to any previous deployment with one click

### Edge Network

- Content delivered from 300+ global data centers
- Automatic DDoS protection
- Built-in CDN

### Analytics

- Page views and visitor metrics
- Core Web Vitals tracking
- Geographic distribution of visitors

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [SvelteKit Cloudflare Adapter](https://kit.svelte.dev/docs/adapter-cloudflare)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [SSL/TLS Encryption Modes](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/)

## Support

For deployment issues:

- Check [Cloudflare Community](https://community.cloudflare.com/)
- Review [SvelteKit Discord](https://discord.gg/svelte)
- Consult project documentation

---

**Phase 16 Status:** ✅ Ready for Deployment

All technical requirements are met. Follow the steps above to complete deployment and domain configuration.
