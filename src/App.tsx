import { useMemo, useState, type CSSProperties } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { useShellLang, type Lang } from '@fasl-work/caos-app-shell';
import { APPS, FACETS, facetById, featured, lanes, matrixCounts, stats, type App as AppT, type Facet, type Stage } from './lib/catalog';
import { facetIcons } from './lib/icons';

const UI = {
  en: {
    tagline: 'The mining-analytics works — one yard, many tools.',
    intro:
      'Open, free, no login. Every tool is a real, documented suite — multiple methods over real datasets or validated synthetics, with a live interactive view. Not toy demos.',
    apps: 'apps', live: 'Live', building: 'Building', planned: 'Planned',
    search: 'Search apps…', solution: 'Solution', status: 'Status', clear: 'Clear',
    chain: 'Value chain', matrix: 'Matrix', featured: 'Featured', open: 'Open', try: 'Try', repo: 'repo',
    matrixHint: 'Coverage map — rows are value-chain stages, columns are solution types. Click a cell to filter.',
    empty: 'No apps match your filters.', data: 'data',
  },
  es: {
    tagline: 'La faena de la analítica minera — un patio, muchas herramientas.',
    intro:
      'Abierto, gratis, sin login. Cada herramienta es una suite real y documentada — múltiples métodos sobre datasets reales o sintéticos validados, con una vista interactiva en vivo. No son demos de juguete.',
    apps: 'apps', live: 'En vivo', building: 'En desarrollo', planned: 'Planificada',
    search: 'Buscar apps…', solution: 'Solución', status: 'Estado', clear: 'Limpiar',
    chain: 'Cadena de valor', matrix: 'Matriz', featured: 'Destacadas', open: 'Abrir', try: 'Probar', repo: 'repo',
    matrixHint: 'Mapa de cobertura — filas: etapas de la cadena de valor, columnas: tipos de solución. Clic en una celda para filtrar.',
    empty: 'Ninguna app coincide con los filtros.', data: 'datos',
  },
} as const;

const stageLabel = (s: Stage, l: Lang) => (l === 'es' ? s.labelES : s.labelEN);
const facetLabel = (f: Facet, l: Lang) => (l === 'es' ? f.labelES : f.labelEN);

function FacetIcon({ id, size = 18 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: facetIcons[id] ?? '' }} />
  );
}

function Tile({ app, lang }: { app: AppT; lang: Lang }) {
  const t = UI[lang];
  const facet = facetById[app.solutionType];
  const color = facet?.color ?? 'var(--color-accent)';
  const isLive = app.status === 'live' && app.links.app;
  // A building app that is already DEPLOYED (has a live app URL) is still openable so you can navigate from the hub
  // and try it; only 'planned' (no deployed URL) stays disabled. The status dot keeps the live/building distinction.
  const canOpen = !!app.links.app && app.status !== 'planned';
  return (
    <article className="tile" data-status={app.status} style={{ '--c': color } as CSSProperties}>
      <div className="tile-top">
        <span className="tile-ic" style={{ color }}><FacetIcon id={app.solutionType} /></span>
        <span className="tile-name">{app.name}</span>
        <span className={`tile-dot ${app.status}`} title={t[app.status]} />
      </div>
      <p className="tile-one">{app.oneliner}</p>
      <div className="tile-meta">
        <span className="badge" title={app.dataVerdict.note}><span className={`gdot ${app.dataVerdict.grade}`} />{t.data}</span>
        {app.adr && <span className="badge mono">{app.adr.replace('ADR-00', 'ADR-')}</span>}
      </div>
      <div className="tile-actions">
        {canOpen ? (
          <a className="btn primary tile-open" href={app.links.app!}>{isLive ? t.open : t.try}</a>
        ) : (
          <span className="btn tile-open" aria-disabled="true">{t.planned}</span>
        )}
        {app.status !== 'planned' && app.links.repo && (
          <a className="tile-repo" href={app.links.repo} target="_blank" rel="noreferrer noopener">{t.repo} ↗</a>
        )}
      </div>
    </article>
  );
}

export function Catalog() {
  const lang = useShellLang();
  const t = UI[lang];
  const [facets, setFacets] = useState<Set<string>>(new Set());
  const [statuses, setStatuses] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'chain' | 'matrix'>('chain');
  // Lanes (value-chain categories) start COLLAPSED — the landing is a clean overview; expand on click.
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(lanes().map((l) => l.stage.id)));

  const match = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (a: AppT) =>
      (facets.size === 0 || facets.has(a.solutionType)) &&
      (statuses.size === 0 || statuses.has(a.status)) &&
      (q === '' || `${a.name} ${a.oneliner}`.toLowerCase().includes(q));
  }, [facets, statuses, query]);

  const laneList = useMemo(() => lanes().map((l) => ({ stage: l.stage, apps: l.apps.filter(match) })).filter((l) => l.apps.length > 0), [match]);
  const feat = useMemo(() => featured().filter(match), [match]);
  const m = useMemo(() => matrixCounts(), []);
  const anyFilter = facets.size > 0 || statuses.size > 0 || query.trim() !== '';

  const toggle = (set: Set<string>, key: string, fn: (s: Set<string>) => void) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    fn(next);
  };

  const matrixRows = STAGES_WITH_APPS;

  return (
    <div className="page-body">
      <section className="hub-hero">
        <h1>Faena</h1>
        <p className="hub-tagline">{t.tagline}</p>
        <p className="lede">{t.intro}</p>
        <div className="hub-stats">
          <span><b>{stats.total}</b> {t.apps}</span>
          <span><b>{stats.live}</b> · {t.live}</span>
          <span><b>{stats.building}</b> · {t.building}</span>
          <span><b>{stats.planned}</b> · {t.planned}</span>
        </div>
      </section>

      <div className="hub-toolbar">
        <div className="hub-search">
          <Search size={16} aria-hidden="true" />
          <input type="search" placeholder={t.search} value={query} onChange={(e) => setQuery(e.target.value)} aria-label={t.search} />
        </div>
        <div className="view-toggle">
          <button className={view === 'chain' ? 'on' : ''} onClick={() => setView('chain')}>{t.chain}</button>
          <button className={view === 'matrix' ? 'on' : ''} onClick={() => setView('matrix')}>{t.matrix}</button>
        </div>
      </div>
      <div className="hub-filters">
        <span className="flabel">{t.solution}</span>
        {FACETS.map((f) => (
          <button key={f.id} className="fchip" aria-pressed={facets.has(f.id)} style={{ '--c': f.color } as CSSProperties} onClick={() => toggle(facets, f.id, setFacets)} title={facetLabel(f, lang)}>
            <span className="fdot" /><span className="fic" style={{ color: facets.has(f.id) ? 'inherit' : f.color }}><FacetIcon id={f.id} size={13} /></span>{facetLabel(f, lang)}
          </button>
        ))}
        <span className="flabel">{t.status}</span>
        {(['live', 'building', 'planned'] as const).map((s) => (
          <button key={s} className={`fchip st-${s}`} aria-pressed={statuses.has(s)} onClick={() => toggle(statuses, s, setStatuses)}>
            <span className="fdot" />{t[s]}
          </button>
        ))}
        {anyFilter && (
          <button className="fclear" onClick={() => { setFacets(new Set()); setStatuses(new Set()); setQuery(''); }}>
            <X size={13} /> {t.clear}
          </button>
        )}
      </div>

      {view === 'chain' ? (
        <div className="lanes-view">
          {feat.length > 0 && (
            <>
              <div className="hub-section-title">★ {t.featured}</div>
              <div className="tile-grid">{feat.map((a) => <Tile key={`f-${a.slug}`} app={a} lang={lang} />)}</div>
            </>
          )}
          {laneList.map((l, i) => {
            const open = anyFilter || !collapsed.has(l.stage.id);
            return (
              <section className="lane" key={l.stage.id}>
                <button className="lane-head" onClick={() => toggle(collapsed, l.stage.id, setCollapsed)} aria-expanded={open}>
                  <span className="lane-num">{i + 1}</span>
                  <h2>{stageLabel(l.stage, lang)}</h2>
                  <span className="lane-count">({l.apps.length})</span>
                  <ChevronDown size={16} className={`lane-chev ${open ? '' : 'closed'}`} />
                </button>
                {open && <div className="tile-grid">{l.apps.map((a) => <Tile key={a.slug} app={a} lang={lang} />)}</div>}
              </section>
            );
          })}
          {laneList.length === 0 && <p className="hub-empty">{t.empty}</p>}
        </div>
      ) : (
        <div className="matrix-view">
          <p className="hint">{t.matrixHint}</p>
          <div className="matrix-scroll">
            <table className="matrix">
              <thead>
                <tr>
                  <th />
                  {FACETS.map((f) => <th key={f.id} title={facetLabel(f, lang)} style={{ color: f.color }}><FacetIcon id={f.id} size={15} /></th>)}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map((s, i) => (
                  <tr key={s.id}>
                    <th className="row-h">{i + 1} · {stageLabel(s, lang)}</th>
                    {FACETS.map((f) => {
                      const n = m[s.id][f.id];
                      return n > 0 ? (
                        <td key={f.id} className="has" style={{ color: f.color }} onClick={() => { setView('chain'); setFacets(new Set([f.id])); }}>{n}</td>
                      ) : <td key={f.id} className="zero">·</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// stages that contain at least one app (for the matrix rows)
const STAGES_WITH_APPS: Stage[] = (() => {
  const present = new Set(APPS.map((a) => a.stage));
  return lanes().map((l) => l.stage).filter((s) => present.has(s.id));
})();
