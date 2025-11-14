# DNS Configuration for Quantum Rishi Sub-domains

This document outlines the DNS configuration needed for all Quantum Rishi division sub-domains.

## Required DNS Entries

All subdomains should point to Cloudflare Pages or the appropriate hosting infrastructure.

### Production Subdomains

| Subdomain                  | Target           | Type  | Description                               |
| -------------------------- | ---------------- | ----- | ----------------------------------------- |
| `ai.quantum-rishi.com`     | Cloudflare Pages | CNAME | QR.AI - AI & ML Systems                   |
| `block.quantum-rishi.com`  | Cloudflare Pages | CNAME | QR.Block - Blockchain & Web3              |
| `cloud.quantum-rishi.com`  | Cloudflare Pages | CNAME | QR.Cloud - Cloud Infrastructure           |
| `cyber.quantum-rishi.com`  | Cloudflare Pages | CNAME | QR.Cyber - Cybersecurity Solutions        |
| `digi.quantum-rishi.com`   | Cloudflare Pages | CNAME | QR.Digi - Digital Media & Content         |
| `studio.quantum-rishi.com` | Cloudflare Pages | CNAME | QR.Studio - Creative & Development Studio |
| `labs.quantum-rishi.com`   | Cloudflare Pages | CNAME | QR.Labs - Research & Development          |
| `future.quantum-rishi.com` | Cloudflare Pages | CNAME | QR.Future - Future Technologies & Vision  |

### Development Subdomains (Optional)

| Subdomain                      | Target                 | Type  | Description           |
| ------------------------------ | ---------------------- | ----- | --------------------- |
| `ai-dev.quantum-rishi.com`     | Cloudflare Pages (dev) | CNAME | QR.AI Development     |
| `block-dev.quantum-rishi.com`  | Cloudflare Pages (dev) | CNAME | QR.Block Development  |
| `cloud-dev.quantum-rishi.com`  | Cloudflare Pages (dev) | CNAME | QR.Cloud Development  |
| `cyber-dev.quantum-rishi.com`  | Cloudflare Pages (dev) | CNAME | QR.Cyber Development  |
| `digi-dev.quantum-rishi.com`   | Cloudflare Pages (dev) | CNAME | QR.Digi Development   |
| `studio-dev.quantum-rishi.com` | Cloudflare Pages (dev) | CNAME | QR.Studio Development |
| `labs-dev.quantum-rishi.com`   | Cloudflare Pages (dev) | CNAME | QR.Labs Development   |
| `future-dev.quantum-rishi.com` | Cloudflare Pages (dev) | CNAME | QR.Future Development |

## Configuration Steps

### For Cloudflare Pages

1. **Create Cloudflare Pages Project** for each subdomain app
   - Connect the respective app folder from the repository
   - Set build command: `pnpm run build`
   - Set build output directory: `.svelte-kit/output/client`

2. **Add Custom Domain in Cloudflare Pages**
   - Go to each project's settings
   - Navigate to "Custom domains"
   - Add the production subdomain (e.g., `ai.quantum-rishi.com`)
   - Cloudflare will automatically create the required DNS records

3. **SSL/TLS Configuration**
   - Ensure SSL/TLS is set to "Full (strict)" in Cloudflare Dashboard
   - Enable "Always Use HTTPS"
   - Enable HSTS (HTTP Strict Transport Security)

### DNS Record Example

For manual configuration (if needed):

```
Type: CNAME
Name: ai
Target: quantum-rishi-ai.pages.dev
Proxy status: Proxied (Orange cloud)
TTL: Auto
```

## Security Considerations

- Enable Cloudflare's Web Application Firewall (WAF)
- Configure rate limiting for API endpoints
- Enable DDoS protection
- Set up proper CORS policies for each subdomain
- Implement proper CSP (Content Security Policy) headers

## Monitoring

- Set up uptime monitoring for each subdomain
- Configure alerts for SSL certificate expiration
- Monitor DNS propagation after changes
- Track performance metrics for each subdomain

## Notes

- All subdomains should use HTTPS by default
- DNS propagation may take 24-48 hours
- Keep backup DNS records documented
- Coordinate subdomain deployments with main site updates
