// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Needed to build absolute URLs (canonical, og:url, og:image).
  // Temporary Netlify URL until the real domain (blancaferrermusic.com) is live
  site: 'https://blancaferrermusic.netlify.app',
  // Self-hosted fonts: downloaded from Google Fonts at build time and served from
  // our own domain (no third-party requests, preloadable). Loaded in Layout.astro
  // with <Font />, used through the $font-* tokens (src/styles/tokens/_typography.scss).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-geist',
      // Variable font: one file covers every weight in the tokens
      weights: ['100 900'],
      // Italic only shows up in <em> highlights (bold italic)
      styles: ['normal', 'italic'],
      fallbacks: ['system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Diphylleia',
      cssVariable: '--font-diphylleia',
      weights: [400],
      styles: ['normal'],
      fallbacks: ['Georgia', 'serif'],
      // Its metrics are averaged over Korean glyphs, so the generated fallback came out
      // at 210% size: the name rendered huge, then shrank on swap (layout shift).
      optimizedFallbacks: false,
    },
  ],
  image: {
    // YouTube thumbnails (latest Shorts): optimized at build time, served locally
    domains: ['i.ytimg.com'],
  },
});
