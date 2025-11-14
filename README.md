# Quantum Rishi™ - Unified Ecosystem Landing Platform

A cutting-edge web platform showcasing the Quantum Rishi ecosystem, built with SvelteKit, TypeScript, TailwindCSS, and deployed on Cloudflare Pages.

## 🌐 Live Site

- **Production:** `https://quantum-rishi.com` (ready to connect)
- **Staging:** `https://quantum-rishi-*.pages.dev`

## 🚀 Tech Stack

- **Framework:** SvelteKit 2.x + TypeScript
- **Styling:** TailwindCSS 4.x
- **Animation:** GSAP + svelte-motion
- **3D Graphics:** Three.js
- **Package Manager:** pnpm
- **Deployment:** Cloudflare Pages
- **CI/CD:** GitHub Actions

## 📦 Project Structure

```
quantum-rishi/
├── src/
│   ├── lib/
│   │   ├── components/     # Reusable Svelte components
│   │   ├── data/          # JSON data for divisions & modules
│   │   └── styles/        # Global styles & design tokens
│   └── routes/            # SvelteKit routes
├── static/                # Static assets
├── docs/                  # Documentation
│   ├── phase-14-implementation.md
│   ├── phase-16-deployment-checklist.md
│   └── phase-16-quickstart.md
├── _headers               # Cloudflare cache & security headers
├── wrangler.toml          # Cloudflare Pages config
└── DEPLOYMENT.md          # Complete deployment guide
```

## 🛠️ Development

### Prerequisites

- Node.js 20+
- pnpm 10+

### Setup

```sh
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open in browser
pnpm run dev -- --open
```

### Available Commands

```sh
pnpm run dev          # Start dev server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run check        # Type check
pnpm run lint         # Lint code
pnpm run format       # Format code
```

## 🚢 Deployment

This project is configured for Cloudflare Pages deployment.

### Quick Deploy (5 minutes)

See [Quick Start Guide](docs/phase-16-quickstart.md) for a 5-minute deployment walkthrough.

### Complete Guide

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment instructions including:

- Cloudflare Pages setup
- Custom domain configuration
- HTTPS & redirect configuration
- Troubleshooting guide

### Build Configuration

- **Build Command:** `pnpm run build`
- **Output Directory:** `.svelte-kit/cloudflare`
- **Adapter:** `@sveltejs/adapter-cloudflare`

## 📊 Performance

### Optimization Features

- ✅ Code splitting & lazy loading
- ✅ Manual chunk configuration
- ✅ Image optimization (WebP/AVIF)
- ✅ Aggressive caching headers
- ✅ Security headers
- ✅ Edge deployment via Cloudflare

### Target Metrics

- **Lighthouse Score:** > 90
- **FCP:** < 1.0s
- **LCP:** < 2.5s
- **TBT:** < 300ms
- **CLS:** < 0.1

## 📁 Documentation

- [Phase 14 Implementation](docs/phase-14-implementation.md) - Performance optimization
- [Phase 16 Deployment](DEPLOYMENT.md) - Complete deployment guide
- [Phase 16 Checklist](docs/phase-16-deployment-checklist.md) - Deployment checklist
- [Phase 16 Quick Start](docs/phase-16-quickstart.md) - 5-minute deployment

## 🔒 Security

Security headers are configured in `_headers`:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy restrictions

## 📋 Project Phases

This project follows a 17-phase build plan (see `qr_build_plan.json`):

- ✅ Phase 1-15: Completed
- ✅ Phase 16: Deployment & domain configuration (CURRENT)
- ⏳ Phase 17: Future Sub-Domain Preparation

## 🤝 Contributing

This project follows a structured development process. Please ensure:

- Code passes linting: `pnpm run lint`
- Types check: `pnpm run check`
- Build succeeds: `pnpm run build`

## 📄 License

Copyright © Quantum Rishi. All rights reserved.

## 🔗 Resources

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Three.js Documentation](https://threejs.org/docs/)

---

**Status:** ✅ Ready for Production Deployment
**Phase:** 16 of 17
**Build Plan:** `qr_build_plan.json`
