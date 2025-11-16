import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    tailwindcss(),
    imagetools({
      // Default output formats for optimized images
      defaultDirectives: (url) => {
        // Generate WebP and AVIF formats for better compression
        if (url.searchParams.has("width")) {
          return new URLSearchParams({
            format: "webp;avif;jpg",
            quality: "80",
          });
        }
        return new URLSearchParams();
      },
    }),
    sveltekit(),
  ],
  build: {
    // Improve chunking strategy for better code splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate Three.js into its own chunk for lazy loading
          if (id.includes("node_modules/three")) {
            return "vendor-three";
          }
          // Separate GSAP into its own chunk for lazy loading
          if (id.includes("node_modules/gsap")) {
            return "vendor-gsap";
          }
          // Group Svelte core together
          if (id.includes("node_modules/svelte")) {
            return "vendor-svelte";
          }
          // Group smaller vendor libraries together
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    // Target modern browsers for better optimization
    target: "es2020",
    // Increase chunk size warning limit (we're optimizing intentionally)
    chunkSizeWarningLimit: 600,
    // Enable minification
    minify: "esbuild",
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
});
