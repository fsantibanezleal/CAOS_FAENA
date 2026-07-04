import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

interface CatalogApp {
  slug: string;
  name: string;
  oneliner: string;
  status: 'live' | 'building' | 'planned';
  stage: string;
  solutionType: string;
  links: { app?: string; repo?: string; docs?: string };
}

const HUB_URL = 'https://faena.fasl-work.com/';
const HUB_DESC =
  'Open, free launcher for a family of mining-analytics web apps. Each shipped app runs on a named ' +
  'real dataset or a validated synthetic, with deep documentation and a live interactive view.';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// live first, then building, then planned, the crawlable list leads with what actually ships.
const rank = (s: CatalogApp['status']) => (s === 'live' ? 0 : s === 'building' ? 1 : 2);

// Read the catalog at build time and ship the hub as a crawlable, no-JS evidence surface:
//   1. a <noscript> catalog with real <a> links, so search crawlers and JS-disabled clients still
//      see every app (the React SPA renders into an empty #root, invisible to a no-JS fetch);
//   2. a JSON-LD ItemList of the shipped apps as SoftwareApplication nodes (structured data).
// Both are inert when JS runs, the SPA hydrates #root as before. This makes the hub findable
// without migrating the framework (issue #41: "the hub becomes the crawlable evidence surface").
function crawlableCatalog(): Plugin {
  return {
    name: 'faena-crawlable-catalog',
    transformIndexHtml() {
      const path = fileURLToPath(new URL('./src/data/registry.json', import.meta.url));
      const apps = (JSON.parse(readFileSync(path, 'utf8')) as CatalogApp[])
        .slice()
        .sort((a, b) => rank(a.status) - rank(b.status) || a.name.localeCompare(b.name));

      const rows = apps
        .map((a) => {
          const name = a.links.app ? `<a href="${esc(a.links.app)}">${esc(a.name)}</a>` : esc(a.name);
          const repo = a.links.repo ? ` &middot; <a href="${esc(a.links.repo)}" rel="noopener">repo</a>` : '';
          return `<li><strong>${name}</strong> <em>[${esc(a.status)}]</em> &mdash; ${esc(a.oneliner)}${repo}</li>`;
        })
        .join('');

      const noscript =
        '<section style="max-width:64rem;margin:2rem auto;padding:0 1rem;' +
        'font-family:system-ui,-apple-system,sans-serif;line-height:1.55;color:#111">' +
        '<h1>Faena &mdash; Mining Analytics Hub</h1>' +
        `<p>${esc(HUB_DESC)}</p>` +
        '<p><em>This catalog needs no JavaScript. Enable JavaScript for the interactive hub.</em></p>' +
        `<ul>${rows}</ul></section>`;

      const ld = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Faena, Mining Analytics Hub',
        description: HUB_DESC,
        url: HUB_URL,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: apps.filter((a) => a.links.app).length,
          itemListElement: apps
            .filter((a) => a.links.app)
            .map((a, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'SoftwareApplication',
                name: a.name,
                description: a.oneliner,
                applicationCategory: 'BusinessApplication',
                operatingSystem: 'Web',
                isAccessibleForFree: true,
                url: a.links.app,
              },
            })),
        },
      };
      // guard against a stray "</script>" ever closing the JSON-LD block early.
      const ldJson = JSON.stringify(ld).replace(/</g, '\\u003c');

      return {
        tags: [
          { tag: 'script', attrs: { type: 'application/ld+json' }, children: ldJson, injectTo: 'head' },
          { tag: 'noscript', children: noscript, injectTo: 'body' },
        ],
      };
    },
  };
}

// Faena hub, static SPA on GitHub Pages at faena.fasl-work.com (custom domain → base '/').
export default defineConfig({
  base: '/',
  plugins: [react(), crawlableCatalog()],
  build: { target: 'es2022', outDir: 'dist' },
});
