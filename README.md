# Guardino Technologies — Corporate Website

Astro 6 + Tailwind v4 + `@astrojs/node` standalone SSR.
Multilingual (en default, tr, de, fr, ar). Deploys to Hostinger Node.js shared hosting.

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # builds dist/server + dist/client
npm start            # production runtime via server.mjs (HOST=0.0.0.0)
```

## Deploy to Hostinger (shared Node.js hosting)

### 1. Pull repo on the server (one-time)

SSH into your Hostinger account, then:

```bash
cd ~/domains/guardinotechnologies.com/public_html
# If directory has stale files, clear it first:
# rm -rf ~/domains/guardinotechnologies.com/public_html/{*,.*} 2>/dev/null
git clone https://github.com/hkkaynak/guardino-technologies-web.git .
npm ci
npm run build
ls -la dist/server/entry.mjs   # must exist
```

### 2. Configure Node.js application in hPanel

**hPanel → Websites → guardinotechnologies.com → Advanced → Node.js**

| Field | Value |
|---|---|
| Node.js version | 22.x |
| Application mode | Production |
| Application root | `domains/guardinotechnologies.com/public_html` |
| Application URL | `guardinotechnologies.com` |
| **Application startup file** | **`server.mjs`** ← important, NOT `dist/server/entry.mjs` |
| Environment variables | (Hostinger auto-sets PORT) |

Click **Restart Application**.

### 3. Verify

```bash
curl -sI https://guardinotechnologies.com/ | head -5
# Expect: HTTP/2 200, server: cloudflare, NO "panel: hpanel" header
```

### 4. Subsequent updates

```bash
# Local
git push origin main

# Hostinger SSH
cd ~/domains/guardinotechnologies.com/public_html
git pull
npm ci
npm run build
# hPanel → Restart Application

# Cloudflare cache purge (from local with creds)
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_GUARDINOTECHNOLOGIES_COM/purge_cache" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

## Why `server.mjs` instead of `dist/server/entry.mjs`?

Hostinger shared Node.js hosting calls the startup file directly. The Astro standalone bundle binds to `localhost` by default, which is unreachable from Hostinger's reverse proxy. `server.mjs` is a 5-line wrapper that forces `HOST=0.0.0.0` before importing the entry, so the app listens on all interfaces and Hostinger can reach it.

## Tech

- **Framework:** Astro 6 (SSR via `@astrojs/node` standalone)
- **Styling:** Tailwind v4 with `@theme` design tokens
- **i18n:** Astro built-in (5 locales)
- **Content:** Astro Content Collections (blog Markdown)
- **Hosting:** Hostinger Business Node.js
- **DNS/CDN:** Cloudflare (proxied)
- **Domain registrar:** Hostinger (DNSSEC enabled)
