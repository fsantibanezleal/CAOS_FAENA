# Changelog

All notable changes to this product. Format: `X.XX.XXX` (display, see the workspace `versioning.md`); stays `0.x` while pre-1.0. Tag every release.

## [0.02.004] · 2026-07-03

### Added
- Adopt the `X.XX.XXX` versioning scheme: a `VERSION` file as the single source of truth, this `CHANGELOG`, and the first git tag. Baseline documenting the current shipped state; later changes are versioned by nature (major/minor/patch).

## [0.02.000] · 2026-06-19

### Changed
- Rebuild the hub on the shared `@fasl-work/caos-app-shell` as a Vite + React single-page app (was Astro): shell header/footer and icon links, EN-default i18n, single landing with catalog swimlanes, facet filters, and the matrix view. (Entry backfilled 2026-07-03 from git history, commit `b14fff7`.)

## [0.01.000] · 2026-06-19

### Added
- First public launcher, built with static Astro: 38 flagship+core apps, value-chain swimlanes, solution-type facet filter, matrix view, i18n EN/ES, light/dark theme, GitHub Pages deploy. (Entry backfilled 2026-07-03 from git history, commit `2c039a2`.)
