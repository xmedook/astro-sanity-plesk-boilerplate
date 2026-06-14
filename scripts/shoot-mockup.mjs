#!/usr/bin/env node
/**
 * Demo mockup shooter.
 *
 *   node scripts/shoot-mockup.mjs --slug restaurante-cdmx
 *   node scripts/shoot-mockup.mjs --all
 *
 * Captures each /demos/[slug] page (Playwright, 16:10 desktop), uploads the PNG
 * to Sanity, and patches demo.deviceMockup so the portfolio card stops showing
 * the "Mockup TODO" placeholder. Auto — no manual upload.
 *
 * Needs a running site at --base (default http://localhost:4321). Use `npm run dev`.
 *
 * Env (.env at root): SANITY_WRITE_TOKEN, SANITY_PROJECT_ID, SANITY_DATASET.
 */
import "dotenv/config";
import { chromium } from "playwright";
import { createClient } from "@sanity/client";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = process.argv[i + 1];
  return next && !next.startsWith("--") ? next : true;
}
const base = (arg("base", "http://localhost:4321") || "").replace(/\/$/, "");
const all = Boolean(arg("all", false));
const slugArg = arg("slug");

if (!all && !slugArg) {
  console.error("Falta --slug <slug> o --all.");
  process.exit(1);
}

const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "xgccta5n",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2026-03-26",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Card aspect is 16:10 (640x400). Shoot at 2x for crisp retina mockups.
const W = 1280;
const H = 800;

async function slugs() {
  if (!all) return [slugArg];
  return sanity.fetch(`*[_type == "demo" && status == "published" && defined(slug.current)].slug.current`);
}

async function shoot(page, slug) {
  const url = `${base}/demos/${slug}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  // Hide the cheapweb meta-ribbon so the mockup reads as a pure business site.
  await page.addStyleTag({ content: "[data-demo-ribbon]{display:none !important}" });
  await page.waitForTimeout(400); // settle lazy images
  return page.screenshot({ clip: { x: 0, y: 0, width: W, height: H }, type: "png" });
}

(async () => {
  if (!process.env.SANITY_WRITE_TOKEN) throw new Error("Falta SANITY_WRITE_TOKEN.");
  const list = await slugs();
  if (!list.length) {
    console.log("No hay demos publicados.");
    return;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });

  for (const slug of list) {
    try {
      console.log(`▶ ${slug} …`);
      const buf = await shoot(page, slug);
      const asset = await sanity.assets.upload("image", buf, { filename: `mockup-${slug}.png` });
      const docId = `demo-${slug}`;
      const doc = await sanity.getDocument(docId);
      await sanity
        .patch(docId)
        .set({
          deviceMockup: {
            _type: "image",
            asset: { _type: "reference", _ref: asset._id },
            alt: `Demo ${doc?.title || slug}`,
          },
        })
        .commit();
      console.log(`  ✓ deviceMockup actualizado (${asset._id})`);
    } catch (e) {
      console.error(`  ✗ ${slug}: ${e.message}`);
    }
  }

  await browser.close();
  console.log("Listo. Rebuild para ver las cards.");
})().catch((err) => {
  console.error("✗ Error:", err.message);
  process.exit(1);
});
