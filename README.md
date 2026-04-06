# MotorLab

## Description
MotorLab is a browser-based electric motor design tool with BLDC winding scheme calculation, winding visualization, winding-factor tooling, magnet width advisor, history, presets, and mobile-first PWA support.

## Features
- Winding scheme calculator (slots/poles and manual schema modes)
- Winding animation and enhanced visualization modes
- Magnet advisor (pole pitch, coverage ratio, width range, warnings)
- Scheme comparison and engineering assessment panel
- Presets, save/load history, JSON/CSV export, share link
- PWA install + offline shell (service worker)
- Guest mode and optional Supabase-based auth/cloud project sync

## Demo
- Placeholder: `https://your-demo-url.example.com`

## Installation
### Local static run
```bash
python3 -m http.server 8080
```
Open: `http://localhost:8080`

### Docker
```bash
docker build -t motor-web .
docker run -p 8080:80 motor-web
```
Open: `http://localhost:8080`

## Usage
1. Open **Calculator** tab.
2. Enter slots/poles or switch to schema mode.
3. Press **Calculate**.
4. Review winding output, KgV/LCM, winding factor, and engineering blocks.
5. Optionally use advanced panel for magnet inputs and additional checks.
6. Save to history or export current result.

## Supabase Setup (Optional)
Auth/cloud project sync is optional. Guest mode works without backend.

1. Create a Supabase project.
2. Apply SQL schema from [`supabase/schema.sql`](./supabase/schema.sql).
3. Set credentials in `index.html`:
```html
window.MotorProductConfig = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_PUBLIC_ANON_KEY"
};
```

## Tech Stack
- Vanilla JavaScript, HTML, CSS
- PWA (manifest + service worker)
- Optional Supabase (Auth + Postgres)
- Stripe-ready frontend hooks (billing module placeholders)

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
- Complete server-side Stripe subscription verification
- Production-grade account/profile management
- Expanded PRO feature matrix and entitlement checks
- Additional analytics and retention tooling

## License
License is not finalized yet.
See [`LICENSE-CHOICE.md`](./LICENSE-CHOICE.md) and add a final `LICENSE` file (MIT or Apache-2.0).
