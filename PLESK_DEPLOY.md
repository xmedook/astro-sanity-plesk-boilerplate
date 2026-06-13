# Plesk-vanilla SSG deploy

This repo is a boilerplate fork of [`sanity-io/sanity-template-astro-clean`](https://github.com/sanity-io/sanity-template-astro-clean)
patched to build as a fully static site so it can be served by Apache under Plesk
with no Node.js runtime, Passenger, PM2, or external processes.

## What changed vs. upstream

Branch: `plesk-ssg-boilerplate`.

1. `frontend/astro.config.mjs` — `output: "static"`, `@astrojs/vercel` adapter removed.
2. `frontend/package.json` — `@astrojs/vercel` dependency removed.
3. `frontend/src/utils/sanity.ts` — `loadQuery()` wrapped in try/catch so build succeeds with placeholder Sanity creds (returns `[]`).
4. `frontend/src/pages/post/[slug].astro` — `getStaticPaths()` added (enumerates posts at build).
5. `studio/sanity.config.ts` — `basePath: '/admin'` so the Studio router knows it's mounted under `/admin/`. The Vite-bundled assets still reference absolute `/static/*`; the build recipe creates a symlink `frontend/dist/static -> admin/static` to resolve them.
6. `frontend/.env` / `studio/.env` — `PROJECT_ID="placeholder"` so the Sanity client constructs cleanly; swap to your real project ID before going live.

## Reproduce on a new Plesk vhost

```bash
# 1. Create the Plesk subdomain (as root).
plesk bin subdomain --create <slug> -domain <parent-domain>
plesk bin subdomain --update <slug> -domain <parent-domain> \
    -www_root /<slug>.<parent-domain>/frontend/dist
plesk repair web -y <slug>.<parent-domain>

# 2. Clone this boilerplate into the vhost as the subscription's system user.
REPO=https://github.com/xmedook/astro-sanity-plesk-boilerplate.git
DST=/var/www/vhosts/<parent-domain>/<slug>.<parent-domain>
sudo -u <sys-user> git clone -b main $REPO $DST/.tmp
sudo bash -c "shopt -s dotglob && mv $DST/.tmp/* $DST/ && rmdir $DST/.tmp"
sudo rm -f $DST/index.html        # Plesk placeholder

# 3. Fill in real Sanity creds.
$DST/frontend/.env  -> PUBLIC_SANITY_STUDIO_PROJECT_ID, dataset, optional read token
$DST/studio/.env    -> SANITY_STUDIO_PROJECT_ID, dataset

# 4. Build (uses Plesk's bundled Node 22).
sudo -u <sys-user> bash -c '
  export PATH=/opt/plesk/node/22/bin:$PATH
  cd '"$DST"' && npm install --no-audit --no-fund &&
  npm run build --workspace=frontend &&
  npm run build --workspace=studio &&
  cp -r studio/dist frontend/dist/admin &&
  ln -sfn admin/static frontend/dist/static
'

# 5. Issue Let's Encrypt.
plesk bin extension --exec letsencrypt cli.php \
    -d <slug>.<parent-domain> -m <admin-email>
```

## Rebuild (after editing content in Sanity, or env changes)

```bash
sudo -u koodehosting.com bash -c '
  export PATH=/opt/plesk/node/22/bin:$PATH
  cd /var/www/vhosts/koodehosting.com/astro-sanity.koodehosting.com
  npm run build --workspace=frontend &&
  npm run build --workspace=studio &&
  rm -rf frontend/dist/admin &&
  cp -r studio/dist frontend/dist/admin &&
  ln -sfn admin/static frontend/dist/static
'
```

Apache picks up the new `frontend/dist/` immediately; no reload needed.

## Routing layout

| URL                                | Served from                          |
|------------------------------------|--------------------------------------|
| `/`                                | `frontend/dist/index.html`           |
| `/post/<slug>/`                    | `frontend/dist/post/<slug>/index.html` (built from Sanity at build time) |
| `/admin/`                          | `frontend/dist/admin/index.html` (Sanity Studio SPA) |
| `/404.html`                        | Astro 404 (Apache default 404 still applies for missing paths unless `ErrorDocument 404 /404.html` is added) |

## What this trades off

* No SSR → no Visual Editing live preview, no on-demand rendering.
  Re-runs are manual (or via a Sanity webhook calling a rebuild endpoint you wire up).
* `getStaticPaths()` runs at build → if Sanity is unreachable, posts disappear from the
  next deploy. The try/catch fallback prevents the build from failing in that case.

If you need Visual Editing / live preview, switch to `output: "server"`, add
`@astrojs/node`, and follow the nexodigital.mx pattern (Plesk Node Toolkit +
Passenger + `app.js` wrapper).

## Sanity Studio access — onboarding gotchas

The two pitfalls that *will* block you the first time, in order:

### 1. You must be a **project member**, not just an org admin

Being admin of the Sanity Organization that owns the project is **not** enough — the
Studio enforces project-level membership independently. Symptom:

> You are not a member of this project or the project does not exist

Fix: open
`https://www.sanity.io/manage/project/<projectId>/members` and add yourself
(or any other editor) as a project member. Organization-level admin grants
billing/visibility but not Studio sign-in.

### 2. You must whitelist the Studio origin under **CORS origins**

The Studio (`/admin/`) talks to `https://<projectId>.api.sanity.io` from the
browser, so the API rejects requests whose `Origin` header isn't allowlisted.
Symptom: the Studio loads (white shell, sidebar) but content panes stay blank,
and DevTools shows `403` on `/v*/users/me` / `/v*/projects`.

Verify from the host:

```bash
curl -sI -H "Origin: https://<slug>.<parent-domain>" \
     "https://<projectId>.api.sanity.io/v2024-01-01/users/me"
# 403 + `vary: Origin`  → CORS not allowed
# 200 / 401             → CORS OK (401 just means no auth cookie, which is normal for curl)
```

Fix: in `https://www.sanity.io/manage/project/<projectId>/api`, **CORS Origins → Add**:

* Origin: `https://<slug>.<parent-domain>` (no trailing slash, no path).
* Check **Allow credentials**.

Add a separate entry for `http://localhost:3333` if you also run the Studio locally.

### 3. (Optional) Read token for private datasets

The frontend uses `useCdn: true` against the public CDN by default and works
without a token for public datasets. If your dataset is private, generate a
read token at `…/api` → **Tokens → Add API token** (Viewer role) and put it in
`frontend/.env` as `SANITY_API_READ_TOKEN`.
