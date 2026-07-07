# Changelog

All notable changes to this product. Format: `X.XX.XXX` (display, see the workspace `versioning.md`); stays `0.x` while pre-1.0. Tag every release.

## [0.04.001] · 2026-07-07

### Changed
- Registry: PitForge (v0.08.002) and DispatchLab (v0.13.002) flipped `building -> live` after passing
  their at-bar close-out and review. Live members now: RotorVitals, ChargeCascade, CutoffGrade,
  PitForge, DispatchLab (5 live, 5 building, 29 planned).

## [0.04.000] · 2026-07-07

### Added
- In-app Architecture / "How the hub works" modal (ADR-0058): an ⓘ header button opens a 3-tab modal
  (Data-driven, Hub and satellites, Curated vs derived + the "live" gate), each pairing a hand-authored
  theme-aware SVG (`public/svg/01-03`) with a bilingual EN/ES body. Screenshot-verified light + dark.
- Footer provenance + disclaimer (ADR-0016 §2): the hub is a static launcher with no backend or data of
  its own; tile states are curated and "live" is granted only after an app passes its at-bar review.

## [0.03.001] · 2026-07-04

### Changed
- Content standards (ADR-0067): removed every em-dash from tracked content (replaced with commas). No
  behaviour change. Added `scripts/check_content_standards.py` + a CI `guards` job so the hub cannot
  regress on em-dashes or emojis.

## [0.03.000] · 2026-07-04

### Fixed
- Tile label now echoes the real status when a tile can't be opened: a `building` app without a deployed
  URL yet reads **Building** (matching its status dot), not **Planned**. Previously the disabled action
  button was hard-coded to `Planned`, which would misreport any scaffolded-but-undeployed app (issue #41).

### Added
- Crawlable, no-JS evidence surface: a build-time Vite plugin injects a `<noscript>` catalog (real `<a>`
  links to every app, so search crawlers and JS-disabled clients see the full list) and a JSON-LD
  `CollectionPage` / `ItemList` of the shipped apps as `SoftwareApplication` nodes. The React SPA still
  hydrates `#root`; both artifacts are inert when JS runs. Makes the hub findable without an Astro
  migration (issue #41).

## [0.02.004] · 2026-07-03

### Added
- Adopt the `X.XX.XXX` versioning scheme: a `VERSION` file as the single source of truth, this `CHANGELOG`, and the first git tag. Baseline documenting the current shipped state; later changes are versioned by nature (major/minor/patch).

## [0.02.000] · 2026-06-19

### Changed
- Rebuild the hub on the shared `@fasl-work/caos-app-shell` as a Vite + React single-page app (was Astro): shell header/footer and icon links, EN-default i18n, single landing with catalog swimlanes, facet filters, and the matrix view. (Entry backfilled 2026-07-03 from git history, commit `b14fff7`.)

## [0.01.000] · 2026-06-19

### Added
- First public launcher, built with static Astro: 38 flagship+core apps, value-chain swimlanes, solution-type facet filter, matrix view, i18n EN/ES, light/dark theme, GitHub Pages deploy. (Entry backfilled 2026-07-03 from git history, commit `2c039a2`.)
