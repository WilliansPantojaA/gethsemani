// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindv4 from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  vite: {
    plugins: [tailwindv4()],
  },
});