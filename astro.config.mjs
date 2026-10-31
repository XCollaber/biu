import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
// import { cloudflare } from '@cloudflare/vite-plugin';

// https://astro.build/config
export default defineConfig({
  // site: 'https://biu.edu.in',
  site: 'https://biu-edu.vercel.app',
  server: {
    host: true,
    allowedHosts: [
      'implementation-pointed-basename-preventing.trycloudflare.com',
      '.trycloudflare.com',
    ],
  },
  redirects: {
    '/contact': '/#contact',
    '/grievance': '/grievance-redressal-form',
    '/grievance-redressal': '/grievance-redressal-form',
    '/history.php': '/history',
  },
  integrations: [react()],
  vite: {
    server: {
      warmup: {
        clientFiles: [
          './src/components/*.jsx',
          './src/components/icons.js',
          './src/index.css'
        ],
        ssrFiles: [
          './src/pages/index.astro',
          './src/layouts/Layout.astro'
        ]
      }
    },
    optimizeDeps: {
      exclude: ['@phosphor-icons/react'],
      include: ['framer-motion', 'react', 'react-dom']
    }
  }
});
