import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import { cloudflare } from '@cloudflare/vite-plugin';

// https://astro.build/config
export default defineConfig({
  // site: 'https://biu.edu.in',
  site: 'https://biu-edu.vercel.app',
  integrations: [react()],
  vite: {
    optimizeDeps: {
      include: ['@phosphor-icons/react', 'framer-motion', 'react', 'react-dom']
    }
  }
});