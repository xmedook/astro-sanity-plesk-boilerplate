#!/usr/bin/env node
/**
 * One-time blog import: production posts from the legacy Next.js site
 * (/tmp/cheapweb-mx/lib/blog.ts + public/blog/*.webp) → Sanity `post` docs.
 *
 *   node scripts/import-blog.mjs [--dry] [--src /path/to/cheapweb-mx] [--skip-images]
 *
 * Idempotent: _id = `post-<slug>`, createOrReplace. Markdown body → PortableText.
 *
 * Env (.env at repo root):
 *   SANITY_PROJECT_ID   — default xgccta5n
 *   SANITY_DATASET      — default production
 *   SANITY_WRITE_TOKEN  — Sanity token with write access (required unless --dry)
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient } from "@sanity/client";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = process.argv[i + 1];
  return next && !next.startsWith("--") ? next : true;
}

const dry = Boolean(arg("dry", false));
const skipImages = Boolean(arg("skip-images", false));
const SRC = String(arg("src", "/tmp/cheapweb-mx"));
const BLOG_TS = path.join(SRC, "lib/blog.ts");
const IMG_DIR = path.join(SRC, "public/blog");

const projectId = process.env.SANITY_PROJECT_ID || "xgccta5n";
const dataset = process.env.SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!dry && !token) {
  console.error("Falta SANITY_WRITE_TOKEN en .env (o usá --dry).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-03-26",
  useCdn: false,
});

let keyN = 0;
const key = () => `k${keyN++}_${randomUUID().slice(0, 8)}`;

/** Parse inline markdown (**bold**, [text](url)) into PortableText spans + markDefs. */
function parseInline(text, markDefs) {
  const re = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  const spans = [];
  for (const part of text.split(re)) {
    if (!part) continue;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    if (link) {
      const k = key();
      markDefs.push({ _key: k, _type: "link", href: link[2] });
      spans.push({ _type: "span", _key: key(), text: link[1], marks: [k] });
    } else if (bold) {
      spans.push({ _type: "span", _key: key(), text: bold[1], marks: ["strong"] });
    } else {
      spans.push({ _type: "span", _key: key(), text: part, marks: [] });
    }
  }
  if (!spans.length) spans.push({ _type: "span", _key: key(), text: "", marks: [] });
  return spans;
}

/** Minimal markdown → PortableText blocks (headings, bullets, paragraphs). */
function mdToBlocks(md) {
  const blocks = [];
  for (const raw of md.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    let style = "normal";
    let listItem = null;
    let text = line;
    if (line.startsWith("### ")) { style = "h3"; text = line.slice(4); }
    else if (line.startsWith("## ")) { style = "h2"; text = line.slice(3); }
    else if (line.startsWith("# ")) { style = "h1"; text = line.slice(2); }
    else if (line.startsWith("- ") || line.startsWith("* ")) { listItem = "bullet"; text = line.slice(2); }
    const markDefs = [];
    const block = { _type: "block", _key: key(), style, markDefs, children: parseInline(text, markDefs) };
    if (listItem) { block.listItem = "bullet"; block.level = 1; }
    blocks.push(block);
  }
  return blocks;
}

/** Load `posts` from the legacy TS module by stripping its types. */
async function loadPosts() {
  let src = fs.readFileSync(BLOG_TS, "utf8");
  src = src.replace(/export interface Post \{[\s\S]*?\n\}\n/, "");
  src = src.replace("export const posts: Post[] =", "export const posts =");
  const cut = src.indexOf("\nexport function");
  if (cut !== -1) src = src.slice(0, cut);
  const tmp = path.join(SRC, "_blog_import.mjs");
  fs.writeFileSync(tmp, src);
  const mod = await import(`file://${tmp}?t=${Date.now()}`);
  fs.unlinkSync(tmp);
  return mod.posts;
}

async function uploadImage(slug, title) {
  if (skipImages) return undefined;
  const file = path.join(IMG_DIR, `${slug}.webp`);
  if (!fs.existsSync(file)) {
    console.warn(`  ⚠ sin imagen: ${slug}.webp`);
    return undefined;
  }
  if (dry) return { _type: "image", asset: { _type: "reference", _ref: "dry-run" }, alt: title };
  const asset = await client.assets.upload("image", fs.createReadStream(file), {
    filename: `${slug}.webp`,
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt: title };
}

async function main() {
  const posts = await loadPosts();
  console.log(`${posts.length} posts en origen. ${dry ? "(DRY)" : ""}\n`);

  let ok = 0;
  for (const p of posts) {
    const mainImage = await uploadImage(p.slug, p.title);
    const doc = {
      _id: `post-${p.slug}`,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      excerpt: p.description,
      publishedAt: new Date(p.date).toISOString(),
      category: p.category,
      readTime: p.readTime,
      ...(mainImage ? { mainImage } : {}),
      body: mdToBlocks(p.content),
    };
    if (dry) {
      console.log(`  • ${p.slug} (${doc.body.length} bloques${mainImage ? ", +img" : ""})`);
    } else {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${p.slug}`);
    }
    ok++;
  }
  console.log(`\n${dry ? "Validados" : "Importados"} ${ok}/${posts.length} posts.`);
  if (!dry) console.log("Aparecen en vivo al siguiente build.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
