// Single source of truth for the hub: the registry + the two taxonomy axes.
// The whole landing is a pure function of these three JSON files (see README).
import registry from '../data/registry.json';
import stagesData from '../data/stages.json';
import facetsData from '../data/solutionTypes.json';

export type Facet = {
  id: string;
  labelEN: string;
  labelES: string;
  color: string;
  icon: string;
};

export type Stage = {
  id: string;
  order: number;
  labelEN: string;
  labelES: string;
};

export type AppStatus = 'live' | 'building' | 'planned';

export type App = {
  slug: string;
  name: string;
  oneliner: string;
  stage: string;
  solutionType: string;
  adr: string;
  status: AppStatus;
  tier: 'flagship' | 'core' | 'extended';
  buildWave: number | null;
  dataVerdict: { grade: string; note: string };
  links: { app: string | null; repo: string | null; docs: string | null };
  featured: boolean;
  order: number;
};

export const STAGES: Stage[] = (stagesData as Stage[]).slice().sort((a, b) => a.order - b.order);
export const FACETS: Facet[] = facetsData as Facet[];
export const APPS: App[] = registry as App[];

export const facetById: Record<string, Facet> = Object.fromEntries(FACETS.map((f) => [f.id, f]));
export const stageById: Record<string, Stage> = Object.fromEntries(STAGES.map((s) => [s.id, s]));

/** Stages that actually contain at least one app, in value-chain order, each with its apps. */
export function lanes(): { stage: Stage; apps: App[] }[] {
  return STAGES.map((stage) => ({
    stage,
    apps: APPS.filter((a) => a.stage === stage.id).sort((a, b) => a.order - b.order),
  })).filter((l) => l.apps.length > 0);
}

/** Featured apps (the ★ row), flagship tier, by build wave then name. */
export function featured(): App[] {
  return APPS.filter((a) => a.featured).sort(
    (a, b) => (a.buildWave ?? 99) - (b.buildWave ?? 99) || a.name.localeCompare(b.name),
  );
}

/** count[stageId][facetId] for the opt-in matrix view. */
export function matrixCounts(): Record<string, Record<string, number>> {
  const m: Record<string, Record<string, number>> = {};
  for (const s of STAGES) m[s.id] = Object.fromEntries(FACETS.map((f) => [f.id, 0]));
  for (const a of APPS) if (m[a.stage]) m[a.stage][a.solutionType] = (m[a.stage][a.solutionType] ?? 0) + 1;
  return m;
}

export const stats = {
  total: APPS.length,
  live: APPS.filter((a) => a.status === 'live').length,
  building: APPS.filter((a) => a.status === 'building').length,
  planned: APPS.filter((a) => a.status === 'planned').length,
};
