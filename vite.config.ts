import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Faena hub — static SPA on GitHub Pages at faena.fasl-work.com (custom domain → base '/').
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: { target: 'es2022', outDir: 'dist' },
});
