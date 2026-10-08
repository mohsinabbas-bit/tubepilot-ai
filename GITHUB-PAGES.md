# Deploy TubePilot AI website on GitHub Pages

This folder is the **complete** marketing site for [tubepilotai.app](https://tubepilotai.app/) — not the Windows app. Push **all** of these files together so CSS and images load.

## Folder layout (required)

```
docs/
  index.html
  privacy.html
  terms.html
  favicon.png
  CNAME
  .nojekyll
  css/site.css
  js/main.js
  assets/   (app-icon, favicon, all screen-*.png screenshots)
```

If `css/` or `assets/` is missing on GitHub, the live site will look like plain unstyled HTML with broken images.

## Option A — Same repo as the app (recommended)

1. Commit and push the `docs/` folder to your GitHub repository.
2. On GitHub: **Settings → Pages**.
3. **Build and deployment → Source:** Deploy from a branch.
4. **Branch:** `main` (or your default branch), **Folder:** `/docs`.
5. **Custom domain:** `tubepilotai.app` (the `CNAME` file in this folder sets this).
6. In your DNS (wherever the domain is registered), point `tubepilotai.app` to GitHub Pages (A/CNAME records per [GitHub custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).

Wait a few minutes, then verify:

- https://tubepilotai.app/css/site.css — should return CSS (not 404)
- https://tubepilotai.app/assets/screen-dashboard.png — should show a screenshot

## Option B — Website-only repository (root deploy)

If your GitHub repo contains **only** the website (no Electron app):

1. Copy **everything inside** `docs/` to the **repository root** (not a `docs/` subfolder).
2. **Settings → Pages →** deploy from branch `main`, folder **`/ (root)`**.
3. Keep `CNAME` at the repo root with `tubepilotai.app`.

## What was removed locally

Old folders `website/` and `website-v2/` and GoDaddy upload notes were removed. Use this `docs/` folder only.

## Microsoft Store link

All download buttons use: https://apps.microsoft.com/detail/9MZR3WZD5DH2
