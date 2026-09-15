import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import { cloudflare } from '@cloudflare/vite-plugin';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), /* cloudflare() */]
});