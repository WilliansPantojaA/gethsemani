// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://gethsemani.vercel.app',
  output: 'server',

  adapter: vercel({
    webAnalytics: { enabled: true },
  }),

  vite: {
    plugins: [tailwindv4()],
  },

  integrations: [sitemap()],
});