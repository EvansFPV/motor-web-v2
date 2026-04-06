# MotorLab

MotorLab is a browser-based electric motor winding and magnet design tool for fast BLDC scheme exploration, engineering checks, and mobile-friendly workflows.

## Status
Current public baseline: `1.0.3` (production-candidate quality with stable calculator, PWA shell, and optional Supabase hooks).

## Core Features
- Winding scheme calculator (slots/poles and manual schema modes)
- Winding visualization with animation and enhanced view controls
- Magnet advisor (pole pitch, coverage ratio, suggested width, warning groups)
- Scheme comparison and engineering assessment panel
- Save/load history, presets, JSON/CSV export, and share link
- Mobile-first PWA behavior (installable shell + offline support)
- Guest mode by default, with optional Supabase auth/cloud project sync

## Quick Start
### Run locally (static server)
```bash
python3 -m http.server 8080
```
Open `http://localhost:8080`.

### Run with Docker
```bash
docker build -t motor-web .
docker run -p 8080:80 motor-web
```
Open `http://localhost:8080`.

## Deployment
MotorLab is a static web application. You can deploy it on Vercel, Netlify, GitHub Pages, or any Nginx host.

### Vercel
- `vercel.json` is included for rewrites and cache headers.
- Import the repository and deploy with static defaults.

### Netlify
- `netlify.toml` is included for publish root, redirects, and headers.
- Connect repository and deploy without a build command.

### Nginx / Docker
- `Dockerfile` and `nginx.conf` are provided for containerized static hosting.

## Usage
1. Open the **Calculator** tab.
2. Enter slots/poles or switch to schema mode.
3. Press **Calculate**.
4. Review winding output, KgV/LCM, winding factor, and engineering blocks.
5. Optionally adjust advanced magnet inputs.
6. Save to history, compare schemes, or export/share results.

## Supabase Setup (Optional)
Supabase is optional. Guest mode works without backend services.

1. Create a Supabase project.
2. Apply [`supabase/schema.sql`](./supabase/schema.sql).
3. Configure public client values in `index.html`:
```html
window.MotorProductConfig = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_PUBLIC_ANON_KEY"
};
```
4. `supabaseAnonKey` is expected to be public in browser apps. Never use a service-role key in frontend code.

## PWA Notes
- Supports install mode (`standalone`) with offline shell caching via `sw.js`.
- After updating shell metadata/icons, trigger an app update once so cached shell assets refresh.

## Tech Stack
- Vanilla JavaScript, HTML, CSS
- PWA (manifest + service worker)
- Optional Supabase (Auth + Postgres)
- Stripe-ready frontend hooks (billing placeholders)

## Project Structure
```text
index.html
bewicklungsrechner_xl_style.css
bewicklungsrechner_xl_script.js
icons/
js/
  product/
  ui/
supabase/
  schema.sql
tests/
  check-calculator.js
```

## Roadmap
- Server-side Stripe subscription verification
- Production-grade account/profile settings
- Expanded PRO entitlement checks
- Additional analytics and retention tooling

## Releases
- Changelog: [`CHANGELOG.md`](./CHANGELOG.md)
- GitHub metadata and first-release draft: [`docs/github-metadata.md`](./docs/github-metadata.md)
- Use semantic versioning for user-visible and deployment-relevant changes.

## License
No final license text is committed yet.
Before publishing a formal open-source release, choose a license and add a root `LICENSE` file.
See [`LICENSE-CHOICE.md`](./LICENSE-CHOICE.md).
