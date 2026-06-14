// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_STUDIO_URL,
  PUBLIC_SITE_URL,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from "astro/config";

const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET;
const studioUrl = PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333";
// Canonical origin — used by @astrojs/sitemap, canonical tags and JSON-LD.
const site = PUBLIC_SITE_URL || "https://www.cheapweb.mx";

import sanity from "@sanity/astro";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site,
  // Static output — built once and served by Apache (Plesk vanilla).
  // For Visual Editing/live preview switch to "server" and add a Node adapter.
  output: "static",
  integrations: [
    sanity({
      projectId,
      dataset,
      useCdn: true,
      apiVersion: "2026-03-26",
    }),
    react(), // Required for Sanity Studio
    sitemap(), // Auto-enumerates all static routes, incl. /demos/*
  ],
  vite: {
    optimizeDeps: {
      include: [
        "react/compiler-runtime",
        "lodash/isObject.js",
        "lodash/groupBy.js",
        "lodash/keyBy.js",
        "lodash/partition.js",
        "lodash/sortedIndex.js",
      ],
    },

    plugins: [tailwindcss()],
  },
});