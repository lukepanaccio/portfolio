import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Update this to your final domain when you get one
  // For GitHub Pages, it will be https://[your-username].github.io/[repo-name]
  site: 'https://www.lukepanaccio.com',
  // base: '/portfolio', // Change this to your repo name
  integrations: [
    mdx(),
    sitemap(),
    tailwind()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed'
    }
  },
  output: 'static',
  build: {
    format: 'directory'
  }
});
