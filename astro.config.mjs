// @ts-check
import { defineConfig } from 'astro/config';

// Faena hub — static site, deployed to GitHub Pages at faena.fasl-work.com.
// The apps it launches live at their own subdomains; the hub is a pure launcher.
export default defineConfig({
  site: 'https://faena.fasl-work.com',
  base: '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
