# Changelog

All notable changes to this project should be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Notes
- Work in progress after `1.1.0-beta`.

## [1.1.0-beta] - 2026-04-07
### Added
- Unified release prep package for GitHub publication (`README`, metadata guidance, and beta release draft).
- Improved help-table click behavior with safer scheme parsing and fallback handling.

### Changed
- UI polish pass for dark theme contrast, advanced-mode controls, and mobile/desktop card stability.
- Version metadata aligned to `1.1.0-beta` for analytics/build reporting.

### Fixed
- Table-scheme application no longer silently collapses different valid schemes into the same displayed pattern.
- Multiple dark-theme visibility issues (white surfaces/low-contrast labels) addressed.

### Notes
- This is a **beta** release intended for public testing and fast feedback.
- Core winding calculation logic remains intentionally preserved.

## [1.0.3] - 2026-04-06
### Added
- Public repository hygiene baseline (CI, editor config, ignore rules, license-choice guidance).
- Supabase schema and frontend auth/cloud-project hooks as optional modules.

### Changed
- README polished for public GitHub presentation and release clarity.
- License choice guidance clarified for first formal release preparation.
- Added GitHub metadata and first-release draft guidance in `docs/github-metadata.md`.
- Product branding standardized to **MotorLab** in app metadata and repository-facing docs.
- PWA icon pack and shell metadata synchronized for install/update consistency.

### Notes
- This is a production-candidate release focused on stability and repository readiness.
- Core winding calculation logic is intentionally preserved.
