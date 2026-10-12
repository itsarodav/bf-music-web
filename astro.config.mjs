// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Needed to build absolute URLs (canonical, og:url, og:image).
  // Temporary Netlify URL until the real domain (blancaferrermusic.com) is live
  site: 'https://blancaferrermusic.netlify.app',
  image: {
    // YouTube thumbnails (latest Shorts): optimized at build time, served locally
    domains: ['i.ytimg.com'],
  },
});
