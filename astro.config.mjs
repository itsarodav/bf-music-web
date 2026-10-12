// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Needed to build absolute URLs (canonical, og:image)
  site: 'https://blancaferrermusic.com',
  image: {
    // YouTube thumbnails (latest Shorts): optimized at build time, served locally
    domains: ['i.ytimg.com'],
  },
});
