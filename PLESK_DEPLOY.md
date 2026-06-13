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
  rm -rf frontend/dist/admin frontend/dist/static &&
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
  rm -rf frontend/dist/admin frontend/dist/static &&
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

## Plesk panel walkthrough (UI-only deploy)

For sites where you'd rather not touch SSH:

1. **Add Subdomain** — `Websites & Domains` → `Add Subdomain`. Leave the default Document root for now (`/<slug>`).
2. **Git clone** — inside the subdomain → `Git` → `Remote Git hosting` → URL `https://github.com/xmedook/astro-sanity-plesk-boilerplate.git`, branch `main`, path = subdomain webspace root. Deploy mode = Manual.
3. **Pull updates** + **Deploy now** — `pull` fetches into Plesk's internal mirror, `Deploy` rsyncs files to the webspace. Both clicks are required the first time.
4. **Set Document root** to `<slug>/frontend/dist` (`Hosting Settings`).
5. **Copy `.env.example` → `.env`** in `frontend/` and `studio/` (File Manager). Fill in the Sanity `PROJECT_ID` and `DATASET`. Both must match.
6. **Enable Node.js on the subdomain** — `Node.js` → `Enable`, pick Node 22. You don't need to set Application Root / Startup File — the build only uses the binary, not Node at runtime.
7. **Configure deploy actions** — `Git` → gear → `Enable additional deploy actions`. Paste the block from "Rebuild" above (single `bash -c` form below works in chrooted subscriptions too).
8. Click `Deploy now` again. The build runs and `frontend/dist/` is populated.
9. **Let's Encrypt** — `SSL/TLS Certificates` → Install a free basic certificate.
10. **Sanity manage onboarding** — add yourself as project member + add the public origin to CORS Origins (see "Sanity Studio access" above).

### Deploy actions snippet for the Plesk Git UI

Plesk Git executes each line in a fresh shell, so `export PATH` doesn't persist between commands. Use a single `bash -c`:

```bash
bash -c '
  set -e
  export PATH=/.nodenv/shims:/opt/plesk/node/22/bin:$PATH
  npm install --no-audit --no-fund
  npm run build --workspace=frontend
  npm run build --workspace=studio
  rm -rf frontend/dist/admin frontend/dist/static
  cp -r studio/dist frontend/dist/admin
  ln -sfn admin/static frontend/dist/static
'
```

The PATH covers both common Plesk node layouts:
* `/.nodenv/shims/` — chrooted subscriptions (sys-user shell `chrootsh`).
* `/opt/plesk/node/22/bin/` — non-chrooted subscriptions.

### Common Plesk-flow gotchas

* **Pull vs. Deploy** — pulling only updates Plesk's internal git mirror; nothing reaches the webspace until you click `Deploy now`.
* **Chroot + Node** — if the subscription's sys-user has shell `/opt/psa/bin/chrootsh`, the deploy action runs inside the chroot where `/opt/plesk/node/22/` is not visible. Either (a) enable Node.js on the subdomain so Plesk mounts node into the chroot via `nodenv` shims under `/.nodenv/shims/`, or (b) switch the user's shell: `plesk bin subscription -u <parent-domain> -shell /bin/bash` (subscription becomes non-chrooted — only safe in single-tenant servers).
* **Stale `frontend/dist/static` symlink** — the rebuild scripts above now `rm -rf` both `admin/` and `static` before re-creating them. Earlier versions only removed `admin/`, leaving a dangling symlink on the second run.
* **Plesk placeholder `index.html`** — delete it from the webspace root once the boilerplate is deployed; Apache picks the boilerplate `frontend/dist/index.html` only after the Document root is set in step 4.
