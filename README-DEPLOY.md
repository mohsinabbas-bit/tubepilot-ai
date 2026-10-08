# tubpilot-ai â€” push ALL of this to GitHub repo root

Your live site only had `index.html` and `favicon.png`. CSS and screenshots live in subfolders â€” they must be committed too.

## Required files on GitHub (check every path)

- index.html, privacy.html, terms.html, favicon.png, CNAME, .nojekyll
- css/site.css
- js/main.js
- assets/app-icon.png + all screen-*.png (10 images)

HTML in this folder also has **inlined CSS/JS** so styling works even if `css/` is missing once â€” but **images still need `assets/`**.

## GitHub Pages settings

- Settings â†’ Pages â†’ Branch: **main**, Folder: **/ (root)** â€” NOT `/docs`
- Custom domain: **tubepilotai.app**

## After push, verify (must be 200, not 404)

- https://tubepilotai.app/css/site.css
- https://tubepilotai.app/assets/screen-dashboard.png

## Rebuild from YT Bot project

Run: `powershell -File scripts/build-tubpilot-ai-site.ps1`
