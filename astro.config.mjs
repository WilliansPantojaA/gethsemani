// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  vite: {
    plugins: [tailwindv4()],
  },
});