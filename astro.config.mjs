// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindv4 from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    plugins: [tailwindv4()],
  },
});