# tubpilot-ai â€” ready-to-upload GitHub Pages bundle

Copy **everything in this folder** to your **tubpilot-ai** repository root and push to `main`.

## Required paths (all must exist on GitHub)

- index.html, privacy.html, terms.html
- favicon.png, CNAME, .nojekyll
- robots.txt, sitemap.xml, site.webmanifest
- css/site.css
- js/main.js
- assets/app-icon.png, assets/og-image.png, assets/favicon.png, assets/screen-*.png

HTML files include **inlined CSS/JS** as a fallback; images must still be under `assets/`.

## GitHub Pages

- Settings â†’ Pages â†’ Source: **Deploy from branch**
- Branch: **main**, Folder: **/ (root)**
- Custom domain: **tubepilotai.app** (DNS already via CNAME)

## Verify after deploy

- https://tubepilotai.app/
- https://tubepilotai.app/css/site.css
- https://tubepilotai.app/assets/screen-dashboard.png
- https://tubepilotai.app/privacy.html

## Rebuild from YT Bot project

``powershell
powershell -File scripts/build-tubpilot-ai-site.ps1
``
