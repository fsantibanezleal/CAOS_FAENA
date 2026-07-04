import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Mountain } from 'lucide-react';
import { AppShell, applyTheme, readTheme, type ShellConfig } from '@fasl-work/caos-app-shell';
import '@fasl-work/caos-app-shell/styles.css';
import './faena.css';
import { Catalog } from './App';

applyTheme(readTheme());

// Hub = the shared shell with NO extra routes (nav hidden), one landing = the catalog.
const config: ShellConfig = {
  product: { name: 'Faena', mark: <Mountain size={18} aria-hidden="true" /> },
  routes: [],
  links: { github: 'https://github.com/fsantibanezleal/CAOS_FAENA' },
  version: '0.03.000',
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
