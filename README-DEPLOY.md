# tubpilot-ai - upload ALL files in this folder to GitHub repo root

Keep your existing **CNAME** if you prefer; otherwise use the one here (tubepilotai.app).

## Must upload (every file in this folder)

- index.html, privacy.html, terms.html
- site.css, main.js
- favicon.png, app-icon.png, screen-*.png (9 screenshots)
- CNAME, .nojekyll, robots.txt, sitemap.xml, site.webmanifest

Images are at **repo root** (not in an assets folder) so screenshots and icons load after a simple upload.

## Verify after push

- https://tubepilotai.app/app-icon.png
- https://tubepilotai.app/screen-dashboard.png
- https://tubepilotai.app/site.css

Rebuild: `powershell -File scripts/build-tubpilot-ai-site.ps1`