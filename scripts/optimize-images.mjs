// Prepares source images from the untouched originals in _reference/originals.
// Astro (astro:assets) then generates the responsive AVIF/WebP variants at build time,
// so what users download depends on the component settings, not on these files.
import sharp from 'sharp';
import { stat } from 'node:fs/promises';

const ORIGINALS = '_reference/originals';

const jobs = [
  {
    // Hero background: high-quality source (never served as is). Astro generates the
    // AVIF/WebP variants from it, so keeping it near-lossless avoids double compression.
    input: `${ORIGINALS}/hero-bg-original.jpg`,
    output: 'src/assets/images/hero-bg.jpg',
    transform: (img) => img.resize({ width: 3200, withoutEnlargement: true }).jpeg({ quality: 92, mozjpeg: true }),
  },
  {
    // Hero background, portrait crop (3:4) centered on the artist for portrait screens:
    // phones only show the middle of the landscape photo, so this avoids downloading
    // pixels that are never seen and spends them on her instead.
    input: `${ORIGINALS}/hero-bg-original.jpg`,
    output: 'src/assets/images/hero-bg-portrait.jpg',
    transform: (img) =>
      img
        .extract({ left: 1035, top: 0, width: 2250, height: 3000 })
        .resize({ width: 1800 })
        .jpeg({ quality: 92, mozjpeg: true }),
  },
  {
    // Album cover: shown at ~120px max, 600px covers 3x+ density
    input: `${ORIGINALS}/album-cover-original.jpg`,
    output: 'src/assets/images/album-sokal-affair.jpg',
    transform: (img) => img.resize({ width: 600, height: 600, fit: 'cover' }).jpeg({ quality: 85, mozjpeg: true }),
  },
  {
    // Open Graph image: must stay a plain 1200x630 JPG served from /public
    input: `${ORIGINALS}/og-original.jpg`,
    output: 'public/og-image.jpg',
    transform: (img) => img.resize({ width: 1200, height: 630, fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }),
  },
];

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

for (const { input, output, transform } of jobs) {
  await transform(sharp(input).rotate()).toFile(output);
  const [before, after] = await Promise.all([stat(input), stat(output)]);
  console.log(`${output}: ${kb(before.size)} → ${kb(after.size)}`);
}
