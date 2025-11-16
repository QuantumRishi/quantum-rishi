/**
 * Phase 13: Dynamic Sitemap Generation
 *
 * This route generates a sitemap.xml file dynamically from the divisions data.
 * It includes:
 * - Home page
 * - All division pages
 *
 * Note: Module pages can be added in the future by iterating through modules.json
 */

import divisionsData from "$lib/data/divisions.json";
import type { RequestHandler } from "./$types";

export const prerender = true;

export const GET: RequestHandler = async () => {
  const site = "https://quantum-rishi.com";

  // Build array of URLs with their metadata
  const urls: Array<{
    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;
  }> = [];

  // Add home page
  urls.push({
    loc: site,
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "daily",
    priority: "1.0",
  });

  // Add all division pages
  for (const categoryData of Object.values(divisionsData.categories)) {
    for (const division of categoryData.divisions) {
      urls.push({
        loc: `${site}/divisions/${division.slug}`,
        lastmod: new Date().toISOString().split("T")[0],
        changefreq: "weekly",
        priority: "0.8",
      });
    }
  }

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=0, s-maxage=3600",
    },
  });
};
