# Faena — Mining Analytics Hub

**Faena** is a public, open showcase of mining-analytics capability: a single launcher for a growing
family of independent mining web-apps. Nothing here is proprietary. Each app is a self-contained,
documented product — theory, method, experiments, and a live interactive demo — and every app stands
on a **named real dataset or a validated synthetic**, never on data we do not have.

> *The mining-analytics works — one yard, many tools.* · **faena.fasl-work.com**

This repository is the **hub** itself: a fast, static launcher that indexes every app. The apps live
in their own repositories and run at their own subdomains; the hub never bundles or proxies them — it
only lists them and links out.

## How it's organized

Two axes describe every tool:

- **Value chain (primary):** the stage of the mining process it serves — exploration, mine design,
  drill & blast, load/haul/dispatch, crushing, processing, stockpiling, tailings, geotechnics, asset
  health, economics, logistics. These are the swimlanes on the landing.
- **Solution type (facet):** computer vision · 3D simulation/physics · digital twin/ontology ·
  optimization/OR · condition monitoring/time-series · geospatial/remote sensing ·
  forecasting/econometrics · 3D viz/mine design. Shown as a colored icon and used as a filter.

A tile lights up through its lifecycle — **planned → building → live** — so the roadmap is visible
and each app becomes reachable the moment it ships.

## Stack

- **Astro** (static output) — the hub is a launcher, not an app, so it ships almost no JS and is fully
  crawlable. Deployed to **GitHub Pages** at `faena.fasl-work.com`.
- **i18n** English-first, Spanish second (`/` and `/es/`). **Light/dark** theme (system default + toggle).
- Fully **data-driven** from `src/data/registry.json` + `stages.json` + `solutionTypes.json`. Adding an
  app, a stage, or a solution-type is a data edit — no layout code changes.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → dist/
npm run preview
```

## Add or update an app

Edit `src/data/registry.json` (one record per app: slug, name, oneliner, stage, solutionType, status,
data verdict, links). Flip `status` to `live` and fill `links.app` when an app ships — the tile
activates automatically.

## License & data policy

Public and open. **No secrets, credentials, or proprietary/sensitive data are ever committed here** —
those live only in the private management vault. Datasets used by member apps are free/open (cited) or
robust synthetics generated from published physics; each app documents its own data provenance.

---

Built and maintained by [Felipe Santibáñez-Leal](https://fasl-work.com) · [GitHub](https://github.com/fsantibanezleal)
