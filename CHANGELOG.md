# Changelog

All notable changes to this product. Format: `X.XX.XXX` (display, see the workspace `versioning.md`); stays `0.x` while pre-1.0. Tag every release.

## [0.05.001] · 2026-08-18

### Changed
- Registry: **StockTwin** and **FrothSeg** flipped `building` -> `live`, per Felipe's decision that a
  product with published content is live. Both have published LinkedIn content recorded in
  `difusion/_products/` (StockTwin 2026-08-04 stock-characterization, FrothSeg 2026-08-04
  domain-transfer), alongside the four already live.
- Live members now 6: RotorVitals, DispatchLab, ChancaDEM, ChargeCascade, StockTwin, FrothSeg.
  Building 8, planned 28.

## [0.05.000] · 2026-08-05

### Added
- **TruckVitals** (load-haul / cm), planned. Onset detection and prognosis on haul-truck fleet telemetry.
  The registry had no product for truck vitals: the five asset-health entries are all single-channel
  rotating-machinery signal analysis (PrognosRUL on bearing benchmarks, FractalWear and GearCepstrum on
  vibration, MotorMCSA explicitly on FIXED-PLANT motors), and AssetOntoTwin names haul trucks but is an
  IOF/BFO knowledge graph for FMEA reasoning, not a monitor.

  What makes it a distinct product rather than a RotorVitals feature: every truck variable moves with
  payload, grade, gear and ambient, so a change detector on raw channels detects the operating cycle
  rather than a fault. Regime segmentation comes FIRST and detection runs on the within-regime residual.
  RotorVitals never faces this because its benchmarks are constant-load.

  Plan: `plans/truckvitals/plan.md`. Research: `wip/truckvitals/research-2026-08-05.md` (real anchor is
  SCANIA Component X, DOI 10.5878/jvb5-d390, CC BY 4.0, 33,641 vehicles with 5-class
  time-window-before-failure labels).

## [0.04.005] · 2026-07-30

### Fixed
- **Corrected a false statement in the 0.04.004 entry.** It said `v0.04.003` "should be treated as not
  corresponding to a release". That is wrong. `v0.04.003` tags commit `bf29a51`, a real release: PR #61,
  the registry status correction to 3 live / 8 building plus the MIT LICENSE swap. What actually happened is
  that the release shipped without bumping `VERSION`, `package.json` or the CHANGELOG, so the tag was its
  only record. The 0.04.003 entry below is reconstructed from that commit rather than left as a gap.
- A line-wide sweep found this is the normal case, not an isolated slip: 79 tags across 9 CAOS repos point
  at commits declaring a different version. Guarded now by
  `tools/version-audit/check_version_coherence.py` in CAOS_MANAGE.

## [0.04.004] · 2026-07-29

### Changed
- Registry: **ChargeCascade** status `building` -> `live`. Felipe validated ChargeCascade and DispatchLab
  as ready apps on 2026-07-29, superseding ChargeCascade's 2026-07-25 `building` decision, which predated
  the v0.29-v0.33 work (ADR-0070 focus view, live DEM for real surveyed mills, ADR-0071 layout floor).
  Four members are now validated ready: RotorVitals, ChancaDEM, DispatchLab (v0.23.001) and ChargeCascade
  (v0.33.000). `live` continues to mean validated at-bar by Felipe, not merely deployed and reachable.

### Note on the version number
- This release is `0.04.004`, not `0.04.003`, because `v0.04.003` was already tagged. See the `0.04.003`
  entry below, reconstructed after the fact: it was a real release whose `VERSION`, `package.json` and
  CHANGELOG were never bumped, so the tag was the only record of it.

## [0.04.003] · 2026-07-25

> RECONSTRUCTED 2026-07-30. This release shipped without a CHANGELOG entry or a version bump: `VERSION`,
> `package.json` and this file all stayed at `0.04.002`, so the tag `v0.04.003` on commit `bf29a51` was the
> only record that it happened. Reconstructed from that commit's diff rather than left as a gap.

### Changed
- Registry: Felipe's status decision. Only RotorVitals, DispatchLab and ChancaDEM are `live`; the other 8
  deployed products go back to `building`. Deployed and reachable is not the same as validated at-bar.
- `LICENSE` replaced with MIT, matching the CAOS line standard.

## [0.04.002] · 2026-07-07

### Changed
- Registry: ChancaDEM (v0.05.000), ProspectMap (v0.07.000), FragmentIQ (v0.08.000) and CoreLog
  (v0.08.000) flipped `building -> live` after each shipped its real-data Source lane and passed
  at-bar review. Live members now: 9 (RotorVitals, ChargeCascade, CutoffGrade, PitForge, DispatchLab,
  ChancaDEM, ProspectMap, FragmentIQ, CoreLog). TailWatch stays `building` pending a real
  mine/tailings AOI (its current real sample is a volcanic caldera). Counts: 9 live, 1 building, 29 planned.

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
