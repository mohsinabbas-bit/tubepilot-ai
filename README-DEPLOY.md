# TubePilot AI site — upload to GitHub Pages

**Do not delete your existing `CNAME` file** on GitHub. Upload/replace everything else from this folder.

Domain: `tubepilotai.app` → Microsoft Store product `9MZR3WZD5DH2`

## Upload these (repo root)

| File / folder | Action |
|---|---|
| `CNAME` | **Keep** existing on GitHub (contains `tubepilotai.app`). Only re-upload if missing. |
| `index.html` | **Replace** — marketing homepage (was wrongly showing Team Approve) |
| `site.css`, `main.js` | **Replace** |
| `privacy.html`, `terms.html` | **Replace** |
| `favicon.png`, `app-icon.png`, `og-image.png` | Keep / re-upload if missing |
| `screen-*.png` (incl. `screen-keywords.png`, `screen-team.png`) | Replace / upload all |
| `.nojekyll`, `robots.txt`, `sitemap.xml`, `site.webmanifest` | Replace |
| `approve/` | **Keep** — team approve stays at `/approve/` |

## Why the site showed “Team Approve”

The root `index.html` on GitHub was the approve page (or a copy of it). Approve belongs only under `approve/`. After you upload this new root `index.html`, `https://tubepilotai.app/` is the marketing site and `https://tubepilotai.app/approve/` stays Team Approve.

## After upload — check

1. https://tubepilotai.app/ — TubePilot AI homepage (not Team Approve)
2. https://tubepilotai.app/site.css — evergreen styles load
3. https://tubepilotai.app/approve/ — still Team Approve
4. “Buy on Microsoft Store” → https://apps.microsoft.com/detail/9MZR3WZD5DH2
5. Reviews strip scrolls right → left
6. https://tubepilotai.app/#keywords — Keyword Planner section + screenshot
7. https://tubepilotai.app/#team — Team & Always-On section + screenshot

GitHub Pages may take 1–5 minutes to refresh after push.
