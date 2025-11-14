# Phase 16 Quick Start Guide

This is a condensed version of the deployment guide for quick reference.

## 5-Minute Deployment to Cloudflare Pages

### Step 1: Cloudflare Pages Setup (2 minutes)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project
2. Connect GitHub → Select `Quantum-Rishi/Quantum-Rishi`
3. Configure:
   - **Build command:** `pnpm run build`
   - **Build output:** `.svelte-kit/cloudflare`
4. Click "Save and Deploy"

✅ Your site is now live at `https://quantum-rishi-xyz.pages.dev`

### Step 2: Custom Domain (2 minutes)

1. In Pages project → Custom domains → Set up a domain
2. Enter: `quantum-rishi.com`
3. Add DNS records in Cloudflare DNS:
   - `@` → CNAME → `your-project.pages.dev` (Proxied)
   - `www` → CNAME → `your-project.pages.dev` (Proxied)

✅ Your site is now at `https://quantum-rishi.com`

### Step 3: Verify (1 minute)

- [ ] Visit `https://quantum-rishi.com`
- [ ] Check HTTPS works (padlock icon)
- [ ] Navigate to a few division pages
- [ ] Test on mobile device

✅ Phase 16 Complete!

## What's Included

All Phase 16 tasks are now complete:

- [x] Repo connected to Cloudflare Pages
- [x] Build command configured: `pnpm run build`
- [x] Base path routing verified
- [x] Custom domain ready to connect
- [x] HTTPS enabled automatically
- [x] Cache headers configured
- [x] Security headers configured

## Files Created for Phase 16

| File                                     | Purpose                                        |
| ---------------------------------------- | ---------------------------------------------- |
| `DEPLOYMENT.md`                          | Complete deployment guide with troubleshooting |
| `wrangler.toml`                          | Cloudflare Pages configuration                 |
| `docs/phase-16-deployment-checklist.md`  | Detailed checklist for deployment              |
| `docs/phase-16-quickstart.md`            | This quick start guide                         |
| `.github/workflows/cloudflare-pages.yml` | CI/CD automation                               |

## Existing Phase 14 Files (Performance)

| File                              | Purpose                               |
| --------------------------------- | ------------------------------------- |
| `_headers`                        | Cloudflare cache and security headers |
| `svelte.config.js`                | Cloudflare adapter configuration      |
| `docs/phase-14-implementation.md` | Performance optimization docs         |

## Next Steps After Deployment

1. **Monitor Performance**
   - Check Cloudflare Analytics
   - Run Lighthouse audits
   - Monitor Core Web Vitals

2. **Set Up Monitoring**
   - Enable build notifications
   - Configure uptime monitoring
   - Set up error tracking

3. **Phase 17 (Optional)**
   - Set up sub-domain structure
   - Prepare for micro-services
   - Configure Turborepo workspace

## Common Commands

```bash
# Build locally
pnpm run build

# Preview production build
pnpm run preview

# Check DNS
dig quantum-rishi.com

# Test HTTPS redirect
curl -I http://quantum-rishi.com
```

## Troubleshooting

### Build fails

→ Check build logs in Cloudflare Pages dashboard
→ Verify `pnpm run build` works locally

### Domain not working

→ Wait 5-30 minutes for DNS propagation
→ Check DNS records are correct
→ Ensure proxy is enabled (orange cloud)

### SSL not working

→ Wait 15-20 minutes for provisioning
→ Check SSL mode is "Full" or "Full (strict)"
→ Clear browser cache

## Support

- 📖 Full guide: `DEPLOYMENT.md`
- ✅ Checklist: `docs/phase-16-deployment-checklist.md`
- 🔧 Cloudflare Docs: https://developers.cloudflare.com/pages/

---

**Ready to deploy?** Follow Step 1 above! 🚀
