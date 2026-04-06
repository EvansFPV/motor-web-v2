# GitHub Metadata Recommendations

Use this file as copy-ready guidance when configuring the public GitHub repository.

## Repository Description
MotorLab is a browser-based BLDC winding and magnet design tool with visualization, engineering checks, PWA support, and optional Supabase cloud sync.

## Website Field
- If deployed: set to your production URL (for example `https://motortool.example.com`).
- If not deployed yet: leave blank until a stable public URL exists.

## Recommended Topics
- `bldc`
- `electric-motor`
- `motor-design`
- `winding`
- `calculator`
- `pwa`
- `supabase`
- `javascript`
- `engineering-tools`
- `offline-first`

## First Release Recommendation

### Title
`v1.0.3 - Public Baseline Release`

### Tag
`v1.0.3`

### Release Notes Draft
```markdown
## MotorLab v1.0.3

First public baseline release of MotorLab.

### Highlights
- Stable winding scheme calculator (slots/poles + schema mode)
- Winding visualization, engineering assessment, and scheme comparison
- Magnet advisor with coverage/width recommendation and warning groups
- Save/load history, presets, JSON/CSV export, and share link
- Mobile-friendly PWA behavior with install/offline shell support
- Optional Supabase auth/cloud project hooks while preserving guest mode

### Repository and Release Readiness
- Public repo hygiene baseline (CI, docs, changelog, deployment configs)
- Supabase schema and optional integration modules included

### Notes
- Core calculation logic is intentionally preserved.
- Supabase setup is optional; guest mode works without backend.
```

## Release Checklist
1. Confirm selected open-source license and commit root `LICENSE` file.
2. Confirm README reflects current production/demo URL state.
3. Create tag `v1.0.3` from the intended release commit.
4. Publish GitHub Release using the notes draft above.
