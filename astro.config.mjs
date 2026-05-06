import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  site: 'https://guardinotechnologies.com',
  output: 'server',
  adapter: node({ mode: 'standalone', host: true }),
  integrations: [sitemap()],
  vite: {
    css: { postcss: { plugins: [tailwindcss()] } },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr', 'de', 'fr', 'ar'],
    routing: { prefixDefaultLocale: false }
  }
});
