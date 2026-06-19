// EN-first i18n (ADR-0011). EN is the source of truth; ES mirrors it.
export const languages = { en: 'English', es: 'Español' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.tagline': 'The mining-analytics works — one yard, many tools.',
    'site.intro':
      'Open, free, no login. Every tool stands on a named real dataset or a validated synthetic — never on data we do not have. Each app is a self-contained, documented product: theory, method, experiments, and a live demo.',
    'nav.about': 'About',
    'nav.data': 'Data-realism policy',
    'nav.github': 'GitHub',
    'nav.portfolio': 'Portfolio',
    'search.placeholder': 'Search apps…',
    'filter.solution': 'Solution',
    'filter.status': 'Status',
    'filter.clear': 'Clear filters',
    'view.lanes': 'Value chain',
    'view.matrix': 'Matrix',
    'status.live': 'Live',
    'status.building': 'Building',
    'status.planned': 'Planned',
    'featured.title': 'Featured',
    'tile.open': 'Open',
    'tile.building': 'Building',
    'tile.planned': 'Planned',
    'tile.repo': 'repo',
    'data.real': 'Real dataset',
    'data.synthetic': 'Validated synthetic',
    'matrix.hint': 'Coverage map — rows are value-chain stages, columns are solution types. Click a cell to filter.',
    'count.apps': 'apps',
    'count.of': 'of',
    'footer.built': 'Built and maintained by Felipe Santibáñez-Leal.',
    'footer.note': 'A public showcase of mining-analytics capability. Nothing proprietary.',
  },
  es: {
    'site.tagline': 'La faena de la analítica minera — un patio, muchas herramientas.',
    'site.intro':
      'Abierto, gratis, sin login. Cada herramienta se apoya en un dataset real con nombre o un sintético validado — nunca en datos que no tenemos. Cada app es un producto autocontenido y documentado: teoría, método, experimentos y un demo en vivo.',
    'nav.about': 'Acerca de',
    'nav.data': 'Política de realismo de datos',
    'nav.github': 'GitHub',
    'nav.portfolio': 'Portafolio',
    'search.placeholder': 'Buscar apps…',
    'filter.solution': 'Solución',
    'filter.status': 'Estado',
    'filter.clear': 'Limpiar filtros',
    'view.lanes': 'Cadena de valor',
    'view.matrix': 'Matriz',
    'status.live': 'En vivo',
    'status.building': 'En desarrollo',
    'status.planned': 'Planificada',
    'featured.title': 'Destacadas',
    'tile.open': 'Abrir',
    'tile.building': 'En desarrollo',
    'tile.planned': 'Planificada',
    'tile.repo': 'repo',
    'data.real': 'Dataset real',
    'data.synthetic': 'Sintético validado',
    'matrix.hint': 'Mapa de cobertura — filas: etapas de la cadena de valor, columnas: tipos de solución. Clic en una celda para filtrar.',
    'count.apps': 'apps',
    'count.of': 'de',
    'footer.built': 'Construido y mantenido por Felipe Santibáñez-Leal.',
    'footer.note': 'Una muestra pública de capacidades en analítica minera. Nada propietario.',
  },
} as const;

export function useT(lang: Lang) {
  return function t(key: keyof (typeof ui)['en']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui.en as Record<string, string>)[key] ?? key;
  };
}

export function stageLabel(s: { labelEN: string; labelES: string }, lang: Lang) {
  return lang === 'es' ? s.labelES : s.labelEN;
}
export function facetLabel(f: { labelEN: string; labelES: string }, lang: Lang) {
  return lang === 'es' ? f.labelES : f.labelEN;
}
