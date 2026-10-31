import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import * as esbuild from 'esbuild';
// import { cloudflare } from '@cloudflare/vite-plugin';

/**
 * Dev-only plugin to pre-bundle the curated project icon hub into a single module.
 * Eliminates the HTTP/1.1 waterfall (117 individual network requests) in the browser
 * on cold / incognito tab loads. In production, Astro & Rollup tree-shake normally.
 */
function bundleIconsPlugin() {
  let pending = null;
  return {
    name: 'bundle-icons-hub',
    apply: 'serve',
    handleHotUpdate({ file }) {
      if (file.endsWith('icons.js')) {
        pending = null;
      }
    },
    async transform(_code, id, options) {
      if (options?.ssr) return;

      const cleanId = id.split('?')[0].replace(/\\/g, '/');
      if (!cleanId.endsWith('/src/components/icons.js')) return;

      pending ??= esbuild
        .build({
          entryPoints: [cleanId],
          bundle: true,
          format: 'esm',
          write: false,
          loader: { '.js': 'jsx' },
          external: ['react', 'react/jsx-runtime', 'react-dom']
        })
        .then((r) => r.outputFiles[0].text);

      try {
        return { code: await pending, map: null };
      } catch (e) {
        pending = null;
        throw e;
      }
    }
  };
}

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
    plugins: [bundleIconsPlugin()],
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
