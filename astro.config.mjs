// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://ivanannikov.com',
  adapter: vercel(),
  // The old CV URL is in circulation. The Vercel adapter compiles this into
  // .vercel/output/config.json; a bare vercel.json `redirects` block does not
  // reach the Build Output API routing table.
  redirects: {
    '/ivan-annikov-resume-2026.pdf': {
      status: 301,
      destination: '/ivan-annikov-resume.pdf',
    },
  },
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
  },
});
