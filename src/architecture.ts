// In-app Architecture / "How it works" modal config (ADR-0058) for the Faena hub.
// Passed to <AppShell config={{ ...config, architecture }}>. The shell (>= 0.2.0) shows an
// ⓘ header button that opens the modal. Each tab pairs one hand-authored THEMED SVG
// (public/svg/*, every colour a shell CSS variable, so it repaints with the active
// light/dark theme when the shell fetches + inlines it) with a bilingual EN/ES body.
//
// The hub is special: it ships NO models or data of its own. So this modal is honest about
// what the hub IS (a data-driven launcher) and IS NOT (an analytics app), and it documents
// the one guarantee it makes: the "live" status gate.
import type { ArchitectureConfig } from '@fasl-work/caos-app-shell';

export const architecture: ArchitectureConfig = {
  title_en: 'Architecture / How the hub works',
  title_es: 'Arquitectura / Cómo funciona el hub',
  tabs: [
    {
      id: 'data-driven',
      en: 'Data-driven',
      es: 'Guiado por datos',
      svg: 'svg/01-data-driven.svg',
      body_en:
        'The Faena hub is a launcher, not an analytics app: it renders nothing hard-coded. Everything you see is a ' +
        'pure function of three JSON files. registry.json holds the 39 apps (name, one-liner, status, stage, ' +
        'solution type, links); stages.json holds the 13 value-chain stages in process order; solutionTypes.json ' +
        'holds the 8 facets (colour + icon). lib/catalog.ts joins and groups them at load and derives every number.\n\n' +
        'Two views come out of the same data: the value-chain lanes (one swimlane per stage, collapsed by default, ' +
        'tiles coloured by facet, filtered in place by the search box and the facet/status chips) and the coverage ' +
        'matrix (stage x solution-type counts, where a cell narrows the catalog to that stage and facet). The hero ' +
        'counts recompute from the rows, so they can never drift from the catalog.',
      body_es:
        'El hub Faena es un lanzador, no una app de analítica: no renderiza nada fijo en código. Todo lo que ves es ' +
        'una función pura de tres archivos JSON. registry.json contiene las 39 apps (nombre, resumen, estado, etapa, ' +
        'tipo de solución, enlaces); stages.json las 13 etapas de la cadena de valor en orden de proceso; ' +
        'solutionTypes.json los 8 facetas (color + icono). lib/catalog.ts los une y agrupa al cargar y deriva cada ' +
        'número.\n\n' +
        'Dos vistas salen de los mismos datos: los carriles de la cadena de valor (un swimlane por etapa, colapsados ' +
        'por defecto, fichas coloreadas por faceta, filtradas en el sitio por el buscador y los chips de faceta/estado) ' +
        'y la matriz de cobertura (conteos etapa x tipo-de-solución, donde una celda acota el catálogo a esa etapa y ' +
        'faceta). Los conteos del encabezado se recomputan desde las filas, así que nunca divergen del catálogo.',
    },
    {
      id: 'hub-satellites',
      en: 'Hub and satellites',
      es: 'Hub y satélites',
      svg: 'svg/02-hub-satellites.svg',
      body_en:
        'Faena is a hub, not a monolith. Each app is its own repository and its own independent deployment on GitHub ' +
        'Pages under *.fasl-work.com; the hub only indexes them and deep-links each one. There is no shared runtime ' +
        'between apps. The two shared pieces are infrastructure, not code an app calls at runtime: the app shell ' +
        '(@fasl-work/caos-app-shell, which gives every app the same header, footer, theme and language toggles, and ' +
        'the ⓘ modal you are reading), and a provenance data vault (manifests only, no runtime).\n\n' +
        'Because the coupling is this loose, moving, re-deploying or retiring any app never touches the hub code: it ' +
        'changes exactly one row in registry.json. The hub renders whatever the registry says, and the crawlable ' +
        'no-JS surface and the JSON-LD are generated from that same registry at build time.',
      body_es:
        'Faena es un hub, no un monolito. Cada app es su propio repositorio y su propio despliegue independiente en ' +
        'GitHub Pages bajo *.fasl-work.com; el hub solo las indexa y enlaza en profundidad a cada una. No hay runtime ' +
        'compartido entre apps. Las dos piezas comunes son infraestructura, no código que una app invoque en runtime: ' +
        'el app shell (@fasl-work/caos-app-shell, que da a cada app el mismo encabezado, pie, tema y toggles de idioma, ' +
        'y el modal ⓘ que estás leyendo), y una bóveda de datos de procedencia (solo manifests, sin runtime).\n\n' +
        'Como el acoplamiento es tan débil, mover, redeployar o retirar cualquier app nunca toca el código del hub: ' +
        'cambia exactamente una fila en registry.json. El hub renderiza lo que diga el registro, y la superficie ' +
        'rastreable sin JS y el JSON-LD se generan desde ese mismo registro en tiempo de build.',
    },
    {
      id: 'live-gate',
      en: 'Curated vs derived, and the "live" gate',
      es: 'Curado vs derivado, y la puerta "live"',
      svg: 'svg/03-editorial-vs-derived.svg',
      body_en:
        'A tile carries two kinds of fields. Editorial fields are typed by hand in registry.json and reviewed: name, ' +
        'one-liner, stage, solution type, the featured flag, the links, and the dataVerdict grade (GREEN / YELLOW / ' +
        'RED) with its note. They are claims the author stands behind, never machine-invented. Derived views are ' +
        'computed by catalog.ts: the counts, the lanes, the matrix, the featured row, the filters. No total is kept ' +
        'by hand.\n\n' +
        'The status field is governed by an at-bar gate. planned is a roadmap tile (no repo or URL yet). building ' +
        'means the app is deployed and openable, but has NOT yet passed its at-bar review. live is granted only when ' +
        'the app clears the RotorVitals quality bar: a real-data lane, the full method ladder, deep bilingual docs, ' +
        'and honest claims. So a "live" dot is a promise the app was audited, not merely that it answers a URL. That ' +
        'is the single editorial guarantee the hub makes, and it is why most deployed apps here still read "building".',
      body_es:
        'Una ficha lleva dos tipos de campos. Los campos editoriales se escriben a mano en registry.json y se revisan: ' +
        'nombre, resumen, etapa, tipo de solución, la marca de destacado, los enlaces y el grado dataVerdict ' +
        '(GREEN / YELLOW / RED) con su nota. Son afirmaciones que el autor respalda, nunca inventadas por la máquina. ' +
        'Las vistas derivadas las computa catalog.ts: los conteos, los carriles, la matriz, la fila de destacadas, los ' +
        'filtros. Ningún total se mantiene a mano.\n\n' +
        'El campo estado lo gobierna una puerta at-bar. planned es una ficha de hoja de ruta (aún sin repo ni URL). ' +
        'building significa que la app está desplegada y se puede abrir, pero NO ha pasado su revisión at-bar. live se ' +
        'otorga solo cuando la app supera el estándar de calidad de RotorVitals: un carril de datos reales, la escalera ' +
        'completa de métodos, documentación bilingüe profunda y afirmaciones honestas. Así, un punto "live" es una ' +
        'promesa de que la app fue auditada, no solo de que responde a una URL. Esa es la única garantía editorial que ' +
        'hace el hub, y por eso la mayoría de las apps desplegadas aquí aún dicen "building".',
    },
  ],
};
