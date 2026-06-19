// Client-side interactivity for the Faena hub: theme, facet/status filters, search,
// lane collapse, value-chain ↔ matrix view, and matrix-cell drill-down.
// Operates purely on data-* attributes of the server-rendered DOM (no framework).

const root = document.documentElement;

// --- theme toggle (initial theme is set by an inline script in <head>) ---
document.getElementById('theme-toggle')?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try {
    localStorage.setItem('faena-theme', next);
  } catch {
    /* ignore */
  }
});

// --- filter state ---
const activeFacets = new Set<string>();
const activeStatus = new Set<string>();
let query = '';

const $ = <T extends Element>(sel: string) => Array.from(document.querySelectorAll<T>(sel));
const facetChips = $<HTMLButtonElement>('[data-facet-chip]');
const statusChips = $<HTMLButtonElement>('[data-status-chip]');
const tiles = $<HTMLElement>('[data-tile]');
const lanes = $<HTMLElement>('[data-lane]');
const search = document.getElementById('search') as HTMLInputElement | null;
const clearBtn = document.querySelector<HTMLButtonElement>('[data-clear]');
const emptyMsg = document.querySelector<HTMLElement>('[data-empty]');
const featuredWrap = document.querySelector<HTMLElement>('[data-featured]');
const featuredTitle = document.querySelector<HTMLElement>('[data-featured-title]');

function matches(t: HTMLElement): boolean {
  const f = t.dataset.facet ?? '';
  const s = t.dataset.status ?? '';
  const txt = t.dataset.text ?? '';
  if (activeFacets.size && !activeFacets.has(f)) return false;
  if (activeStatus.size && !activeStatus.has(s)) return false;
  if (query && !txt.includes(query)) return false;
  return true;
}

function apply(): void {
  tiles.forEach((t) => {
    t.hidden = !matches(t);
  });
  let visibleInLanes = 0;
  lanes.forEach((lane) => {
    const inLane = Array.from(lane.querySelectorAll<HTMLElement>('[data-tile]'));
    const vis = inLane.filter((t) => !t.hidden).length;
    lane.hidden = vis === 0;
    const c = lane.querySelector('[data-lane-count]');
    if (c) c.textContent = `(${vis})`;
    visibleInLanes += vis;
  });
  if (featuredWrap) {
    const fv = Array.from(featuredWrap.querySelectorAll<HTMLElement>('[data-tile]')).filter((t) => !t.hidden).length;
    featuredWrap.hidden = fv === 0;
    if (featuredTitle) featuredTitle.hidden = fv === 0;
  }
  const anyFilter = activeFacets.size > 0 || activeStatus.size > 0 || query.length > 0;
  if (clearBtn) clearBtn.hidden = !anyFilter;
  if (emptyMsg) emptyMsg.style.display = visibleInLanes === 0 ? 'block' : 'none';
}

facetChips.forEach((c) =>
  c.addEventListener('click', () => {
    const id = c.dataset.facetChip!;
    const on = c.getAttribute('aria-pressed') === 'true';
    c.setAttribute('aria-pressed', on ? 'false' : 'true');
    if (on) activeFacets.delete(id);
    else activeFacets.add(id);
    apply();
  }),
);

statusChips.forEach((c) =>
  c.addEventListener('click', () => {
    const id = c.dataset.statusChip!;
    const on = c.getAttribute('aria-pressed') === 'true';
    c.setAttribute('aria-pressed', on ? 'false' : 'true');
    if (on) activeStatus.delete(id);
    else activeStatus.add(id);
    apply();
  }),
);

search?.addEventListener('input', () => {
  query = (search.value || '').trim().toLowerCase();
  apply();
});

clearBtn?.addEventListener('click', () => {
  activeFacets.clear();
  activeStatus.clear();
  query = '';
  facetChips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
  statusChips.forEach((c) => c.setAttribute('aria-pressed', 'false'));
  if (search) search.value = '';
  apply();
});

// --- lane collapse ---
lanes.forEach((lane) => {
  const head = lane.querySelector('[data-lane-toggle]');
  const toggle = () => {
    lane.dataset.collapsed = lane.dataset.collapsed === 'true' ? 'false' : 'true';
  };
  head?.addEventListener('click', toggle);
  head?.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter' || (e as KeyboardEvent).key === ' ') {
      e.preventDefault();
      toggle();
    }
  });
});

// --- view toggle (value-chain ↔ matrix) ---
const viewBtns = $<HTMLButtonElement>('[data-view]');
const lanesView = document.querySelector<HTMLElement>('.lanes-view');
const matrixView = document.querySelector<HTMLElement>('.matrix-view');
function setView(v: string): void {
  viewBtns.forEach((b) => b.setAttribute('aria-pressed', b.dataset.view === v ? 'true' : 'false'));
  if (lanesView) lanesView.hidden = v !== 'lanes';
  if (matrixView) matrixView.hidden = v !== 'matrix';
}
viewBtns.forEach((b) => b.addEventListener('click', () => setView(b.dataset.view!)));

// --- matrix cell drill-down → lanes view, pre-filtered to that facet, scrolled to that lane ---
$<HTMLElement>('[data-mx-stage]').forEach((td) =>
  td.addEventListener('click', () => {
    const facet = td.dataset.mxFacet!;
    const stage = td.dataset.mxStage!;
    setView('lanes');
    activeFacets.clear();
    facetChips.forEach((c) => {
      const on = c.dataset.facetChip === facet;
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
      if (on) activeFacets.add(facet);
    });
    apply();
    const lane = document.querySelector<HTMLElement>(`[data-lane][data-stage="${stage}"]`);
    if (lane) {
      lane.dataset.collapsed = 'false';
      lane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }),
);

apply();
