import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Mountain } from 'lucide-react';
import { AppShell, applyTheme, readTheme, type ShellConfig } from '@fasl-work/caos-app-shell';
import '@fasl-work/caos-app-shell/styles.css';
import './faena.css';
import { Catalog } from './App';
import { architecture } from './architecture';

applyTheme(readTheme());

// Hub = the shared shell with NO extra routes (nav hidden), one landing = the catalog.
const config: ShellConfig = {
  product: { name: 'Faena', mark: <Mountain size={18} aria-hidden="true" /> },
  routes: [],
  links: { github: 'https://github.com/fsantibanezleal/CAOS_FAENA' },
  version: '0.04.001',
  // ADR-0058: the ⓘ header button opens the "how the hub works" modal (data-driven / hub-satellites / live-gate).
  architecture,
  // ADR-0016 §2: honest footer provenance + disclaimer. The hub hosts no data or models of its own.
  footer: {
    provenance: {
      en: 'Catalog: a hand-curated registry of independent mining-analytics apps; counts, lanes and the matrix are derived from it at load. Each app is its own repository and deployment.',
      es: 'Catálogo: un registro curado a mano de apps independientes de analítica minera; los conteos, carriles y la matriz se derivan de él al cargar. Cada app es su propio repositorio y despliegue.',
    },
    disclaimer: {
      en: 'A static launcher, no backend and no data of its own. Tile states are curated: "live" is granted only after an app passes its at-bar quality review; every other deployed app reads "building".',
      es: 'Un lanzador estático, sin backend ni datos propios. Los estados de las fichas son curados: "live" se otorga solo cuando una app supera su revisión de calidad at-bar; toda otra app desplegada dice "building".',
    },
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppShell config={config}>
        <Routes>
          <Route path="/" element={<Catalog />} />
          <Route path="*" element={<Catalog />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  </StrictMode>,
);
